<template>
  <canvas ref="canvas" v-show="false"></canvas>
  <div
    :style="{ height: topPadding }"
    style="width: 100%; background-color: #fff; position: fixed; top: 0; left: 0; z-index: 999"
  ></div>
  <div
    style="width: 100%; height: 100vh; box-sizing: border-box"
    :style="{
      paddingTop: topPadding
    }"
  >
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <keep-alive :exclude="[...store.excludeNames, ...keepAliveBlackList]">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <Call />
  <!--  v-if=" (isWeChatBrowser && ['fenxiang', '/me/my-card'].includes(route.path)) ||-->
  <!--  route.query.injectWeixin "-->
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9999999;
      background: #fff;
    "
    v-if="isWeChatBrowser"
  >
    <!--请点击右上角选择在默认浏览器中打开-->
    <img src="@/assets/img/openByOtherBrower.png" style="width: 100%" />
  </div>
</template>
<script setup lang="ts">
/*
* try {navigator.control.gesture(false);} catch (e) {} //UC浏览器关闭默认手势事件
try {navigator.control.longpressMenu(false);} catch (e) {} //关闭长按弹出菜单
* */
import routes from './router/routes'
import Call from './components/Call.vue'
import { useBaseStore } from '@/store/pinia.js'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import BaseMask from '@/components/BaseMask.vue'
import { BASE_URL } from '@/config'
import { loadWx } from '@/utils/loadWx'
import wx from 'weixin-js-sdk'
const keepAliveBlackList = ['wallet', 'shortPlayDetail', 'recharge']
import { loadInteraction, loadSplash, testCallback, wechatShareImg } from '@/utils/ad'
import { reqCreateShareLog } from '@/api/myApi'
import dayjs from 'dayjs'
import { outsideFn } from '@/utils/outsideFn'
import imageSrc from '@/assets/img/share2.jpg'
import QRCode from 'qrcode/lib'
const store = useBaseStore()
const route = useRoute()
const transitionName = ref('go')

const topPadding = computed(() => {
  // window.webkit?.messageHandlers
  if (window.android) {
    if (!['/home', '/me', '/invest', '/myteam', '/myServe'].includes(route.path)) {
      return '40px !important'
    } else {
      return 0 + 'px !important'
    }
  }

  return '0px !important'
})

// 检测用户使用的是微信浏览器或者qq浏览器
let isWeChatBrowser

if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  isWeChatBrowser =
    navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 ||
    navigator.userAgent.toLowerCase().indexOf('qqbrowser') !== -1 ||
    navigator.userAgent.toLowerCase().indexOf('qq') !== -1
} else {
  isWeChatBrowser =
    (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 ||
      navigator.userAgent.toLowerCase().indexOf('qqbrowser') !== -1 ||
      navigator.userAgent.toLowerCase().indexOf('qq') !== -1) &&
    !window.android
}

// watch $route 决定使用哪种过渡
watch(
  () => route.path,
  (to, from) => {
    store.setMaskDialog({ state: false, mode: store.maskDialogMode })
    //底部tab的按钮，跳转是不需要用动画的
    let noAnimation = [
      '/',
      '/home',
      '/slide',
      '/me',
      '/shop',
      '/message',
      '/home/music-rank-list',
      '/publish',
      '/home/live',
      'slide',
      '/test',
      '/longvideo',
      '/login',
      '/myteam'
    ]
    if (noAnimation.indexOf(from) !== -1 && noAnimation.indexOf(to) !== -1) {
      return (transitionName.value = '')
    }
    const toDepth = routes.findIndex((v: RouteRecordRaw) => v.path === to)
    const fromDepth = routes.findIndex((v: RouteRecordRaw) => v.path === from)
    transitionName.value = toDepth > fromDepth ? 'go' : 'back'
  }
)

function resetVhAndPx() {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  //document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 + 'px'
}
const canvas = ref()
const canvasWidth = ref(window.innerHeight / (2336 / 1080))
const canvasHeight = ref(window.innerHeight)
const qrCodeText = ref('')

const generatePoster = async () => {
  canvas.value.width = canvasWidth.value
  canvas.value.height = canvasHeight.value
  const ctx = canvas.value.getContext('2d')

  const dpr = window.devicePixelRatio
  // 重新设置 canvas 自身宽高大小和 css 大小。放大 canvas；css 保持不变，因为我们需要那么多的点
  canvas.value.width = Math.round(canvasWidth.value * dpr)
  canvas.value.height = Math.round(canvasHeight.value * dpr)
  canvas.value.style.width = canvasWidth.value + 'px'
  canvas.value.style.height = canvasHeight.value + 'px'
  // 直接用 scale 放大整个坐标系，相对来说就是放大了每个绘制操作
  ctx.scale(dpr, dpr)

  // 绘制背景图片
  const image = new Image()
  image.src = imageSrc
  image.onload = async () => {
    ctx.drawImage(image, 0, 0, canvasWidth.value, canvasHeight.value)

    const qrCodeSize = 140 // 调整二维码的大小
    const qrCodeMarginBottom = 40 // 调整二维码距离底部的距离
    const qrCodeDataURL = await QRCode.toDataURL(qrCodeText.value, {
      width: qrCodeSize,
      height: qrCodeSize,

      margin: 2
    })
    const qrCodeImage = new Image()
    qrCodeImage.src = qrCodeDataURL
    qrCodeImage.onload = () => {
      // 在海报上绘制二维码，位置在正中心下方
      const qrCodeX = (canvasWidth.value - qrCodeSize) / 2
      const qrCodeY = canvasHeight.value - qrCodeSize - qrCodeMarginBottom
      ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize)
    }
  }
}
onMounted(() => {
  if (isWeChatBrowser) {
    loadWx(() => {
      wx.onMenuShareTimeline({
        title: '甜橙视频',
        // link: 'http://movie.douban.com/subject/25785114asd/',
        imgUrl: 'http://tc.izakq.com/media/logo2.png',
        trigger: function (res) {
          // 涓嶈灏濊瘯鍦╰rigger涓娇鐢╝jax寮傛璇锋眰淇敼鏈鍒嗕韩鐨勫唴瀹癸紝鍥犱负瀹㈡埛绔垎浜搷浣滄槸涓€涓悓姝ユ搷浣滐紝杩欐椂鍊欎娇鐢╝jax鐨勫洖鍖呬細杩樻病鏈夎繑鍥�
          // alert('您点击分享啦！')
          console.log('trigger', res)
        },
        success: function (res) {
          setTimeout(function () {
            //回调要执行的代码
            // alert('分享成功啦！')
            console.log('success', res)
          }, 500)
        },
        cancel: function (res) {
          alert('取消分享')
          console.log('cancel', res)
        },
        fail: function (res) {
          alert('分享失败')
          // alert(JSON.stringify(res))
          console.log('fail', res)
        }
      })
    })
  }
  window.my = 2
  window.test = 1
  store.init()
  resetVhAndPx()
  // 监听resize事件 视图大小发生变化就重新计算1vh的值
  window.addEventListener('resize', () => {
    // location.href = BASE_URL + '/'
    resetVhAndPx()
  })
  let init = true
  function handleVisibilityChange() {
    if (document.hidden) {
      // 页面隐藏时执行的操作，例如暂停视频播放
      // alert('hide')
    } else {
      !init && loadSplash()
    }
    init = false
  }
  // testCb

  let timer = setInterval(() => {
    if (JSON.parse(window.localStorage.getItem('userInfo'))?.result?.invite?.code) {
      clearInterval(timer)
      qrCodeText.value =
        'https://tcc.ebayser.com/#/signUp?invite=' +
        JSON.parse(window.localStorage.getItem('userInfo'))?.result?.invite?.code
      generatePoster()
    }
  }, 1000)
  outsideFn()
  window.createShareLog = function () {
    // console.log(11331)
    localStorage.isShare = dayjs().format('YYYY-MM-DD')
    reqCreateShareLog().then((res) => {
      console.log('reqCreateShareLog', res)
    })
    // alert(13311)
  }

  window.shareFriend = function () {
    wechatShareImg(canvas.value.toDataURL('image/png'), 1)
  }
  // window.android?.closeLoadMsk?.()

  // 监听 visibilitychange 事件
  // document.addEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style lang="less">
@import './assets/less/index';

* {
  user-select: none;
}

#app {
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 14px;
  overflow: scroll;
  padding-bottom: env(safe-area-inset-bottom);
}

.go-enter-from {
  transform: translate3d(100%, 0, 0);
}

//最终状态
.back-enter-to,
.back-enter-from,
.go-enter-to,
.go-leave-from {
  transform: translate3d(0, 0, 0);
}

.go-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.go-enter-active,
.go-leave-active,
.back-enter-active,
.back-leave-active {
  transition: all 0.3s;
}

.back-enter-from {
  transform: translate3d(-100%, 0, 0);
}

.back-leave-to {
  transform: translate3d(100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.van-tab--active {
  font-size: 18px;
  font-weight: bold;
}
</style>
