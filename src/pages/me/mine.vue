<script setup>
import { useRouter } from 'vue-router'
import { reactive, onMounted } from 'vue'
import {
  logout as fnlogout,
  reqUserIncome,
  reqUserInfo,
  reqUserStaff,
  reqWalletInfo
} from '@/api/myApi'
import modzz from '../login/model.vue'
import { _no, _sleep, _notice } from '@/utils'
import { articleall } from '@/api/myApi'
import { getSerialName } from '../../utils/getSerialName'
import Loading from '@/components/Loading.vue'
import avatar from '@/assets/img/avatar.png'
const props = defineProps({})
const userInfo = ref({})
const walletInfo = ref({})
const star = ref(0)
const userIncomeInfo = ref({})
const Caidan = ref([])
const data = reactive({
  phone: '135****8989',
  userId: 'XXX',
  code: '1234555'
})
const router = useRouter()

function zzz() {
  // closeShare()
  router.push('/invest')
}
async function logout() {
  window.localStorage.removeItem('userInfo')
  window.localStorage.removeItem('token')
  await fnlogout()
  window.location.reload()
  router.push('/login')
}
function go(e) {
  router.push(e)
}
function jumpToQQ() {
  window.location.href = decodeURIComponent('https://qm.qq.com/q/rfYONthKYq')
}
function go2(val1, val2) {
  console.log(val1, val2)
  router.push({ path: '/article', query: { id: val2.id } })
  // router.push(e)
}
async function copy() {
  try {
    const title = '网页'
    const url = window.location.href
    const summary = '网页'
    const shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`

    window.open(shareUrl, '_blank')
  } catch (err) {
    _notice('复制失败')

    console.error('复制失败:', err)
  }
}
function goDownload() {
  try {
    // state.loading.app = true

    // const { VITE_APP_URL } = import.meta.env
    // 跳转下载
    window.location.href = `http://ssn.rgrma.cn/download`
  } catch (e) {
    _notice('下载失败')
    // state.loading.app = false
    // proxy.$refs['notify'].error('下载失败，请稍后再试！')
  }
}
const service = ref(false)
const loading = ref(false)

const format = (price = 0) => {
  let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return result === '0' ? '0.00' : result
}
const getNewUserInfo = () => {
  loading.value = true

  reqUserInfo({ id: userInfo.value.id }).then((res) => {
    loading.value = false
    if (res.code !== 200) {
      return _notice(res.msg)
    }
    userInfo.value = res.data
    window.localStorage.setItem('userInfo', JSON.stringify(res.data))

    // 如果是会员 查询股东星级
    if (userInfo.value?.result?.staff?.serial) {
      reqUserStaff().then((res) => {
        if (res.code !== 200) {
          return _notice(res.msg)
        }
        star.value = res.data.star
      })
    }
  })

  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
}
const getUserIncome = () => {
  loading.value = true
  reqUserIncome().then((res) => {
    loading.value = false
    userIncomeInfo.value = res.data
  })
}
onActivated(() => {
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo'))
  getData()
  getNewUserInfo()
  getUserIncome()
})

function getData() {
  articleall()
    .then((e) => {
      Caidan.value = e.data.data
      console.log(Caidan.value, '123')
    })
    .finally(() => {})
}
</script>

<template>
  <div class="flex-col justify-start items-center relative page">
    <modzz v-model="service"></modzz>
    <Loading v-if="loading" is-full-screen></Loading>
    <div class="flex-col justify-start section pos">
      <div class="flex-row justify-center items-center section_2">
        <van-image
          class="image_3"
          :src="userInfo?.avatar || avatar"
          style="border: 1px solid #ccc"
          round
        />
        <!--          @click="go('me/edit-userinfo')"-->
        <div class="flex-col items-start group ml-22">
          <span class="text">{{
            userInfo.phone
              ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
              : ''
          }}</span>
          <div class="group_2 mt-8-5" style="margin-top: 10rem">
            <span class="font">
              我的ID: {{ userInfo?.id }}
              <br />
            </span>
            <span class="font text_2">
              我的邀请码： {{ userInfo?.result?.invite?.code }}
              <br />
            </span>
            <span class="font">当前等级: {{ getSerialName(userInfo?.result?.staff?.serial) }}</span>
            <br />
            <span class="font">无限代星级：{{ star }}星股东</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col section_3 pos_3" style="background: #161616">
      <div class="partner-info">
        <div class="partner-banner">
          <img class="partner-icon" src="./images/red-envelope.png" alt="" />
          <div class="partner-text">
            <img src="./images/partner.png" alt="" />
            <div class="subtext">开通合伙人，每天领分红</div>
          </div>
        </div>
        <div class="open-btn" @click="zzz">立即开通</div>
      </div>
      <div class="flex-col group_3">
        <div class="flex-col justify-start items-center self-end relative text-wrapper">
          <span class="font_2 text_3">提现</span>
        </div>
        <div class="flex-row justify-between equal-division group_4">
          <div class="flex-col items-start equal-division-item_2" @click="go('/dep')">
            <span class="font_3">{{ userIncomeInfo.today || 0 }}</span>
            <span class="font_4 text_1 mt-12">今日收益</span>
          </div>
          <div class="horiz-divider section_4"></div>
          <div class="flex-col items-start equal-division-item_2" @click="go('/dep')">
            <span class="font_3">{{ userIncomeInfo.total || 0 }}</span>
            <span class="font_4 text_1 mt-12">历史收益</span>
          </div>
          <div class="horiz-divider section_4"></div>
          <div class="flex-col items-start equal-division-item" @click="go('/dep')">
            <span class="font_3">{{ format(walletInfo?.amount || 0) }}</span>
            <span class="font_4 text_1 mt-12">充值余额</span>
          </div>
          <div class="horiz-divider section_4"></div>

          <div class="flex-col items-start equal-division-item_2" @click="go('/dep')">
            <span class="font_3">{{ format(walletInfo?.money || 0) }}</span>
            <span class="font_4 text_1 mt-12">可提现</span>
          </div>
        </div>
      </div>

      <div class="flex-col">
        <div class="flex-row items-center section_5">
          <div class="flex-col justify-start items-start flex-1 image-wrapper">
            <img class="image_4" src="./images/e62b209b1fc33d5b3ca0c4a35e43028e.png" />
          </div>
          <span class="text_5 ml-20">当前信用分：60分</span>
          <div class="text" @click="go('/CreditScoreDetail')">详情</div>
        </div>

        <div class="flex-col justify-start section_6 mt-18-5">
          <div class="grid">
            <div class="flex-col items-center grid-item" @click="go('/invest')">
              <img class="image_5" src="./images/f4b019b601d0df00071c19a8d8635f75.png" />
              <span class="font_5 mt-3-5">橙市合伙人</span>
            </div>
            <div class="flex-col items-center grid-item_2" @click="go('/myteam')">
              <img class="image_5" src="./images/ca1c51d7746b93a23920b6e81a01305b.png" />
              <span class="font_5 mt-2-5">我的团队</span>
            </div>
            <!--            <div class="flex-col items-center grid-item_3" @click="service = true">-->
            <div class="flex-col items-center grid-item_3" @click="jumpToQQ">
              <img class="image_5" src="./images/77e8e78de6f80bbf915afe8f5bc9b778.png" />
              <span class="font_5 mt-2-5">甜橙客服</span>
            </div>
            <!-- @click="copy" -->
            <div class="flex-col items-center relative grid-item_4" @click="go('/fenxiang')">
              <img class="image_5" src="./images/1572f8bbdb28d0a2a78c51d8bf232edb.png" />
              <span class="font_5 mt-3-5">每日分享</span>
            </div>
            <div class="flex-col items-center relative grid-item_4" @click="goDownload">
              <img class="image_5" src="./images/457fa5ff1e743276c8813696db760ffb.png" />
              <span class="font_5 mt-3-5">APP下载</span>
            </div>
            <div class="flex-col items-center grid-item_5" @click="go('/wallet')">
              <img class="image_5" src="./images/27bc4dd691fde94921cf9524f29d0a98.png" />
              <span class="font_2 mt-3-5">收支明细</span>
            </div>
            <div class="flex-col items-center relative grid-item_6" @click="go('/demo')">
              <img class="image_5" src="./images/7e51e7b4f4d139f9390fa23d75432efb.png" />
              <span class="font_2 mt-5-5">无限代星级</span>
            </div>
            <div class="flex-col items-center relative grid-item_7" @click="go('/nofinish')">
              <img class="image_5" src="./images/702e90f7f1ebc87641055bbff962f5b5.png" />
              <span class="font_2 text_7 mt-5">大逃杀游戏</span>
            </div>
            <div class="flex-col items-center relative grid-item_7" @click="go('/conversion')">
              <img class="image_5" src="./images/money.png" />
              <span class="font_2 text_7 mt-5">佣金互转</span>
            </div>
          </div>
        </div>
        <van-cell
          v-for="(item, index) in Caidan"
          Key="index"
          style="margin-top: 10px"
          :title="item.title"
          is-link
          class="vv"
          @click="go2('/article', item)"
        />
        <div class="logout" @click="logout">
          <img class="image_5" src="./images/3c6dff12198f8d467dc89f898839efcd.png" />
          <span class="font_2 mt-5-5">退出APP</span>
        </div>
      </div>
    </div>
    <BaseFooter v-bind:init-tab="5" />
    <div class="contact" @click="jumpToQQ">
      <img src="@/assets/img/kefu.png" alt="" />
      <div>
        <div>联系</div>
        <div>客服</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.contact {
  position: fixed;
  top: 60%;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px 0 0 20px;
  padding: 4px;
  box-shadow:
    0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
    0px 0.3px 5.3px rgba(0, 0, 0, 0.028),
    0px 0.5px 10px rgba(0, 0, 0, 0.035),
    0px 0.9px 17.9px rgba(0, 0, 0, 0.042),
    0px 1.7px 33.4px rgba(0, 0, 0, 0.05),
    0px 4px 80px rgba(0, 0, 0, 0.07);
  img {
    margin-right: 4px;
    width: 30px;
    height: 30px;
  }
}
.mt-18-5 {
  margin-top: 14.57rem;
}

.mt-3-5 {
  margin-top: 3.62rem;
}

.mt-2-5 {
  margin-top: 2.72rem;
}

.mt-5-5 {
  margin-top: 5.43rem;
}

.mt-5 {
  margin-top: 4.98rem;
}

.page {
  padding-bottom: 131.7rem;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;

  .section {
    .section_2 {
      padding: 52.17rem 17.17rem 11.29rem 27.17rem;
      background-image: url('./images/2c757d7e9de442d6159ae953d60359a1.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .image_3 {
        width: 84.24rem;
        height: 84.24rem;
      }

      .group {
        width: 214.22rem;

        .text {
          color: #fffdfd;
          font-size: 21.74rem;
          font-family: PingFang;
          font-weight: 700;
          line-height: 16.76rem;
        }

        .group_2 {
          line-height: 16.3rem;

          .font {
            font-size: 12.96rem;
            font-family: Adobe Heiti Std;
            line-height: 20.3rem;
            font-weight: 700;
            color: #fffdfd;
          }

          .text_2 {
            color: #ffffff;
            font-weight: unset;
          }
        }
      }
    }
  }

  .pos {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }

  .section_3 {
    padding: 0 17.66rem 215.58rem 18.12rem;
    background-image: url('./images/d4d3a341f07d0f248de2ca5c542a877d.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .group_3 {
      padding: 1.85rem 21.29rem 10rem 21.37rem;

      .text-wrapper {
        padding: 3.17rem 0 4.08rem;
        background-color: #fc4869;
        box-shadow: 0rem 0rem 7.25rem #19000114;
        border-radius: 9.06rem;
        width: 37.14rem;

        .text_3 {
          line-height: 10.87rem;
          letter-spacing: 2.36rem;
        }
      }

      .equal-division {
        align-self: stretch;
        display: flex;
        align-items: center;
        text-align: center;

        .equal-division-item {
          padding: 5rem 0;
        }

        .section_4 {
          background-color: #c1c3d0;
          width: 1.36rem;
          height: 23.1rem;
        }

        .equal-division-item_2 {
          padding: 5.45rem 0 5.91rem;
          text-align: center;

          .text_1 {
            line-height: 10.87rem;
            text-align: center;
          }
        }

        .font_3 {
          font-size: 16.3rem;
          font-family: Adobe Heiti Std;
          line-height: 12.68rem;
          color: #ffffff;
        }

        .font_4 {
          font-size: 11.78rem;
          font-family: Adobe Heiti Std;
          line-height: 11.32rem;
          color: #c1c3d0;
        }
      }

      // .group_4 {
      // 	padding-bottom: 19rem;
      // }
    }

    .section_5 {
      padding: 11.32rem 10rem 11.32rem 9.96rem;
      background-color: #393939;
      border-radius: 9.06rem;

      .text {
        margin-left: 10px;
        height: 22rem;
        text-align: center;
        line-height: 22rem;
        font-weight: 900;
        width: fit-content;
        white-space: nowrap;
        padding: 2px 6px;
        color: #6244be;
        background-color: #e5e0f6;
        border-radius: 13px;
      }

      .image-wrapper {
        background-image: url('./images/c12e99ca200be4dc4eeb76eb2c969c91.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 4.08rem;

        .image_4 {
          width: 100rem;
          height: 4.08rem;
        }
      }

      .text_5 {
        color: #ffffff;
        font-size: 14px;
        white-space: nowrap;
        line-height: 9.06rem;
        letter-spacing: 0.91rem;
      }
    }

    .section_6 {
      background-color: #393939;
      border-radius: 9.06rem;

      .grid {
        height: 237.32rem;
        display: grid;
        grid-template-rows: repeat(3, minmax(0, 1fr));
        grid-template-columns: repeat(3, minmax(0, 1fr));
        row-gap: 0;
        column-gap: 0;

        .grid-item {
          padding: 15.02rem 0 17.06rem;
        }

        .grid-item_2 {
          padding: 10.02rem 0 13.42rem;
        }

        .image_5 {
          width: 32rem;
          height: 32rem;
        }

        .font_5 {
          font-size: 11.78rem;
          font-family: PingFang;
          line-height: 11.32rem;
          color: #ffffff;
        }

        .grid-item_3 {
          padding: 15.03rem 0 18.42rem;
          width: 113.08rem;
        }

        .grid-item_4 {
          padding: 14.27rem 0 17.82rem;
        }

        .grid-item_5 {
          padding: 14.27rem 0 17.82rem;
          width: 113.08rem;
        }

        .grid-item_6 {
          padding: 11.48rem 0 19.02rem;
        }

        .grid-item_7 {
          padding: 11.48rem 0 19.02rem;

          .text_7 {
            line-height: 11.78rem;
          }
        }

        .grid-item_8 {
          padding: 11.47rem 0 18.57rem;
          width: 113.08rem;
        }
      }
    }

    .font_2 {
      font-size: 11.78rem;
      font-family: Adobe Heiti Std;
      letter-spacing: 1.18rem;
      line-height: 11.32rem;
      color: #ffffff;
    }
  }

  .pos_3 {
    position: absolute;
    left: 0;
    right: 0;
    top: 155.69rem;
    border-radius: 20px;
  }

  .image_2 {
    width: 98.5507vw;
  }

  .pos_2 {
    position: absolute;
    left: 5.43rem;
    right: 0;
    bottom: 0;
  }
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-evenly {
  justify-content: space-evenly;
}

.items-start {
  align-items: flex-start;
}

.items-end {
  align-items: flex-end;
}

.items-center {
  align-items: center;
}

.items-baseline {
  align-items: baseline;
}

.self-end {
  align-self: flex-end;
}

.flex-1 {
  flex: 1 1 0%;
}

.relative {
  position: relative;
}

.mt-12 {
  margin-top: 12rem;
}

.ml-20 {
  margin-left: 20rem;
}

.mt-20 {
  margin-top: 20rem;
}

.ml-22 {
  margin-left: 22rem;
}

.partner-info {
  background-image: url('./images/rect.png');
  margin: 10px 0;
  height: 32rem;
  padding: 10px;
  border-radius: 13px;
  display: flex;
  justify-content: space-between;
}

.partner-banner {
  // position: absolute;
  padding: 5rem;
  // top: 32rem;
  width: 222rem;
  height: 38rem;
  background-color: #e5e0f6;
  border-radius: 13px;
  display: flex;
  align-items: center;
}

.partner-icon {
  width: 40px;
  height: 25px;
  margin-right: 10px;
}

.partner-text {
  display: flex;
  flex-direction: column;
  color: #6244be;

  img {
    width: 60rem;
    height: 12rem;
  }

  .subtext {
    padding-top: 5px;
    font-size: 10rem;
    color: #9598a5;
  }
}

.open-btn {
  margin-left: 10px;
  height: 22rem;
  text-align: center;
  line-height: 22rem;
  font-weight: 900;
  width: 110rem;
  color: #6244be;
  background-color: #e5e0f6;
  border-radius: 13px;
}

.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 35px;
  line-height: 35px;
  padding: 0 18.12rem;
  margin: 20px auto;
  border-radius: 13px;
  background-color: #393939;

  img {
    width: 30px;
    height: 30px;
  }
}

.vv {
  margin-bottom: 10px;
}

.van-cell {
  border-radius: 10px;
  background-color: #393939;
  color: #fff;
  border: none;
}

.van-cell-group:after {
  border: none;
}

.van-cell:after {
  border: none;
}
</style>
