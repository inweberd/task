<template>
  <div class="wallet-page">
    <van-nav-bar
      :class="{ inApp: getIsInApp() }"
      left-arrow
      left-text="返回"
      style="background-color: transparent"
      title="收支明细"
      @click-left="router.back()"
    >
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <Loading v-if="loading" />

    <div style="background-color: #1f203d; margin: 10px; border-radius: 10px; overflow: hidden">
      <t-tabs :space-evenly="false" default-value="收入" theme="tag" @change="tabChange">
        <t-tab-panel label="收入" value="收入" />
        <!--        <t-tab-panel label="佣金嘉奖" value="佣金嘉奖" />-->
        <!--      <t-tab-panel value="排行榜奖励" label="奖池发放" />-->
        <t-tab-panel value="推荐奖" label="推荐奖" />
        <t-tab-panel value="游戏" label="游戏" />
        <t-tab-panel value="聚宝盆" label="聚宝盆" />
        <t-tab-panel label="支出" value="支出" />
        <t-tab-panel label="提现" value="提现" />
      </t-tabs>
    </div>

    <wallet-income v-if="activeTab === '收入'"></wallet-income>
    <yongjinjiajiang v-if="activeTab === '佣金嘉奖'"></yongjinjiajiang>
    <!--      </van-tab>-->
    <!--      <van-tab title="支出明细" name="支出">-->
    <wallet-expense v-if="activeTab === '支出'"></wallet-expense>
    <!--      </van-tab>-->
    <!--      <van-tab title="提现记录" name="提现">-->
    <wallet-withdraw v-if="activeTab === '提现'"></wallet-withdraw>
    <rengoufanli v-if="activeTab === '推荐奖'"></rengoufanli>
    <paihangjiangli v-if="activeTab === '排行榜奖励'"></paihangjiangli>
    <youxilog v-if="activeTab === '游戏'"></youxilog>
    <jubaopenlog v-if="activeTab === '聚宝盆'"></jubaopenlog>
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
  background-color: #1f203d;

  height: 100%;
  overflow-y: auto;
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
    color: rgb(180, 164, 130);

    &.active {
      background-color: #4b6fff;
    }
  }
}
</style>
