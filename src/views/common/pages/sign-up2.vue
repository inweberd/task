<template>
  <div class="signupClass">
    <div class="logo-box">
      <img alt="" src="@/assets/img/logo.png" />
      <div class="logo-box-content">
        <div class="info">
          <!--          <p>群英会阶梯</p>-->
          <!--                    <p>the big thumb video</p>-->
        </div>
      </div>
    </div>
    <!--    <ToggleLoginAndRegister :active="1" style="margin-top: 50px"></ToggleLoginAndRegister>-->

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
            <van-field v-model="state.struct.social" placeholder="请输入手机号码" />
            <van-field
              style="margin-top: 20px"
              v-model="state.struct.code"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <div style="color: #999" @click="SendCode">
                  <span v-if="!state.status.code">发送验证码</span>
                  <span v-else>{{ state.code.second }}秒重新发送</span>
                </div>
              </template>
            </van-field>
            <van-field
              style="margin-top: 20px"
              v-model="state.struct.password"
              placeholder="请输入密码"
              type="password"
            />
            <van-field
              v-model="state.struct.AgainPassword"
              placeholder="请再次输入密码"
              type="password"
              style="margin-top: 20px"
            />

            <van-field
              style="margin-top: 20px"
              v-model="state.struct.invite"
              :disabled="route.query.invite"
              placeholder="请输入邀请码"
            />
          </van-cell-group>
          <!--          <div style="text-align: right; width: 100%; margin: 10px 10px 20px 0">-->
          <!--            <span @click="$router.push('/common/sign-forget')"> 找回密码 </span>-->
          <!--          </div>-->
          <el-button
            :loading="state.status.wait"
            class="w-100"
            color="#01c5f0"
            size="large"
            style="
              margin-top: 20px;
              border-radius: 15px;
              color: #0775f1;
              background-color: #bfd8d8;
              font-weight: bolder;
            "
            type="primary"
            @click="SignUp"
            >注册
          </el-button>
        </div>
      </div>
      <div style="width: 80%; margin: 30px auto 0">
        <!--      <van-divider-->
        <!--        :style="{ color: '#666', borderColor: '#666', padding: '0 16px' }"-->
        <!--        style="width: 100%; margin-top: 20px"-->
        <!--      >-->
        <!--        其他-->
        <!--      </van-divider>-->
        <div style="display: flex; justify-content: space-evenly; align-items: center; width: 100%">
          <a
            style="font-size: 16px; color: #fff; padding: 4px 12px; border-radius: 8px"
            @click="goDownload"
            >下载app</a
          >
          <a
            style="font-size: 16px; color: #fff; padding: 4px 12px; border-radius: 8px"
            @click="jumpToQQ2"
            >官方交流群
          </a>
        </div>
      </div>
    </div>

    <TipDialog
      v-model="showGonggaoOverlay"
      confirm-text="点击进入官方群"
      @confirm="handleGonggaoConfirm"
    >
      <!--      <p-->
      <!--        style="-->
      <!--          transform: translateY(10px);-->
      <!--          text-align: center;-->
      <!--          font-size: 18px;-->
      <!--          color: #000;-->
      <!--          font-weight: bolder;-->
      <!--        "-->
      <!--      >-->
      <!--        请使用68APP扫码进官方群-->
      <!--      </p>-->
      <div style="padding: 20px">
        <img alt="" src="@/assets/img/weimaiquan.jpg" style="width: 100%" />
      </div>
    </TipDialog>
  </div>
</template>

<script lang="ts" setup>
import cache from '@/utils/cache'

import { POST } from '@/utils/axios'
import { reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUsers } from '@/store/users'
import { showFailToast, showToast } from 'vant'
import { DocumentCopy, User, Lock, Connection } from '@element-plus/icons-vue'
import { _notice } from '@/utils'
import ToggleLoginAndRegister from '@/views/common/components/ToggleLoginAndRegister.vue'

const showGonggaoOverlay = ref(false)

const handleGonggaoConfirm = () => {
  showGonggaoOverlay.value = false
  // window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.edujia.weimai'
  window.location.href = 'https://www.haiouchat.com'
}
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
  // window.location.href = `https://wwew.rdhlkm.com/download`
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

function goDownload() {
  try {
    window.location.href = `https://wwew.rdhlkm.com/download`
  } catch (e) {
    _notice('下载失败')
  }
}

function jumpToQQ2() {
  // router.push('/weimaiquanDetail')
  showGonggaoOverlay.value = true

  // window.location.href = decodeURIComponent('https://qm.qq.com/q/3zT9teK65O')
}
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
  color: #666 !important;
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
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  color: #666;
  background: url('../assets/images/login-bg.png') no-repeat;
  background-size: 100% 100%;
  //background-repeat: no-repeat;
  //background-image: url('@/assets/img/bg.png');
  //background-size: 100% auto;
  .container {
    flex-direction: column;
    width: 80%;
    margin: 20px auto 0;
    //background-color: #2e3350;
    padding: 20px 20px;
    border-radius: 20px;
    //box-shadow: 0 0 10px #0000001f;
  }
}

:deep(.van-cell) {
  border-bottom: 1px solid #4d536a;
  background: #3b82f2;
  border-radius: 10px;

  &::after {
    border: none !important;
  }

  .van-field__body {
    input {
      text-align: center;
      color: #fff !important;

      &::placeholder {
        color: #fff !important;
      }
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
      color: #fff;
      margin-left: 16px;
      text-align: center;

      p:nth-child(1) {
        font-size: 26px;
        letter-spacing: 8px;
      }
    }
  }
}
</style>
