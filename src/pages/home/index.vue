<template>
  <div class="test-slide-wrapper" id="home-index">
    <EarnedCash></EarnedCash>
    <Loading v-if="loading"></Loading>
    <div class="container">
      <div class="top-wrap">
        <div class="title">
          <div class="title-l">甜橙视频</div>
          <div class="title-r"></div>
        </div>
        <div class="tab">
          <div class="tab-item" :class="{ active: activeTab === 0 }" @click="activeTab = 0">
            发现
          </div>
          <div class="tab-item" :class="{ active: activeTab === 1 }" @click="activeTab = 1">
            我在玩
          </div>
        </div>
      </div>
      <div class="notice">
        <van-notice-bar
          color="#1989fa"
          background="#ecf9ff"
          left-icon="volume-o"
          style="border-radius: 25px; height: 30px"
          text="甜橙视频--2024全新无限代火爆招商中……"
        >
        </van-notice-bar>
      </div>
      <div v-show="activeTab === 0" class="app-list">
        <div class="app-list-item" v-for="item of appList">
          <div class="l">
            <div class="logo">
              <img :src="convertImgUrl(item.logo)" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
          </div>
          <div class="r">
            <div class="download" @click="item.btnCb">{{ item.btnLabel }}</div>
          </div>
        </div>
        <p style="color: #ccc; text-align: center">更多精彩、敬请期待！</p>
      </div>

      <div class="playing" v-show="activeTab === 1">
        <van-empty :image="empty" image-size="120" description="未搜索到应用" />
      </div>
    </div>
    <BaseFooter v-bind:init-tab="1" :is-white="false" />
  </div>
</template>

<script setup lang="tsx">
import { onActivated, onMounted, ref } from 'vue'

import Loading from '@/components/Loading.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import appLogo2 from '@/assets/img/appLogo/tcsp.png'
import EarnedCash from '@/components/EarnedCash.vue'
import empty from '@/assets/img/custom-empty-image.png'
import { _notice } from '@/utils'
import { loadInteraction, loadPlayRewardVideo, loadSplash } from '@/utils/ad'
import { useRouter } from 'vue-router'

const show = ref(false)
const loading = ref(false)
const router = useRouter()
const activeTab = ref(0)
const appList = ref([
  {
    name: '甜橙视频',
    desc: '这款APP真的可以免费提现!',
    logo: 'tcsp',
    btnLabel: '下载',
    btnCb() {
      try {
        window.location.href = `https://tcc.ebayser.com/download`
      } catch (e) {
        _notice('下载失败')
      }
    }
  },
  {
    name: '官方QQ群',
    desc: '有问题咨询客服!',
    logo: 'qq',
    btnLabel: '联系客服',
    btnCb() {
      window.location.href = decodeURIComponent('https://qm.qq.com/q/rfYONthKYq')
    }
  },
  {
    name: '甜橙斗猿场',
    desc: '甜橙斗猿场，一夜暴富',
    logo: 'dyc',
    btnLabel: '一夜暴富',
    btnCb() {
      router.push('/gameNoFinish?type=dyc')
    }
  },
  {
    name: '甜橙大逃杀',
    desc: '甜橙大逃杀，一夜暴富',
    logo: 'dts',
    btnLabel: '一夜暴富',
    btnCb() {
      router.push('/gameNoFinish?type=dts')
    }
  },
  {
    name: '甜橙夹娃娃',
    desc: '甜橙夹娃娃，一夜暴富',
    logo: 'jww',
    btnLabel: '一夜暴富',
    btnCb() {
      router.push('/gameNoFinish?type=jww')
    }
  }
])
function goDownload() {
  try {
    window.location.href = `https://tcc.ebayser.com/download`
  } catch (e) {
    _notice('下载失败')
  }
}
function jumpToQQ() {
  window.location.href = decodeURIComponent('https://qm.qq.com/q/rfYONthKYq')
  // loadInteraction()
  // loadSplash()
  // loadPlayRewardVideo(() => {
  //   alert(111)
  // })
}

const convertImgUrl = (iconUrl: string) => {
  // return new URL(`./images/${iconUrl}.png`, import.meta.url).href
  return new URL(`../../assets/img/appLogo/${iconUrl}.png`, import.meta.url).href
}
onActivated(() => {
  show.value = false
})
onMounted(() => {
  showDialog({
    message: 'QQ群15群已满，请大家点击我的界面。点击联系客服进16群！',
    theme: 'round-button'
  })
})
</script>

<style scoped lang="less">
.test-slide-wrapper {
  font-size: 14px;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;

  .container {
    //width: 90vw;
    //height: 80vh;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - var(--footer-height)) !important;
    overflow: hidden;
    //background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    .top-wrap {
      padding: 40px 30px 0;
      //background-color: #fe5a1b;
      background-image: linear-gradient(135deg, #002661 30%, #5ca67b 100%);
      //background-image: linear-gradient(135deg, #5ca67b 10%, #002661 100%);

      //height: 180px;
      border-radius: 0 0 30px 30px;
      .title {
        .title-l {
          font-weight: bolder;
          font-size: 30px;
          color: #ffffff;
          transform: skewX(-15deg);
        }
      }
      .tab {
        margin-top: 20px;
        display: flex;
        font-size: 20px;
        margin-left: 20px;
        color: #cec6c6;
        .tab-item {
          margin-right: 30px;
          height: 50px;
          position: relative;
          &.active {
            font-size: 24px;
            color: #eee;

            &:after {
              position: absolute;
              content: '';
              display: block;
              border: 8px solid transparent;
              border-bottom-color: #fff;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
    .notice {
      padding: 15px 30px;
    }
    .app-list {
      flex: 1;
      overflow-y: auto;
      padding: 0px 20px 10px;
      .app-list-item {
        background-color: #151724;
        display: flex;
        margin-bottom: 10px;
        padding: 10px 15px;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;

        .l {
          display: flex;
          .logo {
            width: 55px;
            height: 55px;
            overflow: hidden;
            border-radius: 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            margin-left: 6px;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
              font-size: 16px;
              color: #fff;
            }
            .desc {
              color: #bbb;
            }
          }
        }
        .r {
          .download {
            padding: 8px 18px;
            background-color: #ff3b32;
            color: #fff;
            border-radius: 20px;
            font-size: 12px;
          }
        }
      }
    }
    .playing {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
