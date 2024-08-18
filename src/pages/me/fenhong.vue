<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="团队分红"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <div class="content">
      <img class="redBag" src="./images/fenhongrenBag.png" alt="" />
      <img class="info" src="./images/fenhong-info.png" alt="" />
      <div class="fenhong">
        <div class="title">
          本次周期分红总金额 <br />
          （每10天进行一轮分红）
        </div>
        <div class="money">0</div>
        <van-divider style="border-color: #bababa"></van-divider>
        <div class="mine">
          <span
            >我的分红
            <span style="font-weight: bolder">(未发放) </span>
          </span>
          <span>0</span>
        </div>
      </div>
    </div>
    <!--<van-image-->
    <!--  :src="rule"-->
    <!--  width="94%"-->
    <!--  height="100%"-->
    <!--  style="margin-left: 3%; margin-top: -140px"-->
    <!--&gt;</van-image>-->
  </div>
</template>

<script lang="ts" setup>
import shareholder from '@/assets/img/shareholder2.jpg'
// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  //height: 300px;
  padding: 10px;
  box-sizing: border-box;
  background: url('./images/fenhontg-bg.jpg') no-repeat center center/ 100% 100%;
  overflow: hidden;
  .redBag {
    display: block;
    margin: 20px auto;
    width: 80%;
  }

  .info {
    width: 100%;
  }
  .fenhong {
    //display: flex;
    //justify-content: center;
    background: url('./images/square.png') no-repeat center center/ 100% 100%;
    overflow: hidden;
    margin-top: 10px;
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: bolder;
      margin: 20px;
    }
    .money {
      text-align: center;
      font-size: 28px;
      color: #f24530;
      font-weight: bolder;
    }
    .mine {
      padding: 10px 30px 20px;
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      span:nth-child(2) {
        color: #e3675d;
      }
    }
  }
}
</style>
