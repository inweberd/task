<template>
  <view class="card-body box-shadow radius-10 mx-3 mb-5">
    <div v-if="state.data.length">
      <div v-for="(item, index) in state.data" :key="item.id" class="card">
        <div class="d-flex justify-content-between font-15">
          <span>{{ item.content }}</span>
          <span class="text-warning">+ {{ parseFloat(item.money || 0).toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-content-between font-13 text-muted">
          <span>{{ item.remark }}</span>
          <!--          <text>{{ method.toDate(item.create_time) }}</text>-->
        </div>
        <span v-if="index != state.data.length - 1" class="h-2px bg-light d-block my-2"></span>
      </div>
    </div>
    <div v-else>
      <div class="no-data">暂无数据~</div>
    </div>
    <!-- <up-loadmore :status="state.loadmore.status" :loading-text="state.loadmore.load" dashed line
			:nomore-text="state.loadmore.nomore" :loadmoreText="state.loadmore.text" class="py-3">
		</up-loadmore> -->
  </view>
</template>

<script setup>
import { axiosInstance as axios } from '@/utils/myrequest'
import utils from '@/utils/utils.js'
import { reactive, onMounted } from 'vue'

const store = {
  user: ''
}
const state = reactive({
  page: {
    code: 1,
    total: 2
  },
  data: [],
  count: 0,
  load: {
    init: false
  },
  limit: 10,
  loadmore: {
    status: 'loadmore',
    text: '加载更多',
    load: '努力加载中，先喝杯奶茶',
    nomore: '再怎么找也没有啦~'
  }
})
const method = {
  init: async (page = state.page.code, load = true) => {
    state.load.init = load

    const {
      code,
      msg,
      data: item
    } = await axios.get('/api/wallet-log/all', {
      params: {
        page,
        limit: state.limit,
        order: 'id desc',
        where: [
          ['type', '=', 1],
          ['uid', '=', store.user.id]
        ]
      }
    })

    state.load.init = false

    if (utils.is.empty(item.data)) return (state.loadmore.status = 'nomore')

    state.data.push(...item.data)
    state.count = item.count
    state.page.total = item.page
    state.page.code = page

    state.loadmore.status = 'nomore'
  },
  // 人性化时间
  nature: (value, type = 1) => utils.time.nature(value, type),
  // 时间戳转日期
  toDate: (value) => utils.timeToDate(value)
}

// onReachBottom(() => {

// 	if (parseInt(store.wallet.tabs) !== 0) return

// 	if (state.page.code === state.page.total) return state.loadmore.status = 'nomore'

// 	state.loadmore.status = 'loading'

// 	method.init(state.page.code + 1, false)
// })

onMounted(() => {
  store.user = JSON.parse(window.localStorage.getItem('userInfo'))
  method.init()
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
