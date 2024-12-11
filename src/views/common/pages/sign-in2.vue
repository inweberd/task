<template>
  <div
    style="
      width: 100%;
      height: 100vh;
      background-color: #0e0f13;
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
            <el-form-item>
              <template #label>
                <span class="text-white">验证码</span>
              </template>
              <div class="d-flex w-100">
                <el-input v-model="state.struct.code" size="large"></el-input>
                <canvas ref="verifyRef" @click="draw" :width="150" height="50"></canvas>
                <!--<el-button @click="getCode" size="large" class="ms-2" color="#409EFF">-->
                <!--  <span style="color: #fff">{{ viewCode }}</span>-->
                <!--</el-button>-->
              </div>
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
    <div class="contact" @click="$router.push('/article?id=5')">
      <img src="@/assets/img/jieshao.png" />
      <div>
        <div>玩法</div>
        <div>介绍</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cache from '@/utils/cache.ts'
import logo from '@/views/common/assets/logo.png'

import { storeToRefs } from 'pinia'
import { POST } from '@/utils/axios'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUsers } from '@/store/users'
import { showToast } from 'vant'

const { info, token, status } = storeToRefs(useUsers())

const router = useRouter()
const viewCode = ref('')
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

const verifyRef = ref(null)
const codeState = reactive({
  pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
  // 声明两个变量存验证码的宽高
  width: 150,
  height: 50,
  // 验证码最终存储的位置
  imgCode: ''
})
const getCode = () => {
  viewCode.value = ''
  let codeString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let codeArray = codeString.split('')
  let num = codeArray.length
  let newCodeArray = []
  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * num)
    newCodeArray.push(codeArray[index])
  }
  viewCode.value = newCodeArray.join('')
}

const randomNum = (min, max) => {
  // parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数
  return parseInt(Math.random() * (max - min) + min, 10)
}
// 随机生成颜色
const randomColor = (min, max) => {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}
// 实现验证码的绘制
const draw = () => {
  codeState.imgCode = ''
  // getCode()
  // ① 获取canvas属性
  const ctx = verifyRef.value.getContext('2d')
  // ② 填充背景颜色
  ctx.fillStyle = randomColor(20, 256)
  ctx.fillRect(0, 0, 150, 50) // ctx.fillRect(矩形起始点的x坐标，矩形起始点的y坐标,矩形的宽度，矩形的高度) fillRect()方法绘制一个填充了内容的矩形
  // fillText()  指定的坐标上绘制文本字符串，并使用当前的 fillStyle 对其进行填充
  // ③ 生成随机数，随机数旋转
  for (let i = 0; i < 5; i++) {
    const text = codeState.pool[randomNum(0, codeState.pool.length)]
    codeState.imgCode += text
    console.log('state.imgCode', codeState.imgCode)
    const fontSize = randomNum(16, 30)
    ctx.font = fontSize + 'px Simhei'
    ctx.fillStyle = randomColor(0, 150) // 设置文字颜色
    ctx.textBaseline = 'top' // 述绘制文本时，当前文本基线的属性
    const deg = randomNum(-15, 15) // 旋转的角度
    ctx.save() // 保存当前的绘图状态
    ctx.translate(30 * i + 15, randomNum(10, 25)) // ctx.translate(x, y); x 点的水平方向、原始的 y 点垂直方向进行平移变换
    ctx.rotate((deg * Math.PI) / 180) // Math.PI   3.14  【随机生成旋转角度】
    ctx.fillText(text, 0, 0)
    ctx.restore() // ctx.restore() 方法后，会将绘图上下文恢复到最近一次保存的状态，也就是撤销之前的所有变换和样式设置，使得后续的绘制不受影响
    // 使用 save() 方法保存默认的状态，使用 restore() 进行恢复
  }
  // ④ 生成40个点和4条线形成干扰防止OCR
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.strokeStyle = randomColor(30, 256)
    ctx.moveTo(randomNum(0, codeState.width), randomNum(0, codeState.height))
    ctx.lineTo(randomNum(0, codeState.width), randomNum(0, codeState.height))
    ctx.fillStyle = randomColor(0, 150)
    ctx.stroke() // 绘制线段
  }
  for (let x = 0; x < 40; x++) {
    ctx.beginPath()
    // ctx.arc( ①圆弧中心（圆心）的 x 轴坐标 ②圆弧中心（圆心）的 y 轴坐标 ③圆弧的半径 圆弧的起始点 ④x 轴方向开始计算，单位以弧度表示  ⑤圆弧的终点，单位以弧度表示)
    ctx.arc(randomNum(0, codeState.width), randomNum(0, codeState.height), 1, 0, 2 * Math.PI)
    ctx.closePath()
    // 笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作
    ctx.stroke()
    ctx.fillStyle = randomColor(150, 200)
    ctx.fill()
  }
  return codeState.imgCode
}
const SignIn = async () => {
  if (!state.struct.account) return showFailToast('请输入账号')
  if (!state.struct.password) return showFailToast('请输入密码')
  if (!state.struct.code) return showFailToast('请输入验证码')
  if (state.struct.code.toLowerCase() !== codeState.imgCode.toLowerCase()) {
    return showFailToast('验证码错误！')
  }
  state.status.wait = true

  const params = {
    account: state.struct.account,
    password: state.struct.password,
    code: codeState.imgCode
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
  getCode()
  draw()
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
.contact {
  position: fixed;
  top: 70%;
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
</style>
