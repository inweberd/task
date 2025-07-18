<template>
  <div class="forget">
    <div class="top-navbar">
      <div class="left" @click="router.back()">
        <img
          style="width: 25px; height: 20px"
          src="https://lx.aosenn.com/h5/static/register/arrow.png"
          draggable="false"
        />
      </div>
      <div class="right">找回密码</div>
    </div>
    <div class="container d-flex justify-content-around user-select-none">
      <div class="right card backdrop-filter" style="width: 100%">
        <van-cell-group style="width: 100%">
          <van-field
            style="margin-top: 20px"
            v-model="state.struct.social"
            placeholder="请输入手机号"
            clearable
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
            v-model="state.struct.code"
            center
            clearable
            placeholder="请输入验证码"
          >
            <template #left-icon>
              <img
                src="https://lx.aosenn.com/h5/static/login/icon_yzm@2x.png"
                style="width: 15px; height: 16px"
              />
            </template>
            <template #button>
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
                @click="SendCode"
              >
                <span v-if="!state.status.code">发送验证码</span>
                <span v-else>{{ state.code.second }}秒重新发送</span>
              </div>
            </template>
          </van-field>

          <van-field
            style="margin-top: 20px"
            v-model="state.struct.password"
            clearable
            placeholder="请输入密码"
            type="password"
          >
            <template #left-icon>
              <img
                src="https://lx.aosenn.com/h5/static/login/icon_mm.png"
                style="width: 15px; height: 16px"
              />
            </template>
          </van-field>

          <van-field
            style="margin-top: 20px"
            v-model="state.struct.AgainPassword"
            clearable
            placeholder="请确认密码"
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
        <!--        <div style="text-align: right; width: 100%; margin: 10px 10px 20px 0; color: #fff">-->
        <!--          <span @click="$router.push('/common/sign-in')"> 去登录 </span>-->
        <!--        </div>-->
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
          @click="SignUp"
          >重置
        </el-button>
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
</template>

<script lang="ts" setup>
import { POST } from '@/utils/axios'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { showFailToast, showToast } from 'vant'
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
  if (state.struct.password.length < 6) return showFailToast('密码长度不得小于6位')

  const { code, msg } = await POST(
    '/api/comm/reset-password',
    {
      ...state.struct,
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

<style lang="scss" scoped>
.forget {
  color: #303133;
  .top-navbar {
    display: flex;
    padding: 15px;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    margin-top: 0;
    .left {
    }
    .right {
      font-size: 18px;
    }
  }
  .container {
    margin: 0 auto;
    padding: 20px 20px;

    :deep(.van-cell) {
      border-bottom: 0.5px solid #f2f2f2;
      &:after {
        border: none !important;
      }
      .van-field__control {
        text-indent: 20px;
      }
    }
    :deep(.van-hairline--top-bottom) {
      &:after {
        border-width: 0 !important;
      }
    }
  }
}
</style>
