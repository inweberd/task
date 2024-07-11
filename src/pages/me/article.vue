<template>
  <div style="">
    <van-nav-bar
      :title="desc.title"
      safe-area-inset-top
      fixed
      placeholder
      @click-left="router.back()"
      left-text="返回"
      left-arrow
    >
    </van-nav-bar>
    <Loading v-if="loading" />
    <template v-if="route.query.id == 4">
      <van-image :src="certificate1" width="94%" height="100%" style="margin-left: 3%"></van-image>
      <van-image :src="certificate2" width="94%" height="100%" style="margin-left: 3%"></van-image>
      <van-image :src="certificate3" width="94%" height="100%" style="margin-left: 3%"></van-image>
      <van-image :src="certificate4" width="94%" height="100%" style="margin-left: 3%"></van-image>
    </template>
    <template v-else-if="route.query.id == 10">
      <van-image :src="playMethod" width="94%" height="100%" style="margin-left: 3%"></van-image>
    </template>
    <template v-else>
      <div style="color: #fff">
        <div style="width: 100%; text-align: center; margin-top: 20px; margin-top: 10px">
          {{ desc.title }}
        </div>

        <div v-html="desc.content" style="margin-top: 10px; width: 93%; margin-left: 2%"></div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, onMounted, onActivated } from 'vue'
import { article } from '@/api/myApi'
import modzz from '../login/model.vue'
import { axiosInstance as axios } from '@/utils/myrequest'
import { _no, _sleep, _notice } from '@/utils'
import { articleall } from '@/api/myApi'
import certificate1 from '@/assets/img/certificate/1.jpg'
import certificate2 from '@/assets/img/certificate/2.jpg'
import certificate3 from '@/assets/img/certificate/3.jpg'
import certificate4 from '@/assets/img/certificate/4.jpg'
import playMethod from '@/assets/img/playMethod.jpg'
const router = useRouter()
const route = useRoute()
const id = ref('')
const desc = ref('')
const loading = ref(true)
onActivated(() => {
  // id.value = router.currentRoute.value.query.id
  const params = { id: router.currentRoute.value.query.id }
  desc.value = ''
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
async function getData(val) {
  desc.value = ''
  loading.value = true
  const data = await axios.get('api/article/one?id=' + val.id)
  loading.value = false
  desc.value = data.data
}
</script>

<style lang="less" scoped>
.fixed-back {
  position: fixed;
  left: 10rem;
  top: 20rem;
  z-index: 3;
}
</style>
