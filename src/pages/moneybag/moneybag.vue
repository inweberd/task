<template>
  <div class="moneybag">
    <van-nav-bar
      fixed
      left-arrow
      placeholder
      safe-area-inset-top
      title="我的钱包"
      @click-left="$router.back()"
    >
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="top-box">
        <div class="count-item">
          <div class="tip">余额（元）</div>
          <div class="num">0.00</div>
          <div class="cu-btn withdraw" @click="$router.push('/dep')">提现</div>
        </div>
        <div class="count-item">
          <div class="tip">积分</div>
          <div class="num">2</div>
          <div class="cu-btn charge" @click="$router.push('/recharge')">充值</div>
        </div>
      </div>
      <div class="function-list">
        <div class="function-item">
          <div style="height: 20px">
            <img src="https://lx.aosenn.com/h5/static/coin.png" draggable="false" />
          </div>
          <div class="function-item-item1 function-item-item2">充值、提现记录</div>
        </div>
        <div class="function-item">
          <div style="height: 20px">
            <div
              style="
                background-image: url('https://lx.aosenn.com/h5/static/sy.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
              "
            ></div>
            <img src="https://lx.aosenn.com/h5/static/sy.png" draggable="false" />
          </div>
          <div class="function-item-item1 function-item-item2">收益记录</div>
        </div>
        <div class="function-item">
          <div style="height: 20px">
            <div
              style="
                background-image: url('https://lx.aosenn.com/h5/static/jb.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
              "
            ></div>
            <uni-resize-sensor
              ><div><div></div></div>
              <div><div></div></div></uni-resize-sensor
            ><img src="https://lx.aosenn.com/h5/static/jb.png" draggable="false" />
          </div>
          <div class="function-item-item1">金币记录</div>
        </div>
      </div>
      <!----><!----><!----><!---->
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="less">
.moneybag {
  color: #303133;
  font-size: 14px;
  height: 100vh;
  background-color: #f3f3f3;
  :deep(.van-nav-bar) {
    background-color: #fed61f !important;

    .van-icon {
      color: #000 !important;
      font-size: 18px !important;
    }
  }

  .content {
    .top-box {
      width: 100%;
      height: 200px;
      display: flex;
      background-image: url(https://lx.aosenn.com/h5/static/img/my/account_bg.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .count-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .tip {
          font-size: 15px;
          font-weight: 700;
          font-family: PingFang SC;
          margin-top: 18px;
          color: #000;
        }

        .num {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 700;
          margin: 29px 0 35px;
          color: #000;
        }
        .withdraw {
          color: #000;
          border: 1px solid #000;
          background-color: initial;
        }
        .cu-btn {
          font-size: 15px;
          padding: 4px 20px;
          border-radius: 30px;
        }
        .charge {
          color: #000;
          background-color: #fff;
        }
      }
    }

    .function-list {
      .function-item {
        font-size: 15px;
        padding: 15px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        position: relative;

        img {
          width: 20px;
          height: 20px;
        }
        .function-item-item1 {
          flex: 1;
          box-sizing: border-box;
          margin-left: 10px;

          &::after {
            content: '';
            flex: 1;
            width: 88%;
            height: 1px;
            position: absolute;
            background-color: #eee;
            left: 10%;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>
