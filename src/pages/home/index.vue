<template>
  <div class="home-index">
    <!--人个信息-->
    <div
      id="shareInfo"
      data-clipboard-action="copy"
      data-clipboard-text="9c34NB4cD/SE0XAuv9aFBjDVXrxPNxlVEXoo9yJsZBK/Iw"
      onclick=""
    >
      <div class="shareCont" style="display: block">
        <div class="cont_info">
          <img src="@/assets/img/v6/new_bg.png" alt="" class="am-img-responsive" />
          <div class="am-container container">
            <div class="contHead">
              <div class="headInfo">
                <img :src="userInfo?.display?.avatar || defaultAvatar" alt="" class="am-img-responsive headIcon" />
                <p class="conPhone" id="xuserid">
                  <template v-if="userInfo.nickname"> {{ userInfo.nickname }}</template>
                  <template v-else>
                    {{
                      userInfo.phone
                        ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
                        : ''
                    }}
                  </template>
                </p>
              </div>
              <div
                class="contSign"
                data-type="1"
                data-url="#"
                id="qiandao"
                data-title="每日签到"
                data-login="1"
              >
                <img src="@/assets/img/v6/new_sing.png" alt="" class="am-img-responsive signIcon" />
                <!-- <p class="singText">签到</p> -->
              </div>
            </div>
            <div class="am-income">
              <div class="income">
                <p id="userjmoney">今日收益：{{ (userIncomeInfo.todayIncome / 10 || 0).toFixed(2) }}</p>
                <p id="userzmoney">累计收益： {{ (userIncomeInfo.totalIncome / 10 || 0).toFixed(2) }}</p>
              </div>
              <!--<a href="/user/wallet.html">-->
              <div class="income_ti">
                <p style="line-height: 18px;margin: 0;text-align: right;color: #fff">可转赠金币</p>
                <p class="income_money" id="usermoney" style="margin-top: 5%"> {{ (walletInfo.wallet?.points / 10 || 0).toFixed(2) }}</p>
<!--                <p class="income_with" data-url="pages/yezi_tx.html" id="usertx" data-login="1">-->
<!--                  提现&gt;-->
<!--                </p>-->
              </div>
              <!--</a>-->
            </div>
          </div>
        </div>

        <div class="am-container">
          <div class="am-avg-tasking">
<!--            快速任务-->
            <div class="am-avg-task am-g"  @click="$router.push('/jubaopen')">
              <a data-type="0" data-url="#" id="">
                <img src="@/assets/img/v6/bannerxhdpi.png" alt="" class="am-img-responsive" />
              </a>
            </div>
            <div class="am-g am-actives">
              <ul class="am-avg-left">
                <li data-am-modal="{target: '#my-alert'}"  @click="toGame">
                  <a data-url="#" id="shiwan_duoyou" data-login="1">
                    <img src="@/assets/img/v6/main1.png" alt="" class="am-img-responsive" />
                  </a>
                </li>
              </ul>
              <ul class="am-avg-right">
                <li class="am-avg-pai am-pai"  @click="$router.push('/invest')">
                  <a data-url="ranking.html" id="shiwan_yuwan" data-login="1">
                    <img src="@/assets/img/v6/main4.png" alt="" class="am-img-responsive" />
<!--                    <img src="@/assets/img/v6/main2.png" alt="" class="am-img-responsive" />-->
                  </a>
                </li>
                <li class="am-avg-renwu"  @click="loadXiangwan">
                  <a data-t="0" data-url="#" data-id="" id="shiwan_jxw" data-mz="浏览任务">
                    <!------->
                    <img src="@/assets/img/v6/main3.png" alt="" class="am-img-responsive" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu">
      <ul class="">
        <li @click="$router.push('/conversion')">
          <a data-url="invite.html" id="hongyaoqing" data-login="1">
            <img src="@/assets/img/v6/menu1.png" alt="" />
          </a>
        </li>
        <li @click="$router.push('/rank')">
          <a data-url="ranking.html" id="hongranking" data-login="1">
            <img src="@/assets/img/v6/menu2.png" alt="" />
          </a>
        </li>
        <li class="adsu"  @click="$router.push('/me/my-card')">
          <a data-t="0" data-url="yezi_bangzhu.php?userid=" data-id="" data-mz="帮助中心">
            <img src="@/assets/img/v6/menu3.png" alt="" />
          </a>
        </li>
        <li @click.stop="$router.push('/publish')">
          <a>
            <img src="@/assets/img/v6/menu4.png" />
<!--            <p>悬赏任务</p>-->
          </a>
        </li>
      </ul>
    </div>
    <div
      class="index-news"
      id="kefu"
      data-type="1"
      data-url="#"
      data-login="22"
      data-title="在线客服"
      style="display: none"
    >
      <div class="box3">
        <div class="border3" id="gg">
          <div>
            <a class="window" data-url="#" data-other1="1">用户：1000签到获得奖励</a
            ><span>+0.2元</span>
          </div>
        </div>
      </div>
    </div>
    <div id="floatWebview" class="mui-backdrop" style="z-index: 99999;">
      <div class="vertical">
        <p style="margin-top: 10px;text-align: center;">
          <img onclick="guanbi()" src="./images/hb0.png" style="width: 100%;height: 60%;" />
          <p style="margin-top: -110px;">
            <img onclick="guanbi()" src="./images/hb1.png" style="width: 60px;height: 60px;" />
          </p>
        </p>
      </div>
    </div>
    <div id="floatWebview1" class="mui-backdrop" style="">
      <div class="vertical">
        <!---<img src="./images/yezicms.png" style="width: 100%;height: 100%; margin-bottom: -67px;"/>--->
        <div>
          <img src="./images/hb1.png" style="width: 60px;height: 60px;" />
          <p style="margin-top: 10px;text-align: center;">
            填写邀请码立即领取好运红包
            <p style="text-align: center;">新用户专享</p>

            <input type="tel" oninput="value=value.replace(/[^\d]/g,'')" name="upuser" id="upuser" value=""
                   maxlength="6" autocomplete="off" placeholder="请输入邀请码"
                   style="font-size: 14px;background: #f4f4f4;border: none;margin: 0 ; border-radius: 25px;">

          </p>
        </div>
        <p id="close_popup" class="vertical_p" onclick="guanbi1()">立即领取</p>
      </div>
    </div>
    <!--    <van-notice-bar-->
    <!--      background="transparent"-->
    <!--      color="#303133"-->
    <!--      left-icon="volume-o"-->
    <!--      style="border-radius: 10px; height: 30px; border: 1px solid #303133; margin: 8px 8px 0"-->
    <!--      text="蚂蚁优选拉新活动持续火热进行中！ 下级只要天梯达到7级， 就视为有效，3代奖励分别0.8 0.5 0.3金币，达标自动发放！"-->
    <!--    >-->
    <!--    </van-notice-bar>-->
    <p
      v-if="false"
      style="
        color: #000;
        text-align: center;
        font-size: 18px;
        font-weight: bolder;
        margin-top: 10px;
      "
    >
      蚂蚁优选主页
    </p>
    <!--    <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">-->
    <!--      <van-swipe-item> <img alt="" src="./images/banner2.jpg" /></van-swipe-item>-->
    <!--      <van-swipe-item>-->
    <!--        <img alt="" src="./images/banner1.jpg" />-->
    <!--      </van-swipe-item>-->
    <!--    </van-swipe>-->
    <div v-if="false" class="info-banenr">
      <div class="one-box">
        <div class="title">
          通用金币：
          <span>
            {{
              userIncomeInfo?.wallet?.money ? userIncomeInfo?.wallet?.money.toFixed(2) : 0
            }} </span
          >个
        </div>
        <div class="btns">
          <div
            class="btn1 btn"
            style="background-color: rgb(247, 228, 144)"
            @click="$router.push('/wallet')"
          >
            余额明细
          </div>
          <div class="btn2 btn" @click="$router.push('/dep')">提现</div>
        </div>
      </div>
      <div class="two-box">
        <div class="title">
          今日收益：
          <span>
            {{ (userIncomeInfo.today || 0).toFixed(2) }}
          </span>
          个
        </div>
        <div class="title">
          累计收益 ： <span>{{ (userIncomeInfo.total || 0).toFixed(4) }}</span> 个
        </div>
      </div>
    </div>
    <div  v-if="false" class="menuList">
      <div class="menu">
        <div style="height: 40px" @click="$router.push('/invest')">
          <img
            draggable="false"
            src="https://lx.aosenn.com/uploads/20221225/1d7e27a10dde72f7aae357871724e031.png"
          />
        </div>
        <span>顶商权益</span>
        <div class="chat-bubble">降低手续费</div>
      </div>
      <div class="menu" @click="$router.push('/jubaopen')">
        <div style="height: 40px">
          <img
            draggable="false"
            src="https://lx.aosenn.com/uploads/20221225/ceffbcc032b1af6c8f1517a08bfb489e.png"
          />
        </div>
        <span>参与阶梯</span>
      </div>
      <div class="menu" @click="$router.push('/rank')">
        <div style="height: 40px">
          <img
            draggable="false"
            src="https://lx.aosenn.com/uploads/20221225/d041ab71bb5e53c781738179ef61216d.png"
          />
        </div>
        <span>分红榜</span>
      </div>
      <div class="menu" @click="$router.push('/dataosha')">
        <div style="height: 38px">
          <img
            draggable="false"
            src="https://lx.aosenn.com/uploads/20221225/a9f4cef239d1c9b5154678150c5fd4e0.png"
          />
        </div>
        <span>大逃杀</span>
      </div>
    </div>
    <div class="icon-list"  v-if="false">
      <div class="item" @click="$router.push('/jubaopen')">
        <div class="img-box">
          <img alt="" src="./home-image/canyujieti.jpg" />
        </div>
        <div class="name">参与阶梯</div>
      </div>
      <div class="item" @click="$router.push('/rank')">
        <div class="img-box">
          <img alt="" src="./home-image/paihangbangfenhong.jpg" />
        </div>
        <div class="name">排行榜分红</div>
      </div>
      <div class="item" @click="$router.push('/invest')">
        <div class="img-box">
          <img alt="" src="./home-image/dingshangquanyi.png" />
        </div>
        <div class="name">顶商权益</div>
      </div>
      <div class="item" @click="$router.push('/conversion')">
        <div class="img-box">
          <img alt="" src="./home-image/zhuanzeng.png" />
        </div>
        <div class="name">转赠</div>
      </div>
      <div class="item" @click="$router.push('/dataosha')">
        <div class="img-box">
          <img alt="" src="./home-image/dataoshayouxi.jpg" />
        </div>
        <div class="name">大逃杀游戏</div>
      </div>
      <div class="item" @click="$router.push('/publish')">
        <div class="img-box">
          <img alt="" src="./home-image/fabuguanggao.jpg" />
        </div>
        <div class="name">发布广告</div>
      </div>

      <div class="item" @click="loadXiangwan">
        <div class="img-box">
          <img alt="" src="./home-image/chuanshanjia.png" />
        </div>
        <div class="name">穿山甲广告</div>
      </div>
      <div class="item" @click="loadXiangwan">
        <div class="img-box">
          <img alt="" src="./home-image/lianghao.png" />
        </div>
        <div class="name">悬赏任务</div>
      </div>
<!--      <div class="item" @click="loadXiangwan">-->
<!--        <div class="img-box">-->
<!--          <img alt="" src="./home-image/lianghao1.png" />-->
<!--        </div>-->
<!--        <div class="name">免费靓号</div>-->
<!--      </div>-->
<!--      <div class="item" @click="loadXiangwan">-->
<!--        <div class="img-box">-->
<!--          <img alt="" src="./home-image/daoju1.png" />-->
<!--        </div>-->
<!--        <div class="name">置顶卡-刷新卡</div>-->
<!--      </div>-->
    </div>

    <BaseFooter :is-white="true" v-bind:init-tab="1" />
<!--    <TipDialog-->
<!--      :show-close="true"-->
<!--      v-model="showGonggaoOverlay"-->
<!--      confirm-text="微信认证"-->
<!--      @confirm="goRenzheng"-->
<!--    >-->
    <TipDialog
      :show-close="true"
      v-model="showGonggaoOverlay"
      confirm-text="点击加入"
      @confirm="goQQ"
    >
      <p style="height: 5px;"></p>
      <!--      <p-->
      <!--        style="-->
      <!--          transform: translateY(10px);-->
      <!--          text-align: center;-->
      <!--          font-size: 18px;-->
      <!--          color: #000;-->
      <!--          font-weight: bolder;-->
      <!--        "-->
      <!--      >-->
      <!--        请使用68APP扫码进官方群-->
      <!--      </p>-->
      <!--      <p-->
      <!--        style="-->
      <!--          transform: translateY(10px);-->
      <!--          text-align: center;-->
      <!--          font-size: 18px;-->
      <!--          color: #fff;-->
      <!--          font-weight: bolder;-->
      <!--        "-->
      <!--      >-->
      <!--        请使用土豆APP扫码进官方群-->
      <!--      </p>-->
      <div style="padding: 20px">
        <img alt="" src="@/assets/img/weimaiquan.jpg" style="width: 100%" />
      </div>
      <!--      <div style="padding: 20px; color: #fff">-->
      <!--        <p style="text-align: center; font-size: 18px; font-weight: bolder">金币双重豪礼</p>-->
      <!--        <div style="font-size: 15px; font-weight: bolder; margin-top: 8px">金币天梯争上游活动</div>-->
      <!--        <div>天梯等级达到20级 奖38现金</div>-->
      <!--        <div>天梯等级达到25级 奖88现金</div>-->
      <!--        <div>天梯等级达到30级 奖398现金</div>-->
      <!--        <div>天梯等级达到35级 奖888现金</div>-->
      <!--        <div>天梯等级达到40级 奖1988现金</div>-->
      <!--        <div style="font-size: 15px; font-weight: bolder; margin-top: 8px">-->
      <!--          争上游活动奖励领取要求：-->
      <!--        </div>-->
      <!--        <div>限新用户，6月20日之后注册的，</div>-->
      <!--        <div>连续保持等级18天，联系客服领取</div>-->
      <!--        <div style="font-size: 15px; font-weight: bolder; margin-top: 8px">-->
      <!--          推荐人拉新活动如下：-->
      <!--        </div>-->
      <!--        <div>推荐5个20层直属，奖58现金</div>-->
      <!--        <div>推荐5个25层直属，奖188现金</div>-->
      <!--        <div>推荐5个30层直属，奖588现金</div>-->
      <!--        <div style="margin-top: 6px; color: #ddd; font-size: 10px">-->
      <!--          拉新奖领取要求：直属必须是6月20日以后注册的新用户-->
      <!--        </div>-->
      <!--      </div>-->
    </TipDialog>

  </div>
</template>

<script lang="tsx" setup>
import BaseFooter from '@/components/BaseFooter.vue'
import { onActivated, ref } from 'vue'
import {
  reqDataoshaGame,
  reqNgTransfer,
  reqUpdateWalletAuth,
  reqUserIncome,
  reqUserInfo,
  reqWalletInfo
} from '@/api/myApi'
import { useRouter } from 'vue-router'
import { closeToast, showFailToast } from 'vant'
import defaultAvatar from '@/assets/img/logo.png'

const walletInfo = ref({})
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))

const router = useRouter()
const userIncomeInfo = ref({})
const showGonggaoOverlay = ref(false)
const getUserIncome = (cb?) => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
    cb && cb()
  })

  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
}
const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent)

const loadXuanShang = () => {
  // if (!window?.android?.initQie) {
  //   return showToast('请下载最新版本APP体验！')
  // }

  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const userId = userInfo?.id
  window?.android?.initQie(userId, '金币悬赏')
}
const goXiaoHaoGame = () => {
  router.push('/gameList')
  // showToast('开发测试中！敬请期待！')
}
const loadXiangwan = () => {
  // if (!window?.android?.initQie) {
  //   return showToast('请下载最新版本APP体验！')
  // }
  showToast('等待上线！')
  return
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const userId = userInfo?.id
  window?.android?.initXiangWan(userId)
}
const toGame=()=>{
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  reqDataoshaGame().then((res) => {
    // console.log('reqNgPlay', res)
    if (res.code === 200) {
      window.location.href = res.data.url
    } else {
      showFailToast('游戏加载失败！' + res.msg)
    }
  }).finally(() => {
    closeToast()
    // Toast.clear()
  })
}
const goQQ = () => {
  window.location.href = 'https://qm.qq.com/q/LVWCgqGSKQ'
  showGonggaoOverlay.value = false
}

const toDownload = () => {
  window.location.href = `https://fx.kujspvp.cn/download`

  // window.location.href = `https://fx.kujspvp.cn/download/android.apk`
}
let timer=null

const goRenzheng=()=>{
  window.goRenzheng()
  showGonggaoOverlay.value = false
  clearInterval(timer)
}
const getIsRenzheng=()=>{
  timer=setInterval(()=>{
    reqUserInfo({ id: userInfo.value.id }).then((res) => {
      window.localStorage.setItem('userInfo', JSON.stringify(res.data))
      if(!res.data.unionid){
        showGonggaoOverlay.value = true
      }else{
        clearInterval(timer)
        showGonggaoOverlay.value = false
      }
    })
  },1000)
}
onActivated(() => {
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo'))
  showGonggaoOverlay.value=true
  // getIsRenzheng()
  // reqNgTransfer({ plat: 'ky' }).then((res) => {
  //   closeToast()
  //   // Toast.clear()
  // })
  reqNgTransfer().then((res) => {
    closeToast()
    // Toast.clear()
  })
  getUserIncome()
})
</script>

<style lang="less" scoped>
@import url('@/assets/img/v6/amazeui.min.css');
@import url('@/assets/img/v6/share.css');
.home-index {
  height: calc(100vh - 56px);
  background-color: #f8f8f8;
  width: 100%;
  overflow: auto;
  .top-box {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    & > img {
      height: 30px;
    }
    & > div {
      background-color: #131c2d;
      border-radius: 20px;
      height: 30px;
      display: flex;
      & > div {
        padding-left: 10px;
        white-space: nowrap;
        &:nth-child(1) {
          display: flex;
          align-items: center;
          img {
            width: 20px;
            margin-left: 6px;
          }
        }
        &:nth-child(2) {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &:nth-child(3) {
          display: flex;
          align-items: center;
          margin-right: 6px;
          img {
            width: 15px;
          }
        }
      }
      &:nth-child(1) {
        width: 43%;
      }
      &:nth-child(2) {
        width: 47%;
      }
    }
  }

  .info-banenr {
    background: #fec408;
    padding: 20px 15px;
    margin: 20px 10px 0;
    position: relative;
    z-index: 99;
    border-radius: 10px;
    box-shadow: 0 0 5px #fec408;
    color: #333;
    .one-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 12px;
        span {
          color: #000;
          font-size: 19px;
        }
      }
      .btns {
        display: flex;
        align-items: center;

        .btn {
          width: 60px;
          height: 30px;
          font-size: 13px;
          text-align: center;
          line-height: 30px;
          border-radius: 30px;
        }
        .btn1 {
        }
        .btn2 {
          background: #f94f26;
          margin-left: 10px;
          color: #fff;
        }
      }
    }

    .two-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 18px;

      .title {
        font-size: 12px;

        span {
          color: #333;
          font-size: 12px;
        }
      }
    }
  }

  .menuList {
    display: flex;
    padding: 2px 10px;
    box-sizing: border-box;
    margin: 20px 10px 0;
    border-radius: 10px;
    background: #fff;
    color: #333;
    font-size: 12px;
    .menu {
      position: relative;
      width: 25%;
      text-align: center;
      padding: 10px 0;
      display: inline-block;

      & > div {
        img {
          width: 40px;
          height: 40px;
        }
      }

      .chat-bubble {
        position: absolute;
        top: -20px;
        right: -20px;
        font-size: 10px;
        background: #fecf1f;
        border-radius: 0.4em;
        color: #000 !important;
        padding: 3px;
        max-width: 200px;
        margin: 1em auto;
        text-align: left;
        box-shadow:
          0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23);
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 15px;
          width: 0;
          height: 0;
          border: 15px solid transparent;
          border-top-color: #fecf1f;
          border-bottom: 0;
          border-left: 0;
          margin-left: -10px;
          margin-bottom: -10px;
        }
      }
    }
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
      position: relative;
      padding-left: 20px;

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          width: 35px;
          height: 35px;
          content: '';
          background: url('https://lx.aosenn.com/h5/static/tuijian.png') no-repeat;
          background-size: 100%, 100%;
          z-index: 2;
        }
      }

      .l {
        flex: 1;
        display: flex;

        .img-box {
          border-radius: 10px;
          overflow: hidden;
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
            color: red;
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
          background: #fed61f;

          //background-image: linear-gradient(to right, #ff8b6e, #ff625c);
          color: #000;
          border-radius: 15px;
          padding: 4px 10px;
        }
      }
    }
  }

  .icon-list {
    display: flex;
    flex-wrap: wrap;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 50%;
      padding: 0 10px;
      .img-box {
        border-radius: 10px;
        overflow: hidden;
        width: 80%;
        img {
          width: 100%;
        }
      }
      .name {
        color: #000;
        font-weight: bolder;
        margin-bottom: 8px;
      }
    }
  }
  .my-swipe {
    margin: 10px 10px 0;
    border-radius: 10px;
    overflow: hidden;

    .van-swipe-item {
      height: 180px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .linglu-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    img {
      margin-top: 10px;
      width: 45%;
    }
  }
  .dailifenhong-box {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 95%;

      &:nth-child(2) {
        margin-top: 10px;
      }
      &:nth-child(3) {
        margin-top: 10px;
      }
      &:nth-child(4) {
        margin-top: 10px;
      }
    }
  }
}

.contact-service-box {
  display: flex;
  height: 7.8rem;
  border: 1px solid #f1f2f3;
  margin-top: 2rem;
  border-radius: 1rem;
  margin: 10;
  padding: 0;
  box-sizing: border-box;
}

.contact-service-box .contact-service {
  border-right: 1px solid #f1f2f3;
  flex: 1;
  padding-left: 1.3rem;
  text-decoration: none;
  color: #333;
}

.contact-service-box .contact-service p {
  margin: 10px;
}
.vertical {
  width: 70%;
  height: auto;
  margin: 35% auto;
  text-align: center;
}

.vertical div {
  background-color: #ffffff;
  padding: 10px 10px;
  border-radius: 25px 25px 0 0;
}

.vertical_p {
  border-radius: 0 0 25px 25px;
  bottom: 0px;
  padding: 10px 0px;
  background-color: #84b514;
  color: #ffffff;
}

.mui-backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
}
</style>
