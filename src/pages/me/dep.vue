<template>
  <div class="withdraw-page">
    <van-nav-bar title="提现" left-arrow @click-left="$router.back()" />
    <Loading v-if="loading" />

    <van-tabs v-model:active="active">
      <van-tab title="选择提现">
        <van-cell title="提现方式" is-link @click="showPopup" :value="selectName" />
        <van-action-sheet v-model:show="checked" title="选择提现方式">
          <van-radio-group v-model="pay_card_id" disabled>
            <van-card
              :desc="item.name"
              :title="item.card_name"
              v-for="item in state.select.card"
              @click="onSelect(item)"
              :thumb="item.mode == 'bank' ? imageSrc : alipay"
            >
              <template #bottom>
                <div>卡号:{{ item.card_no }}</div>
              </template>
              <template #footer>
                <van-radio
                  checked-color="#ee0a24"
                  style="position: absolute; right: 30rem; bottom: 20rem"
                  :name="item.id"
                />
              </template>
            </van-card>
          </van-radio-group>
        </van-action-sheet>

        <van-field v-model="money" label="选择提现" placeholder="请输入提现金额" />
        <van-button
          style="margin-top: 100rem; margin: 100px auto; width: 80vw"
          round
          block
          type="primary"
          @click="goPay"
          >申请提现</van-button
        >
      </van-tab>
      <van-tab title="绑定提现">
        <van-tabs v-model:active="active_">
          <van-tab title="银行卡" style="padding: 0px 20px">
            <van-field v-model="bank_value.name" label="姓名" placeholder="姓名" />
            <van-field v-model="bank_value.card_no" label="卡号" placeholder="卡号" />
            <van-cell-group>
              <van-cell title="选择银行" is-link @click="showArea = true">
                <template #value>
                  <span>{{ areaText }}</span>
                </template>
              </van-cell>
            </van-cell-group>

            <van-button type="primary" style="margin-top: 30rem" block @click="save('bank')"
              >保存</van-button
            >

            <van-action-sheet v-model:show="showArea" :actions="actions" @select="onAreaConfirm" />
            <!-- <van-popup v-model="showArea" position="bottom"> -->
            <!-- <van-area :columns-placeholder="['请选择', '请选择', '请选择']" @confirm="onAreaConfirm" /> -->
            <!-- </van-popup> -->
          </van-tab>
          <!--          <van-tab title="支付宝" style="padding: 0px 20px">-->
          <!--            <van-field v-model="ali_value.name" label="姓名" placeholder="姓名" />-->
          <!--            <van-field v-model="ali_value.card_no" label="账号" placeholder="账号" />-->

          <!--            <van-button type="primary" style="margin-top: 30rem" block @click="save('ali')"-->
          <!--              >保存</van-button-->
          <!--            >-->
          <!--          </van-tab>-->
          <van-tab title="K豆钱包" style="padding: 0px 20px">
            <van-field v-model="ali_value.name" label="姓名" placeholder="姓名" />
            <van-field v-model="ali_value.card_no" label="账号" placeholder="账号" />

            <van-button type="primary" style="margin-top: 30rem" block @click="save('ali')"
              >保存</van-button
            >
          </van-tab>
          <van-tab title="JD钱包" style="padding: 0px 20px">
            <van-field v-model="ali_value.name" label="姓名" placeholder="姓名" />
            <van-field v-model="ali_value.card_no" label="账号" placeholder="账号" />

            <van-button type="primary" style="margin-top: 30rem" block @click="save('ali')"
              >保存</van-button
            >
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { payCard, bank_list, create } from '@/api/myApi'
import utils from '@/utils/utils.js'
import { reactive } from 'vue'
import { axiosInstance as axios } from '@/utils/myrequest'
import { _checkImgUrl, _notice, cloneDeep } from '@/utils'
import imageSrc from '@/assets/img/yinlian.png'
const active = ref('')
const selectName = ref('')
const checked = ref(false)
const money = ref()
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
  pay_card_id.value = item.id
  checked.value = false
  selectName.value = item.card_name + item.name
}
const bank = async () => {
  const { data: item } = await bank_list()

  let list = []
  for (let key in item) {
    list.push({ label: item[key], value: key })
  }

  state.select.bank = list

  actions.value = list.map((e) => {
    return {
      name: e.label,
      subname: e.value
    }
  })
}
const loading = ref(false)
const card = async () => {
  loading.value = true
  // state.card.load = true
  // console.log(user)
  const { data: item } = await payCard({
    where: `uid = ${user.id}`
  })
  loading.value = false
  if (utils.is.empty(item)) return (state.modal.card = true)
  state.select.card = item

  setPay()
}
async function goPay() {
  const { code, msg } = await axios.post('/api/wallet-fetch/create', {
    money: money.value,
    pay_card_id: pay_card_id.value
  })

  if (code !== 200) return _notice(msg)
  _notice('申请已提交！', 'success')
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
  state.select.card = state.select.card.filter((item) => item.mode !== 'alipay')
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
const showArea = ref(false)
const areaText = ref('')
const actions = ref([])
const save = async (e) => {
  // 保存逻辑
  console.log('保存')
  if (e == 'ali') {
    return
    const { code, msg } = await axios.post('/api/pay-card/save', {
      ...ali_value,
      mode: 'alipay'
    })
    _notice(msg)
    await card()
    setPay()
  } else {
    const { code, msg } = await axios.post('/api/pay-card/save', {
      ...bank_value,
      mode: 'bank',
      // ...state.struct, mode: 'bank',
      card_type: areaText.value.split(',')[1]
    })
    _notice(msg)
    await bank() //查询银行列表
    await card()
    setPay()
  }
}

const onAreaConfirm = (values) => {
  areaText.value = values.name + ',' + values.subname
  // areaText.value = values.map((item) => item.text).join(' ');
  showArea.value = false
}
</script>

<style lang="less" scoped>
.fixed-back {
  position: fixed;
  left: 10rem;
  top: 20rem;
  z-index: 3;
}

.withdraw-page {
  height: 100%;
  background-color: #fff;
}

.content {
  padding: 16px 16px 160px;
}
</style>
