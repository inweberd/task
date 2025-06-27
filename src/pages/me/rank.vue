<template>
  <div class="rank">
    <!--    <van-nav-bar-->
    <!--      title="排行榜"-->
    <!--      safe-area-inset-top-->
    <!--      :class="{ inApp: getIsInApp() }"-->
    <!--      placeholder-->
    <!--      left-text="返回"-->
    <!--      left-arrow-->
    <!--      @click-left="$router.back()"-->
    <!--    />-->
    <van-nav-bar
      style="position: fixed; top: 0; left: 0; z-index: 9; width: 100%; background-color: #e5f4f2"
      left-arrow
      placeholder
      title="每日钻石奖励分红榜"
      @click-left="$router.back()"
    >
      <template #right>
        <span style="color: #fff" @click="$router.push('/rankIntroduce')"> 奖励发放规则 </span>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <ToggleTab @change="tabChange" style="margin-top: 40px"></ToggleTab>
    <div class="fenhong">
      <div class="title">
        <!--        本次周期分红总金额 <br />-->
        <!--          （每X天进行一轮分红） <br />-->
        <!--          <div style="display: flex; align-items: center">-->
        <span>{{ activeTab == 0 ? '本日奖池总钻石' : '本日手续费奖池' }}</span>
        <div class="money" v-if="activeTab == 0">{{ (total * 1).toFixed(2) }}</div>
        <div class="money" v-else>{{ (total2 * 1).toFixed(2) }}</div>
        <!--          </div>-->
      </div>

      <!--        <van-divider style="border-color: #bababa"></van-divider>-->
      <!--      <div style="text-align: center; margin-top: 10px">-->
      <!--        <div class="" style="font-size: 20px; font-weight: bolder">-->
      <!--          奖金发放倒计时：{{ timeTxt }}-->
      <!--        </div>-->
      <!--        &lt;!&ndash;          <div class="money" style="font-size: 22px; color: #000">{{ timeTxt }}</div>&ndash;&gt;-->
      <!--      </div>-->
    </div>
    <div class="qiansan" v-if="false">
      <div class="one">
        <div class="box">
          <div class="img-box">
            <img
              style="width: 100%; height: 100%"
              v-if="rankList?.[0]?.avatar"
              :src="rankList?.[1]?.avatar"
              alt=""
            />
            <img style="width: 80%; height: 80%" v-else :src="headImg" alt="" />
          </div>
          <p>1</p>
        </div>
        <div class="info">
          <p>{{ rankList?.[0]?.nickname || getPhone(rankList?.[0]?.phone) || '--' }}</p>

          <!--          <p>￥{{ rankList?.[0]?.total || '&#45;&#45;' }}</p>-->
        </div>
      </div>
      <div class="two">
        <div class="box">
          <div class="img-box">
            <img
              style="width: 100%; height: 100%"
              v-if="rankList?.[1]?.avatar"
              :src="rankList?.[1]?.avatar"
              alt=""
            />
            <img style="width: 80%; height: 80%" v-else :src="headImg" alt="" />
          </div>

          <p>2</p>
        </div>
        <div class="info">
          <p>{{ rankList?.[1]?.nickname || getPhone(rankList?.[1]?.phone) || '--' }}</p>
          <!--          <p>￥{{ rankList?.[1]?.total || '&#45;&#45;' }}</p>-->
        </div>
      </div>
      <div class="three">
        <div class="box">
          <div class="img-box">
            <img
              style="width: 100%; height: 100%"
              v-if="rankList?.[2]?.avatar"
              :src="rankList?.[1]?.avatar"
              alt=""
            />
            <img style="width: 80%; height: 80%" v-else :src="headImg" alt="" />
          </div>
          <p>3</p>
        </div>
        <div class="info">
          <p>{{ rankList?.[2]?.nickname || getPhone(rankList?.[2]?.phone) || '--' }}</p>

          <!--          <p>￥{{ rankList?.[2]?.total || '&#45;&#45;' }}</p>-->
        </div>
      </div>
    </div>

    <div class="list">
      <!--      <div style="position: absolute; left: 0; top: -40px; width: 100%; color: #cda65b">-->
      <!--        <p style="text-align: center; width: 100%">每周统计一次分红资格</p>-->
      <!--        <p style="text-align: center; width: 100%; font-weight: bolder; font-size: 15px">-->
      <!--          前50名在榜的用户可获得全网超级分红-->
      <!--        </p>-->
      <!--      </div>-->
      <!--      <div class="list-header">-->
      <!--        <div class="list-item">-->
      <!--          <div style="background: none; color: #fff">排名</div>-->
      <!--          <div>手机号</div>-->
      <!--          <div>本周佣金</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="list-container">
        <div class="list-item" v-for="(item, index) of activeTab == 0 ? rankList : rankList2">
          <div>{{ index + 1 }}</div>
          <section>
            <img :src="item.avatar || headImg" style="width: 100%; height: 100%" alt="" />
          </section>
          <div style="position: relative; overflow: hidden">
            <!--            <img src="./images/icon-rz.png" alt="" />-->
            <!--            <div style="display: flex; flex-direction: column; position: relative">-->
            <!--            <div-->
            <!--              style="width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"-->
            <!--            >-->
            <!--            <div>-->
            <span
              style="
                width: 100%;
                line-height: 16px;
                margin-left: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ item.nickname || item.phone }}
            </span>
            <div
              style="
                margin-left: 10px;
                line-height: 16px;
                color: #ccc !important;
                margin-top: 5px;
                line-height: 16px;
              "
            >
              天梯等级： {{ item.basin_name }}
            </div>
            <!--            </div>-->
            <!--              <span style="line-height: 16px; margin-top: 5px; font-weight: bolder">-->
            <!--                本周已挣元宝：{{ +item.total.toFixed(4) }}-->
            <!--              </span>-->
            <!--              <div-->
            <!--                style="line-height: 16px; position: absolute; top: 24px; left: -22px; color: red"-->
            <!--              >-->
            <!--                等级：{{ item?.vip?.name || '暂无特权' }}-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
          <div>
            <template v-if="item.max_staff_id == 1">
              <div class="lan">
                <img style="width: 15px; margin-right: 6px" src="./images/icon-rz.png" alt="" />
                蓝钻会员
              </div>
            </template>
            <template v-else-if="item.max_staff_id == 2">
              <div class="huang">
                <img style="width: 15px; margin-right: 6px" src="./images/icon-rz.png" alt="" />
                黄钻会员
              </div>
            </template>
            <template v-else-if="item.max_staff_id == 3">
              <div class="zi">
                <img style="width: 15px; margin-right: 6px" src="./images/icon-rz.png" alt="" />
                紫钻会员
              </div>
            </template>
            <template v-else>
              <div>暂无会员</div>
            </template>
            <!--            <div>￥0</div>-->
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      v-if="activeTab == 1 && !rankList2.length"
    >
      <van-empty description="暂无数据" style="color: #fff">
        <template #description>
          <div style="color: #fff; font-size: 22px">暂无数据</div>
        </template>
      </van-empty>
    </div>
    <!--    <div style="width: 100%; color: #cda65b; font-size: 16px; margin-bottom: 6px">-->
    <!--      <p class="linear" style="text-align: center; width: 100%">每周统计一次分红资格</p>-->
    <!--      <p-->
    <!--        class="linear"-->
    <!--        style="text-align: center; width: 100%; font-weight: bolder; font-size: 15px"-->
    <!--      >-->
    <!--        前50名在榜的用户可获得全网超级分红-->
    <!--      </p>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import {
  getRankRecord,
  getWalletRank,
  getWalletRankByVip,
  reqWalletStat,
  reqWalletStatShouxufei
} from '@/api/myApi'
import { Toast } from 'tdesign-mobile-vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import imageSrc1 from './images/rank1.png'
import imageSrc4 from './images/rank2.png'
import headImg from '@/assets/img/white-logo.jpg'
import ToggleTab from '@/components/toggleTab/toggleTab.vue'

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
const rankList = ref([])
const rankList2 = ref([])
const rankListCom = computed(() => {
  const arr = rankList.value.slice(3)
  return arr
})
const total = ref(0)
const total2 = ref(0)
const getRank = () => {
  Toast({
    theme: 'loading',
    message: '加载中...',
    duration: 0
  })
  getWalletRank({
    limit: 50
  }).then((res) => {
    Toast.clear()
    console.log('getWalletRank', res)
    rankList.value = (res.data || []).filter((item) => {
      // return !['185****1537', '185****0630'].includes(item.phone)
      return true
    })
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

  getWalletRankByVip({
    limit: 50
  }).then((res) => {
    console.log('getWalletRank', res)
    rankList2.value = (res.data || []).filter((item) => {
      // return !['185****1537', '185****0630'].includes(item.phone)
      return true
    })
  })
}

getRank()
reqWalletStat().then((res) => {
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
reqWalletStatShouxufei().then((res) => {
  total2.value = res.data.value
  console.log('reqWalletStatShouxufei', res)
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
    nextSunday.setDate(nextSunday.getDate())
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

const activeTab = ref(0)
const tabChange = (type) => {
  activeTab.value = type
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
  //background-color: #e5f4f2;
  background-image: linear-gradient(45deg, #68b742, #63b53d); /* 标准语法 */

  overflow: auto;
  border: 1px solid transparent;
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
      margin: 0px 15px 0;
    }
    .list-item {
      //width: 70%;
      margin-bottom: 10px;
      border-radius: 15px;
      color: #fff;
      display: flex;
      //border-bottom: 1px dotted #fff;
      //box-shadow: inset 0px -1px 1px -1px #fff;
      padding-top: 5px;
      background-color: #248c29;
      align-items: center;

      & > div {
        //width: 40%;
        text-align: center;

        &:nth-child(1) {
          height: 80px;
          line-height: 80px;
          color: #fff;
          //background-image: url('./images/four.png');
          background-repeat: no-repeat;
          width: 10%;
          background-size: 26px auto;
          background-position: center 5px;
        }

        &:nth-child(3) {
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          flex: 1;

          //white-space: nowrap;
          img {
            margin: 0 5px 0 20px;
            width: 18px;
          }
        }
        &:nth-child(4) {
          flex: 0 0 90px;

          height: 100%;
          display: flex;
          justify-content: end;
          //width: 30%;
          font-size: 14px;
          font-weight: bolder;

          div {
            margin-right: 4px;
            font-size: 12px;
            padding: 6px 8px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000;
            background-image: linear-gradient(to right, #ccc, #ddd);

            &.huang {
              background-image: linear-gradient(to right, #fad71d, #f8bd20);
              color: #ce7403;
            }
            &.lan {
              color: #fff;
              background-image: linear-gradient(to right, #31b7fb, #3588f4);
            }
            &.zi {
              color: #fff;
              background-image: linear-gradient(to right, #b481f4, #a560e9);
            }
          }
        }
      }
      & > section {
        display: flex;
        align-items: center;
        img {
          border-radius: 50%;
          width: 50px !important;
          height: 50px !important;
        }
      }
    }
  }

  :deep(.van-nav-bar) {
    background: #65b63f !important;
    .van-nav-bar__title {
      color: #ffffff !important;
    }

    .van-nav-bar__text {
      color: #fff !important;
    }

    .van-icon {
      color: #fff;
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
  background-image: url('@/assets/img/rank-bg.png');
  background-size: 100% 100%;
  //background-position-y: -50px;

  background-repeat: no-repeat;
  width: 100%;
  height: 400px;
  position: relative;
  .one,
  .two,
  .three {
    position: absolute;
    //background: url('./images/rank-avatar-bg.png');
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
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      p {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        width: 30px;
        height: 30px;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 2px solid #143140;
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
    top: 180px;
    width: 95px;
    height: 80px;
    .info {
      bottom: -65px;
    }
  }
  .one {
    top: 170px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 100px;
    .box {
      width: 120px;
      height: 120px;
      .img-box {
        border: 2px solid #f2a304;
      }
      p {
        background-color: #f2a304;
      }
    }
    .info {
      font-size: 16px;
      bottom: -50px;
    }
  }
  .two {
    left: 5%;
    .box {
      p {
        background-color: #44d7b6;
      }
      .img-box {
        border: 2px solid #44d7b6;
      }
    }
  }
  .three {
    right: 5%;
    .box {
      p {
        background-color: #32c5ff;
      }
      .img-box {
        border: 2px solid #32c5ff;
      }
    }
  }
}
.linear {
  background-image: -webkit-linear-gradient(45deg, #68b742, #63b53d); /* Chrome, Safari */
  background-image: linear-gradient(45deg, #68b742, #63b53d); /* 标准语法 */
  -webkit-background-clip: text; /* Chrome, Safari */
  background-clip: text;
  color: transparent;
}
.fenhong {
  //position: absolute;
  z-index: 2;
  width: 100%;
  //margin-top: 40px;
  color: #000;

  //display: flex;
  //justify-content: center;
  //background: url('./images/square.png') no-repeat center center/ 100% 100%;
  overflow: hidden;
  .title {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: bolder;
    margin-top: 10px;
  }
  .money {
    width: 100%;
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
</style>
