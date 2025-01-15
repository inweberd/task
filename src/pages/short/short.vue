<template>
  <div class="test-slide-wrapper" id="home-index">
    <div style="position: fixed; top: 50px; right: 0px; z-index: 10">
      <p
        style="
          position: absolute;
          color: #ff3157;
          text-align: center;
          width: 100%;
          top: 10px;
          font-size: 14px;
        "
      >
        已获得奖励
      </p>
      <span
        style="
          font-size: 22px;
          color: #ff3157;
          position: absolute;
          top: 40px;
          width: 100%;
          text-align: center;
        "
        >{{ total || '0.00' }}</span
      >
      <img src="./images/fenhong.png" style="width: 100px; height: 120px" />
      <p style="position: absolute; text-align: center; width: 100%; bottom: 15px">大拇指视频</p>
    </div>
    <div class="first-horizontal-item">
      <SlideList uniqueId="home" style="background: #000" :active="true" :api="recommendedVideo" />
    </div>
    <!--    <BaseFooter v-bind:init-tab="1" />-->
    <Comment
      page-id="home-index"
      :video-id="state.currentItem.aweme_id"
      v-model="state.commentVisible"
      @close="closeComments"
    />
  </div>
</template>

<script setup lang="tsx">
import Comment from '../../components/Comment.vue'
import { onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import { DefaultUser } from '@/utils/const_var'
import { recommendedVideo } from '@/api/videos'
import SlideList from '@/pages/home/slide/SlideList.vue'
import { reqAdvertisingCount, reqAdvertisingSinglePrice } from '@/api/myApi'
import { Toast } from 'tdesign-mobile-vue'
import { loadShortVideo } from '@/utils/ad'

const state = reactive({
  active: true,
  itemIndex: 0,
  test: '',
  recommendList: [],
  canMove: true,
  shareType: -1,
  showShareDuoshan: false,
  showShareDialog: false,
  showShare2WeChatZone: false,
  showFollowSetting: false,
  showFollowSetting2: false,

  commentVisible: false,
  fullScreen: false,
  currentItem: {
    aweme_id: '',
    author: DefaultUser,
    isRequest: false,
    aweme_list: []
  }
})
let price = 0
const total = ref(0.0)
onMounted(() => {
  bus.on(EVENT_KEY.OPEN_COMMENTS, () => {
    if (!state.active) return
    bus.emit(EVENT_KEY.ENTER_FULLSCREEN)
    state.commentVisible = true
  })
  bus.on(EVENT_KEY.CLOSE_COMMENTS, () => {
    if (!state.active) return
    bus.emit(EVENT_KEY.EXIT_FULLSCREEN)
    state.commentVisible = false
  })
  bus.on('updateTotal', (count) => {
    total.value = (count * price).toFixed(2)
  })
  let arr = [reqAdvertisingCount(), reqAdvertisingSinglePrice()]
  Promise.all(arr).then((res) => {
    Toast.clear()
    let todayCount = res[0]?.data?.ordinary
    price = res[1]?.data?.price
    total.value = (todayCount * price).toFixed(2)
  })
})

onUnmounted(() => {
  bus.offAll()
})

onActivated(() => {
  state.active = true
  bus.emit(EVENT_KEY.TOGGLE_CURRENT_VIDEO)
})

onDeactivated(() => {
  state.active = false
  bus.emit(EVENT_KEY.TOGGLE_CURRENT_VIDEO)
})

function closeComments() {
  bus.emit(EVENT_KEY.CLOSE_COMMENTS)
}
</script>

<style scoped lang="less">
.test-slide-wrapper {
  font-size: 14rem;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;
}

.first-horizontal-item {
  width: 100%;
  //height: calc(var(--vh, 1vh) * 100 - var(--footer-height)) !important;
  height: calc(var(--vh, 1vh) * 100) !important;
  overflow: hidden;
  border-radius: 10rem;
}
</style>
