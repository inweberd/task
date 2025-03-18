<template>
    <div class="login">
        <!-- <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" /> -->

        <van-nav-bar
            fixed
            left-arrow
            left-text="返回"
            placeholder
            safe-area-inset-top
            title="注册"
            @click-left="router.back()"
        />
        <div class="content">
            <div class="desc">
                <van-image :src="imgg" height="100" width="100"/>
            </div>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="data.social"
                    :rules="[{ required: true, message: '请填写手机号' }]"
                    label=""
                    name="手机号"
                    placeholder="(必填) 手机号"
                />

                <van-field
                    v-model="data.code"
                    center
                    clearable
                    label="短信验证码"
                    name="验证码"
                    placeholder="(必填) 验证码"
                >
                    <template #button>
                        <van-button
                            v-if="!time"
                            :disabled="countdown"
                            size="small"
                            style="background: #f46d16; border: none"
                            type="primary"
                            @click="getCode"
                        >
                            {{ countdown ? countdown + 's重新发送' : '发送验证码' }}
                        </van-button>
                        <div v-else>
                            {{ time }}
                        </div>
                    </template>
                </van-field>
                <van-field
                    v-model="data.password"
                    :rules="[{ required: true, message: '(必填) 确认密码' }]"
                    label=""
                    name="密码"
                    placeholder="(必填) 密码"
                    type="password"
                />
                <van-field
                    v-model="data.password2"
                    :rules="[{ required: true, message: '(必填) 确认密码' }]"
                    label=""
                    name="重复密码"
                    placeholder="(必填) 确认密码"
                    type="password"
                />
                <van-field
                    v-model="data.invite"
                    :disabled="$route.query.invite"
                    :rules="[{ required: true, message: '请填写邀请码' }]"
                    label=""
                    name="邀请码"
                    placeholder="(必填) 邀请码"
                />
                <van-divider/>

                <div style="margin: 16px">
                    <van-button
                        block
                        native-type="submit"
                        round
                        style="background: #f46d16; border: none"
                        type="primary"
                    >
                        注册
                    </van-button>
                </div>
            </van-form>
            <van-divider>其他方式</van-divider>
            <view class="btns" style="display: flex">
                <van-button
                    style="flex: 1; background: #f46d16; border: none"
                    type="primary"
                    @click="go('/login')"
                >登录
                </van-button
                >
                <van-button
                    style="flex: 1; background: #f46d16; border: none"
                    type="primary"
                    @click="go('/forget')"
                >忘记密码
                </van-button
                >
            </view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import imgg from './logo1.png'
import {logout as fnlogout, register, sociallogin} from '@/api/myApi'
import {_no, _sleep, _notice} from '@/utils'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import {useRoute} from 'vue-router'
import {onMounted} from 'vue'

const route = useRoute()
const time = ref()
const data = reactive({
    social: '',
    code: '',
    password: '',
    password2: '',
    invite: route.query.invite || ''
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
    if (!data.social || !data.invite) {
        return _notice('请输入手机号码、邀请码等信息')
    }

    register(data).then((e) => {
        _notice(e.msg)
        if (e.code === 201) {
            countdown.value = 60
            timer = setInterval(updateCountdown, 1000)
        }
    })
}

function onSubmit() {
    if (data.password !== data.password2) {
        return _notice('两次密码输入不一致')
    }

    register(data).then((e) => {
        _notice(e.msg)
        if (e.code === 200) {
            data.social = ''
            data.code = ''
            data.password = ''
            data.password2 = ''
            data.invite = ''
            // router.replace('/login')
            window.location.href = `https://wvvw.weimeihuang.com/download`
        }
    })
}

onMounted(() => {
    window.localStorage.removeItem('userInfo')
    window.localStorage.removeItem('token')
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
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: auto;

    // background: linear-gradient(45deg, #fdfbfb 10%, #FFFFFF 48%, #ebedee 100%) !important;
    .van-divider {
        color: white;
    }

    .content {
        padding: 30px 30px;

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
</style>
