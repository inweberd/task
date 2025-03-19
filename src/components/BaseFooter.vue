<template>
  <div v-if="visible" class="footer" :class="{ isWhite }">
    <div class="l-button" @click="refresh(1)">
      <div class="add-ctn">
        <div class="img-box">
          <img src="@/assets/icon/1-active.png" alt="" class="add" v-if="currentTab === 1" />
          <img src="@/assets/icon/1.png" alt="" class="add" v-else />
        </div>
        <div :style="{ color: currentTab === 1 ? '#fff' : '' }">主页</div>
      </div>
    </div>
    <!--    <div class="l-button" @click="refresh(2)">-->
    <!--    <div class="l-button" @click="loadShort(1)" v-if="!isIos">-->
    <!--      <div class="add-ctn">-->
    <!--        <div class="img-box">-->
    <!--          <img src="@/assets/icon/4.png" alt="" class="add" v-if="currentTab === 2" />-->
    <!--          <img src="@/assets/icon/4.png" alt="" class="add" v-else />-->
    <!--        </div>-->
    <!--        <div :style="{ color: currentTab === 2 ? '#666' : '' }">零撸专区</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="l-button" @click="loadShort(3)">-->
    <!--      <div class="add-ctn">-->
    <!--        <div class="img-box">-->
    <!--          <img src="@/assets/icon/6.png" alt="" class="add" v-if="currentTab === 2" />-->
    <!--          <img src="@/assets/icon/6.png" alt="" class="add" v-else />-->
    <!--        </div>-->
    <!--        <div :style="{ color: currentTab === 2 ? '#666' : '' }">会员专享</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="l-button" @click="$router.push('/gameList')">-->
    <!--      <div class="add-ctn">-->
    <!--        <div class="img-box">-->
    <!--          <img src="@/assets/icon/3-active.png" alt="" class="add" v-if="currentTab === 2" />-->
    <!--          <img src="@/assets/icon/3.png" alt="" class="add" v-else />-->
    <!--        </div>-->
    <!--        &lt;!&ndash;        <div :style="{ color: currentTab === 2 ? '#666' : '' }">大拇指娱乐</div>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="l-button" @click="tab(5)">
      <div class="add-ctn">
        <div class="img-box">
          <img src="@/assets/icon/4-active.png" alt="" class="add" v-if="currentTab === 5" />
          <img src="@/assets/icon/4.png" alt="" class="add" v-else />
        </div>
        <div :style="{ color: currentTab === 5 ? '#fff' : '' }">特权加速</div>
      </div>
    </div>
    <div class="l-button" @click="tab(6)">
      <div class="add-ctn">
        <div class="img-box">
          <img src="@/assets/icon/5-active.png" alt="" class="add" v-if="currentTab === 6" />
          <img src="@/assets/icon/5.png" alt="" class="add" v-else />
        </div>
        <div :style="{ color: currentTab === 6 ? '#fff' : '' }">我</div>
      </div>
      <!-- <div class="badge">2</div> -->
    </div>
  </div>
</template>

<script>
import bus, { EVENT_KEY } from '../utils/bus'
import { loadInteraction, loadShortPlayVideo, loadShortVideo } from '@/utils/ad'
import dayjs from 'dayjs'
import { closeToast, showDialog } from 'vant'
import { reqAdvertisingCount, reqAdvertisingSinglePrice } from '@/api/myApi'
import { Toast } from 'tdesign-mobile-vue'
const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent)

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
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      const userId = userInfo?.id
      const serial = userInfo?.result?.staff?.serial
      if (isIos) {
        if (!serial && type === 3) {
          showDialog({
            message: '购买股权，开启大额分红模式，每天收益不间断!'
          }).then(() => {
            this.$router.push('/invest')
          })
          return
        }

        this.$router.push('/short')
        return
      }

      if (type === 1 || type === 3) {
        console.log("dayjs().format('YYYY-MM-DD')", dayjs().format('YYYY-MM-DD'))
        if (localStorage.isShortVideoShare === dayjs().format('YYYY-MM-DD')) {
          console.log(!serial)
          if (!serial && type === 3) {
            showDialog({
              message: '购买股权，开启大额分红模式，每天收益不间断!'
            }).then(() => {
              this.$router.push('/invest')
            })
            return
          }
          // loadInteraction()
          showLoadingToast({
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
          })
          let arr = [reqAdvertisingCount(), reqAdvertisingSinglePrice()]
          Promise.all(arr)
            .then((res) => {
              closeToast()
              let todayCount = res[0]?.data?.ordinary
              let price = res[1]?.data?.price
              if (res[0].code !== 200) {
                todayCount = 100
              }
              if (res[1].code !== 200) {
                price = -1
              }
              nextTick(() => {
                loadShortVideo({
                  todayCount: todayCount,
                  price,
                  isVip: type === 3
                })
              })
            })
            .catch(() => {
              closeToast()

              nextTick(() => {
                loadShortVideo({
                  todayCount: 100,
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
    //background: white !important;
    //color: #000 !important;
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
        white-space: nowrap;
        color: #9f8b8b;
        margin-top: 4px;
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
