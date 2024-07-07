<template>
  <div class="login">
    <!-- <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" /> -->

    <van-nav-bar
      title="忘记密码"
      safe-area-inset-top
      fixed
      placeholder
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />
    <div class="content">
      <div class="desc">
        <van-image width="100" height="100" :src="imgg" />
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="data.social"
          label=""
          name="手机号"
          placeholder="(必填) 手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />

        <van-field
          v-model="data.code"
          center
          clearable
          label="短信验证码"
          name="验证码"
          placeholder="(必填) 验证码"
        >
          <template #button>
            <van-button
              v-if="!time"
              size="small"
              type="primary"
              @click="getCode"
              style="background: #f46d16; border: none"
              >发送验证码</van-button
            >
            <div v-else>
              {{ time }}
            </div>
          </template>
        </van-field>
        <van-field
          v-model="data.password"
          type="password"
          name="密码"
          label=""
          placeholder="(必填) 密码"
          :rules="[{ required: true, message: '(必填) 确认密码' }]"
        />
        <van-field
          v-model="data.password2"
          type="password"
          name="重复密码"
          label=""
          placeholder="(必填) 确认密码"
          :rules="[{ required: true, message: '(必填) 确认密码' }]"
        />
        <!--				<van-field v-model="data.invite" label="" name="邀请码" placeholder="(选填) 邀请码" />-->
        <van-divider />

        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            style="background: #f46d16; border: none"
          >
            重置
          </van-button>
        </div>
      </van-form>
      <van-divider>其他方式</van-divider>
      <view style="display: flex" class="btns">
        <van-button
          style="flex: 1; background: #f46d16; border: none"
          type="primary"
          @click="go('/login')"
          >登录</van-button
        >
        <van-button
          style="flex: 1; background: #f46d16; border: none"
          type="primary"
          @click="go('/signUp')"
          >忘记密码</van-button
        >
      </view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import imgg from './logo1.png'
import { register, reqResetPwd, sociallogin } from '@/api/myApi'
import { _no, _sleep, _notice } from '@/utils'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const time = ref()
const data = reactive({
  social: '',
  code: '',
  password: '',
  password2: ''
  // invite: '490814',
  // fingerprint: ''
})
const router = useRouter()
// const fprint = () => {
//   FingerprintJS.load().then((FP) => {
//     FP.get().then(({ visitorId }) => (data.fingerprint = visitorId))
//   })
//   console.log(data)
// }
// fprint()
function getCode() {
  if (data.social == '') {
    return _notice('请输入手机号码')
  }
  reqResetPwd(data).then((e) => {
    _notice(e.msg)
  })
}
function go(path) {
  router.push(path)
}
function onSubmit() {
  reqResetPwd(data).then((e) => {
    _notice(e.msg)
  })
}
</script>

<style lang="less" scoped>
@import '../../assets/less/index';

.fixed-back {
  position: fixed;
  left: 10rem;
  top: 20rem;
  z-index: 3;
}

.btns {
  padding-top: 30px;

  button {
    margin: 0 10px;
  }
}

.van-cell {
  border-radius: 10px;
  margin-bottom: 10rem;
}

.login {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;

  // background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;
  .van-divider {
    color: white;
  }

  .content {
    padding: 30rem 30rem;

    .desc {
      margin-top: 10rem;
      margin-bottom: 30rem;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .button {
      width: 100%;
      margin-bottom: 5rem;
    }
  }
}
</style>
