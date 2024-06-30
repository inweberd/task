<template>
	<div style="">
		<van-nav-bar :title="desc.title" safe-area-inset-top fixed placeholder @click-left="router.back()" left-text="返回"
			left-arrow>


		</van-nav-bar>
		<Loading v-if="loading" />

		<div v-else style='color:#fff'>
			<div style='width:100%;text-align:center;margin-top:20px;margin-top:10px'>{{desc.title}}</div>

			<div v-html="desc.content" style='margin-top:10px;width:93%;margin-left:2%'>
			</div>
		</div>

	</div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { reactive, onMounted,onActivated } from 'vue';
import { article } from '@/api/myApi'
import modzz from '../login/model.vue'
import { axiosInstance as axios } from '@/utils/myrequest'
import { _no, _sleep, _notice } from '@/utils'
import { articleall } from '@/api/myApi'
const router = useRouter()
const route = useRoute()
const id = ref('')
const desc = ref('')
onActivated(() => {
	// id.value = router.currentRoute.value.query.id
	const params = {id:router.currentRoute.value.query.id}
	desc.value =''
	getData(params)
	// console.log(params,"params")
	// article(params).then((e) => {
	// 	desc.value = e.data
	// 	console.log(desc.value)
	// }).finally(() => {
		
	// })
	// const { data: any } = await axios.get('api/article/one?id=' + router.currentRoute.value.query.id)
	// console.log(data,"123123")
})
async function getData(val){
	desc.value =''
	const data = await axios.get('api/article/one?id=' + val.id)
		desc.value = data.data
}

</script>




<style lang='less' scoped>
.fixed-back {
	position: fixed;
	left: 10rem;
	top: 20rem;
	z-index: 3;
}
</style>