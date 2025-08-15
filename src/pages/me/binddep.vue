<template>
  <div class="withdraw-page">
    <van-nav-bar
      title="兑换方式"
      left-arrow
      @click-left="$router.back()"
      style="background-color: transparent"
    />
    <Loading v-if="loading" />
    <!--    <van-image :src="tixian" width="100%" height="100%;"></van-image>-->
    <div style="background-color: #1f203d; margin: 10px; border-radius: 10px; overflow: hidden">
      <t-tabs :default-value="0" :space-evenly="false" @change="tabChange">
        <t-tab-panel :value="0" label="银行卡" />
        <!--      <t-tab-panel value="排行榜奖励" label="奖池发放" />-->
        <t-tab-panel :value="1" label="支付宝" />
        <!--        <t-tab-panel :value="2" label="K豆钱包" />-->
        <!--        <t-tab-panel :value="3" label="JD钱包" />-->
        <!--        <t-tab-panel :value="4" label="365钱包" />-->
      </t-tabs>
    </div>
    <div style="margin: 10px; border-radius: 10px; overflow: hidden; padding: 20px 0px 20px">
      <template v-if="active_ == 0">
        <div
          style="
            background-color: #3b82f2;
            margin: 20px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 24px;
          "
        >
          <van-field v-model="bank_value.name" label="姓名" placeholder="请输入姓名" />
        </div>
        <div
          style="
            background-color: #3b82f2;
            margin: 20px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 24px;
          "
        >
          <van-field label="卡号" v-model="bank_value.card_no" placeholder="请输入卡号" />
        </div>
        <div
          style="
            background-color: #3b82f2;
            margin: 20px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 24px;
          "
        >
          <van-cell style="color: #fff" title="选择银行" is-link @click="showArea = true">
            <template #value>
              <span>{{ areaText }}</span>
            </template>
          </van-cell>
        </div>
        <div style="display: flex; justify-content: center">
          <el-button
            :loading="bindLoading"
            class="w-100"
            color="#01c5f0"
            size="large"
            style="
              border: none;
              width: 85%;
              border-radius: 15px;
              color: #0775f1;
              background-color: #bfd8d8;
              font-weight: bolder;
            "
            type="primary"
            @click="save('bank')"
            >保存
          </el-button>
        </div>

        <van-action-sheet v-model:show="showArea" :actions="actions" @select="onAreaConfirm" />
      </template>
      <template v-if="active_ == 1">
        <div
          style="
            background-color: #3b82f2;
            margin: 20px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 24px;
          "
        >
          <van-field label="姓名" v-model="ali_value.name" placeholder="请输入姓名" />
        </div>
        <div
          style="
            background-color: #3b82f2;
            margin: 20px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 24px;
          "
        >
          <van-field label="账号" v-model="ali_value.card_no" placeholder="请输入账号" />
        </div>
        <div style="display: flex; justify-content: center">
          <el-button
            :loading="bindLoading"
            class="w-100"
            color="#01c5f0"
            size="large"
            style="
              border: none;
              width: 85%;
              border-radius: 15px;
              color: #0775f1;
              background-color: #bfd8d8;
              font-weight: bolder;
            "
            type="primary"
            @click="save('ali')"
            >保存
          </el-button>
        </div></template
      >
      <template v-if="active_ == 2">
        <div class="common-input-title">姓名</div>

        <van-field v-model="kd_value.name" placeholder="请输入姓名" />
        <div class="common-input-title" style="margin-top: 20px">钱包地址</div>

        <van-field v-model="kd_value.card_no" placeholder="请输入钱包地址" />
        <!--        <p style="font-size: 12px; color: #ccc; margin-top: 10px">-->
        <!--          钱包地址为钱包主页界面的34位字母+数字组合。-->
        <!--        </p>-->
        <div style="display: flex; justify-content: center">
          <el-button
            :loading="bindLoading"
            class="w-100"
            color="#01c5f0"
            size="large"
            style="
              margin-top: 30px;
              border: none;
              width: 90%;
              border-radius: 15px;
              color: #fff;
              background-image: linear-gradient(to right, #fb5b4b, #9c38e5);
            "
            type="primary"
            @click="save('kd')"
            >保存
          </el-button>
        </div>
      </template>
      <template v-if="active_ == 3">
        <div class="common-input-title">姓名</div>
        <van-field v-model="jd_value.name" placeholder="请输入姓名" />
        <div class="common-input-title" style="margin-top: 20px">钱包地址</div>

        <van-field v-model="jd_value.card_no" placeholder="请输入钱包地址" />
        <!--            <p style="font-size: 15px; color: #666; text-indent: 20px; margin-top: 20px">-->
        <!--              钱包地址为钱包主页界面的34位字母+数字组合。-->
        <!--            </p>-->
        <div style="display: flex; justify-content: center">
          <el-button
            :loading="bindLoading"
            class="w-100"
            color="#01c5f0"
            size="large"
            style="
              margin-top: 30px;
              border: none;
              width: 90%;
              border-radius: 15px;
              color: #fff;
              background-image: linear-gradient(to right, #fb5b4b, #9c38e5);
            "
            type="primary"
            @click="save('jd')"
            >保存
          </el-button>
        </div>
      </template>
      <template v-if="active_ == 4">
        <div class="common-input-title">姓名</div>

        <van-field v-model="w365_value.name" placeholder="请输入姓名" />
        <div class="common-input-title" style="margin-top: 20px">钱包地址</div>

        <van-field v-model="w365_value.card_no" placeholder="请输入钱包地址" />
        <!--            <p style="font-size: 15px; color: #666; text-indent: 20px; margin-top: 20px">-->
        <!--              钱包地址为钱包主页界面的34位字母+数字组合。-->
        <!--            </p>-->
        <div style="display: flex; justify-content: center">
          <el-button
            :loading="bindLoading"
            class="w-100"
            color="#01c5f0"
            size="large"
            style="
              margin-top: 30px;
              border: none;
              width: 90%;
              border-radius: 15px;
              color: #fff;
              background-image: linear-gradient(to right, #fb5b4b, #9c38e5);
            "
            type="primary"
            @click="save('365')"
            >保存
          </el-button>
        </div>
      </template>

      <!--      <div style="display: flex; justify-content: center">-->
      <!--        <el-button-->
      <!--          class="w-100"-->
      <!--          color="#00f7c4"-->
      <!--          size="large"-->
      <!--          style="-->
      <!--            width: 90%;-->
      <!--            border-radius: 15px;-->
      <!--            margin-top: 20px !important;-->
      <!--            color: #666;-->
      <!--            background-color: #fff;-->
      <!--            border: 1px solid #ccc !important;-->
      <!--          "-->
      <!--          type="primary"-->
      <!--          @click="$router.push('/dep')"-->
      <!--          >去兑换-->
      <!--        </el-button>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  payCard,
  bank_list,
  create,
  reqDeleteCard,
  reqCreateShareLog,
  reqWalletInfo,
  reqEnterStaff
} from '@/api/myApi'
import utils from '@/utils/utils.js'
import { onActivated, reactive, ref } from 'vue'
import { axiosInstance as axios } from '@/utils/myrequest'
import { _checkImgUrl, _notice, _showConfirmDialog, cloneDeep } from '@/utils'
import imageSrc from '@/assets/img/yinlian.png'
import kdImgSrc from '@/assets/img/recharge/kd.jpg'
import jdImgSrc from '@/assets/img/recharge/jd.jpg'
import tixian from '@/assets/img/jdhd.jpg'
import { showConfirmDialog, showDialog } from 'vant'
import { loadInteraction, loadPlayRewardVideo, wxLogin } from '@/utils/ad'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'dep'
})

const checked = ref(false)
let user
let alipay =
  'data:image/svg+xml;charset=utf-8,%3Csvg%20t%3D%221714383521253%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%224435%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M860.16%200C950.272%200%201024%2073.889684%201024%20164.163368v531.509895s-32.768-4.122947-180.224-53.355789c-40.96-14.362947-96.256-34.896842-157.696-57.478737%2036.864-63.595789%2065.536-137.485474%2086.016-215.444211h-202.752v-71.841684h247.808V256.512h-247.808V135.437474h-100.352c-18.432%200-18.432%2018.458947-18.432%2018.458947v104.663579H200.704v41.040842h249.856v69.793684H243.712v41.013895H645.12c-14.336%2051.307789-34.816%2098.519579-57.344%20141.608421-129.024-43.115789-268.288-77.985684-356.352-55.403789-55.296%2014.362947-92.16%2038.992842-112.64%2063.595789-96.256%20116.978526-26.624%20295.504842%20176.128%20295.504842%20120.832%200%20237.568-67.718737%20327.68-178.526316C757.76%20742.858105%201024%20853.692632%201024%20853.692632v6.144C1024%20950.110316%20950.272%201024%20860.16%201024H163.84C73.728%201024%200%20950.137263%200%20859.836632V164.163368C0%2073.889684%2073.728%200%20163.84%200h696.32zM268.126316%20553.121684c93.049263-10.374737%20180.062316%2026.974316%20283.270737%2078.874948-74.886737%2095.501474-165.941895%20155.701895-256.970106%20155.701894-157.830737%200-204.368842-126.652632-125.466947-197.200842%2026.300632-22.851368%2072.838737-35.301053%2099.166316-37.376z%22%20fill%3D%22%2300A0EA%22%20p-id%3D%224436%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E'
onMounted(async () => {
  user = JSON.parse(window.localStorage.getItem('userInfo'))
  await bank() //查询银行列表
  await card()
  setPay()
})
onActivated(() => {
  user = JSON.parse(window.localStorage.getItem('userInfo'))
})
const active = ref(0)
const state = reactive({
  sheet: {
    show: false,
    title: '选择兑换方式'
  },
  item: {
    card: {
      id: 1,
      data: {}
    }
  },
  struct: {
    money: null
  },
  modal: {
    service: false,
    card: false
  },
  select: {
    pay: [
      { id: 1, type: 'wechat', name: '微信-龙腾', min: 100, max: 200, code: 889 },
      { id: 2, type: 'alipay', name: '支付宝-龙腾', min: 100, max: 800, code: 828 }
    ],
    card: [],
    bank: []
  },
  card: {
    list: [],
    load: false
  }
})

const tabChange = (a) => {
  console.log(a)
  active_.value = a
}
const bank = async () => {
  const { data: item } = await bank_list()

  let list = []
  for (let key in item) {
    list.push({ label: item[key], value: key })
  }
  list = list.filter((it) => {
    return [
      '农业银行',
      '中国银行',
      '建设银行',
      '光大银行',
      '兴业银行',
      '中信银行',
      '招商银行',
      '民生银行',
      '交通银行',
      '广东发展银行',
      '平安银行',
      '邮政储蓄银行',
      '渣打银行',
      '浦东发展银行',
      '新疆银行',
      '工商银行'
    ].includes(it.label)
  })

  state.select.bank = list

  actions.value = list.map((e) => {
    return {
      name: e.label,
      subname: e.value
    }
  })
}

const showPicker = ref(false)
const loading = ref(false)
const bindLoading = ref(false)
const tixianLoading = ref(false)

const card = async () => {
  loading.value = true
  // state.card.load = true
  // console.log(user)
  const {
    data: item,
    code,
    msg
  } = await payCard({
    where: `uid = ${user.id}`
  })
  loading.value = false
  if (code !== 200) return
  state.select.card = item || []
  console.log('state.select.card', state.select.card)
  setPay()
}

const setPay = () => {
  const id = state.item.card.id
  state.item.card.data = state.select.card.find((item) => item.id === id)
  state.select.card.map((item) => {
    if (utils.is.empty(item.card_type)) {
      if (item.mode === 'alipay') {
        item.card_name = '支付宝'
      }
      return
    }
    item.card_name = state.select.bank.find((bank) => bank.value === item.card_type).label
  })
  // state.select.card = state.select.card.filter((item) => item.mode !== 'alipay')
}
const active_ = ref(0)
const bank_value = reactive({
  name: '',
  card_no: ''
})
const ali_value = reactive({
  name: '',
  card_no: ''
})
const kd_value = reactive({
  name: '',
  card_no: ''
})
const jd_value = reactive({
  name: '',
  card_no: ''
})
const w365_value = reactive({
  name: '',
  card_no: ''
})
const showArea = ref(false)
const areaText = ref('')
const actions = ref([])
const save = async (e) => {
  // 保存逻辑
  if (e == 'ali') {
    if (!ali_value.card_no || !ali_value.name) {
      return _notice('请输入完整信息！')
    }
    const flag = state.select.card.some((item) => item.card_no === ali_value.card_no)
    if (flag) {
      return _notice('已绑定过此卡号！')
    }
    bindLoading.value = true
    const { code, msg } = await axios.post('/api/pay-card/save', {
      ...ali_value,
      mode: 'alipay'
    })
    bindLoading.value = false

    _notice(msg)
    if (code === 200) {
      ali_value.card_no = ''
      ali_value.name = ''
    }
    await card()
    setPay()
  } else if (e == 'bank') {
    // console.log('bank_value', bank_value)
    // console.log("areaText.value.split(',')[1]", areaText.value.split(',')[1])
    // console.log(' state.select.card', state.select.card)
    // const flag = state.select.card.some((item) => item.card_type === areaText.value.split(',')[1])
    // if (flag) {
    //   return _notice('同一银行只能绑定一张银行卡！')
    // }
    if (!bank_value.card_no || !bank_value.name || !areaText.value) {
      return _notice('请输入完整信息！')
    }
    const flag = state.select.card.some((item) => item.card_no === bank_value.card_no)
    if (flag) {
      return _notice('已绑定过此卡号！')
    }
    bindLoading.value = true

    const { code, msg } = await axios.post('/api/pay-card/save', {
      ...bank_value,
      mode: 'bank',
      // ...state.struct, mode: 'bank',
      card_type: areaText.value.split(',')[1]
    })
    bindLoading.value = false

    _notice(msg)
    if (code === 200) {
      bank_value.card_no = ''
      bank_value.name = ''
    }
    await bank() //查询银行列表
    await card()
    setPay()
  } else if (e == 'kd') {
    if (!kd_value.card_no || !kd_value.name) {
      return _notice('请输入完整信息！')
    }
    const flag = state.select.card.some((item) => item.card_no === kd_value.card_no)
    if (flag) {
      return _notice('已绑定过此卡号！')
    }
    bindLoading.value = true
    const { code, msg } = await axios.post('/api/pay-card/save', {
      ...kd_value,
      mode: 'kdpay'
    })
    bindLoading.value = false

    _notice(msg)
    if (code === 200) {
      kd_value.card_no = ''
      kd_value.name = ''
    }
    await bank() //查询银行列表
    await card()
    setPay()
  } else if (e == 'jd') {
    if (!jd_value.card_no || !jd_value.name) {
      return _notice('请输入完整信息！')
    }
    const flag = state.select.card.some((item) => item.card_no === jd_value.card_no)
    if (flag) {
      return _notice('已绑定过此卡号！')
    }
    bindLoading.value = true
    const { code, msg } = await axios.post('/api/pay-card/save', {
      ...jd_value,
      mode: 'jdpay'
    })
    bindLoading.value = false

    _notice(msg)
    if (code === 200) {
      jd_value.card_no = ''
      jd_value.name = ''
    }
    await bank() //查询银行列表
    await card()
    setPay()
  } else if (e == '365') {
    if (!w365_value.card_no || !w365_value.name) {
      return _notice('请输入完整信息！')
    }
    const flag = state.select.card.some((item) => item.card_no === w365_value.card_no)
    if (flag) {
      return _notice('已绑定过此卡号！')
    }
    bindLoading.value = true
    const { code, msg } = await axios.post('/api/pay-card/save', {
      ...w365_value,
      mode: '365'
    })
    bindLoading.value = false

    _notice(msg)
    if (code === 200) {
      w365_value.card_no = ''
      w365_value.name = ''
    }
    await bank() //查询银行列表
    await card()
    setPay()
  }
}
const getThumb = (mode) => {
  if (mode === 'bank') {
    return imageSrc
  } else if (mode === 'kdpay') {
    return kdImgSrc
  } else if (mode === 'jdpay') {
    return jdImgSrc
  } else {
    return alipay
  }
}
const onAreaConfirm = (values) => {
  areaText.value = values.name + ',' + values.subname
  // areaText.value = values.map((item) => item.text).join(' ');
  showArea.value = false
}

const deleteCard = (item, index) => {
  console.log('item', item)
  checked.value = false
  _showConfirmDialog(
    '提示',
    '确认删除？',
    '',
    () => {
      reqDeleteCard({
        ids: item.id
      }).then(async (res) => {
        if (res.code !== 200) _notice(res.msg)

        _notice('删除成功')
        state.select.card.splice(index, 1)
      })
    },
    null,
    '确认',
    '返回',
    ''
  )
}
</script>

<style lang="less" scoped>
.fixed-back {
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
}

.withdraw-page {
  height: 100%;
  //background: url('@/assets/img/main-bg.jpg') no-repeat;
  background-color: #f7d598;

  background-size: 100% 100%;
  :deep(.van-nav-bar) {
    //background: #65b63f !important;
    .van-nav-bar__title {
      color: #000 !important;
    }

    .van-nav-bar__text {
      color: #fff !important;
    }

    .van-icon {
      color: #fff;
    }
  }
  :deep(.t-tabs__nav) {
    .t-tabs__wrapper {
      background-color: #eaeaea !important;
    }
    .t-tabs__scroll {
      background-color: #eaeaea !important;
    }
  }
  :deep(.van-hairline--bottom) {
    &:after {
      border-bottom: none;
    }
  }
  :deep(.van-cell) {
    //border-bottom: 1px solid #4d536a;
    //padding: 10px 0;
    &::after {
      border: none !important;
    }

    //.van-field__body {
    //  input {
    //    color: #fff !important;
    //    &::placeholder {
    //      color: #fff !important;
    //    }
    //  }
    //}
  }
}

.content {
  padding: 16px 16px 160px;
}

.desc {
  padding: 0 10px;
  color: #fff;
  .desc-title {
    font-size: 16px;
    font-weight: bolder;
  }
  p {
    line-height: 22px;
    .index {
      font-weight: bolder;
    }
  }
}
</style>
