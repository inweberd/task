<template>
  <div
    style="
      width: 100%;
      height: 100vh;
      background-color: rgb(21, 23, 36);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: scroll;

      color: #fff;
    "
  >
    <div
      id="sign"
      class="d-flex justify-content-around user-select-none"
      style="max-height: 550px; max-width: 800px; width: 95%; height: 80%"
    >
      <div
        class="right card backdrop-filter"
        style="width: 55%; box-shadow: unset; background: transparent"
      >
        <div class="card-body p-lg-4">
          <div class="d-flex align-items-center justify-content-center py-5">
            <el-image :src="logo" style="width: 80px; height: 80px"></el-image>
          </div>

          <div class="flex-center divider-light my-3 font-12 text-white user-select-none">
            注册您的账户
          </div>

          <el-form label-position="top" label-width="auto" style="max-width: 800px">
            <el-form-item>
              <template #label>
                <span class="text-white">手机</span>
              </template>
              <el-input v-model="state.struct.social" size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="text-white">验证码</span>
              </template>
              <div class="d-flex w-100">
                <el-input
                  v-model="state.struct.code"
                  v-on:keyup.enter="SignUp()"
                  size="large"
                ></el-input>
                <el-button
                  v-on:click="SendCode()"
                  :disabled="state.status.code"
                  size="large"
                  class="ms-5"
                >
                  <span v-if="!state.status.code">发送验证码</span>
                  <span v-else>重新发送</span>
                </el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="text-white">密码</span>
              </template>
              <el-input v-model="state.struct.password" size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="text-white">确认密码</span>
              </template>
              <el-input v-model="state.struct.AgainPassword" size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="text-white">邀请码</span>
              </template>
              <el-input
                v-model="state.struct.invite"
                size="large"
                :disabled="$route.query.invite"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-button
            v-on:click="SignUp()"
            :loading="state.status.wait"
            type="primary"
            size="large"
            class="w-100 mt-3"
            >注册</el-button
          >

          <div class="d-flex justify-content-between mt-5" style="color: #fff">
            <router-link to="/common/sign-in" class="text-decoration-none">
              <span class="text-light">前往登录</span>
            </router-link>
            <router-link to="/common/sign-forget" class="text-decoration-none">
              <span class="text-light">忘记密码</span>
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
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUsers } from '@/store/users'
import { showFailToast, showToast } from 'vant'

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
  window.location.href = `https://lzff.ddxsc.cn/download`
  // 跳转到首页
  // await router.push({ path: '/' })
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
  console.log(111)
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
</style>
