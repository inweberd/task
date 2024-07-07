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
    <VueQrcode class="code" :value="qrCodeValue" :size="500"></VueQrcode>

    <div>
      <div class="btns">
        <van-image :src="weixin" width="100" height="100" fit="fill"></van-image>
        <van-image :src="pengyouquan" width="100" height="100" fit="fill"></van-image>
        <van-image :src="xiazai" width="100" height="100" fit="fill"></van-image>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import imageSrc from '@/assets/img/1.png'
import weixin from '@/assets/img/2.png'
import pengyouquan from '@/assets/img/3.png'
import xiazai from '@/assets/img/4.png'
import share from '@/assets/img/share.jpg'
import VueQrcode from 'vue-qrcode'
export default {
  components: { VueQrcode },
  data() {
    return {
      qrCodeValue: 'http://tc.izakq.com/#/signUp?invite=',
      imageSrc: imageSrc,
      weixin: weixin,
      pengyouquan: pengyouquan,
      xiazai: xiazai,
      share: share
    }
  },
  mounted() {
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
  bottom: 20%;
  margin-left: 5%;
  justify-content: space-around;
}
.code {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 250px;
  height: 250px;
  transform: translate(-50%, -50%);
}
</style>
