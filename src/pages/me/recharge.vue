<template>
  <div class="recharge rechargeClass">
    <van-nav-bar
      title="充值"
      left-arrow
      @click-left="$router.back()"
      style="background-color: transparent"
    />
    <van-image :src="pay1" width="100%" height="100%;"></van-image>

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
              v-else-if="state.item.pay?.data?.type == 'jd'"
            />
            <img
              src="@/assets/img/recharge/kd.jpg"
              v-else-if="state.item.pay?.data?.type == 'kd'"
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
                style="font-size: 26px; font-weight: bolder; padding-bottom: 0; margin-bottom: 10px"
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
        <button class="btn" v-on:click="method.emit">
          <div class="img-box">
            <img src="@/assets/img/recharge/recharge.png" />
          </div>
          <span>确认</span>
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
                  <img :src="item.icon" />
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
import { reactive, onMounted, watch, getCurrentInstance, ref } from 'vue'
import { reqCreateOrder } from '@/api/myApi'
import { showFailToast } from 'vant'
import { _notice } from '@/utils'
import Loading from '@/components/Loading.vue'
// const user = useUserStore()
import alipayLarge from '@/assets/img/recharge/alipayLarge.png'
import bankLarge from '@/assets/img/recharge/bank2.png'
import wechatLarge from '@/assets/img/recharge/wechatLarge.png'
import jd from '@/assets/img/recharge/jd.jpg'
import kd from '@/assets/img/recharge/kd.jpg'
import pay1 from '@/assets/img/recharge/pay1.jpg'
import pay2 from '@/assets/img/recharge/pay2.jpg'
import shouxia from '@/assets/img/shouxia.png'

const loading = ref(false)
const getIcon = (iconUrl: string) => {
  return new URL(`../../assets/img/recharge/` + iconUrl, import.meta.url).href
}
const downloadList = [
  {
    label: 'K豆钱包安卓下载地址',
    url: 'https://kdv3.com'
  },
  {
    label: 'K豆钱包苹果下载地址',
    url: 'https://kdv3.com'
  },
  {
    label: 'KD充值视频教程',
    url: '/data/video/buy.mp4'
  },
  {
    label: 'KD提现视频教程',
    url: '/data/video/sell.mp4'
  }
]
const openDownload = (url) => {
  location.href = url
}
const payItemClick = (id) => {
  state.item.pay.id = id
  method.sheet.close()
}
const state = reactive({
  sheet: {
    show: false,
    title: '选择充值方式'
  },
  item: {
    pay: {
      id: 5,
      data: {}
    }
  },
  struct: {},
  modal: {
    service: false
  },
  select: {
    pay: [
      {
        id: 5,
        key: 'kdpay',
        type: 'kd',
        name: 'K豆钱包（提现免手续费）',
        min: 10,
        max: 30000,
        code: 8277,
        icon: kd
      },
      {
        id: 4,
        key: 'jdpay',
        type: 'jd',
        name: 'JD钱包',
        min: 10,
        max: 30000,
        code: 827,
        icon: jd
      },
      {
        id: 2,
        key: 'ltzf',
        type: 'alipay',
        name: '支付宝(支持花呗)',
        min: 100,
        max: 5000,
        code: 828,
        icon: alipayLarge
      },
      {
        id: 3,
        key: 'ltzf',
        type: 'bank',
        name: '手机银行',
        min: 100,
        max: 2000,
        code: 805,
        icon: bankLarge
      }
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
    method.setPay()
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
      if (res.code !== 200) return
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
  background-color: #fff;
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
      border-bottom: 1px solid #ccc;
      //color: #fff;

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
      background-color: #fff;
      padding: 30px 20px;
      .txt {
        font-size: 16px;
        color: #212529;
      }
      .money-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        border-bottom: 1px solid #dadbde;
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
                color: #212529;
                font-size: 16px;
              }
              div:nth-child(2) {
                margin-top: 8px;
                font-size: 13px;
                color: rgba(33, 37, 41, 0.75);
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
