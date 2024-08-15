<template>
  <div class="serveInfoClass" style="padding: 30px 10px 0">
    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
    <Loading v-if="loading" />
    <div class="title">服务器详情</div>
    <div class="wallet-info">
      <div>
        <span>可用余额</span> <span>{{ format(walletInfo?.money || 0) }}</span>
      </div>
      <div>
        <span>累计收益</span> <span>{{ userIncomeInfo.total || 0 }}</span>
      </div>
      <div>
        <span>本次收益</span> <span>{{ userIncomeInfo.today || 0 }}</span>
      </div>
    </div>
    <div class="serve-info">
      <div><van-tag color="#54AC90" style="padding: 3px 6px">浏览任务</van-tag></div>
      <div><span>运行周期:</span> <span>30天</span></div>
      <div><span>运行状态:</span> <span>运行中</span></div>
    </div>
    <div class="log-info">
      <div class="log-info-title">
        <van-icon name="clock" color="#C9D6F7" style="margin-right: 6px" />
        <span>工作日志</span>
      </div>
      <div class="log-list" ref="logListRef">
        <van-empty image-size="100" description="暂未开启" v-if="!logList.length" />
        <div class="log-list-item" v-for="item of logList">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { reqUserIncome, reqWalletInfo, reqWalletLog } from '@/api/myApi'
import dayjs from 'dayjs'
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
userInfo.value.result.staff.serial = userInfo.value.result.staff.serial || 1

defineOptions({
  name: 'serveInfo'
})
const loading = ref(false)
const staffList = ref([])
const logListRef = ref()

const walletInfo = ref({ credit: 0 })

const userIncomeInfo = ref({})
const getUserIncome = () => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
  })
}
const format = (price = 0) => {
  let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return result === '0' ? '0.00' : result
}
const logList = ref([])

// 生产随机IP
function randomIP() {
  const getRandomOctet = () => Math.floor(Math.random() * 256)
  return `${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}`
}
function getRandomNumber() {
  // 生成一个0到1之间的随机数，并调整到0.01到1.00的范围
  const randomNum = Math.random() * (1 - 0.01) + 0.01
  // 保留小数点后四位
  return parseFloat(randomNum.toFixed(4))
}
let num = 0

function createLog() {
  const arr = [
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-正在请求代理IP',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-获取代理IP:' + randomIP(),
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-正在加载浏览任务',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-远程访问请求',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-请求完成',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-浏览中',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-任务完成',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-等待发放佣金',
    dayjs().format('YYYY-MM-DD HH:mm:ss') + '-获得佣金：' + getRandomNumber(),
    '************************'
  ]
  return arr[num % arr.length]
}
onMounted(() => {
  getUserIncome()
  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
  // return
  logList.value.push('已开始运行!')
  setInterval(() => {
    if (num > 30) {
      logList.value.shift()
    }
    logList.value.push(createLog())
    num++
    nextTick(() => {
      logListRef.value.scrollTop += logListRef.value.scrollHeight
    })
  }, 300)
})
</script>

<style scoped lang="less">
.fixed-back {
  position: fixed;
  left: 10px;
  top: 48px;
  z-index: 3;
}
.serveInfoClass {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #2c355e;
  padding: 10px;
  box-sizing: border-box;
  color: #9fa9cc;
  .wallet-info {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    div {
      width: 30%;
      display: flex;
      flex-direction: column;
      background-color: #39456d;
      text-align: center;
      padding: 6px 0;
      span:nth-child(2) {
        font-size: 18px;
        color: #bcc2d7;
      }
    }
  }
  .serve-info {
    margin-top: 10px;
    padding: 16px 0;
    font-size: 16px;

    width: 100%;
    background-color: #39456d;
    display: flex;
    justify-content: space-around;
  }
  .log-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #39456d;
    margin-top: 10px;
    padding: 15px 15px 5px;
    overflow: hidden;
    .log-info-title {
      font-size: 20px;
      border-bottom: 2px solid #2d3661;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .log-list {
      flex: 1;
      overflow-y: auto;
      .log-list-item {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 20px;
      }
    }
  }
}

.title {
  font-size: 26px;
  color: #eee;
  font-weight: bolder;
  margin-left: 40px;
  margin-top: 10px;
  position: relative;
  padding-left: 8px;
  &:before {
    position: absolute;
    top: 2px;
    left: -10px;
    display: block;
    content: '';
    height: 30px;
    width: 6px;
    background-color: #666cf8;
    border-radius: 10px;
  }
}
</style>
