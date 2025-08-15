<template>
  <div class="rank">
    <!--    <van-nav-bar-->
    <!--      :class="{ inApp: getIsInApp() }"-->
    <!--      left-arrow-->
    <!--      placeholder-->
    <!--      safe-area-inset-top-->
    <!--      title="排行榜"-->
    <!--      @click-left="$router.back()"-->
    <!--    >-->
    <!--      <template #right>-->
    <!--        <span style="color: #000" @click="$router.push('/rankIntroduce')"> 排行榜奖励规则 </span>-->
    <!--      </template>-->
    <!--    </van-nav-bar>-->
    <div class="ranking">
      <div class="mui-content">
        <!--        <div class="hdgz" @click="$router.push('/rankIntroduce')">-->
        <!--          <a class="href" href="###" id="hdgz"> 查看活动规则 </a>-->
        <!--        </div>-->
        <div class="top">
          <img src="./images/ranking_top.png" alt="" class="tit" />
          <!--          <div class="date" id="hdsj">活动时间：2021年2月1日 - 2021年5月1日</div>-->
          <div class="str">排名越高，奖励越高</div>
          <div class="but">积分冲刺奖</div>
        </div>
        <div
          style="height: calc(100% - 250px); margin-bottom: 30px"
          class="mui-slider mui-fullscreen"
        >
          <!---<div style="font-size: 0.6rem; margin-top: 10px;margin-bottom: 10px;">
          <img src="images/ranking_laba.png" height="26" style="display: inline-block;vertical-align: bottom; margin-left: 14px;">
          <div style="display:inline-block;color: #f37a38;height:26px; line-height: 26px;" id="ad">
            每月积分都会清零
          </div>
        </div>--->
          <div
            id="sliderSegmentedControl"
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
            style="display: none"
          >
            <div class="mui-scroll" id="rankingtype">
              <!---<a class="mui-control-item mui-active" href="#" data-id="1" data-first="0">ggggggg</a>--->
            </div>
          </div>
          <div class="mui-slider-group" style="bottom: 0px; top: 10px">
            <div
              class="mui-slider-item mui-control-content mui-active"
              data-id="0"
              data-rn="广告体验"
            >
              <div id="scroll1" class="mui-scroll-wrapper">
                <div class="mui-scroll" style="height: 100%">
                  <ul
                    class="mui-grid-view mui-grid-9 table-time"
                    data-type="广告体验"
                    data-id="0"
                    style="background: #f5f5f5"
                  >
                    <!---<li class="mui-table-cell mui-col-xs-2" data-date="day">日榜</li>
                  <li class="mui-table-cell mui-col-xs-2" data-date="week" style="display: none;">周榜</li>
                  <li class="mui-table-cell mui-col-xs-2 mui-active" data-date="month">月榜</li>
                  <li class="mui-table-cell mui-col-xs-2" data-date="yesterDay">昨天</li>
                  <li class="mui-table-cell mui-col-xs-2" data-date="lastWeek" style="display: none;">上周</li>
                  <li class="mui-table-cell mui-col-xs-2" data-date="lastMonth">上月</li>--->
                  </ul>
                  <ul class="mui-grid-view mui-grid-9 table-title" style="display: flex !important">
                    <li class="mui-table-cell mui-col-xs-4">排名</li>
                    <li class="mui-table-cell mui-col-xs-4">用户</li>
                    <li class="mui-table-cell mui-col-xs-4">会员等级</li>
                  </ul>
                  <ul
                    class="mui-table-view"
                    id="paihangbang"
                    style="overflow-y: auto; height: calc(100% - 20px)"
                  >
                    <li
                      class="mui-table-view-cell ranking-list"
                      v-for="(item, index) in rankListCom"
                    >
                      <ul class="mui-grid-view mui-grid-9" style="display: flex">
                        <li class="mui-table-cell mui-col-xs-4">
                          <div class="index">a</div>
                          <div class="money">
                            <div class="money_a">{{ index + 1 }}</div>
                          </div>
                        </li>
                        <li class="mui-table-cell mui-col-xs-4">
                          <template v-if="item.nickname"> {{ item.nickname }}</template>
                          <template v-else>
                            {{
                              item.phone
                                ? item.phone.substring(0, 3) + '****' + item.phone.substring(7)
                                : ''
                            }}
                          </template>
                        </li>
                        <li class="mui-table-cell mui-col-xs-4">
                          {{ getSerialName(item.maxVipId) }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { getRankRecord, getWalletRank, reqConfigTake, reqRank, reqWalletStat } from '@/api/myApi'
import { Toast } from 'tdesign-mobile-vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import imageSrc1 from './images/rank1.png'
import imageSrc4 from './images/rank2.png'
import headImg from '@/assets/img/logo.png'
import ToggleTab from '@/components/toggleTab/toggleTab.vue'
import { getSerialName } from '@/utils/getSerialName'

const getPhone = (phone) => {
  if (!phone) {
    return '--'
  }
  if (phone?.length === 11) {
    return phone.slice(0, 3) + '****' + phone.slice(7)
  } else {
    return '--'
  }
}
const r1 = ref([])
const r2 = ref([])
const r3 = ref([])
const r4 = ref([])
const rankList = computed(() => {
  if (activeTab.value === 0) {
    return r1.value
  } else if (activeTab.value === 1) {
    return r2.value
  } else if (activeTab.value === 2) {
    return r3.value
  } else {
    return r4.value
  }
})
const rankListCom = computed(() => {
  const arr = (rankList.value || []).slice(3)
  return arr
})
const total = ref(0)
const getRank = () => {
  Toast({
    theme: 'loading',
    message: '加载中...',
    duration: 0
  })
  reqRank().then((res) => {
    Toast.clear()
    if (res.code === 200) {
      r1.value = (res.data || []).filter(
        (item) => !['18317687729', '15616911928', '19273022704'].includes(item.user?.phone)
      )
    }
    // rankList.value = [
    //   {
    //     avatar:
    //       'https://thirdwx.qlogo.cn/mmopen/vi_32/aOTngDEqxRwRbfzBZ5bFJoTXcia5WMoq5F0QwdYLkw2BJ6R3ib5mQ0Qpjv87pwUs66sVHQ6WtFUHw0xRZk8hZl9MAHY6AHkbNkP4vaQGibYJ2c/132',
    //     id: 1,
    //     nickname: '暴走兔',
    //     phone: '',
    //     total: 101
    //   },
    //   { avatar: '', id: 2, nickname: '', phone: '18743133130', total: 102 },
    //   {
    //     avatar:
    //       'https://thirdwx.qlogo.cn/mmopen/vi_32/aOTngDEqxRwRbfzBZ5bFJoTXcia5WMoq5F0QwdYLkw2BJ6R3ib5mQ0Qpjv87pwUs66sVHQ6WtFUHw0xRZk8hZl9MAHY6AHkbNkP4vaQGibYJ2c/132',
    //     id: 3,
    //     nickname: '暴走兔',
    //     phone: '',
    //     total: 103
    //   },
    //   { avatar: '', id: 4, nickname: '暴走兔', phone: '', total: 104 },
    //   { avatar: '', id: 5, nickname: '暴走兔', phone: '', total: 105 },
    //   {
    //     avatar:
    //       'https://thirdwx.qlogo.cn/mmopen/vi_32/aOTngDEqxRwRbfzBZ5bFJoTXcia5WMoq5F0QwdYLkw2BJ6R3ib5mQ0Qpjv87pwUs66sVHQ6WtFUHw0xRZk8hZl9MAHY6AHkbNkP4vaQGibYJ2c/132',
    //     id: 6,
    //     nickname: '暴走兔',
    //     phone: '',
    //     total: 106
    //   },
    //   { avatar: '', id: 7, nickname: '暴走兔', phone: '', total: 107 },
    //   { avatar: '', id: 8, nickname: '暴走兔', phone: '', total: 108 },
    //   { avatar: '', id: 9, nickname: '暴走兔', phone: '', total: 109 },
    //   { avatar: '', id: 10, nickname: '暴走兔', phone: '', total: 110 },
    //   { avatar: '', id: 11, nickname: '暴走兔', phone: '', total: 111 }
    // ]
  })
}

getRank()
const activeTab = ref(0)
const tabChange = (type) => {
  activeTab.value = type
}
reqConfigTake().then((res) => {
  console.log('reqWalletStat', res)
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
const transfer = (num) => {
  num = num * 1
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}
onMounted(() => {
  const countdown = getCountdown()
  timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`

  setInterval(() => {
    const countdown = getCountdown()
    timeTxt.value = `${countdown.days}天 ${transfer(countdown.hours)} : ${transfer(countdown.minutes)} : ${transfer(countdown.seconds)}`
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style lang="less" scoped>
.rank {
  width: 100%;
  height: 100vh;

  //background-image: url('@/assets/img/bg.png');
  //background-size: 100% 100%;
  //background-image: linear-gradient(180deg, #fed61f 10%, rgba(213, 254, 31, 0.22) 100%);
  overflow: auto;
  .list {
    position: relative;
    //width: 90%;
    margin: auto;
    //height: calc(100vh - 20px);
    padding-top: 10px;
    padding-bottom: 20px;
    //height: 240px;
    //background-color: rgba(23, 33, 66, 0.66);
    display: flex;
    flex-direction: column;
    //background:
    //  url('./images/rank-bg4.png') no-repeat top center/ 100% auto,
    //  url('./images/rank-bg5.png') no-repeat center 20px / 80% 90%;
    //overflow: hidden;
    .list-container {
      flex: 1;
      overflow-y: auto;
    }
    .list-item {
      //width: 70%;
      margin: auto;
      color: #fff;
      display: flex;
      //border-bottom: 1px dotted #fff;
      box-shadow: inset 0px -1px 1px -1px #fff;
      padding-top: 5px;
      & > div {
        height: 60px;
        line-height: 60px;
        width: 40%;
        text-align: center;

        &:nth-child(1) {
          color: #fff;
          //background-image: url('./images/four.png');
          background-repeat: no-repeat;
          width: 20%;
          background-size: 26px auto;
          background-position: center 5px;
        }
        &:nth-child(4) {
          color: #ece11f;
          font-size: 14px;
          font-weight: bolder;
        }
      }
      & > section {
        img {
          border-radius: 50%;
          width: 50px !important;
          height: 50px !important;
        }
      }
      &:nth-child(2) {
        & > div:nth-child(1) {
          //background-image: url('./images/one.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
      &:nth-child(3) {
        & > div:nth-child(1) {
          //background-image: url('./images/two.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
      &:nth-child(4) {
        & > div:nth-child(1) {
          //background-image: url('./images/three.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
    }
  }

  :deep(.van-nav-bar) {
    background: transparent;
    .van-nav-bar__title {
      color: #fff;
    }

    .van-nav-bar__text {
      color: #fff;
    }

    .van-icon {
      color: #000;
    }
  }
  :deep(.van-hairline--bottom) {
    &:after {
      border-bottom: none;
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: 200px;
  }
}

.qiansan {
  width: 100%;
  height: 180px;
  position: relative;
  .one,
  .two,
  .three {
    position: absolute;
    background: url('./images/rank-avatar-bg.png');
    background-size: 100% 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
      position: relative;
      width: 75px;
      height: 75px;
      .img-box {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }

      p {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        width: 20px;
        height: 20px;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    }
    .info {
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      p {
        color: transparent;
        //background-image: -webkit-linear-gradient(45deg, #f3debb, #fcf6ed); /* Chrome, Safari */
        //background-image: linear-gradient(45deg, #f3debb, #fcf6ed); /* 标准语法 */
        //-webkit-background-clip: text; /* Chrome, Safari */
        //background-clip: text;
        white-space: nowrap;
        font-size: 16px;

        &:nth-child(1) {
          color: #fff;
        }
        &:nth-child(2) {
          color: #ece11f;
          margin-top: 4px;
          background-color: rgba(0, 0, 0, 0.2);
          padding: 2px 25px;
          border-radius: 10px;
        }
      }
    }
  }
  .two,
  .three {
    top: 30px;
    width: 95px;
    height: 80px;
    .info {
      bottom: -65px;
    }
  }
  .one {
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 100px;
    .info {
      font-size: 16px;
      bottom: -50px;
    }
  }
  .two {
    left: 5%;
  }
  .three {
    right: 5%;
  }
}
.linear {
  background-image: -webkit-linear-gradient(45deg, #f3debb, #fcf6ed); /* Chrome, Safari */
  background-image: linear-gradient(45deg, #f3debb, #fcf6ed); /* 标准语法 */
  -webkit-background-clip: text; /* Chrome, Safari */
  background-clip: text;
  color: transparent;
}
.fenhong {
  //display: flex;
  //justify-content: center;
  //background: url('./images/square.png') no-repeat center center/ 100% 100%;
  overflow: hidden;
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: bolder;
    margin-top: 10px;
  }
  .money {
    text-align: center;
    font-size: 32px;
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
.ranking {
  overflow: hidden;
  height: 100vh;
  background: url('./images/ranking_bg.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #ac0000;
}
.mui-content {
  padding-bottom: 230px !important;
  top: 0;
  background: none;
}
.ranking .mui-bar-index {
  height: 230px;
  box-shadow: none;
  background: none;
}
.ranking .mui-slider {
  top: 230px !important;
  background: #fff;
  border-radius: 3px;
  margin-left: 14px;
  width: calc(100% - 28px);
}
.mui-table-view-cell:after {
  background: none;
}
.top {
  margin-top: 30px;
  padding: 0 20px;
  position: relative;
}
.top .tit {
  width: 100%;
  display: block;
}
.top .date {
  text-align: center;
  font-size: 12px;
  color: #ffeca0;
  padding-top: 0.6rem;
}
.top .str {
  text-align: center;
  font-size: 14px;
  color: #fff;
  padding-top: 6px;
}
.top .but {
  width: 70px;
  margin: 0 auto;
  margin-top: 5px;
  font-size: 8px;
  padding: 3px;
  color: #fff;
  background-image: linear-gradient(to top, #ff716f, #ff4e60);
  background-color: #ff716f;
  text-align: center;
  border-radius: 20px;
  border: 2px solid #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  display: none;
}
.top .but a {
  display: block;
  color: #fff;
}
.top .shang {
  position: absolute;
  font-size: 8px;
  bottom: 5px;
  right: 5px;
  display: none;
}
.top .shang a {
  color: #fff;
}

.mui-segmented-control.mui-segmented-control-inverted .mui-control-item {
  color: #fb6c70;
}
.ranking-list .index {
  background: url('./images/ranking_index.png') no-repeat;
  display: inline-block;
  background-size: 100%;
  color: #f47f24;
  font-weight: 600;
  text-align: center;
  width: 12px;
  height: 20px;
  font-size: 7px;
  position: relative;
  z-index: 10;
}
.ranking-list .money {
  display: inline-block;
  background: #fc6a2d;
  color: #fff;
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  padding: 0 3px 0 4px;
  position: relative;
  left: -2px;
  z-index: 1;
  letter-spacing: 1px;
  transform: skewX(-20deg);
}

.ranking .mui-table-cell {
  color: #f37a38;
}
.mui-fullscreen .mui-segmented-control ~ .mui-slider-group {
  top: 100px;
}

.mui-slider-indicator.mui-segmented-control {
  border-radius: 22px;
  border: 2px #f37a38 solid;
  height: 44px;
  padding: 1px;
  width: calc(100% - 28px);
  margin-left: 14px;
}
.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
  background-image: linear-gradient(to top, #ff716f, #ff4e60);
  background-color: #ff716f;
  border-radius: 20px;
  color: #ffffff !important;
}

.ranking
  .mui-slider
  .mui-segmented-control.mui-segmented-control-inverted
  ~ .mui-slider-group
  .mui-slider-item {
  border-top: 0px solid #ddd;
}

.hdgz {
  position: fixed;
  top: 30px;
  right: 0;
  background: #ffe421;
  border-radius: 15px 0 0 15px;
  height: 30px;
  line-height: 30px;
  padding-right: 10px;
  padding-left: 20px;
  font-size: 1rem;
  z-index: 999;
}
.hdgz a {
  color: #f00;
  font-weight: 500;
}
.ranking .table-title {
  background: #fff;
}

.table-time .mui-active {
  color: #f00 !important;
}
</style>
