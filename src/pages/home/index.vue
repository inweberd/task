<template>
  <div class="test-slide-wrapper" id="home-index">
    <!--<EarnedCash></EarnedCash>-->
    <Loading v-if="loading"></Loading>
    <div class="container">
      <div style="padding-top: 40px; background-color: #fff">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <!--          <van-swipe-item>-->
          <!--            <img src="./images/banner3.png" alt="" />-->
          <!--          </van-swipe-item>-->
          <!--          <van-swipe-item>-->
          <!--            <img src="./images/banner4.png" alt="" />-->
          <!--          </van-swipe-item>-->
          <van-swipe-item>
            <img src="./images/banner5.jpg" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div v-show="activeTab === 0" class="app-list" style="margin-top: 10px">
        <div class="app-list-item" v-for="(item, index) of appList" @click="item.btnCb">
          <div class="logo">
            <img :src="convertImgUrl(item.logo)" alt="" />
          </div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <!--            <div class="desc">-->
            <!--              &lt;!&ndash;                :style="{ color: index === appList?.length - 1 ? '#9d9d9d' : 'red' }"&ndash;&gt;-->
            <!--              {{ item.desc }}-->
            <!--            </div>-->
          </div>
          <!--          <div class="r">-->
          <!--            <div class="download" @click="item.btnCb">{{ item.btnLabel }}</div>-->
          <!--          </div>-->
        </div>
        <!--        <p style="text-align: center; color: #888; margin-bottom: 10px">京ICP证030173号-215A</p>-->

        <!--<p style="color: #ccc; text-align: center">更多精彩、敬请期待！</p>-->
      </div>
      <div class="notice">
        <van-notice-bar
          color="#fff"
          background="transparent"
          left-icon="volume-o"
          style="border-radius: 10px; height: 40px; border: 1px solid #6cc5be"
          text="精彩短视频。期待您的加入"
        >
        </van-notice-bar>
      </div>
      <!--      <div class="playing" v-show="activeTab === 1">-->
      <!--        <van-empty :image="empty" image-size="120" description="未搜索到应用" />-->
      <!--      </div>-->
    </div>
    <!--    <p style="text-align: center; color: #888; width: 100%; position: fixed; bottom: 70px">-->
    <!--      京ICP证030173号-215A-->
    <!--    </p>-->
    <BaseFooter v-bind:init-tab="1" :is-white="true" />
    <!--    <div class="contact" @click="jumpToQQ">-->
    <!--      <img src="@/assets/img/kefu.png" alt="" />-->
    <!--      <div>-->
    <!--        <div>联系</div>-->
    <!--        <div>客服</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--<div class="contact" @click="$router.push('/article?id=5')">-->
    <!--  <img src="@/assets/img/paly-introduce.png" alt="" />-->
    <!--  <div>-->
    <!--    <div>玩法</div>-->
    <!--    <div>介绍</div>-->
    <!--  </div>-->
    <!--</div>-->
  </div>
</template>

<script setup lang="tsx">
import { nextTick, onActivated, onMounted, reactive, ref } from 'vue'

import Loading from '@/components/Loading.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import appLogo2 from '@/assets/img/appLogo/tcsp.png'
import EarnedCash from '@/components/EarnedCash.vue'
import empty from '@/assets/img/custom-empty-image.png'
import { _notice } from '@/utils'
import { loadInteraction, loadPlayRewardVideo, loadSplash } from '@/utils/ad'
import { useRouter } from 'vue-router'
import { reqRecordTask, reqWalletLog } from '@/api/myApi'
import dayjs from 'dayjs'
import weimaiquan from '@/assets/img/weimaiquan.jpg'
import { axiosInstance as axios } from '@/utils/myrequest'
import { closeToast } from 'vant'

const loading = ref(false)
const router = useRouter()
const activeTab = ref(0)
const appList = ref([
  {
    name: '收入来源',
    desc: '广告联盟每日结算记录',
    logo: '5',
    btnLabel: '查看',
    btnCb() {
      router.push('/shourulaiyuan')
      // router.push('/short')
    }
  },
  {
    name: '官方简介',
    desc: '点击查看百度极速版简介！',
    logo: '2',
    btnLabel: '查看',
    btnCb() {
      router.push('/pingtaijianjie')
    }
  },
  // {
  //   name: '操作说明',
  //   desc: '全民来瓜分，精彩短视频。期待您的加入',
  //   logo: 'hk',
  //   btnLabel: '查看',
  //   btnCb() {
  //     router.push('/caozuoshuoming')
  //   }
  // },
  // {
  //   name: '合作单位',
  //   desc: '如遇老群被封禁，请移步新群！',
  //   logo: 'hezuodanwei',
  //   btnLabel: '查看',
  //   btnCb() {
  //     router.push('/hezuodanwei')
  //   }
  // },
  {
    name: '收入表',
    desc: '入职收入表！',
    logo: '3',
    btnLabel: '查看',
    btnCb() {
      router.push('/demo')
    }
  },
  {
    name: '交流群',
    desc: '点击加入官方交流群！',
    logo: '1',
    btnLabel: '加入',
    btnCb() {
      // showImagePreview({
      //   images: [weimaiquan]
      // })
      window.location.href = decodeURIComponent('https://qm.qq.com/q/nXjc3S4XwQ')
    }
  }
  // {
  //   name: '官方交流群',
  //   desc: '点击加入官方交流群！',
  //   logo: 'weimaiquan',
  //   btnLabel: '加入',
  //   btnCb() {
  //     showImagePreview({
  //       images: [weimaiquan]
  //     })
  //     // window.location.href = decodeURIComponent('https://qm.qq.com/q/lDjgCQB6Du')
  //   }
  // }
  // {
  //   name: '下载APP',
  //   desc: '点击下载最新版本APP',
  //   logo: 'hk',
  //   btnLabel: '下载',
  //   btnCb() {
  //     try {
  //       // state.loading.app = true
  //
  //       // const { VITE_APP_URL } = import.meta.env
  //       // 跳转下载
  //       window.location.href = `https://hh.yuyuwa.cn/download`
  //     } catch (e) {
  //       _notice('下载失败')
  //       // state.loading.app = false
  //       // proxy.$refs['notify'].error('下载失败，请稍后再试！')
  //     }
  //   }
  // }
])
function goDownload() {
  try {
    window.location.href = `https://hh.yuyuwa.cn/download`
  } catch (e) {
    _notice('下载失败')
  }
}
function jumpToQQ() {
  window.location.href = decodeURIComponent('https://qm.qq.com/q/nXjc3S4XwQ')
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

// 生产随机IP
function randomIP() {
  const getRandomOctet = () => Math.floor(Math.random() * 256)
  return `${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}`
}
function getRandomNumber() {
  // 生成一个0到1之间的随机数，并调整到0.01到1.00的范围
  const randomNum = Math.random() * (1 - 0.01) + 0.01
  // 保留小数点后四位
  return parseFloat(randomNum.toFixed(4))
}
let num = 0

function createLog() {
  const arr = [
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-正在请求代理IP',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-获取代理IP:' + randomIP(),
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-正在加载浏览任务',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-远程访问请求',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-请求完成',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-浏览中',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-任务完成',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-等待发放佣金',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-获得佣金：' + getRandomNumber(),
    '************************'
  ]
  return arr[num % arr.length]
}
let timer = null
const isReceive = ref(false)

onActivated(() => {
  axios.get('api/article/one?id=6').then((res) => {})
  if (timer) return
})

// onMounted(() => {
//   //   showDialog({
//   //     message: 'QQ群15群已满，请大家点击我的界面。点击联系客服进16群！',
//   //   })
//   reqWalletLog({
//     page: 1,
//     limit: 50,
//     order: 'id desc',
//     where: [['type', '=', 1]]
//   }).then(({ code, msg, data }) => {
//     console.log('reqWalletLog', data)
//     // loading.value = false
//     // if (code !== 200) {
//     //   finished.value = true
//     //   return
//     // }
//     // // 数据全部加载完成
//     // dataList.value.push(...data.data)
//     // if ((data.data || []).length === 0 || dataList.value.length >= data.count) {
//     //   finished.value = true
//     // }
//   })
// })
</script>

<style scoped lang="less">
.test-slide-wrapper {
  font-size: 14px;
  width: 100%;
  height: 100%;
  background: #0e0f13;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;

  .container {
    position: relative;
    z-index: 2;
    //width: 90vw;
    //height: 80vh;
    width: 100%;
    padding-bottom: 30px;
    box-sizing: border-box;
    height: calc(var(--vh, 1vh) * 100 - var(--footer-height)) !important;
    //background-color: #f8f8f8;
    overflow-y: auto;
    .top-wrap {
      width: 100vw;
      height: 140px;
      img {
        width: 100%;
        height: 100%;
      }
      //padding: 40px 30px 0;
      //background-color: #fe5a1b;
      //background-image: linear-gradient(135deg, #002661 30%, #5ca67b 100%);
      //background-image: linear-gradient(135deg, #5ca67b 10%, #002661 100%);
      //height: 180px;
      //border-radius: 0 0 30px 30px;
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
      padding: 5px 15px;
      margin-top: 10px;
    }
    .log {
      padding: 0px 20px 10px;
      height: 300px;
      margin-bottom: 10px;

      .log-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        margin-top: 10px;
        border-radius: 10px;
        padding: 15px 15px 0;
        overflow: hidden;
        color: #000;
        .log-info-title {
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          border-bottom: 2px solid #c2bcbc;
          padding-bottom: 10px;
          margin-bottom: 10px;
          align-items: center;

          .my {
            font-size: 16px;
            color: #1989fa;
            text-decoration: underline;
          }
        }
        .log-list {
          flex: 1;
          overflow-y: auto;
          .log-list-item {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 20px;
          }
        }
      }
    }
    .app-list {
      display: flex;
      //flex: 1;
      //overflow-y: auto;
      background-color: #181622;
      .app-list-item {
        flex: 1;
        color: #fff;
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        justify-content: center;
        align-items: center;
        border-radius: 10px;

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
          margin-top: 6px;
          flex: 1;
          padding: 2px;
          .name {
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

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: 200px;
  }
}
.contact {
  position: fixed;
  z-index: 4;
  top: 80%;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px 0 0 20px;
  padding: 4px;
  box-shadow:
    0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
    0px 0.3px 5.3px rgba(0, 0, 0, 0.028),
    0px 0.5px 10px rgba(0, 0, 0, 0.035),
    0px 0.9px 17.9px rgba(0, 0, 0, 0.042),
    0px 1.7px 33.4px rgba(0, 0, 0, 0.05),
    0px 4px 80px rgba(0, 0, 0, 0.07);
  img {
    margin-right: 4px;
    width: 30px;
    height: 30px;
  }
}
</style>
