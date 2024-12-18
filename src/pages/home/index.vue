<template>
  <div class="test-slide-wrapper" id="home-index">
    <!--<EarnedCash></EarnedCash>-->
    <Loading v-if="loading"></Loading>
    <div class="container">
      <div :style="containerStyle" style="background-color: #fff">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <!--          <van-swipe-item>-->
          <!--            <img src="./images/banner3.png" alt="" />-->
          <!--          </van-swipe-item>-->
          <!--          <van-swipe-item>-->
          <!--            <img src="./images/banner4.png" alt="" />-->
          <!--          </van-swipe-item>-->
          <van-swipe-item>
            <img src="./images/banner6.png" alt="" />
          </van-swipe-item>
          <!--          <van-swipe-item>-->
          <!--            <img src="./images/banner1.png" alt="" />-->
          <!--          </van-swipe-item>-->
        </van-swipe>
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
      <div v-show="activeTab === 0" class="app-list" style="margin-top: 10px">
        <div class="app-list-item" v-for="(item, index) of appList">
          <div class="l">
            <div class="logo">
              <img :src="convertImgUrl(item.logo)" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="desc">
                <!--                :style="{ color: index === appList?.length - 1 ? '#9d9d9d' : 'red' }"-->
                {{ item.desc }}
              </div>
            </div>
          </div>
          <div class="r">
            <div class="download" @click="item.btnCb">{{ item.btnLabel }}</div>
          </div>
        </div>
        <!--        <p style="text-align: center; color: #888; margin-bottom: 10px">京ICP证030173号-215A</p>-->

        <!--<p style="color: #ccc; text-align: center">更多精彩、敬请期待！</p>-->
      </div>

      <!--      <div class="playing" v-show="activeTab === 1">-->
      <!--        <van-empty :image="empty" image-size="120" description="未搜索到应用" />-->
      <!--      </div>-->
    </div>
    <!--    <van-image :src="imageSrc1" width="100%" height="280" fit="fill"></van-image>-->

    <p style="text-align: center; color: #888; width: 100%; position: fixed; bottom: 70px">
      京ICP备12025439号
    </p>
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
    <van-overlay :show="showGonggaoOverlay" :z-index="99999999">
      <div class="wrapper" @click.stop>
        <div class="update-box">
          <img src="@/assets/img/update.png" alt="" />
          <div class="title">系统公告</div>
          <div style="padding: 0 20px">
            <p style="text-indent: 22px">
              体验用户，一机1号，每天刷视频，分红1元，永久有效！
              多个账号切换在同一台手机设备登录，只有1个账号有收益
              严厉打击恶意批量注册工作室小号拉低整体广告收益单价！
              发现恶意机刷一律封禁账号，切勿抱有侥幸心理！
            </p>
            <p style="text-align: right; margin-top: 10px">全民来瓜分运营部</p>
          </div>
          <el-button
            color="#689cfc"
            size="large"
            style="border-radius: 20px; margin-top: 30px !important; color: #fff; width: 80%"
            @click="showGonggaoOverlay = false"
            >朕已阅
          </el-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="tsx">
import { computed, nextTick, onActivated, onMounted, reactive, ref } from 'vue'

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
import imageSrc1 from '@/assets/img/hehuoren.jpg'
const showGonggaoOverlay = ref(false)

const containerStyle = computed(() => {
  if (window.android) {
    return { paddingTop: '40px' }
  } else {
    return {}
  }
})
const loading = ref(false)
const router = useRouter()
const activeTab = ref(0)
const appList = ref([
  {
    name: '每日广告收入来源',
    desc: '查看每日广告收入来源',
    logo: '5',
    btnLabel: '查看',
    btnCb() {
      router.push('/shourulaiyuan')
      // router.push('/short')
    }
  },
  // {
  //   name: '官方简介',
  //   desc: '点击查看简介！',
  //   logo: '2',
  //   btnLabel: '查看',
  //   btnCb() {
  //     router.push('/pingtaijianjie')
  //   }
  // },
  {
    name: '主播扶持政策',
    desc: '点击查看主播扶持政策！',
    logo: '6',
    btnLabel: '查看',
    btnCb() {
      router.push('/zhubofuchizhengce')
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
  // {
  //   name: '推广佣金制度',
  //   desc: '推广制度',
  //   logo: '3',
  //   btnLabel: '查看',
  //   btnCb() {
  //     router.push('/demo')
  //   }
  // },
  {
    name: '超级大赢家',
    desc: '查看超级大赢家',
    logo: '9',
    btnLabel: '查看',
    btnCb() {
      router.push('/quanminlaibaojiang')
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
      // window.location.href = decodeURIComponent('https://qm.qq.com/q/nXjc3S4XwQ')
      // window.location.href = 'https://dd.kkwai.cn/download/android.apk'
      router.push('/weimaiquanDetail')
    }
  },
  {
    name: '每周分红奖池',
    desc: '点击查看每周分红奖池！',
    logo: '7',
    btnLabel: '查看',
    btnCb() {
      router.push('/fenhong')
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
  //       window.location.href = `https://fx.yuyuwa.cn/download`
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
    window.location.href = `https://fx.yuyuwa.cn/download`
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
onMounted(() => {
  // showGonggaoOverlay.value = true
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
      //flex: 1;
      //overflow-y: auto;
      padding: 0px 20px 10px;
      .app-list-item {
        //background-color: #ffffff;
        background-image: linear-gradient(135deg, #414138 10%, #272d65 100%);

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
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            flex: 1;
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
              color: #9d9d9d;
            }
          }
        }
        .r {
          .download {
            padding: 8px 18px;
            background-color: #689cfc;
            color: #fff;
            border-radius: 20px;
            font-size: 12px;
            white-space: nowrap;
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
