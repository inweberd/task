<template>
  <div class="card-body box-shadow radius-10 mx-3 mb-5" style="color: #fff">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getDataList"
    >
      <div v-for="(item, index) in dataList" :key="item.id" class="card">
        <div class="d-flex justify-content-between font-15">
          <span v-if="!item.remark">
            <span v-if="item.status === 'wait'" class="text-warning">等待审核</span>
            <span v-else-if="item.status === 'finish'" class="text-success"
              >大拇指视频提现成功！
            </span>
            <span v-else-if="item.status === 'paying'" class="text-dark">转账中</span>
            <span v-else-if="item.status === 'fail'" class="text-danger"
              >转账失败（收款帐号有误，请更换）</span
            >
            <span v-else-if="item.status === 'cancel'" class="text-dark">
              收款账号有误，请更换正确收款方式</span
            >
            <span v-else>{{ item.status }}</span>
          </span>
          <span>{{ item.remark }}</span>
          <!--          <span class="text-warning">{{ parseFloat(item.money || 0).toFixed(2) }}</span>-->
          <span class="text-warning">{{ item.money || 0 }}元</span>
        </div>
        <!--        <div style="margin-top: 6px">每周排行超级股东分红，奖励更丰厚！</div>-->
        <div style="margin-top: 6px">
          <span>{{ method.toDate(item.create_time) }}</span>
        </div>
        <!--        <div class="d-flex justify-content-between font-13 text-muted">-->
        <!--          <span>-->
        <!--            &lt;!&ndash;            邀请好友观看视频，奖励多多&ndash;&gt;-->
        <!--            &lt;!&ndash;            {{ state.bank.list.find(({ value }) => value === item.result.card.card_type)?.label }}&ndash;&gt;-->
        <!--            &lt;!&ndash;            ( {{ item.result.card.name }} )&ndash;&gt;-->
        <!--          </span>-->
        <!--          <span>{{ method.toDate(item.create_time) }}</span>-->
        <!--        </div>-->
        <div v-if="index != dataList.length - 1" class="h-2px bg-light d-block my-2"></div>
      </div>
    </van-list>
  </div>
</template>

<script setup>
import { axiosInstance as axios } from '@/utils/myrequest'

import utils from '@/utils/utils.js'
import { reactive, onMounted, ref } from 'vue'
import { reqWalletFetch, reqWalletLog } from '@/api/myApi'
import { _notice } from '@/utils/index'
const loading = ref(true)
const finished = ref(false)

const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))

const state = reactive({
  bank: {
    list: [],
    back: []
  }
})
const method = {
  // 查询银行列表
  bank: async () => {
    const { data: item } = await axios.get('/api/pay-card/bank-list')

    let list = []
    for (let key in item) {
      list.push({ label: item[key], value: key })
    }

    state.bank.list = list
    state.bank.back = list
  },
  // 时间戳转日期
  toDate: (value) => utils.timeToDate(value)
}

const dataList = ref([])
const searchInfo = reactive({
  page: 0,
  limit: 10,
  phone: ''
})
const getDataList = () => {
  searchInfo.page++
  loading.value = true
  reqWalletFetch({
    page: searchInfo.page,
    limit: searchInfo.limit,

    order: 'id desc',
    where: [['uid', '=', userInfo.value.id]]
  }).then(({ code, msg, data }) => {
    loading.value = false
    if (code !== 200) {
      finished.value = true
      return
    }
    // 数据全部加载完成
    dataList.value.push(...data.data)
    if ((data.data || []).length === 0 || dataList.value.length >= data.count) {
      finished.value = true
    }
  })
}

onMounted(() => {
  method.bank()
  dataList.value = []
  finished.value = false
  searchInfo.page = 0
  getDataList()
})
</script>

<style scoped>
.no-data {
  text-align: center;
  color: #fff;
  margin-top: 20px;
}
.card {
  background-color: rgba(26, 62, 84, 0.7);
  padding: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 20px;
}
</style>
