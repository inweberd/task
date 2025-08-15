<template>
  <div style="height: 100%; overflow: auto" class="youxiaohuiyuan">
    <van-nav-bar
      title="顶商权益有效期"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-arrow
    ></van-nav-bar>
    <!--      <van-empty :image="empty" image-size="120" description="暂无等级 " />-->
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
      <span>暂无等级</span>
    </div>
    <div class="list">
      <div class="list-item" v-for="item of myStaffList">
        <div class="name">
          {{ item?.vip?.name }}
        </div>
        <div>有效期：<span>一个月</span></div>
        <div>
          过期时间：<span>{{ getExpireTimeStr(item.expired) }}</span>
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

      myStaffList.value = res.data?.data || []
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
    color: #000;
    //background-image: url('@/assets/img/dianpuBG.png');
    background: linear-gradient(-90deg, rgb(63, 205, 235), rgb(188, 226, 158));

    background-size: 100% 100%;
    & > div {
      margin-top: 5px;
    }

    span {
      color: #000;
      font-weight: bolder;
    }

    .name {
      color: #000;
      font-size: 20px;
      font-weight: bolder;
    }
  }
}
.youxiaohuiyuan {
  :deep(.van-nav-bar) {
    .van-icon {
      color: #000 !important;
      font-size: 18px !important;
    }
  }
}
</style>
