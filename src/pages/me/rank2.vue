<template>
  <div class="rank">
    <!--    <van-nav-bar-->
    <!--      title="排行榜"-->
    <!--      safe-area-inset-top-->
    <!--      :class="{ inApp: getIsInApp() }"-->
    <!--      fixed-->
    <!--      placeholder-->
    <!--      left-text="返回"-->
    <!--      left-arrow-->
    <!--      @click-left="$router.back()"-->
    <!--    />-->
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
    <div style="display: flex; justify-content: center; margin-top: 50px">
      <img src="./images/rank-bg2.png" style="height: 90px" alt="" />
    </div>
    <div class="qiansan">
      <div class="one">
        <div class="box" style="width: 75px; height: 75px; border-radius: 50%; overflow: hidden">
          <img :src="headImg" style="width: 100%; height: 100%" alt="" />
        </div>
        <div class="info">
          <p>TOP1</p>
          <p>{{ getPhone(rankList?.[0]?.phone) || '--' }}</p>
          <p style="font-size: 22px">{{ rankList?.[0]?.total || '--' }}钻石</p>
        </div>
      </div>
      <div class="two">
        <div class="box" style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden">
          <img :src="headImg" style="width: 100%; height: 100%" alt="" />
        </div>
        <div class="info">
          <p>TOP2</p>
          <p>{{ getPhone(rankList?.[1]?.phone) || '--' }}</p>
          <p>{{ rankList?.[1]?.total || '--' }}钻石</p>
        </div>
      </div>
      <div class="three">
        <div class="box" style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden">
          <img :src="headImg" style="width: 100%; height: 100%" alt="" />
        </div>
        <div class="info">
          <p>TOP3</p>
          <p>{{ getPhone(rankList?.[2]?.phone) || '--' }}</p>
          <p>{{ rankList?.[2]?.total || '--' }}钻石</p>
        </div>
      </div>
    </div>

    <div class="list">
      <!--      <div style="position: absolute; left: 0; top: -40px; width: 100%; color: #cda65b">-->
      <!--        <p style="text-align: center; width: 100%">每周统计一次分红资格</p>-->
      <!--        <p style="text-align: center; width: 100%; font-weight: bolder; font-size: 15px">-->
      <!--          前50名在榜的用户可获得全网超级分红-->
      <!--        </p>-->
      <!--      </div>-->
      <!--      <div class="list-header">-->
      <!--        <div class="list-item">-->
      <!--          <div style="background: none; color: #fff">排名</div>-->
      <!--          <div>手机号</div>-->
      <!--          <div>本周佣金</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="list-container">
        <div v-if="!rankListCom?.length" style="text-align: center; line-height: 200px">
          暂无数据
        </div>
        <div class="list-item" v-for="(item, index) of rankListCom">
          <div>{{ index + 4 < 10 ? '0' + (index + 4) : index + 4 }}</div>
          <div>{{ getPhone(item.phone) }}</div>
          <div>{{ item.total }}</div>
        </div>
      </div>
    </div>
    <div style="width: 100%; color: #cda65b; font-size: 16px; margin-bottom: 6px">
      <p class="linear" style="text-align: center; width: 100%">每周统计一次分红资格</p>
      <p
        class="linear"
        style="text-align: center; width: 100%; font-weight: bolder; font-size: 15px"
      >
        前50名在榜的用户可获得全网超级分红
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { getWalletRank } from '@/api/myApi'
import { Toast } from 'tdesign-mobile-vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import imageSrc1 from './images/rank1.png'
import imageSrc4 from './images/rank2.png'
import headImg from '@/assets/img/logo.png'

const getPhone = (phone) => {
  if (phone?.length === 11) {
    return phone.slice(0, 3) + '****' + phone.slice(7)
  } else {
    return '--'
  }
}
const rankList = ref([])
const rankListCom = computed(() => {
  const arr = rankList.value.slice(3)
  return arr
})
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
  background:
    url('./images/rank-bg3.png') no-repeat 0px -100px,
    url('./images/rang-bg1.png');
  background-size: 100% 100%;
  overflow: auto;
  border: 1px solid transparent;
  .list {
    position: relative;
    width: 90%;
    margin: auto;
    height: calc(100vh - 590px);
    padding-top: 30px;
    padding-bottom: 20px;
    //height: 240px;
    background-color: rgba(23, 33, 66, 0.66);
    display: flex;
    flex-direction: column;
    background:
      url('./images/rank-bg4.png') no-repeat top center/ 100% auto,
      url('./images/rank-bg5.png') no-repeat center 20px / 80% 90%;
    //overflow: hidden;
    .list-container {
      flex: 1;
      overflow-y: auto;
    }
    .list-item {
      width: 70%;
      margin: auto;
      color: #fff;
      display: flex;
      border-bottom: 1px dotted #fff;
      & > div {
        height: 45px;
        line-height: 40px;
        width: 40%;
        text-align: center;
        &:nth-child(1) {
          color: #fff;
          //background-image: url('./images/four.png');
          background-repeat: no-repeat;
          width: 20%;
          background-size: 26px auto;
          background-position: center 5px;
        }
      }
      &:nth-child(2) {
        & > div:nth-child(1) {
          //background-image: url('./images/one.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
      &:nth-child(3) {
        & > div:nth-child(1) {
          //background-image: url('./images/two.png');
          background-position: center 5px;
          background-size: 32px auto;
        }
      }
      &:nth-child(4) {
        & > div:nth-child(1) {
          //background-image: url('./images/three.png');
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

.qiansan {
  width: 100%;
  height: 180px;
  position: relative;
  margin-top: 170px;
  .one,
  .two,
  .three {
    position: absolute;
    background: url('./images/rank-avatar-bg.png');
    background-size: 100% 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .info {
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-weight: bolder;
      p {
        color: transparent;
        background-image: -webkit-linear-gradient(45deg, #f3debb, #fcf6ed); /* Chrome, Safari */
        background-image: linear-gradient(45deg, #f3debb, #fcf6ed); /* 标准语法 */
        -webkit-background-clip: text; /* Chrome, Safari */
        background-clip: text;
        white-space: nowrap;
        &:nth-child(1) {
          font-size: 16px;
        }
        &:nth-child(2) {
          font-size: 13px;
        }
        &:nth-child(3) {
          margin-top: 4px;
          font-size: 16px;
        }
      }
    }
  }
  .two,
  .three {
    top: 30px;
    width: 95px;
    height: 80px;
    .info {
      bottom: -65px;
    }
  }
  .one {
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 100px;
    .info {
      font-size: 16px;
      bottom: -70px;
    }
  }
  .two {
    left: 8%;
  }
  .three {
    right: 8%;
  }
}
.linear {
  background-image: -webkit-linear-gradient(45deg, #f3debb, #fcf6ed); /* Chrome, Safari */
  background-image: linear-gradient(45deg, #f3debb, #fcf6ed); /* 标准语法 */
  -webkit-background-clip: text; /* Chrome, Safari */
  background-clip: text;
  color: transparent;
}
</style>
