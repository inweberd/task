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
    <p style="padding: 20px; font-size: 18px">
      安卓用户，IOS苹果用户，
      打开应用商店搜索《微脉圈》聊天软件，下载注册后，使用微脉圈扫码进入《全民瓜分官方万人不禁言大群》
    </p>
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
