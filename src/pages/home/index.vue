<template>
  <div id="home-index" class="test-slide-wrapper">
    <!--<EarnedCash></EarnedCash>-->
    <Loading v-if="loading"></Loading>
    <div class="container">
      <div :style="containerStyle" style="background-color: #fff">
        <van-swipe v-if="false" :autoplay="3000" class="my-swipe" indicator-color="white">
          <!--          <van-swipe-item>-->
          <!--            <img src="./images/banner3.png" alt="" />-->
          <!--          </van-swipe-item>-->
          <!--          <van-swipe-item>-->
          <!--            <img src="./images/banner4.png" alt="" />-->
          <!--          </van-swipe-item>-->
          <!--          <van-swipe-item>-->
          <!--            <img src="./images/banner6.png" alt="" />-->
          <!--          </van-swipe-item>-->
          <!--          <van-swipe-item>-->
          <!--            <van-image :src="imageSrc6" width="100%" height="200" fit="fill"></van-image>-->
          <!--          </van-swipe-item>-->
          <van-swipe-item>
            <img alt="" src="./images/banner7.jpg" />
          </van-swipe-item>
          <van-swipe-item>
            <img alt="" src="./images/banner8.jpg" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="notice">
        <van-notice-bar
          background="transparent"
          color="#fff"
          left-icon="volume-o"
          style="border-radius: 10px; height: 40px; border: 1px solid #fff"
          text="汇盈传媒欢迎您，邀请好友赚翻天，现金奖励无上限！"
        >
        </van-notice-bar>

        <!--        <van-notice-bar-->
        <!--          :scrollable="false"-->
        <!--          color="red"-->
        <!--          background="transparent"-->
        <!--          left-icon="volume-o"-->
        <!--          style="border-radius: 10px; height: 40px; border: 1px solid #ff8e7d; line-height: 40px"-->
        <!--        >-->
        <!--          <van-swipe-->
        <!--            style="height: 40px; line-height: 40px"-->
        <!--            vertical-->
        <!--            class="notice-swipe"-->
        <!--            :autoplay="1000"-->
        <!--            :touchable="false"-->
        <!--            :show-indicators="false"-->
        <!--          >-->
        <!--            <van-swipe-item v-for="item of scrollContent">{{ item }}</van-swipe-item>-->
        <!--          </van-swipe>-->
        <!--        </van-notice-bar>-->

        <!--        <t-notice-bar-->
        <!--          v-if="!scrollContent.length"-->
        <!--          visible-->
        <!--          content="精彩短视频。期待您的加入"-->
        <!--          class="notice-class"-->
        <!--        >-->
        <!--          <template #prefixIcon>-->
        <!--            <van-icon name="volume-o" color="#666" size="18" style="margin-top: 2px" />-->
        <!--          </template>-->
        <!--        </t-notice-bar>-->
        <!--        <t-notice-bar-->
        <!--          v-else-->
        <!--          class="notice-class"-->
        <!--          visible-->
        <!--          :marquee="{-->
        <!--            speed: 10000-->
        <!--          }"-->
        <!--          :content="scrollContent"-->
        <!--          direction="vertical"-->
        <!--        >-->
        <!--          <template #prefixIcon>-->
        <!--            <van-icon name="volume-o" color="#666" size="18" style="margin-top: 2px" />-->
        <!--          </template>-->
        <!--        </t-notice-bar>-->
      </div>
      <div class="bg"></div>
      <!--      <van-notice-bar-->
      <!--        left-icon="volume-o"-->
      <!--        text="汇盈传媒欢迎您，邀请好友赚翻天，现金奖励无上限！"-->
      <!--      />-->

      <div v-show="activeTab === 0" class="app-list" style="margin-top: 120px">
        <div v-for="(item, index) of appList" class="app-list-item" @click="item.btnCb">
          <div class="l">
            <div class="logo">
              <img :src="convertImgUrl(item.logo)" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <!--              <div class="desc">-->
              <!--                &lt;!&ndash;                :style="{ color: index === appList?.length - 1 ? '#9d9d9d' : 'red' }"&ndash;&gt;-->
              <!--                {{ item.desc }}-->
              <!--              </div>-->
            </div>
          </div>
          <div class="r">
            <!--            <div class="download" @click="item.btnCb">{{ item.btnLabel }}</div>-->
          </div>
        </div>
        <!--        <p style="text-align: center; color: #888; margin-bottom: 10px">京ICP证030173号-215A</p>-->

        <!--<p style="color: #ccc; text-align: center">更多精彩、敬请期待！</p>-->
      </div>
      <div class="big-title" style="margin-top: 10px">广告投放与创作者分成</div>

      <div class="shouyi-list">
        <div v-if="!isIos" class="item" @click="loadShort(1)">
          <div class="item-box">
            <div>普通用户广告投放</div>
            <div>特权：无特权</div>
            <div>日收益：固定0.5元</div>
          </div>
        </div>
        <div class="item" @click="loadShort(3)">
          <div class="item-box">
            <div>会员用户广告投放</div>
            <div>特权1：会员免看广告</div>
            <div>特权2： 享受4-10倍加速收益</div>
            <div>日收益：每日0.5-2%浮动</div>
          </div>
        </div>
        <div class="item" @click="$router.push('/rank')">
          <div class="item-box">
            <div>全网分红</div>
            <div>排行榜！</div>
<!--            <div style="position: absolute; left: 15px; bottom: 20px; font-size: 22px">-->
<!--              等待开启-->
<!--            </div>-->
          </div>
        </div>
        <div class="item">
          <div class="item-box">
            <div>佣金嘉奖</div>
            <div>每日佣金双倍奖！</div>
            <div style="position: absolute; left: 15px; bottom: 20px; font-size: 22px">
              等待开启
            </div>
          </div>
        </div>
      </div>
      <div v-if="false" class="shulist">
        <!--        <div class="shu-item">-->
        <!--          <div class="l">-->
        <!--            <div class="img-box">-->
        <!--              <img src="@/assets/img/up/CA.png" alt="" />-->
        <!--            </div>-->
        <!--            <div>-->
        <!--              <div>下载App</div>-->
        <!--              <div>点击下载，获取更高收益！</div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="r">-->
        <!--            <div @click="goDownload">下载</div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="shu-item">
          <div class="l">
            <div class="img-box">
              <img alt="" src="@/assets/img/up/CA.png" />
            </div>
            <div>
              <div>每周现金分红排行榜</div>
              <div>点击查看每周现金分红排行榜！</div>
            </div>
          </div>
          <div class="r">
            <div @click="$router.push('/rank')">详情</div>
          </div>
        </div>
        <div v-if="!isIos" class="shu-item">
          <div class="l">
            <div class="img-box">
              <img alt="" src="@/assets/img/up/CA.png" />
            </div>
            <div>
              <div>普通视频（0撸只刷视频,不养鸡）</div>
              <div>遇到广告直接X掉或跳过，每日获得1元！</div>
            </div>
          </div>
          <div class="r">
            <div @click="loadShort(1)">观看</div>
          </div>
        </div>
        <div class="shu-item">
          <div class="l">
            <div class="img-box">
              <img alt="" src="@/assets/img/up/CA.png" />
            </div>
            <div>
              <div>会员视频 <span style="color: red">（每日2.5 - 5000元）</span></div>
              <div>购买会员刷视频无广告，2分钟极速完成！</div>
            </div>
          </div>
          <div class="r">
            <div @click="loadShort(3)">观看</div>
          </div>
        </div>
        <div class="shu-item">
          <div class="l">
            <div class="img-box">
              <img alt="" src="@/assets/img/up/CA.png" />
            </div>
            <div>
              <div>一夜暴富--pg电子</div>
              <div>PG电子---拼手气---一夜暴富！</div>
            </div>
          </div>
          <div class="r">
            <div @click="handleGame">详情</div>
          </div>
        </div>
        <div class="shu-item">
          <div class="l">
            <div class="img-box">
              <img alt="" src="@/assets/img/up/CA.png" />
            </div>
            <div>
              <div>每周奖池分红规则</div>
              <div>点击查看每周奖池分红规则！</div>
            </div>
          </div>
          <div class="r">
            <div @click="$router.push('/fenhong')">详情</div>
          </div>
        </div>
      </div>

      <!--      <div class="playing" v-show="activeTab === 1">-->
      <!--        <van-empty :image="empty" image-size="120" description="未搜索到应用" />-->
      <!--      </div>-->
      <!--    <van-image :src="imageSrc1" width="100%" height="280" fit="fill"></van-image>-->
    </div>

    <BaseFooter :is-white="true" v-bind:init-tab="1" />
    <TipDialog
      v-model="showGonggaoOverlay"
      confirm-text="点击下载68扫码进群"
      @confirm="handleGonggaoConfirm"
    >
      <p
        style="
          transform: translateY(10px);
          text-align: center;
          font-size: 18px;
          color: #fff;
          font-weight: bolder;
        "
      >
        请使用68APP扫码进官方群
      </p>
      <div style="padding: 20px">
        <img alt="" src="@/assets/img/weimaiquan.jpg" style="width: 100%" />
      </div>
    </TipDialog>
    <TipDialog
      v-model="buyDialogShow"
      confirm-text="去开通"
      @confirm="
        () => {
          buyDialogShow = false
          $router.push('/invest')
        }
      "
    >
      <div style="padding: 20px; color: #fff; text-align: center">
        <p style="font-size: 18px; font-weight: bolder; margin-bottom: 10px">请先开通学徒特权！</p>
        <p>会员广告收入是普通广告的5-10倍加速收益，最低学徒特权可以进行加速收益！</p>
      </div>
    </TipDialog>

    <TipDialog
      v-model="shareDialogShow"
      :show-close="false"
      confirm-text="一键分享"
      @confirm="shareFriend"
    >
      <div style="padding: 20px; color: #fff">
        <p>一键分享朋友圈，开启每天轻松赚米！</p>
      </div>
    </TipDialog>
  </div>
</template>

<script lang="tsx" setup>
import { computed, nextTick, onActivated, onMounted, reactive, ref } from 'vue'

import Loading from '@/components/Loading.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import appLogo2 from '@/assets/img/appLogo/tcsp.png'
import empty from '@/assets/img/custom-empty-image.png'
import { _notice } from '@/utils'
import {
  loadInteraction,
  loadPlayRewardVideo,
  loadShortPlayVideo,
  loadShortVideo,
  loadSplash
} from '@/utils/ad'
import { useRouter } from 'vue-router'
import {
  reqAdvertisingCount,
  reqAdvertisingSinglePrice,
  reqNgPlay,
  reqNgTransfer,
  reqRecordTask,
  reqWalletLog,
  reqUserIncome
} from '@/api/myApi'
import dayjs from 'dayjs'
import { closeToast, showFailToast } from 'vant'
import { Toast } from 'tdesign-mobile-vue'

const showGonggaoOverlay = ref(false)
const handleGonggaoConfirm = () => {
  showGonggaoOverlay.value = false
  // window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.edujia.weimai'
  window.location.href = 'https://68chat5.com/cn/'
}
const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent)

const shareDialogShow = ref(false)
const buyDialogShow = ref(false)
const scrollContent = ref(['精彩短视频，超级好礼送不停，期待您的加入!'])
const containerStyle = computed(() => {
  // if (window.android && !window.android.hideBar) {
  //   return { paddingTop: '40px' }
  // } else {
  //   return {}
  // }
  return {}
})
const loading = ref(false)
const router = useRouter()
const activeTab = ref(0)
const appList = ref([
  {
    name: '参与方式 ',
    desc: '点击查看每周分红奖池！',
    logo: '6',
    btnLabel: '查看',
    btnCb() {
      router.push('/canyufangshi')
    }
  },
  // {
  //   name: '团队晋级奖励',
  //   desc: '点击查看代理佣金排行榜！',
  //   logo: '9',
  //   btnLabel: '加入',
  //   btnCb() {
  //     // showImagePreview({
  //     //   images: [weimaiquan]
  //     // })
  //     // window.location.href = 'https://api.onxxm900.cn/download/android.apk'
  //     router.push('/jiangliguize')
  //   }
  // },
  {
    name: '开通加速卡 ',
    desc: '点击查看每周分红奖池！',
    logo: '7',
    btnLabel: '查看',
    btnCb() {
      router.push('/invest')
    }
  },
  {
    name: '分享收入表',
    desc: '点击查看返佣海报！',
    logo: '8',
    btnLabel: '查看',
    btnCb() {
      // router.push('/zhubofuchizhengce')
      router.push('/demo')
    }
  }
  // {
  //   name: '收入来源',
  //   desc: '查看每日广告收入来源',
  //   logo: '9',
  //   btnLabel: '查看',
  //   btnCb() {
  //     router.push('/shourulaiyuan')
  //     // router.push('/short')
  //   }
  // },
  // {
  //   name: '官方简介',
  //   desc: '点击查看简介！',
  //   logo: '2',
  //   btnLabel: '查看',
  //   btnCb() {
  //     router.push('/pingtaijianjie')
  //   }
  // },

  // {
  //   name: '操作说明',
  //   desc: '汇盈传媒，精彩短视频。期待您的加入',
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
  // {
  //   name: '超级大赢家',
  //   desc: '查看超级大赢家',
  //   logo: '9',
  //   btnLabel: '查看',
  //   btnCb() {
  //     router.push('/quanminlaibaojiang')
  //   }
  // },
  // {
  //   name: '人工代充群',
  //   desc: '点击加入人工代充群！',
  //   logo: '1',
  //   btnLabel: '加入',
  //   btnCb() {
  //     // showImagePreview({
  //     //   images: [weimaiquan]
  //     // })
  //     window.location.href = decodeURIComponent('https://qm.qq.com/q/oVkcjwfykS')
  //     // window.location.href = 'https://api.onxxm900.cn/download/android.apk'
  //     // router.push('/weimaiquanDetail')
  //   }
  // },

  // {
  //   name: '官方微脉圈群',
  //   desc: '点击加入官方微脉圈群！',
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
  //       window.location.href = ``
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
    window.location.href = `https://weaw.shunyigong.com/download`
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
  return new URL(`../../assets/icon/${iconUrl}.png`, import.meta.url).href
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
  // axios.get('api/article/one?id=6').then((res) => {})
  // if (timer) return
})
onMounted(() => {
  // reqWalletLog({
  //   limit: 50,
  //   // order: 'id desc',
  //   where: [['bind_type', '=', 'staff']]
  // }).then((res) => {
  //   scrollContent.value = res.data.data
  //     .sort((item) => Math.random() - 0.5)
  //     .map((item) => {
  //       return `id为${item.uid}的用户${item.remark}`
  //     })
  // })
})

const loadShort = (type) => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const userId = userInfo?.id
  const serial = userInfo?.result?.staff?.serial
  const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent)

  if (isIos) {
    if (!serial && type === 3) {
      buyDialogShow.value = true

      return
    }

    router.push('/short')
    return
  }

  if (type === 1 || type === 3) {
    if (localStorage.isShortVideoShare === dayjs().format('YYYY-MM-DD')) {
      if (!serial && type === 3) {
        buyDialogShow.value = true
        return
      }
      // loadInteraction()
      showLoadingToast({
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      let arr = [reqAdvertisingCount(), reqAdvertisingSinglePrice(), reqUserIncome()]
      Promise.all(arr)
        .then((res) => {
          closeToast()
          let todayCount = res[0]?.data?.ordinary
          let price = res[1]?.data?.price
          let today = res[2]?.data?.today
          if (res[0].code !== 200) {
            todayCount = 100
          }
          if (res[1].code !== 200) {
            price = -1
          }
          if (res[2].code !== 200) {
            today = 0
          }
          nextTick(() => {
            loadShortVideo({
              todayCount: todayCount,
              price,
              today,
              isVip: type === 3
            })
          })
        })
        .catch(() => {
          Toast.clear()

          nextTick(() => {
            loadShortVideo({
              todayCount: 100,
              price: -1,
              isVip: type === 3,
              today: 0
            })
          })
        })
    } else {
      shareDialogShow.value = true
    }
  } else if (type === 2) {
    // loadInteraction()
    loadShortPlayVideo()
  }
}
const shareFriend = () => {
  shareDialogShow.value = false
  localStorage.isShortVideoShare = dayjs().format('YYYY-MM-DD')
  window.shareFriend()
}

const handleGame = () => {
  // router.push('/quanminlaibaojiang')
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  reqNgPlay({})
    .then((res) => {
      console.log('reqNgPlay', res)
      if (res.code === 200) {
        window.location.href = res.data.url
      } else {
        showFailToast('游戏加载失败！')
      }
    })
    .finally(() => {
      closeToast()
    })
}
onActivated(() => {
  reqAdvertisingCount()
  showGonggaoOverlay.value = true
  reqNgTransfer().then((res) => {
    console.log('res', res)
  })
  reqNgTransfer({ plat: 'ky' }).then((res) => {
    console.log('res', res)
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
const toGame = (plat) => {
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  // reqNgPlay(code)
  // reqNgPlayCode().then((res) => {
  //   console.log('reqNgPlayCode', res)
  // })
  reqNgPlay({
    // code: '',
    plat
  })
    .then((res) => {
      // console.log('reqNgPlay', res)
      if (res.code === 200) {
        window.location.href = res.data.url
      } else {
        showFailToast('游戏加载失败！' + res.msg)
      }
    })
    .finally(() => {
      closeToast()
    })
}
</script>

<style lang="less" scoped>
.test-slide-wrapper {
  font-size: 14px;
  width: 100%;
  height: 100%;
  background: #1f203d;

  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;

  .container {
    position: relative;

    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      background-image: url('./images/home-bg.png');
      background-repeat: no-repeat;
      background-size: 100% auto;
    }

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
          color: #999;
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
              border-bottom-color: #666;
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
        background-color: #666;
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

    .shouyi-list {
      display: flex;
      padding: 10px 5px;
      flex-wrap: wrap;
      .item {
        position: relative;
        flex: 0 0 45%;
        padding: 5px;

        .item-box {
          border-radius: 10px;
          width: 100%;
          height: 180px;
          background: url('./images/home-icon2.png') no-repeat;
          background-size: 100% 100%;
          padding: 10px;
          box-sizing: border-box;

          & > div {
            &:nth-child(1) {
              font-size: 18px;
            }

            &:nth-child(2) {
              font-size: 14px;
              opacity: 0.8;
              margin-top: 5px;
            }
          }
        }

        &:nth-child(2) {
          .item-box {
            background: url('./images/home-icon3.png') no-repeat;
            background-size: 100% 100%;
          }
        }

        &:nth-child(3) {
          .item-box {
            background: url('./images/home-icon1.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    .app-list {
      width: 90%;
      box-sizing: border-box;
      background-color: #fff;
      padding: 20px 0;
      margin: 0 auto;
      border-radius: 15px;

      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.05);
      display: flex;
      //flex: 1;
      overflow-x: auto;

      .app-list-item {
        //background-color: #666666;
        //background-image: linear-gradient(135deg, #414138 10%, #272d65 100%);
        display: flex;
        justify-content: center;
        flex: 1;
        flex-basis: 80px;
        flex-shrink: 0;
        //transform: scale(0.8);

        margin-bottom: 10px;
        //padding: 10px 25px;
        align-items: center;
        border-radius: 10px;

        .l {
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .logo {
            width: 80px;
            height: 80px;
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
            padding: 0 2px;
            margin-top: -5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
              font-size: 14px;
              color: #000;
              font-weight: bolder;
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
            color: #666;
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

    .shulist {
      padding: 15px;

      .shu-item {
        display: flex;
        background-color: #fff;
        border-radius: 6px;
        padding: 8px;
        color: #000;
        margin-bottom: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

        .l {
          flex: 1;
          display: flex;

          .img-box {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 45px;
              height: auto;
            }
          }

          & > div:nth-child(2) {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            flex: 1;

            & > div:nth-child(2) {
              color: #999;
              font-size: 12px;
            }
          }
        }

        .r {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;

          div {
            background-image: linear-gradient(to right, #6879fd, #82a6fd);
            color: #fff;
            border-radius: 15px;
            padding: 4px 8px;
          }
        }
      }
    }
  }
}

.my-swipe .van-swipe-item {
  color: #666;
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
  background-color: #666;
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

:deep(.notice-class) {
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid #6cc5be;
  padding: 7px 16px !important;

  .t-swiper-item,
  .t-notice-bar__content {
    color: #666 !important;
  }
}
</style>
