<template>
  <div id="Music">
    <div class="header">
      <dy-back mode="light" @click="router.back()" />
      <transition name="fade">
        <div class="center" v-if="data.isFixed">
          <span class="f16">{{ data.music.name }}</span>
        </div>
      </transition>
      <div class="right">
        <!--        TODO 没有淡入淡出的特效-->
        <template v-if="data.isFixed">
          <img
            class="star"
            v-if="data.isCollect"
            src="../../assets/img/icon/star-yellow.png"
            @click.stop="toggleCollect()"
          />
          <img
            class="star"
            v-else
            src="../../assets/img/icon/star-white.png"
            @click.stop="toggleCollect()"
          />
        </template>
        <!--        <div class="logo" v-if="!data.isFixed" @click="nav('/home/music-rank-list')">-->
        <!--          抖音音乐榜-->
        <!--        </div>-->
        <!--				<img class="share" src="../../assets/img/icon/share-white.png" @click="data.isSharing = true" />-->
      </div>
    </div>
    <div class="content">
      <Scroll
        class="Scroll"
        :fixedHeight="180"
        @fixed="(e) => (data.isFixed = e)"
        @pulldown="loadData"
      >
        <div class="desc">
          <div class="cover-wrapper" @click="togglePlay()">
            <img class="cover" :src="_checkImgUrl(data.music.cover)" alt="" />
            <img
              v-if="!data.isPlay"
              src="../../assets/img/icon/play-white.png"
              alt=""
              class="play"
            />
            <img
              v-if="data.isPlay"
              src="../../assets/img/icon/pause-white.png"
              alt=""
              class="play"
            />
          </div>
          <div class="info">
            <div class="name">{{ data.music.name }}</div>
            <div>
              <div class="user">{{ data.music.author }}</div>
              <div class="peoples">{{ _formatNumber(data.music.use_count) }} 人使用</div>
            </div>
            <div class="collection" @click.stop="toggleCollect()">
              <img v-if="data.isCollect" src="../../assets/img/icon/star-yellow.png" />
              <img v-else src="../../assets/img/icon/star-white.png" />
              <span>{{ data.isCollect ? '已' : '' }}收藏</span>
            </div>
          </div>
        </div>
        <Posters mode="music" :list="data.videos" />
        <Loading :is-full-screen="false" v-if="data.loading" />
        <NoMore v-else />
      </Scroll>
    </div>
    <!-- <div class="options">
      <div class="l-button white" @click="_no">
        <img src="../../assets/img/icon/home/music3.png" alt="" />
        <span>分享到日常</span>
      </div>
      <div class="l-button primary" @click="_no">
        <img src="../../assets/img/icon/home/record.png" alt="" />
        <span>拍同款</span>
      </div>
    </div> -->

    <Share
      v-model="data.isSharing"
      mode="music"
      ref="share"
      pageId="Music"
      @showDouyinCode="data.showDouyinCode = true"
      @showShare2WeChatZone="data.shareType = 2"
      @share2WeChat="data.shareType = 3"
      @share2QQZone="data.shareType = 4"
      @share2QQ="data.shareType = 5"
      @share2Webo="data.shareType = 8"
      @ShareToFriend="delayShowDialog(() => (data.shareToFriend = true))"
    />

    <DouyinCode v-model="data.showDouyinCode" />

    <ConfirmDialog
      v-model:visible="data.showSharePassword"
      title="你的口令已复制"
      subtitle="0F.:/ a【风就应该自由要什么归宿】长按复制此条消息，打开抖音搜索，聆听音乐##kwu3VCixHl8##[抖音口令]"
      :okText="data.okText"
      cancelText="不分享了"
      @ok="data.shareType = -1"
      @cancel="data.shareType = -1"
    >
      <template v-slot:header>
        <img style="width: 100%" src="../../assets/img/icon/share-password.webp" alt="" />
      </template>
    </ConfirmDialog>

    <ShareToFriend pageId="Music" v-model="data.shareToFriend" />
  </div>
</template>
<script setup lang="ts">
import Posters from '../../components/Posters.vue'
import Scroll from '../../components/Scroll.vue'
import Loading from '../../components/Loading.vue'
import Share from '../../components/Share.vue'
import DouyinCode from '../../components/DouyinCode.vue'
import ConfirmDialog from '../../components/dialog/ConfirmDialog.vue'
import ShareToFriend from './components/ShareToFriend.vue'
import { myVideo } from '@/api/videos'
import { onDeactivated, onMounted, onUnmounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl, _formatNumber, _no, _notice } from '@/utils'

const route = useRoute()
const router = useRouter()
const nav = useNav()

const data = reactive({
  loading: false,
  isFixed: false,
  isCollect: false,
  isPlay: false,
  isSharing: false,
  okText: '',

  showSharePassword: false,
  shareToFriend: false,
  shareType: -1,

  showDouyinCode: false,
  audio: new Audio(),
  total: 0,
  pageNo: 0,
  pageSize: 15,
  videos: [],

  music: {
    name: '发如雪',
    mp3: 'https://m3.8js.net:99/2014/211204142150965.mp3',
    cover: new URL('../../assets/img/music-cover/7.jpg', import.meta.url).href,
    author: '周杰伦',
    duration: 60,
    use_count: 37441000,
    is_collect: false,
    is_play: false
  }
})

watch(
  () => data.shareType,
  (newVal) => {
    if (newVal === -1) return
    data.showSharePassword = true
    switch (newVal) {
      case 2:
      case 3:
        return (data.okText = '去微信粘贴')
      case 4:
      case 5:
        return (data.okText = '去QQ粘贴')
      case 8:
        return (data.okText = '去微博粘贴')
    }
  }
)

onMounted(() => {
  if (route.query.name) {
    data.music = route.query as any
  }
  loadData(true)
})

onUnmounted(stopPlay)
onDeactivated(stopPlay)

function toggleCollect() {
  data.isCollect = !data.isCollect
}

async function loadData(init = false) {
  if (data.loading) return
  if (!init) {
    if (data.total <= data.videos.length) {
      _notice('暂时没有更多了')
    }
    data.pageNo++
  }
  data.loading = true
  let res: any = await myVideo({
    pageNo: data.pageNo,
    pageSize: data.pageSize
  })
  data.loading = false
  if (res.success) {
    data.videos = data.videos.concat(res.data.list)
    data.total = res.data.total
  }
}

function togglePlay() {
  data.isPlay = !data.isPlay
  if (data.isPlay) {
    if (!data.audio.src) {
      data.audio.src = data.music.mp3
    }
    data.audio.play()
    data.audio.addEventListener('ended', () => (data.isPlay = false))
  } else {
    stopPlay()
  }
}

function delayShowDialog(cb) {
  setTimeout(() => {
    cb()
  }, 100)
}

function stopPlay() {
  data.audio.pause()
  data.audio.removeEventListener('ended', null)
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

#Music {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14px;

  .header {
    position: fixed;
    z-index: 9;
    top: 0;
    background: var(--main-bg);
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .center {
      font-size: 13px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .right {
      display: flex;
      align-items: center;

      .logo {
        background: linear-gradient(to bottom, #794cff 5%, #4c3efe 50%);
        //padding: .2px 1px;
        width: 80px;
        height: 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }

      img {
        width: 24px;
        height: 24px;
        margin-left: 15px;
      }
    }
  }

  .content {
    padding-top: 60px;

    .Scroll {
      height: calc(var(--vh, 1vh) * 100 - 60px);
    }

    .desc {
      padding: 10px 15px 30px 15px;
      display: flex;
      height: 120px;

      .cover-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        .play {
          width: 40px;
          height: 40px;
          position: absolute;
        }

        .cover {
          width: 120px;
          object-fit: cover;
          height: 100%;
          border-radius: 3px;
        }
      }

      .info {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 18px;
          color: #fff;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .user,
        .peoples {
          font-size: 12px;
          margin-bottom: 5px;
          color: #999999;
        }

        .collection {
          display: flex;
          justify-content: center;
          height: 25px;
          width: 70px;
          align-items: center;
          color: #ffffff;
          background: var(--second-btn-color);
          border-radius: 2px;
          font-size: 13px;

          img {
            margin-right: 5px;
            width: 13px;
            height: 13px;
          }
        }
      }
    }
  }

  .options {
    font-size: 14px;
    width: 100%;
    position: fixed;
    bottom: 20px;
    display: flex;
    justify-content: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }

    .l-button {
      margin-left: 5px;
      margin-right: 5px;
      width: 140px;
      border-radius: 50px;
      display: flex;
      padding: 15px 0;
      align-items: center;
      justify-content: center;
    }

    .white {
      color: black;
      background: white;
    }

    .primary {
      background: var(--primary-btn-color);
      color: white;
    }
  }
}
</style>
