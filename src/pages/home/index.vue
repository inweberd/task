<template>
  <div class="home-index">
    <van-notice-bar
      background="transparent"
      color="#303133"
      left-icon="volume-o"
      style="border-radius: 10px; height: 30px; border: 1px solid #303133; margin: 8px 8px 0"
      text="点券乐园拉新活动持续火热进行中！ 下级只要天梯达到7级， 就视为有效，3代奖励分别0.8 0.5 0.3点券，达标自动发放！"
    >
    </van-notice-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="./images/banner1.jpg" alt="" />
      </van-swipe-item>
      <van-swipe-item> <img src="./images/banner2.jpg" alt="" /></van-swipe-item>
    </van-swipe>
    <div class="info-banenr" v-if="false">
      <div class="one-box">
        <div class="title">
          通用点券：
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
    <div class="menuList">
      <div class="menu">
        <div style="height: 40px">
          <img
            src="https://lx.aosenn.com/uploads/20221225/1d7e27a10dde72f7aae357871724e031.png"
            draggable="false"
          />
        </div>
        <span>天天抽奖</span>
      </div>
      <div class="menu">
        <div style="height: 40px">
          <img
            src="https://lx.aosenn.com/uploads/20221225/ceffbcc032b1af6c8f1517a08bfb489e.png"
            draggable="false"
          />
        </div>
        <span>排行榜</span>
      </div>
      <div class="menu">
        <div style="height: 40px">
          <img
            src="https://lx.aosenn.com/uploads/20221225/d041ab71bb5e53c781738179ef61216d.png"
            draggable="false"
          />
        </div>
        <span>充场大厅</span>
      </div>
      <div class="menu">
        <div style="height: 38px">
          <img
            src="https://lx.aosenn.com/uploads/20221225/a9f4cef239d1c9b5154678150c5fd4e0.png"
            draggable="false"
          />
        </div>
        <span>邀请好友</span>
      </div>
    </div>
    <div class="shulist">
      <div class="shu-item">
        <div class="l">
          <div class="img-box">
            <img alt="" src="./home-image/canyujieti.jpg" />
          </div>
          <div>
            <div>参与阶梯</div>
            <!--            <div>点击查看每周现金分红排行榜！</div>-->
          </div>
        </div>
        <div class="r">
          <div @click="$router.push('/rank')">详情</div>
        </div>
      </div>
      <div v-if="!isIos" class="shu-item">
        <div class="l">
          <div class="img-box">
            <img alt="" src="./home-image/dataoshayouxi.jpg" />
          </div>
          <div>
            <div>大逃杀游戏</div>
            <!--            <div>遇到广告直接X掉或跳过，每日获得1元！</div>-->
          </div>
        </div>
        <div class="r">
          <div @click="loadShort(1)">详情</div>
        </div>
      </div>
      <div class="shu-item">
        <div class="l">
          <div class="img-box">
            <img alt="" src="./home-image/fabuguanggao.jpg" />
          </div>
          <div>
            <div>发布广告</div>

            <!--            <div>购买会员刷视频无广告，2分钟极速完成！</div>-->
          </div>
          <div class="r">
            <div @click="loadShort(3)">详情</div>
          </div>
        </div>
      </div>

      <div class="shu-item">
        <div class="l">
          <div class="img-box">
            <img alt="" src="./home-image/paihangbangfenhong.jpg" />
          </div>
          <div>
            <div>排行榜分红</div>
            <!--            <div>PG电子-&#45;&#45;拼手气-&#45;&#45;一夜暴富！</div>-->
          </div>
        </div>
        <div class="r">
          <div @click="handleGame">详情</div>
        </div>
      </div>

      <div class="shu-item">
        <div class="l">
          <div class="img-box">
            <img alt="" src="./home-image/dingshangquanyi.png" />
          </div>
          <div>
            <div>顶商权益</div>
            <!--            <div>点击查看每周奖池分红规则！</div>-->
          </div>
        </div>
        <div class="r">
          <div @click="$router.push('/fenhong')">详情</div>
        </div>
      </div>
      <div class="shu-item">
        <div class="l">
          <div class="img-box">
            <img alt="" src="./home-image/chuanshanjia.png" />
          </div>
          <div>
            <div>穿山甲广告</div>
            <!--            <div>点击查看每周奖池分红规则！</div>-->
          </div>
        </div>
        <div class="r">
          <div @click="$router.push('/fenhong')">详情</div>
        </div>
      </div>
      <div class="shu-item">
        <div class="l">
          <div class="img-box">
            <img alt="" src="./home-image/lianghao.png" />
          </div>
          <div>
            <div>靓号免费选</div>
            <!--            <div>点击查看每周奖池分红规则！</div>-->
          </div>
        </div>
        <div class="r">
          <div @click="$router.push('/fenhong')">详情</div>
        </div>
      </div>
      <div class="shu-item">
        <div class="l">
          <div class="img-box">
            <img alt="" src="./home-image/zhuanzeng.png" />
          </div>
          <div>
            <div>转赠</div>
            <!--            <div>点击查看每周奖池分红规则！</div>-->
          </div>
        </div>
        <div class="r">
          <div @click="$router.push('/fenhong')">详情</div>
        </div>
      </div>
    </div>
    <!--    <div class="top-box">-->
    <!--      <div @click="$router.push('/recharge')">-->
    <!--        <div>-->
    <!--          绑钻-->
    <!--          <img src="./images/zuanshi.png" alt="" />-->
    <!--        </div>-->
    <!--        <div>{{ walletInfo?.amount || 0 }}</div>-->
    <!--        <div>-->
    <!--          <img src="./images/jiahao.png" alt="" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div @click="$router.push('/myteam')">-->
    <!--        <div>-->
    <!--          通用点券-->
    <!--          <img src="./images/zuanshi.png" alt="" />-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          {{ userIncomeInfo?.wallet?.money ? userIncomeInfo?.wallet?.money.toFixed(2) : 0 }}-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          <img src="./images/jiahao.png" alt="" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="linglu-box" v-if="!isIos">-->
    <!--      <img src="./images/k1.png" alt="" @click="loadXiangwan()" />-->
    <!--      <img src="./images/k2.png" alt="" @click="loadXiangwan()" />-->
    <!--      <img src="./images/k4.png" alt="" @click="loadXuanShang()" />-->
    <!--      <img src="./images/k3.png" alt="" @click="$router.push('/rank')" />-->
    <!--      &lt;!&ndash;      <img src="./images/k3.png" alt="" @click="loadXiangwan()" />&ndash;&gt;-->
    <!--    </div>-->
    <!--    <div class="dailifenhong-box">-->
    <!--      <img src="./images/dailipaihangios.png" @click="$router.push('/rank')" alt="" v-if="isIos" />-->
    <!--      &lt;!&ndash;      <img src="./images/dailipaihangios.png" @click="loadXiangwan()" alt="" v-if="isIos" />&ndash;&gt;-->
    <!--      <img src="./images/zuanshitiantileyuan.png" @click="$router.push('/jubaopen')" alt="" />-->
    <!--      <img src="./images/chenwgeidailifenhong.png" alt="" @click="$router.push('/invest')" />-->
    <!--      <img src="./images/zuanshixiaohaoyouxi.png" alt="" @click="goXiaoHaoGame" />-->
    <!--    </div>-->
    <BaseFooter :is-white="true" v-bind:init-tab="1" />
    <TipDialog
      v-model="showGonggaoOverlay"
      confirm-text="已阅"
      :show-close="false"
      @confirm="showGonggaoOverlay = false"
    >
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
      <div style="padding: 20px; color: #fff">
        <p style="text-align: center; font-size: 18px; font-weight: bolder">点券双重豪礼</p>
        <div style="font-size: 15px; font-weight: bolder; margin-top: 8px">点券天梯争上游活动</div>
        <div>天梯等级达到20级 奖38现金</div>
        <div>天梯等级达到25级 奖88现金</div>
        <div>天梯等级达到30级 奖398现金</div>
        <div>天梯等级达到35级 奖888现金</div>
        <div>天梯等级达到40级 奖1988现金</div>
        <div style="font-size: 15px; font-weight: bolder; margin-top: 8px">
          争上游活动奖励领取要求：
        </div>
        <div>限新用户，6月20日之后注册的，</div>
        <div>连续保持等级18天，联系客服领取</div>
        <div style="font-size: 15px; font-weight: bolder; margin-top: 8px">
          推荐人拉新活动如下：
        </div>
        <div>推荐5个20层直属，奖58现金</div>
        <div>推荐5个25层直属，奖188现金</div>
        <div>推荐5个30层直属，奖588现金</div>
        <div style="margin-top: 6px; color: #ddd; font-size: 10px">
          拉新奖领取要求：直属必须是6月20日以后注册的新用户
        </div>
      </div>
    </TipDialog>
  </div>
</template>

<script lang="tsx" setup>
import BaseFooter from '@/components/BaseFooter.vue'
import { onActivated, ref } from 'vue'
import { reqNgTransfer, reqUserIncome, reqWalletInfo } from '@/api/myApi'
import { useRouter } from 'vue-router'
import { closeToast } from 'vant'

const walletInfo = ref({})

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
  window?.android?.initQie(userId, '点券悬赏')
}
const goXiaoHaoGame = () => {
  router.push('/gameList')
  // showToast('开发测试中！敬请期待！')
}
const loadXiangwan = () => {
  // if (!window?.android?.initQie) {
  //   return showToast('请下载最新版本APP体验！')
  // }
  showToast('开发测试中！敬请期待！')
  return
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const userId = userInfo?.id
  window?.android?.initXiangWan(userId)
}
onActivated(() => {
  // showGonggaoOverlay.value = true
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
  .my-swipe {
    margin: 20px 10px 0;
    border-radius: 10px;
    overflow: hidden;

    .van-swipe-item {
      height: 130px;
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
</style>
