<template>
  <div>
    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
    <!-- <canvas ref="canvas"></canvas> -->
    <van-image :src="imageSrc" width="100%" height="150" fit="fill"></van-image>
    <!-- <van-image :src="imageSrc2" width="100%" height="85%"   fit="fill" style='position:absolute;margin-top:150px'></van-image> -->
    <Loading v-if="loading" />

    <div style="overflow: scroll">
      <div
        v-for="item of staffList"
        style="
          margin-top: 10px;
          text-align: center;
          color: #fff;
          display: flex;
          background: #6344bb;
          width: 92%;
          margin-left: 4%;
          height: 85px;
          border-radius: 10px;
        "
      >
        <div style="width: 100%; padding: 10px">
          <div>
            <div
              style="
                display: inline-block;
                width: 20%;
                white-space: nowrap;
                text-align: center;
                color: #fff;
                font-weight: bold;
              "
            >
              {{ getSerialName(item.serial) }}
            </div>
            <div
              style="
                display: inline-block;
                width: 20%;
                text-align: center;
                color: #fff;
                font-weight: bold;
              "
            >
              日收益
            </div>
            <div
              style="
                display: inline-block;
                width: 20%;
                text-align: center;
                color: #fff;
                font-weight: bold;
              "
            >
              月收益
            </div>
            <div
              style="
                display: inline-block;
                width: 40%;
                text-align: center;
                color: #fff;
                font-weight: bold;
              "
            >
              年收益（365天）
            </div>
          </div>
          <div>
            <div
              style="
                display: inline-block;
                width: 20%;
                text-align: center;
                color: #fff;
                font-weight: bold;
                font-size: 16px;
              "
            >
              {{ item.price }}元
            </div>
            <div
              style="
                display: inline-block;
                width: 20%;
                text-align: center;
                color: #fff;
                font-weight: bold;
              "
            >
              {{ item.task * item.unit_price }}元
            </div>
            <div
              style="
                display: inline-block;
                width: 20%;
                text-align: center;
                color: #fff;
                font-weight: bold;
              "
            >
              {{ item.task * item.unit_price * 30 }}元
            </div>
            <div
              style="
                display: inline-block;
                width: 40%;
                text-align: center;
                color: #fff;
                font-weight: bold;
              "
            >
              {{ item.task * item.unit_price * 365 }}元
            </div>
          </div>

          <div
            style="
              margin-top: 10px;
              background: #fff;
              color: #6344bb;
              width: 65px;
              margin: 10px auto;
              font-weight: bold;
            "
            @click="buy(item)"
          >
            点击购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import QRCode from 'qrcode'
import imageSrc from '@/assets/img/hehuoren.png'
import imageSrc2 from '@/assets/img/hehuoren2.png'
import imageSrc3 from '@/assets/img/goumai.png'
import { ref, reactive, onMounted } from 'vue'
import { reqAllStaff, reqEnterStaff, reqUserStaff, reqWalletInfo } from '@/api/myApi.js'
import { showFailToast, showNotify, showToast } from 'vant'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import { getSerialName } from '@/utils/getSerialName'
import { userinfo } from '@/api/user'
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

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
  loading.value = true
  console.log('item', item)
  loading.value = true
  reqWalletInfo().then((res: any) => {
    console.log('reqWalletInfo', res)
    loading.value = false

    if (item.price > res.data.money) {
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
          })

          userInfo.result.staff = userRes.data.result.staff
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
      })
    }
  })
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
