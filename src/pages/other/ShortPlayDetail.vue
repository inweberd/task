<template>
  <div class="test-slide-wrapper" id="home-index">
    <ShortSlideList
      v-if="active"
      :active="true"
      :list="arr"
      uniqueId="hot"
      :index="index"
      :style="{
        background: 'black',
        marginTop: state.subTypeVisible ? state.subTypeHeight : 0
      }"
      :api="recommendedVideo"
      @touchstart="pageClick"
      @selectChange="selectIndexChange"
    />
    <SelectVideo
      v-model="store.playVideoData"
      :index="selectIndex"
      @change="videoChange"
    ></SelectVideo>
  </div>
</template>

<script setup lang="tsx">
import { nextTick, onActivated, onMounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import { recommendedVideo } from '@/api/videos'
import ShortSlideList from '@/pages/other/ShortSlideList.vue'
import { _stopPropagation } from '@/utils'
import posts7 from '@/assets/data/posts7.json'
import { useBaseStore } from '@/store/pinia'
import SelectVideo from '@/components/slide/SelectVideo.vue'
const store = useBaseStore()
console.log('store', store.playVideoData)
const arr = store.playVideoData.videoList
// const arr = posts7.map((v: any) => {
//   v = JSON.parse(JSON.stringify(v))
//   v.type = 'recommend-video'
//   return v
// })
console.log('arr', arr)
defineOptions({
  name: 'shortPlayDetail'
})
const index = ref(0)
const selectIndex = ref(0)
const active = ref(true)

const state = reactive({
  index: 0,
  subType: -1,
  subTypeVisible: false,
  subTypeHeight: '0',
  //用于改变zindex的层级到上层，反正比slide高就行。不然摸不到subType.
  subTypeIsTop: false
})
function pageClick(e) {
  // console.log('pageClick')
  if (state.subTypeVisible) {
    state.subTypeIsTop = state.subTypeVisible = false
    bus.emit(EVENT_KEY.CLOSE_SUB_TYPE)
    _stopPropagation(e)
  }
}

const videoChange = (idx) => {
  active.value = false
  index.value = idx

  nextTick(() => {
    active.value = true
  })
}
const selectIndexChange = (index) => {
  selectIndex.value = index
}
</script>

<style scoped lang="less">
.test-slide-wrapper {
  font-size: 14px;
  width: 100%;
  height: calc(100% - 60px);
  background: black;
  overflow: hidden;
}
</style>
