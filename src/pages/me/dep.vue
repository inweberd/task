<template>
  <div class="withdraw-page">
    <van-nav-bar
      title="提现"
      left-arrow
      @click-left="$router.back()"
      style="background-color: transparent"
    />
    <Loading v-if="loading" />
    <!--    <van-image :src="tixian" width="100%" height="100%;"></van-image>-->

    <van-action-sheet v-model:show="checked" title="选择提现方式">
      <van-radio-group v-model="pay_card_id" disabled>
        <van-card
          :desc="item.name"
          :title="item.card_name"
          v-for="(item, index) in state.select.card"
          @click="onSelect(item)"
          :thumb="getThumb(item.mode)"
        >
          <template #bottom>
            <div>卡号:{{ item.card_no }}</div>
          </template>
          <template #tags>
            <van-tag plain type="danger" @click.stop="deleteCard(item, index)">删除</van-tag>
          </template>
          <template #footer>
            <van-radio
              checked-color="#ee0a24"
              style="position: absolute; right: 30px; bottom: 20px"
              :name="item.id"
            />
          </template>
        </van-card>
      </van-radio-group>
    </van-action-sheet>

    <van-field
      v-model="money"
      label="选择提现"
      placeholder="请选择提现金额"
      @click="showPicker = true"
      is-link
      readonly
    />
    <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
      <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
    <p style="color: #000; margin: 10px" v-if="!state?.select?.card?.length">
      <van-icon name="warning" />
      暂无体现方式，请添加！
    </p>
    <van-radio-group v-model="pay_card_id">
      <van-cell-group inset>
        <van-cell
          v-for="item of state.select.card"
          :title="item.card_no"
          clickable
          @click="onSelect(item)"
        >
          <template #icon>
            <img
              style="width: 25px; height: 25px; margin-right: 6px"
              :src="getThumb(item.mode)"
              alt=""
            />
          </template>
          <template #right-icon>
            <van-radio :name="item.id" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div
      style="
        margin-top: 20px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      "
    >
      <el-button
        :loading="tixianLoading"
        class="w-100"
        color="#01c5f0"
        size="large"
        style="
          border: none;
          width: 80%;
          border-radius: 15px;
          color: #fff;
          background-image: linear-gradient(to right, #ff8b6e, #ff625c);
        "
        type="primary"
        @click="goPay"
        >申请提现
      </el-button>
      <span></span>
      <el-button
        class="w-100"
        color="#00f7c4"
        size="large"
        style="
          width: 80%;
          border-radius: 15px;
          margin-top: 20px !important;
          color: #666;
          background-color: #fff;
          border: 1px solid #ccc !important;
        "
        type="primary"
        @click="$router.push('/binddep')"
        >添加提现方式
      </el-button>
    </div>

    <!--        <van-button-->
    <!--          style="margin-top: 100px; margin: 50px auto 30px; width: 80vw"-->
    <!--          round-->
    <!--          block-->
    <!--          type="primary"-->
    <!--          color="#01c5f0"-->
    <!--          @click="goPay"-->
    <!--          :loading="tixianLoading"-->
    <!--          loading-text="加载中..."-->
    <!--          :disabled="tixianLoading"-->
    <!--          >申请提现</van-button-->
    <!--        >-->
    <div class="desc">
      <!--<div class="desc-title">提现流程</div>-->
      <p><span class="index">1.</span> 提现时间为10--21点</p>
      <p><span class="index">2.</span> 提现手续费固定5%</p>
      <p><span class="index">3.</span> 提现需为50的整倍数</p>
      <p><span class="index">4.</span> 使用KD钱包，JD钱包提现免手续费</p>
      <!--          <p>-->
      <!--            <span class="index">6.</span>-->
      <!--            推荐优先使用K豆钱包和JD钱包充提，永不风控，钱包里面内置支付宝，微信，银行卡，USDT等多种到账方式，自由转换，安全，方便快捷-->
      <!--          </p>-->
    </div>
    <!--        <van-image style="margin-top: 10px" :src="tixian" width="100%"></van-image>-->

    <!--        <div-->
    <!--          style="-->
    <!--            margin: 10px;-->
    <!--            background-color: rgba(70, 89, 101, 0.7);-->
    <!--            border-radius: 10px;-->
    <!--            padding: 6px;-->
    <!--            color: #fff;-->
    <!--            text-indent: 2em;-->
    <!--            line-height: 1.6;-->
    <!--          "-->
    <!--        >-->
    <!--          <p style="margin-bottom: 8px">-->
    <!--            每日推广佣金，可以用来进行游戏娱乐，中奖可提现，投入1块钱，最多可中奖30000（3万元）爆奖奖金！-->
    <!--            中奖，无任何附加条件，直接可提现！-->
    <!--          </p>-->

    <!--          <p>长期稳定，信誉，正规企业，合法合规!</p>-->
    <!--        </div>-->
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
const checkedValue = ref('1')
const router = useRouter()
const active = ref('')
const selectName = ref('')
const checked = ref(false)
const money = ref('')
const pay_card_id = ref('111')
let user
let alipay =
  'data:image/svg+xml;charset=utf-8,%3Csvg%20t%3D%221714383521253%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%224435%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M860.16%200C950.272%200%201024%2073.889684%201024%20164.163368v531.509895s-32.768-4.122947-180.224-53.355789c-40.96-14.362947-96.256-34.896842-157.696-57.478737%2036.864-63.595789%2065.536-137.485474%2086.016-215.444211h-202.752v-71.841684h247.808V256.512h-247.808V135.437474h-100.352c-18.432%200-18.432%2018.458947-18.432%2018.458947v104.663579H200.704v41.040842h249.856v69.793684H243.712v41.013895H645.12c-14.336%2051.307789-34.816%2098.519579-57.344%20141.608421-129.024-43.115789-268.288-77.985684-356.352-55.403789-55.296%2014.362947-92.16%2038.992842-112.64%2063.595789-96.256%20116.978526-26.624%20295.504842%20176.128%20295.504842%20120.832%200%20237.568-67.718737%20327.68-178.526316C757.76%20742.858105%201024%20853.692632%201024%20853.692632v6.144C1024%20950.110316%20950.272%201024%20860.16%201024H163.84C73.728%201024%200%20950.137263%200%20859.836632V164.163368C0%2073.889684%2073.728%200%20163.84%200h696.32zM268.126316%20553.121684c93.049263-10.374737%20180.062316%2026.974316%20283.270737%2078.874948-74.886737%2095.501474-165.941895%20155.701895-256.970106%20155.701894-157.830737%200-204.368842-126.652632-125.466947-197.200842%2026.300632-22.851368%2072.838737-35.301053%2099.166316-37.376z%22%20fill%3D%22%2300A0EA%22%20p-id%3D%224436%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E'
let bank_img =
  'data:image/svg+xml;charset=utf-8,%3Csvg%20t%3D%221715256382154%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%224327%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M0%200h1024v1024H0V0z%22%20fill%3D%22%23202425%22%20opacity%3D%22.01%22%20p-id%3D%224328%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M102.4%20273.066667a34.133333%2034.133333%200%200%201%2034.133333-34.133334h750.933334a34.133333%2034.133333%200%200%201%2034.133333%2034.133334v648.533333a34.133333%2034.133333%200%200%201-34.133333%2034.133333H136.533333a34.133333%2034.133333%200%200%201-34.133333-34.133333V273.066667z%22%20fill%3D%22%23FFAA44%22%20p-id%3D%224329%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M523.4688%2038.229333a34.133333%2034.133333%200%200%200-22.9376%200l-443.733333%20158.481067A34.133333%2034.133333%200%200%200%2034.133333%20228.864V358.4a17.066667%2017.066667%200%200%200%2017.066667%2017.066667h921.6a17.066667%2017.066667%200%200%200%2017.066667-17.066667V228.864a34.133333%2034.133333%200%200%200-22.664534-32.1536l-443.733333-158.481067zM68.266667%20750.933333a34.133333%2034.133333%200%200%200-34.133334%2034.133334v136.533333a34.133333%2034.133333%200%200%200%2034.133334%2034.133333h887.466666a34.133333%2034.133333%200%200%200%2034.133334-34.133333v-136.533333a34.133333%2034.133333%200%200%200-34.133334-34.133334H68.266667z%22%20fill%3D%22%2311AA66%22%20p-id%3D%224330%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M409.6%20273.066667a34.133333%2034.133333%200%200%201%2034.133333-34.133334h153.6a34.133333%2034.133333%200%201%201%200%2068.266667H443.733333a34.133333%2034.133333%200%200%201-34.133333-34.133333z%20m-102.4%20170.666666a34.133333%2034.133333%200%200%201%2034.133333%2034.133334v170.666666a34.133333%2034.133333%200%201%201-68.266666%200v-170.666666a34.133333%2034.133333%200%200%201%2034.133333-34.133334z%20m204.8%200a34.133333%2034.133333%200%200%201%2034.133333%2034.133334v170.666666a34.133333%2034.133333%200%201%201-68.266666%200v-170.666666a34.133333%2034.133333%200%200%201%2034.133333-34.133334z%20m204.8%200a34.133333%2034.133333%200%200%201%2034.133333%2034.133334v170.666666a34.133333%2034.133333%200%201%201-68.266666%200v-170.666666a34.133333%2034.133333%200%200%201%2034.133333-34.133334z%22%20fill%3D%22%23FFFFFF%22%20p-id%3D%224331%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E'
const value1 = ref()
onMounted(async () => {
  user = JSON.parse(window.localStorage.getItem('userInfo'))
  await bank() //查询银行列表
  await card()
  setPay()
})
onActivated(() => {
  user = JSON.parse(window.localStorage.getItem('userInfo'))
})
const state = reactive({
  sheet: {
    show: false,
    title: '选择提现方式'
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
const showPopup = () => {
  checked.value = true
}

const onSelect = (item) => {
  console.log('item', item)
  pay_card_id.value = item.id
  checked.value = false

  let card_name = item.card_name
  if (item.mode === 'kdpay') {
    card_name = 'K豆钱包'
  } else if (item.mode === 'jdpay') {
    card_name = 'JD钱包'
  }
  selectName.value = card_name + item.name
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
const columns = [
  { text: '50', value: '50' },
  { text: '100', value: '100' },
  { text: '200', value: '200' },
  { text: '300', value: '300' },
  { text: '400', value: '400' },
  { text: '500', value: '500' },
  { text: '1000', value: '1000' },
  { text: '2000', value: '2000' },
  { text: '3000', value: '3000' },
  { text: '4000', value: '4000' },
  { text: '5000', value: '5000' }
]
const showPicker = ref(false)
const loading = ref(false)
const bindLoading = ref(false)
const tixianLoading = ref(false)
const onConfirm = ({ selectedValues, selectedOptions }) => {
  showPicker.value = false
  money.value = selectedValues[0]
}
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
async function goPay() {
  // loadInteraction()
  if (!money.value) {
    return _notice('请选择提现金额')
  }

  const walletRes = await reqWalletInfo()

  if (money.value > walletRes.data.amount + walletRes.data.money) {
    loading.value = false
    _notice('余额不足!')
    return
  }
  const serial = user?.result?.staff?.serial
  if (!serial) {
    showDialog({
      title: '重要公告',
      message:
        '为保障平台的公平与可持续发展，抵制工作室刷子的批量违规行为，公司决定，零撸用户玩家需购买一份股权后，才可进行出款操作。这一举措旨在维护广大用户的长远利益，确保平台能够长久稳定运营，感谢大家的理解与支持。' +
        '\n购买股权后，后续出款将无需审核，款项将在 30 分钟内到账，让您的资金流转更加便捷高效。',
      confirmButtonText: '去购买'
    }).then(() => {
      router.push('/invest')
    })
    return
  }

  // if (!sessionStorage.seeVideoWithdrawal) {
  //   showDialog({
  //     message: '观看激励视频进行提现！遇到问题请及时联系客服！'
  //   }).then(() => {
  //     // on close
  //     loadPlayRewardVideo(() => {
  //       sessionStorage.seeVideoWithdrawal = true
  //     })
  //   })
  //   return
  // }
  // if (!sessionStorage.isShared) {
  //   showDialog({
  //     message: '先分享微信朋友圈，再进行提现!'
  //   }).then(() => {
  //     // on close
  //
  //     sessionStorage.isShared = true
  //     window.shareFriend()
  //   })
  //   return
  // }
  tixianLoading.value = true
  const { code, msg } = await axios.post('/api/wallet-fetch/create', {
    money: money.value,
    pay_card_id: pay_card_id.value
  })

  tixianLoading.value = false
  sessionStorage.seeVideoWithdrawal = ''
  sessionStorage.isShared = ''
  if (code !== 200) {
    showDialog({
      message: msg
    })
    return
  }
  showDialog({
    message: '申请已提交！'
  })
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
const active_ = ref()
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
