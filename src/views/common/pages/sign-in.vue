<template>
  <div class="login_box">
    <header class="mui-bar mui-bar-transparent">
      <!---<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>--->
      <h1 class="mui-title"></h1>
    </header>
    <div class="content">
      <div class="header">
        <!--img src="/upload/default_mobile/images/logo.png"-->
        <!--        <i class="fa fa-user-o"></i>-->
      </div>
      <p
        style="text-align: center; margin-top: 20px; text-decoration: underline"
        @click="goDownload"
      >
        已有账号，去下载
      </p>

      <div class="list">
        <div class="list-call">
          <div class="ico">
            <i class="now-ui-icons fa fa-user"></i>
          </div>
          <input
            v-model="state.struct.account"
            class="biaoti"
            type="tel"
            id="yhname"
            name="yhname"
            placeholder="请输入手机号码"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="11"
            autocomplete="off"
          />
        </div>
        <div class="list-call">
          <div class="ico">
            <i class="now-ui-icons fa fa-lock"></i>
          </div>
          <input
            v-model="state.struct.password"
            class="biaoti"
            type="password"
            id="yhpass"
            name="yhpass"
            placeholder="请输入密码"
          />
        </div>
      </div>

      <div style="text-align: center">
        <button
          type="submit"
          class="dlbutton"
          id="yhdl"
          :disabled="state.status.wait"
          @click="SignIn"
        >
          登 录
        </button>
      </div>
      <div class="xieyi">
        <a
          @click="$router.push('/common/sign-forget')"
          class="window"
          data-type="1"
          data-url="/?type=forgetPwd"
          id="kefu"
          data-title="忘记密码"
          >忘记密码</a
        >
        <span>|</span>
        <a class="window" data-url="reg.html" id="reg" @click="$router.push('/common/sign-up')"
          >注册账户</a
        >
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
  window.location.href = 'https://qm.qq.com/q/LVWCgqGSKQ'
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
    window.location.href = `https://fx.kujspvp.cn/download`
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
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .mui-bar {
    box-shadow: none;
    height: 76px;
    padding-top: 32px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .header {
    width: 101px;
    height: 101px;
    background:
      url('@/assets/img/logo.png') no-repeat center / 100% 100%,
      linear-gradient(
        -30deg,
        rgba(63, 205, 235, 1),
        rgba(188, 226, 158, 1)
      ); /*rgba(63,205,235,1);*/
    box-shadow: 0px 12px 13px 0px rgba(63, 205, 235, 0.47);
    border-radius: 50%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    line-height: 101px;
    color: #fff;
    font-size: 50px;
  }

  .header img {
    width: 101px;
    height: 101px;
    border-radius: 50%;
  }

  .list {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .list-call {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    color: #333333;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .list-call .img {
    width: 24px;
    height: 24px;
  }
  .list-call .ico {
    width: 24px;
    height: 24px;
    color: #ffbe42;
    text-align: center;
    line-height: 24px;
  }
  .list-call .biaoti {
    text-align: left;
    margin: 0 0 0 0;
    border: 0;
    color: #666;
  }

  .dlbutton {
    color: #ffffff;
    font-size: 26px;
    width: 260px;
    height: 60px;
    background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
    box-shadow: 0px 0px 13px 0px rgba(164, 217, 228, 0.2);
    border-radius: 50px;
    line-height: 60px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    padding: 0;
  }
  .dlbutton:hover {
    background: linear-gradient(-90deg, rgba(63, 205, 235, 0.9), rgba(188, 226, 158, 0.9));
  }
  .dlbutton button {
    background: none;
    border: 0;
    height: 60px;
    width: 100%;
  }
  .xieyi {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin-top: 40px;
    color: #ffa800;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .xieyi a {
    font-size: 18px;
    margin-left: 15px;
    margin-right: 15px;
    color: #ffa800;
  }
}
</style>
