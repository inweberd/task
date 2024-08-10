<template>
  <div class="login">
    <Loading v-if="data.loading.getPhone" />
    <div v-else class="content">
      <div class="desc">
        <van-image width="100" height="100" :src="imgg" />
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          label=""
          name="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-divider />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label=""
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            style="background: #f56d17; border: none"
          >
            登录
          </van-button>
        </div>
      </van-form>
      <van-divider>其他方式</van-divider>
      <view style="display: flex;justify-content：space-between" class="btns">
        <van-image
          width="100"
          height="70"
          :src="zhuce"
          @click="go('/signUp')"
          style="display: inline-block"
        />
        <!--				<van-button style='flex: 1;' type="primary" @click="go('/signUp')">注册</van-button>-->
        <van-image
          width="100"
          height="70"
          :src="mima"
          @click="go('/forget')"
          style="display: inline-block"
        />
        <!--				<van-button style='flex: 1;' plain type="success" @click="go('/forget')">忘记密码</van-button>-->
        <!--				<van-button style='flex: 1;' type="primary" @click="qqq">下载app</van-button>-->
        <van-image
          width="100"
          height="70"
          :src="kefu"
          @click="jumpToQQ"
          style="display: inline-block"
        />
        <!--				<van-image width="100" height="70" :src="kefu"  @click="service = true" style="display:inline-block"/>-->
        <!--				<van-button style='flex: 1;' plain type="success" @click="service = true">客服中心</van-button>-->
      </view>
    </div>
    <modzz v-model="service"></modzz>
  </div>
</template>
<script setup lang="ts">
import modzz from './model'
import Check from '../../components/Check.vue'
import Tooltip from './components/Tooltip.vue'
import Loading from '../../components/Loading.vue'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import imgg from './logo1.png'
import zhuce from './zhuce.png'
import kefu from './kefu.png'
import mima from './mima.png'
import login1 from './login.png'
import { _no, _sleep, _notice } from '@/utils'
import { login } from '@/api/myApi'
defineOptions({
  name: 'login'
})

const service = ref(false)
const nav = useNav()
const data = reactive({
  isAgree: false,
  isOtherLogin: false,
  showAnim: false,
  showTooltip: false,
  loading: {
    login: false,
    getPhone: false
  }
})
function qqq() {
  try {
    // state.loading.app = true

    // const { VITE_APP_URL } = import.meta.env
    // 跳转下载
    window.location.href = `https://dlm.nsmicrowave.com/download`

    state.loading.app = false
  } catch (e) {
    _notice('下载失败')
    // state.loading.app = false
    // proxy.$refs['notify'].error('下载失败，请稍后再试！')
  }
}

function go(path) {
  router.push(path)
}
function jumpToQQ() {
  window.location.href = decodeURIComponent('https://qm.qq.com/q/rfYONthKYq')
}
async function getPhone() {
  // data.loading.getPhone = true
  // await _sleep(1000)
  // data.loading.getPhone = false
}

const router = useRouter()
const username = ref('')
const password = ref('')
const onSubmit = async (values) => {
  data.loading.getPhone = true
  login({
    account: username.value,
    password: password.value
  })
    .then((result) => {
      console.log(result)
      if (result.code !== 200) {
        return _notice(result.msg)
      }
      window.localStorage.setItem('token', result.data.token)
      window.localStorage.setItem('userInfo', JSON.stringify(result.data.user))

      router.push('/home')
    })
    .catch((err) => {
      // _notice.no(err);
    })
    .finally(() => {
      data.loading.getPhone = false
    })
}
onMounted(() => {
  window.localStorage.removeItem('userInfo')
  window.localStorage.removeItem('token')
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';
@media screen and (min-width: 600px) {
  // #app {
  // 	background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;
  // }

  .login {
    margin: auto;
    width: 500px !important;
    position: relative;
    // left: 50%;
    // transform: translateX(-50%);
  }
}

.van-divider {
  color: white;
}

.btns {
  padding-top: 30px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.van-cell {
  border-radius: 10px;
}

.login {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: black;
  // background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;

  .content {
    padding: 50px 30px;

    .desc {
      margin-top: 70px;
      margin-bottom: 60px;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .button {
      width: 100%;
      margin-bottom: 5px;
    }
  }
}
</style>
