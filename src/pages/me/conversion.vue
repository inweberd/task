<template>
  <div class="login">
    <!-- <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" /> -->

    <van-nav-bar
      title="佣金互转"
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
          placeholder="团队成员手机号"
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
          label="短信验证码"
          name="验证码"
          placeholder="(必填) 验证码"
        >
          <template #button>
            <van-button
              v-if="!time"
              size="small"
              type="primary"
              @click="getCode"
              style="background: #01c5f0; border: none"
              :disabled="countdown"
            >
              {{ countdown ? countdown + 's重新发送' : '发送验证码' }}
            </van-button>
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
            style="background: #01c5f0; border: none"
          >
            转账
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import imgg from './images/logo1.png'
import imgg from '@/views/common/assets/logo.png'

import { logout as fnlogout, register, reqWalletTransfer, sociallogin } from '@/api/myApi'
import { _no, _sleep, _notice } from '@/utils'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { getIsInApp } from '@/utils/getTopPadding'

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
  if (data.amount < 50) {
    return _notice('佣金互转50元起！')
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
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;

  // background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;
  .van-divider {
    color: white;
  }

  .content {
    padding: 30px 30px;

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
