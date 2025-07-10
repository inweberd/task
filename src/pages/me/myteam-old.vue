<template>
  <div class="team-benefits">
    <van-nav-bar
      fixed
      left-arrow
      placeholder
      safe-area-inset-top
      title="我的团队"
      @click-left="router.back()"
    >
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <div class="container">
      <div class="info">
        <div class="avatar" @click="renzheng(userInfo.avatar)">
          <img :src="userInfo.avatar || headImg" />
        </div>
        <!--      <p-->
        <!--        v-if="showRenzheng"-->
        <!--        style="color: red; width: 100%; text-align: center; transform: translateY(-8px)"-->
        <!--      >-->
        <!--        点击头像可更换微信微信头像-->
        <!--      </p>-->
        <div class="info-r">
          <div class="t">
            <!--            <img src="./images/icon-rz.png" alt="" />-->
            <template v-if="userInfo.nickname"> {{ userInfo.nickname }}</template>
            <template v-else>
              {{
                userInfo.phone
                  ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
                  : ''
              }}
            </template>
          </div>
          <!--                <div class="c">-->
          <!--                    &lt;!&ndash;          <p>上级会员ID : {{ userInfo?.invite_id }}</p>&ndash;&gt;-->
          <!--                    <p>我的ID : {{ userInfo?.id }}</p>-->
          <!--                </div>-->
          <!--          <div class="b">-->
          <!--            <p>邀请码 : {{ userInfo?.result?.invite?.code }}</p>-->
          <!--          </div>-->
          <div class="b">
            <p>{{ userInfo?.result?.staff?.name || '暂无会员' }}</p>
          </div>
        </div>
      </div>

      <div class="sycontent">
        <div class="sycontent-tltle">
          <div class="sycontent-tltle1">账户信息</div>
          <div class="sycontent-tltle2" @click="$router.push('/wallet')">
            查看明细<van-icon name="arrow" />
          </div>
        </div>
        <div class="table">
          <div>
            <p style="color: rgb(203, 166, 126); font-size: 13px">团队总业绩</p>
            <p style="color: rgb(105, 46, 4); font-size: 22px">
              {{ memberInfo.team?.deposit || 0 }}
            </p>
          </div>
          <div>
            <p style="color: rgb(203, 166, 126); font-size: 13px">团队人数</p>
            <p style="color: rgb(105, 46, 4); font-size: 22px">{{ memberInfo.team?.total || 0 }}</p>
          </div>
          <div>
            <p style="color: rgb(203, 166, 126); font-size: 13px">今日收益</p>
            <p style="color: rgb(105, 46, 4); font-size: 22px">{{ userIncomeInfo.today || 0 }}</p>
          </div>
        </div>
      </div>
      <div class="team-box-b">
        <div class="team-box-tle">今日团队订单数据</div>
        <div class="team-box-list">
        <div class="team-box-list-item">
            <div class="team-box-list-item1">团队总数</div>
            <div class="team-box-list-item2">{{ memberInfo.team?.total || 0 }}</div>
        </div>
          <div class="team-box-list-item">
            <div class="team-box-list-item1">团队有效</div>
            <div class="team-box-list-item2">{{ memberInfo.team?.vip || 0 }}</div>
          </div>
          <div class="team-box-list-item">
            <div class="team-box-list-item1">直推总数</div>
            <div class="team-box-list-item2">{{ memberInfo.first?.total || 0 }}</div>
          </div>
          <div class="team-box-list-item">
            <div class="team-box-list-item1">直推有效</div>
            <div class="team-box-list-item2">{{ memberInfo.first?.vip || 0 }}</div>
          </div>
        <div class="team-box-list-item">
            <div class="team-box-list-item1">团队充值</div>
            <div class="team-box-list-item2">{{ memberInfo.first?.vip || 0 }}</div>
        </div>
          <div class="team-box-list-item">
            <div class="team-box-list-item1">团队总兑换</div>
            <div class="team-box-list-item2">{{ memberInfo.team?.withdraw || 0 }}</div>
          </div>
<!--          <div class="team-box-list-item">-->
<!--            <div class="team-box-list-item1">直推有效下级</div>-->
<!--            <div class="team-box-list-item2">{{ memberInfo.team?.direct || 0 }}</div>-->
<!--          </div>-->
          <!--          <div class="team-box-list-item">-->
          <!--            <div class="team-box-list-item1">收益(元)</div>-->
          <!--            <div class="team-box-list-item2">0</div>-->
          <!--          </div>-->
        </div>
      </div>

      <div>
        <div class="stats"></div>
        <!--      <van-search v-model="searchInfo.phone" placeholder="请输入要查询的手机号码" />-->
        <!--      <van-button color="#01c5f0" style="width: 100%; border-radius: 20px">直推人员列表</van-button>-->
        <div
          style="
            padding: 10px;
            background-color: #ffefd6;
            margin: 15px;
            border-radius: 15px 10px 0 0;
          "
        >
          <!--        <div style="font-size: 22px; color: #fff; font-weight: bolder">团队列表</div>-->
          <van-tabs
            v-model:active="active"
            color="#fe694b"
            title-active-color="#000"
            @change="tabChange"
          >
            <van-tab :title="'直推(' + (teamIds['one']?.length || 0) + ')'" name="one" />
            <van-tab :title="'间推(' + (teamIds['two']?.length || 0) + ')'" name="two" />
<!--            <van-tab :title="'3代(' + (teamIds['three']?.length || 0) + ')'" name="three" />-->
            <!--                  <van-tab :title="'三级(' + (teamIds['three']?.length || 0) + ')'" name="three" />-->
          </van-tabs>
          <!--        <div style="background-color: #1f203d; margin: 10px; border-radius: 10px; overflow: hidden">-->
          <!--          <t-tabs-->
          <!--            :space-evenly="false"-->
          <!--            default-value="one"-->
          <!--            style="background-color: transparent; border-radius: 10px"-->
          <!--            theme="tag"-->
          <!--            @change="tabChange"-->
          <!--          >-->
          <!--            <t-tab-panel :label="'直推下级(' + (teamIds['one']?.length || 0) + ')'" value="one" />-->
          <!--            <t-tab-panel :label="'间推下级(' + (teamIds['two']?.length || 0) + ')'" value="two" />-->
          <!--            &lt;!&ndash;                        <t-tab-panel&ndash;&gt;-->
          <!--            &lt;!&ndash;                            :label="'三级直推(' + (teamIds['three']?.length || 0) + ')'"&ndash;&gt;-->
          <!--            &lt;!&ndash;                            value="three"&ndash;&gt;-->
          <!--            &lt;!&ndash;                        />&ndash;&gt;-->
          <!--          </t-tabs>-->
          <!--        </div>-->
          <!--          <van-search v-model="searchId" placeholder="请输入下级ID" @search="onSearch" />-->
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            style="margin-top: 10px"
            @load="getDataList"
          >
            <div v-for="item in dataList" class="card">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div
                  class="d-flex flex-row"
                  style="
                    width: 100%;
                    align-items: center;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 10px;
                  "
                >
                  <div
                    class="u-avatar u-avatar--circle avatar-shadow"
                    style="border: 1px solid #ccc; border-radius: 50%; overflow: hidden"
                  >
                    <van-image :src="headImg" height="50" width="50" />
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
                          <div style="display: flex; align-items: center; justify-content: center">
                            <img alt="" src="./images/icon-rz.png" style="width: 15px" />

                            <span
                              style="
                                color: #000;
                                padding-left: 4px;
                                font-weight: bolder;
                                font-size: 15px;
                              "
                            >
                              <template v-if="active === 'one'">
                                <div>
                                  <div>
                                    {{ item.nickname || item.phone }}
                                  </div>
                                  <div>
                                    <span style="color: #999; font-size: 12px"
                                      >天梯等级：
                                      {{
                                        item?.result?.treasure?.bind_id
                                          ? item?.result?.treasure?.bind_id + '级'
                                          : '暂无'
                                      }}</span
                                    >
                                  </div>
                                </div>
                              </template>
                              <template v-else>
                                <div>
                                  <div>
                                    {{
                                      (item.phone
                                        ? item.phone.substring(0, 3) +
                                          '****' +
                                          item.phone.substring(7)
                                        : '') || item.nickname
                                    }}
                                  </div>
                                  <div>
                                    <span style="color: #999; font-size: 12px"
                                      >天梯等级：
                                      {{
                                        item?.result?.treasure?.bind_id
                                          ? item?.result?.treasure?.bind_id + '级'
                                          : '暂无'
                                      }}</span
                                    >
                                  </div>
                                </div>
                              </template>
                            </span>
                          </div>
                          <!--                          <span-->
                          <!--                            style="-->
                          <!--                              padding: 2px 4px;-->
                          <!--                              border-radius: 5px;-->
                          <!--                              font-size: 14px;-->
                          <!--                              width: fit-content;-->
                          <!--                              color: #666;-->
                          <!--                              background-color: #e5f2f9;-->
                          <!--                              margin-top: 8px;-->
                          <!--                            "-->
                          <!--                          >-->
                          <!--                            团队星级：{{ item?.result?.wallet?.star || 0 }}星-->
                          <!--                            &lt;!&ndash;                          {{ utils.timeToDate(item.create_time, 'Y-M-D H:i') }}&ndash;&gt;-->
                          <!--                          </span>-->
                        </div>
                        <span
                          style="
                            font-size: 14px;
                            border: 1px solid #ccc;
                            background-color: #ff6000;
                            color: #fff;
                            border-radius: 10px;
                            padding: 2px 5px;
                          "
                        >
                          {{ item?.result?.staff?.name || '暂无会员' }}
                        </span>
                      </div>
                    </div>
                    <!--                <div class="mt-1 text-muted font-13">-->
                    <!--                {{ utils.timeToDate(item.create_time, 'Y-M-D H:i:s') }}-->
                    <!--                </div>-->
                  </div>
                </div>
                <div
                  style="
                    width: 100%;
                    text-align: left;
                    padding-top: 8px;
                    font-size: 12px;
                    color: #999;
                  "
                >
                  注册时间： {{ utils.timeToDate(item.create_time, 'Y-M-D H:i') }}
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
import { copyToClipboard } from '@/utils/copyToClipboard'

const router = useRouter()
let user
const loading = ref(true)
const finished = ref(false)
const service = ref(false)
const memberInfo = ref({})
const dataList = ref([])
const userIncomeInfo = ref({})
const active = ref('one')
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))

const searchId = ref('')

const onSearch = () => {
  dataList.value = []
  finished.value = false
  searchInfo.page = 0
  // getDataList()
}

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
const getDataList = async () => {
  // debugger
  if (!isHaveIds) {
    const idsRes = await reqUserMemberTeamIds()
    teamIds.value = idsRes.data
    isHaveIds = true
  }
  loading.value = true

  let ids = teamIds.value[active.value]
  if (searchId.value) {
    if (ids.includes(searchId.value * 1)) {
      ids = [searchId.value]
    } else {
      loading.value = false

      finished.value = true
      return
    }
  }
  searchInfo.page++

  // const { code, msg, data } = await reqUserDistribution({
  const { code, msg, data } = await reqUserMemberTeamList({
    // ids: teamIds.value[active.value],
    ids: ids,
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
  // console.log('data.data ', data.data)
  // console.log('data.data ', dataList.value.length, data.count)
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
  searchId.value = ''
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
  background-color: rgb(247, 213, 152);
  //background: url('@/assets/img/main-bg.jpg') no-repeat left top / 100% 100%;

  :deep(.van-nav-bar) {
    background-color: #f6d598 !important;

    .van-icon {
      color: #fff !important;
    }
  }

  :deep(.van-nav-bar__content) {
    .van-nav-bar__title {
      color: #fff !important;
    }
  }

  :deep(.van-field__control) {
    color: #000 !important;
  }

  :deep(.van-tabs) {
    .van-tabs__nav {
      background-color: #fdfae9 !important;
    }
  }
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
  margin: 15px;
}

.stat-item {
  //background-color: rgba(26, 62, 84, 0.7);
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  width: 43%;
  margin-bottom: 10px;
  text-align: center;

  .label {
    color: #000;
    font-weight: bolder;
  }
}

.number {
  color: #628be5;
  font-size: 24px;
}

.no-more {
  text-align: center;
  color: #999;
  margin-top: 20px;
}

.card {
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  //background-color: #646060;
  color: #666;
}

.card-body {
  padding: 10px;
  background-color: #fdfae9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.u-avatar {
  width: 50px;
  height: 50px;
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
  //background: url('./images/team_bg.png') no-repeat left top / 120% 300px;

  .info {
    display: flex;
    padding: 20px 20px 30px;
    background: url('https://lx.aosenn.com/h5/static/find/teambj.png') no-repeat left top / 100%
      100%;

    .avatar {
      img {
        width: 60px;
        border-radius: 50%;
        height: 60px;
      }
    }

    .info-r {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .t {
        display: flex;
        align-items: center;
        color: #303133;
        font-size: 22px;
        font-weight: 700;
        img {
          margin-right: 8px;
          width: 20px;
        }
      }

      .c {
        color: #fff;
      }

      .b {
        display: flex;
        font-size: 12px;
        background-color: #ff6000;
        color: #fff;
        border-radius: 18px;
        margin-top: 4px;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 2px 10px;
      }
    }
  }

  .sycontent {
    position: relative;
    width: 100%;
    margin: 0 auto 10px auto;
    background-repeat: no-repeat;
    background-size: 100% 110px;
    box-sizing: border-box;
    padding: 0 4%;

    .sycontent-tltle {
      display: flex;
      padding: 0 15px;
      box-shadow: 0 2px 6px #f2debe;
      color: #a17545;
      background-color: #ffefd6;
      height: 40px;
      align-items: center;
      border-top-right-radius: 7px;
      border-top-left-radius: 7px;

      .sycontent-tltle2 {
        display: flex;
        align-items: center;
        margin-left: auto;
      }
    }
    .table {
      display: flex;
      justify-content: center;
      padding: 20px 0 20px 0;
      background-color: #fdfae9;
      border-bottom-right-radius: 7px;
      border-bottom-left-radius: 7px;

      & > div {
        width: 50%;
        p {
          padding: 5px 0;
          text-align: center;
        }
      }
    }
  }

  .team-box-b {
    width: 100%;
    padding: 0 4%;
    display: flex;
    font-size: 14px;
    box-sizing: border-box;
    flex-direction: column;
    margin: 10px 0;
    position: relative;

    .team-box-tle {
      height: 40px;
      line-height: 40px;
      position: relative;
      box-sizing: border-box;
      padding-left: 15px;
      display: flex;
      background-image: url(https://lx.aosenn.com/h5/static/find/cloumnbj1.png);
      background-size: 100% 100%;
      color: #fff;
    }
    .team-box-list {
      display: flex;
      background-color: #ffefd6;
      flex-wrap: wrap;
      padding: 6px 0;

      .team-box-list-item {
        width: 33%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .team-box-list-item1 {
          line-height: 32px;
          font-size: 13px;
          color: #cba67e;
        }
        .team-box-list-item2 {
          font-weight: 700;
          font-size: 14px;
          color: #692e04;
        }
      }
    }
  }

  .num-info {
    margin: 14px;
    background: url('./images/team_bg.jpg') no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    padding: 15px;
    color: #3c4c64;
    .top {
      display: flex;
      font-weight: bolder;
      img {
        width: 20px;
      }
      span {
        font-size: 16px;
        padding-left: 10px;
      }
    }

    .bottom {
      border-top: 1px solid rgba(123, 174, 217, 0.4);
      padding: 15px 5px 0;
      margin-top: 15px;
      display: flex;

      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        & > div:first-child {
          font-weight: bolder;
          font-size: 16px;
        }
      }
    }
  }
  .num-box {
    padding: 16px;
    display: flex;
    align-items: center;

    & > div:nth-child(1) {
      width: 35%;

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
      width: 65%;
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
