<template>
  <div>
    <van-nav-bar
      title="开发中"
      safe-area-inset-top
      placeholder
      fixed
      :class="{ inApp: getIsInApp() }"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>

    <van-image
      :src="shareholder"
      width="94%"
      height="100%"
      style="margin-left: 3%"
      fit="cover"
    ></van-image>
  </div>
</template>

<script lang="ts" setup>
import shareholder from '@/assets/img/kaifa.png'
import { getIsInApp } from '@/utils/getTopPadding'
</script>
