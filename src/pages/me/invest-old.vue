<template>
  <div>
    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
    <!-- <canvas ref="canvas"></canvas> -->
    <van-image :src="imageSrc1" width="100%" height="150" fit="fill"></van-image>
    <!-- <van-image :src="imageSrc2" width="100%" height="85%"   fit="fill" style='position:absolute;margin-top:150px'></van-image> -->
    <Loading v-if="loading" />
  </div>
</template>
<script setup lang="ts">
import QRCode from 'qrcode'
import imageSrc from '@/assets/img/hehuoren.png'
import imageSrc1 from '@/assets/img/hehuoren.jpg'
import imageSrc2 from '@/assets/img/hehuoren2.png'
import imageSrc3 from '@/assets/img/goumai.png'
import { ref, reactive, onMounted } from 'vue'
import { reqAllStaff, reqEnterStaff, reqUserStaff, reqWalletInfo } from '@/api/myApi.js'
import { showFailToast, showNotify, showToast } from 'vant'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import { getSerialName } from '@/utils/getSerialName'
import { userinfo } from '@/api/user'
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
userInfo.value.result.staff.serial = userInfo.value.result.staff.serial || 1

const loading = ref(true)
const staffList = ref([])
const searchInfo = reactive({
  page: 1,
  limit: 20,
  order: 'serial asc'
})
const router = useRouter()
const getAllStaff = () => {
  loading.value = true
  reqAllStaff(searchInfo).then((res: any) => {
    loading.value = false
    staffList.value = res.data.data
  })
}

const buy = (item) => {
  if (userInfo.value.result.staff.serial + 1 !== item.serial) {
    return _notice('请逐级开通！')
  }
  loading.value = true
  console.log('item', item)
  loading.value = true
  reqWalletInfo().then((res: any) => {
    console.log('reqWalletInfo', res)
    loading.value = false

    if (item.price > res.data.amount + res.data.money) {
      loading.value = false
      _notice('账户余额不足,请充值!')
      router.push('/recharge')
    } else {
      reqEnterStaff({
        staff_id: item.id
      }).then((sub_res) => {
        loading.value = false
        _notice(sub_res.msg)
        if (res.code === 200) {
          reqUserStaff().then((userRes) => {
            if (userRes.code !== 200) return _notice(userRes.msg)
            console.log('reqUserStaff', userRes)

            userInfo.value.result.staff = userRes.data.result.staff
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
          })
        }
      })
    }
  })
}

const getBuyBtnBg = (item) => {
  return userInfo.value.result.staff.serial + 1 === item.serial ? '#d97171' : '#fff'
}

onMounted(() => {
  getAllStaff()
})
</script>

<style scoped lang="less">
.fixed-back {
  position: fixed;
  left: 10rem;
  top: 20rem;
  z-index: 3;
}

.main {
  width: 100%;
  display: flex;
}
.item {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}
</style>
