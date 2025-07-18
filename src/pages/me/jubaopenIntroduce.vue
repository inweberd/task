<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="每日星级阶梯分红榜"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image :src="shareholder" width="100%" @click="showImage(shareholder)"></van-image>
    <!--<van-image-->
    <!--  :src="rule"-->
    <!--  width="94%"-->
    <!--  height="100%"-->
    <!--  style="margin-left: 3%; margin-top: -140px"-->
    <!--&gt;</van-image>-->
  </div>
</template>

<script lang="ts" setup>
import shareholder from '@/assets/img/jubaopenIntroduce.jpg'
import shareholder2 from '@/assets/img/rankIntroduce2.png'
// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { showImagePreview } from 'vant'
const showImage = (imgSrc) => {
  // showImagePreview([imgSrc])
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
