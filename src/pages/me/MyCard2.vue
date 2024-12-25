<template>
  <div>
    <div style="background-image: linear-gradient(180deg, #fcae03 40%, #fc7a02 80%); height: 100%">
      <dy-back
        mode="light"
        img="back"
        @click="$router.back()"
        class="fixed-back"
        direction="left"
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
import imageSrc from '@/assets/img/share2.jpg'
import avatar from '@/assets/img/avatar.png'
import shareBtnBg from '@/assets/img/share-btn-bg.png'

import { wechatShareImg, wechatShareLink } from '@/utils/ad'
import weixin from '@/assets/img/weixin.png'
import pengyouquan from '@/assets/img/friend.png'

const canvas = ref()
// const canvasWidth = ref(window.innerHeight / (2336 / 1080))
// const canvasHeight = ref(window.innerHeight)
const canvasWidth = ref(window.innerWidth)
const canvasHeight = ref(window.innerWidth / (1242 / 2208))
// const qrCodeText = ref(
//   'https://wuw.anqtu.cn/#/signUp?invite=' +
//     JSON.parse(window.localStorage.getItem('userInfo')).result?.invite?.code
// )
const qrCodeText = ref(
  'http://bbbwx1203a17.s3-website-us-east-1.amazonaws.com/index.html?target=' +
    encodeURIComponent(
      'https://wuw.anqtu.cn/#/signUp?invite=' +
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

    const qrCodeSize = 130 // 调整二维码的大小
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
      const qrCodeX = canvasWidth.value / 2 - qrCodeSize - 30
      const qrCodeY = canvasHeight.value - qrCodeSize - qrCodeMarginBottom
      ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize)
      // var base64String = canvas.value.toDataURL('image/png')
      // console.log(base64String)
      // console.log()
      // wechatShareImg(xbase64String)
    }
    const avatarImage = new Image()
    avatarImage.src = avatar
    avatarImage.onload = () => {
      const qrCodeX = canvasWidth.value / 2
      const qrCodeY = canvasHeight.value - qrCodeSize - qrCodeMarginBottom

      ctx.drawImage(avatarImage, qrCodeX - 20, qrCodeY + 10, 50, 55)
    }
    const shareBtnBgImage = new Image()
    shareBtnBgImage.src = shareBtnBg
    shareBtnBgImage.onload = () => {
      const qrCodeX = canvasWidth.value / 2
      const qrCodeY = canvasHeight.value - qrCodeSize - qrCodeMarginBottom

      ctx.drawImage(shareBtnBgImage, qrCodeX - 20, qrCodeY + 90, 150, 40)
      ctx.fillStyle = 'white'

      ctx.fillText('邀请码：' + userInfo?.result?.invite?.code, qrCodeX - 10, qrCodeY + 115)
    }

    ctx.font = '16px Arial'
    // 设置填充颜色
    ctx.fillStyle = 'black'
    const qrCodeX = canvasWidth.value / 2
    const qrCodeY = canvasHeight.value - qrCodeSize - qrCodeMarginBottom
    // 绘制文本
    ctx.fillText(
      userInfo.phone ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7) : '',
      qrCodeX + 40,
      qrCodeY + 45
    )
    // ctx.fillText('邀请你来体验乐租', qrCodeX - 20, qrCodeY + 78)
  }
}

const share = () => {
  wechatShareImg(canvas.value.toDataURL('image/png'), 1)

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
