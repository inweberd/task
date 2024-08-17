<template>
  <div class="investClass">
    <div class="title">邀请好友/领现金</div>
    <div class="user-info">
      <div class="l">
        <div class="avatar">
          <img src="@/assets/img/lz.png" alt="" />
        </div>
        <div class="info">
          <div class="user-name">
            {{
              userInfo.phone
                ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
                : ''
            }}
            <span style="color: #3e5bf2; font-size: 22px"
              ><img src="@/assets/img/v.png" style="width: 18px" />{{
                userInfo?.result?.staff?.serial
              }}</span
            >
          </div>
          <div class="idcard">会员ID：{{ userInfo?.id }}</div>
          <div class="idcard">邀请码：{{ userInfo?.result?.invite?.code }}</div>
          <div class="idcard">当前星级：{{ star }}星用户</div>
        </div>
      </div>
    </div>
    <div class="my-invest">
      <div class="my-invest-col">
        <div @click="toMySub">
          <span>团队总人数</span>
          <span>{{ memberInfo.team?.total || 0 }}</span>
        </div>
        <div @click="toMySub">
          <span>团队有效人数</span>
          <span>{{ memberInfo.team?.vip || 0 }}</span>
        </div>
        <div>
          <span>今日收益</span>
          <span>{{ userIncomeInfo.today || 0 }}</span>
        </div>
        <div>
          <span>历史收益</span>
          <span>{{ userIncomeInfo.total || 0 }}</span>
        </div>
      </div>
      <div class="my-invest-col">
        <div @click="toMySub">
          <span>直推总人数</span>
          <span>{{ memberInfo.first?.total || 0 }}</span>
        </div>
        <div @click="toMySub">
          <span>直推有效人数</span>
          <span>{{ memberInfo.first?.vip || 0 }}</span>
        </div>
        <div>
          <span>团队总充值</span>
          <span>{{ memberInfo.team?.deposit || 0 }}</span>
        </div>
        <div>
          <span>团队总提现</span>
          <span>{{ memberInfo.team?.withdraw || 0 }}</span>
        </div>
      </div>
      <div class="invest-btn" @click="$router.push('/me/my-card')"></div>
    </div>
    <van-cell-group inset>
      <!--<van-cell title="我的服务器" is-link @click="go('/invest')" />-->
      <van-cell title="收支明细 （提现）" is-link @click="go('/wallet')" />
      <!--<van-cell title="每日分享" is-link @click="go('/fenxiang')" />-->
      <van-cell title="金币互转" is-link @click="go('/conversion', true)" />
      <van-cell title="团队星级" is-link @click="go('/demo', true)" />
      <van-cell title="APP下载" is-link @click="goDownload" />
      <van-cell title="退出账号" is-link @click="logout" />
    </van-cell-group>
    <BaseFooter v-bind:init-tab="6" :is-white="true" />
  </div>
</template>

<script lang="ts" setup>
import BaseFooter from '@/components/BaseFooter.vue'
import { onActivated, onMounted, ref } from 'vue'
import {
  logout as fnlogout,
  reqUserIncome,
  reqUserInfo,
  reqUserMemberInfo,
  reqUserStaff,
  reqWalletInfo
} from '@/api/myApi'
import { loadInteraction } from '@/utils/ad'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
const memberInfo = ref({})
const userIncomeInfo = ref({})
const walletInfo = ref({ credit: 0 })
const star = ref(0)

const format = (price = 0) => {
  let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return result === '0' ? '0.00' : result
}
const getMemberInfo = async () => {
  reqUserMemberInfo({
    uid: userInfo.value.id
  }).then((res) => {
    memberInfo.value = res.data
  })
}
const getUserIncome = () => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
  })
}
const init = async () => {
  getMemberInfo()
  getUserIncome()
}

async function logout() {
  window.localStorage.removeItem('userInfo')
  window.localStorage.removeItem('token')
  await fnlogout()
  // window.location.reload()
  router.push('/common/sign-in')
}
function go(e, interaction = false) {
  // interaction && loadInteraction()
  router.push(e)
}
function jumpToQQ() {
  window.location.href = decodeURIComponent('https://qm.qq.com/q/rfYONthKYq')
}
function go2(val1, val2) {
  // loadInteraction()
  console.log(val1, val2)
  router.push({ path: '/article', query: { id: val2.id } })
  // router.push(e)
}
function goDownload() {
  try {
    // state.loading.app = true

    // const { VITE_APP_URL } = import.meta.env
    // 跳转下载
    window.location.href = `https://lzff.ddxsc.cn/download`
  } catch (e) {
    _notice('下载失败')
    // state.loading.app = false
    // proxy.$refs['notify'].error('下载失败，请稍后再试！')
  }
}
const getNewUserInfo = () => {
  reqUserInfo({ id: userInfo.value.id }).then((res) => {
    if (res.code !== 200) {
      return _notice(res.msg)
    }
    userInfo.value = res.data
    window.localStorage.setItem('userInfo', JSON.stringify(res.data))

    // 如果是会员 查询股东星级
    if (userInfo.value?.result?.staff?.serial) {
    }
    reqUserStaff().then((res) => {
      // if (res.code !== 200) {
      //   return _notice(res.msg)
      // }
      star.value = res.data.star || 0
    })
  })

  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
}

const toMySub = () => {
  loadInteraction()
  router.push('/mysub')
}
onActivated(() => {
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo'))
  init()
  getNewUserInfo()
})
</script>

<style lang="less" scoped>
.investClass {
  width: 100vw;
  height: 100%;
  background: #f0f1f1 url('@/assets/img/invest/invest-bg1.webp') no-repeat;
  background-size: 100% auto;
  padding-bottom: 100px;
  overflow: scroll;

  .title {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 20px;
    margin-top: 40px;
  }
  .user-info {
    margin-top: 20px;
    .l {
      display: flex;
      align-items: center;
      padding-left: 10px;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        color: #fff;
        margin-left: 10px;
        .user-name {
          font-size: 22px;
        }
        .idcard {
          color: #f3eded;
        }
      }
    }
  }
  .my-invest {
    width: 95%;
    margin: 20px auto;
    background: url('@/assets/img/invest/invest-bg2.webp') no-repeat;
    background-size: 100% auto;
    //height: 400px;
    padding-top: 30px;
    color: #fff;
    .my-invest-col {
      width: 100%;
      display: flex;
      justify-content: space-evenly;

      margin-top: 18px;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &:nth-child(1) {
        & > div {
          & > span:nth-child(1) {
            font-size: 16px;
          }
          & > span:nth-child(2) {
            font-size: 30px;
          }
        }
      }
      &:nth-child(2) {
        & > div {
          & > span:nth-child(1) {
            font-size: 14px;
          }
          & > span:nth-child(2) {
            font-size: 28px;
          }
        }
      }
    }

    .invest-btn {
      width: 150px;
      margin: 10px auto;
      height: 50px;
      background: url('@/assets/img/invest/tuiguang.webp') no-repeat;
      background-size: 100% auto;
      animation: scale 1s linear alternate infinite;
    }
    @keyframes scale {
      from {
        transform: scale(0.9);
      }

      to {
        transform: scale(1.2);
      }
    }
  }
}
</style>
