<template>
  <div class="orderInfo">
    <van-nav-bar
      :class="{ inApp: getIsInApp() }"
      left-arrow
      placeholder
      safe-area-inset-top
      title="订单详情"
      @click-left="$router.back()"
    >
      <!--    <template #right>-->
      <!--        <span style="color: #fff; font-size: 14px" @click="$router.push('/conversionRecord')">-->
      <!--          转增记录-->
      <!--        </span>-->
      <!--    </template>-->
    </van-nav-bar>
    <div class="content">
      <detail-info
        :column-list="columnList"
        :detail-info="detail.order || {}"
        group-title="基础信息"
        style="background-color: #fff"
      >
        <template #points>
          <span>{{ detail.order?.points / 10 || 0 }} 点券</span>
        </template>
      </detail-info>
      <detail-info
        :column-list="columnList2"
        :detail-info="detail.sellEWallet || {}"
        group-title="卖方收款信息"
        style="margin-top: 10px; background-color: #fff"
      >
        <template #scene>
          <span>{{ detail.sellEWallet?.scene === 'wechat' ? '微信' : '支付宝' }} </span>
        </template>

        <template #qrCode>
          <van-image
            v-if="detail?.sellEWallet?.qrCode"
            :src="detail?.sellEWallet.qrCode"
            fit="contain"
            height="50px"
            width="50px"
            @click="showImgDetail(detail.sellEWallet.qrCode)"
          />
        </template>
      </detail-info>
    </div>
    <!--    <div-->
    <!--      v-if="detail?.order?.buyUid === userInfo.id && !detail?.order?.buyConfirm"-->
    <!--      class="content"-->
    <!--      style="background-color: #fff; padding: 10px; box-sizing: border-box"-->
    <!--    >-->
    <!--      &lt;!&ndash;      </div>&ndash;&gt;-->
    <!--      <text-area v-model:content="detailForm.cny" label="实付金额" placeholder="请输入" rows="1" />-->

    <!--      &lt;!&ndash;      <text-area&ndash;&gt;-->
    <!--      &lt;!&ndash;        v-model:content="detailForm.remark"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :is-require="false"&ndash;&gt;-->
    <!--      &lt;!&ndash;        label="备注"&ndash;&gt;-->
    <!--      &lt;!&ndash;        placeholder="请输入"&ndash;&gt;-->
    <!--      &lt;!&ndash;        rows="2"&ndash;&gt;-->
    <!--      &lt;!&ndash;      />&ndash;&gt;-->

    <!--      &lt;!&ndash;      <LabelTitle :is-require="true" icon-name="text_area" tips="支付凭证" />&ndash;&gt;-->
    <!--      &lt;!&ndash;      <van-uploader v-model="fileList" :max-count="1" />&ndash;&gt;-->

    <!--      <el-button-->
    <!--        color="#fcd323"-->
    <!--        size="large"-->
    <!--        style="-->
    <!--          border-radius: 30px;-->
    <!--          border: none;-->
    <!--          color: #444;-->
    <!--          width: calc(100%);-->
    <!--          height: 40px;-->
    <!--          margin-top: 10px;-->
    <!--        "-->
    <!--        type="primary"-->
    <!--        @click="buySave"-->
    <!--        >提交-->
    <!--      </el-button>-->
    <!--    </div>-->

    <!--    detail?.order?.sellUid === userInfo.id &&-->
    <!--    detail?.order?.buyConfirm &&-->
    <!--    !detail?.order?.sellConfirm-->
    <div
      v-if="detail?.order?.sellUid === userInfo.id && !detail?.order?.sellConfirm"
      class="content"
      style="background-color: #fff; padding: 10px; box-sizing: border-box"
    >
      <el-button
        color="#fcd323"
        size="large"
        style="border-radius: 30px; border: none; color: #444; width: calc(100%); height: 40px"
        type="primary"
        @click="sellSave"
        >放币
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { computed, onActivated, onMounted, reactive, ref, toRefs } from 'vue'
import {
  reqWalletBuyConfirm,
  reqWalletSave,
  reqWalletTradeTake,
  reqWalletSellConfirm
} from '@/api/myApi'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import LabelTitle from '@/components/labelTitle/LabelTitle.vue'
import TextArea from '@/components/textArea/TextArea.vue'
const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

const route = useRoute()
let columnList = reactive([
  {
    key: 'no',
    label: '订单号'
    // required: true
  },
  {
    key: 'buyUid',
    label: '买家ID'
    // required: true
  },
  {
    key: 'sellUid',
    label: '卖家ID'
    // hide: computed(() => {
    //   return !detail.relId
    // })
  },
  {
    key: 'points',
    label: '交易金额'
  },
  {
    key: 'sellRemark',
    label: '买家备注'
  }
])
let columnList2 = reactive([
  {
    key: 'scene',
    label: '支付方式'
    // required: true
  },
  {
    key: 'remark',
    label: '备注'
    // required: true
  },
  {
    key: 'account',
    label: '卖方账号'
    // hide: computed(() => {
    //   return !detail.relId
    // })
  },
  {
    key: 'qrCode',
    label: '卖方收款码'
  }
])

const detail = ref({})
const showImgDetail = (imgUrl: string) => {
  showImagePreview([imgUrl])
}
const fileList = ref([])
const detailForm = ref({
  no: '',
  cny: '',
  remark: ''
})

const buySave = () => {
  console.log('fileList', fileList.value)

  // if (!detailForm.value.cny) {
  //   showToast('请输入实付金额')
  //   return
  // }
  //
  // if (!fileList.value.length) {
  //   showToast('请上传支付凭证')
  //   return
  // }

  const formdata = new FormData()
  formdata.append('no', route.query.no)
  formdata.append('cny', detailForm.value.cny)
  formdata.append('remark', detailForm.value.remark)
  // formdata.append('cert', fileList.value[0].file)

  reqWalletBuyConfirm(formdata).then((res) => {
    if (res.code !== 200) {
      return showToast(res.msg)
    }

    showToast(res.msg)
    getDetail()
  })
}

const sellSave = () => {
  const formdata = new FormData()
  formdata.append('no', route.query.no)

  reqWalletSellConfirm(formdata).then((res) => {
    if (res.code !== 200) {
      return showToast(res.msg)
    }

    showToast(res.msg)
    getDetail()
  })
}

const getDetail = () => {
  reqWalletTradeTake({
    no: route.query.no
  }).then((res) => {
    if (res.code !== 200) {
      return showToast(res.msg || '获取订单详情失败')
    }

    detail.value = res.data
  })
}
onMounted(() => {
  getDetail()
})
</script>

<style lang="less" scoped>
.orderInfo {
  color: #000;
  background-color: #f3f3f3;
  height: 100vh;
  overflow-y: auto;

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
  .content {
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
