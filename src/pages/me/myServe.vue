<template>
  <div style="background-color: #322c36; padding: 40px 20px 0">
    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
    <Loading v-if="loading" />

    <div class="title">我的服务器</div>

    <div style="overflow: scroll; background-color: #332d37">
      <div class="stat">
        <div class="stat-header">
          <div>任务累计收益: <span class="money">￥4484.27</span></div>
          <div>服务消费:<span class="money">￥13000.27</span></div>
        </div>
      </div>
      <div v-for="(item, index) of staffList" class="staff-list">
        <div class="staff-item">
          <div class="img">
            <img :src="getIconPath((index % 5) + 1)" alt="" />
          </div>
          <div class="name">TK服务器-4核8G共享服务器</div>
          <div class="price" @click="toDetail">
            历史收益：<span class="money">￥{{ item.price }}</span>
            <van-icon name="arrow" size="18" class="arrow" />
          </div>
          <div class="info">
            <div class="info-item">设备状态：<span class="status">运行中</span></div>
            <div class="info-item">有效期：30天</div>
            <div class="info-item">账号数量：{{ getRandom() }}/3500</div>
            <div class="info-item">预估收益：{{ item.unit_price }}/天</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
const getRandom = () => {
  return Math.floor(Math.random() * 300) + 1500
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
  return userInfo.value.result.staff.serial + 1 === item.serial ? '#e85858' : '#666CF8'
}
const toDetail = () => {
  router.push('/serveInfo')
}

const getIconPath = (icon) => {
  return new URL(`../../assets/img/serve/${icon}.png`, import.meta.url).href
}
onMounted(() => {
  getAllStaff()
})
</script>

<style scoped lang="less">
.fixed-back {
  position: fixed;
  left: 10px;
  top: 48px;
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

.title {
  font-size: 26px;
  color: #eee;
  font-weight: bolder;
  margin-left: 30px;
  position: relative;
  padding-left: 8px;
  &:before {
    position: absolute;
    top: 2px;
    left: -10px;
    display: block;
    content: '';
    height: 30px;
    width: 6px;
    background-color: #666cf8;
    border-radius: 10px;
  }
}

.stat {
  margin-top: 20px;
  background-image: linear-gradient(180deg, #494052 10%, #322c36 100%);
  border-radius: 10px 10px 0 0;
  height: 70px;

  .stat-header {
    line-height: 40px;
    display: flex;
    justify-content: space-evenly;
    color: #ccc;
    font-size: 12px;
    border-bottom: 1px solid #666;
    .money {
      font-size: 16px;
      font-weight: bolder;
      color: #fff;
    }
  }
}
.staff-list {
  color: #fff;
}
.staff-item {
  font-size: 14px;
  position: relative;
  margin-bottom: 20px;
  .img {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 10px;
    width: 80px;
    height: 80px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    text-indent: 100px;
    font-weight: bolder;
    font-size: 16px;
    line-height: 40px;
  }
  .price {
    position: relative;
    text-indent: 100px;
    border-radius: 10px 10px 0 0;
    line-height: 50px;
    background-image: linear-gradient(90deg, #82718b 10%, #6a586b 100%);
    .money {
      font-size: 18px;
      font-weight: bolder;
    }

    .arrow {
      position: absolute;
      right: 10px;
      top: 15px;
    }
  }
  .info {
    border-radius: 0 0 10px 10px;
    padding: 10px;
    background-image: linear-gradient(90deg, #514154 10%, #3d313f 100%);
    display: grid;
    grid-template-columns: 1fr 1fr;

    .info-item {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      line-height: 30px;
      .status {
        color: #7889ef;
        font-weight: bolder;
      }
    }
  }
  .buy-btn {
    text-align: center;
    width: 20px;
    position: absolute;
    right: 0;
    bottom: 0px;
  }
}
</style>
