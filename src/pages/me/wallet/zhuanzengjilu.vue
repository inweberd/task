<template>
  <div class="container">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="暂无数据"
      @load="getDataList"
    >
      <div v-for="(item, index) in dataList" style="position: relative" :key="item.id" class="card">
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
              <span style="font-size: 14px; font-weight: bolder; color: #000">{{
                item.title
              }}</span>
            </div>
            <div>
              <span style="font-size: 12px; color: #000">{{ item.subtitle }}</span>
            </div>
          </div>
          <div style="flex: 1; text-align: right">
            <div>
              <span
                style="font-size: 16px; color: #f6202b; font-weight: bolder"
                class="text-warning"
              >
                {{ (item.value / 10).toFixed(2) || 0 }}金币</span
              >
            </div>
            <div style="margin-top: 6px">
              <span style="font-size: 12px; color: #000">{{ method.toDate(item.createTime) }}</span>
            </div>
          </div>
        </div>
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
  limit: 30,
  phone: ''
})
const method = {
  toDate: (value) => utils.timeToDate(value, 'Y-M-D H:i')
}
const getDataList = () => {
  searchInfo.page++
  loading.value = true
  reqWalletLog({
    page: searchInfo.page,
    limit: searchInfo.limit,
    uid: userInfo.value.id,
    // order: 'id desc',
    // type: '1',
    // scene: 'reward'
    objectType: 'wallet-trade-order'
    // bind_type: 'incentive'
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
  padding: 10px 15px 5px;
  border-radius: 10px;
  margin-top: 10px;
}
.container {
  background-color: var(--wallet-bg);
  margin: 10px;
  border-radius: 10px;
  color: #fff;
}
</style>
