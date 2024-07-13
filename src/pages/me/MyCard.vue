<template>
  <div>
    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
    <!-- <canvas ref="canvas"></canvas> -->
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
export default {
  components: { VueQrcode },
  data() {
    return {
      qrCodeValue: 'http://tc.ijylmwy.com/#/signUp?invite=',
      imageSrc: imageSrc,
      weixin: weixin,
      pengyouquan: pengyouquan,
      xiazai: xiazai,
      share: share
    }
  },
  mounted() {
    this.qrCodeValue = 'http://tc.ijylmwy.com/#/signUp?invite='
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.qrCodeValue += userInfo.result.invite.code
  },
  activated() {
    this.qrCodeValue = 'http://tc.ijylmwy.com/#/signUp?invite='
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.qrCodeValue += userInfo.result.invite.code
  }
}
</script>

<style scoped lang="less">
.fixed-back {
  position: fixed;
  left: 10rem;
  top: 20rem;
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
  position: absolute;
  left: 50%;
  top: 60%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
}
</style>
