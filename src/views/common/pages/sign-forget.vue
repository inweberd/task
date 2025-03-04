<template>
  <div class="forgetClass">
    <div class="logo-box">
      <div class="logo-box-content">
        <img src="@/assets/img/logo.png" alt="" />
        <div class="info">
          <p>大拇指视频</p>
          <p>the big thumb video</p>
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
            <van-field
              v-model="state.struct.social"
              placeholder="请输入手机号码"
              left-icon="user-o"
            />

            <van-field
              v-model="state.struct.code"
              center
              clearable
              placeholder="请输入短信验证码"
              style="margin-top: 10px"
              left-icon="label-o"
            >
              <template #button>
                <div @click="SendCode" style="color: #999">
                  <span v-if="!state.status.code">发送验证码</span>
                  <span v-else>{{ state.code.second }}秒重新发送</span>
                </div>
              </template>
            </van-field>
            <van-field
              style="margin-top: 10px"
              v-model="state.struct.password"
              clearable
              placeholder="请输入密码"
              left-icon="shield-o"
              type="password"
            />

            <van-field
              style="margin-top: 10px"
              v-model="state.struct.AgainPassword"
              clearable
              placeholder="请再次输入密码"
              left-icon="shield-o"
              type="password"
            />
          </van-cell-group>
          <div style="text-align: right; width: 100%; margin: 10px 10px 20px 0">
            <span @click="$router.push('/common/sign-in')"> 去登录 </span>
          </div>
          <el-button
            @click="SignUp"
            :loading="state.status.wait"
            type="primary"
            size="large"
            style="
              border-radius: 15px;
              color: #fff;
              background-image: linear-gradient(to bottom, #723efe, #ac24f5);
            "
            color="#01c5f0"
            class="w-100"
            >重置</el-button
          >
          <span></span>
          <!--          <el-button-->
          <!--            class="w-100"-->
          <!--            color="#00f7c4"-->
          <!--            size="large"-->
          <!--            style="-->
          <!--              border-radius: 15px;-->
          <!--              margin-top: 20px !important;-->
          <!--              color: #666;-->
          <!--              background-color: #fff;-->
          <!--              border: 1px solid #ccc !important;-->
          <!--            "-->
          <!--            type="primary"-->
          <!--            @click="$router.push('/common/sign-in')"-->
          <!--          >-->
          <!--            登录-->
          <!--          </el-button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { POST } from '@/utils/axios'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import ToggleLoginAndRegister from '@/views/common/components/ToggleLoginAndRegister.vue'

const router = useRouter()
const state = reactive({
  struct: {
    code: '',
    social: '',
    account: '',
    invite: '',
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

  const { code, data } = await POST(
    '/api/comm/reset-password',
    {
      ...state.struct,
      account: state.struct.social
    },
    { AutoToken: false }
  )

  state.status.wait = false

  if (code !== 200) return

  // 清空输入框
  state.code.second = 0
  for (let i in state.struct) state.struct[i] = ''

  // 跳转到首页
  await router.push({ path: '/' })
}

// 发送验证码
const SendCode = async () => {
  if (!state.struct.social) return showFailToast('请输入手机号码')

  const { code, msg } = await POST(
    '/api/comm/reset-password',
    {
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

.text-white {
  color: #666 !important;
}

.forgetClass {
  width: 100%;
  height: 100vh;
  color: #666;
  background-repeat: no-repeat;
  background-image: url('@/assets/img/bg.png');
  background-size: 100% auto;

  .container {
    width: 95%;
    margin: 110px auto 0;
    background-color: #fff;
    padding: 20px 40px;
    border-radius: 20px;
    //box-shadow: 0 0 10px #0000001f;
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
