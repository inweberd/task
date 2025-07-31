<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="大逃杀游戏"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image
      :src="shareholder1"
      width="90%"
      style="margin-left: 5%"
      @click="showImage(shareholder1)"
    ></van-image>
    <van-image
      :src="shareholder2"
      width="90%"
      style="margin-left: 5%"
      @click="showImage(shareholder2)"
    ></van-image>
    <van-image
      :src="shareholder3"
      width="90%"
      style="margin-left: 5%"
      @click="showImage(shareholder3)"
    ></van-image>
    <van-image
      :src="shareholder4"
      width="90%"
      style="margin-left: 5%"
      @click="showImage(shareholder4)"
    ></van-image>
    <!--<van-image-->
    <!--  :src="rule"-->
    <!--  width="94%"-->
    <!--  height="100%"-->
    <!--  style="margin-left: 3%; margin-top: -140px"-->
    <!--&gt;</van-image>-->
  </div>
</template>

<script lang="ts" setup>
import shareholder1 from './images/banner_star.png'
import shareholder2 from './images/banner_risk.png'
import shareholder3 from './images/banner_dragon.png'
import shareholder4 from './images/banner_ship.png'
// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { showImagePreview, showToast } from 'vant'
const showImage = (imgSrc) => {
  // showImagePreview([imgSrc])
  showToast('等待上线！')
}
const loadShangXian = () => {
  showToast('等待上线！')
}
</script>
<style scoped>
html {
  background: red;
}
body {
  background: red;
}
#app {
  background: red;
}
</style>
