<template>
  <div class="signupClass">
    <div class="logo-box">
      <div class="logo-box-content">
        <img src="@/assets/img/logo.png" alt="" />
        <div class="info">
          <p>全民来瓜分</p>
          <p>the whole people divide</p>
        </div>
      </div>
    </div>
    <div
      id="sign"
      class="d-flex justify-content-around user-select-none"
      style="width: 80%; margin: 60px auto 0"
    >
      <div class="right card backdrop-filter" style="box-shadow: unset; background: transparent">
        <div
          class="card-body p-lg-4"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          "
        >
          <van-cell-group
            style="background-color: transparent !important; border: none !important; width: 100%"
          >
            <van-field v-model="state.struct.social" placeholder="请输入手机号码" class="input">
              <template #left-icon>
                <van-icon color="#fff" name="contact" />
              </template>
            </van-field>
            <van-field
              v-model="state.struct.code"
              center
              clearable
              class="input"
              placeholder="请输入短信验证码"
              style="margin-top: 20px"
            >
              <template #left-icon>
                <van-icon color="#fff" name="records" />
              </template>
              <template #button>
                <div @click="SendCode" style="color: white">
                  <span v-if="!state.status.code">发送验证码</span>
                  <span v-else>{{ state.code.second }}秒重新发送</span>
                </div>
              </template>
            </van-field>
            <van-field
              class="input"
              v-model="state.struct.password"
              clearable
              placeholder="请输入密码"
              type="password"
              style="margin-top: 20px"
            >
              <template #left-icon>
                <van-icon color="#fff" name="lock" />
              </template>
            </van-field>
            <van-field
              class="input"
              v-model="state.struct.AgainPassword"
              clearable
              placeholder="请再次输入密码"
              type="password"
              style="margin-top: 20px"
            >
              <template #left-icon>
                <van-icon color="#fff" name="lock" />
              </template>
            </van-field>

            <van-field
              v-model="state.struct.invite"
              placeholder="请输入邀请码"
              :disabled="route.query.invite"
              class="input"
              style="margin-top: 20px"
            >
              <template #left-icon>
                <van-icon color="#fff" name="notes-o" />
              </template>
            </van-field>
          </van-cell-group>
          <div style="text-align: right; width: 100%; margin: 10px 10px 20px 0">
            <span @click="$router.push('/common/sign-forget')"> 忘记密码 </span>
          </div>
          <el-button
            :loading="state.status.wait"
            class="w-85"
            color="#01c5f0"
            size="large"
            style="border-radius: 20px; margin-top: 20px !important; color: #fff"
            type="primary"
            @click="SignUp"
            >注册
          </el-button>
          <span></span>
          <el-button
            class="w-85"
            color="#00f7c4"
            size="large"
            style="border-radius: 20px; margin-top: 20px !important; color: #fff"
            type="primary"
            @click="$router.push('/common/sign-in')"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cache from '@/utils/cache'
import logo from '@/views/common/assets/logo.png'

import { POST } from '@/utils/axios'
import { reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUsers } from '@/store/users'
import { showFailToast, showToast } from 'vant'
import { DocumentCopy, User, Lock, Connection } from '@element-plus/icons-vue'

const user = useUsers()
const router = useRouter()
const route = useRoute()
const state = reactive({
  struct: {
    code: '',
    social: '',
    account: '',
    invite: route.query.invite || '',
    password: '',
    AgainPassword: ''
  },
  segmented: {
    value: 'account',
    options: [
      { value: 'code', label: '验证码登录' },
      { value: 'account', label: '账密登录' }
    ]
  },
  status: {
    wait: false,
    code: false
  },
  code: {
    timer: 0,
    second: 0
  }
})

const SignUp = async () => {
  if (!state.struct.social) return showFailToast('请输入手机号码')
  if (!state.struct.password) return showFailToast('请输入密码')
  if (!state.struct.AgainPassword) return showFailToast('请再次输入密码')
  if (state.struct.password !== state.struct.AgainPassword) return showFailToast('两次密码不一致')
  if (state.struct.password.length < 8) return showFailToast('密码长度不得小于8位')
  if (!state.struct.code) return showFailToast('请输入验证码')

  state.status.wait = true

  const { code, data, msg } = await POST(
    '/api/comm/register',
    {
      ...state.struct,
      account: state.struct.social
    },
    { AutoToken: false }
  )

  state.status.wait = false

  if (code !== 200) return showFailToast(msg)

  // // 更新仓库状态
  // user.info = data.user
  // user.token = data.token
  // user.status.login = true
  //
  // // 存储到缓存中
  // cache.set('token', data.token, 7 * 24 * 60 * 60)
  // cache.set('user[info]', data.user)

  // 清空输入框
  state.code.second = 0
  for (let i in state.struct) state.struct[i] = ''

  showToast('注册成功')
  // window.location.href = `https://hh.yuyuwa.cn/download`
  // 跳转到首页
  router.push({ path: '/' })
}

// 发送验证码
const SendCode = async () => {
  if (!state.struct.social) return showFailToast('请输入手机号码')

  const { code, msg } = await POST(
    '/api/comm/register',
    {
      invite: state.struct.invite,
      social: state.struct.social
    },
    { AutoToken: false }
  )

  if (code !== 201) return showFailToast(msg)
  showToast('验证码已发送')

  state.code.second = 60
  state.code.timer = setInterval(() => {
    state.code.second--
  }, 1000) as unknown as number
}

// 监听验证码倒计时
watch(
  () => state.code.second,
  (val) => {
    if (val <= 0) {
      clearInterval(state.code.timer)
      state.code.second = 0
      state.status.code = false
    }
    if (val > 0 && val <= 60) state.status.code = true
  }
)
</script>

<style scoped lang="scss">
@import '@/assets/css/root.css'; // 通过scss覆盖element-plus样式
@import '@/assets/css/el-plus.scss'; // 覆盖element-plus样式
@import '@/assets/css/el-plus.css'; // Bootstrap样式
@import 'bootstrap/dist/css/bootstrap.css'; // 覆盖bootstrap样式
@import '@/assets/css/bootstrap.css'; // 导入样式
@import '@/assets/css/index.css';
.el-segmented {
  --el-border-radius-base: 50px;
  --el-text-color-regular: white;
  --el-segmented-bg-color: transparent;
  --el-segmented-item-hover-color: white;
  --el-segmented-item-selected-color: white;
  --el-segmented-item-hover-bg-color: transparent;
  --el-segmented-item-active-bg-color: transparent;
  --el-segmented-item-selected-bg-color: rgba(var(--inis-theme));
}
body {
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;
}
.text-white {
  color: #fff !important;
}
.contact {
  position: fixed;
  top: 10%;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
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

.signupClass {
  background-color: #000;
  width: 100%;
  height: 100vh;
  color: #fff;
  background-repeat: no-repeat;
  background-image: url('@/assets/img/bg.png');
  background-size: 100% auto;
}

:deep(.van-cell) {
  padding: 4px 10px;

  &::after {
    border: none !important;
  }

  .van-field__body {
    input {
      color: #fff;
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
  border: 1px solid #fff;
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
