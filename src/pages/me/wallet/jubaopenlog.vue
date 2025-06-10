<template>
  <div class="container">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getDataList"
    >
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
                >{{ item.type === 0 ? '-' : '+' }}{{ item.money || 0 }}钻石</span
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
import { axiosInstance as axios } from '@/utils/myrequest'

import utils from '@/utils/utils.js'
import { reactive, onMounted, ref } from 'vue'
import { reqWalletLog } from '@/api/myApi'
import { _notice } from '@/utils/index'
const loading = ref(true)
const finished = ref(false)

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
    uid: userInfo.value.id,
    // bind_type: 'treasure-basin-bonus'
    bind_type: 'treasure-basin'
    // type: '0'
    // where: [
    //   ['type', '=', '1'],
    //   ['bind_type', '=', 'ng-game-transfer'],
    //   ['uid', '=', userInfo.value.id]
    // ]
    // where: [
    //   ['type', '=', 0],
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
  background-color: #fff;
  margin: 10px;
  border-radius: 10px;
  color: #000;
}
</style>
