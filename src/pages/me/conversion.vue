<template>
  <div class="login">
    <!-- <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" /> -->
    <van-nav-bar
      :class="{ inApp: getIsInApp() }"
      left-arrow
      placeholder
      safe-area-inset-top
      title="金币转赠"
      @click-left="router.back()"
    >
      <template #right>
        <!--        <span style="color: #fff; font-size: 14px" @click="$router.push('/conversionRecord')">-->
        <!--          转增记录-->
        <!--        </span>-->
        <!--        <span style="color: #000; font-size: 14px" @click="$router.push('/conversionIntroduce')">-->
        <span style="color: #000; font-size: 14px" @click="$router.push('/wallet')">
          赠送记录
        </span>
      </template>
    </van-nav-bar>
    <!--    <div class="logo-box">-->
    <!--      &lt;!&ndash;      <img alt="" src="@/assets/img/logo.png" />&ndash;&gt;-->
    <!--      <div class="logo-box-content">-->
    <!--        <div class="info">-->
    <!--          &lt;!&ndash;          <p>蚂蚁优选</p>&ndash;&gt;-->
    <!--          <p>-->
    <!--            可转赠通用金币数量:-->
    <!--            {{ userIncomeInfo?.wallet?.money ? userIncomeInfo?.wallet?.money.toFixed(2) : 0 }}-->
    <!--          </p>-->
    <!--          &lt;!&ndash;                    <p>the big thumb video</p>&ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="total-info">
      <div class="top">
        <div>
          <!--          <van-icon color="#000" name="user" />-->
          <span style="padding-left: 4px">可转增数量</span>
        </div>
        <!--        <div>金币</div>-->
      </div>
      <div class="center">
        {{ (walletInfo.wallet?.points / 10 || 0).toFixed(2) }}
        <span style="padding-left: 0px">金币</span>
      </div>
      <div class="bottom" @click="go('/dianziqianbao')">
        <div style="font-size: 10px; color: #333">
          <!--          10个金币起转-->
        </div>
        <div>
          绑定收款方式
          <van-icon color="#000" name="arrow" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="desc">
        <!--<van-image width="100" height="100" :src="imgg" />-->
      </div>
      <div style="color: #000; padding-left: 14px; padding-top: 10px">转赠</div>
      <van-field v-model="data.buyUid" clearable label="对方ID" placeholder="请输入对方ID">
      </van-field>

      <van-field v-model="data.points" label="转增数量" placeholder="请输入转赠数量" type="number">
      </van-field>

      <!--      <van-field-->
      <!--        is-link-->
      <!--        v-model="sceneDesc"-->
      <!--        label="收款方式"-->
      <!--        readonly-->
      <!--        placeholder="选择收款方式"-->
      <!--        @click="showPicker = true"-->
      <!--      >-->
      <!--      </van-field>-->
      <!--      <van-field v-model="data.remark" label="备注" placeholder="备注" type="textarea"> </van-field>-->
      <!--        <div class="common-input-title" style="margin-top: 10px">短信验证码</div>-->
      <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
        <van-picker
          :model-value="pickerValue"
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="
            ({ selectedValues }) => {
              console.log(selectedValues)
              data.eWalletScene = selectedValues[0]
              showPicker = false
            }
          "
        />
      </van-popup>
      <div style="width: 100%">
        <van-button
          block
          color="linear-gradient(-90deg, rgb(63, 205, 235), rgb(188, 226, 158))"
          round
          style="border: none; color: #444; font-weight: bolder; width: 90%; margin: 0 auto"
          type="primary"
          @click="onSubmit"
        >
          同意转增
        </van-button>
        <div style="text-align: center; font-weight: bolder; margin-top: 8px">10个金币起转增</div>
        <div style="text-align: center; font-weight: bolder">转增时间上午10点-晚间19点</div>
      </div>

      <!--      <div style="width: 100%; margin-top: 20px">-->
      <!--        <van-button-->
      <!--          block-->
      <!--          @click="$router.push('/invest')"-->
      <!--          color="#fcd323"-->
      <!--          round-->
      <!--          style="border: none; color: #444; font-weight: bolder"-->
      <!--          type="primary"-->
      <!--        >-->
      <!--          成为会员(降低手续费)-->
      <!--        </van-button>-->
      <!--      </div>-->
      <!--      <p style="color: #ccc; margin-top: 10px">互转10元宝起，互转无手续费！</p>-->
      <!--      <p style="color: #ccc; margin-top: 10px">-->
      <!--        发起转账方自身需有任意会员，方可使用转账。接收方无门槛接收！-->
      <!--      </p>-->
      <!--      <p style="color: #ccc; margin-top: 10px">元宝互转交易时间为每天早上8点至晚上19点！</p>-->
      <!--      <div style="box-sizing: border-box; border-radius: 15px; overflow: hidden">-->
      <!--        <img src="./images/zhuanzengyaoqiu.png" alt="" style="width: 100%" />-->
      <!--      </div>-->
      <!--      <p-->
      <!--        style="-->
      <!--          margin-top: 10px;-->
      <!--          background-color: #fff;-->
      <!--          color: #000;-->
      <!--          border-radius: 10px;-->
      <!--          padding: 5px;-->
      <!--          line-height: 20px;-->
      <!--        "-->
      <!--      >-->
      <!--        1、金币转赠5个起转，账户需要预留手续费，转成功后自动扣除手续！<br />-->
      <!--        2、非会员转增50%手续费，金币会员转赠5%手续费。<br />-->
      <!--        3、转赠时间 上午10点&#45;&#45;下午18点-->
      <!--      </p>-->

      <!--            <p style="color: #fff; margin-top: 10px">-->
      <!--                2、余额可以直接用来购买会员！余额也可以直接进行游戏，游戏过程中，有中奖赢钱，满足20元，可以在APP内发起兑换。-->
      <!--            </p>-->
      <!--            <p style="color: #fff; margin-top: 10px">-->
      <!--                3、余额互转功能，谁发起转账，谁需要拥有会员，接收方无需会员可接收-->
      <!--            </p>-->
      <!--            <p style="color: red; text-align: center; margin-top: 10px; font-size: 16px">-->
      <!--                全平台用户可以互相转-->
      <!--            </p>-->

      <!--      <div-->
      <!--        style="-->
      <!--          margin: 10px 0 0 0px;-->
      <!--          background-color: rgba(70, 89, 101, 0.7);-->
      <!--          border-radius: 10px;-->
      <!--          padding: 6px;-->
      <!--          color: #fff;-->
      <!--          text-indent: 2em;-->
      <!--          line-height: 1.6;-->
      <!--        "-->
      <!--      >-->
      <!--        <p style="margin-bottom: 8px">-->
      <!--          每日推广余额，可以用来进行游戏娱乐，中奖可兑换，投入1块钱，最多可中奖30000（3万元）爆奖奖金！-->
      <!--          中奖，无任何附加条件，直接可兑换！-->
      <!--        </p>-->

      <!--        <p>长期稳定，信誉，正规企业，合法合规!</p>-->
      <!--      </div>-->
    </div>

    <div style="margin: 15px 0 6px 8px; color: #000; font-weight: bolder">转赠记录</div>
    <div class="record">
      <van-tabs
        v-model:active="activeName"
        color="#4acfe4"
        title-active-color="#4acfe4"
        @change="init"
      >
        <van-tab name="a" title="我转出的"></van-tab>
        <van-tab name="b" title="我收到的"></van-tab>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getDataList"
        >
          <div
            v-for="(item, index) in dataList"
            :key="item.id"
            class="card"
            style="position: relative"
            @click="handleOrderClick(item)"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
              "
            >
              <div style="width: 40%">
                <div>
                  <span style="font-size: 14px; font-weight: bolder; color: #000">
                    <span v-if="activeName === 'a'">
                      转出到ID：<span style="color: #f6202b">{{ item.buyUid }}</span></span
                    >
                    <span v-else
                      >转入来自ID:<span style="color: #f6202b">{{ item.sellUid }}</span>
                    </span>
                    <div
                      style="
                        background: linear-gradient(-90deg, rgb(63, 205, 235), rgb(188, 226, 158));
                        width: fit-content;
                        padding: 1px 4px;
                        border-radius: 4px;
                        font-size: 12px;
                      "
                    >
                      {{ getConversionStatusName(item.status) }}
                    </div>
                  </span>
                </div>
                <div>
                  <span style="font-size: 12px; color: #000">{{ item.sellRemark || '' }}</span>
                </div>
              </div>
              <div>
                <van-button v-if="activeName === 'b'" type="warning" style="height: 25px">
                  进入扫码付款
                </van-button>
              </div>
              <div style="flex: 1; text-align: right">
                <div>
                  <span
                    class="text-warning"
                    style="font-size: 16px; color: #f6202b; font-weight: bolder"
                    >{{ item.points / 10 || 0 }}金币</span
                  >
                </div>
                <div style="margin-top: 6px">
                  <span style="font-size: 12px; color: #000">{{
                    method.toDate(item.createTime)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tabs>
    </div>
    <TipDialog
      v-model="showGonggaoOverlay2"
      confirm-text="去购买"
      @confirm="
        () => {
          $router.push('/invest')
          showGonggaoOverlay2 = false
        }
      "
    >
      <p
        style="
          transform: translateY(10px);
          text-align: center;
          font-size: 18px;
          color: #fff;
          font-weight: bolder;
          padding: 20px 0 40px;
        "
      >
        余额互转仅限会员用户使用
      </p>
    </TipDialog>
    <van-overlay :show="shareDialogOverlay" :z-index="99999999">
      <div
        style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        "
      >
        <img alt="" src="./images/zhuanzengfenxiang.png" style="width: 80%" @click="share" />
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts" setup>
// import imgg from './images/logo1.png'

import {
  logout as fnlogout,
  register,
  reqTradePage,
  reqTransferLogs,
  reqUserIncome,
  reqWalletInfo,
  reqWalletLog,
  reqWalletTransfer,
  sociallogin
} from '@/api/myApi'
import { _no, _sleep, _notice } from '@/utils'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useRoute } from 'vue-router'
import { computed, onActivated, onMounted, reactive, ref } from 'vue'
import { getIsInApp } from '@/utils/getTopPadding'
import dayjs from 'dayjs'
import isBetween from 'dayjs//plugin/isBetween'
import { showToast } from 'vant'
import utils from '@/utils/utils'
import { find } from '@/utils/tree'
import { getConversionStatusName } from '@/utils/getSerialName'

const showGonggaoOverlay2 = ref(false)
const walletInfo = ref({ wallet: { transfer: null } })

const isVip = ref(JSON.parse(window.localStorage.getItem('userInfo'))?.result?.staff?.serial)
const route = useRoute()
const time = ref()
const data = reactive({
  buyUid: '',
  remark: '',
  points: '',
  eWalletScene: ''
  // fingerprint: ''
})
const countdown = ref(0)
const showPicker = ref(false)
const pickerValue = ref([])
const columns = [
  { text: '支付宝', value: 'alipay' },
  { text: '微信', value: 'wechat' }
]

const sceneDesc = computed(() => {
  const result = find(columns, true, (item) => {
    return data.eWalletScene === item.value
  })
  console.log(result ? result?.text : '')
  return result ? result?.text : ''
})
// const fprint = () => {
//   FingerprintJS.load().then((FP) => {
//     FP.get().then(({ visitorId }) => (data.fingerprint = visitorId))
//   })
// }
// fprint()

let timer = null

// 更新倒计时显示
function updateCountdown() {
  if (!countdown.value) return clearInterval(timer)

  countdown.value--
}

const router = useRouter()

const shareDialogOverlay = ref(false)
const share = () => {
  localStorage.isZhuanzengShare = dayjs().format('YYYY-MM-DD')
  shareDialogOverlay.value = false
  window.shareFriend()
}

function go(path) {
  router.push(path)
}

function onSubmit() {
  // // if (!sessionStorage.isZhuanzengShare && window.android && window.android.shareImg) {
  // if (localStorage.isZhuanzengShare !== dayjs().format('YYYY-MM-DD') && window.android) {
  //   // shareDialogShow.value = true
  //   shareDialogOverlay.value = true
  //   return
  //   // window.showShareFriend()
  //   //
  //   // localStorage.isZhuanzengShare = dayjs().format('YYYY-MM-DD')
  //
  //   //   window.shareFriend()
  //   // })
  //   // return
  // }

  if (!data.buyUid) {
    return showToast('请输入对方ID')
  }
  if (!data.points) {
    return showToast('请输入转赠数量')
  }

  // if (!data.eWalletScene) {
  //   return showToast('请选择收款方式')
  // }
  // 获取今天的日期
  dayjs.extend(isBetween)
  const today = dayjs().startOf('day')

  // 获取今天 8 点和 19 点的时间
  const morning8 = today.add(10, 'hour')
  const evening7 = today.add(19, 'hour')

  // 获取当前时间
  const now = dayjs()
  const isbetween = now.isBetween(morning8, evening7, null, '[]')

  if (!isbetween) {
    showToast({
      duration: 5000,
      message: '转增时间为上午10点到晚上20点'
    })
    return
  }
  if (data.points < 10) {
    return _notice('金币转赠10个起！')
  }

  const params = JSON.parse(JSON.stringify(data))
  params.points = params.points * 10
  reqWalletTransfer(params).then((e) => {
    _notice(e.msg)
    if (e.code === 200) {
      data.buyUid = ''
      data.remark = ''
      data.points = ''
      activeName.value = 'a'
      init()
    }
  })
}
const userIncomeInfo = ref({})
const getUserIncome = (cb?) => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
    cb && cb()
  })
}

const handleOrderClick = (item) => {
  console.log('item', item)
  router.push({
    path: '/orderInfo',
    query: {
      no: item.no
    }
  })
}
const searchInfo = reactive({
  page: 0,
  limit: 30
})
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))

const getDataList = () => {
  searchInfo.page++
  const params = { ...searchInfo }
  loading.value = true
  console.log('asd', activeName.value)
  if (activeName.value === 'a') {
    params.sellUid = userInfo.value.id
  } else {
    params.buyUid = userInfo.value.id
  }
  reqTradePage(params).then(({ code, msg, data }) => {
    loading.value = false
    if (code !== 200) {
      finished.value = true
      return
    }
    // 数据全部加载完成
    dataList.value.push(...(data.data || []))
    if ((data.data || []).length === 0 || dataList.value.length >= data.count) {
      finished.value = true
    }
  })
}
const init = () => {
  searchInfo.page = 0
  dataList.value = []
  finished.value = false
  getDataList()
}

const activeName = ref('a')

const loading = ref(true)
const finished = ref(false)

const dataList = ref([])

const method = {
  toDate: (value) => utils.timeToDate(value, 'Y-M-D H:i')
}
onActivated(() => {
  getUserIncome()
  init()
  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
})
</script>

<style lang="less" scoped>
@import '../../assets/less/index';

.fixed-back {
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
}

.btns {
  padding-top: 30px;

  button {
    margin: 0 10px;
  }
}

.van-cell {
  border-radius: 10px;
  margin-bottom: 10px;
}

.login {
  width: 100%;
  height: 100vh;
  color: #666;
  //background-color: #1f203d;
  //background: url('https://lx.aosenn.com/h5/static/login/bolang.png') no-repeat;
  //background-color: rgb(247, 213, 152);
  background-size: 250px;
  background-position: 100% 0;
  background-color: #f3f3f3;
  overflow-y: auto;
  // background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;
  .van-divider {
    color: white;
  }
  :deep(.van-field__control) {
    background-color: transparent;
    border: none;
    margin-bottom: 0;
    padding: 0;
    height: auto;
  }
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
  :deep(.van-hairline--bottom) {
    &:after {
      border-bottom: none;
    }
  }

  :deep(.van-tabs) {
    .van-tabs__line {
      //background-color: red !important;
      height: 2px;
    }
  }

  .total-info {
    //background-color: #fed61f;
    //background-color: #fff;
    background: linear-gradient(-90deg, rgb(63, 205, 235), rgb(188, 226, 158));
    margin: 10px 10px;
    padding: 10px;
    border-radius: 10px;
    color: #000;
    .top {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }

    .center {
      font-weight: bolder;
      font-size: 18px;
      margin: 14px 0;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
  }
  .content {
    box-sizing: border-box;
    padding: 0 0px 10px;
    margin: 10px 10px 0;
    //box-shadow: 0 0 10px #0000001f;
    border-radius: 10px;
    background-color: #fff;

    .button {
      width: 100%;
      margin-bottom: 5px;
    }
  }

  .record {
    background-color: #fff;
  }
}

.logo-box {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 100px;
  }

  .logo-box-content {
    display: flex;

    img {
      width: 60px;
    }

    .info {
      color: #000;
      margin-left: 16px;
      text-align: center;

      p:nth-child(1) {
        font-size: 18px;
      }
    }
  }
}
:deep(.van-cell) {
  .van-cell__title.van-field__label {
    color: #000;
    font-size: 12px;
  }
  //  border-radius: 25px;
  //  box-shadow: 0 0 10px #eee;
  //  .van-field__control {
  //    text-indent: 20px;
  //  }
}
</style>
