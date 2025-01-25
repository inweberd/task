<template>
  <div class="wallet-page">
    <van-nav-bar
      title="收支明细"
      safe-area-inset-top
      fixed
      placeholder
      :class="{ inApp: getIsInApp() }"
      @click-left="router.back()"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <Loading v-if="loading" />

    <div class="balance-info" v-if="false">
      <div style="display: flex; justify-content: space-evenly">
        <div>
          <div class="balance-text">充值余额</div>
          <div class="balance-amount">￥{{ method.format(state.wallet?.amount || 0) }}</div>
        </div>
        <div>
          <div class="balance-text">可提现余额</div>
          <div class="balance-amount">￥{{ method.format(state.wallet?.money || 0) }}</div>
        </div>
      </div>
      <div class="balance-actions">
        <!-- <van-button type="primary" plain icon="plus" class="action-button">充值</van-button> -->
        <van-button
          type="primary"
          icon="balance-list-o"
          class="action-button"
          @click="go('recharge')"
          color="#1989FA"
          >购买</van-button
        >
        <van-button
          type="primary"
          icon="balance-list-o"
          class="action-button"
          @click="go('/dep')"
          color="#1989FA"
          >提现</van-button
        >

        <!-- <van-image :src="imageSrc" width="100" height="100%"   fit="fill" class="action-button"></van-image> -->
      </div>
    </div>
    <van-tabs v-model:active="activeTab" background="transparent" color="#01c5f0">
      <van-tab title="团队分红  " name="团队分红"></van-tab>
      <van-tab title="奖池发放  " name="排行榜奖励"></van-tab>
      <van-tab title="认购返利" name="认购返利"></van-tab>
      <van-tab title="支出" name="支出"></van-tab>
      <van-tab title="提现" name="提现"></van-tab>
    </van-tabs>
    <!--    <div class="tab">-->
    <!--      <div class="tab-item" :class="{ active: activeTab === '团队分红  ' }" @click="activeTab = '团队分红  '">-->
    <!--        团队分红  -->
    <!--      </div>-->
    <!--      <div class="tab-item" :class="{ active: activeTab === '支出' }" @click="activeTab = '支出'">-->
    <!--        支出-->
    <!--      </div>-->
    <!--      <div class="tab-item" :class="{ active: activeTab === '提现' }" @click="activeTab = '提现'">-->
    <!--        提现-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <van-tabs v-model:active="activeTab" @change="change">-->
    <!--      <van-tab title="小额分红明细" name="团队分红  ">-->
    <wallet-income v-if="activeTab === '团队分红'"></wallet-income>
    <!--      </van-tab>-->
    <!--      <van-tab title="支出明细" name="支出">-->
    <wallet-expense v-if="activeTab === '支出'"></wallet-expense>
    <!--      </van-tab>-->
    <!--      <van-tab title="提现记录" name="提现">-->
    <wallet-withdraw v-if="activeTab === '提现'"></wallet-withdraw>
    <rengoufanli v-if="activeTab === '认购返利'"></rengoufanli>
    <paihangjiangli v-if="activeTab === '排行榜奖励'"></paihangjiangli>
    <!--      </van-tab>-->
    <!--    </van-tabs>-->
    <modzz v-model="service"></modzz>
  </div>
</template>

<script lang="ts" setup>
import WalletIncome from './wallet/income.vue'
import WalletExpense from './wallet/expense.vue'
import WalletWithdraw from './wallet/withdraw.vue'
import daefenhong from './wallet/daefenhong.vue'
import rengoufanli from './wallet/rengoufanli.vue'
import modzz from '../login/model.vue'
import imageSrc from '@/assets/img/chongzhi.png'
import { axiosInstance as axios } from '@/utils/myrequest'
import { test } from '@/api/myApi'
import { getIsInApp } from '@/utils/getTopPadding'
import Paihangjiangli from '@/pages/me/wallet/paihangjiangli.vue'

const router = useRouter()
const service = ref(false)
const activeTab = ref('团队分红  ')

const state = reactive({
  wallet: {},
  tabs: {
    value: 0,
    list: [
      { name: '团队分红  ' },
      { name: '支出', badge: { isDot: true } },
      { name: '提现' }
      // , disabled: true
    ],
    lineBg:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII='
  },
  modal: {
    service: false
  }
})
const loading = ref(false)
function change(e) {
  console.log(e)
}
function go(e) {
  router.push(e)
}
const method = {
  init: async () => {
    await method.wallet()
  },
  // 获取钱包信息
  wallet: async () => {
    loading.value = true
    const { code, data } = await axios.get('/api/wallet/query')
    loading.value = false
    if (code !== 200) return

    state.wallet = data
  },

  // 跳转
  // 格式化数字
  format: (price = 0) => {
    let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return result === '0' ? '0.00' : result
  }
}

onMounted(() => method.init())
</script>

<style lang="less" scoped>
.fixed-back {
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
}

.wallet-page {
  padding: 16px;
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
