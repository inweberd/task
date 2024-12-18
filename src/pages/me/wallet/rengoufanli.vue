<template>
  <view class="card-body box-shadow radius-10 mx-3 mb-5" style="color: #fff">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getDataList"
    >
      <div v-for="(item, index) in dataList" :key="item.id" class="card">
        <div class="d-flex justify-content-between font-15">
          <span>{{ item.content }}</span>
          <!--          <span class="text-warning">- {{ parseFloat(item.money || 0).toFixed(2) }}</span>-->
          <span class="text-warning">+{{ item.money || 0 }}</span>
        </div>
        <div class="d-flex justify-content-between font-13 text-muted">
          <span>{{ item.remark }}</span>
          <span>{{ method.toDate(item.create_time) }}</span>
        </div>
        <div v-if="index != dataList.length - 1" class="h-2px bg-light d-block my-2"></div>
      </div>
    </van-list>
  </view>
</template>

<script setup>
import { axiosInstance as axios } from '@/utils/myrequest'

import utils from '@/utils/utils.js'
import { reactive, onMounted, ref } from 'vue'
import { reqWalletLog } from '@/api/myApi'
import { _notice } from '@/utils/index'
const loading = ref(true)
const finished = ref(true)

const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))

const method = {
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
  reqWalletLog({
    page: searchInfo.page,
    limit: searchInfo.limit,
    order: 'id desc',
    where: [
      ['bind_type', '=', 'staff-award'],
      ['uid', '=', userInfo.value.id]
    ]
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
  dataList.value = []
  finished.value = false
  searchInfo.page = 0
  getDataList()
})
</script>

<style scoped>
.no-data {
  text-align: center;
  color: #999;
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
