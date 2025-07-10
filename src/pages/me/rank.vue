<template>
  <div class="rank">
    <van-nav-bar
      title="排行榜"
      safe-area-inset-top
      :class="{ inApp: getIsInApp() }"
      placeholder
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!--    <van-swipe-->
    <!--      style="transform: translateY(120px)"-->
    <!--      class="my-swipe"-->
    <!--      :autoplay="3000"-->
    <!--      indicator-color="white"-->
    <!--    >-->
    <!--      &lt;!&ndash;          <van-swipe-item>&ndash;&gt;-->
    <!--      &lt;!&ndash;            <img src="./images/banner3.png" alt="" />&ndash;&gt;-->
    <!--      &lt;!&ndash;          </van-swipe-item>&ndash;&gt;-->
    <!--      &lt;!&ndash;          <van-swipe-item>&ndash;&gt;-->
    <!--      &lt;!&ndash;            <img src="./images/banner4.png" alt="" />&ndash;&gt;-->
    <!--      &lt;!&ndash;          </van-swipe-item>&ndash;&gt;-->
    <!--      <van-swipe-item>-->
    <!--        <van-image :src="imageSrc1" width="100%" height="200" fit="fill"></van-image>-->
    <!--      </van-swipe-item>-->
    <!--      <van-swipe-item>-->
    <!--        <van-image :src="imageSrc4" width="100%" height="200" fit="fill"></van-image>-->
    <!--      </van-swipe-item>-->
    <!--    </van-swipe>-->
    <!--    <div style="display: flex; justify-content: center; margin-top: 10px">-->
    <!--      <img src="./images/rank-bg2.png" style="width: 95%" alt="" />-->
    <!--    </div>-->
    <div class="fenhong">
      <!--      <div>-->
      <!--        <div class="title">-->
      <!--          &lt;!&ndash;        本次周期分红总金额 <br />&ndash;&gt;-->
      <!--          &lt;!&ndash;          （每X天进行一轮分红） <br />&ndash;&gt;-->
      <!--          <div>本周（第七周）奖池金额</div>-->
      <!--        </div>-->
      <!--        <div class="money">￥{{ total }}</div>-->
      <!--      </div>-->
      <!--      <van-divider style="border-color: #bababa"></van-divider>-->
      <!--      <div style="text-align: center; margin-top: 10px">-->
      <!--        <div class="" style="font-size: 24px; font-weight: bolder">本轮奖池金额发放倒计时</div>-->
      <!--        <div class="money" style="font-size: 22px; color: #000">{{ timeTxt }}</div>-->
      <!--      </div>-->
    </div>
    <div class="qiansan">
      <div class="one">
        <div class="box">
          <div class="img-box">
            <img :src="rankList?.[0]?.avatar || headImg" style="width: 100%; height: 100%" alt="" />
          </div>
          <p>1</p>
        </div>
        <div class="info">
          <p style="color: #000">
            {{ rankList?.[0]?.nickname || getPhone(rankList?.[0]?.phone) || '--' }}
          </p>

          <p>￥{{ rankList?.[0]?.total || '--' }}</p>
        </div>
      </div>
      <div class="two">
        <div class="box">
          <div class="img-box">
            <img :src="rankList?.[1]?.avatar || headImg" style="width: 100%; height: 100%" alt="" />
          </div>

          <p>2</p>
        </div>
        <div class="info">
          <p style="color: #000">
            {{ rankList?.[1]?.nickname || getPhone(rankList?.[1]?.phone) || '--' }}
          </p>
          <p>￥{{ rankList?.[1]?.total || '--' }}</p>
        </div>
      </div>
      <div class="three">
        <div class="box">
          <div class="img-box">
            <img :src="rankList?.[2]?.avatar || headImg" style="width: 100%; height: 100%" alt="" />
          </div>
          <p>3</p>
        </div>
        <div class="info">
          <p style="color: #000">
            {{ rankList?.[2]?.nickname || getPhone(rankList?.[2]?.phone) || '--' }}
          </p>

          <p>￥{{ rankList?.[2]?.total || '--' }}</p>
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
        <div v-if="!rankListCom?.length" style="text-align: center; line-height: 200px">
          暂无数据
        </div>
        <div class="list-item" v-for="(item, index) of rankListCom">
          <div style="color: #000">{{ index + 4 }}</div>
          <section>
            <img :src="item.avatar || headImg" style="width: 100%; height: 100%" alt="" />
          </section>
          <div style="color: #000">{{ item.nickname || getPhone(item.phone) }}</div>
          <div style="color: #000">￥{{ item.total }}</div>
        </div>
      </div>
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
import { getRankRecord, getWalletRank, reqWalletStat } from '@/api/myApi'
import { Toast } from 'tdesign-mobile-vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import imageSrc1 from './images/rank1.png'
import imageSrc4 from './images/rank2.png'
import headImg from '@/assets/img/logo.png'

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
const rankListCom = computed(() => {
  const arr = rankList.value.slice(3)
  return arr
})
const total = ref(0)
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
    rankList.value = res.data?.list || []
    rankList.value = [
      {
        avatar:
          'https://thirdwx.qlogo.cn/mmopen/vi_32/aOTngDEqxRwRbfzBZ5bFJoTXcia5WMoq5F0QwdYLkw2BJ6R3ib5mQ0Qpjv87pwUs66sVHQ6WtFUHw0xRZk8hZl9MAHY6AHkbNkP4vaQGibYJ2c/132',
        id: 1,
        nickname: '暴走兔',
        phone: '',
        total: 101
      },
      { avatar: '', id: 2, nickname: '', phone: '18743133130', total: 102 },
      {
        avatar:
          'https://thirdwx.qlogo.cn/mmopen/vi_32/aOTngDEqxRwRbfzBZ5bFJoTXcia5WMoq5F0QwdYLkw2BJ6R3ib5mQ0Qpjv87pwUs66sVHQ6WtFUHw0xRZk8hZl9MAHY6AHkbNkP4vaQGibYJ2c/132',
        id: 3,
        nickname: '暴走兔',
        phone: '',
        total: 103
      },
      { avatar: '', id: 4, nickname: '暴走兔', phone: '', total: 104 },
      { avatar: '', id: 5, nickname: '暴走兔', phone: '', total: 105 },
      {
        avatar:
          'https://thirdwx.qlogo.cn/mmopen/vi_32/aOTngDEqxRwRbfzBZ5bFJoTXcia5WMoq5F0QwdYLkw2BJ6R3ib5mQ0Qpjv87pwUs66sVHQ6WtFUHw0xRZk8hZl9MAHY6AHkbNkP4vaQGibYJ2c/132',
        id: 6,
        nickname: '暴走兔',
        phone: '',
        total: 106
      },
      { avatar: '', id: 7, nickname: '暴走兔', phone: '', total: 107 },
      { avatar: '', id: 8, nickname: '暴走兔', phone: '', total: 108 },
      { avatar: '', id: 9, nickname: '暴走兔', phone: '', total: 109 },
      { avatar: '', id: 10, nickname: '暴走兔', phone: '', total: 110 },
      { avatar: '', id: 11, nickname: '暴走兔', phone: '', total: 111 }
    ]
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
  background-image: linear-gradient(180deg, #fed61f 10%, rgba(213, 254, 31, 0.22) 100%);
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
</style>
