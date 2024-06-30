<template>
	<view class="card-body box-shadow radius-10 mx-3 mb-5">
		<div v-if="state.data.length">
			<view v-for="(item, index) in state.data" :key="item.id">
				<view class="d-flex justify-content-between font-15">
					<text v-if="!item.remark">
						<text v-if="item.status === 'wait'" class="text-warning">等待审核</text>
						<text v-else-if="item.status === 'finish'" class="text-success">请到官方QQ群。反馈到账消息！</text>
						<text v-else-if="item.status === 'paying'" class="text-dark">转账中</text>
						<text v-else-if="item.status === 'fail'" class="text-danger">转账失败（卡号有误）</text>
						<text v-else-if="item.status === 'cancel'" class="text-dark">拒绝，咨询QQ客服</text>
						<text v-else>{{ item.status }}</text>
					</text>
					<text>{{ item.remark }}</text>
					<text class="text-warning">{{ parseFloat(item.money || 0).toFixed(2) }}</text>
				</view>
				<view class="d-flex justify-content-between font-13 text-muted">
					<text>
						{{ state.bank.list.find(({ value }) => value === item.result.card.card_type)?.label }}
						( {{ item.result.card.name }} )
					</text>
					<text>{{ method.toDate(item.create_time) }}</text>
				</view>
				<view v-if="index != state.data.length - 1" class="h-2px bg-light d-block my-2"></view>
			</view>

		</div>
		<div v-else>
			<div class="no-data">再怎么找也没有查啦~</div>
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
	user: '',
}
const state = reactive({
	page: {
		code: 1,
		total: 2,
	},
	data: [],
	count: 0,
	load: {
		init: false,
	},
	limit: 10,
	loadmore: {
		status: 'loadmore',
		text: '再怎么找也没有啦~',
		load: '努力加载中，先喝杯奶茶',
		nomore: '再怎么找也没有啦~'
	},
	bank: {
		list: [],
		back: [],
	}
})
const method = {
	init: async (page = state.page.code, load = true) => {

		state.load.init = load

		const { data: item } = await axios.get('/api/wallet-fetch/all', {
			params: {
				page, limit: state.limit, order: 'id desc',
				where: [
					['uid', '=', store.user.id],
				]
			}
		})

		state.load.init = false

		if (utils.is.empty(item.data)) return state.loadmore.status = 'nomore'

		state.data.push(...item.data)
		state.count = item.count
		state.page.total = item.page
		state.page.code = page

		state.loadmore.status = 'nomore'
	},
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
	// 人性化时间
	nature: (value, type = 1) => utils.time.nature(value, type),
	// 时间戳转日期
	toDate: value => utils.timeToDate(value),
}

// onReachBottom(() => {

// 	if (parseInt(store.wallet.tabs) !== 0) return

// 	if (state.page.code === state.page.total) return state.loadmore.status = 'nomore'

// 	state.loadmore.status = 'loading'

// 	method.init(state.page.code + 1, false)
// })

onMounted(() => {
	store.user = JSON.parse(window.localStorage.getItem('userInfo'))
	method.bank()
	method.init()
})
</script>