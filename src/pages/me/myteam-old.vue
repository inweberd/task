<template>
  <div class="team-benefits">
    <van-nav-bar
      title="我的团队"
      safe-area-inset-top
      fixed
      placeholder
      @click-left="router.back()"
      left-arrow
    >
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <div class="container">
      <div class="num-box">
        <div>
          <div>总人数</div>
          <div>{{ memberInfo.team?.total || 0 }}</div>
        </div>
        <div>
          <div>
            <div>会员人数</div>
            <div>{{ memberInfo.team?.vip || 0 }}</div>
          </div>
          <div>
            <div>直推会员</div>
            <div>{{ memberInfo.first?.vip || 0 }}</div>
          </div>
        </div>
      </div>

      <div class="tuandui">
        <div class="tuandui-item">
          <p>团队总业绩</p>
          <p>{{ memberInfo.team?.deposit || 0 }} <span class="unit">元</span></p>
        </div>
        <div class="tuandui-item">
          <p>团队总提现</p>
          <p>{{ memberInfo.team?.withdraw || 0 }} <span class="unit">元</span></p>
        </div>
      </div>

      <div v-if="false" class="tuandui">
        <div class="tuandui-item">
          <p>直推总人数</p>
          <p>{{ memberInfo.first?.total || 0 }}</p>
        </div>
        <div class="tuandui-item">
          <p>直推会员人数</p>
          <p>{{ memberInfo.first?.vip || 0 }}</p>
        </div>
      </div>
    </div>
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

      <div class="stats" v-if="false">
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
          <div class="label">团队总充值(元)</div>
          <div class="number">{{ memberInfo.team?.deposit || 0 }}</div>
        </div>
        <div class="stat-item">
          <div class="label">团队总提现(元)</div>
          <div class="number">{{ memberInfo.team?.withdraw || 0 }}</div>
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
      <!--      <van-button color="#01c5f0" style="width: 100%; border-radius: 20px">直推人员列表</van-button>-->
      <div style="padding: 10px">
        <div style="font-size: 22px; color: #fff; font-weight: bolder">团队列表</div>
        <!--        <van-tabs-->
        <!--          v-model:active="active"-->
        <!--          title-active-color="#01c5f0"-->
        <!--          color="#01c5f0"-->
        <!--          @change="tabChange"-->
        <!--        >-->
        <!--          <van-tab :title="'一级(' + (teamIds['one']?.length || 0) + ')'" name="one" />-->
        <!--          <van-tab :title="'二级(' + (teamIds['two']?.length || 0) + ')'" name="two" />-->
        <!--          <van-tab :title="'三级(' + (teamIds['three']?.length || 0) + ')'" name="three" />-->
        <!--        </van-tabs>-->
        <div style="background-color: #1f203d; margin: 10px; border-radius: 10px; overflow: hidden">
          <t-tabs
            default-value="one"
            style="background-color: transparent; border-radius: 10px"
            theme="tag"
            :space-evenly="false"
            @change="tabChange"
          >
            <t-tab-panel value="one" :label="'一级直推(' + (teamIds['one']?.length || 0) + ')'" />
            <t-tab-panel value="two" :label="'二级直推(' + (teamIds['two']?.length || 0) + ')'" />
            <t-tab-panel
              value="three"
              :label="'三级直推(' + (teamIds['three']?.length || 0) + ')'"
            />
          </t-tabs>
        </div>

        <van-list
          style="margin-top: 20px"
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getDataList"
        >
          <div class="card" v-for="item in dataList">
            <div class="card-body d-flex justify-content-between flex-row align-items-center">
              <div class="d-flex flex-row" style="width: 100%; align-items: center">
                <div class="u-avatar u-avatar--circle avatar-shadow">
                  <van-image :src="headImg" width="40" height="40" />
                </div>
                <div class="d-flex flex-column justify-content-center ms-2" style="flex: 1">
                  <div class="d-flex flex-row align-items-center">
                    <div
                      class="font-15 me-2"
                      style="
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                      "
                    >
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                        "
                      >
                        <span
                          style="
                            margin-bottom: 10px;
                            color: #fff;
                            font-weight: bolder;
                            font-size: 16px;
                          "
                        >
                          {{
                            (item.phone
                              ? item.phone.substring(0, 3) + '****' + item.phone.substring(7)
                              : '') || item.nickname
                          }}</span
                        >
                        <span style="font-size: 14px; color: #ccc">
                          {{ utils.timeToDate(item.create_time, 'Y-M-D') }}
                        </span>
                      </div>
                      <span
                        style="
                          font-size: 14px;
                          border: 1px solid #ccc;
                          color: #ccc;
                          border-radius: 10px;
                          padding: 2px 5px;
                        "
                      >
                        {{ getSerialName(item?.result?.staff?.serial) }}
                      </span>
                    </div>
                  </div>
                  <!--                <div class="mt-1 text-muted font-13">-->
                  <!--                {{ utils.timeToDate(item.create_time, 'Y-M-D H:i:s') }}-->
                  <!--                </div>-->
                </div>
              </div>
              <!--            <div class="money">￥{{ parseFloat(item?.result?.staff?.money || 0).toFixed(2) }}</div>-->
              <div class="money">
                <!--              ￥{{ parseFloat(item?.result?.wallet?.today?.profit || 0).toFixed(2) }}-->
              </div>
            </div>
          </div>
        </van-list>
      </div>
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
import {
  reqUserDistribution,
  reqUserIncome,
  reqUserMemberInfo,
  reqUserMemberTeamIds,
  reqUserMemberTeamList
} from '@/api/myApi'
import { _notice } from '@/utils'
import { getSerialName } from '../../utils/getSerialName'
import { getIsInApp } from '@/utils/getTopPadding'
import dayjs from 'dayjs'
import headImg from '@/assets/img/logo.png'
const router = useRouter()
let user
const loading = ref(true)
const finished = ref(false)
const service = ref(false)
const memberInfo = ref({})
const dataList = ref([])
const userIncomeInfo = ref({})
const active = ref('one')
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
const teamIds = ref({})
let isHaveIds = false
const getDataList = async (index = 'one') => {
  if (!isHaveIds) {
    const idsRes = await reqUserMemberTeamIds()
    teamIds.value = idsRes.data
    isHaveIds = true
  }
  searchInfo.page++

  loading.value = true
  // const { code, msg, data } = await reqUserDistribution({
  const { code, msg, data } = await reqUserMemberTeamList({
    ids: teamIds.value[active.value],
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
const tabChange = (a) => {
  active.value = a
  dataList.value = []
  finished.value = false
  searchInfo.page = 0
  getDataList()
}

onActivated(() => {
  dataList.value = []
  finished.value = false
  isHaveIds = false
  searchInfo.page = 0
  teamIds.value = {}

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
  color: #fff;
  font-size: 12px;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.stat-item {
  background-color: rgba(26, 62, 84, 0.7);
  border-radius: 8px;
  padding: 10px;
  width: 43%;
  margin-bottom: 10px;
  text-align: center;
}

.number {
  color: #d1e562;
  font-size: 24px;
}

.no-more {
  text-align: center;
  color: #999;
  margin-top: 20px;
}

.card {
  padding: 10px;
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 40px;
  margin-bottom: 20px;
  //background-color: #646060;
  color: #666;
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
  margin-right: 2px;
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

.container {
  color: #fff;
  //background-color: #edecfa;
  .num-box {
    padding: 16px;
    display: flex;
    align-items: center;

    & > div:nth-child(1) {
      width: 45%;

      & > div:nth-child(1) {
        color: #ccc;
        font-size: 16px;
      }

      & > div:nth-child(2) {
        font-size: 28px;
        margin-top: 8px;
        font-weight: bolder;
      }
    }

    & > div:nth-child(2) {
      width: 55%;
      display: flex;
      & > div {
        width: 50%;
        & > div:nth-child(1) {
          font-size: 14px;
          color: #ccc;
        }

        & > div:nth-child(2) {
          font-size: 22px;
          margin-top: 8px;
          font-weight: bolder;
        }
      }
    }
  }

  .zhitui {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    background: linear-gradient(to right, #a423ce, #a423ce);
    border-radius: 20px;

    & > div {
      display: flex;
      flex-direction: column;

      p:nth-child(1) {
        letter-spacing: 2px;
      }
      p:nth-child(2) {
        margin-top: 12px;
        font-size: 26px;
        font-weight: bolder;
      }
    }
  }
  .tuandui {
    padding: 0 16px 16px;

    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .tuandui-item {
      background: linear-gradient(to right, #fff, #fff);
    }

    .tuandui-item {
      flex: 1;
      border-radius: 5px;
      padding: 10px 20px;

      p:nth-child(1) {
        font-size: 16px;
        color: #666;
      }
      p:nth-child(2) {
        margin-top: 10px;
        font-size: 24px;
        font-weight: bolder;
        color: #000;

        .unit {
          font-weight: normal;
          font-size: 16px;
        }
      }
      &:nth-child(1) {
        //background: linear-gradient(to right, #eb677e, #f989c6);
        margin-right: 10px;
      }
      &:nth-child(2) {
        margin-left: 5px;
        //background: linear-gradient(to right, #33aafa, #72c8f7);
      }
      //&:nth-child(3) {
      //  background: linear-gradient(to right, #f98a5f, #fcb591);
      //}
    }
  }
}
</style>
<style>
.t-tabs__wrapper {
  background-color: transparent !important;
}
</style>
