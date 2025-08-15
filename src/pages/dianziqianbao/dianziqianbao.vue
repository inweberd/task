<template>
  <div class="dianziqianbao">
    <van-nav-bar
      fixed
      left-arrow
      placeholder
      safe-area-inset-top
      title="添加收款方式"
      @click-left="$router.back()"
    >
      <!--      <template #right>-->
      <!--        <van-icon name="add-o" size="22" @click="$router.push('/addDianziqianbao')" />-->
      <!--      </template>-->
    </van-nav-bar>

    <div style="padding: 10px; border-radius: 10px; overflow: hidden">
      <detail-info
        v-for="item of dataList"
        :column-list="[
          {
            key: 'scene',
            label: '支付方式'
          },
          {
            key: 'account',
            label: '姓名'
          },
          {
            key: 'qrCode',
            label: '卖方收款码'
          }
        ]"
        :detail-info="item || {}"
        :group-title="item.scene === 'alipay' ? '支持宝' : '微信'"
        style="margin-top: 10px; background-color: #fff"
      >
        <template #scene>
          <span>{{ item.scene === 'wechat' ? '微信' : '支付宝' }} </span>
        </template>

        <template #qrCode>
          <van-image
            v-if="item?.qrCode"
            :src="item.qrCode + '?' + Math.random()"
            fit="contain"
            height="50px"
            width="50px"
            @click="showImgDetail(item.qrCode)"
          />
        </template>
      </detail-info>
    </div>

    <!--    <div-->
    <!--      v-for="(item, index) in dataList"-->
    <!--      :key="item.id"-->
    <!--      class="card"-->
    <!--      style="position: relative"-->
    <!--      @click="handleOrderClick(item)"-->
    <!--    >-->
    <!--      <div-->
    <!--        style="display: flex; justify-content: space-between; align-items: center; padding: 10px"-->
    <!--      >-->
    <!--        <div style="width: 60%">-->
    <!--          <div>-->
    <!--            <span style="font-size: 14px; font-weight: bolder; color: #000">-->
    <!--              {{ item.scene === 'alipay' ? '支付宝' : '微信' }}-->
    <!--            </span>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <span style="font-size: 12px; color: #000">{{ item.account }}</span>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div style="flex: 1; text-align: right">-->
    <!--          <img style="width: 40px; height: 40px" :src="item.qrCode" alt="" />-->

    <!--          &lt;!&ndash;          <div>&ndash;&gt;-->
    <!--          &lt;!&ndash;            <span class="text-warning" style="font-size: 16px; color: #f6202b; font-weight: bolder"&ndash;&gt;-->
    <!--          &lt;!&ndash;              >{{ item.points || 0 }}金币</span&ndash;&gt;-->
    <!--          &lt;!&ndash;            >&ndash;&gt;-->
    <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
    <!--          &lt;!&ndash;          <div style="margin-top: 6px">&ndash;&gt;-->
    <!--          &lt;!&ndash;            &lt;!&ndash;            <span style="font-size: 12px; color: #000">{{ method.toDate(item.createTime) }}</span>&ndash;&gt;&ndash;&gt;-->
    <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <el-button
      color="#fcd323"
      size="large"
      style="
        background: linear-gradient(-90deg, rgb(63, 205, 235), rgb(188, 226, 158));

        border-radius: 30px;
        border: none;
        color: #444;
        width: 100%;
        height: 45px;
        margin-top: 20px;
      "
      type="primary"
      @click="$router.push('/addDianziqianbao')"
      >添加收款方式
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
import { closeToast } from 'vant'

const dataList = ref([])
const getList = () => {
  dataList.value = []
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  reqDianziQianbaoList().then((res) => {
    closeToast()
    if (res.data?.length) {
      dataList.value = res.data
    }
  })
}
const showImgDetail = (imgUrl: string) => {
  showImagePreview([imgUrl])
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
    background-color: #fff !important;
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
