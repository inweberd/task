<template>
  <div class="signinClass">
    <div
      id="sign"
      class="d-flex justify-content-around user-select-none"
      style="max-height: 550px; max-width: 800px; width: 95%; height: 80%"
    >
      <img
        src="@/assets/img/logo.png"
        style="position: absolute; width: 100px; top: 100px; left: 50%; transform: translateX(-50%)"
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
          <el-form label-position="top" label-width="auto" style="width: 100%">
            <el-form-item>
              <el-input v-model="state.struct.account" size="large" placeholder="请输入手机号码">
                <template #prepend>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="state.struct.password"
                v-on:keyup.enter="SignIn()"
                type="password"
                show-password
                size="large"
                placeholder="请输入密码"
              >
                <template #prepend>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <!--            <el-form-item>-->
            <!--              <div class="d-flex w-100">-->
            <!--                <el-input v-model="state.struct.code" placeholder="请输入验证码">-->
            <!--                  <template #prepend>-->
            <!--                    <el-icon><DocumentCopy /></el-icon>-->
            <!--                  </template>-->
            <!--                  <template #append>-->
            <!--                    <canvas ref="verifyRef" @click="draw" :width="120" height="40"></canvas>-->
            <!--                  </template>-->
            <!--                </el-input>-->
            <!--                &lt;!&ndash;<el-button @click="getCode" size="large" class="ms-2" color="#409EFF">&ndash;&gt;-->
            <!--                &lt;!&ndash;  <span style="color: #fff">{{ viewCode }}</span>&ndash;&gt;-->
            <!--                &lt;!&ndash;</el-button>&ndash;&gt;-->
            <!--              </div>-->
            <!--            </el-form-item>-->
          </el-form>

          <el-button
            v-on:click="SignIn()"
            :loading="state.status.wait"
            type="primary"
            style="border-radius: 20px; color: #fff"
            color="#B5A483"
            size="large"
            class="w-100 mt-3"
            >登录</el-button
          >

          <div
            style="
              color: #b5a483;
              display: flex;
              justify-content: space-around;
              margin-top: 30px;
              width: 100%;
            "
          >
            <router-link to="/common/sign-up" class="text-decoration-none">
              <span>注册账户</span>
            </router-link>
            <router-link to="/common/sign-forget" class="text-decoration-none">
              <span>忘记密码</span>
            </router-link>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              width: 100%;
              margin-top: 20px;
            "
          >
            <a
              style="margin-top: 10px; text-decoration: underline; font-size: 18px"
              @click="goDownload"
              >下载app</a
            >
            <a
              style="margin-top: 10px; text-decoration: underline; font-size: 18px; color: #1e83d3"
              @click="jumpToQQ2"
              >官方交流群（微脉圈）
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="contact" @click="$router.push('/article?id=5')">-->
    <!--      <img src="@/assets/img/jieshao.png" />-->
    <!--      <div>-->
    <!--        <div>玩法</div>-->
    <!--        <div>介绍</div>-->
    <!--      </div>-->
    <!--    </div>-->
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
import { User, Lock, DocumentCopy } from '@element-plus/icons-vue'
import { AES, token as aesToken } from '@/utils/AES'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { _notice } from '@/utils'
import weimaiquan from '@/assets/img/weimaiquan.jpg'

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
  width: 120,
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
function goDownload() {
  try {
    // state.loading.app = true

    // const { VITE_APP_URL } = import.meta.env
    // 跳转下载
    window.location.href = `https://ff.yuyuwa.cn/download`
  } catch (e) {
    _notice('下载失败')
    // state.loading.app = false
    // proxy.$refs['notify'].error('下载失败，请稍后再试！')
  }
}
const randomNum = (min, max) => {
  // parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数
  return parseInt(Math.random() * (max - min) + min, 10)
}
function jumpToQQ2() {
  showImagePreview({
    images: [weimaiquan]
  })
  // window.location.href = decodeURIComponent('https://qm.qq.com/q/YAXWXyOXGU')
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
  ctx.fillRect(0, 0, 120, 50) // ctx.fillRect(矩形起始点的x坐标，矩形起始点的y坐标,矩形的宽度，矩形的高度) fillRect()方法绘制一个填充了内容的矩形
  // fillText()  指定的坐标上绘制文本字符串，并使用当前的 fillStyle 对其进行填充
  // ③ 生成随机数，随机数旋转
  for (let i = 0; i < 4; i++) {
    const text = codeState.pool[randomNum(0, codeState.pool.length)]
    codeState.imgCode += text
    console.log('state.imgCode', codeState.imgCode)
    const fontSize = randomNum(16, 30)
    ctx.font = fontSize + 'px Simhei'
    ctx.fillStyle = randomColor(0, 120) // 设置文字颜色
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
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.strokeStyle = randomColor(30, 256)
    ctx.moveTo(randomNum(0, codeState.width), randomNum(0, codeState.height))
    ctx.lineTo(randomNum(0, codeState.width), randomNum(0, codeState.height))
    ctx.fillStyle = randomColor(0, 120)
    ctx.stroke() // 绘制线段
  }
  for (let x = 0; x < 40; x++) {
    ctx.beginPath()
    // ctx.arc( ①圆弧中心（圆心）的 x 轴坐标 ②圆弧中心（圆心）的 y 轴坐标 ③圆弧的半径 圆弧的起始点 ④x 轴方向开始计算，单位以弧度表示  ⑤圆弧的终点，单位以弧度表示)
    ctx.arc(randomNum(0, codeState.width), randomNum(0, codeState.height), 1, 0, 2 * Math.PI)
    ctx.closePath()
    // 笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作
    ctx.stroke()
    ctx.fillStyle = randomColor(120, 200)
    ctx.fill()
  }
  return codeState.imgCode
}
const SignIn = async () => {
  if (!state.struct.account) return showFailToast('请输入账号')
  if (!state.struct.password) return showFailToast('请输入密码')
  // if (!state.struct.code) return showFailToast('请输入验证码')
  // if (state.struct.code.toLowerCase() !== codeState.imgCode.toLowerCase()) {
  //   return showFailToast('验证码错误！')
  // }
  state.status.wait = true

  const params = {
    account: state.struct.account,
    password: state.struct.password,
    code: codeState.imgCode
  }
  let unix

  const { code: timeCode, data: timeData } = await axios.get('https://tc.q18m.cc/dev/info/time')
  if (timeCode !== 200) {
    unix = Math.round(new Date().getTime() / 1000)
  } else {
    unix = timeData.unix
  }

  const iv = aesToken('inis-iv', 16, 'aes')
  const key = aesToken('inis-key', 16, 'aes')
  const item = new AES(key, iv)
  const MD5Hash = CryptoJS?.MD5(
    'trans_id=e6f501c7-309a-41ec-95cb-22e76f3b7f5c&key=123456'
  ).toString()

  let result = MD5Hash.substring(0, 32)
  console.log('result', result)
  return
  const { code, data, msg } = await POST(
    `/api/comm/login`,
    {
      account: state.struct.account,
      password: CryptoJS.AES.encrypt(
        state.struct.password,
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxppwc6CNrcLJRLFIWtuABYIf1U/5Hpwzaj4f17sZwaUf4LlHQXto50RB6c4wRDU9MFcI3gwmu6OQrMu211XVoE/P6u4R1/hYdcNaPAM9UGEJg+bVOFxBp4BXFtq+3kAkMYnOCpYygK0J5pJe4KEhfB4VucidKmtYlgCGdfhcRUp9CiuUF1zwx6+UN1JzYY3piVG4uIV//KydKtFcF4ZtDt2OmBnGy96T/GA3A1+Kx2Zjl3u+PDNjzSHwYiJ46h8rcqV+86LL2y/G2kKeXMBeQPHPiwNP8p6SjZEEmBKCc4w3wBZiXKsTBk8dVfO77A5tLf6x3tm9eFqQLUJs4fxcowIDAQAB'
      ).toString()
    },
    {
      headers: {
        'X-Khronos': unix,
        'X-Gorgon': `${key} ${iv}`,
        // 注意：每个签名有效时间只有60s
        'X-Argus': item.encrypt(
          JSON.stringify({
            unix,
            account: state.struct.account,
            password: state.struct.password
          })
        )
      }
    }
  )
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
  // draw()
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

:deep(.el-input-group__append) {
  padding: 0;
}
:deep(.el-input-group__prepend) {
  background-color: #fff;
  box-shadow: none;
}
:deep(.el-input) {
  overflow: hidden;
  border-radius: 50px;
  margin-bottom: 10px;
}
.signinClass {
  width: 100%;
  height: 100vh;
  background-color: #2e2e30;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  color: #fff;
  padding: 0 20px;
  background: url(@/assets/img/bj.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
