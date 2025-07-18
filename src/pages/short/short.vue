<template>
  <div id="home-index" class="test-slide-wrapper">
    <!--        <div style="position: fixed; top: 50px; right: 0px; z-index: 10">-->
    <!--            <p-->
    <!--                style="-->
    <!--          position: absolute;-->
    <!--          color: #ff3157;-->
    <!--          text-align: center;-->
    <!--          width: 100%;-->
    <!--          top: 10px;-->
    <!--          font-size: 14px;-->
    <!--        "-->
    <!--            >-->
    <!--                已获得奖励-->
    <!--            </p>-->
    <!--            <span-->
    <!--                style="-->
    <!--          font-size: 22px;-->
    <!--          color: #ff3157;-->
    <!--          position: absolute;-->
    <!--          top: 40px;-->
    <!--          width: 100%;-->
    <!--          text-align: center;-->
    <!--        "-->
    <!--            >{{ total || '0.00' }}</span-->
    <!--            >-->
    <!--            <img src="./images/fenhong.png" style="width: 100px; height: 120px"/>-->
    <!--            <p style="position: absolute; text-align: center; width: 100%; bottom: 15px">群英会阶梯</p>-->
    <!--        </div>-->
    <van-overlay :show="showOverlayer" :z-index="99999999">
      <div class="wrapper" @click.stop="getRed">
        <img :src="vipSrc" alt="" />
      </div>
    </van-overlay>
    <div class="first-horizontal-item">
      <SlideList :active="true" :api="recommendedVideo" style="background: #000" uniqueId="home" />
    </div>
    <!--    <BaseFooter v-bind:init-tab="1" />-->
    <Comment
      v-model="state.commentVisible"
      :video-id="state.currentItem.aweme_id"
      page-id="home-index"
      @close="closeComments"
    />
  </div>
</template>

<script lang="tsx" setup>
import Comment from '../../components/Comment.vue'
import { computed, onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref } from 'vue'
import bus, { EVENT_KEY } from '../../utils/bus'
import { DefaultUser } from '@/utils/const_var'
import { recommendedVideo } from '@/api/videos'
import SlideList from '@/pages/home/slide/SlideList.vue'
import { reqAdvertisingCount, reqAdvertisingSinglePrice, createAdLog } from '@/api/myApi'
import { Toast } from 'tdesign-mobile-vue'
import { loadShortVideo } from '@/utils/ad'
import v1 from './images/v1.png'
import v2 from './images/v2.png'
import v3 from './images/v3.png'
import v4 from './images/v4.png'
import v5 from './images/v5.png'
import { showToast } from 'vant'

const showOverlayer = ref(false)
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
const todayCount = ref(0)
const total = ref(0.0)
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
const vipSrc = computed(() => {
  const serial = userInfo?.value?.result?.staff?.serial

  if (serial == 1) {
    return v1
  } else if (serial == 2) {
    return v2
  } else if (serial == 3) {
    return v3
  } else if (serial == 4) {
    return v4
  } else {
    return v5
  }
})
const getRed = () => {
  showOverlayer.value = false
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  createAdLog().then((res) => {
    console.log('createAdLog', res)
    closeToast()
    todayCount.value++
    // Toast()
    // bus.emit('updateTotal', res.data.count)
    // showNotify({
    //   color: '#fff',
    //   ba+ckground: '#01c5f0',
    //   message: '今日已领取' + res.data.count * price + '元'
    // })
    if (res.msg?.length) {
      showToast(res.msg)
    }
  })
}
onMounted(() => {
  reqAdvertisingCount().then((res) => {
    todayCount.value = res?.data?.ordinary
    if (todayCount.value < 20) {
      showOverlayer.value = true
    }
  })
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
    if (todayCount.value < 20) {
      showOverlayer.value = true
    }
    // total.value = (count * price).toFixed(2)
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

<style lang="less" scoped>
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

.wrapper {
  width: 60%;
  margin: -50px auto;

  img {
    width: 100%;
  }
}
</style>
