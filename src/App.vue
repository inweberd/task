<template>
  <canvas v-show="false" ref="canvas"></canvas>
  <div
    :style="{ height: topPadding }"
    style="width: 100%; background-color: #fff; position: fixed; top: 0; left: 0; z-index: 999"
  ></div>
  <div
    :style="{
      paddingTop: topPadding
    }"
    style="width: 100%; height: 100vh; box-sizing: border-box"
  >
    <router-view v-slot="{ Component }">
      <!--      <transition :name="transitionName">-->
      <keep-alive :exclude="[...store.excludeNames, ...keepAliveBlackList]">
        <component :is="Component" />
      </keep-alive>
      <!--      </transition>-->
    </router-view>
  </div>
  <!--  v-if=" (isWeChatBrowser && ['fenxiang', '/me/my-card'].includes(route.path)) ||-->
  <!--  route.query.injectWeixin "-->
  <!--  <div-->
  <!--    style="-->
  <!--      width: 100vw;-->
  <!--      height: 100vh;-->
  <!--      display: flex;-->
  <!--      align-items: center;-->
  <!--      justify-content: center;-->
  <!--      position: absolute;-->
  <!--      left: 0;-->
  <!--      top: 0;-->
  <!--      z-index: 99999999999;-->
  <!--      background: #fff;-->
  <!--    "-->
  <!--    v-if="isWeChatBrowser"-->
  <!--  >-->
  <!--    &lt;!&ndash;请点击右上角选择在默认浏览器中打开&ndash;&gt;-->
  <!--    <img src="@/assets/img/openByOtherBrower.jpg" style="width: 100%" />-->
  <!--  </div>-->
  <TipDialog
    v-model="showOverlay"
    :show-close="false"
    confirm-text="立即下载"
    title="发现新版本"
    @confirm="toDownload"
  >
    <div>
      <p style="margin-top: 6px">1. 加强系统安全性，防范刷子行为</p>
      <p style="margin-top: 6px">2. 提升用户体验，优化操作流畅度</p>
      <p style="margin-top: 6px">3. 解决已知问题，提升系统稳定性</p>
    </div>
  </TipDialog>

  <!--  <van-overlay :show="showOverlay" :z-index="99999999" v-if="false">-->
  <!--    <div class="wrapper" @click.stop>-->
  <!--      <div class="update-box">-->
  <!--        <img src="@/assets/img/update.png" alt="" />-->
  <!--        <div class="title">发现新版本 1.0.4</div>-->
  <!--        <div>-->
  <!--          <p>1. 优化用户体验</p>-->
  <!--          <p>2. 修复已知问题</p>-->
  <!--        </div>-->
  <!--        <el-button-->
  <!--          color="#689cfc"-->
  <!--          size="large"-->
  <!--          style="border-radius: 20px; margin-top: 30px !important; color: #fff; width: 80%"-->
  <!--          @click="toDownload"-->
  <!--          >立即升级-->
  <!--        </el-button>-->
  <!--        &lt;!&ndash;        <p&ndash;&gt;-->
  <!--        &lt;!&ndash;          style="font-size: 12px; text-decoration: underline; color: #1e83d3; margin-top: 10px"&ndash;&gt;-->
  <!--        &lt;!&ndash;          @click="upGrade"&ndash;&gt;-->
  <!--        &lt;!&ndash;        >&ndash;&gt;-->
  <!--        &lt;!&ndash;          升级没反应，点这里！&ndash;&gt;-->
  <!--        &lt;!&ndash;        </p>&ndash;&gt;-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    &lt;!&ndash;    <div&ndash;&gt;-->
  <!--    &lt;!&ndash;      class="wrapper"&ndash;&gt;-->
  <!--    &lt;!&ndash;      style="&ndash;&gt;-->
  <!--    &lt;!&ndash;        font-size: 26px;&ndash;&gt;-->
  <!--    &lt;!&ndash;        font-weight: bolder;&ndash;&gt;-->
  <!--    &lt;!&ndash;        color: #fff;&ndash;&gt;-->
  <!--    &lt;!&ndash;        display: flex;&ndash;&gt;-->
  <!--    &lt;!&ndash;        width: 100%;&ndash;&gt;-->
  <!--    &lt;!&ndash;        height: 100vh;&ndash;&gt;-->
  <!--    &lt;!&ndash;        align-items: center;&ndash;&gt;-->
  <!--    &lt;!&ndash;        justify-content: center;&ndash;&gt;-->
  <!--    &lt;!&ndash;      "&ndash;&gt;-->
  <!--    &lt;!&ndash;      @click.stop&ndash;&gt;-->
  <!--    &lt;!&ndash;    >&ndash;&gt;-->
  <!--    &lt;!&ndash;      请更新或重新下载app&ndash;&gt;-->
  <!--    &lt;!&ndash;    </div>&ndash;&gt;-->
  <!--  </van-overlay>-->
  <!--  <van-floating-bubble-->
  <!--    axis="xy"-->
  <!--    icon="chat"-->
  <!--    magnetic="x"-->
  <!--    style="background: transparent; overflow: auto; width: 60px; height: 60px"-->
  <!--    @click="goDownload"-->
  <!--    v-if="isShowDownload"-->
  <!--  >-->
  <!--    <div-->
  <!--      style="-->
  <!--        color: red;-->
  <!--        width: 100%;-->
  <!--        height: 100%;-->
  <!--        background: linear-gradient(to right, rgb(82, 229, 231), rgb(19, 12, 183));-->
  <!--        font-size: 14px;-->
  <!--        display: flex;-->
  <!--        align-items: center;-->
  <!--        justify-content: center;-->
  <!--      "-->
  <!--    >-->
  <!--      &lt;!&ndash;      <img src="@/assets/img/update.png" alt="" />&ndash;&gt;-->
  <!--      <p style="color: #fff">-->
  <!--        下载 <br />-->
  <!--        app-->
  <!--      </p>-->
  <!--    </div>-->
  <!--  </van-floating-bubble>-->
  <TipDialog
    v-model="showGonggaoOverlay"
    confirm-text="点击下载土豆聊天扫码进群"
    @confirm="handleGonggaoConfirm"
  >
    <p
      style="
        transform: translateY(10px);
        text-align: center;
        font-size: 18px;
        color: #fff;
        font-weight: bolder;
      "
    >
      请使用土豆APP扫码进官方群
    </p>
    <div style="padding: 20px">
      <img alt="" src="@/assets/img/weimaiquan.jpg" style="width: 100%" />
    </div>
  </TipDialog>
  <TipDialog
    v-model="shareDialogShow"
    :show-close="false"
    confirm-text="去分享"
    @confirm="shareFriendFn"
  >
    <div style="padding: 20px; color: #fff; text-align: center">
      <p>请先分享邀请海报到朋友圈，再进行下一步操作！ 蚂蚁优选，您的创业首选，财富不打烊！</p>
    </div>
  </TipDialog>
  <TipDialog
    :show-close="true"
    v-model="showDownloadOverLay"
    confirm-text="点击下载"
    @confirm="toDownload"
  >
    <p style="height: 5px; color: #000; margin: 10px 10px 30px">
      下载app，进行微信认证，获得更高收益
    </p>
  </TipDialog>
  <!--  <van-floating-bubble-->
  <!--    axis="xy"-->
  <!--    icon="chat"-->
  <!--    magnetic="x"-->
  <!--    style="background: transparent; overflow: auto; width: 60px; height: 100px"-->
  <!--    @click="showGonggaoOverlay = true"-->
  <!--  >-->
  <!--    <div style="color: #fff; width: 100%; height: 100%; font-size: 14px">-->
  <!--      &lt;!&ndash;      <img src="@/assets/img/update.png" alt="" />&ndash;&gt;-->
  <!--      <img src="@/assets/img/kefu.webp" alt="" style="width: 100%; border-radius: 50%" />-->
  <!--      <p>联系客服</p>-->
  <!--    </div>-->
  <!--  </van-floating-bubble>-->
</template>
<script lang="ts" setup>
import routes from './router/routes'
import { useBaseStore } from '@/store/pinia.js'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { loadWx } from '@/utils/loadWx'
import wx from 'weixin-js-sdk'
const showGonggaoOverlay = ref(false)
const shareDialogShow = ref(false)
const handleGonggaoConfirm = () => {
  showGonggaoOverlay.value = false
  // window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.edujia.weimai'
  window.location.href = 'https://www.potato186.org/dl'
}
const keepAliveBlackList = [
  'wallet',
  'shortPlayDetail',
  'recharge',
  'serveInfo',
  'invest',
  'dep',
  'shourulaiyuan',
  'rank',
  'short',
  'myCard',
  'signIn',
  'iframeCom',
  'conversionRecord',
  'orderInfo'
]
import {
  androidUpdate,
  getOaid,
  getVersionCode,
  loadInteraction,
  loadSplash,
  testCallback,
  wechatShareImg
} from '@/utils/ad'
import {
  reqCreateShareLog,
  reqUpdateUserInfo,
  reqUserInfo,
  reqUserStaff,
  reqWechatSignin
} from '@/api/myApi'
import dayjs from 'dayjs'
import imageSrc from '@/assets/img/share2.jpg'

import QRCode from 'qrcode/lib'
import avatar from '@/assets/img/logo.png'
import shareBtnBg from '@/assets/img/share-btn-bg.png'
import { outsideFn } from '@/utils/outsideFn'
import { testBase64 } from '@/utils/testBase64'
import { Toast } from 'tdesign-mobile-vue'
import { _notice } from '@/utils'
import bus from '@/utils/bus'
import { closeToast } from 'vant'
import { copyToClipboard } from '@/utils/copyToClipboard'

const store = useBaseStore()
const route = useRoute()
const router = useRouter()
const transitionName = ref('go')
const showOverlay = ref(false)

const goDownload = () => {
  try {
    window.location.href = `https://fx.kujspvp.cn/download`
  } catch (e) {
    _notice('下载失败')
  }
}
const isShowDownload = !window?.android?.openContentPage
const topPadding = computed(() => {
  // window.webkit?.messageHandlers
  if (window.android && window.android.getVersionCode && !window.android.hideBar) {
    if (
      !['/home', '/me', '/invest', '/myteam', '/myServe', '/serveInfo', '/rank1'].includes(
        route.path
      )
    ) {
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
    !window.android?.getOaid
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
      '/myteam',
      '/invest'
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
const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent)

const canvas = ref()
const canvasWidth = ref(window.innerWidth)
const canvasHeight = ref(window.innerWidth / (1242 / 2208))

const qrCodeText = ref('')

const generatePoster = async () => {
  if (isIos || !(window.android && window.android.getVersionCode)) {
    return
  }
  qrCodeText.value =
    'http://bbbnklswx0811ffxxjkf11.s3-website-us-east-1.amazonaws.com/index.html?token=' +
    // encodeURIComponent(
    'https://fx.kujspvp.cn/#/signUp?invite=' +
    JSON.parse(window.localStorage.getItem('userInfo'))?.invite?.code
  // )
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
  // Toast({
  //   theme: 'loading',
  //   message: '加载中...',
  //   duration: 0
  // })
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  image.onload = async () => {
    ctx.drawImage(image, 0, 0, canvasWidth.value, canvasHeight.value)
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

    const qrCodeSize = 100 // 调整二维码的大小
    const qrCodeDataURL = await QRCode.toDataURL(qrCodeText.value, {
      width: qrCodeSize,
      height: qrCodeSize,
      margin: 2
    })
    const qrCodeImage = new Image()
    qrCodeImage.src = qrCodeDataURL
    qrCodeImage.onload = () => {
      // 在海报上绘制二维码，位置在正中心下方
      const qrCodeX = canvasWidth.value - 130
      const qrCodeY = canvasHeight.value - 130
      ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize)
    }
    const avatarImage = new Image()
    // avatarImage.style.borderRadius = '50%'
    if (userInfo?.display?.avatar) {
      fetch(userInfo.display.avatar, {
        responseType: 'blob'
      })
        .then((response) => {
          return response.blob()
        })
        .then((blob) => {
          let oFileReader = new FileReader()
          oFileReader.onloadend = function (e) {
            // base64结果
            const base64 = e.target.result
            avatarImage.src = base64
            avatarImage.onload = () => {
              ctx.drawImage(avatarImage, 80, canvasHeight.value - 120, 50, 55)
              closeToast()
            }
            // console.log(base64);
          }
          oFileReader.readAsDataURL(blob)
        })
    } else {
      avatarImage.src = avatar
      avatarImage.onload = () => {
        ctx.drawImage(avatarImage, 15, canvasHeight.value - 90, 50, 55)

        closeToast()
      }
    }

    ctx.fillStyle = '#fff' // 设置填充颜色
    ctx.fillRect(50, canvasHeight.value - 130, canvasWidth.value - 100, 80) // 绘制填充矩形

    ctx.font = '16px Arial'
    // 设置填充颜色
    ctx.fillStyle = '#000'
    // 绘制文本
    let name = userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
    if (userInfo.nickname) {
      name = userInfo.nickname
    }
    // ctx.fillText(name, 75, canvasHeight.value - 70)
    ctx.font = '16px Arial'

    ctx.fillText('邀请码：', 75, canvasHeight.value - 60)
    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    ctx.fillText(userInfo?.invite?.code, 135, canvasHeight.value - 60)
    // ctx.drawImage(image, 0, 0, canvasWidth.value, canvasHeight.value)
    //
    // const qrCodeSize = canvasWidth.value * 0.33 // 调整二维码的大小
    // const qrCodeDataURL = await QRCode.toDataURL(qrCodeText.value, {
    //   width: qrCodeSize,
    //   height: qrCodeSize,
    //   margin: 2
    // })
    // const qrCodeImage = new Image()
    // qrCodeImage.src = qrCodeDataURL
    // qrCodeImage.onload = () => {
    //   // 在海报上绘制二维码，位置在正中心下方
    //   // const qrCodeX = canvasWidth.value / 2 - qrCodeSize / 2
    //   const qrCodeX = 26
    //   // const qrCodeX = 30
    //   const qrCodeY = canvasHeight.value / 2 - 95
    //   // const qrCodeY = canvasHeight.value - 125
    //   ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize)
    // }
  }
}

function clipboardCopy(content) {
  let copyDom = document.createElement('div')
  copyDom.innerText = content
  copyDom.style.position = 'absolute'

  copyDom.style.top = '0px'
  copyDom.style.right = '-9999px'
  document.body.appendChild(copyDom)
  //创建选中范围
  let range = document.createRange()
  range.selectNode(copyDom)
  //移除剪切板中内容
  window.getSelection().removeAllRanges()
  //添加新的内容到剪切板
  window.getSelection().addRange(range)
  //复制

  let successful = document.execCommand('copy')

  copyDom.parentNode.removeChild(copyDom)
}

const toDownload = () => {
  // window.android.openBrowser('https://fx.kujspvp.cn/download/android.apk')
  window.location.href = `https://fx.kujspvp.cn/download`

  // window.location.href = `https://fx.kujspvp.cn/download/android.apk`
}

const upGrade = () => {
  window.android.openBrowser('https://fx.kujspvp.cn/download/android.apk')
  // clipboardCopy('')
  // navigator.clipboard.writeText('12312').then(() => {
  //   alert('复制成功')
  // })
}
const showDownloadOverLay = ref(false)

const shareFriendFn = () => {
  shareDialogShow.value = false
  window.shareFriend()
}
onMounted(() => {
  window.android?.closeLoadImg?.()
  bus.on('shengchengQr', () => {
    generatePoster()
  })
  outsideFn()
  if (isWeChatBrowser) {
    // loadWx(() => {
    //   wx.onMenuShareTimeline({
    //     title: '蚂蚁优选',
    //     // link: 'http://movie.douban.com/subject/25785114asd/',
    //     imgUrl: 'http://tc.izakq.com/media/logo2.png',
    //     trigger: function (res) {
    //       // 涓嶈灏濊瘯鍦╰rigger涓娇鐢╝jax寮傛璇锋眰淇敼鏈鍒嗕韩鐨勫唴瀹癸紝鍥犱负瀹㈡埛绔垎浜搷浣滄槸涓€涓悓姝ユ搷浣滐紝杩欐椂鍊欎娇鐢╝jax鐨勫洖鍖呬細杩樻病鏈夎繑鍥�
    //       // alert('您点击分享啦！')
    //       console.log('trigger', res)
    //     },
    //     success: function (res) {
    //       setTimeout(function () {
    //         //回调要执行的代码
    //         // alert('分享成功啦！')
    //         console.log('success', res)
    //       }, 500)
    //     },
    //     cancel: function (res) {
    //       alert('取消分享')
    //       console.log('cancel', res)
    //     },
    //     fail: function (res) {
    //       alert('分享失败')
    //       // alert(JSON.stringify(res))
    //       console.log('fail', res)
    //     }
    //   })
    // })
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
    if (JSON.parse(window.localStorage.getItem('userInfo'))?.invite?.code) {
      clearInterval(timer)

      generatePoster()
    }
  }, 1000)
  window.createShareLog = function (params) {
    //  console.log('createShareLog', params)
    localStorage.isShare = dayjs().format('YYYY-MM-DD')
    reqCreateShareLog().then((res) => {
      console.log('reqCreateShareLog', res)
      // window.android.getMoneyCb('回调字符串')
    })
    // alert(13311)
  }
  window.setU = function (params) {
    // copyToClipboard(params.code)
    // alert(params.code)
    reqWechatSignin({
      code: params.code
    }).then((res) => {
      // alert(JSON.stringify(res))
      mui.toast(res.msg)
      console.log('res')
      window.alreadyRenzheng && window.alreadyRenzheng()
    })
    // .catch((err) => {
    //   alert(JSON.stringify(err))
    // })
    return
    console.log('params', params)
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    const data = {
      id: userInfo.id,
      avatar: params.headimgurl,
      nickname: params.nickname,
      description: JSON.stringify({
        openid: params.openid,
        nickname: params.nickname,
        sex: params.sex,
        unionid: params.unionid
      })
    }
    if (params.sex) {
      data.gender = params.sex == '1' ? 'boy' : 'girl'
    }

    reqUpdateUserInfo(data).then((res) => {
      if (res.code !== 200) {
        return _notice('认证失败，请重试！')
      }
      reqUserInfo({ id: userInfo.id }).then((sub_res) => {
        if (sub_res.code !== 200) {
          return _notice(sub_res.msg)
        }
        // Toast('认证成功')
        showSuccessToast('认证成功')
        userInfo.value = sub_res.data
        window.localStorage.setItem('userInfo', JSON.stringify(sub_res.data))
        bus.emit('userInfoChange', sub_res.data)
      })
    })
  }
  window.toInvest = function (params) {
    router.push('/invest')
  }

  window.showShareFriend = function () {
    shareDialogShow.value = true
  }

  window.goRenzheng = function () {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if (userInfo.unionid) {
      mui.toast('此账号已经认证！')
      return
    }
    if (!window.android && !window.android?.wxLogin) {
      showDownloadOverLay.value = true
      return
    }
    window.android.wxLogin()
  }

  window.shareFriend = function () {
    console.log(canvas.value.toDataURL('image/png'))
    wechatShareImg(canvas.value.toDataURL('image/png'), 1)
  }
  // window.android?.closeLoadMsk?.()

  // 监听 visibilitychange 事件
  // document.addEventListener('visibilitychange', handleVisibilityChange)
  // const updateTimer = setInterval(() => {
  //   if (!window.android) {
  //     clearInterval(updateTimer)
  //     return
  //   }
  //   fetch('/c.json')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.c > getVersionCode()) {
  //         showOverlay.value = true
  //         clearInterval(updateTimer)
  //         androidUpdate()
  //       }
  //     })
  // }, 5000)
  // if (window.android) {
  //   fetch('/c.json')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.c > getVersionCode()) {
  //         showOverlay.value = true
  //         clearInterval(updateTimer)
  //         androidUpdate()
  //       }
  //     })
  // }
  // const updateTimer = setInterval(() => {
  //   if (!window.android) {
  //     clearInterval(updateTimer)
  //     return
  //   }
  //   fetch('/c.json')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.c > getVersionCode()) {
  //         showOverlay.value = true
  //         clearInterval(updateTimer)
  //         androidUpdate()
  //       }
  //     })
  // }, 5000)
  if (window.android && window.android.getVersionCode) {
    if (1 > getVersionCode()) {
      showOverlay.value = true
    }
  }
})
</script>

<style lang="less">
@import './assets/less/index';
@import url('@/assets/css/mui.min.css');
@import url('@/assets/font-awesome/css/font-awesome.min.css');

* {
  user-select: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 111111s;
  -webkit-transition:
    color 11111s ease-out,
    background-color 111111s ease-out;
}

:root {
  font-size: 10px;
  //--van-text-color: #fff;
  //--van-nav-bar-background: #0e0f13 !important;
  --van-cell-group-background: transparent !important;
  --van-cell-background: transparent !important;
  --van-popup-background: #fff !important;

  --van-nav-bar-background: #fff !important;

  //--van-active-color: #1f203d !important;

  --van-field-label-color: #fff;

  --td-tab-track-color: #4bcfe3;

  --td-tab-item-color: #646566;
  --td-tab-item-active-color: #000;

  --wallet-bg: #eaeaea;

  --van-cell-active-color: transparent !important;
}

.big-title {
  font-size: 16px;
  color: #fff;
  font-weight: bolder;
  padding: 5px 20px 0;
  position: relative;

  &:before {
    position: absolute;
    top: 50%;
    left: 0;
    content: '';
    display: block;
    width: 12px;
    height: 6px;
    background-color: #ccc;
    margin-bottom: 10px;
    background-image: linear-gradient(135deg, #6a78f0 10%, #8999f0 100%);
  }
}

.common-input-title {
  color: #afb6ba;
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

//.van-tab--active {
//  font-size: 18px;
//  font-weight: bold;
//}
//.van-nav-bar {
//  background-color: #0e0f13 !important;
//}
.van-nav-bar__title {
  color: #000 !important;
}

//.van-nav-bar__content:after {
//  border: none !important;
//  display: none;
//}
.van-hairline--bottom:after {
  border-bottom-width: 0;
}

//.van-tab {
//  color: #fff !important;
//}
//.van-tabs__line {
//  background-color: #4b6fff !important;
//}
//.van-tabs__nav {
//  background-color: #0e0f13 !important;
//}

.van-field__label {
  font-weight: normal;
}
.van-field__control {
  //color: #fff !important;
}

//.van-popup {
//  background-color: #0e0f13;
//  color: #fff !important;
//}
//.van-dialog__message {
//  color: #fff !important;
//}

//[class*='van-hairline']:after {
//  //border-left: none !important;
//  border-color: #666 !important;
//}

//2e3350
//1f203d
.van-action-sheet__item {
  background-color: #1f203d !important;
}

.van-action-sheet__name {
  color: #fff !important;
}

//.van-card {
//  background-color: #0e0f13 !important;
//}
//.van-picker {
//  background-color: #0e0f13 !important;
//}
//.van-picker__mask {
//  background-image: none !important;
//}
//.van-card__title {
//  color: #fff;
//}
.el-table th.el-table__cell,
.el-table tr {
  background-color: #05112f !important;
  color: #fff !important;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.update-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 80%;
  background-color: #202022;
  border-radius: 15px;
  padding: 70px 0 20px;
  color: #fff;

  img {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 80px;
  }

  .title {
    text-align: center;
    font-weight: bolder;
    margin-bottom: 20px;
    font-size: 18px;
  }
}

.t-tabs,
.t-tabs__wrapper {
  background-color: #fff !important;
}

.t-tabs__scroll--top::after {
  background-color: #fff !important;
}

.t-tabs__item-inner--tag {
  background-color: #1f203d;
  color: #fff;
}

.t-tabs__item-inner--active.t-tabs__item-inner--tag {
  background-image: linear-gradient(to right, #fb5b4b, #9c38e5);
}
</style>
