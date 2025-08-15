<template>
  <div class="forget">
    <header class="mui-bar mui-bar-transparent">
      <a
        class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
        @click="$router.push('/login')"
      ></a>
      <h1 class="mui-title"></h1>
    </header>
    <div class="content">
      <div class="header">
        <!--img src="/upload/default_mobile/images/logo.png"-->
        <!--        <i class="fa fa-user-o"></i>-->
      </div>

      <div class="list">
        <div class="list-call" id="method1">
          <div class="ico">
            <i class="now-ui-icons fa fa-user-o"></i>
          </div>
          <input
            type="tel"
            name="account"
            class="biaoti"
            id="reg_phone"
            @blur="validate_phone"
            v-model="state.struct.social"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="11"
            autocomplete="off"
            placeholder="请输入手机号码"
          />
        </div>
        <div class="list-call" style="position: relative">
          <div class="ico">
            <i class="now-ui-icons fa fa-lock"></i>
          </div>
          <input
            type="text"
            v-model="state.struct.code"
            placeholder="请输入验证码"
            class="biaoti"
            @blur="validate_password()"
          />
          <button
            style="position: absolute; top: 15px; right: 0"
            type="button"
            class="mui-btn mui-btn-primary"
            @click="SendCode"
          >
            <span v-if="!state.status.code">发送验证码</span>
            <span v-else>{{ state.code.second }}秒重新发送</span>
          </button>
        </div>

        <div class="list-call">
          <div class="ico">
            <i class="now-ui-icons fa fa-lock"></i>
          </div>
          <input
            type="password"
            name="password"
            id="reg_password"
            v-model="state.struct.password"
            placeholder="请输入密码"
            class="biaoti"
            @blur="validate_password()"
          />
        </div>

        <div class="list-call">
          <div class="ico">
            <i class="now-ui-icons fa fa-lock"></i>
          </div>
          <input
            type="password"
            name="password2"
            id="reg_password2"
            v-model="state.struct.AgainPassword"
            placeholder="请重复输入密码"
            class="biaoti"
            @blur="validate_password2()"
          />
        </div>
        <div class="list-call" style="display: none">
          <div class="ico">
            <i class="now-ui-icons fa fa-lock"></i>
          </div>
          <input type="text" name="sbm" id="sbm" class="biaoti" />
        </div>
      </div>

      <div style="text-align: center">
        <button
          type="submit"
          class="dlbutton"
          id="submit"
          @click="SignUp"
          :disabled="state.status.wait"
        >
          重 置
        </button>
      </div>

      <!--div class="xieyi">
        <img @tap="xieyitong" :src="xieyi==true?'/upload/default_mobile/images/ty1.png':'/upload/default_mobile/images/ty0.png'">
        <span @tap="xieyitong"> 同意</span>
        <navigator url="blog?id=1" open-type="navigate">《软件用户协议》</navigator>
      </div-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { POST } from '@/utils/axios'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { showFailToast, showToast } from 'vant'
import ToggleLoginAndRegister from '@/views/common/components/ToggleLoginAndRegister.vue'
import $ from 'jquery'

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
function validate_phone() {
  if (/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test($('#reg_phone').val())) {
  } else {
    mui.toast('手机号码格式不正确!')
    return
  }
}
function validate_password() {
  if ($('#reg_password').val() == '') {
    $('#reg_password_box').removeClass('has-success')
    $('#reg_password_box').addClass('has-error')
    mui.toast('请输入密码!')
    return
  } else if ($('#reg_password').val().length < 6) {
    $('#reg_password_box').removeClass('has-success')
    $('#reg_password_box').addClass('has-error')
    mui.toast('密码不能少于6位!')
    return
  } else {
    $('#reg_password_box').removeClass('has-error')
    $('#reg_password_box').addClass('has-success')
    validate_password2()
  }
}
function validate_password2() {
  if (
    $('#reg_password').val() == '' ||
    $('#reg_password2').val() == '' ||
    $('#reg_password').val().length < 6 ||
    $('#reg_password2').val().length < 6
  ) {
    $('#reg_password_box').removeClass('has-success')
    $('#reg_password_box').addClass('has-error')
    $('#reg_password2_box').removeClass('has-success')
    $('#reg_password2_box').addClass('has-error')
    mui.toast('再次请输入密码!')
    return
  }
  if ($('#reg_password').val() == $('#reg_password2').val()) {
    $('#reg_password_box').removeClass('has-error')
    $('#reg_password_box').addClass('has-success')
    $('#reg_password2_box').removeClass('has-error')
    $('#reg_password2_box').addClass('has-success')
    //console.log('可以')
  } else {
    $('#reg_password_box').removeClass('has-success')
    $('#reg_password_box').addClass('has-error')
    $('#reg_password2_box').removeClass('has-success')
    $('#reg_password2_box').addClass('has-error')
    mui.toast('两次密码输入不一致!')
    return
  }
}
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
  html,
  body {
    background-color: #fff;
  }
  .mui-bar {
    box-shadow: none;
    height: 76px;
    padding-top: 32px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .header {
    width: 101px;
    height: 101px;
    background:
      url('@/assets/img/logo.png') no-repeat center / 100% 100%,
      linear-gradient(
        -30deg,
        rgba(63, 205, 235, 1),
        rgba(188, 226, 158, 1)
      ); /*rgba(63,205,235,1);*/
    box-shadow: 0px 12px 13px 0px rgba(63, 205, 235, 0.47);
    border-radius: 50%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    line-height: 101px;
    color: #fff;
    font-size: 50px;
  }

  .header img {
    width: 101px;
    height: 101px;
    border-radius: 50%;
  }

  .list {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .list-call {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    color: #333333;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .list-call .img {
    width: 24px;
    height: 24px;
  }
  .list-call .ico {
    width: 24px;
    height: 24px;
    color: #ffbe42;
    text-align: center;
    line-height: 24px;
  }
  .list-call .biaoti {
    text-align: left;
    margin: 0 0 0 0;
    border: 0;
    color: #666;
  }

  .dlbutton {
    color: #ffffff;
    font-size: 26px;
    width: 260px;
    height: 60px;
    background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
    box-shadow: 0px 0px 13px 0px rgba(164, 217, 228, 0.2);
    border-radius: 50px;
    line-height: 60px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    padding: 0;
  }
  .dlbutton:hover {
    background: linear-gradient(-90deg, rgba(63, 205, 235, 0.9), rgba(188, 226, 158, 0.9));
  }
  .dlbutton button {
    background: none;
    border: 0;
    height: 60px;
    width: 100%;
  }
  .xieyi {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin-top: 40px;
    color: #ffa800;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .xieyi a {
    font-size: 18px;
    margin-left: 15px;
    margin-right: 15px;
    color: #ffa800;
  }
}
</style>
