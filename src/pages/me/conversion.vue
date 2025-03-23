<template>
    <div class="login">
        <!-- <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" /> -->
        <van-nav-bar
            :class="{ inApp: getIsInApp() }"
            left-arrow
            left-text="返回"
            placeholder
            safe-area-inset-top
            title="佣金互转"
            @click-left="router.back()"
        />
        <div class="logo-box">
            <img alt="" src="@/assets/img/logo.png"/>
            <div class="logo-box-content">
                <div class="info">
                    <p>汇盈传媒</p>
                    <!--                    <p>the big thumb video</p>-->
                </div>
            </div>
        </div>
        <div class="content">
            <div class="desc">
                <!--<van-image width="100" height="100" :src="imgg" />-->
            </div>
            <van-form @submit="onSubmit">
                <div class="common-input-title">团队成员手机号</div>
                <van-field
                    v-model="data.phone"
                    :rules="[{ required: true, message: '请输入团队成员手机号' }]"
                    placeholder="请输入对方手机号"
                />
                <div class="common-input-title" style="margin-top: 10px">转账金额</div>

                <van-field
                    v-model="data.amount"
                    :rules="[{ required: true, message: '请输入转账金额' }]"
                    name="金额"
                    placeholder="请输入转账金额"
                    type="number"
                />
                <div class="common-input-title" style="margin-top: 10px">短信验证码</div>
                <van-field
                    v-model="data.code"
                    center
                    clearable
                    label=""
                    name="验证码"
                    placeholder="请输入短信验证码"
                >
                    <template #button>
                        <!--            <van-button-->
                        <!--              v-if="!time"-->
                        <!--              size="small"-->
                        <!--              type="primary"-->
                        <!--              @click="getCode"-->
                        <!--              style="background: #01c5f0; border: none"-->
                        <!--              :disabled="countdown"-->
                        <!--            >-->
                        <!--              {{ countdown ? countdown + 's重新发送' : '发送验证码' }}-->
                        <!--            </van-button>-->
                        <p v-if="!time" style="color: #999" @click="getCode">
                            {{ countdown ? countdown + 's重新发送' : '发送验证码' }}
                        </p>
                        <div v-else>
                            {{ time }}
                        </div>
                    </template>
                </van-field>

                <div style="width: 100%">
                    <van-button
                        block
                        color="linear-gradient(to right, #fb5b4b, #9c38e5)"
                        native-type="submit"
                        round
                        style="border: none"
                        type="primary"
                    >
                        转账
                    </van-button>
                </div>
            </van-form>
            <p style="color: #ccc; margin-top: 10px">佣金互转10元起，互转无手续费！
            </p>
            <p style="color: #ccc; margin-top: 10px">
                发起转账方自身需有任意特权加速卡，方可使用转账。接收方无门槛接收！ </p>
            <!--            <p style="color: #fff; margin-top: 10px">-->
            <!--                2、余额可以直接用来购买会员！余额也可以直接进行游戏，游戏过程中，有中奖赢钱，满足20元，可以在APP内发起提现。-->
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
            <!--          每日推广余额，可以用来进行游戏娱乐，中奖可提现，投入1块钱，最多可中奖30000（3万元）爆奖奖金！-->
            <!--          中奖，无任何附加条件，直接可提现！-->
            <!--        </p>-->

            <!--        <p>长期稳定，信誉，正规企业，合法合规!</p>-->
            <!--      </div>-->
        </div>
        <TipDialog
            v-model="showGonggaoOverlay2"
            confirm-text="去开通"
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
          color: #f1361e;
          font-weight: bolder;
          padding: 20px 0 40px;
        "
            >
                余额互转仅限会员用户使用
            </p>
        </TipDialog>
    </div>
</template>

<script lang="ts" setup>
// import imgg from './images/logo1.png'

import {logout as fnlogout, register, reqWalletTransfer, sociallogin} from '@/api/myApi'
import {_no, _sleep, _notice} from '@/utils'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import {useRoute} from 'vue-router'
import {onMounted, ref} from 'vue'
import {getIsInApp} from '@/utils/getTopPadding'

const showGonggaoOverlay2 = ref(false)

const isVip = ref(JSON.parse(window.localStorage.getItem('userInfo'))?.result?.staff?.serial)
const route = useRoute()
const time = ref()
const data = reactive({
    phone: '',
    code: '',
    amount: ''
    // fingerprint: ''
})
const countdown = ref(0)

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

function go(path) {
    router.push(path)
}

function getCode() {
    const serial = JSON.parse(window.localStorage.getItem('userInfo'))?.result?.staff?.serial
    if (!serial) {
        showGonggaoOverlay2.value = true

        return
    }
    if (!data.phone) {
        return _notice('请输入团队成员手机号')
    }

    reqWalletTransfer(data).then((e) => {
        _notice(e.msg)
        if (e.code === 201) {
            countdown.value = 60
            timer = setInterval(updateCountdown, 1000)
        }
    })
}

function onSubmit() {
    if (data.amount < 20) {
        return _notice('余额互转20元起！')
    }
    if (!data.phone || !data.code) {
        return _notice('请输入验证码！')
    }
    reqWalletTransfer(data).then((e) => {
        _notice(e.msg)
        if (e.code === 200) {
            data.phone = ''
            data.code = ''
            data.amount = ''
        }
    })
}
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
    background-color: #1f203d;
    overflow-y: auto;
    // background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;
    .van-divider {
        color: white;
    }

    .content {
        box-sizing: border-box;
        padding: 0 30px 30px;
        width: 80%;
        margin: 20px auto 0;
        box-shadow: 0 0 10px #0000001f;
        border-radius: 20px;
        background-color: #2e3350;

        .desc {
            margin-top: 10px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        .button {
            width: 100%;
            margin-bottom: 5px;
        }
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
            color: #fff;
            margin-left: 16px;
            text-align: center;

            p:nth-child(1) {
                font-size: 26px;
                letter-spacing: 8px;
            }
        }
    }
}

:deep(.van-cell) {
    border-bottom: 1px solid #4d536a;
    padding: 10px 0;

    &::after {
        border: none !important;
    }

    .van-field__body {
        input {
            color: #fff !important;

            &::placeholder {
                color: #fff !important;
            }
        }
    }
}
</style>
