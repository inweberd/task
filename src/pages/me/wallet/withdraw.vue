<template>
  <div class="container">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getDataList"
    >
      <div v-for="(item, index) in dataList" :key="item.id" class="card" style="position: relative">
        <!--        <div-->
        <!--          v-if="item.count"-->
        <!--          style="-->
        <!--            position: absolute;-->
        <!--            height: 20px;-->
        <!--            background-color: red;-->
        <!--            top: -5px;-->
        <!--            left: 0;-->
        <!--            border-radius: 10px;-->
        <!--            display: flex;-->
        <!--            align-items: center;-->
        <!--            justify-content: center;-->
        <!--            padding: 0 5px;-->
        <!--          "-->
        <!--        >-->
        <!--          *{{ item.count }}-->
        <!--        </div>-->

        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="width: 60%">
            <div>
              <span style="font-size: 14px; font-weight: bolder; color: #000">
                <span v-if="!item.remark">
                  <span v-if="item.status === 'wait'" class="text-warning">等待审核</span>
                  <span v-else-if="item.status === 'finish'" class="text-success"
                    >钻石乐园兑换成功！
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
              </span>
            </div>
            <div>
              <span style="font-size: 12px; color: #000">{{
                method.toDate(item.create_time)
              }}</span>
            </div>
          </div>
          <div style="flex: 1; text-align: right">
            <div>
              <span
                class="text-warning"
                style="font-size: 16px; color: #f6202b; font-weight: bolder"
                >{{ item.money || 0 }}钻石</span
              >
            </div>
            <!--            <div style="margin-top: 6px">-->
            <!--              <span>{{ method.toDate(item.create_time) }}</span>-->
            <!--            </div>-->
          </div>
        </div>
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
  toDate: (value) => utils.timeToDate(value, 'Y-M-D H:i')
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
    dataList.value.push(...(data.data || []))
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
  padding: 10px 15px 5px;
  border-radius: 10px;
  margin-top: 10px;
}

.container {
  background-color: var(--wallet-bg);
  margin: 10px;
  border-radius: 10px;
  color: #000;
}
</style>
