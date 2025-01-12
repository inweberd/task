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
    <!--    <van-swipe-->
    <!--      style="transform: translateY(120px)"-->
    <!--      class="my-swipe"-->
    <!--      :autoplay="3000"-->
    <!--      indicator-color="white"-->
    <!--    >-->
    <!--      &lt;!&ndash;          <van-swipe-item>&ndash;&gt;-->
    <!--      &lt;!&ndash;            <img src="./images/banner3.png" alt="" />&ndash;&gt;-->
    <!--      &lt;!&ndash;          </van-swipe-item>&ndash;&gt;-->
    <!--      &lt;!&ndash;          <van-swipe-item>&ndash;&gt;-->
    <!--      &lt;!&ndash;            <img src="./images/banner4.png" alt="" />&ndash;&gt;-->
    <!--      &lt;!&ndash;          </van-swipe-item>&ndash;&gt;-->
    <!--      <van-swipe-item>-->
    <!--        <van-image :src="imageSrc1" width="100%" height="200" fit="fill"></van-image>-->
    <!--      </van-swipe-item>-->
    <!--      <van-swipe-item>-->
    <!--        <van-image :src="imageSrc4" width="100%" height="200" fit="fill"></van-image>-->
    <!--      </van-swipe-item>-->
    <!--    </van-swipe>-->
    <div class="list">
      <div style="position: absolute; left: 0; top: -40px; width: 100%; color: #cda65b">
        <p style="text-align: center; width: 100%">每周统计一次分红资格</p>
        <p style="text-align: center; width: 100%; font-weight: bolder; font-size: 15px">
          前50名在榜的用户可获得全网超级分红
        </p>
      </div>
      <div class="list-header">
        <div class="list-item">
          <div style="background: none; color: #fff"></div>
          <div style="background: none; color: #fff">排名</div>
          <div>手机号</div>
          <div>本周佣金</div>
        </div>
      </div>
      <div class="list-container">
        <div v-if="!rankList?.length" style="text-align: center; line-height: 200px">暂无数据</div>
        <div class="list-item" v-for="(item, index) of rankList">
          <div>
            <img :src="item.avatar || defaultAvatar" class="headerImg" />
          </div>
          <div>{{ index + 1 }}</div>
          <div>{{ item.nickname || getPhone(item.phone) }}</div>
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
import { onBeforeUnmount, ref } from 'vue'
import imageSrc1 from './images/rank1.png'
import imageSrc4 from './images/rank2.png'
import defaultAvatar from '@/assets/img/logo.png'

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
onBeforeUnmount(() => {
  Toast.clear()
})
</script>

<style lang="less" scoped>
.rank {
  width: 100%;
  height: 100vh;
  //background: url('./images/rank-bg.png');
  background-image: url('@/assets/img/bg.png');
  background-size: 100% 100%;
  .list {
    position: relative;
    //width: 85%;
    margin: 180px auto;
    height: calc(100% - 240px);
    min-height: 420px;
    //background-color: rgba(23, 33, 66, 0.66);
    display: flex;
    flex-direction: column;
    //overflow: hidden;
    .list-container {
      flex: 1;
      overflow-y: auto;
    }
    .list-item {
      color: #fff;
      display: flex;
      align-items: center;
      //border-bottom: 1px solid #fff;
      padding: 4px 0;
      box-shadow: inset 0px -1px 2px -1px #c8c7cc;
      & > div {
        height: 45px;
        line-height: 40px;
        width: 32%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        img {
          transform: translateY(5px);
          width: 30px;
          height: 30px;
        }
        &:nth-child(1) {
          text-align: center;

          width: 15%;
        }

        &:nth-child(2) {
          text-align: center;

          color: #000;
          background-image: url('./images/four.png');
          background-repeat: no-repeat;
          width: 20%;
          background-size: 26px auto;
          background-position: center 5px;
        }
        &:nth-child(3) {
          width: 40%;
        }
        &:nth-child(4) {
          width: 24%;
        }
      }
      &:nth-child(1) {
        & > div:nth-child(2) {
          background-image: url('./images/one.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
      &:nth-child(2) {
        & > div:nth-child(2) {
          background-image: url('./images/two.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
      &:nth-child(3) {
        & > div:nth-child(2) {
          background-image: url('./images/three.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
    }
  }

  :deep(.van-nav-bar) {
    background: transparent;
    .van-nav-bar__title {
      color: #fff;
    }

    .van-nav-bar__text {
      color: #fff;
    }

    .van-icon {
      color: #fff;
    }
  }
  :deep(.van-hairline--bottom) {
    &:after {
      border-bottom: none;
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
