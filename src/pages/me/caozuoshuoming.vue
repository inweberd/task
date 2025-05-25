<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="玩法介绍"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image width="100%" lazy-load :src="caozuoshuoming">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <!--    <div v-html="articleInfo.content" style="padding: 10px"></div>-->
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { axiosInstance as axios } from '@/utils/myrequest'
import caozuoshuoming from './images/caozuoshuoming.jpg'
import { Toast } from 'tdesign-mobile-vue'

const articleInfo = ref('')

Toast({
  theme: 'loading',
  message: '加载中...',
  duration: 0
})
axios.get('api/article/one?id=6').then((res) => {
  Toast.clear()

  if (res.code === 200) {
    articleInfo.value = res.data
  }
})
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
