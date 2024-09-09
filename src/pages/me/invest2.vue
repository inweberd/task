<template>
  <div style="background-color: #322c36; padding: 40px 20px 50px; overflow-y: auto">
    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
    <Loading v-if="loading" />

    <div class="title">会员权益卡</div>

    <div style="background-color: #332d37">
      <!--      <div class="stat">-->
      <!--        <div class="stat-header">-->
      <!--          <div>-->
      <!--            广告总收益: <span class="money">￥{{ userIncomeInfo.total || 0 }}</span>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            租赁费用:<span class="money">￥{{ totalSpend }}</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div style="display: flex; justify-content: center">-->
      <!--          <van-button-->
      <!--            style="width: 80%; margin: 10px"-->
      <!--            color="#54AC90"-->
      <!--            text="开始赚钱（启动服务器）"-->
      <!--            type="primary"-->
      <!--            :loading="loadingBtn"-->
      <!--            loading-text="加载中..."-->
      <!--            @click="getRedBag"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->
      <div v-for="(item, index) of staffList" class="staff-list">
        <div class="staff-item">
          <div class="img">
            <img :src="getIconPath((index % 5) + 1)" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="price" @click="toDetail">
            价格：<span class="money">￥{{ item.price }}</span>
            <van-icon name="arrow" size="18" class="arrow" />
          </div>
          <div class="info">
            <div class="info-item">
              设备状态：
              <span
                class="status"
                :style="{
                  color: myStaffList.includes(item.serial) ? '#7889ef' : '#E85858'
                }"
              >
                {{ myStaffList.includes(item.serial) ? '运行中' : '未启用' }}
              </span>
            </div>
            <div class="info-item">有效期：30天</div>
            <!--<div class="info-item">账号数量：{{ getRandom() }}/3500</div>-->
            <div class="info-item">账号数量：{{ numArr[index] }}</div>
            <div class="info-item">预估收益：{{ item.unit_price }}/天</div>
          </div>
          <div
            v-if="!myStaffList.includes(item.serial)"
            class="buy-btn"
            style="background-color: #666cf8"
            @click="buy(item)"
          >
            <van-button type="primary" size="small">开通</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseFooter v-bind:init-tab="5" :is-white="false" />
</template>
<script setup lang="ts">
import QRCode from 'qrcode'
import imageSrc from '@/assets/img/hehuoren.png'
import imageSrc1 from '@/assets/img/hehuoren.jpg'
import imageSrc2 from '@/assets/img/hehuoren2.png'
import imageSrc3 from '@/assets/img/goumai.png'
import { ref, reactive, onMounted } from 'vue'
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
import { showFailToast, showNotify, showToast } from 'vant'
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
const numArr = [50, 250, 500, 1000, 2000, 4000]
const userIncomeInfo = ref({})
const totalSpend = ref(0)

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
    loading.value = false
    staffList.value = res.data.data
  })
}

const buy = (item) => {
  // if (userInfo.value.result.staff.serial + 1 !== item.serial) {
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
          // reqUserStaff().then((userRes) => {
          //   if (userRes.code !== 200) return _notice(userRes.msg)
          //   console.log('reqUserStaff', userRes)
          //
          //   userInfo.value.result.staff = userRes.data.result.staff
          //   window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
          // })
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
const getBuyBtnBg = (item) => {
  return userInfo.value.result.staff.serial + 1 === item.serial ? '#e85858' : '#666CF8'
}
const toDetail = () => {
  router.push('/serveInfo')
}

const getIconPath = (icon) => {
  return new URL(`../../assets/img/serve/${icon}.png`, import.meta.url).href
}

const getRedBag = () => {
  // reqCreateShareLog().then((res) => {
  //   console.log('reqCreateShareLog', res)
  // })
  console.log('userInfo.value?.result?.staff?.serial', userInfo.value)
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
        // on close
        // loadPlayRewardVideo(() => {
        //   sessionStorage.seeVideoGetEarnedCash = true
        // })
      })
      return
    }

    if (res.code === 200) {
      // _notice('')
      getUserIncome()
    }
    router.push('/serveInfo')

    // let msg = '已进入服务器队列！'
    // showDialog({
    //   message: msg,
    //   theme: 'round-button'
    // })
    // tipContent.value = res.msg
    // showTip.value = true
  })
}
const getMyStaff = () => {
  reqMyStaff().then((res) => {
    myStaffList.value = res.data.map((item) => item.staff_id)
    const sum = res.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.result.staff.price,
      0
    )
    totalSpend.value = sum
    if (res.data.length) {
      res.data.sort((a, b) => a.result.staff.serial - b.result.staff.serial)
      userInfo.value.result.staff.serial = res.data[res.data.length - 1].result.staff.serial
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    }
  })
}
onMounted(() => {
  getAllStaff()
  getUserIncome()
  getMyStaff()
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
  &:before {
    position: absolute;
    top: 2px;
    left: -10px;
    display: block;
    content: '';
    height: 30px;
    width: 6px;
    background-color: #666cf8;
    border-radius: 10px;
  }
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
  font-size: 14px;
  position: relative;
  margin-bottom: 20px;
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
  .name {
    text-indent: 100px;
    font-weight: bolder;
    font-size: 16px;
    line-height: 40px;
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
    bottom: 30px;
  }
}
</style>
