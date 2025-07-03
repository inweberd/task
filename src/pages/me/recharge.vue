<template>
  <div class="recharge rechargeClass">
    <van-nav-bar
      left-arrow
      style="background-color: transparent"
      fixed
      title="充值"
      @click-left="$router.back()"
    />

    <Loading v-if="loading"></Loading>
    <div class="user-money">
      <div class="user-money-item1">
        <div class="user-money-item11">当前余额（元）</div>
        <div class="user-money-item12">0.00</div>
      </div>
      <div class="user-money-item2">充值记录</div>
    </div>
    <div class="recharge-box">
      <div class="recharge-title">充值金额</div>
      <div class="recharge-sdje">
        ￥
        <div class="uni-input">
          <div class="uni-input-wrapper">
            <input
              v-model="state.struct.amount"
              @click="activeIndex = -1"
              maxlength="140"
              autocomplete="off"
              type="number"
              class="uni-input-input"
              placeholder="请输入金额"
            />
          </div>
        </div>
      </div>
      <div class="recharge-list">
        <div
          v-for="(item, index) of columns"
          class="recharge-item"
          :class="[activeIndex === index ? 'recharge-item-active' : '']"
          @click="
            () => {
              activeIndex = index
              state.struct.amount = null
            }
          "
        >
          冲{{ item.text }}元
        </div>
      </div>
    </div>

    <van-radio-group v-model="state.item.pay.id" checked-color="#ffce42">
      <van-cell-group inset>
        <van-cell
          title="单选框 1"
          clickable
          @click="state.item.pay.id = item.id"
          v-for="item of state.select.pay"
        >
          <template #title>
            <div style="display: flex; align-items: center">
              <div
                style="
                  margin-right: 10px;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  overflow: hidden;
                "
              >
                <img style="width: 20px" :src="getIcon(item)" />
              </div>
              <span class="custom-title"
                >{{ item.name }}
                <div>单笔支付限额 {{ item.min }} - {{ item.max }} ￥</div>
              </span>
            </div>
          </template>
          <template #right-icon>
            <van-radio :name="item.id" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="bot-box">
      <div class="bot-box-czxy">点击立即充值,即表示您已经同意<span>充值协议</span></div>
      <div class="bot-box-ljcz" @click="method.emit">立即充值</div>
    </div>
    <template v-if="false">
      <div class="fangshi-box" @click="method.sheet.open()">
        <div>购买方式</div>

        <div style="display: flex; align-items: center">
          <!--        <template v-if="pay_card_id">-->
          <!--          <img :src="getImg" alt="" />-->
          <!--        </template>-->
          <template v-if="state.item.pay?.id">
            <img
              v-if="state.item.pay?.data?.type == 'wechat'"
              src="@/assets/img/recharge/wechat.png"
            />
            <img
              v-else-if="state.item.pay?.data?.type == 'bank'"
              src="@/assets/img/recharge/bank2.png"
            />
            <img
              v-else-if="state.item.pay?.data?.key == 'jdpay'"
              src="@/assets/img/recharge/jd.jpg"
            />
            <img
              v-else-if="state.item.pay?.data?.key == 'kdpay'"
              src="@/assets/img/recharge/kd.jpg"
            />
            <img
              v-else-if="state.item.pay?.data?.key == 'bs'"
              src="@/assets/img/recharge/usdt.png"
            />
            <img v-else src="@/assets/img/recharge/alipay.png" />
          </template>
          <template v-else> 请选择</template>
          <van-icon color="#ccc" name="arrow" size="20" />
        </div>
      </div>
      <div v-if="state.item.pay?.id" style="text-indent: 30px; color: #ccc; font-size: 12px">
        <div class="recharge-info-center-t">
          <span
            >{{ state.item.pay?.data?.name }} （{{ state.item.pay?.data?.min }} -
            {{ state.item.pay?.data?.max }} ￥）</span
          >
        </div>
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
        <van-field
          v-model="state.struct.amount"
          class="unp"
          label="购买钻石数量"
          placeholder="请输入购买钻石数量"
          style="
            font-weight: bolder;
            margin-bottom: 10px;
            color: #fff !important;
            background-color: transparent;
          "
          type="number"
          @input="
            () => {
              state.struct.amount = parseInt(state.struct.amount)
            }
          "
        />
      </div>
    </template>

    <div v-if="false" class="container">
      <div class="recharge-info" @click="method.sheet.open()">
        <div class="recharge-info-left">
          <template v-if="state.item.pay?.id">
            <img
              v-if="state.item.pay?.data?.type == 'wechat'"
              src="@/assets/img/recharge/wechat.png"
            />
            <img
              v-else-if="state.item.pay?.data?.type == 'bank'"
              src="@/assets/img/recharge/bank2.png"
            />
            <img
              v-else-if="state.item.pay?.data?.key == 'jdpay'"
              src="@/assets/img/recharge/jd.jpg"
            />
            <img
              v-else-if="state.item.pay?.data?.key == 'kdpay'"
              src="@/assets/img/recharge/kd.jpg"
            />
            <img
              v-else-if="state.item.pay?.data?.key == 'bs'"
              src="@/assets/img/recharge/usdt.png"
            />
            <img v-else src="@/assets/img/recharge/alipay.png" />
          </template>
        </div>
        <div class="recharge-info-center">
          <template v-if="state.item.pay?.id">
            <div class="recharge-info-center-t">
              <span>{{ state.item.pay?.data?.name }}</span>
            </div>
            <div class="recharge-info-center-b">
              <span>（{{ state.item.pay?.data?.min }} - {{ state.item.pay?.data?.max }} ￥）</span>
            </div>
          </template>
          <template v-else>
            <!--            <p style="font-size: 18px; color: #ccc; margin-left: 20px">请选择购买方式</p>-->
            <p
              style="
                font-size: 22px;
                font-weight: bolder;
                padding-bottom: 0;
                color: #fff;
                background-color: transparent;
              "
            >
              请选择购买方式
            </p>
          </template>
        </div>
        <div class="recharge-info-right">
          <van-icon color="#fff" name="arrow" size="20" />
        </div>
      </div>
      <div class="recharge-money">
        <div class="txt">购买钻石数量</div>
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
                placeholder="请输入充值金额"
                style="
                  font-size: 22px;
                  font-weight: bolder;
                  padding-bottom: 0;
                  margin-bottom: 10px;
                  color: #fff !important;
                  background-color: transparent;
                "
                type="number"
                @input="
                  () => {
                    state.struct.amount = parseInt(state.struct.amount)
                  }
                "
              />
            </div>
          </div>
        </div>
        <!--        <button class="btn" v-on:click="method.emit" :disabled="loading">-->
        <!--          &lt;!&ndash;          <div class="img-box">&ndash;&gt;-->
        <!--          &lt;!&ndash;            <img src="@/assets/img/recharge/recharge.png" />&ndash;&gt;-->
        <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
        <!--          <span>确认 </span>-->
        <!--          <van-loading size="20" v-if="loading" />-->
        <!--        </button>-->
        <div
          v-if="false"
          style="margin-top: 20px; font-size: 16px; font-weight: bolder; color: #333"
        >
          购买方式
        </div>
        <!--        <div-->
        <!--          style="-->
        <!--            margin: 6px 0 0 0px;-->
        <!--            background-color: #ff625c;-->
        <!--            border-radius: 10px;-->
        <!--            padding: 6px;-->
        <!--            color: #fff;-->
        <!--            line-height: 1.6;-->
        <!--            font-size: 14px;-->
        <!--          "-->
        <!--        >-->
        <!--          <p style="font-size: 16px; color: #fff">-->
        <!--            (每天0点到23点开放充值，每天23点-0点，公司1小时出账期停充！)-->
        <!--          </p>-->
        <!--          <p style="font-size: 16px; color: #fff; margin-top: 6px">-->
        <!--            (首次注册使用JD钱包单笔充值1000元赠送100，充5000赠送200元 )-->
        <!--          </p>-->
        <!--          <p style="font-size: 16px; color: #fff; margin-top: 6px">-->
        <!--            (首次注册使用365钱包注册送58元，单笔充值400赠送88元，首次365钱包总共送146元 )-->
        <!--          </p>-->
        <!--        </div>-->
        <div v-if="false" class="chongzhiList">
          <div
            v-for="item of state.select.pay"
            :class="{
              active: state.item.pay?.id == item.id
            }"
            class="chongzhiList-item"
            @click="payItemClick(item.id)"
          >
            <img :src="getIcon(item)" />
            <div style="width: 100%; text-align: center">
              <span> {{ item.name }}</span>
              <p>（{{ item.min }} - {{ item.max }}￥）</p>
            </div>
          </div>
        </div>
      </div>

      <van-cell
        v-for="item of downloadList"
        :title="item.label"
        is-link
        @click="openDownload(item.url)"
      />
    </div>
    <div
      v-if="false"
      style="
        margin-top: 20px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      "
    >
      <el-button
        :loading="loading"
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
        @click="method.emit"
        >购买
      </el-button>
    </div>

    <!--    <div style="background-color: #2e3350; padding: 10px; margin: 20px; border-radius: 10px">-->
    <!--      <van-icon name="warning-o" color="red" size="25" />-->
    <!--      使用微信或者支付宝充值过程中，如遇到无法支付的情况，请关闭这个页面。从新点充值按钮，重新拉起新的订单，每次拉起订单，都是不同的最新的收款码。重新拉起新订单即可正常支付付款！-->
    <!--    </div>-->

    <!--    <p-->
    <!--      style="-->
    <!--        background-color: #2e3350;-->
    <!--        padding: 10px;-->
    <!--        margin: 20px;-->
    <!--        border-radius: 10px;-->
    <!--        font-weight: bolder;-->
    <!--      "-->
    <!--    >-->
    <!--      每次充值，每次拉起订单都是不同的最新的二维码，切勿重复支付给已经付款过的码-->
    <!--      。都以每次弹出的最新的码为准-->
    <!--    </p>-->
    <!--    <div style="margin: 20px; color: #ccc">-->
    <!--      <div>-->
    <!--        <a style="text-decoration: underline; color: #1e83d3" href="https://jdpp1.com/#/"-->
    <!--          >JDPAY钱包 APP下载</a-->
    <!--        >-->
    <!--        <br />-->
    <!--        苹果最新版本 1.0.17 <br />-->
    <!--        安卓最新版本 1.0.19-->
    <!--      </div>-->

    <!--      <div style="margin-top: 20px">-->
    <!--        苹果安卓通用直链：-->
    <!--        <br />-->
    <!--        <a-->
    <!--          style="text-decoration: underline; color: #1e83d3"-->
    <!--          href="https://yszro.sfplgdvz.com/api/c/ezuhn88e"-->
    <!--          >直链1</a-->
    <!--        ><br />-->
    <!--        <a-->
    <!--          style="text-decoration: underline; color: #1e83d3"-->
    <!--          href="https://mjezz.uytpkk.com/uB0zAxZ2/n2i3ody0yt"-->
    <!--          >直链2</a-->
    <!--        ><br />-->
    <!--        <a-->
    <!--          style="text-decoration: underline; color: #1e83d3"-->
    <!--          href="https://s20w2la.tomorrowgold.com:1002/d/32763431746c6f"-->
    <!--          >直链3</a-->
    <!--        ><br />-->
    <!--      </div>-->
    <!--      <div style="margin-top: 20px">-->
    <!--        <a style="text-decoration: underline; color: #1e83d3" href="http://www.jdpweb.com/pc.html"-->
    <!--          >JDPAY钱包 H5 网页版本（无需下载app）</a-->
    <!--        ><br />-->
    <!--        <a style="text-decoration: underline; color: #1e83d3" href="http://8.218.116.194"-->
    <!--          >H5国内访问</a-->
    <!--        ><br />-->
    <!--      </div>-->
    <!--    </div>-->
    <div style="margin: 20px; color: #ccc">
      <!--      <div>-->
      <!--        365钱包活动：首次使用365钱包充值454元，实际到账600元余额-->
      <!--        <span-->
      <!--          style="text-decoration: underline; color: #1e83d3"-->
      <!--          @click="-->
      <!--            $router.push({-->
      <!--              path: 'downloadInfo',-->
      <!--              type: '365'-->
      <!--            })-->
      <!--          "-->
      <!--          >点击下载安装365钱包</span-->
      <!--        >-->
      <!--      </div>-->
      <!--      <div style="margin-top: 20px">-->
      <!--        JD钱包活动：首次使用JD钱包充值1000元，实际到账1100元余额-->
      <!--        首次使JD钱包充值5000元，实际到账5200元-->
      <!--        <span-->
      <!--          style="text-decoration: underline; color: #1e83d3"-->
      <!--          @click="-->
      <!--            $router.push({-->
      <!--              path: 'downloadInfo',-->
      <!--              type: 'jd'-->
      <!--            })-->
      <!--          "-->
      <!--          >点击下载安装JD钱包</span-->
      <!--        >-->
      <!--      </div>-->
    </div>
    <!--      <van-image :src="pay2" width="100%" height="100%;"></van-image>-->
    <div class="container">
      <van-popup v-model:show="state.sheet.show" closeable position="bottom" round>
        <div class="select-wrap">
          <div class="title">{{ state.sheet.title }}</div>
          <ul class="method-list">
            <li
              v-for="item of state.select.pay"
              class="method-list-item"
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
                <van-icon v-if="state.item.pay.id === item.id" color="#78D244" name="success" />
              </div>
            </li>
          </ul>
        </div>
      </van-popup>
    </div>
    <!--    <van-floating-bubble-->
    <!--      axis="xy"-->
    <!--      icon="chat"-->
    <!--      magnetic="x"-->
    <!--      style="background: transparent; overflow: auto; width: 60px; height: 100px"-->
    <!--      @click="showGonggaoOverlay = true"-->
    <!--    >-->
    <!--      <div style="color: #fff; width: 100%; height: 100%; font-size: 14px">-->
    <!--        &lt;!&ndash;      <img src="@/assets/img/update.png" alt="" />&ndash;&gt;-->
    <!--        <img src="@/assets/img/kefu.webp" alt="" style="width: 100%; border-radius: 50%" />-->
    <!--        <p>联系客服</p>-->
    <!--      </div>-->
    <!--    </van-floating-bubble>-->
    <TipDialog
      v-model="showGonggaoOverlay"
      confirm-text="点击进入官方群"
      @confirm="handleGonggaoConfirm"
    >
      <!--      <p-->
      <!--        style="-->
      <!--          transform: translateY(10px);-->
      <!--          text-align: center;-->
      <!--          font-size: 18px;-->
      <!--          color: #000;-->
      <!--          font-weight: bolder;-->
      <!--        "-->
      <!--      >-->
      <!--        请使用68APP扫码进官方群-->
      <!--      </p>-->
      <div style="padding: 20px">
        <img alt="" src="@/assets/img/weimaiquan.jpg" style="width: 100%" />
      </div>
    </TipDialog>
  </div>
</template>

<script lang="ts" setup>
// import axios              from '@/utils/request.js'
// import LayoutFooter       from '@/pages/layout/footer.vue'
// import CustomerService    from '@/comps/atom/customer-service.vue'
// import { useUserStore }   from '@/store/user'
// import { onLoad } from '@dcloudio/uni-app'

// import tixian from '@/assets/img/recharge/tixian.jpg'
import tixian from '@/assets/img/recharge/texian2.jpg'

defineOptions({
  name: 'recharge'
})

const showGonggaoOverlay = ref(false)
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
import usdt2 from '@/assets/img/recharge/usdt2.jpg'
import img365 from '@/assets/img/recharge/365.jpg'
import pay1 from '@/assets/img/recharge/pay1.jpg'
import ysf from '@/assets/img/recharge/ysf.png'
import pay2 from '@/assets/img/recharge/pay2.jpg'
import shouxia from '@/assets/img/shouxia.png'
import { load } from '@fingerprintjs/fingerprintjs'
import imageSrc6 from '@/pages/me/images/banner6.jpg'

const loading = ref(false)

const activeIndex = ref(0)

const downloadList = [
  // {
  //   label: 'K豆钱包安卓下载地址',
  //   url: 'https://kd002.com'
  // },
  // {
  //   label: 'K豆钱包苹果下载地址',
  //   url: 'https://mgi3m.aneeyx.com/L4eXiggS/yjfhzjflnm'
  // },
  // {
  //   label: 'JD钱包安卓下载地址',
  //   url: 'https://s20w2la.foton-autoparts.com/32763431746c6f'
  // },
  // {
  //   label: 'JD钱包苹果下载地址',
  //   url: 'https://mgyyz.ieslabsd.com/PpNV6In/n2i3ody0yt'
  // },
  // {
  //   label: 'K豆钱包卖卖视频教程',
  //   url: 'https://kdzfxz.kdzf2345.com/home/#/transactionFlow'
  // },
  // {
  //   label: 'jd钱包买卖视频教程',
  //   url: 'https://www.jdpay01.com/#/transactionFlow'
  // }
  // {
  //   label: 'KD充值视频教程',
  //   url: '/data/video/buy.mp4'
  // },
  // {
  //   label: 'KD兑换视频教程',
  //   url: '/data/video/sell.mp4'
  // },
  // {
  //   label: 'JD充值视频教程',
  //   url: '/data/video/buy.mp4'
  // },
  // {
  //   label: 'JD兑换视频教程',
  //   url: '/data/video/sell.mp4'
  // }
]
const openDownload = (url) => {
  location.href = url
}
const handleGonggaoConfirm = () => {
  showGonggaoOverlay.value = false
  // window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.edujia.weimai'
  window.location.href = 'https://www.haiouchat.com'
}
const payItemClick = (id) => {
  state.item.pay.id = id
  method.sheet.close()
}
const columns = ref([
  { text: '200', value: '200' },
  { text: '300', value: '300' },
  { text: '500', value: '500' },
  { text: '800', value: '800' },
  { text: '1000', value: '1000' },
  { text: '1500', value: '1500' },
  { text: '2000', value: '2000' },
  { text: '3000', value: '3000' },
  { text: '5000', value: '5000' }
])
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
    } else if (item.key === 'bishengusdt') {
      return usdt2
    } else if (item.key === '365') {
      return img365
    }
  }
}
const state = reactive({
  sheet: {
    show: false,
    title: '选择购买方式'
  },
  item: {
    pay: {
      id: null,
      data: null
    }
  },
  struct: {
    amount: null
  },
  modal: {
    service: false
  },
  select: {
    pay: [
      // {
      //   id: 5,
      //   key: 'kdpay',
      //   type: 'kd',
      //   name: 'K豆钱包（兑换免手续费）',
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
      if (res.code !== 200) _notice('获取购买方式失败，请联系客服')
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
    if (!state.struct.amount && activeIndex.value === -1) {
      return _notice('请输入购买数量！')
    }
    if (!state.item.pay.data) {
      return _notice('请选择购买方式！')
      // method.sheet.open()
      // return
    }

    let amount = 0

    if (activeIndex.value !== -1) {
      amount = columns[activeIndex.value].value
    } else {
      amount = state.struct.amount
    }

    if (amount < state.item.pay?.data?.min) {
      return _notice('最小金额为' + state.item.pay?.data?.min)
    } else if (amount > state.item.pay?.data?.max) {
      return _notice('最大金额为' + state.item.pay?.data?.max)
    }
    loading.value = true
    reqCreateOrder({
      key: state.item.pay.data.key,
      code: state.item.pay.data.code,
      amount: amount,
      return: `${method.domain()}/#/me`
    })
      .then((res: any) => {
        loading.value = false
        if (res.code !== 200) return _notice(res.msg)
        window.location.href = decodeURIComponent(res.data.url)
      })
      .catch((err) => {
        loading.value = false
        _notice('请求超时，请稍后重试')
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

//:deep(.van-nav-bar__arrow) {
//  color: #fff !important;
//}
//:deep(.van-nav-bar__title) {
//  color: #fff !important;
//}

.rechargeClass {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f4f4f4 url('https://lx.aosenn.com/h5/static/shouye/homepage_nav_bg_img@.png')
    no-repeat;
  background-size: 100% auto;
  color: #303133;
  padding-top: 50px;

  :deep(.van-nav-bar) {
    background-color: #fed61f !important;
    .van-nav-bar__title {
      //color: #ffffff !important;
    }

    .van-nav-bar__text {
      //color: #fff !important;
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
  .user-money {
    margin: 15px 16px 14px 16px;
    display: flex;
    color: #000;
    align-items: center;
    position: relative;
    .user-money-item1 {
      display: flex;
      flex-direction: column;

      .user-money-item11 {
        font-size: 13px;
        margin-bottom: 4px;
      }
      .user-money-item12 {
        font-size: 23px;
        font-weight: 700;
      }
    }

    .user-money-item2 {
      margin-left: auto;
      padding: 4px 15px;
      border: 1px solid #000;
      border-radius: 50px;
    }
  }

  .recharge-box {
    margin: 14px 14px;
    background-color: #fff;
    padding: 10px 10px;
    border-radius: 10px;
    position: relative;

    .recharge-title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: 700;
    }

    .recharge-sdje {
      display: flex;
      height: 40px;
      align-items: center;
      border-bottom: 1px solid hsla(0, 0%, 46.7%, 0.25);
      margin-bottom: 10px;
      font-size: 20px;

      .uni-input {
        display: block;
        font-size: 16px;
        line-height: 1.4em;
        height: 1.4em;
        min-height: 1.4em;
        overflow: hidden;

        .uni-input-wrapper {
          display: flex;
          position: relative;
          width: 100%;
          height: 100%;
          flex-direction: column;
          -webkit-box-pack: center;
          justify-content: center;
          outline: none;
          border: none;
          padding: 0;
          margin: 0;
          text-decoration: inherit;

          input {
            position: relative;
            display: block;
            height: 100%;
            background: none;
            color: inherit;
            opacity: 1;
            font: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            text-align: inherit;
            text-indent: inherit;
            text-transform: inherit;
            text-shadow: inherit;
            outline: none;
            border: none;
            padding: 0;
            margin: 0;
            transform: translate(8px, 2px);
            font-weight: 700;
            text-decoration: inherit;
          }
        }
      }
    }

    .recharge-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .recharge-item {
        width: 31.33%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0.5px solid #fed61f;
        border-radius: 10px;
        box-sizing: border-box;
        margin: 5px 1%;
        font-size: 16px;
        font-weight: 600;

        &-active {
          color: #fff;
          background-image: linear-gradient(90deg, #fed620, #fed721);
          border: 0px solid #fed61f;
        }
      }
    }
  }

  .bot-box {
    width: 100%;
    margin-top: 10px;

    .bot-box-czxy {
      text-align: center;
      color: #aaa;
      font-size: 13px;
      margin: 15px auto;

      span {
        color: #000;
      }
    }
    .bot-box-ljcz {
      width: 85%;
      height: 40px;
      background-image: linear-gradient(90deg, #fed620, #fed721);
      line-height: 40px;
      border-radius: 40px;
      margin: 0 auto;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .container {
    margin-top: -1px;

    .recharge-info {
      //background-image: url('./images/2c757d7e9de442d6159ae953d60359a1.png');
      //background-size: 100% auto;
      //background-repeat: no-repeat;
      //background-color: transparent;
      margin: 0 20px;
      font-size: 16px;
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #4d536a;
      color: #fff;
      background-color: #3b82f2;
      align-items: center;

      &-left {
        img {
          margin-right: 6px;
          width: 40px;
          height: 40px;
        }
      }

      &-center {
        color: #fff;
        flex: 1;
        //margin-left: 20px;
        &-t {
          display: flex;
          align-items: center;
          font-size: 14px;
        }

        &-b {
          margin-top: 6px;
          font-size: 14px;
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
      color: #fff;
      padding: 30px 20px;
      //background-color: #fff;
      .txt {
        font-size: 16px;
        font-weight: bolder;
        color: #fff;
      }

      .money-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        border-bottom: 1px solid #4d536a;
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
        border: 1px solid transparent !important;
        color: #fff;
        //background: rgba(255, 255, 255, calc(1.5 * 0.65));
        background: #01c5f0;
        //backdrop-filter: blur(10px) saturate(160%);
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
                color: #fff;
              }

              div:nth-child(2) {
                margin-top: 8px;
                font-size: 13px;
                color: #fff;
              }
            }
          }

          &-r {
            padding-right: 8px;
          }
        }
      }
    }

    .chongzhiList {
      margin-top: 10px;
      //display: flex;
      //flex-wrap: wrap;
      .chongzhiList-item {
        margin-bottom: 10px;
        margin-right: 10px;
        display: flex;
        border-radius: 15px;
        align-items: center;
        background-color: #f5f5f5;
        padding: 10px 14px;

        img {
          width: 22px;
          height: 22px;
        }

        span {
          padding-left: 8px;
          font-size: 14px;
        }

        &.active {
          color: #fff;
          background-color: #ff896d;
        }
      }
    }
  }
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: 200px;
  }
}

.fangshi-box {
  background-color: #3b82f2;
  margin: 10px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 20px;

  img {
    margin-right: 10px;
    width: 25px;
  }
}

.jine-box {
  background-color: #3b82f2;
  margin: 10px 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: #fff;

  .jine-item {
    background-color: #3b82f2;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    font-size: 16px;
    border-radius: 10px;

    &.active {
      background-image: linear-gradient(to right, #fb5b4b, #9c38e5);
    }
  }
}
</style>
