<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="平台简介"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <div v-html="articleInfo.content" style="padding: 10px"></div>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { axiosInstance as axios } from '@/utils/myrequest'
import { closeToast, showLoadingToast } from 'vant'

const articleInfo = ref('')

showLoadingToast({
  duration: 0,
  message: '加载中'
})
axios.get('api/article/one?id=4').then((res) => {
  closeToast()
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
