<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="合作单位"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image width="100%" lazy-load height="450" :src="zhengshu7" @click="showImage(0)">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <van-image width="100%" lazy-load height="200" :src="zhengshu4" @click="showImage(1)">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <van-image width="100%" lazy-load height="200" :src="zhengshu5" @click="showImage(2)">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <van-image width="100%" lazy-load height="200" :src="zhengshu6" @click="showImage(3)">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
  </div>
</template>

<script lang="ts" setup>
import zhengshu1 from '@/assets/img/zhengshu1.jpg'
import zhengshu2 from '@/assets/img/zhengshu2.jpg.jpg'
import zhengshu3 from '@/assets/img/zhengshu3.jpg'
import zhengshu4 from '@/assets/img/zhengshu4.jpg'
import zhengshu5 from '@/assets/img/zhengshu5.png'
import zhengshu6 from '@/assets/img/zhengshu6.png'
import zhengshu7 from '@/assets/img/zhengshu7.jpg'
// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { showImagePreview } from 'vant'

const showImage = (index) => {
  showImagePreview({
    // images: [zhengshu1, zhengshu2, zhengshu7, zhengshu4, zhengshu5, zhengshu6],
    images: [zhengshu7, zhengshu4, zhengshu5, zhengshu6],
    startPosition: index
  })
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
