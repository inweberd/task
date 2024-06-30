<template>
	<div style="">
		<van-nav-bar title="电信业务许可证" safe-area-inset-top fixed placeholder @click-left="router.back()" left-text="返回"
			left-arrow>


		</van-nav-bar>
		<Loading v-if="loading" />

		<div v-else style='color:#fff'>
			<div style='width:100%;text-align:center;margin-top:20px;margin-top:10px'>{{ state.struct.title }}</div>

			<div v-html="state.struct.content" style='margin-top:10px;width:93%;margin-left:2%'>
			</div>
		</div>

	</div>
</template>

<script lang='ts' setup>
import { articleall } from '@/api/myApi'
import Loading from '../../components/Loading.vue'
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const state = reactive({
	id: 3,
	struct: {},
	status: {
		load: false
	},
	unix: parseInt(new Date().getTime() / 1000),
})
function getData() {
	loading.value = true
	articleall().then((e) => {
		const data = e.data.data
		data.forEach((item,index)=>{
			if(item.title=='电信业务许可证'){
				state.struct = item
			}
		})
		
	}).finally(() => {
		loading.value = false
	})

}
onMounted(() => {
    // 打印
    console.log('router:', router.currentRoute.value.query)
  }),
getData()
</script>

<style lang='less' scoped>
.fixed-back {
	position: fixed;
	left: 10rem;
	top: 20rem;
	z-index: 3;
}
</style>