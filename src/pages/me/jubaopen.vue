<template>
  <div style="height: 100%; overflow: auto; background-color: #f3f3f3">
    <van-nav-bar
      :class="{ inApp: getIsInApp() }"
      fixed
      left-arrow
      left-text="返回"
      placeholder
      safe-area-inset-top
      title="群英会阶梯"
      @click-left="$router.back()"
    >
      <template #right>
        <span style="color: #000" @click="$router.push('/wallet')"> 阶梯详情 </span>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <template v-if="false">
      <van-image :src="jubaopenTitle" height="200" lazy-load width="100%">
        <template v-slot:loading>
          <van-loading size="20" type="spinner" />
        </template>
      </van-image>
      <img alt="" src="./images/xianshijieshu.png" style="width: 90%; margin-left: 5%" />
      <div style="text-align: center; font-size: 22px">
        <p
          v-if="myDataList?.length"
          style="font-size: 24px; display: flex; align-items: center; padding-left: 5%"
        >
          <img alt="" src="./images/xiacifanhuan.png" style="height: 40px" />
          <!--        <span style="font-family: 'DS-DIGI'; font-weight: bolder; font-size: 28px">-->
          {{ timeTxt }}
          <!--        </span>-->
        </p>
        <div style="font-size: 14px; color: #999">注：奖励发放时间可能会提前或延后15分钟。</div>

        <p style="margin-top: 6px; display: flex; align-items: center; padding-left: 5%">
          <img alt="" src="./images/touru.png" style="height: 40px" />
          <!--        <span style="font-family: 'DS-DIGI'; font-weight: bolder; font-size: 32px">-->
          {{ (jubaopenInfo.unFinish + jubaopenInfo.finished).toFixed(2) }}
          <!--        </span>-->
        </p>

        <p style="margin-top: 6px; display: flex; align-items: center; padding-left: 5%">
          <img alt="" src="./images/leiji.png" style="height: 40px" />
          <!--        <span style="font-family: 'DS-DIGI'; font-weight: bolder; font-size: 32px">-->
          {{ jubaopenInfo.finished.toFixed(2) }}
          <!--        </span>-->
        </p>
      </div>
    </template>
    <div class="info">
      <div style="display: flex; justify-content: space-between">
        <div>可用点券：{{ (walletInfo.wallet?.points / 10 || 0).toFixed(2) || 0 }}</div>
        <div style="text-decoration: underline; color: #333" @click="$router.push('/wallet')">
          收入来源
        </div>
      </div>
      <div @click="$router.push('/tudicanyuIntroduce')">徒弟参与阶梯比例： 直20%+间10%</div>
      <!--      <div @click="$router.push('/jubaopenIntroduce')">每日星级阶梯分红榜（达到20层自动开启）</div>-->
    </div>
    <div class="staffList" style="position: relative">
      <!--      <van-image width="100%" height="3145" lazy-load :src="jubaopen">-->
      <!--        <template v-slot:loading>-->
      <!--          <van-loading type="spinner" size="20" />-->
      <!--        </template>-->
      <!--      </van-image>-->
      <template v-for="(item, index) of staffList" :key="index">
        <div class="staff-item">
          <!--          <img src="./images/jubaopen-item-bg.png" class="vImg" alt="" />-->
          <div class="name">{{ index + 1 }}层</div>
          <div class="content-center">
            需要：<span style="color: #000; font-weight: bolder">{{ vipList[index].touru }}</span
            >点券上阶梯
          </div>
          <div class="content-bottom">
            <!--            需要：<span style="color: #d34545; font-weight: bolder">{{ vipList[index].touru }}</span-->
            <!--            >点券上阶梯-->
            <div>
              <template v-if="[0, 1, 2, 3].includes(index)">
                立即释放
                <span style="color: #000; font-weight: bolder">{{ vipList[index].lirun }}</span>
                点券
              </template>
              <template v-else>
                到00:00分出
                <span style="color: #000; font-weight: bolder">{{ vipList[index].lirun }}</span>
                点券
              </template>
            </div>
            <div>
              总获得
              <!--              <span style="color: #ff6800; font-weight: bolder">{{ getTotalZuanshi(index) }}</span-->
              <span style="color: #000; font-weight: bolder">
                {{ (vipList[index].lirun + vipList[index].touru).toFixed(1) }} </span
              >点券
            </div>
          </div>
          <!--          <img :src="getImgUrl(index + 1)" class="vImg" alt="" />-->
          <template v-if="myDataList.includes(item.id)">
            <template v-if="[0, 1, 2, 3].includes(index)">
              <img
                alt=""
                src="./images/hybaopen-yiwancheng.png"
                style="width: 80px; position: absolute; right: 15px; margin-left: -35px; top: 30%"
              />
            </template>
            <template v-else>
              <img
                alt=""
                src="./images/jubaopen-daijiesuan.png"
                style="width: 80px; position: absolute; right: 15px; margin-left: -35px; top: 30%"
              />
            </template>
          </template>
          <img
            v-else
            :src="btn"
            alt=""
            style="width: 80px; position: absolute; right: 15px; margin-left: -35px; top: 30%"
            @click="buy(item.id, index)"
          />
        </div>
      </template>
    </div>
    <TipDialog
      v-model="showGonggaoOverlay"
      :show-close="false"
      confirm-text="已阅"
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

    <van-overlay :show="shareDialogOverlay" :z-index="99999999">
      <div
        style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        "
      >
        <img alt="" src="./images/jubaopenfenxiang.jpg" style="width: 80%" @click="share" />
      </div>
    </van-overlay>
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
import { nextTick, onActivated, onDeactivated, onMounted, ref } from 'vue'
import {
  getAlreadyBuyTreasureBasin,
  reqAdvertisingCount,
  reqAdvertisingSinglePrice,
  reqMyStaff,
  reqTreasureBasinBuy,
  reqTreasureBasinPage,
  reqTreasureBasinSummary,
  reqUserIncome,
  reqWalletInfo
} from '@/api/myApi'
import { closeToast, showToast } from 'vant'
import { _notice } from '@/utils'
import dayjs from 'dayjs'
import { loadShortVideo } from '@/utils/ad'

const showGonggaoOverlay = ref(false)
const shareDialogOverlay = ref(false)

const timeTxt = ref('')
const buyDialogShow = ref(false)
const walletInfo = ref({ wallet: { transfer: null } })

const vipList = ref([
  {
    touru: 0,
    lirun: 0.5
  },
  {
    touru: 0.5,
    lirun: 0.2
  },
  {
    touru: 0.7,
    lirun: 0.2
  },
  {
    touru: 0.9,
    lirun: 0.2
  },
  {
    touru: 2,
    lirun: 0.2
  },
  {
    touru: 3,
    lirun: 0.3
  },
  {
    touru: 5,
    lirun: 0.3
  },
  {
    touru: 7,
    lirun: 0.3
  },
  {
    touru: 10,
    lirun: 0.4
  },
  {
    touru: 11,
    lirun: 0.4
  },
  {
    touru: 12,
    lirun: 0.4
  },
  {
    touru: 15,
    lirun: 0.4
  },
  {
    touru: 20,
    lirun: 0.8
  },
  {
    touru: 25,
    lirun: 0.8
  },
  {
    touru: 30,
    lirun: 1.1
  },
  {
    touru: 35,
    lirun: 1.2
  },
  {
    touru: 40,
    lirun: 1.3
  },
  {
    touru: 45,
    lirun: 1.4
  },
  {
    touru: 48,
    lirun: 1.5
  },
  {
    touru: 50,
    lirun: 2.1
  },
  {
    touru: 60,
    lirun: 2.2
  },
  {
    touru: 70,
    lirun: 2.3
  },
  {
    touru: 80,
    lirun: 2.4
  },
  {
    touru: 90,
    lirun: 2.5
  },
  {
    touru: 100,
    lirun: 4.2
  },
  {
    touru: 200,
    lirun: 5
  },
  {
    touru: 300,
    lirun: 6
  },
  {
    touru: 400,
    lirun: 7
  },
  {
    touru: 500,
    lirun: 22
  },
  {
    touru: 600,
    lirun: 23
  },
  {
    touru: 700,
    lirun: 24
  },
  {
    touru: 800,
    lirun: 25
  },
  {
    touru: 900,
    lirun: 26
  },
  {
    touru: 1000,
    lirun: 45
  },
  {
    touru: 1200,
    lirun: 46
  },
  {
    touru: 1500,
    lirun: 47
  },
  {
    touru: 2000,
    lirun: 91
  },
  {
    touru: 2500,
    lirun: 92
  },
  {
    touru: 3000,
    lirun: 93
  },
  {
    touru: 3500,
    lirun: 94
  },
  {
    touru: 4000,
    lirun: 190
  },
  {
    touru: 4500,
    lirun: 192
  },
  {
    touru: 5000,
    lirun: 194
  },
  {
    touru: 6000,
    lirun: 270
  },
  {
    touru: 7000,
    lirun: 271
  },
  {
    touru: 8000,
    lirun: 272
  },
  {
    touru: 9000,
    lirun: 273
  },
  {
    touru: 10000,
    lirun: 460
  },
  {
    touru: 15000,
    lirun: 480
  },
  {
    touru: 18000,
    lirun: 490
  },
  {
    touru: 20000,
    lirun: 920
  },
  {
    touru: 25000,
    lirun: 1000
  },
  {
    touru: 30000,
    lirun: 1600
  },
  {
    touru: 35000,
    lirun: 1600
  },
  {
    touru: 40000,
    lirun: 2000
  },
  {
    touru: 50000,
    lirun: 3000
  }
])

const getTotalZuanshi = (index) => {
  let sum = 0
  for (let i = 0; i <= index; i++) {
    sum += vipList.value[i].lirun
  }
  return sum.toFixed(1)
}
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

const getImgUrl = (item) => {
  return new URL(`./images/jubaopen/${item}.png`, import.meta.url).href
}

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
    // res.data.data = (res.data?.data || []).filter(
    //   (item) => item.finished === 0 || [1, 2, 3, 4].includes(item.climbLadderId)
    // )
    myDataList.value = (res.data?.data || []).map((item) => item.climbLadderId)
    // res.data.data[0].rebate_time=1745591200
    res.data.data = (res.data?.data || []).filter(
      (item) => item.finished === 0 && item.rebate_time * 1000 > new Date().getTime()
    )
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

    if (!arr[0]) {
      timeTxt.value = '奖励结算发放中'
      return
    }
    // const countdown = getCountdown(dayjs(dateStr).valueOf()
    const countdown = getCountdown(arr[0])
    // console.log(countdown)

    timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`

    timer = setInterval(() => {
      const countdown = getCountdown(arr[0])
      // console.log((arr[0] - new Date().getTime())/1000/60)
      if (arr[0] < new Date().getTime()) {
        getMyStaff()
        clearInterval(timer)
        return
      }
      timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`
    }, 1000)
  })
}

const share = () => {
  localStorage.isTiantiShare = dayjs().format('YYYY-MM-DD')
  shareDialogOverlay.value = false
  window.shareFriend()
}

const buy = (id, index) => {
  if (localStorage.isTiantiShare !== dayjs().format('YYYY-MM-DD') && window.android) {
    shareDialogOverlay.value = true
    return
    // localStorage.isTiantiShare = dayjs().format('YYYY-MM-DD')
    // window.showShareFriend()
  }
  // showGonggaoOverlay.value = true
  // return
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const serial = userInfo?.result?.staff?.serial

  // if (!serial) {
  //   buyDialogShow.value = true
  //
  //   return
  // }

  if (myDataList.value.includes(id)) {
    showToast({
      message: '您已购买！',
      icon: 'warning'
    })
    return
  }

  if (![0, 1, 2, 3].includes(index)) {
    if (!myDataList.value?.length && index !== 4) {
      return showToast({
        message: '请先完成上一个等级！'
      })
    }
    const arr = []
    for (let i = 4; i < index; i++) {
      arr.push(staffList.value[i].id)
    }

    const flag = arr.every((item) => {
      return myDataList.value.includes(item)
    })

    if (!flag) {
      return showToast({
        message: '请先完成上一个等级！'
      })
    }
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
const staffList = ref([])
onMounted(() => {
  reqTreasureBasinPage().then((res) => {
    console.log('reqTreasureBasinPage', res)
    staffList.value = res.data || []
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
  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
})
onDeactivated(() => {
  clearInterval(timer)
})
</script>
<style lang="less" scoped>
.staffList {
  padding: 0 10px;
  .staff-item {
    position: relative;
    margin-top: 10px;
    height: 100px;
    background-image: linear-gradient(135deg, #3cd500 10%, #fff720 100%);
    border-radius: 10px;
    overflow: hidden;
    .vImg {
      width: 100%;
    }
    .levelImg {
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      height: 30px;
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 30px;
      position: absolute;
      left: 0;
      top: 0;
      color: #326dfa;
      font-weight: bolder;
      background-image: linear-gradient(135deg, #28c76f 10%, #81fbb8 100%);
      border-radius: 0 0 10px 0;
    }
    .content-center {
      position: absolute;
      top: 50%;
      left: 6%;
      font-size: 16px;
      letter-spacing: 2px;
      transform: translateY(-50%);
    }

    .content-bottom {
      background-color: rgba(0, 0, 0, 0.2);
      letter-spacing: 2px;
      position: absolute;
      bottom: 0px;
      font-size: 12px;
      padding: 5px 20px;
      box-sizing: border-box;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.info {
  color: #000;

  & > div {
    display: flex;
    align-items: center;
    margin: 10px;
    height: 40px;
    background-color: #fff;
    padding: 0 8px;
  }
}
</style>
