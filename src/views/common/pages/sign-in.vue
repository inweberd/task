<template>
  <div class="signinClass">
    <div class="logo-box">
      <div class="logo-box-content">
        <img src="@/assets/img/logo.png" alt="" />
        <div class="info">
          <p>全民来瓜分</p>
          <p>the whole people divide</p>
        </div>
      </div>
    </div>
    <div class="container d-flex justify-content-around user-select-none">
      <div class="right card backdrop-filter" style="width: 100%">
        <div
          class="card-body p-lg-4"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
          "
        >
          <van-cell-group style="width: 100%">
            <van-field v-model="state.struct.account" placeholder="请输入手机号码" />
            <van-field
              style="margin-top: 20px"
              v-model="state.struct.password"
              clearable
              placeholder="请输入密码"
              type="password"
            />
          </van-cell-group>
          <div style="text-align: right; width: 100%; margin: 10px 10px 20px 0">
            <span @click="$router.push('/common/sign-forget')"> 忘记密码 </span>
          </div>

          <el-button
            :loading="state.status.wait"
            class="w-100"
            color="#01c5f0"
            size="large"
            style="
              border-radius: 15px;
              color: #fff;
              background-image: linear-gradient(to right, #ff8b6e, #ff625c);
            "
            type="primary"
            @click="SignIn"
            >登录
          </el-button>
          <span></span>
          <el-button
            class="w-100"
            color="#00f7c4"
            size="large"
            style="
              border-radius: 15px;
              margin-top: 20px !important;
              color: #666;
              background-color: #fff;
              border: 1px solid #ccc !important;
            "
            type="primary"
            @click="$router.push('/common/sign-up')"
            >注册
          </el-button>
        </div>
      </div>
    </div>
    <div style="width: 80%; margin: 0 auto">
      <van-divider
        :style="{ color: '#666', borderColor: '#666', padding: '0 16px' }"
        style="width: 100%; margin-top: 40px"
      >
        其他
      </van-divider>
      <div style="display: flex; justify-content: space-evenly; align-items: center; width: 100%">
        <a style="font-size: 16px; color: #666" @click="goDownload">下载app</a>
        <a style="font-size: 16px; color: #666" @click="jumpToQQ2">官方交流群 </a>
      </div>
    </div>
    <!--    <div class="contact" @click="jumpToQQ2">-->
    <!--      <img alt="" src="@/assets/img/kefu.png" />-->
    <!--      <div>-->
    <!--        <div>联系</div>-->
    <!--        <div>客服</div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import cache from '@/utils/cache.ts'

import { storeToRefs } from 'pinia'
import { POST } from '@/utils/axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '@/store/users'
import { AES, token as aesToken } from '@/utils/AES'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { _notice } from '@/utils'
import { getImei, getOaid } from '@/utils/ad'

const { info, token, status } = storeToRefs(useUsers())

const router = useRouter()
const state = reactive({
  struct: {
    code: '',
    social: '',
    account: '',
    password: ''
  },

  status: {
    wait: false,
    code: false
  },
  code: {}
})

function goDownload() {
  try {
    window.location.href = `https://wuw.anqtu.cn/download`
  } catch (e) {
    _notice('下载失败')
  }
}

function jumpToQQ2() {
  // router.push('/weimaiquanDetail')

  window.location.href = decodeURIComponent('https://qm.qq.com/q/oVkcjwfykS')
}

const SignIn = async () => {
  if (!state.struct.account) return showFailToast('请输入账号')
  if (!state.struct.password) return showFailToast('请输入密码')
  state.status.wait = true

  let unix

  const { code: timeCode, data: timeData } = await axios.get('/dev/info/time')
  if (timeCode !== 200) {
    unix = Math.round(new Date().getTime() / 1000)
  } else {
    unix = timeData.unix
  }

  const iv = aesToken('inis-iv', 16, 'aes')
  const key = aesToken('inis-key', 16, 'aes')
  const item = new AES(key, iv)
  const { code, data, msg } = await POST(
    `/api/comm/login`,
    {
      account: state.struct.account,
      password: CryptoJS.AES.encrypt(
        state.struct.password,
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxppwc6CNrcLJRLFIWtuABYIf1U/5Hpwzaj4f17sZwaUf4LlHQXto50RB6c4wRDU9MFcI3gwmu6OQrMu211XVoE/P6u4R1/hYdcNaPAM9UGEJg+bVOFxBp4BXFtq+3kAkMYnOCpYygK0J5pJe4KEhfB4VucidKmtYlgCGdfhcRUp9CiuUF1zwx6+UN1JzYY3piVG4uIV//KydKtFcF4ZtDt2OmBnGy96T/GA3A1+Kx2Zjl3u+PDNjzSHwYiJ46h8rcqV+86LL2y/G2kKeXMBeQPHPiwNP8p6SjZEEmBKCc4w3wBZiXKsTBk8dVfO77A5tLf6x3tm9eFqQLUJs4fxcowIDAQAB'
      ).toString()
    },
    {
      headers: {
        'X-Khronos': unix,
        'X-Gorgon': `${key} ${iv}`,
        // 注意：每个签名有效时间只有60s
        'X-Argus': item.encrypt(
          JSON.stringify({
            imei: getOaid() || getImei(),
            unix,
            account: state.struct.account,
            password: state.struct.password
          })
        )
      }
    }
  )
  state.status.wait = false

  if (code !== 200) return showFailToast(msg)

  // 更新仓库状态
  info.value = data.user
  token.value = data.token
  status.value.login = true
  cache.set('token', data.token)
  cache.set('users[info]', data.user)

  for (let i in state.struct) state.struct[i] = ''
  window.localStorage.setItem('token', data.token)
  window.localStorage.setItem('userInfo', JSON.stringify(data.user))

  // 跳转到首页
  router.push({ path: '/' })
}
onMounted(() => {
  window.localStorage.removeItem('userInfo')
  window.localStorage.removeItem('token')
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/root.css';
// 通过scss覆盖element-plus样式
@import '@/assets/css/el-plus.scss';
// 覆盖element-plus样式
@import '@/assets/css/el-plus.css';
// Bootstrap样式
@import 'bootstrap/dist/css/bootstrap.css';
// 覆盖bootstrap样式
@import '@/assets/css/bootstrap.css';
// 导入样式
@import '@/assets/css/index.css';

.text-white {
  color: #666 !important;
}

.contact {
  position: fixed;
  top: 70%;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #666;
  color: #000;
  border-radius: 20px 0 0 20px;
  padding: 4px;
  box-shadow:
    0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
    0px 0.3px 5.3px rgba(0, 0, 0, 0.028),
    0px 0.5px 10px rgba(0, 0, 0, 0.035),
    0px 0.9px 17.9px rgba(0, 0, 0, 0.042),
    0px 1.7px 33.4px rgba(0, 0, 0, 0.05),
    0px 4px 80px rgba(0, 0, 0, 0.07);

  img {
    margin-right: 4px;
    width: 25px;
  }
}

:deep(.el-input) {
  overflow: hidden;
  border-radius: 50px;
  margin-bottom: 10px;
}

.signinClass {
  width: 100%;
  height: 100vh;
  color: #666;
  background-repeat: no-repeat;
  background-image: url('@/assets/img/bg.png');
  background-size: 100% auto;

  .container {
    width: 90%;
    margin: 50px auto 0;
    background-color: #fff;
    padding: 20px 40px;
    border-radius: 20px;
    box-shadow: 0 0 10px #0000001f;
  }
}

:deep(.van-cell) {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  &::after {
    border: none !important;
  }

  .van-field__body {
    input {
      color: #666 !important;
    }
  }
}

:deep(.van-hairline--top-bottom) {
  &::after {
    border-width: 0;
  }
}

.input {
  background-color: transparent !important;
  border: 1px solid #666;
  border-radius: 15px;
}
.logo-box {
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  .logo-box-content {
    display: flex;
    img {
      width: 60px;
    }
    .info {
      color: #fff;
      margin-left: 16px;
      text-align: center;
      p:nth-child(1) {
        font-size: 30px;
        letter-spacing: 8px;
      }
    }
  }
}
</style>
