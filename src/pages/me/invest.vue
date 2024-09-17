<template>
  <div style="background-color: #322c36; padding: 40px 0px 50px; overflow-y: auto">
    <!--    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />-->
    <Loading v-if="loading" />
    <div class="title" style="color: #b4a482; font-size: 22px">会员权益卡</div>
    <div class="alarmList-child">
      <div class="alarm-item" v-for="(item, index) in alarmList" :key="index">
        <div class="phone">{{ item.phone }}</div>
        <div class="type">会员权益</div>
        <div class="money">获取佣金{{ item.money }}元</div>
        <!--        <div class="datetime">{{ item.datetime }}</div>-->
      </div>
    </div>
    <!--    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">-->
    <!--      <van-swipe-item>1</van-swipe-item>-->
    <!--      <van-swipe-item>2</van-swipe-item>-->
    <!--      <van-swipe-item>3</van-swipe-item>-->
    <!--      <van-swipe-item>4</van-swipe-item>-->
    <!--    </van-swipe>-->
    <div class="announcement">
      <div class="announcement-task flexS">
        <div data-cid="1" class="a-t-items" v-for="(item, index) of shopList" @click="buy(item)">
          <div class="a-t-text">
            <div class="a-t-t-3">
              <div class="a-t-title" style="width: 90%; left: 0; color: #b4a482; margin-left: 5%">
                <img v-if="item.vipIcon" :src="item.vipIcon" alt="" style="float: right" />
                <div
                  style="
                    float: right;
                    background-color: #6f7594;
                    border-radius: 10px;
                    padding: 4px 6px;
                    color: #fff;
                  "
                  v-else
                >
                  {{ item.vipTxt }}
                </div>
                <b>{{ item.name }} </b><br />
              </div>
              <div
                class="jiage"
                style="position: absolute; right: 85px; top: 4px; color: #fff; font-size: 18px"
              >
                ￥{{ item.price }}
              </div>
              <div
                class="info"
                style="position: absolute; left: 5px; bottom: 4px; color: #fff; font-size: 12px"
              >
                <!--                会员周期:45天，预估总收益:：{{ item.unit_price }}元-->
                会员周期:45天，预估总收益:：{{ shouyiArr[index] }}元
              </div>
              <img :src="getIconPath(item.icon)" alt="" style="height: 130px; width: 100%" />
              <div class="introduce" v-if="myStaffList.includes(item.serial)">
                <span style="font-size: 16px">已开通</span>
              </div>
              <!--              <div class="a-t-t-3-1" v-if="!myStaffList.includes(item.serial)" @click="buy(item)">-->
              <!--                <img-->
              <!--                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABOElEQVR4AWJwLwC0X4YgDsNQGBb1th7qTbyrjVcznYutrReT593k3HlVr+uph3hi3v3iiVAybnvlhXe3/PBBGfvJ1/C2Nt40p8pE1AEP7mADkdn4Mw+66oIsN7LIb9nAWE2Q5QJI9HoSmNUFWe5SENjBDVzBxNel3Q1qgiw3gHTcGdA9mc9Q+L7TFHwcFvMvzmou+a0iSET9YaGvN7o3kGfQEJxAnv7EzQUNwXwXNsGPa813X0PwLp2jwvw+5ILyBVRusAk2QdOC/P81Mitx+Hp8i+f9XiTILwWJ9JPARSK4U73sEsGq+QuCTTCBlUnWBCNwWdeBaElwKfQXS4K+0PeWBEOhP1sS3MGQdQdTM8hZj6/3/0qwCXIW5iMedU2wCcaKflEiOFcUnKWnOgcmcFViAk5wqrPDD70w94OpiilXAAAAAElFTkSuQmCC"-->
              <!--                  alt=""-->
              <!--                />-->
              <!--                <div class="a-t-t-3-text">点击解锁</div>-->
              <!--              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="false" style="background-color: #332d37">
      <div v-for="(item, index) of staffList" class="staff-list">
        <div class="staff-item">
          <div class="name">{{ item.name }}</div>
          <div class="name-price">￥{{ item.price }}</div>
          <div class="tip">
            {{ myStaffList.includes(item.serial) ? '已开通本级会员' : '你还不是本级会员' }}
          </div>

          <div
            v-if="!myStaffList.includes(item.serial)"
            class="buy-btn"
            style="background-color: #666cf8"
            @click="buy(item)"
          >
            <van-button type="primary" size="small">开通</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseFooter v-bind:init-tab="5" :is-white="false" />
</template>
<script setup lang="ts">
import QRCode from 'qrcode'
import imageSrc from '@/assets/img/hehuoren.png'
import imageSrc1 from '@/assets/img/hehuoren.jpg'
import imageSrc2 from '@/assets/img/hehuoren2.png'
import imageSrc3 from '@/assets/img/goumai.png'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
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
import { closeToast, showFailToast, showLoadingToast, showNotify, showToast } from 'vant'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import { getSerialName } from '@/utils/getSerialName'
import { userinfo } from '@/api/user'
import dayjs from 'dayjs'
import BaseFooter from '@/components/BaseFooter.vue'
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))

defineOptions({
  name: 'invest'
})
const numArr = [50, 250, 500, 1000, 2000, 4000]
const userIncomeInfo = ref({})
const totalSpend = ref(0)
const shouyiArr = [270, 900, 1575, 3015, 4500, 8190, 15075]

const shopList = ref([
  {
    icon: 'pdd',
    vipIcon: '',
    vipTxt: '黑铁会员'
  },
  {
    icon: 'tb',
    vipIcon: '',
    vipTxt: '青铜会员'
  },
  {
    icon: 'tm',
    vipIcon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAkCAMAAABBj89wAAAAM1BMVEW1tbWkpKSkpKT+/v7w8PCpqamurq67u7uysrK2trbGxsbX19fBwcHPz8/j4+Ompqajo6NL/veVAAAAA3RSTlNM6OcrP75FAAADkklEQVR4Xn2X2ZLbMAwEnQC8L/3/1waHKUCHMy6r9GCz1QNa2v18Uu+pJ02RZEnUBMniHJIsH5TT4LPe8kfWN0JJRoiCCIowQuAP+fWXvtayswtBl1dC2QqC2AZCOA0Kfyy+CLwrLAY8DZzCzSCLoQncFX4DuiPk4jvyCqGw5vKAZZSfBqmbgSa7jqIrgOipWEG3tcMvwP87crski+F9favpkWN9qip4gpWkBqeCK8iW9wq/DWwfjdG9Qi/RhlDchOMYURFCeL18M7COEkLzJQFkIkz85lvQCnECTN/RxDPTCGxw7agDVKlIAQNgjFoQvikl6PVPQIRpv/Mw4QzqxZuBJtVGmQBNMhID9GsVIcWYEoAWFIiIOfPh7GhCWpIE6Ax8RQMuqQQoAJOSEHpOnezy4oIqAJbAGKh7gyGMJKlqIG812A4EmDsNYBCgwZQZnxVxQaSllx4igtb0qMgQn7oVyAB5H2mQDRIhua2Iigag8TYGNY2eR1YY7czY/QvAG6BKnoAyZbpIgM5UgLXogN0ViQCZAP0SMeCDGCggbUAxAIW3UfUGa7YYxpkQW+MZwyW6+nHQmyuqzxlMngEnAsRIAAkbBLv/+WeNlKmZALsjGbISFGBRwGBSaxVhqB+v31xGkx80A/IKoXaCxa8BU3QXnQZo30MBTGU1ngGSCrYYM9ySCRAYIBgBLFXgji4GaPc7BpRch8ygM2AyZ0Y1QL0YqSWGvTSx12lwSASgBAUoITGg7BnkwoAEADPHQIhA5526b3JkAQXIb0wxh7yeBl0J5QRksi4MiGHC3I841Bsd6RW91ykAoW2DLbABVQHjjACKAFJjQGodYCihAeo24hMRWG3Gxbw5a5bfgRlI3nZRYUIFSkdAgErnTdcH7h8RKJMATMgVAVqmA2ANx/sMABGnvhSQSwPAxhQccvMupAA7KPcsIpAwZ1BBRc6rn8FGkG9PGp0BE1Ljx8McOt062IA3f01FWqozU0VdLiMsTZoQ3QysIz6mzdjPZkm0BCYFOlq4IH0s7/0fljewMff0ePYrxgEed4rXP7gOb6CE+8NfCR7gCR4iqxvi0NVVgAHjQjgVxOEpEJ4G+rIYhDFqYPfsTXAG+hdYvhs4yuvaCvltwAA9ZCGYgr5+KniKAHaMwIxigxaAN7gLvC6+CZ9e/T7y2/T+/052CoLwAtcpm8HfjyP0R0tpA6IvSd6/Z2AGvP4/n19/hpfx27MAAAAASUVORK5CYII='
  },
  {
    icon: 'jd',
    vipIcon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAkCAMAAABBj89wAAAATlBMVEXxyozzwXLls2vmsmTvumb////99ej++/b227H77NT00Zr448Lvw3z1w27wuV/ttFnrt2bzvmb90oHns2bptGT4yHPntGr8z3z6zHjqr1KDODylAAAABHRSTlP9TOjnFtbSewAAA/1JREFUeF6Fl4tyozoYg92zvt+4Jmnf/0WPrPw4mGW6wnhIMqOvkg1D1Vf+/v5+vFVES1kovVTRVCfq5+cnUz/QPjc9f9N/Xwr+B6E8Bn+NUbXYi/80zQCoPDUAzHF8pluCoj0BRAwJKo5LgqnZ52fz32gs1n1cpV5CEHsBCEL8p04YC6JIofNtBMWGxgQLRl8EfU4gBe0siL1onMfxa4IhwnIqSQ8dMYCmPzW2RN0C6D8S2tAgHP4kFAKmo6DnSMD56xrcL/Ny6kjTf4b/NGsANBD/TnCOULyH+8NHQTR3hNAxEkH/8i5Ie68lRe//HkDCQwjOIMG3cQCImn8wJtRPQRMK4nfngpLtCteKJEHAb8ZgcpzDO8GiS8BHE7Smv55YkHzXl/oZjGsyDuARcER42Pa7MZg5WUmgrLElY1IsqN0Mc/uYOfUEwah9oyMAuOApa/D6LILpFUlHJaGKUmtBuAQA7Kc9OlqD4CIT7M85mKio2BNspwRQsKyIs2OVsPcOvmhKt6KM8xoBWH+ZoRxAZYgdCboCvbdhkSFnLnJLAbB/zUtbZzBBEvF6BmL3qctvWwNsYBAgiAOElqhWUrRRfYJFb+OUQVEfakToDIISRc6b2A8VcZVlhaHQ77ZatTGyg6DktfZd84xzm/cxf4sgEAIEYc1pGezpiUdA4Q7CDtW8i6l9PuRM6jKO9scirwBIAhMxsyJlLB9HDMVUlJ2q1v4iLHED5H3bYkQ3GYAe4ZLgJMudell5B/9sLspIQsC+4YMAmjkPtb4BLwICZDgDgACiApdSdK2ThhICoEIPpXcCiACwJcEnAgE9QYxrNGZd18g1aCPhIjeAdkEjAAUnBdfEuQXYWVE0diOA9k1MQMRdRYwQjCdgAVP8Z21NmqFoXD4B9mD8LoAeQa30JyGlYEKCrAvJy/sFfAmowUQtgGQsN1K7EEJKuNcQNIWYoyLgSNAjrB79WzyT1hYgKdivMUZnPGqLPKPSEIxQfwjWIWkgAP3HgK+zbeGxl0Q9Ae5juBvn+cx7NZQJpSRzUdIQfClngwceAE+WY0EeDBfPAFlm71L8vL+8koul+NCVOHsm8B5ZMluKgQ8KwFJ87lDzDC4PgL4K40vkgoGTl1VXjdH1uZvhiSnPsJ4J2Fn9DYD+40sklUteFs3jYq8PBMZHtL0F3LxESgC+XoAwJqhg1PaY+DdA9pEgxgTtFkYCDBK6O05GoP/AuAJuIxQMSgKQ0ENUUgCB6j6PATgPgGsEqhQMTvQfM/S/vo4JOuM2wTcJD+lo/G+kI7pYEgPg+Mv/FEGRcLuPDoS46yNBFfcqCWh+Qgz+f9TXQGCEXtL4qk1EF+157pyGAB3x5+t/M0/Jc5v4fv4AAAAASUVORK5CYII='
  },
  {
    icon: 'ymx',
    vipIcon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAkCAMAAABBj89wAAAAQlBMVEWil8WXjbj///+Ogq+Wi7mNgauaj7yTh7aHe6zSzeD6+vu+t9Lf2+nv7fOxqciek7+Pg7OglsOQhK2kmsbIwtiBc6UBWpS4AAAAAnRSTlPiTGWxUe0AAAPvSURBVHhejZfZbuswEEPTGe2rt/7/r95ZpKjxDdowjmr4gQckG6R9fD16705kRJ61iZAUMEx9h2+S2fe+d74Lx9/6eoi/EIxbACHgpgAc/kI49t7PLqjjEz32/krwI4IiAl2o9pogdPY/2N8KAD8BrI6EoP6aYVsJhGA6aRa0HfhBgv19RwqgCOI/M6D4WwaoN35Q0Y2gCdbOTLATwfb7of70wk82uHV0W5nsf6zgV0FsjnTgJwl2NyO8R4QhuwrCN+6WL/smwT4StHP4n/l8GWFrWSCOAVoQ+py9EH7bYgFkhgSnAi4omkAZWABKGAW5IAVt/MyvFLbUp8oNsI8NMqScMzMiXDK0VISmQK1QEMldCwro9ZlfMxdIQ3AHTEQBVm4xkl2MsWmAs0J1jo7GQxmy/z7cfOZQEJYBTUknAewrQEc4E0RSizAUuSRKA8WEYCqkuHNB9GqJrY9Ozxo+E+RTlDmBfZMgQnEkcow5txwZYK4EVNemRUG6PC3gCzO5fn4WDY4EU5xAXy8JTiBjEg/AH7ZMAF/JFIbktgZkZrpUeu/R4pHjU1kA43qcTKDrLLqBY4BRwJZra5UEwGfOtYVOlLaorULqiLa9yA6EJpgd7REgxp8AHgFZAN2RMJDi5TE/dfjrOhCRkEvp2ZHVBPOjkGDnDUomRQUIYlOAYX8BHvxSsbtFm2BVBMnauQEDTk2QoyS4IqgEUJMIIIlqsOivmzxKAkeurXlrHQFWBAKoegFRoQRsUBjgF0ARATcHNzkKMAAAbgKEICPPjlrOADk33cDwBvOLx3FFxnNBmyaoUPlH5MMgWpvUGg4FsL8cWpEidAN3A8TqvQC2WngOPOjcAU5EjKkh+yAK4GhQ7UsCkiRQ/3cAvxXIjgG+QQ0biuhhxAMxQ+pEQDsSFLgGQMQETbAA51VeAezLAIdEwk0JEaqfN0YBMRp7AfRYcm9tLDASrN8j2TJCEjHgbK0l4HFa43fjYjwZUf2l1AQABdXI5UKPXQWAmv0IIAnUnxERoMbzJyDCTZELSqBKtVxJWrmElTKB+lXH3UywRjhj685dKTuuKBEgl6XIR+aO8pVzO7vn+lsxFm0jWGyHVbWSzPw1YoAi/v/rwtNFB0uq50O/pQ+ikJt+hqUiI2aqebsSzIr6IrDEX1nqre64pAxB8PlWssGMsBKILV8itp7vJXV/73xPcI9gZkkkZzx7i/BGsHr8CbhFWCWNgkT3hqwc6o8BfwesCE9/pwUJYAlxIcSWjTGwU/goAWslmFMvf2EsCSLYNcX/qIeOIIDbvwqqZX+LELT+FWL4hluCr0UQxH5bwZNuGywpIeDNe9Hs1z9uZImrYyEicgAAAABJRU5ErkJggg=='
  },
  {
    icon: 'dd',
    vipIcon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAkCAMAAABBj89wAAAARVBMVEVocJBaYYZvdZRcY4hhaIxqcJBfZor///9mbI2ytcZ9gp++wc+prMDMztr5+frd3uZ0epdTWoGbn7VXXoTq6++PlK1PVn23O75tAAAAAXRSTlNMP4zV3QAABA9JREFUeF51lgeO60gMRN05B6W9/1GXZEeP/KtlQ/AA9VAsU57PR2otuljXNXV86T8U9yi8k6qLb6q7fCV/LfQi7IiDXtMeDriSPwMA6+50pj+eLo/ns/uLd4Ldn17kzzGAVVO8E+oWwTcGAH5H+I3YBqSHebv2BBvkBZj+bM5oL0GTvwDAZRUeQrQIi7Hsx4j+XfNBZybAqXpFA7KK/Cdi75nvCX5GuH5/kxT61wMHZL8JcN41UwKJgH9HOPYSNMbuAyIRYhHeU9o6AITnnfBE/zMB+dOApFUxUglDu/1ew0gA/iob3gDJnM37jLtcCK7SgIRVyZi0+fN0T6W9ho+Wo4PT5PM8VQO0BLf5o7tq2LbL8mTu2yS+MhSTu0z5GpHUo4VEFp4AUYLYFR3qNsWBAsjhgA5Zb0Dhm98ATyvhMWXVQICegGeDFpwApOciqWw8FGAr6oIA4szgb62/IfMgFBMfUkRAxasDRoRgkkARgPI2wBFMAX9GqTU0gOMv3IJqgSLqAAy9E5CqMe4BMUEdrGWr2TwAwPxVHYdwGfCui+45AmKYcg0wE0hiqFSoRbEAhGDFFFgEyVFwU6HpJ5uhE8bkAfCcu9bC7SXzACGiEIIAI4KDyGkIolzBWRmnLA8B1y2bTXluG6cEg2BNBvuSs6EOHG2C2RWPA8JKkt2kbDYpkFJIC8BbyUQQZ4AEITyzrQCAh0rr+QsAmFbujzgAIIFXiscTKvcE2EdEU5LBkFwxDwKdCYxFKMWZxOhBIIOJl9bc/JG3IAQQZgBG0Z85If/AOJ7HA4CBEICFqmgSLZM9ACB0S3ADGJR6AjusDf8GVAI0htSKOtgAVyj2AoBC4UI43SoApwdKCPmxCu17gtMUtQCV85FAarwWQHQAk/oaAH0QQBCimCBB0WRvUR0AH0/AYKwEWgBARbcDrosA0BUHv2Rc83emKIkK+MgghVSVgz5SiR73QA0CAXRbBuggm1La9/5GACPAUhQQwYKRcyGVG/et2CYfizHB3/hRrB1AJa8IATqNtgw31xI4k4daAjuWKpfk4DMAOGJlhw04YOTIhwjQt7lGTx24E5R6AhnvYCX+rDF3R4ERoovn46uV0sqz4Iwek+9w8v5kfVL2XC3AhtBgoLgEDLPcIkDQylIU0UQ9ozdJAwQI9ev3mVd8Vwuw/F//XiDcCvRnTAxEF/2tnaaJIHf1SkD69teEb/6doClD25z5UHoT3gnkjwSC1optgMEg/3eENacJsLJLzyEtQsvU/QdCdwLCX0/WZU8hXiWT+wQ0m2sBBNsSUOaRYethJyBgj7AgBKBC2QSsGiai6VfNM4GaEbr5akGQuv87A0muDPaVgTroBCpsBVj+FGCPwPYMGNvqV4Yp/vkf+t5wv24grt8AAAAASUVORK5CYII='
  },
  {
    icon: 'wph',
    vipIcon:
      'data:image/png;base64,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'
  }
])

const loading = ref(true)
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
    loading.value = false
    staffList.value = res.data.data
    res.data.data.forEach((item, index) => {
      for (const itemKey in item) {
        shopList.value[index][itemKey] = item[itemKey]
      }
    })
  })
}
const getIconPath = (icon) => {
  return new URL(`../../assets/img/shop/${icon}.png`, import.meta.url).href
}
const buy = (item) => {
  if (myStaffList.value.includes(item.serial)) {
    return _notice('您已开通该会员！')
  }
  if (userInfo.value.result.staff.serial + 1 !== item.serial) {
    return _notice('请逐级开通！')
  }

  loading.value = true
  console.log('item', item)
  loading.value = true
  reqWalletInfo().then((res: any) => {
    console.log('reqWalletInfo', res)
    loading.value = false

    if (item.price > res.data.amount + res.data.money) {
      loading.value = false
      _notice('账户余额不足,请充值!')
      router.push('/recharge')
    } else {
      reqEnterStaff({
        staff_id: item.id
      }).then((sub_res) => {
        loading.value = false
        _notice(sub_res.msg)
        if (res.code === 200) {
          getMyStaff()
          // reqUserStaff().then((userRes) => {
          //   if (userRes.code !== 200) return _notice(userRes.msg)
          //   console.log('reqUserStaff', userRes)
          //
          //   userInfo.value.result.staff = userRes.data.result.staff
          //   window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
          // })
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
  // reqCreateShareLog().then((res) => {
  //   console.log('reqCreateShareLog', res)
  // })
  console.log('userInfo.value?.result?.staff?.serial', userInfo.value)
  if (!userInfo.value?.result?.staff?.serial) {
    return showDialog({
      message: '请先购买服务器！'
    })
  }
  // if (localStorage.isShare !== dayjs().format('YYYY-MM-DD')) {
  //   showConfirmDialog({
  //     message: '请先进行每日分享！',
  //     confirmButtonText: '去分享'
  //   }).then(() => {
  //     if (window.webkit?.messageHandlers) {
  //       localStorage.isShare = dayjs().format('YYYY-MM-DD')
  //     }
  //
  //     window.shareFriend()
  //     // on close
  //     // loadPlayRewardVideo(() => {
  //     //   sessionStorage.seeVideoGetEarnedCash = true
  //     // })
  //   })
  //   return
  // }
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
    myStaffList.value = res.data.map((item) => item.staff_id)
    const sum = res.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.result.staff.price,
      0
    )
    totalSpend.value = sum
    if (res.data.length) {
      res.data.sort((a, b) => a.result.staff.serial - b.result.staff.serial)
      userInfo.value.result.staff.serial = res.data[res.data.length - 1].result.staff.serial
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    }
  })
}
onMounted(() => {
  getAllStaff()
  getUserIncome()
  getMyStaff()
})

const getMoble = () => {
  var prefixArray = new Array('130', '131', '132', '133', '135', '137', '138', '170', '187', '189')
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
    money: (Math.random() * (50 - 20) + 20).toFixed(2),
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

const autoRoll = (flag?) => {
  if (flag) {
    clearInterval(timer.value)
    clearTimeout(timerfir.value)
    clearTimeout(timerfir2.value)
    return
  }
  let table = document.querySelector('.alarmList-child')
  console.log('table', table)
  timerfir.value = window.setTimeout(() => {
    clearInterval(timer.value)
    timerfir2.value = setInterval(() => {
      const datetime = dayjs(new Date().getTime()).format('HH:mm:ss')
      console.log("dayjs().format('HH:mm:ss')", datetime)
      alarmList.value.push({
        phone: getMoble(),
        money: (Math.random() * (50 - 20) + 20).toFixed(2),
        datetime: getDatetime()
      })
    }, 500)
    timer.value = setInterval(() => {
      scrollY.value += speed.value
      if (scrollY.value >= table.scrollHeight - table.offsetHeight) {
        scrollY.value = 0
      }
      table.scrollTop = scrollY.value
    }, 20)
  }, 1000)
}
onMounted(() => {
  autoRoll()
})
onUnmounted(() => {
  autoRoll(1)
})
</script>

<style scoped lang="less">
.fixed-back {
  position: fixed;
  left: 10px;
  top: 48px;
  z-index: 3;
}

.main {
  width: 100%;
  display: flex;
}

.item {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}

.title {
  font-size: 26px;
  color: #eee;
  font-weight: bolder;
  margin-left: 30px;
  position: relative;
  padding-left: 8px;
  //&:before {
  //  position: absolute;
  //  top: 2px;
  //  left: -10px;
  //  display: block;
  //  content: '';
  //  height: 30px;
  //  width: 6px;
  //  background-color: #666cf8;
  //  border-radius: 10px;
  //}
}

.stat {
  margin-top: 20px;
  background-image: linear-gradient(180deg, #494052 10%, #322c36 100%);
  border-radius: 10px 10px 0 0;
  height: auto;

  .stat-header {
    line-height: 40px;
    display: flex;
    justify-content: space-evenly;
    color: #ccc;
    font-size: 12px;
    border-bottom: 1px solid #666;
    .money {
      font-size: 16px;
      font-weight: bolder;
      color: #fff;
    }
  }
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
  margin-top: 20px;
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
    .a-t-items {
      height: 150px;
      width: 90%;
      padding: 10px;
      position: relative;
      margin: 6px 12px;

      .a-t-text {
        position: relative;
        top: 4px;
        font-size: 12px;
        left: 0;
        .a-t-t-3 {
          background-color: #5d5e5f;
          border-radius: 15px;
          position: relative;
          .a-t-title {
            width: 90%;
            left: 0;
            color: #b4a482;
            margin-left: 5%;
            position: absolute;
            top: 4px;
            img {
              float: right;
              width: 20%;
              height: auto;
              border-radius: 50px;
            }
          }
          .introduce {
            position: absolute;
            bottom: 5px;
            right: 10px;
            color: #f60;
          }
          .a-t-t-3-1 {
            top: 30%;
            height: auto;
            position: absolute;
            left: 0;
            right: 20px;
            bottom: 20px;
            background: rgba(0, 0, 0, 0.6);
            width: 100%;
            img {
              width: 20px;
              display: block;
              margin: 14px auto 5px;
              height: 20px;
            }
            .a-t-t-3-text {
              color: #b5a483;
              text-align: center;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.alarmList-child {
  margin-top: 20px;
  height: 200px;
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
</style>
