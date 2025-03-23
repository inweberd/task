<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="资质证照"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image :src="zizhizhengzhao1" width="100%" ></van-image>
    <van-image :src="zizhizhengzhao2" width="100%" ></van-image>
    <van-image :src="zizhizhengzhao3" width="100%" ></van-image>
    <van-image :src="zizhizhengzhao4" width="100%" ></van-image>
    <!--<van-image-->
    <!--  :src="rule"-->
    <!--  width="94%"-->
    <!--  height="100%"-->
    <!--  style="margin-left: 3%; margin-top: -140px"-->
    <!--&gt;</van-image>-->
  </div>
</template>

<script lang="ts" setup>
import zizhizhengzhao1 from '@/assets/img/zizhizhengzhao1.jpg'
import zizhizhengzhao2 from '@/assets/img/zizhizhengzhao2.jpg'
import zizhizhengzhao3 from '@/assets/img/zizhizhengzhao3.jpg'
import zizhizhengzhao4 from '@/assets/img/zizhizhengzhao4.jpg'
// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { showImagePreview } from 'vant'
// const showImage = () => {
//   showImagePreview([shareholder])
// }
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
