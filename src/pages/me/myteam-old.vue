<template>
  <div class="team-benefits">
    <van-nav-bar
      title="团队报表"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="router.back()"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <!--    <Loading v-if="loading" />-->
    <div>
      <!--      <div class="summary">-->
      <!--        <div class="summary-item">-->
      <!--          <div class="amount">￥{{ format(memberInfo?.wallet?.deposit?.money) }}</div>-->
      <!--          <div class="label">团队总充值（元）</div>-->
      <!--        </div>-->
      <!--        <div class="summary-item">-->
      <!--          <div class="amount">￥{{ format(memberInfo?.wallet?.withdraw?.money) }}</div>-->
      <!--          <div class="label">团队总提现（元）</div>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="stats">
        <div class="stat-item">
          <div class="label">团队总人数</div>
          <div class="number">
            {{ memberInfo.team?.total || 0 }}
          </div>
        </div>
        <div class="stat-item">
          <div class="label">团队有效人数</div>
          <div class="number">{{ memberInfo.team?.vip || 0 }}</div>
        </div>
        <div class="stat-item">
          <div class="label">直推总人数</div>
          <div class="number">{{ memberInfo.first?.total || 0 }}</div>
        </div>
        <div class="stat-item">
          <div class="label">直推有效人数</div>
          <div class="number">{{ memberInfo.first?.vip || 0 }}</div>
        </div>
        <!--        <div class="stat-item">-->
        <!--          <div class="number">{{ memberInfo.first?.rebate || 0 }}</div>-->
        <!--          <div class="label">直推总收益</div>-->
        <!--        </div>-->
        <!--        <div class="stat-item">-->
        <!--          <div class="number">{{ memberInfo.team?.rebate || 0 }}</div>-->
        <!--          <div class="label">团队总收益</div>-->
        <!--        </div>-->
        <div class="stat-item">
          <div class="label">团队总充值</div>
          <div class="number">￥{{ memberInfo.team?.deposit || 0 }}</div>
        </div>
        <div class="stat-item">
          <div class="label">团队总提现</div>
          <div class="number">￥{{ memberInfo.team?.withdraw || 0 }}</div>
        </div>
        <div class="stat-item" style="width: 100%">
          <div class="label">今日收益</div>
          <div class="number">￥{{ userIncomeInfo.today || 0 }}</div>
        </div>
        <!--        <div class="stat-item">-->
        <!--          <div class="number">{{ userIncomeInfo.total || 0 }}</div>-->
        <!--          <div class="label">历史收益</div>-->
        <!--        </div>-->
        <!--        <div class="stat-item">-->
        <!--          <div class="number">{{ 0 }}</div>-->
        <!--          <div class="label">股东晋级奖励</div>-->
        <!--        </div>-->
      </div>
      <!--      <van-search v-model="searchInfo.phone" placeholder="请输入要查询的手机号码" />-->
      <van-button color="#689CFC" style="width: 100%; border-radius: 20px">直推人员列表</van-button>
      <van-list
        style="margin-top: 20px"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getDataList"
      >
        <div class="card" v-for="item in dataList">
          <div class="card-body d-flex justify-content-between flex-row align-items-center">
            <div class="d-flex flex-row">
              <div class="u-avatar u-avatar--circle avatar-shadow">
                <van-image :src="headImg" width="50" height="50" />
              </div>
              <div class="d-flex flex-column justify-content-center ms-2">
                <div class="d-flex flex-row align-items-center">
                  <div
                    class="font-15 me-2"
                    style="display: flex; flex-direction: column; align-items: flex-start"
                  >
                    <span>
                      电话:{{
                        (item.phone
                          ? item.phone.substring(0, 3) + '****' + item.phone.substring(7)
                          : '') || item.nickname
                      }}</span
                    >
                    <span style="font-size: 14px">
                      等级：{{ getSerialName(item?.staff?.serial) }}
                    </span>
                  </div>
                </div>
                <!--                <div class="mt-1 text-muted font-13">-->
                <!--                  {{ utils.timeToDate(item.create_time, 'Y-M-D H:i:s') }}-->
                <!--                </div>-->
              </div>
            </div>
            <div class="money">￥{{ parseFloat(item?.staff?.money || 0).toFixed(2) }}</div>
          </div>
        </div>
      </van-list>
    </div>

    <modzz v-model="service"></modzz>
  </div>
</template>

<script lang="ts" setup>
import modzz from '../login/model.vue'
import utils from '@/utils/utils.js'
import { axiosInstance as axios } from '@/utils/myrequest'
import { useRouter } from 'vue-router'
import { onMounted, ref, reactive, onActivated } from 'vue'
import { reqUserDistribution, reqUserIncome, reqUserMemberInfo } from '@/api/myApi'
import { _notice } from '@/utils'
import { getSerialName } from '../../utils/getSerialName'
import { getIsInApp } from '@/utils/getTopPadding'
import headImg from '@/assets/img/head.png'
const router = useRouter()
let user
const loading = ref(true)
const finished = ref(false)
const service = ref(false)
const memberInfo = ref({})
const dataList = ref([])
const userIncomeInfo = ref({})

const format = (price = 0) => {
  let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return result === '0' ? '0.00' : result
}
const getMemberInfo = async () => {
  reqUserMemberInfo({
    uid: user.id
  }).then((res) => {
    memberInfo.value = res.data
  })
}
const getUserIncome = () => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
  })
}
const searchInfo = reactive({
  page: 0,
  limit: 10,
  phone: ''
})
const getDataList = async (index = 'one') => {
  searchInfo.page++

  loading.value = true
  const { code, msg, data } = await reqUserDistribution({
    page: searchInfo.page,
    limit: searchInfo.limit
  })
  loading.value = false
  if (code !== 200) {
    finished.value = true
    // _notice(msg)
    return
  }
  // 数据全部加载完成
  dataList.value.push(...data.data)
  console.log('data.data ', data.data)
  console.log('data.data ', dataList.value.length, data.count)
  if ((data.data || []).length === 0 || dataList.value.length >= data.count) {
    finished.value = true
  }
}
const init = async () => {
  getMemberInfo()
  getDataList()
}
onActivated(() => {
  dataList.value = []
  finished.value = false
  searchInfo.page = 0

  init()
  getUserIncome()
})

onMounted(() => {
  user = JSON.parse(window.localStorage.getItem('userInfo'))
})
onActivated(() => {
  user = JSON.parse(window.localStorage.getItem('userInfo'))
})
</script>

<style lang="less" scoped>
.fixed-back {
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
}

.team-benefits {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.summary-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  flex: 1;
  margin: 0 5px;
  text-align: center;
}

.summary-item:first-child,
.summary-item:last-child {
  margin-left: 0;
  margin-right: 0;
}

.amount {
  color: #f60;
  font-size: 24px;
  font-weight: bold;
}

.label {
  margin-top: 5px;
  color: #323233;
  font-size: 12px;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.stat-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  width: 40%;
  margin-bottom: 10px;
  text-align: center;
}

.number {
  color: #689cfc;
  font-size: 24px;
}

.no-more {
  text-align: center;
  color: #999;
  margin-top: 20px;
}

.card {
  padding: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 40px;
  margin-bottom: 20px;
  background-color: #fff;
  color: #323233;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.u-avatar {
  width: 40px;
  height: 40px;
  background-color: transparent;
  margin-right: 20px;
}

.u-avatar__image {
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
}

.d-flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.align-items-center {
  align-items: center;
}

.justify-content-between {
  justify-content: space-between;
}

.ms-2 {
  margin-left: 8px;
}

.me-2 {
  margin-right: 8px;
}

.mt-1 {
  margin-top: 4px;
}

.text-warning {
  color: orange;
}

.text-muted {
  color: #999;
}

.font-15 {
  font-size: 15px;
}

.font-13 {
  font-size: 13px;
}
</style>
