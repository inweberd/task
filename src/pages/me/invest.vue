<template>
  <div class="investClass">
    <!--    <div :style="containerStyle" style="background-color: #fff; width: 100%"></div>-->
    <!--    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />-->
    <Loading v-if="loading" />
    <!--    <div class="title" style="color: #b4a482; font-size: 22px">会员权益卡</div>-->
    <!--    <van-image :src="imageSrc1" width="100%" height="280" fit="fill"></van-image>-->

    <!--    <div class="alarmList-child">-->
    <!--      <div class="alarm-item" v-for="(item, index) in alarmList" :key="index">-->
    <!--        <div class="phone">{{ item.phone }}</div>-->
    <!--        <div class="type">会员权益</div>-->
    <!--        <div class="money">获取佣金{{ item.money }}元</div>-->
    <!--        &lt;!&ndash;        <div class="datetime">{{ item.datetime }}</div>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">-->
    <!--      <van-swipe-item>1</van-swipe-item>-->
    <!--      <van-swipe-item>2</van-swipe-item>-->
    <!--      <van-swipe-item>3</van-swipe-item>-->
    <!--      <van-swipe-item>4</van-swipe-item>-->
    <!--    </van-swipe>-->
    <!--    <div class="black-tip">-->
    <!--      <div>-->
    <!--        <div>开通不同等级会员， <span class="active"> 收益永久叠加</span> 生效 ！</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-if="false">
      <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item>
          <img alt="" src="@/pages/home/images/banner9.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img alt="" src="@/pages/home/images/banner10.jpg" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="top-box">
      <div style="align-items: center">
        <div class="avatar" @click="renzheng(userInfo.avatar)">
          <img :src="userInfo.avatar || defaultAvatar" />
        </div>
        <div class="name">
          <template v-if="userInfo.nickname"> {{ userInfo.nickname }}</template>
          <template v-else>
            {{
              userInfo.phone
                ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
                : ''
            }}
          </template>
        </div>
        <span class="vip-info">{{ userInfo?.result?.staff?.name || '暂无加速卡' }}</span>
      </div>
      <div
        style="
          margin-top: 50px;
          padding-right: 15px;
          box-sizing: border-box;
          text-align: center;
          width: 100%;
        "
      >
        当前可免费兑换会员余额
        <br />
        <span style="font-size: 22px">{{ userIncomeInfo?.wallet?.money || 0 }}</span>
        <div style="margin-top: 15px"></div>
        当前充值余额
        <br />
        <span style="font-size: 22px">{{ walletInfo?.amount || 0 }}</span>
        <p style="margin-top: 5px">以上两种余额可用于购买会员抵扣使用</p>
      </div>
    </div>

    <div class="v-list-box">
      <div class="v-list">
        <div
          v-for="(item, index) of staffList"
          :class="{ active: activeIndex === index, has: myStaffList.includes(item.id) }"
          class="v-list-item"
          @click="activeIndex = index"
        >
          <template v-if="item.serial === 0">
            <img alt="" src="./images/v0.png" />
          </template>
          <template v-else-if="item.serial === 1">
            <img alt="" src="./images/v1.png" />
          </template>
          <template v-else-if="item.serial === 2">
            <img alt="" src="./images/v2.png" />
          </template>
          <template v-else-if="item.serial === 3">
            <img alt="" src="./images/v3.png" />
          </template>
          <template v-else-if="item.serial === 4">
            <img alt="" src="./images/v4.png" />
          </template>
          <template v-else-if="item.serial === 5">
            <img alt="" src="./images/v5.png" />
          </template>
          <template v-else-if="item.serial === 6">
            <img alt="" src="./images/v6.png" />
          </template>
          <div>{{ item.name }}</div>
          <div><span class="fuhao">￥</span>{{ item.price }}</div>
          <div style="font-size: 12px; text-align: center">
            <span v-if="item.serial === 0">
              <div>30天有效期</div>
              <div>到期续费</div>
            </span>
            <span v-else>永久循环收益</span>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center; font-size: 20px">
      <div>注意：你的推广佣金，余额所有收入</div>
      <div style="color: #ff3826; font-weight: bolder">都可以免费兑换会员</div>
    </div>
    <van-button
      block
      color=" linear-gradient(to right, #fb5b4b, #9c38e5)"
      round
      style="margin: 20px auto; width: 90%; height: 40px"
      type="danger"
      @click="buy"
    >
      开通加速卡
    </van-button>
    <van-image :src="vipInfo" width="100%"></van-image>

    <!--    <div class="tip">-->
    <!--      <p>用户成为”短视频创作者合伙人"，投资平台精选的优质短广告商进行广告投放，</p>-->
    <!--      <p>按比享受创作者和广告商的商业收益(广告+电商+打赏)，平台中间赚取服务费。</p>-->
    <!--      <p>【视频掘金计划:五档会员加速器，投得多赚得多!】</p>-->
    <!--      <p>会员收益逻辑图解:</p>-->
    <!--      <p style="color: #fff; font-weight: bolder">你的「刷视频收益」可自由选择加速档位</p>-->
    <!--      <p>投入越多，广告分成权重越高，每日收益越多!</p>-->
    <!--      <p>五档黄金会员权益(会员费全额用于广告合作)</p>-->
    <!--      <p>会员收益逻辑图解:</p>-->
    <!--      <p>你的投资 - 注入平台广告合作资金池 → 吸引更多品牌投放 →</p>-->
    <!--      <p>广告总收益按比例分配 →(投入越多→ 占股比例越高一每日产生广告投放收益分钱!)</p>-->
    <!--      <p>广告总收益分配比例：2%-0.5%每日根据热门程度逐渐衰减。</p>-->
    <!--      <p>每轮广告20天收益周期，到期全额返还到账户余额，</p>-->
    <!--      <p>返还余额可以继续用来购买会员，继续产生收益相当于一次购买，永久有效！</p>-->
    <!--      <p>档位专属特权(以黑金会员为例)</p>-->
    <!--    </div>-->

    <p
      v-if="false"
      style="
        color: #000;
        padding-left: 15px;
        font-size: 18px;
        font-weight: bolder;
        margin-top: 254px;
      "
    >
      <!--      说明：每份会员有效期30天-->
      温馨提示： 每张会员卡可以使用365天！
    </p>
    <div v-if="false" style="color: #222; padding-left: 15px; font-size: 14px; font-weight: bolder">
      <!--      可重复购买，达到数量后，系统将自动为您提升等级，享受更高收益！-->
      <p></p>
      <p style="color: red">当天同时购买不同等级会员卡，收益可叠加同时生效！</p>
      <p style="color: red">中途加购升级不同等级会员卡，收益也可叠加同时生效！</p>
      <p style="color: red">每个档位会员，都可以重复购买，收入无限叠加，无上限！</p>
      <p style="margin-top: 6px; font-size: 16px; padding-right: 6px">
        首次注册使用JD钱包单笔充值1000元赠送100，充5000赠送200元！
      </p>
      <p style="margin-top: 6px; font-size: 16px; padding-right: 6px">
        首次注册使用365钱包注册送58元，单笔充值400赠送58元！
      </p>
    </div>
    <!--    <div class="container">-->
    <!--      <div class="list">-->
    <!--        <div class="list-item active">-->
    <!--          <p>普通会员</p>-->
    <!--          <p>100</p>-->
    <!--          <p>30天分红期限</p>-->
    <!--        </div>-->
    <!--        <div class="list-item">-->
    <!--          <p>普通会员</p>-->
    <!--          <p>100</p>-->
    <!--          <p>30天分红期限</p>-->
    <!--        </div>-->
    <!--        <div class="list-item">-->
    <!--          <p>普通会员</p>-->
    <!--          <p>100</p>-->
    <!--          <p>30天分红期限</p>-->
    <!--        </div>-->
    <!--        <div class="list-item">-->
    <!--          <p>普通会员</p>-->
    <!--          <p>100</p>-->
    <!--          <p>30天分红期限</p>-->
    <!--        </div>-->
    <!--        <div class="list-item">-->
    <!--          <p>普通会员</p>-->
    <!--          <p>100</p>-->
    <!--          <p>30天分红期限</p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-if="false" class="viplist-box">
      <div class="list">
        <div
          v-if="false"
          class="list-item"
          style="background-image: linear-gradient(135deg, #ff7e30 10%, #ff7e30 100%)"
        >
          <div class="title" style="color: #fff">铜卡会员（50元）</div>
          <p style="color: #000">每种会员都可以重复购买，收益叠加生效</p>
          <div class="content">
            <div class="l" style="color: #fff">
              <div>
                <p>日收益</p>
                <p>1元</p>
              </div>
              <div>
                <p>年收益</p>
                <p>365元</p>
              </div>
            </div>
            <div class="r">
              <el-button
                class="w-100"
                color="#fff"
                size="large"
                style="
                  border: none;
                  border-radius: 15px;
                  color: #ff6491;
                  font-weight: bolder;
                  padding: 4px 8px;
                  margin-right: 4px;
                "
                type="primary"
                @click="buyBase"
                >0撸余额 <br />免费兑换
              </el-button>
              <span></span>
              <el-button
                class="w-100"
                color="#fff"
                size="large"
                style="border: none; border-radius: 15px; color: #ff6491; font-weight: bolder"
                type="primary"
                @click="buyBase"
                >购买
              </el-button>
            </div>
          </div>
        </div>
        <div
          v-for="item of vipList"
          :style="{
            backgroundImage: item.bgColor
          }"
          class="list-item"
        >
          <div :style="{ color: item.color }" class="title">
            {{ item.name }}（{{ item.count * 100 }}元）
          </div>
          <p style="color: #000">每种会员都可以重复购买，收益叠加生效</p>
          <div class="content">
            <div :style="{ color: item.color }" class="l">
              <div>
                <p>日收益</p>
                <p>{{ item.count * 2.5 }}元</p>
              </div>
              <div>
                <p>年收益</p>
                <p>{{ item.count * 2.5 * 365 }}元</p>
              </div>
            </div>
            <div class="r">
              <el-button
                class="w-100"
                color="#fff"
                size="large"
                style="
                  border: none;
                  border-radius: 15px;
                  color: #ff6491;
                  font-weight: bolder;
                  padding: 4px 8px;
                  margin-right: 4px;
                "
                type="primary"
                @click="buy(item, item.count)"
                >0撸余额 <br />免费兑换
              </el-button>
              <span></span>
              <el-button
                class="w-100"
                color="#fff"
                size="large"
                style="border: none; border-radius: 15px; color: #ff6491; font-weight: bolder"
                type="primary"
                @click="buy(item, item.count)"
                >购买
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="false" class="announcement">
      <div class="announcement-task flexS">
        <div style="overflow: scroll; width: 100%; box-sizing: border-box; padding: 0 10px">
          <div v-for="(item, index) of shopList" class="item">
            <div style="width: 100%; padding: 10px">
              <div>
                <div class="txt">
                  <!--                  {{ item.name }}-->
                  正式股权
                  <!--                  {{ getSerialName(item.serial) }}-->
                </div>
                <div class="txt">每天可分红</div>
                <div class="txt">30天总分红</div>
                <div class="txt">有效期</div>
              </div>
              <div>
                <div class="txt">{{ item.price }}元/份</div>
                <div class="txt">{{ shouyiArrDay[index] * count }}元</div>
                <div class="txt">{{ shouyiArrDay[index] * youxiaoArr[index] * count }}元</div>
                <div class="txt">{{ youxiaoArr[index] }}天</div>
              </div>
              <div style="margin: 10px">
                <span style="padding-left: 10px">拥有多份股权，可同时叠加生效</span>
              </div>
              <van-stepper
                v-model="count"
                button-size="22"
                disable-input
                style="margin-top: 10px"
                theme="round"
              />
              份
              <div
                style="
                  background: #01c5f0;
                  color: #fff;
                  width: 100px;
                  margin: 15px auto;
                  font-weight: bold;
                  padding: 6px 0;
                  border-radius: 15px;
                "
                @click="buy(item)"
              >
                <!--                <span style="font-size: 16px" v-if="myStaffList.includes(item.id)">入职成功 </span>-->
                <!--                <span style="font-size: 16px" v-else>未入职</span>-->
                <span style="font-size: 16px">购买股权</span>
              </div>
            </div>
          </div>
          <div v-for="(item, index) of shopList" class="item" style="margin-top: 20px">
            <div style="width: 100%; padding: 10px">
              <div>
                <div class="txt">
                  <!--                  {{ item.name }}-->
                  正式股权
                  <!--                  {{ getSerialName(item.serial) }}-->
                </div>
                <div class="txt">每天可分红</div>
                <div class="txt">30天总分红</div>
                <div class="txt">有效期</div>
              </div>
              <div>
                <div class="txt">500元/份</div>
                <div class="txt">25元</div>
                <div class="txt">750元</div>
                <div class="txt">{{ youxiaoArr[index] }}天</div>
              </div>
              <div style="margin: 10px">
                <span style="padding-left: 10px">拥有多份股权，可同时叠加生效</span>
              </div>

              <div
                style="
                  background: #01c5f0;
                  color: #fff;
                  width: 100px;
                  margin: 15px auto;
                  font-weight: bold;
                  padding: 6px 0;
                  border-radius: 15px;
                "
                @click="buy(item, 5)"
              >
                <!--                <span style="font-size: 16px" v-if="myStaffList.includes(item.id)">入职成功 </span>-->
                <!--                <span style="font-size: 16px" v-else>未入职</span>-->
                <span style="font-size: 16px">购买股权</span>
              </div>
            </div>
          </div>
          <div v-for="(item, index) of shopList" class="item" style="margin-top: 20px">
            <div style="width: 100%; padding: 10px">
              <div>
                <div class="txt">
                  <!--                  {{ item.name }}-->
                  正式股权
                  <!--                  {{ getSerialName(item.serial) }}-->
                </div>
                <div class="txt">每天可分红</div>
                <div class="txt">30天总分红</div>
                <div class="txt">有效期</div>
              </div>
              <div>
                <div class="txt">2000元/份</div>
                <div class="txt">100元</div>
                <div class="txt">3000元</div>
                <div class="txt">{{ youxiaoArr[index] }}天</div>
              </div>
              <div style="margin: 10px">
                <span style="padding-left: 10px">拥有多份股权，可同时叠加生效</span>
              </div>

              <div
                style="
                  background: #01c5f0;
                  color: #fff;
                  width: 100px;
                  margin: 15px auto;
                  font-weight: bold;
                  padding: 6px 0;
                  border-radius: 15px;
                "
                @click="buy(item, 20)"
              >
                <!--                <span style="font-size: 16px" v-if="myStaffList.includes(item.id)">入职成功 </span>-->
                <!--                <span style="font-size: 16px" v-else>未入职</span>-->
                <span style="font-size: 16px">购买股权</span>
              </div>
            </div>
          </div>
          <div v-for="(item, index) of shopList" class="item" style="margin-top: 20px">
            <div style="width: 100%; padding: 10px">
              <div>
                <div class="txt">
                  <!--                  {{ item.name }}-->
                  正式股权
                  <!--                  {{ getSerialName(item.serial) }}-->
                </div>
                <div class="txt">每天可分红</div>
                <div class="txt">30天总分红</div>
                <div class="txt">有效期</div>
              </div>
              <div>
                <div class="txt">5000元/份</div>
                <div class="txt">250元</div>
                <div class="txt">7500元</div>
                <div class="txt">{{ youxiaoArr[index] }}天</div>
              </div>
              <div style="margin: 10px">
                <span style="padding-left: 10px">拥有多份股权，可同时叠加生效</span>
              </div>

              <div
                style="
                  background: #01c5f0;
                  color: #fff;
                  width: 100px;
                  margin: 15px auto;
                  font-weight: bold;
                  padding: 6px 0;
                  border-radius: 15px;
                "
                @click="buy(item, 50)"
              >
                <!--                <span style="font-size: 16px" v-if="myStaffList.includes(item.id)">入职成功 </span>-->
                <!--                <span style="font-size: 16px" v-else>未入职</span>-->
                <span style="font-size: 16px">购买股权</span>
              </div>
            </div>
          </div>
          <!--          <van-image :src="imageSrc5" width="100%" height="240" fit="fill"></van-image>-->

          <!--          <div-->
          <!--            style="-->
          <!--              margin: 10px;-->
          <!--              background-color: rgba(70, 89, 101, 0.7);-->
          <!--              border-radius: 10px;-->
          <!--              padding: 6px;-->
          <!--              color: #fff;-->
          <!--              line-height: 1.6;-->
          <!--              text-align: center;-->
          <!--            "-->
          <!--          >-->
          <!--            <p>每份股权可持续分红30天</p>-->
          <!--            <p>激活1份股权，每天可得分红5元</p>-->
          <!--            <p>激活10份股权，每天可得分红50元</p>-->
          <!--            <p>到期可续购股权，中途也可加购股权</p>-->
          <!--            <p>下级用户每次续购股权或者中途加购股权</p>-->
          <!--            <p>直属上级依旧可以获得下属激活奖励</p>-->
          <!--          </div>-->
          <!--          <p style="text-align: center; margin-top: 10px">-->
          <!--            当前拥有员工卡数量：{{ myStaffList?.length || 0 }}张-->
          <!--          </p>-->
          <!--          <p style="text-align: center; margin-top: 10px">-->
          <!--            同时拥有多张员工卡，<span style="color: #0a53be">收益同时叠加生效。</span>-->
          <!--          </p>-->
          <!--          <div style="margin-top: 10px"></div>-->
          <!--          <p style="text-align: center">-->
          <!--            1张VIP卡 每天刷<span style="color: #0a53be">30个高价视频得8元</span>-->
          <!--          </p>-->
          <!--          <p style="text-align: center; margin-bottom: 10px">-->
          <!--            VIP用户每天刷完高价视频，还可以继续去刷普通视频-->
          <!--          </p>-->
          <!--          <p style="text-align: center">-->
          <!--            一次性购买10张VIP卡可享受<span style="color: #0a53be">9.8折优惠</span>（联系群管理）-->
          <!--          </p>-->
          <!--          <p style="text-align: center">-->
          <!--            一次性购买50张VIP卡可享受<span style="color: #0a53be">9.5折优惠</span>（联系群管理）-->
          <!--          </p>-->
          <!--          <p style="text-align: center">-->
          <!--            一次性购买100张VIP卡可享受<span style="color: #0a53be">9折优惠</span> （联系群管理）-->
          <!--          </p>-->
        </div>
      </div>
    </div>
    <!--    <p style="text-align: center; color: #888; width: 100%">京ICP备12025439号</p>-->

    <!--    <p style="text-align: center; color: #888; width: 100%">京ICP备12025439号</p>-->
  </div>

  <!--  <p style="text-align: center; color: #888; width: 100%; position: fixed; bottom: 60px">-->
  <!--    京ICP备12025439号-->
  <!--  </p>-->
  <BaseFooter :is-white="false" v-bind:init-tab="5" />
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted, computed, onActivated } from 'vue'
import {
  reqAllStaff,
  reqCreateShareLog,
  reqEnterStaff,
  reqMyStaff,
  reqRecordTask,
  reqTaskMoney,
  reqUserIncome,
  reqUserStaff,
  reqWalletInfo
} from '@/api/myApi.js'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import BaseFooter from '@/components/BaseFooter.vue'
import defaultAvatar from '@/assets/img/logo.png'
import { getSerialName } from '../../utils/getSerialName'
import shareholder from '@/assets/img/jiangliguize.jpg'
import v0 from './images/v0.png'
import v1 from './images/v1.png'
import v2 from './images/v2.png'
import v3 from './images/v3.png'
import v4 from './images/v4.png'
import v5 from './images/v5.png'
import v6 from './images/v6.png'

import vipInfo from './images/vip-info.jpg'
import { showImagePreview } from 'vant'
import bus from '@/utils/bus'
import { getIsVip } from '@/utils/getIsVip'

const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
defineOptions({
  name: 'invest'
})
const showImage = () => {
  showImagePreview([vipInfo])
}
const activeIndex = ref(0)
const containerStyle = computed(() => {
  if (window.android && !window.android.hideBar) {
    return { height: '40px' }
  } else {
    return {}
  }
})

const count = ref(1)
const userIncomeInfo = ref({})
const shouyiArrDay = [5, 20, 40, 80, 120, 160, 200, 400]
const youxiaoArr = [30, 45, 45, 45, 45, 45, 45, 45]
const daxieArr = ['', '一', '二', '三', '四', '五', '六', '七']

const shopList = ref([
  {
    icon: 'pdd'
  }
  // {
  //   icon: 'pdd'
  // },
  // {
  //   icon: 'tb'
  // },
  // {
  //   icon: 'tm'
  // },
  // {
  //   icon: 'jd'
  // },
  // {
  //   icon: 'ymx'
  // },
  // {
  //   icon: 'dd'
  // },
  // {
  //   icon: 'dd'
  // }
])

const vipList = [
  {
    name: '铜卡会员',
    count: 1,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #DEC3BA 10%, #DEC3BA 100%)',
    // color: '#66380F'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  },
  {
    name: '铜卡会员',
    count: 2,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #DEC3BA 10%, #DEC3BA 100%)',
    // color: '#66380F'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  },
  {
    name: '铜卡会员',
    count: 3,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #DEC3BA 10%, #DEC3BA 100%)',
    // color: '#66380F'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  },
  {
    name: '银卡会员',
    count: 5,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #E5E4E2 10%, #E5E4E2 100%)',
    // color: '#000'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  },
  {
    name: '黄金卡会员',
    count: 10,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #FFD700 10%, #FFD700 100%)',
    // color: '#000'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  },
  {
    name: '白金卡会员',
    count: 30,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #FE698C 10%, #FE698C 100%)',
    // color: '#fff'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  },
  {
    name: '钻石卡会员',
    count: 50,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #B9F2FF 10%, #B9F2FF 100%)',
    // color: '#000'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  },
  {
    name: '黑卡会员',
    count: 100,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #000000 10%, #000000 100%)',
    // color: '#FEC35F'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  },
  {
    name: '至尊会员',
    count: 200,
    // bgColor: 'linear-gradient(135deg, #ff4e9a 10%, #ffc161 100%)',
    // bgColor: 'linear-gradient( 135deg, #6A0DAD 10%, #6A0DAD  100%)',
    // color: '#FEC35F'
    bgColor: 'linear-gradient( 135deg, #FF7E30 10%, #FF7E30 100%)',
    color: '#fff'
  }
]

const loading = ref(false)
const loadingBtn = ref(false)
const staffList = ref([])
const myStaffList = ref([])
const searchInfo = reactive({
  page: 1,
  limit: 20,
  order: 'serial asc'
})
const router = useRouter()
const getRandom = () => {
  return Math.floor(Math.random() * 300) + 1500
}
const getAllStaff = () => {
  loading.value = true

  reqAllStaff(searchInfo).then((res: any) => {
    staffList.value = res.data.data
    loading.value = false
    // res.data.data.forEach((item, index) => {
    //   for (const itemKey in item) {
    //     if (shopList.value[index]) {
    //       shopList.value[index][itemKey] = item[itemKey]
    //     }
    //   }
    // })

    console.log('staffList', staffList.value)
    // getMyStaff()
  })
}
const getIconPath = (icon) => {
  return new URL(`../../assets/img/shop/${icon}.png`, import.meta.url).href
}
const buyBase = (item, customCount) => {
  const finallyCount = customCount || count.value

  loading.value = true
  loading.value = true
  reqWalletInfo().then((res: any) => {
    console.log('reqWalletInfo', res)
    loading.value = false

    // if (item.price * finallyCount > res.data.amount + res.data.money) {
    if (50 > res.data.amount + res.data.money) {
      loading.value = false
      _notice('账户余额不足,请充值!')
      router.push('/recharge')
    } else {
      reqEnterStaff({
        count: 1,
        staff_id: 165
        // staff_id: item.id
      }).then((sub_res) => {
        loading.value = false
        _notice(sub_res.msg)
        if (res.code === 200) {
          getMyStaff()
        }
      })
    }
  })
}
const buy = () => {
  const item = staffList.value[activeIndex.value]
  console.log('item', item)
  // const finallyCount = customCount || count.value
  if (myStaffList.value.includes(item.id)) {
    showToast({
      message: '您已拥有此特权！',
      icon: 'warning'
    })
    return
  }

  if (userInfo.value.result.staff.id == 0 && item.serial != 0) {
    return showToast({
      message: '请逐级开通！',
      icon: 'warning'
    })
  }
  if (
    userInfo.value.result.staff.serial + 1 != item.serial &&
    userInfo.value.result.staff.id !== 0
  ) {
    if (item.serial !== 0) {
      return showToast({
        message: '请逐级开通！',
        icon: 'warning'
      })
    }
  }

  loading.value = true
  reqWalletInfo().then((res: any) => {
    loading.value = false

    // if (item.price * finallyCount > res.data.amount + res.data.money) {
    if (item.price > res.data.amount + res.data.money) {
      loading.value = false
      _notice('账户余额不足,请充值!')
      router.push('/recharge')
    } else {
      reqEnterStaff({
        staff_id: item.id
        // staff_id: item.id
      }).then((sub_res) => {
        loading.value = false
        _notice(sub_res.msg)
        if (res.code === 200) {
          getMyStaff()
        }
      })
    }
  })
}
const getUserIncome = () => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
    loadingBtn.value = false
  })
}

const getRedBag = () => {
  if (!userInfo.value?.result?.staff?.serial) {
    return showDialog({
      message: '请先购买服务器！'
    })
  }
  loadingBtn.value = true
  reqRecordTask().then((res) => {
    loadingBtn.value = false
    if (res.code === 412) {
      showConfirmDialog({
        message: '请先进行每日分享！',
        confirmButtonText: '点我分享微信朋友圈'
      }).then(() => {
        if (window.webkit?.messageHandlers) {
          localStorage.isShare = dayjs().format('YYYY-MM-DD')
          reqCreateShareLog().then((res) => {
            console.log('reqCreateShareLog', res)
          })
        }

        window.shareFriend()
      })
      return
    }

    if (res.code === 200) {
      getUserIncome()
    }
    router.push('/serveInfo')
  })
}
const getMyStaff = () => {
  reqMyStaff().then((res) => {
    loading.value = false

    myStaffList.value = res.data.map((item) => item.staff_id)
    console.log('staffList', staffList.value)
    if (res.data.length) {
      res.data.sort((a, b) => a.result.staff.serial - b.result.staff.serial)
      userInfo.value.result.staff = res.data[res.data.length - 1].result.staff
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    }
  })
}

const walletInfo = ref({ credit: 0 })
const getUserInfo = () => {
  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
  })
}
onMounted(() => {
  getAllStaff()
  getMyStaff()
  getUserInfo()
  // getUserIncome()
})

const getMoble = () => {
  var prefixArray = ['130', '131', '132', '133', '135', '137', '138', '170', '187', '189']
  var i = parseInt(10 * Math.random())
  var prefix = prefixArray[i]
  for (var j = 0; j < 8; j++) {
    if (j < 4) {
      prefix = prefix + '*'
    } else {
      prefix = prefix + Math.floor(Math.random() * 10)
    }
  }
  return prefix
}

const getDatetime = () => {
  return dayjs().format('HH:mm:ss')
}

const alarmList = ref([])

for (let i = 0; i < 6; i++) {
  alarmList.value.push({
    phone: getMoble(),
    money: (Math.random() * (500 - 15) + 15).toFixed(2),
    datetime: getDatetime()
    // type: [
    //   '黑铁权益卡',
    //   '青铜权益卡',
    //   '白银权益卡',
    //   '黄金权益卡',
    //   '白金权益卡',
    //   '钻石权益卡',
    //   '黑钻权益卡'
    // ][Math.floor()]
  })
}
const timer = ref()
const timerfir = ref()
const timerfir2 = ref()
const scrollY = ref(20) //滚动距离
const speed = ref(0.5) //滚动速度
</script>

<style lang="less" scoped>
.investClass {
  overflow-y: auto;
  //background-color: #fff;
  width: 100%;
  height: calc(100% - 65px);
  color: #fff;
  padding-bottom: 120px;

  .top-box {
    display: flex;
    align-items: center;
    height: 220px;
    background-image: url('./images/vip-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 220px;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      //align-items: center;
      flex: 1;
    }

    .avatar {
      margin: 50px auto 0;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      text-align: center;
      color: #fff;
      font-size: 16px;
      margin: 10px 0;
    }

    .vip-info {
      width: fit-content;
      color: #ccc;
      padding: 2px 10px;
      border: 1px solid #ccc;
      border-radius: 20px;
      font-size: 14px;
    }
  }

  .v-list-box {
    margin-top: 10px;
    width: 100%;

    .v-list {
      overflow-x: auto;
      display: flex;
      flex-wrap: nowrap;
      //display: flex;
      margin: 0 auto;

      .v-list-item {
        flex: 0 0 auto;

        width: 110px;
        float: left;
        margin: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 15px 0;

        background-color: #eeeeee;
        color: #616161;

        img {
          width: 40%;
          margin-bottom: 15px;
        }

        .fuhao {
          font-size: 14px;
        }

        & > div {
          color: #000;

          &:nth-of-type(1) {
            font-size: 14px;
            font-weight: bolder;
          }

          &:nth-of-type(2) {
            font-size: 22px;
            opacity: 0.8;
            padding: 5px 0;
          }

          &:nth-of-type(3) {
            font-size: 14px;
            opacity: 0.8;
          }
        }

        &.active {
          color: #fff;
          //background-color: #fdd4d5;
          background-image: linear-gradient(to right, #fb5b4b, #9c38e5);

          & > div {
            color: #fff;
          }
        }

        &.has {
          position: relative;
          overflow: hidden;

          &.active {
            &:before {
              color: red;
              background-color: #ccc;
            }
          }

          &:before {
            position: absolute;
            top: 8px;
            left: -18px;
            width: 74px;
            height: 20px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            background-color: #ff5722;
            content: '已拥有';
            transform: rotate(-45deg);
          }
        }
      }
    }
  }

  .tip {
    color: #ccc;
    padding: 0 20px;
    font-size: 14px;
    line-height: 22px;
  }

  .container {
    overflow-x: auto;

    .list {
      padding: 10px;
      width: 800px;

      .list-item {
        float: left;
        margin-right: 10px;
        width: 130px;
        height: 100px;
        background-color: #eee;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        color: #000;

        &.active {
          background-color: #ff816a;
          color: #fff;
        }
      }
    }
  }

  .viplist-box {
    padding: 0 10px;

    .list {
      .list-item {
        width: 100%;
        border-radius: 20px;
        margin-top: 10px;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;

        .title {
          color: #fff;
          font-size: 22px;
          font-weight: bolder;
          display: flex;
        }

        .content {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;

          .l {
            font-size: 16px;
            color: #eee;
            display: flex;

            div:nth-child(2) {
              margin-left: 20px;
            }
          }

          .r {
            //display: flex;
            //flex-direction: column;
          }
        }
      }
    }
  }
}

.fixed-back {
  position: fixed;
  left: 10px;
  top: 48px;
  z-index: 3;
}

.item {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}

.staff-list {
  color: #fff;
}

.staff-item {
  background: url('./images/vip-bg.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 200px;
  font-size: 14px;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;

  .img {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 10px;
    width: 80px;
    height: 80px;
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .tip {
    position: absolute;
    bottom: 53px;
    left: 60px;
    color: #000;
    font-size: 16px;
  }

  .name {
    text-indent: 10px;
    font-weight: bolder;
    font-size: 24px;
    line-height: 40px;
    color: #fff;
  }

  .name-price {
    font-size: 22px;
    text-indent: 10px;
    font-weight: bolder;
    line-height: 40px;
    color: #4a4bf3;
  }

  .price {
    position: relative;
    text-indent: 100px;
    border-radius: 10px 10px 0 0;
    line-height: 50px;
    background-image: linear-gradient(90deg, #82718b 10%, #6a586b 100%);

    .money {
      font-size: 18px;
      font-weight: bolder;
    }

    .arrow {
      position: absolute;
      right: 10px;
      top: 15px;
    }
  }

  .info {
    border-radius: 0 0 10px 10px;
    padding: 10px;
    background-image: linear-gradient(90deg, #514154 10%, #3d313f 100%);
    display: grid;
    grid-template-columns: 1fr 1fr;

    .info-item {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      line-height: 30px;

      .status {
        color: #7889ef;
        font-weight: bolder;
      }
    }
  }

  .buy-btn {
    text-align: center;
    position: absolute;
    right: 0;
    top: 0px;
    border-radius: 10px;
  }
}

.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #5d5e5f;
  }
}

.announcement {
  .announcement-task {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .item {
      margin-top: 10px;
      text-align: center;
      color: #fff;
      display: flex;
      background-image: url('./images/invest-bg.png');
      background-size: 100% 100%;
      width: 100%;
      border-radius: 10px;

      .txt {
        display: inline-block;
        width: 25%;
        white-space: nowrap;
        text-align: center;
        color: #fff;
        font-weight: bold;
      }
    }
  }
}

.alarmList-child {
  margin-top: 20px;
  height: 120px;
  overflow: hidden;
  color: #ae9f7e;
  position: relative;

  .alarm-item {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;

    & > div {
      text-align: center;
    }

    .phone {
      width: 120px;
      text-align: center;
    }

    .type {
      width: 100px;
      text-align: center;
    }

    .money {
      flex: 1;
      color: #e2511d;
    }

    .datetime {
      width: 120px;
    }
  }
}

.black-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #302e2e;
  font-weight: bold;
  font-size: 18px;
  white-space: nowrap;
  width: 100%;
  height: 60px;
  background-size: 100% 100%;

  .active {
    color: red;
  }

  & > div {
    text-align: center;
    line-height: 25px;
  }
}

:deep(.van-stepper--round) {
  .van-stepper__input {
    color: #eee;
  }

  .van-stepper__plus,
  .van-stepper__minus {
    background-color: #fff !important;
    color: #333;
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
</style>
