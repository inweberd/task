<template>
  <div class="login" v-if="false">
    <!-- <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" /> -->
    <van-nav-bar
      title="余额互转"
      safe-area-inset-top
      :class="{ inApp: getIsInApp() }"
      fixed
      placeholder
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />
    <div class="content">
      <div class="desc">
        <!--<van-image width="100" height="100" :src="imgg" />-->
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="data.phone"
          label=""
          name="团队成员手机号"
          placeholder="请输入对方手机号"
          :rules="[{ required: true, message: '请输入团队成员手机号' }]"
        />
        <van-field
          v-model="data.amount"
          type="number"
          name="金额"
          label=""
          placeholder="转账金额"
          :rules="[{ required: true, message: '请输入转账金额' }]"
        />
        <van-field
          v-model="data.code"
          center
          clearable
          label=""
          name="验证码"
          placeholder="(必填) 验证码"
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
            <p v-if="!time" @click="getCode" style="color: #999">
              {{ countdown ? countdown + 's重新发送' : '发送验证码' }}
            </p>
            <div v-else>
              {{ time }}
            </div>
          </template>
        </van-field>

        <van-divider />

        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            style="border: none"
            color="linear-gradient(to right, #ff8b6e, #ff625c)"
          >
            转账
          </van-button>
        </div>
      </van-form>
      <p style="color: #000">1、余额互转20元起，互转免手续费,全平台用户可以互相转！</p>
      <!--      <p style="color: #000; margin-top: 10px">-->
      <!--        2、前期小代理，低等级会员，0撸用户，可以通过余额互转来实现余额流通，可以卖给上级，也可以在群内卖给收余额的用户，或者在APP内收别人的余额，用来凑够50元在APP发起提现。-->
      <!--      </p>-->
      <p style="color: #000; margin-top: 10px">
        2、余额可以直接用来购买会员！余额也可以直接进行游戏，游戏过程中，有中奖赢钱，满足20元，可以在APP内发起提现。
      </p>
      <p style="color: #000; margin-top: 10px">
        3、余额互转功能，谁发起转账，谁需要拥有会员，接收方无需会员可接收
      </p>
      <!--      <p style="color: red; text-align: center; margin-top: 10px; font-size: 16px">-->
      <!--        全平台用户可以互相转-->
      <!--      </p>-->

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
      <!--          每日推广余额，可以用来进行游戏娱乐，中奖可提现，投入1块钱，最多可中奖30000（3万元）爆奖奖金！-->
      <!--          中奖，无任何附加条件，直接可提现！-->
      <!--        </p>-->

      <!--        <p>长期稳定，信誉，正规企业，合法合规!</p>-->
      <!--      </div>-->
    </div>
    <TipDialog
      v-model="showGonggaoOverlay2"
      @confirm="
        () => {
          $router.push('/invest')
          showGonggaoOverlay2 = false
        }
      "
      confirm-text="去开通"
    >
      <p
        style="
          transform: translateY(10px);
          text-align: center;
          font-size: 18px;
          color: #f1361e;
          font-weight: bolder;
          padding: 20px 0 40px;
        "
      >
        余额互转仅限会员用户使用
      </p>
    </TipDialog>
  </div>
</template>

<script lang="ts" setup>
// import imgg from './images/logo1.png'
import imgg from '@/views/common/assets/logo.png'

import { logout as fnlogout, register, reqWalletTransfer, sociallogin } from '@/api/myApi'
import { _no, _sleep, _notice } from '@/utils'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getIsInApp } from '@/utils/getTopPadding'
const showGonggaoOverlay2 = ref(false)

const isVip = ref(JSON.parse(window.localStorage.getItem('userInfo'))?.result?.staff?.serial)
const route = useRoute()
const time = ref()
const data = reactive({
  phone: '',
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
function go(path) {
  router.push(path)
}

function getCode() {
  const serial = JSON.parse(window.localStorage.getItem('userInfo'))?.result?.staff?.serial
  if (!serial) {
    showGonggaoOverlay2.value = true

    return
  }
  if (!data.phone) {
    return _notice('请输入团队成员手机号')
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
  if (data.amount < 20) {
    return _notice('余额互转20元起！')
  }
  if (!data.phone || !data.code) {
    return _notice('请输入验证码！')
  }
  reqWalletTransfer(data).then((e) => {
    _notice(e.msg)
    if (e.code === 200) {
      data.phone = ''
      data.code = ''
      data.amount = ''
    }
  })
}
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
  background-repeat: no-repeat;
  background-image: url('@/assets/img/bg.png');
  background-size: 100% auto;
  // background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;
  .van-divider {
    color: white;
  }

  .content {
    box-sizing: border-box;
    padding: 0 30px 30px;
    width: 90%;
    margin: 110px auto 0;
    box-shadow: 0 0 10px #0000001f;
    border-radius: 20px;
    background-color: #fff;

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
</style>
