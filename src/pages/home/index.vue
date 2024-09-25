<template>
  <div class="home" id="home-index">
    <div class="user">
      <img src="@/assets/img/lalami.png" style="margin-left: 5%; width: 45%; opacity: 0" />
      <span
        style="
          margin-left: 5%;
          width: 45%;
          position: absolute;
          top: 55px;
          left: 30px;
          color: #b5a483;
          font-size: 26px;
        "
        >火花视频</span
      >
      <img src="@/assets/img/2.8184534.png" style="width: 15%; margin-right: 5%; float: right" />
    </div>
    <div class="price" style="margin-left: 2%; background-size: 100% 100%; width: 96%">
      <div class="price-box">
        <div class="price-1">
          <div class="price-1-title">我的钱包余额</div>
          <div class="price-1-content flexS">
            <!--            <div class="p-1-c-1">￥{{ format(walletInfo?.money || 0) }}</div>-->
            <div class="p-1-c-1">￥{{ walletInfo?.money || 0 }}</div>
            <div class="p-1-c-3 flexS">
              <div class="p-1-c-3-btn" @click="go('/dep')">提现</div>
              <div class="p-1-c-3-btn" @click="go('recharge')">充值</div>
            </div>
          </div>
        </div>
        <div class="hr"></div>
        <div class="price-2 flexS">
          <div class="price-2-item">
            <div class="price-2-item-1">{{ userIncomeInfo.today || 0 }}</div>
            <div class="price-2-item-2">今日预估收益(元)</div>
          </div>
          <div class="price-2-item">
            <div class="price-2-item-1">{{ userIncomeInfo.total || 0 }}</div>
            <div class="price-2-item-2">累计收益(元)</div>
          </div>
          <div class="price-2-item">
            <div class="price-2-item-1">{{ walletInfo?.amount || 0 }}</div>
            <div class="price-2-item-2">充值余额(元)</div>
          </div>
        </div>
      </div>
      <div class="tab">
        <div class="tab-item" :class="{ active: active === 4 }" @click="handleActive(4)">
          平台简介
        </div>
        <div class="tab-item" :class="{ active: active === 6 }" @click="handleActive(6)">
          规则说明
        </div>
        <div class="tab-item" :class="{ active: active === 7 }" @click="handleActive(7)">
          代理合作
        </div>
      </div>

      <div class="content">
        <div
          v-if="active !== 7"
          v-html="articleInfo.content"
          style="margin-top: 10px; width: 93%; margin-left: 2%"
        ></div>
        <div v-else>
          <!--          <van-image width="100%" lazy-load height="200" :src="zhengshu3" @click="showImage(0)">-->
          <!--            <template v-slot:loading>-->
          <!--              <van-loading type="spinner" size="20" />-->
          <!--            </template>-->
          <!--          </van-image>-->
          <van-image width="100%" lazy-load height="200" :src="zhengshu1" @click="showImage(0)">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <van-image width="100%" lazy-load height="200" :src="zhengshu2" @click="showImage(1)">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <van-image width="100%" lazy-load height="200" :src="zhengshu4" @click="showImage(2)">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <van-image width="100%" lazy-load height="200" :src="zhengshu5" @click="showImage(3)">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <van-image width="100%" lazy-load height="200" :src="zhengshu6" @click="showImage(4)">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </div>
    </div>

    <BaseFooter v-bind:init-tab="1" :is-white="false" />
  </div>
</template>

<script setup lang="tsx">
import BaseFooter from '@/components/BaseFooter.vue'
import { onActivated, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { axiosInstance as axios } from '@/utils/myrequest'
import { reqUserIncome } from '@/api/myApi'
import { closeToast, showLoadingToast } from 'vant'
import zhengshu1 from '@/assets/img/zhengshu1.jpg'
import zhengshu2 from '@/assets/img/zhengshu2.jpg.jpg'
import zhengshu3 from '@/assets/img/zhengshu3.jpg'
import zhengshu4 from '@/assets/img/zhengshu4.jpg'
import zhengshu5 from '@/assets/img/zhengshu5.png'
import zhengshu6 from '@/assets/img/zhengshu6.png'
import dayjs from 'dayjs'
import imgg from '@/pages/login/logo1.png'
const router = useRouter()
const userIncomeInfo = ref({})

const articleInfo = ref({})
const active = ref(4)
const walletInfo = ref({})
function go(e, interaction = false) {
  // interaction && loadInteraction()
  router.push(e)
}
const getWalletInfo = async () => {
  const { code, data } = await axios.get('/api/wallet/query')
  if (code !== 200) return

  walletInfo.value = data
}
const getUserIncome = () => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
  })
}
const format = (price = 0) => {
  let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return result === '0' ? '0.00' : result
}
let firstRender = true
function getData() {
  showLoadingToast({
    duration: 0,
    message: '加载中'
  })
  axios.get('api/article/one?id=' + active.value).then((res) => {
    !firstRender && closeToast()
    firstRender = false
    if (res.code === 200) {
      articleInfo.value = res.data
    }
  })
}
const handleActive = (num) => {
  active.value = num
  getData()
}

const showImage = (index) => {
  showImagePreview({
    images: [zhengshu1, zhengshu2, zhengshu3, zhengshu4, zhengshu5],
    startPosition: index
  })
}
onMounted(() => {
  showDialog({
    message:
      ' QQ大群人满员！请用户在应用商店下载《微脉圈》聊天软件，点击我的--官方交流群--按钮，扫码进入官方群交流'
  })
  getData()
})
onActivated(() => {
  getWalletInfo()
  getUserIncome()
})
</script>

<style scoped lang="less">
.home {
  position: relative;
  width: 100%;
  height: calc(100% - 56px);
  background-color: #2e2e30;
  overflow-y: auto;

  .user {
    margin: 50px 0 20px;
  }
  .price-box {
    background: url(@/assets/img/usermp.png);
    margin-left: 2%;
    background-size: 100% 100%;
    width: 96%;
    padding: 12px 23px 50px;
    box-sizing: border-box;

    .price-1 {
      .price-1-title {
        font-weight: 400;
        color: #b5a483;
        height: 16.5px;
        line-height: 16.5px;
        font-size: 12px;
      }
      .price-1-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .p-1-c-1 {
          font-size: 27px;
          font-weight: 600;
          line-height: 40px;
          color: #ea5514;
        }
        .p-1-c-3 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .p-1-c-3-btn {
            width: 50px;
            height: 27px;
            background: #ea5514;
            border-radius: 14px;
            font-size: 13px;
            font-weight: 600;
            color: #fff;
            text-align: center;
            line-height: 26px;
            margin-left: 16px;
          }
        }
      }
    }
    .hr {
      width: 325px;
      height: 1px;
      background: #434343;
      opacity: 0.05;
      top: 90px;
      position: absolute;
    }
    .price-2 {
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin-top: 20px;
      .price-2-item {
        position: relative;
        flex: 1;
        text-align: center;
        .price-2-item-1 {
          color: #ea5514;
          font-size: 16px;
          font-weight: 700;
        }
        .price-2-item-2 {
          color: #b5a483;
          opacity: 0.7;
          font-size: 12px;
        }
      }
    }
  }

  .tab {
    margin-top: 30px;
    margin-left: 2%;
    background-size: 100% 100%;
    width: 96%;
    height: 40px;
    background-color: #5d5e5f;
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 4px;
    overflow: hidden;
    box-sizing: border-box;
    .tab-item {
      height: 100%;
      border-radius: 20px;
      flex: 1;
      display: flex;
      align-content: center;
      justify-content: center;
      line-height: 32px;
      color: rgb(180, 164, 130);

      &.active {
        background-color: #ea5514;
      }
    }
  }
  .content {
    margin-top: 20px;
    margin-left: 4%;
    width: 92%;
    color: rgb(180, 164, 130);
    font-size: 13px;
    line-height: 20px;
  }
}
</style>
<style scoped lang="less">
.alarmList-child {
  height: 200px;
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
</style>
