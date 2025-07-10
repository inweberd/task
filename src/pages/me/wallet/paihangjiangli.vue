<template>
  <div class="container card-body box-shadow radius-10 mx-3 mb-5" style="color: #fff">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getDataList"
    >
      <!--      <div v-for="(item, index) in dataList" :key="item.id" class="card" style="position: relative">-->
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
      <!--        <div class="d-flex justify-content-between font-15">-->
      <!--          <span>{{ item.content }}</span>-->
      <!--          &lt;!&ndash;          <span class="text-warning">+ {{ parseFloat(item.money || 0).toFixed(2) }}</span>&ndash;&gt;-->
      <!--          <span class="text-warning">+ {{ item.money || 0 }}</span>-->
      <!--        </div>-->
      <!--        <div class="d-flex justify-content-between font-13 text-muted">-->
      <!--          <span>{{ item.remark }}</span>-->
      <!--          <span>{{ method.toDate(item.create_time) }}</span>-->
      <!--        </div>-->
      <!--        <span v-if="index != dataList.length - 1" class="h-2px bg-light d-block my-2"></span>-->
      <!--      </div>-->
      <div v-for="item in dataList" :key="item.id" class="card" style="position: relative">
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
                item.content
              }}</span>
            </div>
            <div>
              <span style="font-size: 12px; color: #000">{{ item.remark }}</span>
            </div>
          </div>
          <div style="flex: 1; text-align: right">
            <div>
              <span
                style="font-size: 16px; color: #f6202b; font-weight: bolder"
                class="text-warning"
                >{{ item.type === 0 ? '-' : '+' }}{{ item.money || 0 }}点券</span
              >
            </div>
            <div style="margin-top: 6px">
              <span style="font-size: 12px; color: #000">{{
                method.toDate(item.create_time)
              }}</span>
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
    uid: userInfo.value.id,
    bind_type: 'bonus-pool'
    // where: [
    // ['type', '=', '1'],
    //   ['bind_type', '=', 'bonus-pool'],
    //   ['uid', '=', userInfo.value.id]
    // ]
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
  color: #000;
}
</style>
