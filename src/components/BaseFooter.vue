<template>
  <div v-if="visible" class="footer" :class="{ isWhite }">
    <div class="l-button" @click="refresh(1)">
      <div class="add-ctn">
        <div class="img-box">
          <img
            src="@/assets/img/tabbar/home-active.png"
            alt=""
            class="add"
            v-if="currentTab === 1"
          />
          <img src="@/assets/img/tabbar/home.png" alt="" class="add" v-else />
        </div>
        <div :style="{ color: currentTab === 1 ? '#496DFE' : '' }">首页</div>
      </div>
    </div>
    <!--    <div class="l-button" @click="refresh(2)">-->
    <div class="l-button" @click="loadShort(1)">
      <div class="add-ctn">
        <div class="img-box">
          <img
            src="../assets/img/tabbar/video-active.png"
            alt=""
            class="add"
            v-if="currentTab === 2"
          />
          <img src="../assets/img/tabbar/video.png" alt="" class="add" v-else style="width: 25px" />
        </div>
        <div style="white-space: nowrap" :style="{ color: currentTab === 2 ? '#496DFE' : '' }">
          普通视频
        </div>
      </div>
    </div>
    <div class="l-button" @click="loadShort(3)">
      <div class="add-ctn">
        <!--        <div class="img-box">-->
        <!--          <img-->
        <!--            src="../assets/img/tabbar/vipVideo-active.png"-->
        <!--            alt=""-->
        <!--            class="add"-->
        <!--            v-if="currentTab === 2"-->
        <!--          />-->
        <!--          <img src="../assets/img/tabbar/vipVideo.png" alt="" class="add" v-else />-->
        <!--        </div>-->
        <div
          style="white-space: nowrap; text-align: center; font-size: 15px"
          :style="{ color: currentTab === 2 ? '#496DFE' : '' }"
        >
          <p style="color: red">（免广告）</p>
          高价视频
        </div>
      </div>
    </div>
    <div class="l-button" @click="tab(5)">
      <div class="add-ctn">
        <!--        <div class="img-box">-->
        <!--          <img-->
        <!--            src="../assets/img/tabbar/vip-active.png"-->
        <!--            alt=""-->
        <!--            class="add"-->
        <!--            v-if="currentTab === 5"-->
        <!--          />-->
        <!--          <img src="../assets/img/tabbar/vip.png" alt="" class="add" v-else />-->
        <!--        </div>-->
        <div
          style="white-space: nowrap; text-align: center; font-size: 15px"
          :style="{ color: currentTab === 5 ? '#496DFE' : '' }"
        >
          <p style="color: red">（无广告）</p>
          VIP
        </div>
      </div>
    </div>
    <div class="l-button" @click="tab(6)">
      <div class="add-ctn">
        <div class="img-box">
          <img
            src="../assets/img/tabbar/my-active.png"
            alt=""
            class="add"
            v-if="currentTab === 6"
          />
          <img src="../assets/img/tabbar/my.png" alt="" class="add" v-else />
        </div>
        <div :style="{ color: currentTab === 6 ? '#496DFE' : '' }">我的</div>
      </div>
      <!-- <div class="badge">2</div> -->
    </div>
  </div>
</template>

<script>
import bus, { EVENT_KEY } from '../utils/bus'
import { loadInteraction, loadShortPlayVideo, loadShortVideo } from '@/utils/ad'
import dayjs from 'dayjs'
import { closeToast, showDialog, showLoadingToast } from 'vant'
import { reqAdvertisingCount, reqAdvertisingSinglePrice } from '@/api/myApi'

export default {
  name: 'BaseFooter',
  props: ['initTab', 'isWhite'],
  data() {
    return {
      isRefresh1: false,
      isRefresh2: false,
      currentTab: this.initTab,
      visible: true,
      isIos: /iPhone|iPad|iPod/i.test(navigator.userAgent)
    }
  },
  created() {
    bus.on('setFooterVisible', (e) => (this.visible = e))
    bus.on(EVENT_KEY.ENTER_FULLSCREEN, () => (this.visible = false))
    bus.on(EVENT_KEY.EXIT_FULLSCREEN, () => (this.visible = true))
  },
  unmounted() {
    bus.off(EVENT_KEY.ENTER_FULLSCREEN)
    bus.off(EVENT_KEY.EXIT_FULLSCREEN)
  },
  methods: {
    async loadShort(type) {
      if (type === 1 || type === 3) {
        console.log("dayjs().format('YYYY-MM-DD')", dayjs().format('YYYY-MM-DD'))
        if (localStorage.isShortVideoShare === dayjs().format('YYYY-MM-DD')) {
          const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
          const userId = userInfo?.id
          const serial = userInfo?.result?.staff?.serial
          console.log(!serial)
          if (!serial && type === 3) {
            showDialog({
              message: 'vip专属入口，开通vip领取更高收益!'
            }).then(() => {
              this.$router.push('/invest')
            })
            return
          }
          // loadInteraction()
          showLoadingToast({
            duration: 0,
            message: '加载中'
          })
          let arr = [reqAdvertisingCount(), reqAdvertisingSinglePrice()]
          Promise.all(arr)
            .then((res) => {
              closeToast()

              let todayCount = res[0]?.data?.ordinary
              let price = res[1]?.data?.price
              if (res[0].code !== 200) {
                todayCount = 30
              }
              if (res[1].code !== 200) {
                price = -1
              }
              nextTick(() => {
                loadShortVideo({
                  todayCount: 30 - todayCount,
                  price,
                  isVip: type === 3
                })
              })
            })
            .catch(() => {
              closeToast()

              nextTick(() => {
                loadShortVideo({
                  todayCount: 30,
                  price: -1,
                  isVip: type === 3
                })
              })
            })
        } else {
          showConfirmDialog({
            message: '分享朋友圈，刷短视频赚收益!',
            confirmButtonText: '一键分享'
          }).then(() => {
            localStorage.isShortVideoShare = dayjs().format('YYYY-MM-DD')
            window.shareFriend()
          })
        }
      } else if (type === 2) {
        // loadInteraction()
        loadShortPlayVideo()
      }
    },
    $nav(path) {
      this.$router.push(path)
    },
    tab(index) {
      switch (index) {
        case 1:
          this.$nav('/')
          break
        case 2:
          this.$nav('/longvideo')
          break
        case 3:
          //这个得到首页才能分享
          this.$nav('/me/my-card')

          // bus.emit(EVENT_KEY.SHOW_SHARE, {

          // })
          break
        case 4:
          // this.$nav('/message')
          this.$nav('/home/music-rank-list')
          break
        case 5:
          this.$nav('/invest')
          break
        case 6:
          this.$nav('/myteam')
          break
      }
    },
    refresh(index) {
      // if (this.currentTab === index) {
      //   this['isRefresh' + index] = !this['isRefresh' + index]
      //   setTimeout(() => {
      //     this['isRefresh' + index] = !this['isRefresh' + index]
      //   }, 2000)
      // } else {
      this.tab(index)
      // }
    }
  }
}
</script>

<style scoped lang="less">
@import '../assets/less/index';

.footer {
  font-size: 14px;
  position: fixed;
  width: 100%;
  display: flex;
  height: var(--footer-height);
  //border-top: 1px solid #7b7878;
  z-index: 2;
  //不用bottom：0是因为，在进行页面切换的时候，vue的transition
  // 会使footer的bottom：0失效，不能准确定位
  top: calc(var(--vh, 1vh) * 100 - var(--footer-height));
  //bottom: 0;
  background: var(--footer-color);
  color: white;
  display: flex;
  //justify-content: space-between;

  &.isWhite {
    background: white !important;
    color: #000 !important;
  }

  .l-button {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 16px;

    .refresh {
      width: 25%;
      animation: rotate 0.5s linear infinite;
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(-360deg);
      }
    }

    .add-ctn {
      cursor: pointer;
      @height: 27px;
      @width: 36px;
      height: @height;
      width: @width;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 0 2px;
      //border: 3px solid white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .img-box {
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      & > div {
        margin-top: 6px;
        color: #9f8b8b;
        font-size: 12px;
      }
    }

    span {
      cursor: pointer;

      font-weight: bold;
      opacity: 0.7;

      &.active {
        opacity: 1;
      }
    }

    .badge {
      right: 14px;
      top: 12px;
      position: absolute;
    }
  }
}
</style>
