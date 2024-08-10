<template>
  <div class="Test">
    <input type="button" @click="loadSplash" value="开屏" />

    <input type="button" @click="loadInteraction" value="插屏" />

    <input type="button" @click="loadPlayRewardVideo" value="激励视频1" />
    <input type="button" @click="loadVideo" value="加载视频" />
    <input type="button" @click="loadBanner" value="loadBanner" />
    <input type="button" @click="loadFeed" value="loadFeed" />
    <input type="button" @click="wechatShareLink('a', 0)" value="分享链接给朋友" />
    <input type="button" @click="wechatShareLink('a', 1)" value="分享链接到朋友圈" />
    <input type="button" @click="wechatShareImg(null, 0)" value="分享图给朋友片" />
    <input type="button" @click="wechatShareImg(null, 1)" value="分享图片到朋友圈" />
    <input type="button" @click="testCallback()" value="测试反调用" />
  </div>
</template>
<script setup lang="ts">
import {
  loadBanner,
  loadFeed,
  loadInteraction,
  loadPlayRewardVideo,
  loadSplash,
  testCallback,
  wechatShareImg,
  wechatShareLink
} from '@/utils/ad'
import { onMounted } from 'vue'

defineOptions({
  name: 'Test'
})

function handleVisibilityChange() {
  if (document.hidden) {
    // 页面隐藏时执行的操作，例如暂停视频播放
    alert('hide')
  } else {
    alert('show')
  }
}

// 监听 visibilitychange 事件
// document.addEventListener('visibilitychange', handleVisibilityChange)

function loadVideo() {
  window.android.loadVideoAd('1400375964994650194')
}
</script>
<style scoped lang="less">
input {
  width: 100%;
  height: 50px;
  font-size: 24px;
  margin-top: 10px;
}
</style>
