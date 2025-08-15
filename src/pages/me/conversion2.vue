<template>
  <div class="login">
    <!-- <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" /> -->
    <van-nav-bar
      :class="{ inApp: getIsInApp() }"
      left-arrow
      left-text="返回"
      placeholder
      safe-area-inset-top
      title="金币转赠"
      @click-left="router.back()"
    >
      <template #right>
        <span style="color: #fff; font-size: 14px" @click="$router.push('/conversionRecord')">
          转增记录
        </span>
      </template>
    </van-nav-bar>
    <div class="logo-box">
      <!--      <img alt="" src="@/assets/img/logo.png" />-->
      <div class="logo-box-content">
        <div class="info">
          <!--          <p>蚂蚁优选</p>-->
          <p>
            可转赠通用金币数量:
            {{ userIncomeInfo?.wallet?.money ? userIncomeInfo?.wallet?.money.toFixed(2) : 0 }}
          </p>
          <!--                    <p>the big thumb video</p>-->
        </div>
      </div>
    </div>
    <div class="content">
      <div class="desc">
        <!--<van-image width="100" height="100" :src="imgg" />-->
      </div>
      <!--        <div class="common-input-title">团队成员ID</div>-->
      <!--        <van-field-->
      <!--          v-model="data.uid"-->
      <!--          :rules="[{ required: true, message: '请输入团队成员ID' }]"-->
      <!--          placeholder="请输入对方ID"-->
      <!--        />-->
      <!--        <div class="common-input-title" style="margin-top: 10px">转账金额</div>-->

      <van-field
        left-icon="user"
        v-model="data.uid"
        :rules="[{ required: true, message: '请输入团队成员ID' }]"
        clearable
        placeholder="请输入对方ID"
      >
        <template #left-icon>
          <img
            src="https://lx.aosenn.com/h5/static/login/icon_name.png"
            style="width: 15px; height: 16px"
          />
        </template>
      </van-field>

      <van-field
        v-model="data.amount"
        :rules="[{ required: true, message: '请输入转赠数量' }]"
        name="金额"
        placeholder="请输入转赠数量"
        type="number"
      >
        <template #left-icon>
          <img
            src="https://lx.aosenn.com/h5/static/login/icon_name.png"
            style="width: 15px; height: 16px"
          />
        </template>
      </van-field>
      <!--        <div class="common-input-title" style="margin-top: 10px">短信验证码</div>-->
      <van-field
        v-model="data.code"
        center
        clearable
        label=""
        name="验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <!--            <van-button-->
          <!--              v-if="!time"-->
          <!--              size="small"-->
          <!--              type="primary"-->
          <!--              @click="getCode"-->
          <!--              style="background: #01c5f0; border: none"-->
          <!--              :disabled="countdown"-->
          <!--            >-->
          <!--              {{ countdown ? countdown + 's重新发送' : '发送验证码' }}-->
          <!--            </van-button>-->
          <p
            v-if="!time"
            style="
              width: 80px;
              height: 28px;
              line-height: 28px;
              text-align: center;
              border-radius: 20px;
              background-color: #fcd323;
              font-size: 12px;
              color: #000;
            "
            @click="getCode"
          >
            {{ countdown ? countdown + 's重新发送' : '发送验证码' }}
          </p>
          <div
            style="
              width: 80px;
              height: 28px;
              line-height: 28px;
              text-align: center;
              border-radius: 20px;
              background-color: #fcd323;
              font-size: 12px;
              color: #000;
            "
            v-else
          >
            {{ time }}
          </div>
        </template>
        <template #left-icon>
          <img
            src="https://lx.aosenn.com/h5/static/login/icon_name.png"
            style="width: 15px; height: 16px"
          />
        </template>
      </van-field>

      <div style="width: 100%">
        <van-button
          block
          color="#fcd323"
          @click="onSubmit"
          round
          style="border: none; color: #444; font-weight: bolder"
          type="primary"
        >
          确认转赠
        </van-button>
      </div>
      <div style="width: 100%; margin-top: 20px">
        <van-button
          block
          @click="$router.push('/invest')"
          color="#fcd323"
          round
          style="border: none; color: #444; font-weight: bolder"
          type="primary"
        >
          成为会员(降低手续费)
        </van-button>
      </div>
      <!--      <p style="color: #ccc; margin-top: 10px">互转10元宝起，互转无手续费！</p>-->
      <!--      <p style="color: #ccc; margin-top: 10px">-->
      <!--        发起转账方自身需有任意会员，方可使用转账。接收方无门槛接收！-->
      <!--      </p>-->
      <!--      <p style="color: #ccc; margin-top: 10px">元宝互转交易时间为每天早上8点至晚上19点！</p>-->
      <div style="box-sizing: border-box; border-radius: 15px; overflow: hidden">
        <img src="./images/zhuanzengyaoqiu.png" alt="" style="width: 100%" />
      </div>
      <!--      <p-->
      <!--        style="-->
      <!--          margin-top: 10px;-->
      <!--          background-color: #fff;-->
      <!--          color: #000;-->
      <!--          border-radius: 10px;-->
      <!--          padding: 5px;-->
      <!--          line-height: 20px;-->
      <!--        "-->
      <!--      >-->
      <!--        1、金币转赠5个起转，账户需要预留手续费，转成功后自动扣除手续！<br />-->
      <!--        2、非会员转增50%手续费，金币会员转赠5%手续费。<br />-->
      <!--        3、转赠时间 上午10点&#45;&#45;下午18点-->
      <!--      </p>-->

      <!--            <p style="color: #fff; margin-top: 10px">-->
      <!--                2、余额可以直接用来购买会员！余额也可以直接进行游戏，游戏过程中，有中奖赢钱，满足20元，可以在APP内发起兑换。-->
      <!--            </p>-->
      <!--            <p style="color: #fff; margin-top: 10px">-->
      <!--                3、余额互转功能，谁发起转账，谁需要拥有会员，接收方无需会员可接收-->
      <!--            </p>-->
      <!--            <p style="color: red; text-align: center; margin-top: 10px; font-size: 16px">-->
      <!--                全平台用户可以互相转-->
      <!--            </p>-->

      <!--      <div-->
      <!--        style="-->
      <!--          margin: 10px 0 0 0px;-->
      <!--          background-color: rgba(70, 89, 101, 0.7);-->
      <!--          border-radius: 10px;-->
      <!--          padding: 6px;-->
      <!--          color: #fff;-->
      <!--          text-indent: 2em;-->
      <!--          line-height: 1.6;-->
      <!--        "-->
      <!--      >-->
      <!--        <p style="margin-bottom: 8px">-->
      <!--          每日推广余额，可以用来进行游戏娱乐，中奖可兑换，投入1块钱，最多可中奖30000（3万元）爆奖奖金！-->
      <!--          中奖，无任何附加条件，直接可兑换！-->
      <!--        </p>-->

      <!--        <p>长期稳定，信誉，正规企业，合法合规!</p>-->
      <!--      </div>-->
    </div>
    <TipDialog
      v-model="showGonggaoOverlay2"
      confirm-text="去购买"
      @confirm="
        () => {
          $router.push('/invest')
          showGonggaoOverlay2 = false
        }
      "
    >
      <p
        style="
          transform: translateY(10px);
          text-align: center;
          font-size: 18px;
          color: #fff;
          font-weight: bolder;
          padding: 20px 0 40px;
        "
      >
        余额互转仅限会员用户使用
      </p>
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
        <img @click="share" src="./images/zhuanzengfenxiang.png" alt="" style="width: 80%" />
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts" setup>
// import imgg from './images/logo1.png'

import {
  logout as fnlogout,
  register,
  reqUserIncome,
  reqWalletTransfer,
  sociallogin
} from '@/api/myApi'
import { _no, _sleep, _notice } from '@/utils'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useRoute } from 'vue-router'
import { onActivated, onMounted, ref } from 'vue'
import { getIsInApp } from '@/utils/getTopPadding'
import dayjs from 'dayjs'
import isBetween from 'dayjs//plugin/isBetween'
import { showToast } from 'vant'

const showGonggaoOverlay2 = ref(false)

const isVip = ref(JSON.parse(window.localStorage.getItem('userInfo'))?.result?.staff?.serial)
const route = useRoute()
const time = ref()
const data = reactive({
  uid: '',
  code: '',
  amount: ''
  // fingerprint: ''
})
const countdown = ref(0)

// const fprint = () => {
//   FingerprintJS.load().then((FP) => {
//     FP.get().then(({ visitorId }) => (data.fingerprint = visitorId))
//   })
// }
// fprint()

let timer = null

// 更新倒计时显示
function updateCountdown() {
  if (!countdown.value) return clearInterval(timer)

  countdown.value--
}

const router = useRouter()

const shareDialogOverlay = ref(false)
const share = () => {
  localStorage.isZhuanzengShare = dayjs().format('YYYY-MM-DD')
  shareDialogOverlay.value = false
  window.shareFriend()
}

function go(path) {
  router.push(path)
}

function getCode() {
  // 获取今天的日期
  // dayjs.extend(isBetween)
  // const today = dayjs().startOf('day')
  //
  // // 获取今天 8 点和 19 点的时间
  // const morning8 = today.add(8, 'hour')
  // const evening7 = today.add(19, 'hour')
  //
  // // 获取当前时间
  // const now = dayjs()
  // // 判断当前时间是否在 8 点到 19 点之间
  // const isbetween = now.isBetween(morning8, evening7, null, '[]')
  //
  // if (!isbetween) {
  //   showToast({
  //     duration: 5000,
  //     message: '元宝互转交易时间为每天早上8点至晚上19点'
  //   })
  //   return
  // }
  // const serial = JSON.parse(window.localStorage.getItem('userInfo'))?.result?.staff?.serial
  // if (!serial) {
  //   showGonggaoOverlay2.value = true
  //
  //   return
  // }
  if (!data.uid) {
    return _notice('请输入团队成员ID')
  }

  reqWalletTransfer(data).then((e) => {
    _notice(e.msg)
    if (e.code === 201) {
      countdown.value = 60
      timer = setInterval(updateCountdown, 1000)
    }
  })
}

function onSubmit() {
  // if (!sessionStorage.isZhuanzengShare && window.android && window.android.shareImg) {
  if (localStorage.isZhuanzengShare !== dayjs().format('YYYY-MM-DD') && window.android) {
    // shareDialogShow.value = true
    shareDialogOverlay.value = true
    return
    // window.showShareFriend()
    //
    // localStorage.isZhuanzengShare = dayjs().format('YYYY-MM-DD')

    //   window.shareFriend()
    // })
    // return
  }

  if (!data.uid) {
    return showToast('请输入团队成员ID')
  }
  if (!data.amount) {
    return showToast('请输入转赠数量')
  }
  if (!data.code) {
    return showToast('请输入短信验证码')
  }

  // 获取今天的日期
  dayjs.extend(isBetween)
  const today = dayjs().startOf('day')

  // 获取今天 8 点和 19 点的时间
  const morning8 = today.add(10, 'hour')
  const evening7 = today.add(21, 'hour')

  // 获取当前时间
  const now = dayjs()
  const isbetween = now.isBetween(morning8, evening7, null, '[]')

  if (!isbetween) {
    showToast({
      duration: 5000,
      message: '转增时间为上午10点到晚上21点'
    })
    return
  }
  if (data.amount < 5) {
    return _notice('金币转赠5个起！')
  }
  if (!data.code) {
    return _notice('请输入验证码！')
  }
  reqWalletTransfer(data).then((e) => {
    _notice(e.msg)
    if (e.code === 200) {
      data.uid = ''
      data.code = ''
      data.amount = ''
    }
  })
}
const userIncomeInfo = ref({})
const getUserIncome = (cb?) => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
    cb && cb()
  })
}
onActivated(() => {
  getUserIncome()
})
</script>

<style lang="less" scoped>
@import '../../assets/less/index';

.fixed-back {
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
}

.btns {
  padding-top: 30px;

  button {
    margin: 0 10px;
  }
}

.van-cell {
  border-radius: 10px;
  margin-bottom: 10px;
}

.login {
  width: 100%;
  height: 100vh;
  color: #666;
  //background-color: #1f203d;
  background: url('https://lx.aosenn.com/h5/static/login/bolang.png') no-repeat;
  //background-color: rgb(247, 213, 152);
  background-size: 250px;
  background-position: 100% 0;
  overflow-y: auto;
  // background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;
  .van-divider {
    color: white;
  }
  :deep(.van-nav-bar) {
    background: transparent !important;
    .van-nav-bar__title {
      color: #000 !important;
    }

    .van-nav-bar__text {
      color: #000 !important;
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
  .content {
    box-sizing: border-box;
    padding: 0 0px 30px;
    width: 90%;
    margin: 20px auto 0;
    //box-shadow: 0 0 10px #0000001f;
    border-radius: 20px;
    //background-color: #2e3350;

    .desc {
      margin-top: 10px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .button {
      width: 100%;
      margin-bottom: 5px;
    }
  }
}

.logo-box {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 100px;
  }

  .logo-box-content {
    display: flex;

    img {
      width: 60px;
    }

    .info {
      color: #000;
      margin-left: 16px;
      text-align: center;

      p:nth-child(1) {
        font-size: 18px;
      }
    }
  }
}
:deep(.van-cell) {
  border-radius: 25px;
  box-shadow: 0 0 10px #eee;
  .van-field__control {
    text-indent: 20px;
  }
}
</style>
