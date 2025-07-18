<template>
  <div class="home-index">
    <!--    <div class="top-box">-->
    <!--      <img src="./images/bangzuan.png" alt="" @click="$router.push('/invest')" />-->
    <!--      <img src="./images/tongyongzuanshi.png" alt="" @click="$router.push('/invest')" />-->
    <!--    </div>-->
    <div class="top-box">
      <div @click="$router.push('/recharge')">
        <div>
          绑钻
          <img src="./images/zuanshi.png" alt="" />
        </div>
        <div>{{ walletInfo?.amount || 0 }}</div>
        <div>
          <img src="./images/jiahao.png" alt="" />
        </div>
      </div>
      <div @click="$router.push('/myteam')">
        <div>
          通用点券
          <img src="./images/zuanshi.png" alt="" />
        </div>
        <div>
          {{ userIncomeInfo?.wallet?.money ? userIncomeInfo?.wallet?.money.toFixed(2) : 0 }}
        </div>
        <div>
          <img src="./images/jiahao.png" alt="" />
        </div>
      </div>
      <!--      <img src="./images/bangzuan.png" alt="" @click="$router.push('/invest')" />-->
      <!--      <img src="./images/tongyongzuanshi.png" alt="" @click="$router.push('/invest')" />-->
    </div>
    <van-notice-bar
      background="transparent"
      color="#fff"
      left-icon="volume-o"
      style="border-radius: 10px; height: 30px; border: 1px solid #fff; margin: 8px 8px 0"
      text="群英会拉新活动持续火热进行中！ 下级只要天梯达到7级， 就视为有效，3代奖励分别0.8 0.5 0.3点券，达标自动发放！"
    >
    </van-notice-bar>

    <div class="title-img-box" @click="$router.push('/me/my-card')">
      <img src="./images/title-bg.png" alt="" />
    </div>
    <div class="linglu-box" v-if="!isIos">
      <img src="./images/k1.png" alt="" @click="loadXiangwan()" />
      <img src="./images/k2.png" alt="" @click="loadXiangwan()" />
      <img src="./images/k4.png" alt="" @click="loadXuanShang()" />
      <img src="./images/k3.png" alt="" @click="$router.push('/rank')" />
      <!--      <img src="./images/k3.png" alt="" @click="loadXiangwan()" />-->
    </div>
    <div class="dailifenhong-box">
      <img src="./images/dailipaihangios.png" @click="$router.push('/rank')" alt="" v-if="isIos" />
      <!--      <img src="./images/dailipaihangios.png" @click="loadXiangwan()" alt="" v-if="isIos" />-->
      <img src="./images/zuanshitiantileyuan.png" @click="$router.push('/jubaopen')" alt="" />
      <img src="./images/chenwgeidailifenhong.png" alt="" @click="$router.push('/invest')" />
      <img src="./images/zuanshixiaohaoyouxi.png" alt="" @click="goXiaoHaoGame" />
    </div>
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
  width: 100%;
  background: url('./images/index-bg.png') no-repeat;
  background-size: 100% 100%;
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
  .title-img-box {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    img {
      transform: translateX(-8%);
      width: 70%;
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
