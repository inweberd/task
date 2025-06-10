<template>
  <div>
    <!--    <div style="background-image: linear-gradient(180deg, #fcae03 40%, #fc7a02 80%); height: 100%">-->
    <div style="height: 100%">
      <dy-back
        class="fixed-back"
        direction="left"
        img="back"
        mode="light"
        @click="$router.back()"
      />
      <div
        style="
          display: flex;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          align-items: center;
        "
      >
        <canvas ref="canvas"></canvas>
      </div>
      <!--<div class="btns">-->
      <!--  <van-image :src="weixin" width="60" height="60" fit="fill" @click="share"></van-image>-->
      <!--  <van-image :src="pengyouquan" width="50" height="50" fit="fill" @click="share"></van-image>-->
    </div>
    <div class="contact" @click="share">
      <img alt="" src="@/assets/img/share2.png" />
      <!--<div>-->
      <!--  <div style="padding: 5px 8px; border: 1px solid #ee5151; color: #ee5151">一键分享</div>-->
      <!--</div>-->
    </div>
    <!--&lt;!&ndash;<van-image :src="imageSrc" width="100%" height="100%" fit="cover"></van-image>&ndash;&gt;-->
  </div>
</template>

<script setup>
import QRCode from 'qrcode'
import imageSrc from '@/assets/img/share2.jpg'
import avatar from '@/assets/img/logo.png'

import { wechatShareImg, wechatShareLink } from '@/utils/ad'

defineOptions({
  name: 'myCard'
})
const canvas = ref()
const canvasWidth = ref(window.innerWidth)
const canvasHeight = ref(window.innerWidth / (1242 / 2208))

const qrCodeText = ref(
  'http://bbbuyuwx0530ffxxjkf14.s3-website-us-east-1.amazonaws.com/index.html?token=' +
    // encodeURIComponent(
    'https://wmaw.lnyzd.com/#/signUp?invite=' +
    JSON.parse(window.localStorage.getItem('userInfo')).result?.invite?.code
  // )
)
const updateCanvasSize = () => {
  generatePoster()
}
const generatePoster = async () => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

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

    const qrCodeSize = 100 // 调整二维码的大小
    const qrCodeMarginBottom = 25 // 调整二维码距离底部的距离
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
      const qrCodeY = canvasHeight.value - 150
      ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize)
    }
    const avatarImage = new Image()
    avatarImage.style.borderRadius = '50%'
    if (userInfo.avatar) {
      avatarImage.src = userInfo.avatar
    } else {
      avatarImage.src = avatar
    }
    avatarImage.onload = () => {
      const qrCodeX = canvasWidth.value / 2
      const qrCodeY = canvasHeight.value - qrCodeSize - qrCodeMarginBottom

      ctx.drawImage(avatarImage, 15, canvasHeight.value - 90, 50, 55)
    }

    ctx.font = '18px Arial'
    // 设置填充颜色
    ctx.fillStyle = 'black'
    const qrCodeX = canvasWidth.value / 2
    const qrCodeY = canvasHeight.value - qrCodeSize - qrCodeMarginBottom
    // 绘制文本
    let name = userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
    if (userInfo.nickname) {
      name = userInfo.nickname
    }
    ctx.fillText(name, 75, canvasHeight.value - 70)
    ctx.font = '16px Arial'

    ctx.fillText('邀请码：', 75, canvasHeight.value - 40)
    ctx.fillStyle = '#EA591F'
    ctx.font = '18px Arial'
    ctx.fillText(userInfo?.result?.invite?.code, 135, canvasHeight.value - 40)
  }
}

const share = () => {
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

<style lang="less" scoped>
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
  top: 45%;
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
