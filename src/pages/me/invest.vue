<template>
  <div class="investClass">
    <!--    <div :style="containerStyle" style="background-color: #fff; width: 100%"></div>-->
    <!--    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />-->
    <Loading v-if="loading" />
    <van-nav-bar left-arrow placeholder title="会员列表" @click-left="$router.back()">
      <template #right>
        <span style="color: #000" @click="$router.push('/yiyouhuiyuan')"> 顶商权益有效期 </span>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
      <van-swipe-item> <img alt="" src="./images/invest-banner2.jpg" /></van-swipe-item>
      <!--      <van-swipe-item>-->
      <!--        <img alt="" src="@/pages/home/images/banner1.jpg" />-->
      <!--      </van-swipe-item>-->
    </van-swipe>
    <!--    <div class="shandongBox">-->
    <!--      <div class="shandong">-->
    <!--        <p>下级激活商人，返上级2代金币</p>-->
    <!--        <p>比例：10%+5%</p>-->
    <!--      </div>-->
    <!--    </div>-->
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
    <!--    </van-swipe>-->
    <!--    <div class="black-tip">-->
    <!--      <div>-->
    <!--        <div>开通不同等级会员， <span class="active"> 收益永久叠加</span> 生效 ！</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-if="false">
      <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item>
          <img alt="" src="@/pages/home/images/banner9.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img alt="" src="@/pages/home/images/banner10.jpg" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div v-if="false" class="top-box">
      <div style="align-items: center; justify-content: end" @click="$router.push('/yiyouhuiyuan')">
        <div class="avatar" @click="renzheng(userInfo.avatar)">
          <img :src="userInfo.avatar || defaultAvatar" />
        </div>
        <div class="name">
          <template v-if="userInfo.nickname"> {{ userInfo.nickname }}</template>
          <template v-else>
            {{
              userInfo.phone
                ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
                : ''
            }}
          </template>
        </div>
        <van-button class="btn" color="linear-gradient(to right, #fb5b4b, #9c38e5)" style="flex: 1">
          {{ userInfo?.result?.staff?.name || '暂无加速卡' }}
        </van-button>
        <!--        <span class="vip-info">{{ userInfo?.result?.staff?.name || '暂无加速卡' }}</span>-->
        <span style="text-decoration: underline; margin-top: 5px; color: #000"
          >点击查看剩余有效期</span
        >
      </div>
    </div>

    <!--          :class="{ active: activeIndex === index, has: myStaffList.includes(item.id) }"-->
    <div class="v-list-box">
      <div class="v-list">
        <div
          v-for="(item, index) of staffList"
          :class="{ active: activeIndex === index }"
          class="v-list-item"
        >
          <template v-if="item.level === 1">
            <div class="box" @click="buy(0)">
              <img alt="" class="vipImg" src="./images/v1.png" />
              <!--              <img-->
              <!--                v-if="!myStaffList.includes(item.id)"-->
              <!--                alt=""-->
              <!--                class="duihuankaitong"-->
              <!--                src="./images/duihuankaitong.png"-->
              <!--                @click="buy(0)"-->
              <!--              />-->
              <img
                v-if="myStaffList.includes(item.id)"
                class="duihuankaitong"
                src="./images/shengxiaozhong.png"
              />
            </div>
          </template>
          <template v-if="item.level === 2">
            <div class="box" @click="buy(1)">
              <img alt="" class="vipImg" src="./images/v2.png" />
              <!--              <img-->
              <!--                v-if="!myStaffList.includes(item.id)"-->
              <!--                alt=""-->
              <!--                class="duihuankaitong"-->
              <!--                src="./images/duihuankaitong.png"-->
              <!--                @click="buy(1)"-->
              <!--              />-->
              <img
                v-if="myStaffList.includes(item.id)"
                class="duihuankaitong"
                src="./images/shengxiaozhong.png"
              />
            </div>
          </template>
          <template v-if="item.level === 3">
            <div class="box" @click="buy(2)">
              <img alt="" class="vipImg" src="./images/v3.png" />
              <!--              <img-->
              <!--                v-if="!myStaffList.includes(item.id)"-->
              <!--                alt=""-->
              <!--                class="duihuankaitong"-->
              <!--                src="./images/duihuankaitong.png"-->
              <!--                @click="buy(2)"-->
              <!--              />-->
              <img
                v-if="myStaffList.includes(item.id)"
                class="duihuankaitong"
                src="./images/shengxiaozhong.png"
              />
            </div>
          </template>
          <template v-if="item.level === 4">
            <div class="box" @click="buy(3)">
              <img alt="" class="vipImg" src="./images/v4.png" />
              <!--              <img-->
              <!--                v-if="!myStaffList.includes(item.id)"-->
              <!--                alt=""-->
              <!--                class="duihuankaitong"-->
              <!--                src="./images/duihuankaitong.png"-->
              <!--                @click="buy(3)"-->
              <!--              />-->
              <img
                v-if="myStaffList.includes(item.id)"
                class="duihuankaitong"
                src="./images/shengxiaozhong.png"
              />
            </div>
          </template>
          <template v-if="item.level === 5">
            <div class="box" @click="buy(4)">
              <img alt="" class="vipImg" src="./images/v5.png" />
              <!--              <img-->
              <!--                v-if="!myStaffList.includes(item.id)"-->
              <!--                alt=""-->
              <!--                class="duihuankaitong"-->
              <!--                src="./images/duihuankaitong.png"-->
              <!--                @click="buy(4)"-->
              <!--              />-->
              <img
                v-if="myStaffList.includes(item.id)"
                class="duihuankaitong"
                src="./images/shengxiaozhong.png"
              />
            </div>
          </template>
          <template v-if="item.level === 6">
            <div class="box" @click="buy(5)">
              <img alt="" class="vipImg" src="./images/v6.png" />
              <!--              <img-->
              <!--                v-if="!myStaffList.includes(item.id)"-->
              <!--                alt=""-->
              <!--                class="duihuankaitong"-->
              <!--                src="./images/duihuankaitong.png"-->
              <!--                @click="buy(5)"-->
              <!--              />-->
              <img
                v-if="myStaffList.includes(item.id)"
                class="duihuankaitong"
                src="./images/shengxiaozhong.png"
              />
            </div>
          </template>
          <template v-if="item.level === 7">
            <div class="box" @click="buy(6)">
              <img alt="" class="vipImg" src="./images/v7.png" />
              <!--              <img-->
              <!--                v-if="!myStaffList.includes(item.id)"-->
              <!--                alt=""-->
              <!--                class="duihuankaitong"-->
              <!--                src="./images/duihuankaitong.png"-->
              <!--                @click="buy(6)"-->
              <!--              />-->
              <img
                v-if="myStaffList.includes(item.id)"
                class="duihuankaitong"
                src="./images/shengxiaozhong.png"
              />
            </div>
          </template>

          <!--          <span-->
          <!--            v-if="myStaffList.includes(item.id)"-->
          <!--            style="-->
          <!--              position: absolute;-->
          <!--              bottom: 26px;-->
          <!--              right: 0px;-->
          <!--              height: 20px;-->
          <!--              font-size: 14px;-->
          <!--              font-weight: bold;-->
          <!--              color: #ff5722;-->
          <!--              text-align: center;-->
          <!--              z-index: 2;-->
          <!--            "-->
          <!--          >-->
          <!--            到期时间：<span>{{ getExpireTimeStr(item.id) }}</span>-->
          <!--          </span>-->
        </div>
      </div>
    </div>
  </div>

  <!--  <BaseFooter :is-white="false" v-bind:init-tab="5" />-->
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted, computed, onActivated } from 'vue'
import {
  reqAllStaff,
  reqCreateShareLog,
  reqEnterStaff,
  reqMyStaff,
  reqRecordTask,
  reqUserIncome,
  reqWalletInfo
} from '@/api/myApi.js'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import defaultAvatar from '@/assets/img/logo.png'

import { throttle } from 'lodash'

const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
defineOptions({
  name: 'invest'
})

const activeIndex = ref(0)

const count = ref(1)
const userIncomeInfo = ref({})

const loading = ref(false)
const loadingBtn = ref(false)
const staffList = ref([])
const originMyStaffList = ref([])
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
    staffList.value = res.data
    loading.value = false
    // res.data.data.forEach((item, index) => {
    //   for (const itemKey in item) {
    //     if (shopList.value[index]) {
    //       shopList.value[index][itemKey] = item[itemKey]
    //     }
    //   }
    // })

    console.log('staffList', staffList.value)
  })
}
const getIconPath = (icon) => {
  return new URL(`../../assets/img/shop/${icon}.png`, import.meta.url).href
}
const buyBase = (item, customCount) => {
  const finallyCount = customCount || count.value

  loading.value = true
  loading.value = true
  reqWalletInfo().then((res: any) => {
    console.log('reqWalletInfo', res)
    loading.value = false

    // if (item.price * finallyCount > res.data.amount + res.data.money) {
    if (50 > res.data.amount + res.data.money) {
      loading.value = false
      _notice('账户余额不足,请充值!')
      router.push('/recharge')
    } else {
      reqEnterStaff({
        count: 1,
        staff_id: 165
        // staff_id: item.id
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
const buy = throttle((index) => {
  const item = staffList.value[index]
  console.log('item', item)
  // const finallyCount = customCount || count.value
  if (myStaffList.value.includes(item.id)) {
    showToast({
      message: '您已拥有此会员！'
    })
    return
  }
  console.log('asd')

  if (!originMyStaffList.value?.length && item.level != 1) {
    return showToast('请先完成上一个等级！')
  }

  let currentLevel = originMyStaffList.value.length
    ? originMyStaffList.value[originMyStaffList.value.length - 1].vip.level
    : 0
  // if (userInfo.value.result.staff.serial + 1 != item.level) {
  if (currentLevel + 1 != item.level) {
    if (item.level != 1) {
      return showToast('请先完成上一个等级！')
    }
  }

  // loading.value = true
  // reqWalletInfo().then((res: any) => {
  //   loading.value = false
  //
  //   // if (item.price * finallyCount > res.data.amount + res.data.money) {
  //   if (item.price > res.data.wallet.balance + res.data.wallet.points) {
  //     loading.value = false
  //     nextTick(() => {
  //       _notice(' 金币不足，激活失败！即将为您跳转购买金币通道！')
  //     })
  //     setTimeout(() => {
  //       router.push('/recharge')
  //     }, 2500)
  //   } else {
  //     reqEnterStaff(item.id).then((sub_res) => {
  //       loading.value = false
  //       _notice(sub_res.msg)
  //       if (sub_res.code === 200) {
  //         getMyStaff()
  //       }
  //     })
  //   }
  // })
  reqEnterStaff(item.id).then((sub_res) => {
    loading.value = false
    if (sub_res.msg === '余额不足，无法兑换！') {
      nextTick(() => {
        _notice('余额不足，激活失败，即将为您跳转金豆通道！')
      })
      setTimeout(() => {
        router.push('/recharge')
      }, 2500)
    } else {
      _notice(sub_res.msg)
      if (sub_res.code === 200) {
        getMyStaff()
      }
    }
  })
}, 1000)

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

    originMyStaffList.value = res.data?.data || []
    myStaffList.value = (res.data?.data || []).map((item) => item.vipId)
    console.log('staffList', staffList.value)
    console.log('myStaffList', myStaffList.value)
    // if (res.data.length) {
    //   res.data.sort((a, b) => a.result.staff.serial - b.result.staff.serial)
    //   userInfo.value.result.staff = res.data[res.data.length - 1].result.staff
    //   window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    // }
  })
}

const getUserInfo = () => {
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
  })
}
onMounted(() => {
  getAllStaff()
  getMyStaff()
  getUserInfo()
  // getUserIncome()
})

const getMoble = () => {
  var prefixArray = ['130', '131', '132', '133', '135', '137', '138', '170', '187', '189']
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
    //   '金币权益卡',
    //   '黑钻权益卡'
    // ][Math.floor()]
  })
}
const getExpireTimeStr = (id) => {
  const item = originMyStaffList.value.find((item) => item.staff_id === id)
  console.log('asd', id, item, originMyStaffList)
  const timestamp = item.expire_time * 1000
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm')
}
const timer = ref()
const timerfir = ref()
const timerfir2 = ref()
const scrollY = ref(20) //滚动距离
const speed = ref(0.5) //滚动速度
</script>

<style lang="less" scoped>
.investClass {
  overflow-y: auto;
  //background-color: #fff;
  width: 100%;
  height: calc(100%);
  color: #fff;
  padding-bottom: 120px;
  background-color: #f7f7f7;
  //background-image: url('@/assets/img/main-bg.jpg');
  //background-size: 100% 100%;
  :deep(.van-nav-bar) {
    background-color: #fff !important;
    .van-nav-bar__title {
      color: #000 !important;
    }

    .van-icon {
      color: #000 !important;
      font-size: 18px !important;
    }
  }
  .top-box {
    display: flex;
    align-items: center;
    height: 180px;
    padding-left: 40%;
    //background-image: url('./images/vip-bg.png');
    //background-image: url('./images/invest-bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 180px;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      //align-items: center;
      flex: 1;
    }

    .avatar {
      margin: 0px auto 0;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      text-align: center;
      color: #000;
      font-size: 16px;
      margin: 10px 0;
    }

    .vip-info {
      width: fit-content;
      color: #000;
      padding: 2px 10px;
      border: 1px solid #ccc;
      border-radius: 20px;
      font-size: 14px;
    }
  }

  .v-list-box {
    margin-top: 5px;
    width: 100%;

    .v-list {
      //overflow-x: auto;
      display: flex;
      flex-wrap: wrap;
      //display: flex;
      margin: 0 auto;
      width: 96%;

      .v-list-item {
        .box {
          margin-bottom: 10px;
          position: relative;
          .vipImg {
            width: 100%;
          }
          .duihuankaitong {
            width: 25%;
            height: 35px;
            position: absolute;
            bottom: 20px;
            right: 25px;
            //transform: translateX(-50%);
          }
        }

        //flex: 0 0 calc(33% - 10px);
        //box-sizing: border-box;
        //
        //width: 110px;
        //float: left;
        //margin: 5px;
        //display: flex;
        //align-items: center;
        //flex-direction: column;
        //padding: 18px 0 0px;
        //
        //background-color: #eeeeee;
        //color: #616161;
        //
        //min-height: 150px;
        //
        //&:nth-child(1) {
        //  //background: url('./images/vip-bg1.png') no-repeat;
        //  //background-size: 100% 100%;
        //}
        //
        //img {
        //  width: 100%;
        //}
        //
        //.fuhao {
        //  font-size: 14px;
        //}
        //
        //& > div {
        //  color: #000;
        //
        //  &:nth-of-type(1) {
        //    font-size: 14px;
        //    font-weight: bolder;
        //  }
        //
        //  &:nth-of-type(2) {
        //    font-size: 22px;
        //    opacity: 0.8;
        //    padding: 5px 0;
        //  }
        //
        //  &:nth-of-type(3) {
        //    font-size: 14px;
        //    opacity: 0.8;
        //  }
        //}
        //
        //&.active {
        //  //color: #fff;
        //  ////background-color: #fdd4d5;
        //  //background-image: linear-gradient(to right, #fb5b4b, #9c38e5);
        //  //
        //  //& > div {
        //  //  color: #fff;
        //  //}
        //}
        //
        &.has {
          position: relative;
          overflow: hidden;

          &.active {
            &:before {
              //color: red;
              //background-color: #ccc;
            }
          }

          &:before {
            position: absolute;
            bottom: 6px;
            right: 0px;
            width: 74px;
            height: 20px;
            font-size: 14px;
            font-weight: bold;
            color: #ff5722;
            text-align: center;
            //background-color: #ff5722;
            content: '已开通';
            z-index: 2;
            //transform: rotate(-45deg);
          }
        }
      }
    }
  }

  .tip {
    color: #ccc;
    padding: 0 20px;
    font-size: 14px;
    line-height: 22px;
  }

  .container {
    overflow-x: auto;

    .list {
      padding: 10px;
      width: 800px;

      .list-item {
        float: left;
        margin-right: 10px;
        width: 130px;
        height: 100px;
        background-color: #eee;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        color: #000;

        &.active {
          background-color: #ff816a;
          color: #fff;
        }
      }
    }
  }

  .viplist-box {
    padding: 0 10px;

    .list {
      .list-item {
        width: 100%;
        border-radius: 20px;
        margin-top: 10px;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;

        .title {
          color: #fff;
          font-size: 22px;
          font-weight: bolder;
          display: flex;
        }

        .content {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;

          .l {
            font-size: 16px;
            color: #eee;
            display: flex;

            div:nth-child(2) {
              margin-left: 20px;
            }
          }

          .r {
            //display: flex;
            //flex-direction: column;
          }
        }
      }
    }
  }
}

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
  margin: 8px 10px 0;
  border-radius: 10px;
  overflow: hidden;

  .van-swipe-item {
    height: 120px;
    img {
      width: 100%;
      height: 120px !important;
    }
  }
}

.announcement {
  .announcement-task {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .item {
      margin-top: 10px;
      text-align: center;
      color: #fff;
      display: flex;
      background-image: url('./images/invest-bg.png');
      background-size: 100% 100%;
      width: 100%;
      border-radius: 10px;

      .txt {
        display: inline-block;
        width: 25%;
        white-space: nowrap;
        text-align: center;
        color: #fff;
        font-weight: bold;
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
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.shandongBox {
  margin: 10px 0;
  background-color: #000;

  .shandong {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    background: linear-gradient(45deg, #f9d423, #ff4e50, #7b4397, #00c6ff);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 2s ease infinite;
  }
}
</style>
