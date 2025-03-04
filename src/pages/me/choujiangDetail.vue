<template>
  <div>
    <van-nav-bar
      title="抽奖盲盒"
      safe-area-inset-top
      fixed
      placeholder
      :class="{ inApp: getIsInApp() }"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image
      :src="choujiang1"
      width="100%"
      height="100%"
      fit="cover"
      @click="showImage(0)"
    ></van-image>
    <van-image
      :src="choujiang2"
      width="100%"
      height="100%"
      fit="cover"
      @click="showImage(1)"
    ></van-image>
  </div>
</template>

<script lang="ts" setup>
import choujiang1 from '@/assets/img/choujiang1.png'
import choujiang2 from '@/assets/img/choujiang2.png'
import { getIsInApp } from '@/utils/getTopPadding'

const showImage = (index) => {
  showImagePreview({
    images: [choujiang1, choujiang2],
    startPosition: index
  })
}
</script>
