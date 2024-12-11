<template>
  <div style="overflow-y: auto; background-color: #0e0f13; width: 100%; height: 100%">
    <div style="background-color: #fff; height: 40px; width: 100%"></div>
    <!--    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />-->
    <Loading v-if="loading" />
    <!--    <div class="title" style="color: #b4a482; font-size: 22px">会员权益卡</div>-->
    <!--    <van-image :src="imageSrc1" width="100%" height="280" fit="fill"></van-image>-->

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
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <!--          <van-swipe-item>-->
        <!--            <img src="./images/banner3.png" alt="" />-->
        <!--          </van-swipe-item>-->
        <!--          <van-swipe-item>-->
        <!--            <img src="./images/banner4.png" alt="" />-->
        <!--          </van-swipe-item>-->
        <van-swipe-item>
          <van-image :src="imageSrc1" width="100%" height="280" fit="fill"></van-image>
        </van-swipe-item>
        <van-swipe-item>
          <van-image :src="imageSrc4" width="100%" height="200" fit="fill"></van-image>
        </van-swipe-item>
      </van-swipe>
    </div>
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
              background-image: linear-gradient(135deg, #43cbff 10%, #9708cc 100%);

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
                  <!--                  {{ item.name }}-->
                  股权价值
                  <!--                  {{ getSerialName(item.serial) }}-->
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
                  每天可分红
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
                  30天总分红
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
              <van-stepper
                v-model="count"
                theme="round"
                button-size="22"
                disable-input
                style="margin-top: 10px"
              />

              <div
                style="
                  background: #01c5f0;
                  color: #fff;
                  width: 100px;
                  margin: 15px auto;
                  font-weight: bold;
                  padding: 6px 0;
                  border-radius: 15px;
                "
                @click="buy(item)"
              >
                <!--                <span style="font-size: 16px" v-if="myStaffList.includes(item.id)">入职成功 </span>-->
                <!--                <span style="font-size: 16px" v-else>未入职</span>-->
                <span style="font-size: 16px">购买</span>
              </div>
            </div>
          </div>
          <div
            v-for="(item, index) of shopList"
            style="
              margin-top: 10px;
              text-align: center;
              color: #fff;
              display: flex;
              background-image: linear-gradient(135deg, #43cbff 10%, #9708cc 100%);

              width: 100%;
              border-radius: 10px;
            "
          >
            <p></p>
          </div>
          <!--          <p style="text-align: center; margin-top: 10px">-->
          <!--            当前拥有员工卡数量：{{ myStaffList?.length || 0 }}张-->
          <!--          </p>-->
          <!--          <p style="text-align: center; margin-top: 10px">-->
          <!--            同时拥有多张员工卡，<span style="color: #0a53be">收益同时叠加生效。</span>-->
          <!--          </p>-->
          <!--          <div style="margin-top: 10px"></div>-->
          <!--          <p style="text-align: center">-->
          <!--            1张VIP卡 每天刷<span style="color: #0a53be">30个高价视频得8元</span>-->
          <!--          </p>-->
          <!--          <p style="text-align: center; margin-bottom: 10px">-->
          <!--            VIP用户每天刷完高价视频，还可以继续去刷普通视频-->
          <!--          </p>-->
          <!--          <p style="text-align: center">-->
          <!--            一次性购买10张VIP卡可享受<span style="color: #0a53be">9.8折优惠</span>（联系群管理）-->
          <!--          </p>-->
          <!--          <p style="text-align: center">-->
          <!--            一次性购买50张VIP卡可享受<span style="color: #0a53be">9.5折优惠</span>（联系群管理）-->
          <!--          </p>-->
          <!--          <p style="text-align: center">-->
          <!--            一次性购买100张VIP卡可享受<span style="color: #0a53be">9折优惠</span> （联系群管理）-->
          <!--          </p>-->
        </div>
      </div>
    </div>
  </div>

  <!--  <p style="text-align: center; color: #888; width: 100%; position: fixed; bottom: 60px">-->
  <!--    京ICP证030173号-215A-->
  <!--  </p>-->

  <BaseFooter v-bind:init-tab="5" :is-white="false" />
</template>
<script setup lang="ts">
import imageSrc1 from '@/assets/img/hehuoren.jpg'
import imageSrc4 from '@/assets/img/hehuoren3.png'
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
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import BaseFooter from '@/components/BaseFooter.vue'
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
defineOptions({
  name: 'invest'
})
const count = ref(1)
const userIncomeInfo = ref({})
const shouyiArrDay = [8, 20, 40, 80, 120, 160, 200, 400]
const youxiaoArr = [35, 45, 45, 45, 45, 45, 45, 45]
const daxieArr = ['', '一', '二', '三', '四', '五', '六', '七']

const shopList = ref([
  {
    icon: 'pdd'
  }
  // {
  //   icon: 'pdd'
  // },
  // {
  //   icon: 'tb'
  // },
  // {
  //   icon: 'tm'
  // },
  // {
  //   icon: 'jd'
  // },
  // {
  //   icon: 'ymx'
  // },
  // {
  //   icon: 'dd'
  // },
  // {
  //   icon: 'dd'
  // }
])

const loading = ref(false)
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

    res.data.data.forEach((item, index) => {
      for (const itemKey in item) {
        if (shopList.value[index]) {
          shopList.value[index][itemKey] = item[itemKey]
        }
      }
    })

    console.log('staffList', staffList.value)
    getMyStaff()
  })
}
const getIconPath = (icon) => {
  return new URL(`../../assets/img/shop/${icon}.png`, import.meta.url).href
}
const buy = (item) => {
  // if (myStaffList.value.includes(item.id)) {
  //   showToast({
  //     message: '您已拥有此会员！',
  //     icon: 'warning'
  //   })
  //   return
  // }

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

    if (item.price * count.value > res.data.amount + res.data.money) {
      loading.value = false
      _notice('账户余额不足,请充值!')
      router.push('/recharge')
    } else {
      reqEnterStaff({
        count: count.value,
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
</script>

<style scoped lang="less">
.fixed-back {
  position: fixed;
  left: 10px;
  top: 48px;
  z-index: 3;
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
:deep(.van-stepper--round) {
  .van-stepper__input {
    color: #eee;
  }
  .van-stepper__plus,
  .van-stepper__minus {
    background-color: #fff !important;
    color: #333;
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
</style>
