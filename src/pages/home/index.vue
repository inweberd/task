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
          style="border-radius: 25rem; height: 30rem"
          text="甜橙视频--2024全新无限代火爆招商中……"
        >
        </van-notice-bar>
      </div>
      <div v-show="activeTab === 0" class="app-list">
        <div class="app-list-item">
          <div class="l">
            <div class="logo">
              <img src="@/assets/img/appLogo/logo2.png" alt="" />
            </div>
            <div class="info">
              <div class="name">甜橙视频</div>
              <div class="desc">这款APP真的可以免费提现!</div>
            </div>
          </div>
          <div class="r">
            <div class="download" @click="goDownload">下载</div>
          </div>
        </div>
        <div class="app-list-item">
          <div class="l">
            <div class="logo">
              <img src="@/assets/img/appLogo/qq.png" alt="" />
            </div>
            <div class="info">
              <div class="name">加入我们</div>
              <div class="desc">有问题咨询客服！</div>
            </div>
          </div>
          <div class="r">
            <div class="download" @click="jumpToQQ">加入</div>
          </div>
        </div>
        <p style="color: #ccc; text-align: center">更多精彩、敬请期待！</p>
        <div class="app-list-item" v-for="item of appList">
          <div class="l">
            <div class="logo">
              <img :src="item.logo" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
          </div>
          <div class="r">
            <div class="download">敬请期待</div>
          </div>
        </div>
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
import appLogo from '@/assets/img/appLogo/logo.png'
import appLogo2 from '@/assets/img/appLogo/logo2.png'
import EarnedCash from '@/components/EarnedCash.vue'
import empty from '@/assets/img/custom-empty-image.png'
import { _notice } from '@/utils'
import { loadInteraction, loadPlayRewardVideo, loadSplash } from '@/utils/ad'

const show = ref(false)
const loading = ref(false)
const activeTab = ref(0)
const appList = ref([
  // {
  //   name: '甜橙视频',
  //   desc: '这款app真的免费提现!',
  //   logo: appLogo
  // }
])
function goDownload() {
  try {
    window.location.href = `https://onze.nzsvj.cn/download`
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
  font-size: 14rem;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;

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
      padding: 40rem 30rem 0;
      //background-color: #fe5a1b;
      background-image: linear-gradient(135deg, #002661 30%, #5ca67b 100%);
      //background-image: linear-gradient(135deg, #5ca67b 10%, #002661 100%);

      //height: 180rem;
      border-radius: 0 0 30rem 30rem;
      .title {
        .title-l {
          font-weight: bolder;
          font-size: 30px;
          color: #ffffff;
          transform: skewX(-15deg);
        }
      }
      .tab {
        margin-top: 20rem;
        display: flex;
        font-size: 20px;
        margin-left: 20rem;
        color: #cec6c6;
        .tab-item {
          margin-right: 30rem;
          height: 50px;
          position: relative;
          &.active {
            font-size: 24px;
            color: #eee;

            &:after {
              position: absolute;
              content: '';
              display: block;
              border: 8rem solid transparent;
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
      padding: 15rem 30rem;
    }
    .app-list {
      flex: 1;
      overflow-y: auto;
      padding: 0rem 20rem 10rem;
      .app-list-item {
        background-color: #151724;
        display: flex;
        margin-bottom: 10rem;
        padding: 10rem 15rem;
        justify-content: space-between;
        align-items: center;
        border-radius: 10rem;

        .l {
          display: flex;
          .logo {
            width: 55rem;
            height: 55rem;
            overflow: hidden;
            border-radius: 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            margin-left: 6rem;
            padding: 2rem;
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
            padding: 8rem 18rem;
            background-color: #ff3b32;
            color: #fff;
            border-radius: 20rem;
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
