<template>
  <div class="wallet-page">
    <van-nav-bar
      :class="{ inApp: getIsInApp() }"
      left-arrow
      style="background-color: transparent"
      title="收支详情"
      @click-left="router.back()"
    >
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <Loading v-if="loading" />

    <div style="background-color: #f3f3f3; margin: 10px; border-radius: 10px; overflow: hidden">
      <t-tabs :space-evenly="false" default-value="收入" @change="tabChange">
        <t-tab-panel label="收入" value="收入" />
        <!--        <t-tab-panel label="佣金嘉奖" value="佣金嘉奖" />-->
        <!--        <t-tab-panel label="排行榜" value="分红榜" />-->
        <t-tab-panel label="月卡2代奖" value="推荐奖" />
        <!--        <t-tab-panel value="游戏" label="游戏" />-->
        <t-tab-panel label="爬塔" value="阶梯详情" />
        <t-tab-panel label="转赠" value="转赠记录" />
        <!--        <t-tab-panel label="搬砖收益" value="搬砖收益" />-->
        <t-tab-panel label="支出" value="支出" />
        <!--        <t-tab-panel label="变现" value="兑换" />-->
      </t-tabs>
    </div>

    <wallet-income v-if="activeTab === '收入'"></wallet-income>
    <zhuanzengjilu v-if="activeTab === '转赠记录'"></zhuanzengjilu>
    <yongjinjiajiang v-if="activeTab === '佣金嘉奖'"></yongjinjiajiang>
    <!--      </van-tab>-->
    <!--      <van-tab title="支出明细" name="支出">-->
    <wallet-expense v-if="activeTab === '支出'"></wallet-expense>
    <!--      </van-tab>-->
    <!--      <van-tab title="兑换记录" name="兑换">-->
    <wallet-withdraw v-if="activeTab === '兑换'"></wallet-withdraw>
    <rengoufanli v-if="activeTab === '推荐奖'"></rengoufanli>
    <paihangjiangli v-if="activeTab === '分红榜'"></paihangjiangli>
    <youxilog v-if="activeTab === '游戏'"></youxilog>
    <jubaopenlog v-if="activeTab === '阶梯详情'"></jubaopenlog>
    <!--      </van-tab>-->
    <!--    </van-tabs>-->
    <modzz v-model="service"></modzz>
  </div>
</template>

<script lang="ts" setup>
import WalletIncome from './wallet/income.vue'
import WalletExpense from './wallet/expense.vue'
import WalletWithdraw from './wallet/withdraw.vue'
import rengoufanli from './wallet/rengoufanli.vue'
import yongjinjiajiang from './wallet/yongjinjiajiang.vue'
import youxilog from './wallet/youxilog.vue'
import jubaopenlog from './wallet/jubaopenlog.vue'
import modzz from '../login/model.vue'
import { getIsInApp } from '@/utils/getTopPadding'
import Paihangjiangli from '@/pages/me/wallet/paihangjiangli.vue'
import Zhuanzengjilu from '@/pages/me/wallet/zhuanzengjilu.vue'

const router = useRouter()
const service = ref(false)
const activeTab = ref('收入')
const tabChange = (a) => {
  console.log(a)
  activeTab.value = a
}

const loading = ref(false)
</script>

<style lang="less" scoped>
.fixed-back {
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
}

.wallet-page {
  background-color: #fff;
  //background: url('@/assets/img/main-bg.jpg');
  //background-size: 100% 100%;
  height: 100%;
  overflow-y: auto;

  :deep(.van-nav-bar) {
    //background: #65b63f !important;
    .van-nav-bar__title {
      color: #000 !important;
    }

    .van-nav-bar__text {
      color: #000 !important;
    }

    .van-icon {
      color: #000;
    }
  }
  :deep(.van-hairline--bottom) {
    &:after {
      border-bottom: none;
    }
  }

  :deep(.t-tabs__nav) {
    .t-tabs__wrapper {
      background-color: #eaeaea !important;
    }
    .t-tabs__scroll {
      background-color: #eaeaea !important;
    }
  }
}

.balance-info {
  text-align: center;
  margin-bottom: 20px;
}

.balance-text {
  color: #999;
  font-size: 14px;
}

.balance-amount {
  color: #000;
  font-size: 32px;
  font-weight: bold;
  margin: 10px 0;
}

.balance-actions {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  gap: 10px;

  .van-button {
    border-radius: 20px;
  }
}

.action-button {
  width: 120px;
  height: 50px;
  border: none;
}

.tab {
  margin-left: 2%;
  background-size: 100% 100%;
  width: 96%;
  height: 40px;
  background-color: #5d5e5f;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 4px;
  overflow: hidden;
  box-sizing: border-box;

  .tab-item {
    height: 100%;
    border-radius: 20px;
    flex: 1;
    display: flex;
    align-content: center;
    justify-content: center;
    line-height: 32px;
    color: #f3f3f3;

    &.active {
      background-color: #4b6fff;
    }
  }
}
</style>
