<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="聚宝盆"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image width="100%" height="200" lazy-load :src="jubaopenTitle">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <img src="./images/xianshijieshu.png" alt="" style="width: 90%; margin-left: 5%" />
    <div style="text-align: center; font-size: 22px">
      <p
        v-if="myDataList?.length"
        style="font-size: 24px; display: flex; align-items: center; padding-left: 5%"
      >
        <img src="./images/xiacifanhuan.png" alt="" style="height: 40px" />
        <!--        <span style="font-family: 'DS-DIGI'; font-weight: bolder; font-size: 28px">-->
        {{ timeTxt }}
        <!--        </span>-->
      </p>
      <div style="font-size: 14px; color: #999">注：奖励发放时间可能会提前或延后15分钟。</div>

      <p style="margin-top: 6px; display: flex; align-items: center; padding-left: 5%">
        <img src="./images/touru.png" alt="" style="height: 40px" />
        <!--        <span style="font-family: 'DS-DIGI'; font-weight: bolder; font-size: 32px">-->
        {{ jubaopenInfo.unFinish + jubaopenInfo.finished }}
        <!--        </span>-->
      </p>

      <p style="margin-top: 6px; display: flex; align-items: center; padding-left: 5%">
        <img src="./images/leiji.png" alt="" style="height: 40px" />
        <!--        <span style="font-family: 'DS-DIGI'; font-weight: bolder; font-size: 32px">-->
        {{ jubaopenInfo.finished }}
        <!--        </span>-->
      </p>
    </div>
    <div style="position: relative">
      <van-image width="100%" height="2800" lazy-load :src="jubaopen">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <template v-for="(item, index) of staffList" :key="index">
        <template v-if="myDataList.includes(index + 1)">
          <span
            style="
              position: absolute;
              margin-left: -35px;
              right: 18px;
              top: 245px;
              background: #999;
              padding: 3px 10px;
              border-radius: 14px;
            "
            :style="{ top: index*76 + 26 + 'px' }"
            >已拥有</span
          >
        </template>
        <img
          v-else
          style="width: 70px; position: absolute; right: 15px; margin-left: -35px"
          :src="btn"
          :style="{ top: index*76 + 26 + 'px' }"
          @click="buy(item.id,index)"
          alt=""
        />
      </template>
    </div>
    <TipDialog
      v-model="showGonggaoOverlay"
      confirm-text="已阅"
      :show-close="false"
      @confirm="showGonggaoOverlay = false"
    >
      <p
        style="
          margin-top: 20px;
          text-align: center;
          font-size: 18px;
          color: #fff;
          font-weight: bolder;
        "
      >
        聚宝盆预计本周五，周六开放
      </p>
      <p
        style="
          margin-top: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 18px;
          color: #fff;
          font-weight: bolder;
        "
      >
        敬请期待
      </p>
    </TipDialog>
    <TipDialog
      v-model="buyDialogShow"
      confirm-text="去购买"
      @confirm="
        () => {
          buyDialogShow = false
          $router.push('/invest')
        }
      "
    >
      <div style="padding: 20px; color: #fff; text-align: center">
        <p style="font-size: 18px; font-weight: bolder; margin-bottom: 10px">提示</p>
        <p>聚宝盆板块为会员进阶福利玩法，检测到您不是会员用户，请先购买任意会员!</p>
      </div>
    </TipDialog>
    <!--    <div v-html="articleInfo.content" style="padding: 10px"></div>-->
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { axiosInstance as axios } from '@/utils/myrequest'
import jubaopenTitle from './images/jubaopen-title.jpg'
import jubaopen from './images/jubaopen.jpg'
import btn from './images/jubaopen-btn.png'
import { Toast } from 'tdesign-mobile-vue'
import {onActivated, onDeactivated, onMounted, ref} from 'vue'
import {
  getAlreadyBuyTreasureBasin,
  reqMyStaff,
  reqTreasureBasinBuy,
  reqTreasureBasinPage,
  reqTreasureBasinSummary
} from '@/api/myApi'
import { closeToast, showToast } from 'vant'
import { _notice } from '@/utils'
import dayjs from 'dayjs'

const showGonggaoOverlay = ref(false)

const timeTxt = ref('')
const buyDialogShow = ref(false)
const btnList = ref([
  {
    top: 245 - 220
  },
  {
    top: 320 - 220
  },
  {
    top: 395 - 220
  },
  {
    top: 470 - 220 + 10
  },
  {
    top: 545 - 220 + 10
  },
  {
    top: 620 - 220 + 10
  },
  {
    top: 695 - 220 + 10
  },
  {
    top: 780 - 220 + 10
  },
  {
    top: 855 - 220 + 10
  },
  {
    top: 930 - 220 + 10
  },
  {
    top: 1005 - 220 + 10
  },
  {
    top: 1080 - 220 + 10
  },
  {
    top: 1155 - 220 + 10
  }
])
// Toast({
//   theme: 'loading',
//   message: '加载中...',
//   duration: 0
// })
const myDataList = ref([])
const transfer = (num) => {
  num = num * 1
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}
let timer
const getMyStaff = () => {
  // getAlreadyBuyTreasureBasin().then((res) => {
  //   if (!res.data?.data.length) {
  //     return
  //   }
  //   clearInterval(timer)
  //   res.data.data = (res.data?.data || []).filter((item) => item.finished === 0)
  //   const arr = []
  //   ;(res.data?.data || []).forEach((item) => {
  //     const dateStr =
  //       dayjs(item.create_time * 1000)
  //         .add(2, 'day')
  //         .format('YYYY-MM-DD') + ' 00:00:00'
  //     // arr.push(dayjs(dateStr).valueOf())
  //     arr.push(item.create_time * 1000)
  //   })
  //   arr.sort((a, b) => {
  //     return a - b
  //   })
  //   console.log(arr)
  //   const dateStr = dayjs(arr[0]).add(2, 'day').format('YYYY-MM-DD') + ' 00:00:00'
  //
  //   const countdown = getCountdown(dayjs(dateStr).valueOf())
  //   console.log(countdown)
  //
  //   timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`
  //
  //   timer = setInterval(() => {
  //     const countdown = getCountdown(dayjs(dateStr).valueOf())
  //     timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`
  //   }, 1000)
  //
  //   myDataList.value = (res.data?.data || []).map((item) => item.bind_id)
  // })
  getAlreadyBuyTreasureBasin().then((res) => {
    clearInterval(timer)
    if (!res.data?.data.length) {
      return
    }
      myDataList.value = (res.data?.data || []).map((item) => item.bind_id)
      // res.data.data[0].rebate_time=1745591200
      res.data.data = (res.data?.data || []).filter((item) => item.finished === 0&&item.rebate_time * 1000>new Date().getTime())
        console.log(res.data.data)
      const arr = []
    ;(res.data?.data || []).forEach((item) => {
      arr.push(item.rebate_time * 1000)
    })
    arr.sort((a, b) => {
      return a - b
    })
    // console.log(arr)
    const dateStr = dayjs(arr[0]).add(2, 'day').format('YYYY-MM-DD') + ' 00:00:00'

    // const countdown = getCountdown(dayjs(dateStr).valueOf()
    const countdown = getCountdown(arr[0])
    // console.log(countdown)

    timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`

    timer = setInterval(() => {
      const countdown = getCountdown(arr[0])
        // console.log((arr[0] - new Date().getTime())/1000/60)
        if(arr[0] <new Date().getTime()){
            getMyStaff()
            clearInterval(timer)
            return
        }
      timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`
    }, 1000)

  })
}

const buy = (id,index) => {
  // showGonggaoOverlay.value = true
  // return
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const serial = userInfo?.result?.staff?.serial

  if (!serial) {
    buyDialogShow.value = true

    return
  }

  if (myDataList.value.includes(id)) {
    showToast({
      message: '您已购买！',
      icon: 'warning'
    })
    return
  }

  if (!myDataList.value?.length && index !== 0) {
    return showToast({
      message: '请逐级购买！',
      icon: 'warning'
    })
  }
  const arr = []
  for (let i = 0; i < index; i++) {
    arr.push(staffList.value[i].id)
  }

  const flag = arr.every((item) => {
    return myDataList.value.includes(item)
  })

  if (!flag) {
    return showToast({
      message: '请逐级购买！',
      icon: 'warning'
    })
  }
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  reqTreasureBasinBuy(id).then((res) => {
    closeToast()
    _notice(res.msg)
    if (res.code === 200) {
      getMyStaff()
    }
  })
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
function getCountdown(nextSunday) {
  nextSunday = new Date(nextSunday)
  // 获取当前时间
  const now = new Date()
  // 计算时间差（毫秒）
  const diff = nextSunday - now
  // 如果当前时间已经超过本周日23:59:59，计算下周日的倒计时
  if (diff < 0) {
    nextSunday.setDate(nextSunday.getDate())
    const newDiff = nextSunday - now
    return formatCountdown(newDiff)
  }

  return formatCountdown(diff)
}
function updateTime() {
  // 设置目标时间为 2024 年 3 月 24 日
  const targetDate = new Date('2025-03-24T00:00:00')

  // 获取当前时间
  const currentDate = new Date()

  // 计算时间差，单位为毫秒
  const timeDifference = currentDate - targetDate

  // 计算天、小时、分钟、秒
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  // 显示结果
  timeStr.value = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
}
const staffList=ref([])
onMounted(() => {
  reqTreasureBasinPage().then((res) => {
    console.log('reqTreasureBasinPage', res)
      staffList.value=res.data?.data||[]
  })
})
const jubaopenInfo = ref({
  finished: 0,
  unFinish: 0
})
onActivated(() => {
  myDataList.value = []
  getMyStaff()
  reqTreasureBasinSummary().then((res) => {
    jubaopenInfo.value = res.data
  })
})
onDeactivated(()=>{
    clearInterval(timer)
})
</script>
<style scoped>
html {
  background: red;
}
body {
  background: red;
}
#app {
  background: red;
}
</style>
