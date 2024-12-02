<template>
  <div class="test-slide-wrapper" id="home-index">
    <div class="first-horizontal-item">
      <SlideList uniqueId="home" style="background: #000" :active="true" :api="recommendedVideo" />
    </div>
    <BaseFooter v-bind:init-tab="1" />
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
  height: calc(var(--vh, 1vh) * 100 - var(--footer-height)) !important;
  overflow: hidden;
  border-radius: 10rem;
}
</style>
