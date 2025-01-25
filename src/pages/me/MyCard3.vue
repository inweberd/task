<template>
  <div>
    <!--    <div style="background-image: linear-gradient(180deg, #fcae03 40%, #fc7a02 80%); height: 100%">-->
    <div style="height: 100%; background-color: #fff">
      <dy-back mode="dark" img="back" @click="$router.back()" class="fixed-back" direction="left" />
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          align-items: center;
        "
      >
        <canvas ref="canvas"></canvas>
        <!--        <p style="color: red; font-size: 16px">手机截屏保存二维码分享给朋友</p>-->
        <!--        <p style="color: red; font-size: 16px">您将获得推广收入！月入过万轻松获得</p>-->
      </div>
      <!--<div class="btns">-->
      <!--  <van-image :src="weixin" width="60" height="60" fit="fill" @click="share"></van-image>-->
      <!--  <van-image :src="pengyouquan" width="50" height="50" fit="fill" @click="share"></van-image>-->
    </div>
    <div class="contact" @click="share">
      <img src="@/assets/img/share2.png" alt="" />
      <!--<div>-->
      <!--  <div style="padding: 5px 8px; border: 1px solid #ee5151; color: #ee5151">一键分享</div>-->
      <!--</div>-->
    </div>
    <!--&lt;!&ndash;<van-image :src="imageSrc" width="100%" height="100%" fit="cover"></van-image>&ndash;&gt;-->
  </div>
</template>

<script setup>
import QRCode from 'qrcode'
import imageSrc from '@/assets/img/share-bg.png'

import { wechatShareImg, wechatShareLink } from '@/utils/ad'
import { ref } from 'vue'

const canvas = ref()
const canvasWidth = ref(window.innerWidth)
// const canvasHeight = ref(window.innerWidth / (580 / 1031))
const canvasHeight = ref(window.innerWidth / (2000 / 3556))

const qrCodeText = ref(
  'http://bbbwx0115a19.s3-website-us-east-1.amazonaws.com/index.html?target=' +
    encodeURIComponent(
      'https://bfx.muyichang.com/#/signUp?invite=' +
        JSON.parse(window.localStorage.getItem('userInfo')).result?.invite?.code
    )
)
const updateCanvasSize = () => {
  // canvasWidth.value = window.innerWidth
  // canvasHeight.value = window.innerHeight
  // canvasWidth.value = window.innerWidth
  // canvasHeight.value = window.innerWidth / (1080 / 2336)
  // canvasHeight.value = window.innerHeight
  // canvasWidth.value = window.innerHeight / (1080 / 2336)

  // 1080  window.innerWidth
  // 2336  window.innerHeight

  generatePoster()
}
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

    const qrCodeSize = canvasWidth.value * 0.33 // 调整二维码的大小
    const qrCodeDataURL = await QRCode.toDataURL(qrCodeText.value, {
      width: qrCodeSize,
      height: qrCodeSize,

      margin: 2
    })
    const qrCodeImage = new Image()
    qrCodeImage.src = qrCodeDataURL
    qrCodeImage.onload = () => {
      // 在海报上绘制二维码，位置在正中心下方
      // const qrCodeX = canvasWidth.value / 2 - qrCodeSize / 2
      const qrCodeX = 26
      // const qrCodeX = 30
      const qrCodeY = canvasHeight.value / 2 - 95
      // const qrCodeY = canvasHeight.value - 125
      ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize)
    }
  }
}

const share = () => {
  // wechatShareImg(canvas.value.toDataURL('image/png'), 1)
  window.shareFriend()
  // 创建一个 a 标签，并设置 href 和 download 属性
  // const el = document.createElement('a')
  // // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
  // el.href = canvas.value.toDataURL('image/png')
  // el.download = '文件名称'
  //
  // // 创建一个点击事件并对 a 标签进行触发
  // const event = new MouseEvent('click')
  // el.dispatchEvent(event)
}
onMounted(() => {
  generatePoster()
  window.addEventListener('resize', updateCanvasSize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCanvasSize)
})
</script>

<style scoped lang="less">
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fixed-back {
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
}

/* 你的样式 */
.btns {
  width: 90%;
  display: flex;
  height: 50px;
  position: fixed;
  bottom: 10%;
  margin-left: 5%;
  justify-content: space-around;
  align-items: center;
}
.contact {
  position: fixed;
  top: 65%;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px 0 0 20px;
  padding: 4px;
  font-size: 20px;
  box-shadow:
    0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
    0px 0.3px 5.3px rgba(0, 0, 0, 0.028),
    0px 0.5px 10px rgba(0, 0, 0, 0.035),
    0px 0.9px 17.9px rgba(0, 0, 0, 0.042),
    0px 1.7px 33.4px rgba(0, 0, 0, 0.05),
    0px 4px 80px rgba(0, 0, 0, 0.07);
  img {
    margin-right: 4px;
    width: 50px;
  }
}
</style>
