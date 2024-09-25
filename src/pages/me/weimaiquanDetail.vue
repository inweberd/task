<template>
  <div>
    <van-nav-bar
      title="微脉圈"
      safe-area-inset-top
      fixed
      placeholder
      :class="{ inApp: getIsInApp() }"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image
      :src="weimaiquan"
      width="100%"
      height="100%"
      fit="cover"
      @click="showImage(0)"
    ></van-image>
  </div>
</template>

<script lang="ts" setup>
import weimaiquan from '@/assets/img/weimaiquan.jpg'
import { getIsInApp } from '@/utils/getTopPadding'

const showImage = (index) => {
  showImagePreview({
    images: [weimaiquan],
    startPosition: index
  })
}
</script>
