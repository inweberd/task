<template>
  <div class="test-slide-wrapper" id="home-index">
    <!--<EarnedCash></EarnedCash>-->
    <Loading v-if="loading"></Loading>
    <div class="container">
      <div class="top-wrap" style="padding-top: 40px; background-color: #feab03">
        <img src="./images/banner3.jpg" alt="" />
        <!--<div class="title">-->
        <!--  <div class="title-l">Kwai乐租</div>-->
        <!--  <div class="title-r"></div>-->
        <!--</div>-->
        <!--<div class="tab">-->
        <!--  <div class="tab-item" :class="{ active: activeTab === 0 }" @click="activeTab = 0">-->
        <!--    发现-->
        <!--  </div>-->
        <!--  <div class="tab-item" :class="{ active: activeTab === 1 }" @click="activeTab = 1">-->
        <!--    我在玩-->
        <!--  </div>-->
        <!--</div>-->
      </div>
      <div class="notice">
        <van-notice-bar
          color="#fff"
          background="#F76F31"
          left-icon="volume-o"
          style="border-radius: 25px; height: 30px"
          text="kwai-乐租，精彩短视频。期待您的加入"
        >
        </van-notice-bar>
        <!--<van-notice-bar-->
        <!--  color="#fff"-->
        <!--  background="#F76F31"-->
        <!--  left-icon="volume-o"-->
        <!--  style="border-radius: 25px; height: 30px"-->
        <!--  :scrollable="false"-->
        <!--&gt;-->
        <!--  <van-swipe-->
        <!--    vertical-->
        <!--    class="notice-swipe"-->
        <!--    style="height: 40px; line-height: 40px"-->
        <!--    :autoplay="3000"-->
        <!--    :touchable="false"-->
        <!--    :show-indicators="false"-->
        <!--  >-->
        <!--    <van-swipe-item>明月直入，无心可猜。</van-swipe-item>-->
        <!--    <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>-->
        <!--    <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>-->
        <!--  </van-swipe>-->
        <!--</van-notice-bar>-->
      </div>
      <div class="log">
        <div class="log-info">
          <div class="log-info-title">
            <div>
              <van-icon name="clock" color="#666" style="margin-right: 6px" />
              <span style="color: #666">工作日志</span>
            </div>
            <!--<div class="my" @click="$router.push('myServe')">我的服务器</div>-->
            <div class="my" @click="$router.push('/invest')">我的服务器</div>
          </div>
          <div class="log-list" ref="logListRef">
            <van-empty
              image-size="100"
              description="请进入我的服务器页面点击赚钱，开始运行服务器！"
              v-if="!logList.length"
            />
            <div class="log-list-item" v-for="item of logList">
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 0" class="app-list">
        <div class="app-list-item" v-for="(item, index) of appList">
          <div class="l">
            <div class="logo">
              <img :src="convertImgUrl(item.logo)" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div
                class="desc"
                :style="{ color: index === appList?.length - 1 ? '#9d9d9d' : 'red' }"
              >
                {{ item.desc }}
              </div>
            </div>
          </div>
          <div class="r">
            <div class="download" @click="item.btnCb">{{ item.btnLabel }}</div>
          </div>
        </div>
        <!--<p style="color: #ccc; text-align: center">更多精彩、敬请期待！</p>-->
      </div>

      <div class="playing" v-show="activeTab === 1">
        <van-empty :image="empty" image-size="120" description="未搜索到应用" />
      </div>
    </div>
    <BaseFooter v-bind:init-tab="1" :is-white="true" />

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

const loading = ref(false)
const router = useRouter()
const activeTab = ref(0)
const appList = ref([
  // {
  //   name: '乐租',
  //   desc: '这款APP真的可以免费提现!',
  //   logo: 'lz',
  //   btnLabel: '下载',
  //   btnCb() {
  //     try {
  //       window.location.href = `https://pk.yuyuwa.cn/download`
  //     } catch (e) {
  //       _notice('下载失败')
  //     }
  //   }
  // },

  // {
  //   name: '团队长群',
  //   desc: '团队长专线群!',
  //   logo: 'qq',
  //   btnLabel: '团队长1群',
  //   btnCb() {
  //     window.location.href = decodeURIComponent('https://qm.qq.com/q/NV59IlgLku')
  //     // const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent)
  //     // if (isIos) {
  //     //   window.location.href = decodeURIComponent('https://qm.qq.com/q/XtPKFbzikG')
  //     // } else {
  //     //   window.location.href = decodeURIComponent('http://kfa.vbxv.com.cn/download/index.html')
  //     // }
  //   }
  // },
  // {
  //   name: '官方3群',
  //   desc: '如遇老群被封禁，请移步新群！',
  //   logo: 'qq',
  //   btnLabel: '官方3群',
  //   btnCb() {
  //     window.location.href = decodeURIComponent('https://qm.qq.com/q/lDjgCQB6Du')
  //   }
  // },
  {
    name: '官方4群',
    desc: '如遇老群被封禁，请移步新群！',
    logo: 'qq',
    btnLabel: '官方4群',
    btnCb() {
      window.location.href = decodeURIComponent('https://qm.qq.com/q/Ec4XGVlDmE')
    }
  },
  {
    name: '官方5群',
    desc: '如遇老群被封禁，请移步新群！',
    logo: 'qq',
    btnLabel: '官方5群',
    btnCb() {
      window.location.href = decodeURIComponent('https://qm.qq.com/q/eU1zhFLM8o')
    }
  },
  {
    name: '官方6群',
    desc: '如遇老群被封禁，请移步新群！',
    logo: 'qq',
    btnLabel: '官方6群',
    btnCb() {
      window.location.href = decodeURIComponent('https://qm.qq.com/q/9DSckkLCeY')
    }
  },
  {
    name: '玩法介绍',
    desc: 'kwai-乐租，精彩短视频。期待您的加入',
    logo: 'lz',
    btnLabel: '查看',
    btnCb() {
      router.push('/article?id=5')
    }
  }
  // {
  //   name: '甜橙斗猿场',
  //   desc: '甜橙斗猿场，一夜暴富',
  //   logo: 'dyc',
  //   btnLabel: '一夜暴富',
  //   btnCb() {
  //     router.push('/gameNoFinish?type=dyc')
  //   }
  // },
  // {
  //   name: '甜橙大逃杀',
  //   desc: '甜橙大逃杀，一夜暴富',
  //   logo: 'dts',
  //   btnLabel: '一夜暴富',
  //   btnCb() {
  //     router.push('/gameNoFinish?type=dts')
  //   }
  // },
  // {
  //   name: '甜橙夹娃娃',
  //   desc: '甜橙夹娃娃，一夜暴富',
  //   logo: 'jww',
  //   btnLabel: '一夜暴富',
  //   btnCb() {
  //     router.push('/gameNoFinish?type=jww')
  //   }
  // }
])
function goDownload() {
  try {
    window.location.href = `https://pk.yuyuwa.cn/download`
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

const logListRef = ref()

const logList = ref([])

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
const setLog = () => {
  logList.value.push('已开始运行!')
  timer = setInterval(() => {
    if (num > 30) {
      logList.value.shift()
    }
    logList.value.push(createLog())
    num++
    nextTick(() => {
      logListRef.value.scrollTop += logListRef.value.scrollHeight
    })
  }, 300)
}

onActivated(() => {
  if (timer) return
  reqRecordTask().then((res) => {
    if (res.code === 400 && res.msg === '本日的红包已领完！') {
      setLog()
    }
  })
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
  background: #f8f8f8;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;

  .container {
    //width: 90vw;
    //height: 80vh;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - var(--footer-height)) !important;
    //background-color: #f8f8f8;
    overflow-y: auto;
    .top-wrap {
      width: 100vw;
      height: 300px;
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
        background-color: #ffffff;
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
            flex: 1;
            margin-left: 6px;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
              font-size: 16px;
              color: #000000;
            }
            .desc {
              color: #9d9d9d;
            }
          }
        }
        .r {
          .download {
            padding: 8px 18px;
            background-color: #fd3b31;
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
.contact {
  position: fixed;
  top: 50%;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fc7a02;
  border-radius: 20px 0 0 20px;
  padding: 4px;
  color: #fff;
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
