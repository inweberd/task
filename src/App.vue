<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <keep-alive :exclude="[...store.excludeNames, ...keepAliveBlackList]">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
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
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import BaseMask from '@/components/BaseMask.vue'
import { BASE_URL } from '@/config'
import { loadWx } from '@/utils/loadWx'
import wx from 'weixin-js-sdk'
const keepAliveBlackList = ['wallet', 'shortPlayDetail', 'recharge']
const store = useBaseStore()
const route = useRoute()
const transitionName = ref('go')
// 检测用户使用的是微信浏览器或者qq浏览器
const isWeChatBrowser =
  navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('qqbrowser') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('qq') !== -1
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
      '/login'
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
  font-size: 14rem;
  overflow: scroll;
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
