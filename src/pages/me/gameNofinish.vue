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
      :src="getIcon"
      width="100%"
      height="100%"
      fit="fill"
      style="position: absolute"
    ></van-image>
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
import jww from '@/assets/img/game/jww-bg.png'
import dts from '@/assets/img/game/dts-bg.png'
import dyc from '@/assets/img/game/dyc-bg.png'
import { getIsInApp, getTopPadding } from '@/utils/getTopPadding'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const bgMap = {
  jww,
  dts,
  dyc
}
const getIcon = computed(() => {
  return bgMap[route.query.type]
})
</script>
