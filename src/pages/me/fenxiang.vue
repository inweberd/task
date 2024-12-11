<template>
  <div class="wrap">
    <dy-back
      mode="light"
      v-if="userInfo"
      img="back"
      @click="$router.back()"
      class="fixed-back"
      direction="left"
    />
    <!-- <canvas ref="canvas"></canvas> -->
    <template v-if="qrCodeValue">
      <van-image
        :src="share"
        width="100%"
        height="100%"
        fit="fill"
        style="position: absolute"
      ></van-image>
      <VueQrcode
        class="code"
        :value="qrCodeValue"
        :size="500"
        style="background-color: red"
      ></VueQrcode>

      <div class="btns">
        <van-image :src="weixin" width="60" height="60" fit="fill"></van-image>
        <van-image :src="pengyouquan" width="50" height="50" fit="fill"></van-image>
      </div>
    </template>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import imageSrc from '@/assets/img/1.png'
import weixin from '@/assets/img/weixin.png'
import pengyouquan from '@/assets/img/friend.png'
import xiazai from '@/assets/img/4.png'
import share from '@/assets/img/share2.jpg'
import VueQrcode from 'vue-qrcode'

// 检测用户使用的是微信浏览器或者qq浏览器
const isWeChatBrowser =
  navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('qqbrowser') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('qq') !== -1
export default {
  components: { VueQrcode },
  data() {
    return {
      qrCodeValue: '',
      imageSrc: imageSrc,
      weixin: weixin,
      pengyouquan: pengyouquan,
      xiazai: xiazai,
      share: share
    }
  },
  mounted() {
    this.qrCodeValue = 'https://fx.yuyuwa.cn/#/signUp?invite='
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if (this.$route.query.invite && this.$route.query.uid && isWeChatBrowser) {
      this.qrCodeValue += this.$route.query.invite + '&uid=' + this.$route.query.uid
    } else {
      this.qrCodeValue += userInfo.result.invite.code + '&uid=' + userInfo.id
    }
  },
  activated() {
    this.qrCodeValue = 'https://fx.yuyuwa.cn/#/signUp?invite='
    // this.qrCodeValue = 'http://192.168.10.87:3000/#/signUp?invite='
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if (this.$route.query.invite && this.$route.query.uid && isWeChatBrowser) {
      this.qrCodeValue +=
        this.$route.query.invite + '&uid=' + this.$route.query.uid + '&injectWeixin=' + true
    } else {
      this.qrCodeValue += userInfo.result.invite.code + '&uid=' + userInfo.id
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  width: 100vw;
  height: 100vh;
}
.fixed-back {
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
}

/* 你的样式 */
.btns {
  width: 90%;
  display: flex;
  height: 50px;
  position: fixed;
  bottom: 10%;
  margin-left: 5%;
  justify-content: space-around;
  align-items: center;
}
.code {
  position: fixed;
  left: 50%;
  top: 60%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
}
</style>
