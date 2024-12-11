<template>
  <div class="rank">
    <van-nav-bar
      title="排行榜"
      safe-area-inset-top
      :class="{ inApp: getIsInApp() }"
      fixed
      placeholder
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-swipe
      style="transform: translateY(120px)"
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <!--          <van-swipe-item>-->
      <!--            <img src="./images/banner3.png" alt="" />-->
      <!--          </van-swipe-item>-->
      <!--          <van-swipe-item>-->
      <!--            <img src="./images/banner4.png" alt="" />-->
      <!--          </van-swipe-item>-->
      <van-swipe-item>
        <van-image :src="imageSrc1" width="100%" height="200" fit="fill"></van-image>
      </van-swipe-item>
      <van-swipe-item>
        <van-image :src="imageSrc4" width="100%" height="200" fit="fill"></van-image>
      </van-swipe-item>
    </van-swipe>
    <div class="list">
      <div class="list-header">
        <div class="list-item">
          <div style="background: none; color: #fff">排名</div>
          <div>手机号</div>
          <div>本周佣金</div>
        </div>
      </div>
      <div class="list-container">
        <div class="list-item" v-for="(item, index) of rankList">
          <div>{{ index + 1 }}</div>
          <div>{{ getPhone(item.phone) }}</div>
          <div>{{ item.total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { getWalletRank } from '@/api/myApi'
import { Toast } from 'tdesign-mobile-vue'
import { ref } from 'vue'
import imageSrc1 from './images/rank1.png'
import imageSrc4 from './images/rank2.png'

const getPhone = (phone) => {
  if (phone?.length === 11) {
    return phone.slice(0, 3) + '****' + phone.slice(7)
  } else {
    return '--'
  }
}
const rankList = ref([])
const getRank = () => {
  Toast({
    theme: 'loading',
    message: '加载中...',
    duration: 0
  })
  getWalletRank({
    limit: 50
  }).then((res) => {
    Toast.clear()
    console.log('getWalletRank', res)
    rankList.value = res.data?.list
  })
}

getRank()
</script>

<style lang="less" scoped>
.rank {
  width: 100%;
  height: 100vh;
  background: url('./images/rank-bg.png');
  background-size: 100% 100%;
  .list {
    width: 80%;
    margin: 140px auto;
    height: calc(100% - 400px);
    min-height: 260px;
    background-color: rgba(23, 33, 66, 0.66);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .list-container {
      flex: 1;
      overflow-y: auto;
    }
    .list-item {
      color: #fff;
      display: flex;
      & > div {
        height: 45px;
        line-height: 40px;
        width: 40%;
        text-align: center;
        &:nth-child(1) {
          color: #000;
          background-image: url('./images/four.png');
          background-repeat: no-repeat;
          width: 20%;
          background-size: 26px auto;
          background-position: center 5px;
        }
      }
      &:nth-child(2) {
        & > div:nth-child(1) {
          background-image: url('./images/one.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
      &:nth-child(3) {
        & > div:nth-child(1) {
          background-image: url('./images/two.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
      &:nth-child(4) {
        & > div:nth-child(1) {
          background-image: url('./images/three.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
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
</style>
