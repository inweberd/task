<template>
  <Loading v-if="loading"></Loading>
  <canvas ref="canvas" v-show="false"></canvas>

  <div class="earnedCash">
    <!--    <van-circle-->
    <!--      v-model:current-rate="currentRate"-->
    <!--      :rate="0"-->
    <!--      :speed="100"-->
    <!--      style="width: auto; height: auto; padding: 10px; margin-bottom: 30rem"-->
    <!--      color="#E3C569"-->
    <!--      layer-color="rgba(0,0,0,.3)"-->
    <!--      :stroke-width="80"-->
    <!--    >-->
    <img
      v-click="getEarnedCash"
      src="@/assets/earned-cash2.png"
      style="
        width: 50rem;
        padding-bottom: 25rem;
        position: relative;
        z-index: 1;
        transform: translateY(5px);
      "
    />
    <!--    </van-circle>-->

    <!-- <img src="../../assets/赏.png" class="myicon" /> -->
  </div>
  <van-overlay :show="show" style="z-index: 22">
    <div class="" @click.stop>
      <div class="block">
        <!-- <van-image :src="imageSrc" width="100%" height="100%;" style='position:fixed;top:10%'></van-image> -->
        <div class="hongbao">
          <div class="num">
            {{ redPackageInfo.unit_price }}
            <span style="font-size: 20px; margin-left: 5px; margin-top: 10px">元</span>
          </div>
        </div>
        <van-image
          :src="shouxia"
          width="90%"
          height="100%;"
          @click="close"
          style="margin-left: 5%; position: fixed; top: 65%"
        ></van-image>
      </div>
    </div>
  </van-overlay>
</template>
<script setup lang="ts">
import bus, { EVENT_KEY } from '@/utils/bus'
import { onMounted, onUnmounted, ref } from 'vue'
import { reqRecordTask, reqTaskMoney } from '@/api/myApi'
import { _notice } from '@/utils'
import Loading from '@/components/Loading.vue'
import { loadPlayRewardVideo, wechatShareImg } from '@/utils/ad'
import shouxia from '@/assets/img/shouxia.png'
import imageSrc from '@/assets/img/share2.jpg'
import QRCode from 'qrcode/lib'
import dayjs from 'dayjs'
const currentRate = ref(0)
const loading = ref(false)
const redPackageInfo = ref({})
const show = ref(false)

let timer
onMounted(() => {
  generatePoster()

  timer = setInterval(() => {
    if (currentRate.value === 100) currentRate.value = 0
    currentRate.value++
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
function close() {
  show.value = false
  loading.value = true
  reqRecordTask({
    staff_id: redPackageInfo.value.id
  }).then((res) => {
    loading.value = false
    let msg = ''
    if (res.code === 200) {
      msg = '今日红包领取成功！'
    } else {
      msg = '今日红包已领取完，请明日再来！'
    }
    showDialog({
      message: msg,
      theme: 'round-button'
    })
    // tipContent.value = res.msg
    // showTip.value = true
  })
}
const getEarnedCash = () => {
  let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

  if (!userInfo?.result?.staff?.serial) {
    return showDialog({
      message: '请先开通橙市合伙人！开通合伙人红包收益合同持续365天！',
      theme: 'round-button'
    })
  }
  // if (!sessionStorage.seeVideoGetEarnedCash) {
  //   showDialog({
  //     message: '观看激励视频领取红包！遇到问题请及时联系客服！',
  //     theme: 'round-button'
  //   }).then(() => {
  //     // on close
  //     loadPlayRewardVideo(() => {
  //       sessionStorage.seeVideoGetEarnedCash = true
  //     })
  //   })
  //   return
  // }
  // if (localStorage.isShare !== dayjs().format('YYYY-MM-DD')) {
  //   showConfirmDialog({
  //     message: '分享朋友圈后可领取红包！遇到问题请及时联系客服！',
  //     confirmButtonText: '去分享',
  //     theme: 'round-button'
  //   }).then(() => {
  //     share()
  //     // on close
  //     // loadPlayRewardVideo(() => {
  //     //   sessionStorage.seeVideoGetEarnedCash = true
  //     // })
  //   })
  //   return
  // }
  loading.value = true
  reqTaskMoney().then((res) => {
    loading.value = false
    // sessionStorage.seeVideoGetEarnedCash = ''
    // showDialog({
    //   message: '您今日还没有分享哦！',
    //   theme: 'round-button',
    //   'confirm-button-text': '去分享'
    // })
    // return
    if (res.code !== 200) return _notice(res.msg)

    if (!res.data.length) {
      return showDialog({
        message: '今日红包已领取完，请明日再来！开通合伙人红包收益合同持续365天！',
        theme: 'round-button'
      })
    }
    redPackageInfo.value = res.data[0]
    show.value = true
  })
}

const canvas = ref()
const canvasWidth = ref(window.innerHeight / (2336 / 1080))
const canvasHeight = ref(window.innerHeight)
const qrCodeText = ref(
  'https://tcc.ebayser.com/#/signUp?invite=' +
    JSON.parse(window.localStorage.getItem('userInfo')).result?.invite?.code
)

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
const share = () => {
  wechatShareImg(canvas.value.toDataURL('image/png'), 1)
}
</script>

<style scoped lang="less">
.earnedCash {
  position: absolute;
  top: 50rem;
  right: 30rem;
  z-index: 6;
  animation: scale 1s linear alternate infinite;
}

.hongbao {
  background-image: url('@/assets/img/hongbao.png');
  background-size: 100% 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  text-align: center;
  margin-top: 25%;
}
.num {
  font-size: 50px;
  font-weight: bold;
  height: 80%;
  display: flex;
  justify-content: center;
  line-height: 130%;
  align-items: center;
  color: #f9eeb7;
  position: absolute;
  width: 100%;
}
@keyframes scale {
  from {
    transform: scale(0.8);
  }

  to {
    transform: scale(1.3);
  }
}
</style>
