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
            登录您的账户
          </div>

          <el-form
            v-if="state.segmented.value === 'code'"
            label-position="top"
            label-width="auto"
            style="max-width: 800px"
          >
            <el-form-item>
              <template #label>
                <span class="text-white">账户</span>
              </template>
              <el-input
                v-model="state.struct.social"
                size="large"
                placeholder="手机号码或邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="text-white">验证码</span>
              </template>
              <div class="d-flex w-100">
                <el-input
                  v-model="state.struct.code"
                  v-on:keyup.enter="SignIn()"
                  size="large"
                  placeholder="请输入验证码"
                ></el-input>
                <el-button
                  v-on:click="SendCode()"
                  :disabled="state.status.code"
                  size="large"
                  class="ms-2"
                >
                  <span v-if="!state.status.code">发送验证码</span>
                  <span v-else>重新发送</span>
                </el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-form v-else label-position="top" label-width="auto" style="max-width: 800px">
            <el-form-item>
              <template #label>
                <span class="text-white">账号</span>
              </template>
              <el-input v-model="state.struct.account" size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="text-white">密码</span>
              </template>
              <el-input
                v-model="state.struct.password"
                v-on:keyup.enter="SignIn()"
                type="password"
                show-password
                size="large"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-button
            v-on:click="SignIn()"
            :loading="state.status.wait"
            type="primary"
            size="large"
            class="w-100 mt-3"
            >登录</el-button
          >

          <div class="d-flex justify-content-between mt-5" style="color: #fff">
            <router-link to="/common/sign-up" class="text-decoration-none">
              <span class="text-light">注册账户</span>
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
import cache from '@/utils/cache.ts'
import logo from '@/views/common/assets/logo.png'

import { storeToRefs } from 'pinia'
import { POST } from '@/utils/axios'
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUsers } from '@/store/users'
import { showToast } from 'vant'

const { info, token, status } = storeToRefs(useUsers())

const router = useRouter()
const state = reactive({
  struct: {
    code: '',
    social: '',
    account: '',
    password: ''
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

const SignIn = async () => {
  if (!state.struct.account) return showFailToast('请输入账号')
  if (!state.struct.password) return showFailToast('请输入密码')

  state.status.wait = true

  const params = {
    account: state.struct.account,
    password: state.struct.password
  }

  const { code, data, msg } = await POST(`/api/comm/login`, params)
  console.log('msg', msg)
  state.status.wait = false

  if (code !== 200) return showFailToast(msg)

  // 更新仓库状态
  info.value = data.user
  token.value = data.token
  status.value.login = true
  cache.set('token', data.token)
  cache.set('users[info]', data.user)

  // 清空输入框
  state.code.second = 0
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

// 发送验证码
const SendCode = async () => {
  if (!state.struct.social) return showFailToast('请输入手机号码')

  const { code } = await POST(
    '/api/comm/social-login',
    { social: state.struct.social },
    { AutoToken: false }
  )

  if (code !== 201) return

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
