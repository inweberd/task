<template>
  <div class="forgetClass">
    <div
      id="sign"
      class="d-flex justify-content-around user-select-none"
      style="max-height: 550px; max-width: 800px; width: 95%; height: 80%"
    >
      <img
        src="@/assets/img/logo.png"
        style="position: absolute; width: 100px; top: 60px; left: 50%; transform: translateX(-50%)"
        alt=""
      />
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
          <van-cell-group>
            <van-field
              v-model="state.struct.social"
              label="手机号码"
              left-icon="user-o"
              placeholder="请输入手机号码"
            />
            <van-field
              v-model="state.struct.code"
              center
              left-icon="orders-o"
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button
                  @click="SendCode"
                  :disabled="state.status.code"
                  size="small"
                  type="primary"
                >
                  <span v-if="!state.status.code">发送验证码</span>
                  <span v-else>{{ state.code.second }}秒重新发送</span>
                </van-button>
              </template>
            </van-field>
            <van-field
              v-model="state.struct.password"
              clearable
              label="密码"
              left-icon="newspaper-o"
              placeholder="请输入密码"
              type="password"
            />
            <van-field
              v-model="state.struct.AgainPassword"
              clearable
              label="密码"
              left-icon="notes-o"
              placeholder="请再次输入密码"
              type="password"
            />
          </van-cell-group>

          <el-button
            v-on:click="SignUp()"
            :loading="state.status.wait"
            type="primary"
            size="large"
            style="border-radius: 20px; margin-top: 20px !important"
            color="#4B6FFF"
            class="w-100 mt-3"
            >重置</el-button
          >

          <div
            style="
              color: #323233;
              display: flex;
              justify-content: space-around;
              margin-top: 30px;
              width: 100%;
              font-size: 16px;
              text-decoration: underline;
            "
          >
            <router-link to="/common/sign-in" class="text-decoration-none">
              <span class="text-light">前往登录</span>
            </router-link>
            <router-link to="/common/sign-up" class="text-decoration-none">
              <span class="text-light">前往注册</span>
            </router-link>
          </div>
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
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUsers } from '@/store/users'
import { showToast } from 'vant'
import { DocumentCopy, User, Lock } from '@element-plus/icons-vue'

const user = useUsers()
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
:deep(.el-input) {
  overflow: hidden;
  border-radius: 50px;
  margin-bottom: 10px;
}
.forgetClass {
  position: absolute;
  width: 100%;
  height: 100vh;
  //background-color: #2e2e30;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  color: #fff;
  //background: url(@/assets/img/bj.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
