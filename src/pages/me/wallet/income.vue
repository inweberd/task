<template>
  <div class="card-body box-shadow radius-10 mx-3 mb-5">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getDataList"
    >
      <div v-for="(item, index) in dataList" :key="item.id" class="card">
        <div class="d-flex justify-content-between font-15">
          <span>{{ item.content }}</span>
          <span class="text-warning">+ {{ parseFloat(item.money || 0).toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-content-between font-13 text-muted">
          <span>{{ item.remark }}</span>
          <span>{{ method.toDate(item.create_time) }}</span>
        </div>
        <span v-if="index != dataList.length - 1" class="h-2px bg-light d-block my-2"></span>
      </div>
    </van-list>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { reqWalletLog } from '@/api/myApi'
import { _notice } from '@/utils/index'
import { axiosInstance as axios } from '@/utils/myrequest'
import utils from '@/utils/utils.js'
const loading = ref(true)
const finished = ref(false)

const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))

const dataList = ref([])
const searchInfo = reactive({
  page: 0,
  limit: 10,
  phone: ''
})
const method = {
  toDate: (value) => utils.timeToDate(value)
}
const getDataList = () => {
  searchInfo.page++
  loading.value = true
  reqWalletLog({
    page: searchInfo.page,
    limit: searchInfo.limit,
    order: 'id desc',
    where: [
      ['type', '=', 1],
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
  padding: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 20px;
}
</style>
