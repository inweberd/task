<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="会员列表"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <!--      <van-empty :image="empty" image-size="120" description="暂无会员 " />-->
    <div
      v-if="!myStaffList?.length"
      style="
        width: 100%;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        flex-direction: column;
      "
    >
      <span>暂无会员</span>
    </div>
    <div class="list">
      <div class="list-item" v-for="item of myStaffList">
        <div class="name">
          {{ item?.result?.staff?.name }}
        </div>
        <div>有效期：<span>30天</span></div>
        <div>
          购买时间：<span>{{ getExpireTimeStr(item.entry_time) }}</span>
        </div>
        <!--        <div v-if="item?.result?.staff?.serial == 1">-->
        <!--          剩余时间：<span>{{ getShengyuTimeStr(item.expire_time) }}</span>-->
        <!--        </div>-->
        <!--        <div v-if="item?.result?.staff?.serial == 1">-->
        <!--          过期时间：<span>{{ getExpireTimeStr(item.expire_time) }}</span>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { reqMyStaff } from '@/api/myApi'
import { onActivated, ref } from 'vue'
import { closeToast } from 'vant'
import dayjs from 'dayjs'

const myStaffList = ref([])
const loading = ref(false)
const getMyStaff = () => {
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  reqMyStaff()
    .then((res) => {
      loading.value = false

      myStaffList.value = (res.data || []).filter((item) => item?.result?.staff?.serial)
    })
    .finally(() => {
      closeToast()
    })
}

const getExpireTimeStr = (timestamp) => {
  timestamp = timestamp * 1000
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

const getShengyuTimeStr = (timestamp) => {
  timestamp = timestamp * 1000
  const now = Date.now()
  const diff = timestamp - now

  const seconds = Math.floor(diff / 1000) % 60
  const minutes = Math.floor(diff / (1000 * 60)) % 60
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const str = `${days}天${hours}小时${minutes}分钟`
  // ${seconds}秒
  console.log(str)
  return str
}

onActivated(() => {
  getMyStaff()
})
</script>
<style scoped lang="less">
.list {
  margin: 15px;
  .list-item {
    border-radius: 5px;
    //background-image: linear-gradient(to right, #fb5b4b, #9c38e5);
    padding: 10px;
    margin-bottom: 15px;
    color: #ddd;
    background-image: url('@/assets/img/main-bg.jpg');
    background-size: 100% 100%;
    & > div {
      margin-top: 5px;
    }

    span {
      color: #fff;
      font-weight: bolder;
    }

    .name {
      color: #fff;
      font-size: 20px;
      font-weight: bolder;
    }
  }
}
</style>
