<template>
  <div class="login">
    <!-- <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" /> -->
    <van-nav-bar
      :class="{ inApp: getIsInApp() }"
      left-arrow
      left-text="返回"
      placeholder
      safe-area-inset-top
      title="转赠记录"
      @click-left="$router.back()"
    >
      <!--      <template #right>-->
      <!--        <span style="color: #1e83d3; font-size: 18px" @click="$router.push('/conversionRecord')">-->
      <!--          元宝互转记录-->
      <!--        </span>-->
      <!--      </template>-->
    </van-nav-bar>
    <div class="container">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getDataList"
      >
        <div
          v-for="(item, index) in dataList"
          style="position: relative"
          :key="item.id"
          class="card"
        >
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
                <span style="font-size: 12px; color: #aaa">{{ item.remark }}</span>
              </div>
            </div>
            <div style="flex: 1; text-align: right">
              <div>
                <span
                  style="font-size: 16px; color: #f6202b; font-weight: bolder"
                  class="text-warning"
                  >{{ item.type === 0 ? '-' : '+' }} {{ item.money || 0 }}元</span
                >
              </div>
              <div style="margin-top: 6px">
                <span style="font-size: 12px; color: #aaa">{{
                  method.toDate(item.create_time)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { reqTransferLogs, reqWalletLog } from '@/api/myApi'
import { _notice } from '@/utils/index'
import { axiosInstance as axios } from '@/utils/myrequest'
import utils from '@/utils/utils.js'
import { getIsInApp } from '@/utils/getTopPadding'
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
  reqTransferLogs({
    page: searchInfo.page,
    limit: searchInfo.limit,
    uid: userInfo.value.id,
    order: 'id desc',
    // type: '1'
    bind_type: 'transfer'
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

<style lang="less" scoped>
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

.login {
  background: url('@/assets/img/main-bg.jpg');
  background-size: 100% 100%;
  height: 100%;
  overflow-y: auto;
  :deep(.van-nav-bar) {
    background: transparent !important;
    .van-nav-bar__title {
      color: #ffffff !important;
    }

    .van-nav-bar__text {
      color: #fff !important;
    }

    .van-icon {
      color: #fff;
    }
  }
  :deep(.van-hairline--bottom) {
    &:after {
      border-bottom: none;
    }
  }
}
</style>
