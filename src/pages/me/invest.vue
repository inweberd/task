<template>
  <div style="padding: 40px 0px 50px; overflow-y: auto">
    <!--    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />-->
    <Loading v-if="loading" />
    <!--    <div class="title" style="color: #b4a482; font-size: 22px">会员权益卡</div>-->
    <van-image :src="imageSrc1" width="100%" height="220" fit="fill"></van-image>

    <!--    <div class="alarmList-child">-->
    <!--      <div class="alarm-item" v-for="(item, index) in alarmList" :key="index">-->
    <!--        <div class="phone">{{ item.phone }}</div>-->
    <!--        <div class="type">会员权益</div>-->
    <!--        <div class="money">获取佣金{{ item.money }}元</div>-->
    <!--        &lt;!&ndash;        <div class="datetime">{{ item.datetime }}</div>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">-->
    <!--      <van-swipe-item>1</van-swipe-item>-->
    <!--      <van-swipe-item>2</van-swipe-item>-->
    <!--      <van-swipe-item>3</van-swipe-item>-->
    <!--      <van-swipe-item>4</van-swipe-item>-->
    <!--    </van-swipe>-->
    <!--    <div class="black-tip">-->
    <!--      <div>-->
    <!--        <div>开通不同等级会员， <span class="active"> 收益永久叠加</span> 生效 ！</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="announcement">
      <div class="announcement-task flexS">
        <div style="overflow: scroll; width: 100%; box-sizing: border-box; padding: 0 10px">
          <div
            v-for="(item, index) of shopList"
            style="
              margin-top: 10px;
              text-align: center;
              color: #fff;
              display: flex;
              background: #4086ff;
              width: 100%;
              border-radius: 10px;
            "
          >
            <div style="width: 100%; padding: 10px">
              <div>
                <div
                  style="
                    display: inline-block;
                    width: 25%;
                    white-space: nowrap;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                  "
                >
                  {{ getSerialName(item.serial) }}
                </div>
                <div
                  style="
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                  "
                >
                  日收益
                </div>
                <div
                  style="
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                  "
                >
                  总收入
                </div>
                <div
                  style="
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                  "
                >
                  有效期
                </div>
              </div>
              <div>
                <div
                  style="
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                    font-size: 16px;
                  "
                >
                  {{ item.price }}元
                </div>
                <div
                  style="
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                  "
                >
                  {{ shouyiArrDay[index] }}元
                </div>
                <div
                  style="
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                  "
                >
                  {{ shouyiArrDay[index] * youxiaoArr[index] }}元
                </div>
                <div
                  style="
                    display: inline-block;
                    width: 25%;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                  "
                >
                  {{ youxiaoArr[index] }}天
                </div>
              </div>

              <div
                style="
                  background: #fff;
                  color: #6344bb;
                  width: 65px;
                  margin: 10px auto;
                  font-weight: bold;
                "
                :style="{
                  background: myStaffList.includes(item.id) ? '#a8bce0' : '#fff'
                }"
                @click="buy(item)"
              >
                <span style="font-size: 16px" v-if="myStaffList.includes(item.id)">已开通</span>
                <span style="font-size: 16px" v-else>点击开通</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="false"
          data-cid="1"
          class="a-t-items"
          v-for="(item, index) of shopList"
          @click="buy(item)"
        >
          <div class="a-t-text">
            <div class="a-t-t-3">
              <div class="a-t-title" style="width: 92%; left: 0; color: #b4a482; margin-left: 5%">
                <!--                <img v-if="item.vipIcon" :src="item.vipIcon" alt="" style="float: right" />-->
                <div
                  style="
                    float: right;
                    margin-left: 6px;
                    background: #4b6fff;
                    color: #fff;
                    border-radius: 2px;
                    font-size: 12px;
                    text-align: center;
                    padding: 2px 5px;
                  "
                >
                  <template v-if="index === 0"> 会员体验卡 </template>
                  <template v-else> LV{{ index + 1 }}会员 </template>
                </div>
                <b style="font-size: 16px">{{ item.name }} </b><br />
              </div>
              <div
                class="jiage"
                style="position: absolute; right: 85px; top: 2px; color: #fff; font-size: 18px"
              >
                ￥{{ item.price }}
              </div>
              <div
                class="info"
                style="
                  position: absolute;
                  left: 0px;
                  bottom: 4px;
                  color: #fff;
                  font-size: 14px;
                  display: flex;
                  justify-content: space-around;
                  width: 100%;
                "
              >
                <span>会员期限：永久使用</span>
                <span> </span>
              </div>
              <div
                style="
                  height: 150px;
                  width: 100%;
                  color: #4b6fff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  font-size: 18px;
                "
              >
                <div style="margin-top: -20px">
                  <!--                  {{ index + 1 }}级会员观看视频每条-->
                  <div style="text-align: center; line-height: 30px">
                    <template v-if="index === 0"> 开通会员体验卡 </template>
                    <template v-else> 开通{{ daxieArr[index] }}级会员 </template>
                  </div>
                  <div style="text-align: center; line-height: 30px">
                    <span style="color: #07c160"> 每日保底收入{{ shouyiArrDay[index] }}元</span>
                  </div>
                </div>
              </div>

              <div class="introduce">
                <span style="font-size: 16px" v-if="myStaffList.includes(item.id)">已开通</span>
                <span style="font-size: 16px" v-else>点击开通</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseFooter v-bind:init-tab="5" :is-white="false" />
</template>
<script setup lang="ts">
import imageSrc1 from '@/assets/img/hehuoren.jpg'
import imageSrc2 from '@/assets/img/hehuoren2.png'
import imageSrc3 from '@/assets/img/goumai.png'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import {
  reqAllStaff,
  reqCreateShareLog,
  reqEnterStaff,
  reqMyStaff,
  reqRecordTask,
  reqTaskMoney,
  reqUserIncome,
  reqUserStaff,
  reqWalletInfo
} from '@/api/myApi.js'
import { closeToast, showFailToast, showLoadingToast, showNotify, showToast } from 'vant'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import { getSerialName } from '@/utils/getSerialName'
import { userinfo } from '@/api/user'
import dayjs from 'dayjs'
import BaseFooter from '@/components/BaseFooter.vue'
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
defineOptions({
  name: 'invest'
})
const userIncomeInfo = ref({})
const shouyiArrDay = [5, 15, 24, 70, 120, 160, 200, 400]
const youxiaoArr = [55, 55, 49, 49, 45, 45, 45, 45]
const daxieArr = ['', '一', '二', '三', '四', '五', '六', '七']

const shopList = ref([
  {
    icon: 'pdd'
  },
  {
    icon: 'pdd'
  },
  {
    icon: 'tb'
  },
  {
    icon: 'tm'
  },
  {
    icon: 'jd'
  },
  {
    icon: 'ymx'
  },
  {
    icon: 'dd'
  }
])

const loading = ref(true)
const loadingBtn = ref(false)
const staffList = ref([])
const myStaffList = ref([])
const searchInfo = reactive({
  page: 1,
  limit: 20,
  order: 'serial asc'
})
const router = useRouter()
const getRandom = () => {
  return Math.floor(Math.random() * 300) + 1500
}
const getAllStaff = () => {
  loading.value = true

  reqAllStaff(searchInfo).then((res: any) => {
    staffList.value = res.data.data
    console.log(111)

    res.data.data.forEach((item, index) => {
      for (const itemKey in item) {
        if (shopList.value[index]) {
          shopList.value[index][itemKey] = item[itemKey]
        }
      }
    })
    console.log(222)

    console.log('staffList', staffList.value)
    getMyStaff()
  })
}
const getIconPath = (icon) => {
  return new URL(`../../assets/img/shop/${icon}.png`, import.meta.url).href
}
const buy = (item) => {
  if (myStaffList.value.includes(item.id)) {
    showToast({
      message: '您已拥有此会员！',
      icon: 'warning'
    })
    return
  }

  // if(){
  //
  // }

  // if (userInfo.value.result.staff.id === 0 && item.id === 1) {
  //   return _notice('请逐级开通！')
  // }
  // if (userInfo.value.result.staff.id + 1 !== item.id) {
  //   return _notice('请逐级开通！')
  // }

  loading.value = true
  console.log('item', item)
  loading.value = true
  reqWalletInfo().then((res: any) => {
    console.log('reqWalletInfo', res)
    loading.value = false

    if (item.price > res.data.amount + res.data.money) {
      loading.value = false
      _notice('账户余额不足,请充值!')
      router.push('/recharge')
    } else {
      reqEnterStaff({
        staff_id: item.id
      }).then((sub_res) => {
        loading.value = false
        _notice(sub_res.msg)
        if (res.code === 200) {
          getMyStaff()
        }
      })
    }
  })
}
const getUserIncome = () => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
    loadingBtn.value = false
  })
}

const getRedBag = () => {
  if (!userInfo.value?.result?.staff?.serial) {
    return showDialog({
      message: '请先购买服务器！'
    })
  }
  // if (localStorage.isShare !== dayjs().format('YYYY-MM-DD')) {
  //   showConfirmDialog({
  //     message: '请先进行每日分享！',
  //     confirmButtonText: '去分享'
  //   }).then(() => {
  //     if (window.webkit?.messageHandlers) {
  //       localStorage.isShare = dayjs().format('YYYY-MM-DD')
  //     }
  //
  //     window.shareFriend()
  //     // on close
  //     // loadPlayRewardVideo(() => {
  //     //   sessionStorage.seeVideoGetEarnedCash = true
  //     // })
  //   })
  //   return
  // }
  loadingBtn.value = true
  reqRecordTask().then((res) => {
    loadingBtn.value = false
    if (res.code === 412) {
      showConfirmDialog({
        message: '请先进行每日分享！',
        confirmButtonText: '点我分享微信朋友圈'
      }).then(() => {
        if (window.webkit?.messageHandlers) {
          localStorage.isShare = dayjs().format('YYYY-MM-DD')
          reqCreateShareLog().then((res) => {
            console.log('reqCreateShareLog', res)
          })
        }

        window.shareFriend()
      })
      return
    }

    if (res.code === 200) {
      getUserIncome()
    }
    router.push('/serveInfo')
  })
}
const getMyStaff = () => {
  reqMyStaff().then((res) => {
    loading.value = false

    myStaffList.value = res.data.map((item) => item.staff_id)
    ;(res.data || []).forEach((item) => {
      shopList.value.forEach((sub_item, index) => {
        if (item.staff_id === sub_item.serial) {
          sub_item.expireDays = Math.floor(
            (new Date(item.expire_time * 1000) - new Date().getTime()) / 1000 / 60 / 60 / 24
          )
        }
      })
    })
    console.log('staffList', staffList.value)
    if (res.data.length) {
      res.data.sort((a, b) => a.result.staff.serial - b.result.staff.serial)
      userInfo.value.result.staff = res.data[res.data.length - 1].result.staff
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    }
  })
}
onMounted(() => {
  getAllStaff()
  // getUserIncome()
})

const getMoble = () => {
  var prefixArray = new Array('130', '131', '132', '133', '135', '137', '138', '170', '187', '189')
  var i = parseInt(10 * Math.random())
  var prefix = prefixArray[i]
  for (var j = 0; j < 8; j++) {
    if (j < 4) {
      prefix = prefix + '*'
    } else {
      prefix = prefix + Math.floor(Math.random() * 10)
    }
  }
  return prefix
}

const getDatetime = () => {
  return dayjs().format('HH:mm:ss')
}

const alarmList = ref([])

for (let i = 0; i < 6; i++) {
  alarmList.value.push({
    phone: getMoble(),
    money: (Math.random() * (500 - 15) + 15).toFixed(2),
    datetime: getDatetime()
    // type: [
    //   '黑铁权益卡',
    //   '青铜权益卡',
    //   '白银权益卡',
    //   '黄金权益卡',
    //   '白金权益卡',
    //   '钻石权益卡',
    //   '黑钻权益卡'
    // ][Math.floor()]
  })
}
const timer = ref()
const timerfir = ref()
const timerfir2 = ref()
const scrollY = ref(20) //滚动距离
const speed = ref(0.5) //滚动速度

const autoRoll = (flag?) => {
  if (flag) {
    clearInterval(timer.value)
    clearTimeout(timerfir.value)
    clearTimeout(timerfir2.value)
    return
  }
  let table = document.querySelector('.alarmList-child')
  console.log('table', table)
  timerfir.value = window.setTimeout(() => {
    clearInterval(timer.value)
    timerfir2.value = setInterval(() => {
      const datetime = dayjs(new Date().getTime()).format('HH:mm:ss')
      alarmList.value.push({
        phone: getMoble(),
        money: (Math.random() * (500 - 15) + 15).toFixed(2),
        datetime: getDatetime()
      })
    }, 500)
    timer.value = setInterval(() => {
      scrollY.value += speed.value
      if (scrollY.value >= table.scrollHeight - table.offsetHeight) {
        scrollY.value = 0
      }
      table.scrollTop = scrollY.value
    }, 20)
  }, 1000)
}
onMounted(() => {
  autoRoll()
})
onUnmounted(() => {
  autoRoll(1)
})
</script>

<style scoped lang="less">
.fixed-back {
  position: fixed;
  left: 10px;
  top: 48px;
  z-index: 3;
}

.main {
  width: 100%;
  display: flex;
}

.item {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}

.title {
  font-size: 26px;
  color: #eee;
  font-weight: bolder;
  margin-left: 30px;
  position: relative;
  padding-left: 8px;
  //&:before {
  //  position: absolute;
  //  top: 2px;
  //  left: -10px;
  //  display: block;
  //  content: '';
  //  height: 30px;
  //  width: 6px;
  //  background-color: #666cf8;
  //  border-radius: 10px;
  //}
}

.stat {
  margin-top: 20px;
  background-image: linear-gradient(180deg, #494052 10%, #322c36 100%);
  border-radius: 10px 10px 0 0;
  height: auto;

  .stat-header {
    line-height: 40px;
    display: flex;
    justify-content: space-evenly;
    color: #ccc;
    font-size: 12px;
    border-bottom: 1px solid #666;
    .money {
      font-size: 16px;
      font-weight: bolder;
      color: #fff;
    }
  }
}
.staff-list {
  color: #fff;
}
.staff-item {
  background: url('./images/vip-bg.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 200px;
  font-size: 14px;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  .img {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 10px;
    width: 80px;
    height: 80px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tip {
    position: absolute;
    bottom: 53px;
    left: 60px;
    color: #000;
    font-size: 16px;
  }
  .name {
    text-indent: 10px;
    font-weight: bolder;
    font-size: 24px;
    line-height: 40px;
    color: #fff;
  }
  .name-price {
    font-size: 22px;
    text-indent: 10px;
    font-weight: bolder;
    line-height: 40px;
    color: #4a4bf3;
  }
  .price {
    position: relative;
    text-indent: 100px;
    border-radius: 10px 10px 0 0;
    line-height: 50px;
    background-image: linear-gradient(90deg, #82718b 10%, #6a586b 100%);
    .money {
      font-size: 18px;
      font-weight: bolder;
    }

    .arrow {
      position: absolute;
      right: 10px;
      top: 15px;
    }
  }
  .info {
    border-radius: 0 0 10px 10px;
    padding: 10px;
    background-image: linear-gradient(90deg, #514154 10%, #3d313f 100%);
    display: grid;
    grid-template-columns: 1fr 1fr;

    .info-item {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      line-height: 30px;
      .status {
        color: #7889ef;
        font-weight: bolder;
      }
    }
  }
  .buy-btn {
    text-align: center;
    position: absolute;
    right: 0;
    top: 0px;
    border-radius: 10px;
  }
}
.my-swipe {
  margin-top: 20px;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #5d5e5f;
  }
}
.announcement {
  .announcement-task {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .a-t-items {
      height: 150px;
      width: 90%;
      padding: 10px;
      position: relative;
      margin: 6px 12px;

      .a-t-text {
        position: relative;
        top: 4px;
        font-size: 12px;
        left: 0;
        .a-t-t-3 {
          background-color: #5d5e5f;
          border-radius: 15px;
          position: relative;
          .a-t-title {
            width: 90%;
            left: 0;
            color: #b4a482;
            margin-left: 5%;
            position: absolute;
            top: 4px;
            img {
              float: right;
              width: 20%;
              height: auto;
              border-radius: 50px;
            }
          }
          .introduce {
            position: absolute;
            bottom: 5px;
            left: 80%;
            transform: translateX(-50%);
            color: #f60;
          }
          .introduce-left {
            position: absolute;
            bottom: 35px;
            font-size: 16px;
            left: 20%;
            transform: translateX(-50%);
            color: #f60;
          }
          .a-t-t-3-1 {
            top: 30%;
            height: auto;
            position: absolute;
            left: 0;
            right: 20px;
            bottom: 20px;
            background: rgba(0, 0, 0, 0.6);
            width: 100%;
            img {
              width: 20px;
              display: block;
              margin: 14px auto 5px;
              height: 20px;
            }
            .a-t-t-3-text {
              color: #b5a483;
              text-align: center;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.alarmList-child {
  margin-top: 20px;
  height: 120px;
  overflow: hidden;
  color: #ae9f7e;
  position: relative;
  .alarm-item {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    & > div {
      text-align: center;
    }
    .phone {
      width: 120px;
      text-align: center;
    }
    .type {
      width: 100px;
      text-align: center;
    }
    .money {
      flex: 1;
      color: #e2511d;
    }
    .datetime {
      width: 120px;
    }
  }
}
.black-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #302e2e;
  font-weight: bold;
  font-size: 18px;
  white-space: nowrap;
  width: 100%;
  height: 60px;
  background: url('@/assets/img/black-tip.png') no-repeat;
  background-size: 100% 100%;
  .active {
    color: red;
  }
  & > div {
    text-align: center;
    line-height: 25px;
  }
}
</style>
