<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="每周奖池大奖"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <div class="content">
      <!--      <img class="redBag" src="./images/fenhongrenBag.png" alt="" />-->
      <div class="fenhong">
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>
            <div class="title">
              <!--        本次周期分红总金额 <br />-->
              <!--          （每X天进行一轮分红） <br />-->
              <div>累计已发放奖金</div>
            </div>
            <div class="money">￥{{ alreadyTotal.toFixed(2) }}</div>
          </div>
          <div>
            <div class="title">
              <!--        本次周期分红总金额 <br />-->
              <!--          （每X天进行一轮分红） <br />-->
              <div>本周奖池金额</div>
            </div>
            <div class="money">￥{{ total }}</div>
          </div>
        </div>
        <van-divider style="border-color: #bababa"></van-divider>
        <div style="text-align: center; margin-top: 10px">
          <div class="" style="font-size: 24px; font-weight: bolder">本轮奖池金额发放倒计时</div>
          <div class="money" style="font-size: 22px; color: #000">{{ timeTxt }}</div>
        </div>
        <van-divider style="border-color: #bababa"></van-divider>
        <!--        <div class="mine">-->
        <!--          <span-->
        <!--            >我的分红-->
        <!--            <span style="font-weight: bolder">(未发放) </span>-->
        <!--          </span>-->
        <!--          <span>0</span>-->
        <!--        </div>-->
      </div>
      <img class="info" src="@/assets/img/fhgz.jpg" alt="" />
      <img class="info" src="./images/fenhong-info.png" alt="" />
    </div>
    <!--<van-image-->
    <!--  :src="rule"-->
    <!--  width="94%"-->
    <!--  height="100%"-->
    <!--  style="margin-left: 3%; margin-top: -140px"-->
    <!--&gt;</van-image>-->
  </div>
</template>

<script lang="ts" setup>
import shareholder from '@/assets/img/shareholder2.jpg'
// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { onActivated, ref, onDeactivated } from 'vue'
import { getRankRecord, reqWalletStat } from '@/api/myApi'

const total = ref(0)
const timeTxt = ref('')
function getCountdown() {
  // 获取当前时间
  const now = new Date()

  // 获取本周日的日期
  const dayOfWeek = now.getDay() // 0 (周日) 到 6 (周六)
  const daysUntilSunday = (7 - dayOfWeek) % 7
  const nextSunday = new Date(now)
  nextSunday.setDate(now.getDate() + daysUntilSunday)
  nextSunday.setHours(23, 59, 59, 0) // 设置为周日23:59:59

  // 计算时间差（毫秒）
  const diff = nextSunday - now

  // 如果当前时间已经超过本周日23:59:59，计算下周日的倒计时
  if (diff < 0) {
    nextSunday.setDate(nextSunday.getDate() + 7)
    const newDiff = nextSunday - now
    return formatCountdown(newDiff)
  }

  return formatCountdown(diff)
}

function formatCountdown(diff) {
  // 将毫秒转换为天、小时、分钟、秒
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

let timer
const alreadyTotal = ref(0)

const transfer = (num) => {
  num = num * 1
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}
onActivated(() => {
  const countdown = getCountdown()
  timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`

  setInterval(() => {
    const countdown = getCountdown()
    timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`
  }, 1000)
  reqWalletStat().then((res) => {
    console.log('reqWalletStat', res)
    const date = new Date().getDate()
    if (res.code !== 200) {
      return
    }
    total.value = res.data.value
    // if (date >= 1 && date <= 10) {
    //   total.value = res.data.deposit[0].total
    // } else if (date >= 11 && date <= 20) {
    //   total.value = res.data.deposit[1].total
    // } else {
    //   total.value = res.data.deposit[2].total
    // }
  })
  getRankRecord().then((res) => {
    alreadyTotal.value = res.data.total
  })
})
onDeactivated(() => {
  clearInterval(timer)
})
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  //height: 300px;
  padding: 10px;
  box-sizing: border-box;
  //background: linear-gradient(to bottom, #598eea, #fff);
  background-image: linear-gradient(135deg, #ff856c 10%, #ff675f 100%);

  //background: url('./images/fenhontg-bg.jpg') no-repeat center center/ 100% 100%;
  overflow: hidden;
  .redBag {
    display: block;
    margin: 20px auto;
    width: 80%;
  }

  .info {
    width: 100%;
  }
  .fenhong {
    //display: flex;
    //justify-content: center;
    background: url('./images/square.png') no-repeat center center/ 100% 100%;
    overflow: hidden;
    margin-top: 10px;
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bolder;
      margin-top: 10px;
    }
    .money {
      text-align: center;
      font-size: 24px;
      color: #ff1300;
      font-weight: bolder;
    }
    .mine {
      padding: 10px 30px 20px;
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      span:nth-child(2) {
        font-size: 22px;
        font-weight: bold;
        color: #ff1300;
      }
    }
  }
}
</style>
