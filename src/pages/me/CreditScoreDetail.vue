<template>
  <div>
    <van-nav-bar
      title="信用分详情"
      safe-area-inset-top
      fixed
      placeholder
      :class="{ inApp: getIsInApp() }"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image :src="my" width="100%" height="100%" fit="cover"></van-image>
  </div>
</template>

<script lang="ts" setup>
import shareholder from '@/assets/img/kaifa.png'
import my from '@/assets/img/my.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
</script>
