<template>
  <div class="dianziqianbao">
    <van-nav-bar
      fixed
      left-arrow
      placeholder
      safe-area-inset-top
      title="电子钱包"
      @click-left="$router.back()"
    >
      <template #right>
        <van-icon name="add-o" size="22" @click="$router.push('/addDianziqianbao')" />
      </template>
    </van-nav-bar>

    <div v-for="item in dataList" style="display: flex; justify-content: space-between">
      <span>
        {{ item.scene === 'alipay' ? '支付宝' : '微信' }}
      </span>
      <span>{{ item.account }}</span>
      <img style="width: 40px" :src="item.qrCode" alt="" />
      <span>点击修改</span>
    </div>

    <template v-if="!dataList.length"> 暂无数据 </template>
  </div>
</template>
<script setup lang="ts">
import { reqDianziQianbaoList } from '@/api/myApi'
import { onActivated, ref } from 'vue'

const dataList = ref([])
const getList = () => {
  reqDianziQianbaoList().then((res) => {
    if (res.data?.length) {
      dataList.value = res.data
    }
  })
}
onActivated(() => {
  getList()
})
</script>

<style scoped lang="less">
.dianziqianbao {
  color: #303133;
  font-size: 14px;
  height: calc(100vh);
  background-color: #f3f3f3;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  :deep(.van-nav-bar) {
    background-color: #fed61f !important;
    .van-nav-bar__title {
      color: #fff !important;
    }

    .van-icon {
      color: #fff !important;
      font-size: 18px !important;
    }
  }

  :deep(.van-search) {
    background-color: #fed621;
  }
  .content {
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
  }
}
</style>
