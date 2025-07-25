<template>
  <div class="dianziqianbao">
    <van-nav-bar
      fixed
      left-arrow
      placeholder
      safe-area-inset-top
      title="绑定转赠收款方式"
      @click-left="$router.back()"
    >
      <template #right>
        <van-icon name="add-o" size="22" @click="$router.push('/addDianziqianbao')" />
      </template>
    </van-nav-bar>

    <div
      v-for="(item, index) in dataList"
      :key="item.id"
      class="card"
      style="position: relative"
      @click="handleOrderClick(item)"
    >
      <div
        style="display: flex; justify-content: space-between; align-items: center; padding: 10px"
      >
        <div style="width: 60%">
          <div>
            <span style="font-size: 14px; font-weight: bolder; color: #000">
              {{ item.scene === 'alipay' ? '支付宝' : '微信' }}
            </span>
          </div>
          <div>
            <span style="font-size: 12px; color: #000">{{ item.account }}</span>
          </div>
        </div>
        <div style="flex: 1; text-align: right">
          <img style="width: 40px; height: 40px" :src="item.qrCode" alt="" />

          <!--          <div>-->
          <!--            <span class="text-warning" style="font-size: 16px; color: #f6202b; font-weight: bolder"-->
          <!--              >{{ item.points || 0 }}点券</span-->
          <!--            >-->
          <!--          </div>-->
          <!--          <div style="margin-top: 6px">-->
          <!--            &lt;!&ndash;            <span style="font-size: 12px; color: #000">{{ method.toDate(item.createTime) }}</span>&ndash;&gt;-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <el-button
      color="#fcd323"
      size="large"
      style="
        border-radius: 30px;
        border: none;
        color: #444;
        width: 100%;
        height: 45px;
        margin-top: 20px;
      "
      type="primary"
      @click="$router.push('/addDianziqianbao')"
      >实名认证电子钱包
    </el-button>
    <template v-if="!dataList.length">
      <div style="height: 300px; display: flex; justify-content: center; align-items: center">
        暂无数据
      </div>
    </template>
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
      color: #000 !important;
    }

    .van-icon {
      color: #000 !important;
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
