<template>
  <div class="home-index">
    <!--    <div class="top-box">-->
    <!--      <img src="./images/bangzuan.png" alt="" @click="$router.push('/invest')" />-->
    <!--      <img src="./images/tongyongzuanshi.png" alt="" @click="$router.push('/invest')" />-->
    <!--    </div>-->
    <div class="top-box">
      <div>
        <div>
          绑钻
          <img src="./images/zuanshi.png" alt="" />
        </div>
        <div>{{ walletInfo?.amount || 0 }}</div>
        <div>
          <img src="./images/jiahao.png" alt="" />
        </div>
      </div>
      <div>
        <div>
          通用钻石
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
    <div class="title-img-box" @click="$router.push('/me/my-card')">
      <img src="./images/title-bg.png" alt="" />
    </div>
    <div class="linglu-box" v-if="!isIos">
      <img src="./images/k1.png" alt="" @click="loadXiangwan()" />
      <img src="./images/k2.png" alt="" @click="loadXiangwan()" />
      <img src="./images/k4.png" alt="" @click="loadXuanShang()" />
      <!--      <img src="./images/k3.png" alt="" @click="$router.push('/rank')" />-->
      <img src="./images/k3.png" alt="" @click="loadXiangwan()" />
    </div>
    <div class="dailifenhong-box">
      <!--      <img src="./images/dailipaihangios.png" @click="$router.push('/rank')" alt="" v-if="isIos" />-->
      <img src="./images/dailipaihangios.png" @click="loadXiangwan()" alt="" v-if="isIos" />
      <img src="./images/zuanshitiantileyuan.png" @click="$router.push('/jubaopen')" alt="" />
      <img src="./images/chenwgeidailifenhong.png" alt="" @click="$router.push('/invest')" />
    </div>
    <BaseFooter :is-white="true" v-bind:init-tab="1" />
  </div>
</template>

<script lang="tsx" setup>
import BaseFooter from '@/components/BaseFooter.vue'
import { onActivated, ref } from 'vue'
import { reqNgTransfer, reqUserIncome, reqWalletInfo } from '@/api/myApi'

const walletInfo = ref({})

const userIncomeInfo = ref({})
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
  window?.android?.initQie(userId, '钻石悬赏')
}

const loadXiangwan = () => {
  // if (!window?.android?.initQie) {
  //   return showToast('请下载最新版本APP体验！')
  // }
  showToast('6月11日开放此项功能')
  return
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const userId = userInfo?.id
  window?.android?.initXiangWan(userId)
}
onActivated(() => {
  // reqNgTransfer().then((res) => {
  //   console.log('res', res)
  // })
  getUserIncome()
})
</script>

<style lang="less" scoped>
.home-index {
  height: 100vh;
  width: 100%;
  background: url('./images/index-bg.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
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
        padding: 0 10px;
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
        }
        &:nth-child(3) {
          display: flex;
          align-items: center;
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
    }
  }
}
</style>
