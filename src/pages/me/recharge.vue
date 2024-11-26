<template>
  <div class="recharge rechargeClass">
    <van-nav-bar
      title="充值"
      left-arrow
      @click-left="$router.back()"
      style="background-color: transparent"
    />
    <!--    <van-image :src="tixian" width="100%" height="100%;"></van-image>-->

    <Loading v-if="loading"></Loading>
    <div class="container">
      <div class="recharge-info" @click="method.sheet.open()">
        <div class="recharge-info-left">
          <span>充值方式</span>
        </div>
        <div class="recharge-info-center">
          <div class="recharge-info-center-t">
            <img
              v-if="state.item.pay?.data?.type == 'wechat'"
              src="@/assets/img/recharge/wechat.png"
            />
            <img
              src="@/assets/img/recharge/bank2.png"
              v-else-if="state.item.pay?.data?.type == 'bank'"
            />
            <img
              src="@/assets/img/recharge/jd.jpg"
              v-else-if="state.item.pay?.data?.key == 'jdpay'"
            />
            <img
              src="@/assets/img/recharge/kd.jpg"
              v-else-if="state.item.pay?.data?.key == 'kdpay'"
            />
            <img
              src="@/assets/img/recharge/usdt.png"
              v-else-if="state.item.pay?.data?.key == 'bs'"
            />
            <img src="@/assets/img/recharge/alipay.png" v-else />
            <span>{{ state.item.pay?.data?.name }}</span>
          </div>
          <div class="recharge-info-center-b">
            <span>
              单笔支付限额 {{ state.item.pay?.data?.min }} -
              {{ state.item.pay?.data?.max }} ￥</span
            >
          </div>
        </div>
        <div class="recharge-info-right">
          <van-icon name="arrow" size="20" />
        </div>
      </div>
      <div class="recharge-money">
        <div class="txt">充值金额</div>
        <div class="money-box">
          <div class="input-content">
            <div class="input-content-icon">￥</div>
            <div class="input-field">
              <!--              <input-->
              <!--                type="number"-->
              <!--                :value="state.struct.amount"-->
              <!--                @input="-->
              <!--                  (e) => {-->
              <!--                    console.log('e.data', e)-->
              <!--                    state.struct.amount = parseInt(e.target.value)-->
              <!--                  }-->
              <!--                "-->
              <!--              />-->
              <van-field
                v-model="state.struct.amount"
                class="unp"
                label=""
                style="
                  font-size: 26px;
                  font-weight: bolder;
                  padding-bottom: 0;
                  margin-bottom: 10px;
                  color: #fff;
                  background-color: transparent;
                "
                type="number"
                name="aa"
                @input="
                  () => {
                    state.struct.amount = parseInt(state.struct.amount)
                  }
                "
              />
            </div>
          </div>
        </div>
        <button class="btn" v-on:click="method.emit" :disabled="loading">
          <div class="img-box">
            <img src="@/assets/img/recharge/recharge.png" />
          </div>
          <span>确认 </span>
          <van-loading size="20" v-if="loading" />
        </button>
      </div>
      <van-cell
        v-for="item of downloadList"
        :title="item.label"
        is-link
        @click="openDownload(item.url)"
      />
      <!--      <van-image :src="pay2" width="100%" height="100%;"></van-image>-->
      <van-popup v-model:show="state.sheet.show" position="bottom" closeable round>
        <div class="select-wrap">
          <div class="title">{{ state.sheet.title }}</div>
          <ul class="method-list">
            <li
              class="method-list-item"
              v-for="item of state.select.pay"
              @click="payItemClick(item.id)"
            >
              <div class="method-list-item-l">
                <div class="icon-box">
                  <!--                  <img :src="getIcon(item.icon)" />-->
                  <img :src="getIcon(item)" />
                </div>
                <div class="info">
                  <div>
                    {{ item.name }}
                  </div>
                  <div>单笔支付限额 {{ item.min }} - {{ item.max }} ￥</div>
                </div>
              </div>
              <div class="method-list-item-r">
                <van-icon name="success" color="#78D244" v-if="state.item.pay.id === item.id" />
              </div>
            </li>
          </ul>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import axios              from '@/utils/request.js'
// import LayoutFooter       from '@/pages/layout/footer.vue'
// import CustomerService    from '@/comps/atom/customer-service.vue'
// import { useUserStore }   from '@/store/user'
// import { onLoad } from '@dcloudio/uni-app'

import tixian from '@/assets/img/recharge/tixian.jpg'

defineOptions({
  name: 'recharge'
})

import { reactive, onMounted, watch, getCurrentInstance, ref } from 'vue'
import { reqCreateOrder, reqRechargeColumn } from '@/api/myApi'
import { showFailToast } from 'vant'
import { _notice } from '@/utils'
import Loading from '@/components/Loading.vue'
// const user = useUserStore()
import alipayLarge from '@/assets/img/recharge/alipayLarge.png'
import bankLarge from '@/assets/img/recharge/bank2.png'
import wechatLarge from '@/assets/img/recharge/wechatLarge.png'
import jd from '@/assets/img/recharge/jd.jpg'
import kd from '@/assets/img/recharge/kd.jpg'
import usdt from '@/assets/img/recharge/usdt.png'
import pay1 from '@/assets/img/recharge/pay1.jpg'
import ysf from '@/assets/img/recharge/ysf.png'
import pay2 from '@/assets/img/recharge/pay2.jpg'
import shouxia from '@/assets/img/shouxia.png'
import { load } from '@fingerprintjs/fingerprintjs'

const loading = ref(false)

const downloadList = [
  {
    label: 'K豆钱包安卓下载地址',
    url: 'https://yze1z.360tixi.com/cs5t/yziwzgq4og'
  },
  {
    label: 'K豆钱包苹果下载地址',
    url: 'https://yze1z.360tixi.com/cs5t/yziwzgq4og'
  },
  {
    label: 'JD钱包安卓下载地址',
    url: 'https://s20w2la.foton-autoparts.com/32763431746c6f'
  },
  {
    label: 'JD钱包苹果下载地址',
    url: 'https://mgyyz.ieslabsd.com/PpNV6In/n2i3ody0yt'
  },
  {
    label: 'K豆钱包卖卖视频教程',
    url: 'https://kdzfxz.kdzf2345.com/home/#/transactionFlow'
  },
  {
    label: 'jd钱包买卖视频教程',
    url: 'www.jdpay01.com/#/transactionFlow'
  }
  // {
  //   label: 'KD充值视频教程',
  //   url: '/data/video/buy.mp4'
  // },
  // {
  //   label: 'KD提现视频教程',
  //   url: '/data/video/sell.mp4'
  // },
  // {
  //   label: 'JD充值视频教程',
  //   url: '/data/video/buy.mp4'
  // },
  // {
  //   label: 'JD提现视频教程',
  //   url: '/data/video/sell.mp4'
  // }
]
const openDownload = (url) => {
  location.href = url
}
const payItemClick = (id) => {
  state.item.pay.id = id
  method.sheet.close()
}

const getIcon = (item) => {
  if (item.type === 'alipay') {
    return alipayLarge
  } else if (item.type === 'bank') {
    return bankLarge
  } else if (item.type === 'wechat') {
    return wechatLarge
    // return ysf
  } else if (item.type === 'custom') {
    if (item.key === 'jdpay') {
      return jd
    } else if (item.key === 'kdpay') {
      return kd
    } else if (item.key === 'bs') {
      return usdt
    }
  }
}
const state = reactive({
  sheet: {
    show: false,
    title: '选择充值方式'
  },
  item: {
    pay: {
      id: null,
      data: null
    }
  },
  struct: {},
  modal: {
    service: false
  },
  select: {
    pay: [
      // {
      //   id: 5,
      //   key: 'kdpay',
      //   type: 'kd',
      //   name: 'K豆钱包（提现免手续费）',
      //   min: 10,
      //   max: 30000,
      //   code: 8277,
      //   icon: kd
      // },
      // {
      //   id: 4,
      //   key: 'jdpay',
      //   type: 'jd',
      //   name: 'JD钱包',
      //   min: 10,
      //   max: 30000,
      //   code: 827,
      //   icon: jd
      // },
      // {
      //   id: 2,
      //   key: 'ltzf',
      //   type: 'alipay',
      //   name: '支付宝(支持花呗)',
      //   min: 100,
      //   max: 5000,
      //   code: 828,
      //   icon: alipayLarge
      // },
      // {
      //   id: 3,
      //   key: 'ltzf',
      //   type: 'bank',
      //   name: '手机银行',
      //   min: 100,
      //   max: 2000,
      //   code: 805,
      //   icon: bankLarge
      // }
      // {
      //   id: 1,
      //   key: 'ltzf',
      //   type: 'wechat',
      //   name: ' 微信',
      //   min: 100,
      //   max: 2000,
      //   code: 827,
      //   icon: wechatLarge
      // }
    ]
  }
})
// const { ctx, proxy } = getCurrentInstance()
//
const method = {
  init: async () => {
    reqRechargeColumn({
      order: 'indexes desc'
    }).then((res) => {
      console.log('reqRechargeColumn', res)
      if (res.code !== 200) _notice('获取充值方式失败，请联系客服')
      state.select.pay = res.data.filter((item) => item.status === 1)
      method.setPay()
    })
  },
  // 选择支付方式
  setPay: () => {
    const id = state.item.pay.id
    state.item.pay.data = state.select.pay.find((item) => item.id == id)
    method.sheet.close()
  },
  emit: async () => {
    if (!state.struct.amount) {
      return _notice('请输入充值金额！')
    }
    if (!state.item.pay.data) {
      return _notice('请选择充值方式！')
    }

    if (state.struct.amount < state.item.pay?.data?.min) {
      return _notice('最小金额为' + state.item.pay?.data?.min)
    } else if (state.struct.amount > state.item.pay?.data?.max) {
      return _notice('最大金额为' + state.item.pay?.data?.max)
    }
    loading.value = true
    reqCreateOrder({
      key: state.item.pay.data.key,
      code: state.item.pay.data.code,
      amount: state.struct.amount,
      return: `${method.domain()}/#/me`
    }).then((res: any) => {
      loading.value = false
      if (res.code !== 200) return _notice(res.msg)
      window.location.href = decodeURIComponent(res.data.url)
    })
    // axios.post('/api/order/create', {
    //   key: state.item.pay.data.key,
    //   code: state.item.pay.data.code,
    //   amount: state.struct.amount,
    //   return: `${method.domain()}/#/pages/index/wallet`
    // })

    // if (code !== 200) return method.notify(msg, 'error')
    //
    // method.jump('/pages/index/jump?url=' + encodeURIComponent(item.url))
    // method.jump('/pages/index/web-view?url=' + item.payUrl)
  },
  // 获取当前域名和端口号
  domain: () => {
    return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
  },
  // 打开抽屉
  sheet: {
    open: () => {
      state.sheet.show = true
    },
    close: () => (state.sheet.show = false)
  },
  // 跳转
  jump: (url) => uni.redirectTo({ url }),
  // 格式化数字
  format: (price = 0) => {
    let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return result === '0' ? '0.00' : result
  },
  // 通知
  notify: (msg, type = 'warning') => proxy.$refs['notify'][type](msg)
}
watch(
  () => state.item.pay.id,
  (id) => {
    method.setPay()
  }
)

onMounted(() => method.init())

// watch(
//   () => state.struct.amount,
//   (newVal) => {
//     state.struct.amount = parseInt(newVal)
//   }
// )
//
</script>

<style lang="less" scoped>
:deep(.van-hairline--bottom:after) {
  border-bottom: none;
}
:deep(.van-nav-bar__arrow) {
  //color: #fff !important;
}
:deep(.van-nav-bar__title) {
  //color: #fff !important;
}

.rechargeClass {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .container {
    margin-top: -1px;
    .recharge-info {
      //background-image: url('./images/2c757d7e9de442d6159ae953d60359a1.png');
      //background-size: 100% auto;
      //background-repeat: no-repeat;
      //background-color: transparent;
      font-size: 16px;
      display: flex;
      padding: 23px 0;
      border-bottom: 1px solid #534e4e;
      color: #323233;
      background-color: #fff;

      &-left {
        margin: 0 25px;
      }
      &-center {
        flex: 1;
        &-t {
          display: flex;
          align-items: center;
          img {
            margin-right: 6px;
            width: 15px;
            height: 15px;
          }
        }
        &-b {
          margin-top: 6px;
          //color: #fff;
        }
      }
      &-right {
        margin-top: 10px;
        width: 30px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .recharge-money {
      color: #323233;
      padding: 30px 20px;
      background-color: #fff;
      .txt {
        font-size: 16px;
        color: #323233;
      }
      .money-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        border-bottom: 1px solid #534e4e;
        height: 50px;
        .input-content {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          .input-content-icon {
            margin-right: 4px;
            font-weight: 700;
            font-size: 26px;
          }
        }
        .input-field {
          position: relative;
          display: flex;
          flex-direction: row;
          margin: 0;
          flex: 1;
          line-height: 26px;
          input,
          .inp {
            height: 100%;
            opacity: 1;
            font: inherit;
            outline: none;
            border: none;
            padding: 0;
            width: 100%;
            font-size: 32px;
          }
        }
      }
      .btn {
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top: 25px;
        flex-wrap: wrap;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: black;
        border: 1px solid transparent !important;
        background: rgba(255, 255, 255, calc(1.5 * 0.65));
        backdrop-filter: blur(10px) saturate(160%);
        box-shadow: 0 5px 40px rgb(17 58 93 / 10%) !important;
        border-radius: 100px;
        letter-spacing: 6px;

        &:active {
          background-color: #fff;
          box-shadow:
            0 0 #0000001a,
            0 0 #fffc,
            inset 18px 18px 30px #0000000f,
            inset -18px -18px 30px #ffffff4d !important;
          transition: 0.2s ease-out;
        }
        .img-box {
          margin-top: 3px;
          margin-right: 8px;
          width: 16px;
          img {
            width: 100%;
          }
        }
      }
    }
    .select-wrap {
      .title {
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bolder;
        margin-top: 15px;
      }
      .method-list {
        margin-top: 20px;
        .method-list-item {
          & + .method-list-item {
            margin-top: 6px;
          }
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &-l {
            display: flex;
            .icon-box {
              display: flex;
              align-items: center;
              margin-right: 20px;
              width: 30px;
              img {
                width: 100%;
              }
            }
            .info {
              div:nth-child(1) {
                font-weight: 400;
                font-size: 16px;
              }
              div:nth-child(2) {
                margin-top: 8px;
                font-size: 13px;
                color: #aaa;
              }
            }
          }
          &-r {
            padding-right: 8px;
          }
        }
      }
    }
  }
}
</style>
