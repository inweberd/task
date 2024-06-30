<template>
	<div style="background-color: aliceblue;" class="team-benefits">
		<van-nav-bar title="团队收益" safe-area-inset-top fixed placeholder @click-left="router.back()" left-text="返回"
			left-arrow>
			<template #right>
				<van-icon name="friends-o" size="18" @click="service = true" />
			</template>
		</van-nav-bar>
		<Loading v-if="loading" />
		<div>
			<div class="summary">
				<div class="summary-item">
					<div class="amount">￥{{ method.format(state.member.data?.wallet?.deposit?.money) }}</div>
					<div class="label">团队总充值（元）</div>
				</div>
				<div class="summary-item">
					<div class="amount"> ￥{{ method.format(state.member.data?.wallet?.withdraw?.money) }}</div>
					<div class="label">团队总提现（元）</div>
				</div>
			</div>

			<div class="stats">
				<div class="stat-item">
					<div class="number">{{ (state.member?.data?.uids?.one?.length || 0) + (state.member?.data?.uids?.two?.length
						|| 0)
						+ (state.member?.data?.uids?.three?.length || 0) }}</div>
					<div class="label">团队人数</div>
				</div>
				<div class="stat-item">
					<div class="number"> {{ state.member.data?.uids?.one?.length || 0 }}</div>
					<div class="label">直推人数</div>
				</div>
				<div class="stat-item">
					<div class="number"> {{ state.member.data?.wallet?.deposit?.count || 0 }}</div>
					<div class="label">首充人数</div>
				</div>
				<div class="stat-item">
					<div class="number"> {{ state.member.data?.uids?.today_new_user?.length || 0 }}</div>
					<div class="label">新增人数</div>
				</div>
			</div>

			<van-tabs v-model:active="activeTab" @change="change">
				<van-tab title="一级" name="one" :badge="state.member.data?.uids?.one?.length || 0">
					<!-- 没有更多了 -->
					<div class="card" v-for="item in state.tabs['one'].list">
						<div class="card-body d-flex justify-content-between flex-row align-items-center">
							<div class="d-flex flex-row">
								<div class="u-avatar u-avatar--circle avatar-shadow">
									<van-image :src="item.avatar" width="50" height="50" />

								</div>
								<div class="d-flex flex-column justify-content-center ms-2">
									<div class="d-flex flex-row align-items-center">
										<div class="font-15 me-2">{{ item.phone || item.nickname }} <span class="ms-2">

												LV. {{ item?.result?.staff?.serial || 0 }}
											</span></div>
									</div>
									<div class="mt-1 text-muted font-13">{{ utils.timeToDate(item.create_time, 'Y-M-D H:i:s') }}
									</div>
								</div>
							</div>
							<div class="text-warning">￥{{ parseFloat(item?.result?.wallet?.income || 0).toFixed(2) }}</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="二级" name="two" :badge="state.member.data?.uids?.two?.length || 0">
					<div class="card" v-for="item in state.tabs['two'].list">
						<div class="card-body d-flex justify-content-between flex-row align-items-center">
							<div class="d-flex flex-row">
								<div class="u-avatar u-avatar--circle avatar-shadow">
									<van-image :src="item.avatar" width="50" height="50" />

								</div>
								<div class="d-flex flex-column justify-content-center ms-2">
									<div class="d-flex flex-row align-items-center">
										<div class="font-15 me-2">{{ item.phone || item.nickname }} <span class="ms-2">

												LV. {{ item?.result?.staff?.serial || 0 }}
											</span></div>
									</div>
									<div class="mt-1 text-muted font-13">{{ utils.timeToDate(item.create_time, 'Y-M-D H:i:s') }}
									</div>
								</div>
							</div>
							<div class="text-warning">￥{{ parseFloat(item?.result?.wallet?.income || 0).toFixed(2) }}</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="三级" name="three" :badge="state.member.data?.uids?.three?.length || 0">
					<div class="card" v-for="item in state.tabs['three'].list">
						<div class="card-body d-flex justify-content-between flex-row align-items-center">
							<div class="d-flex flex-row">
								<div class="u-avatar u-avatar--circle avatar-shadow">
									<van-image :src="item.avatar" width="50" height="50" />

								</div>
								<div class="d-flex flex-column justify-content-center ms-2">
									<div class="d-flex flex-row align-items-center">
										<div class="font-15 me-2">{{ item.phone || item.nickname }} <span class="ms-2">

												LV. {{ item?.result?.staff?.serial || 0 }}
											</span></div>
									</div>
									<div class="mt-1 text-muted font-13">{{ utils.timeToDate(item.create_time, 'Y-M-D H:i:s') }}
									</div>
								</div>
							</div>
							<div class="text-warning">￥{{ parseFloat(item?.result?.wallet?.income || 0).toFixed(2) }}</div>
						</div>
					</div>
				</van-tab>
			</van-tabs>


		</div>

		<modzz v-model="service"></modzz>
	</div>
</template>

<script lang='ts' setup>
import modzz from '../login/model.vue'
import utils from '@/utils/utils.js'
import { axiosInstance as axios } from '@/utils/myrequest'
import { useRouter } from 'vue-router';
const activeTab = ref('one');
const router = useRouter()
let user
const loading = ref(false)
const service = ref(false)
const state = reactive({
	income: {},
	member: {
		load: false,
		data: [],
	},
	status: {
		income: false,
	},
	tabs: {
		one: {
			load: false,
			list: [],
			limit: 6,
			page: {
				code: 1,
				total: 1,
			},
			status: 'loadmore'
		},
		two: {
			load: false,
			list: [],
			limit: 6,
			page: {
				code: 1,
				total: 1,
			},
			status: 'loadmore'
		},
		three: {
			load: false,
			list: [],
			limit: 6,
			page: {
				code: 1,
				total: 2,
			},
			status: 'loadmore'
		},
		value: null,
		list: [
			{ key: 'one', name: '一级', badge: { value: 0 } },
			{ key: 'two', name: '二级', badge: { value: 0 } },
			{ key: 'three', name: '三级', badge: { value: 0 } },
		],
		lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=',
	},
	modal: {
		service: false
	},
})

const method = {
	init: async () => {
		await method.member()
		await method.income()
		method.users()
	},
	// 获取成员信息
	member: async () => {

		state.member.load = true
		// console.log(user)
		const { data: item } = await axios.get('/api/users/member?uid=' + user.id)
		// console.log(item)
		state.member.load = false
		state.member.data = item
		// console.log(state.member.data)
	},
	// 获取个人收益
	income: async () => {

		state.status.income = true

		const { code, data: item } = await axios.get('/api/users/income')

		state.status.income = false
		state.income = item
	},
	tabs: item => (state.tabs.value = item.index),
	// 跳转
	// 格式化数字
	format: (price = 0) => {
		let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		return result === '0' ? '0.00' : result
	},
	// 人性化时间
	// 时间戳转日期
	toDate: (value, type = 'Y-M-D H:i:s') => utils.timeToDate(value, type),
	// 解析用户信息
	users: async (index = 'one', page = 1) => {

		const ids = state.member.data?.uids?.[index]

		let limit = state.tabs[index].limit
		const { code, msg, data: item } = await axios.get('/api/users/all', {
			params: {
				page, limit, ids: ids?.toString(),
				field: 'avatar, nickname, phone, result, create_time'
			}
		})
		loading.value = false

		state.tabs[index].load = false
		state.tabs[index].status = 'loadmore'

		if (code !== 200) return

		state.tabs[index].page.code = page
		state.tabs[index].page.total = item.page
		state.tabs[index].list.push(...item.data)

		if (state.tabs[index].page.code === state.tabs[index].page.total) {
			state.tabs[index].status = 'nomore'
		}
	}
}

// onReachBottom(() => {
// 	const fields = ['one', 'two', 'three']
// 	const field = fields[state.tabs.value]
// 	method.users(field, state.tabs[field].page.code + 1)
// })

onMounted(() => {
	user = JSON.parse(window.localStorage.getItem('userInfo'))
	method.init()
}

)
function change(e) {
	loading.value = true
	method.users(e)
}
// watch(() => state.member.data, member => {
// 	state.tabs.list.map(item => {
// 		item.badge.value = member?.uids[item.key]?.length
// 	})
// })

// watch(() => state.tabs.value, index => {
// 	const fields = ['one', 'two', 'three']
// 	const field = fields[index]
// 	method.users(field)
// })
</script>

<style lang='less' scoped>
.fixed-back {
	position: fixed;
	left: 10rem;
	top: 20rem;
	z-index: 3;
}

.team-benefits {
	padding: 16px;
	background-color: #f7f8fa;
	height: 100%;
	overflow-y: auto
}

.summary {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
}

.summary-item {
	background-color: #fff;
	border-radius: 8px;
	padding: 10px;
	flex: 1;
	margin: 0 5px;
	text-align: center;
}

.summary-item:first-child,
.summary-item:last-child {
	margin-left: 0;
	margin-right: 0;
}

.amount {
	color: #f60;
	font-size: 24px;
	font-weight: bold;
}

.label {
	margin-top: 5px;
	color: #999;
}

.stats {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 20px;
}

.stat-item {
	background-color: #fff;
	border-radius: 8px;
	padding: 10px;
	width: 40%;
	margin-bottom: 10px;
	text-align: center;
}

.number {
	color: #000;
	font-size: 24px;
	font-weight: bold;
}

.no-more {
	text-align: center;
	color: #999;
	margin-top: 20px;
}

.card {
	padding: 15px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	margin-bottom: 20px;
}

.card-body {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.u-avatar {
	width: 40px;
	height: 40px;
	background-color: transparent;
}

.u-avatar__image {
	width: 40px;
	height: 40px;
	background-size: 100% 100%;
}

.d-flex {
	display: flex;
}

.flex-row {
	flex-direction: row;
}

.flex-column {
	flex-direction: column;
}

.align-items-center {
	align-items: center;
}

.justify-content-between {
	justify-content: space-between;
}

.ms-2 {
	margin-left: 8px;
}

.me-2 {
	margin-right: 8px;
}

.mt-1 {
	margin-top: 4px;
}

.text-warning {
	color: orange;
}

.text-muted {
	color: #999;
}

.font-15 {
	font-size: 15px;
}

.font-13 {
	font-size: 13px;
}
</style>