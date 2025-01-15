<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="推广收入表"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image :src="shareholder" width="100%" @click="showImage"></van-image>
    <!--<van-image-->
    <!--  :src="rule"-->
    <!--  width="94%"-->
    <!--  height="100%"-->
    <!--  style="margin-left: 3%; margin-top: -140px"-->
    <!--&gt;</van-image>-->
  </div>
</template>

<script lang="ts" setup>
import shareholder from '@/assets/img/shareholder3.jpg'
// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { showImagePreview } from 'vant'
const showImage = () => {
  showImagePreview([shareholder])
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
