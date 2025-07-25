<template>
  <!--  <div class="signinClass">sa</div>-->
  <div class="login_box">
    <div class="back">
      <div class="title-banner">
        <div class="title">
          <div class="title1">Hello</div>
          <div class="title2">欢迎使用群英会年度钜制</div>
        </div>
      </div>
      <div class="login-type-box">
        <!--        <div class="login-type-item ">账号登录</div>-->
        <div class="login-type-item login-type-item-active">手机号登录</div>
      </div>
      <div class="item">
        <van-cell-group style="width: 100%">
          <van-field
            left-icon="user"
            v-model="state.struct.account"
            clearable
            placeholder="手机号码"
          >
            <template #left-icon>
              <img
                src="https://lx.aosenn.com/h5/static/login/icon_name.png"
                style="width: 15px; height: 16px"
              />
            </template>
          </van-field>
          <van-field
            style="margin-top: 20px"
            v-model="state.struct.password"
            placeholder="密码"
            type="password"
          >
            <template #left-icon>
              <img
                src="https://lx.aosenn.com/h5/static/login/icon_mm.png"
                style="width: 15px; height: 16px"
              />
            </template>
          </van-field>
        </van-cell-group>

        <div class="pass_con">
          <div class="pava">
            <span @click="$router.push('/common/sign-up')">注册账号</span>
            <span @click="goDownload">下载APP</span>
            <span @click="$router.push('/common/sign-forget')">忘记密码</span>
          </div>
          <div class="pava" style="margin-top: 10px">
            <span></span>
            <span></span>
            <span @click="goQQ">官方QQ群</span>
          </div>
        </div>
        <div style="margin-top: 10px"></div>
        <el-button
          :loading="state.status.wait"
          color="#fcd323"
          size="large"
          style="
            border-radius: 30px;
            border: none;
            color: #444;
            width: 100%;
            height: 45px;
            margin-top: 50px;
          "
          type="primary"
          @click="SignIn"
          >登录
        </el-button>
        <div class="agreement_box">
          <van-checkbox v-model="checked" checked-color="#ffce42" icon-size="16px" shape="square">
            <div>
              <span>我已经详细阅读</span>
              <span @click.stop style="color: rgb(255, 206, 66)">《服务协议》</span>
              <span>和</span>
              <span @click.stop style="color: rgb(255, 206, 66)">《隐私协议》</span>
            </div>
          </van-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cache from '@/utils/cache.ts'

import { storeToRefs } from 'pinia'
import { POST } from '@/utils/axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '@/store/users'
import { AES, ASCII, token as aesToken } from '@/utils/AES'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { _notice } from '@/utils'
import { getImei, getOaid } from '@/utils/ad'
import bus from '@/utils/bus'
import ToggleLoginAndRegister from '@/views/common/components/ToggleLoginAndRegister.vue'
import { showToast } from 'vant'
const goQQ = () => {
  window.location.href = 'https://qm.qq.com/q/x00vQBFn4A'
}
defineOptions({
  name: 'signIn'
})
const { info, token, status } = storeToRefs(useUsers())
const showGonggaoOverlay = ref(false)

const handleGonggaoConfirm = () => {
  showGonggaoOverlay.value = false
  // window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.edujia.weimai'
  window.location.href = 'https://www.haiouchat.com'
}
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
    window.location.href = `https://qyh.88tong.cn/download`
  } catch (e) {
    _notice('下载失败')
  }
}

function jumpToQQ2() {
  // router.push('/weimaiquanDetail')
  showGonggaoOverlay.value = true

  // window.location.href = decodeURIComponent('https://qm.qq.com/q/3zT9teK65O')
}

const SignIn = async () => {
  if (!state.struct.account) return showToast('请输入手机号')
  if (!state.struct.password) return showToast('请输入密码')
  if (!checked.value) return showToast('请先勾选下方协议')
  state.status.wait = true

  let unix

  const res = await axios.get('/dev/info/time')
  if (res.data.code !== 200) {
    unix = Math.round(new Date().getTime() / 1000)
  } else {
    unix = res.data?.data?.unix
  }
  const iv = aesToken(unix, 16)
  const key = aesToken('method=GET', 16)
  const item = new AES(key.toUpperCase(), iv.toUpperCase())

  const params = {
    account: state.struct.account,
    password: state.struct.password
  }

  const account = state.struct.account
  // 获取明文密码
  const password = state.struct.password

  // const XHelios = Buffer.from(`${key}${iv}`).toString('base64')
  const XHelios = btoa(`${key}${iv}`)

  const XSsStub = CryptoJS.MD5(ASCII(params)).toString().toUpperCase()

  const { code, data, msg } = await POST(
    `/api/comm/sign-in`,
    {
      // account: state.struct.account,
      account: item.encrypt(account),
      password: item.encrypt(password)
      // password: state.struct.password
    },
    {
      headers: {
        'X-Khronos': unix,
        // 'X-Gorgon': `${key} ${iv}`,
        'X-Helios': XHelios,
        'X-SS-STUB': XSsStub,
        'X-Medusa': item.encrypt(JSON.stringify(params))
        // 'X-Argus': item.encrypt(
        //   JSON.stringify({
        //     imei: getOaid() || getImei(),
        //     unix,
        //     account: state.struct.account,
        //     password: state.struct.password
        //   })
        // )
      }
    }
  )
  state.status.wait = false

  if (code !== 200) return showToast(msg)

  // 更新仓库状态
  info.value = data.user
  token.value = data.token
  status.value.login = true
  cache.set('token', data.token.value)
  cache.set('users[info]', data.user)

  for (let i in state.struct) state.struct[i] = ''
  window.localStorage.setItem('token', data.token.value)
  window.localStorage.setItem('userInfo', JSON.stringify(data.user))

  // 跳转到首页
  bus.emit('shengchengQr')
  router.replace({ path: '/' })
}

const checked = ref(false)
onMounted(() => {
  window.localStorage.removeItem('userInfo')
  window.localStorage.removeItem('token')
})
</script>

<style>
* {
  box-sizing: border-box;
}
.row_img {
  div,
  img {
    width: 100%;
    height: 100%;
  }
}
.div-input {
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: inherit;
}
</style>
<style lang="scss" scoped>
.login_box {
  color: #303133;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  background-image: url(https://lx.aosenn.com/h5/static/login/bolang.png);
  background-repeat: no-repeat;
  background-size: 250px;
  background-position: 100% 0;
  overflow: hidden;

  :deep(.van-cell) {
    border-radius: 25px;
    box-shadow: 0 0 10px #eee;
    .van-field__control {
      text-indent: 20px;
    }
  }

  .back {
    width: 85%;
    border-radius: 0 0 10% 10%;
    margin: 82px auto 0;
    .title-banner {
      margin-top: 115px;
      .title {
        display: flex;
        align-items: flex-end;
        .title1 {
          font-size: 40px;
        }
        .title2 {
          font-size: 20px;
          padding-left: 7px;
          padding-bottom: 8px;
        }
      }
    }

    .login-type-box {
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      margin-top: 60px;
      margin-bottom: 20px;

      .login-type-item {
        margin-right: 22px;
        font-size: 15px;
        position: relative;

        &-active {
          color: #fcd323;
          font-weight: 600;
          height: 100%;
          line-height: 35px;

          &::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 2px;
            background-color: #fcd323;
            bottom: 0;
            left: 50%;
            margin-left: -10px;
          }
        }
      }
    }

    .item {
      margin: 0 auto;
      border-radius: 10px;
      padding: 0px 0 20px 0;
    }

    .pass_con {
      margin: 30px auto 0;
      .pava {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }
    }

    .agreement_box {
      width: 321px;
      margin-left: 17px;
      font-size: 13px;
      margin-top: 30px;
    }
  }
}
</style>
