<template>
  <div class="register">
    <div class="top-navbar">
      <div class="left" @click="$router.push('/login')">
        <img
          style="width: 25px; height: 20px"
          src="https://lx.aosenn.com/h5/static/register/arrow.png"
          draggable="false"
        />
      </div>
      <div class="right">注册</div>
    </div>

    <div class="container">
      <div class="right card backdrop-filter" style="width: 100%">
        <van-cell-group style="width: 100%">
          <van-field clearable v-model="state.struct.social" placeholder="请输入手机号">
            <template #left-icon>
              <img
                src="https://lx.aosenn.com/h5/static/login/icon_name.png"
                style="width: 15px; height: 16px"
              />
            </template>
          </van-field>
          <van-field
            style="margin-top: 20px"
            clearable
            v-model.trim="state.struct.code"
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
            clearable
            style="margin-top: 20px"
            v-model="state.struct.password"
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
            clearable
            v-model="state.struct.AgainPassword"
            placeholder="请确认密码"
            type="password"
            style="margin-top: 20px"
          >
            <template #left-icon>
              <img
                src="https://lx.aosenn.com/h5/static/login/icon_mm.png"
                style="width: 15px; height: 16px"
              />
            </template>
          </van-field>

          <van-field
            clearable
            style="margin-top: 20px"
            v-model="state.struct.inviteCode"
            :disabled="route.query.invite"
            placeholder="邀请码"
          >
            <template #left-icon>
              <img
                src="https://lx.aosenn.com/h5/static/login/icon_name.png"
                style="width: 15px; height: 16px"
              />
            </template>
          </van-field>
        </van-cell-group>
        <div class="pass_con" style="margin-top: 20px">
          <div style="font-size: 14px; display: flex; justify-content: space-between">
            <!--            <span @click="$router.push('/common/sign-up')">注册账号</span>-->
            <span @click="goDownload">下载APP</span>
            <span @click="goQQ">官方客服</span>
          </div>
        </div>
        <!--          <div style="text-align: right; width: 100%; margin: 10px 10px 20px 0">-->
        <!--            <span @click="$router.push('/common/sign-forget')"> 找回密码 </span>-->
        <!--          </div>-->
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
          >注册
        </el-button>
      </div>
      <div style="width: 80%; margin: 30px auto 0" v-if="false">
        <!--      <van-divider-->
        <!--        :style="{ color: '#666', borderColor: '#666', padding: '0 16px' }"-->
        <!--        style="width: 100%; margin-top: 20px"-->
        <!--      >-->
        <!--        其他-->
        <!--      </van-divider>-->
        <div style="display: flex; justify-content: space-evenly; align-items: center; width: 100%">
          <a
            style="font-size: 16px; color: #000; padding: 4px 12px; border-radius: 8px"
            @click="goDownload"
            >下载app</a
          >
          <a
            style="font-size: 16px; color: #000; padding: 4px 12px; border-radius: 8px"
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
import { throttle } from 'lodash'

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
    inviteCode: route.query.invite || '',
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
const goQQ = () => {
  window.location.href = 'https://qm.qq.com/q/x00vQBFn4A'
}
const SignUp = async () => {
  if (!state.struct.social) return showFailToast('请输入手机号码')
  if (!state.struct.password) return showFailToast('请输入密码')
  if (!state.struct.AgainPassword) return showFailToast('请再次输入密码')
  if (state.struct.password !== state.struct.AgainPassword) return showFailToast('两次密码不一致')
  if (state.struct.password.length < 6) return showFailToast('密码长度不得小于6位')
  if (!state.struct.code) return showFailToast('请输入验证码')
  state.struct.code = state.struct.code.trim()
  state.status.wait = true

  const { code, data, msg } = await POST(
    '/api/comm/sign-up',
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
  // window.location.href = `https://qyh.88tong.cn/download`
  // 跳转到首页
  router.push({ path: '/' })
}

// 发送验证码
const SendCode = throttle(async () => {
  if (state.code.second) return
  if (!state.struct.social) return showFailToast('请输入手机号码')
  if (!state.struct.password) return showFailToast('请输入密码')

  if (state.struct.password.length < 6) return showFailToast('密码长度不得小于6位')

  const { code, msg } = await POST(
    '/api/comm/sign-up',
    {
      ...state.struct,
      inviteCode: state.struct.inviteCode,
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
}, 2000)

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
</script>

<style lang="scss" scoped>
.register {
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
