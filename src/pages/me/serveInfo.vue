<template>
  <div class="serveInfoClass">
    <dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
    <Loading v-if="loading" />
    <div class="title">服务器详情</div>
    <div class="wallet-info">
      <div><span>可用余额</span> <span>133.47124</span></div>
      <div><span>累计收益</span> <span>18.37516</span></div>
      <div><span>本次收益</span> <span>3.48136</span></div>
    </div>
    <div class="serve-info">
      <div><van-tag color="#54AC90" style="padding: 3px 6px">浏览任务</van-tag></div>
      <div><span>剩余时间:</span> <span>28天</span></div>
      <div><span>运行状态:</span> <span>运行中</span></div>
    </div>
    <div class="log-info">
      <div class="log-info-title">
        <van-icon name="clock" color="#C9D6F7" style="margin-right: 6px" />
        <span>工作日志</span>
      </div>
      <div class="log-list" ref="logListRef">
        <div class="log-list-item" v-for="item of logList">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
userInfo.value.result.staff.serial = userInfo.value.result.staff.serial || 1

const loading = ref(false)
const staffList = ref([])
const logListRef = ref()
const logList = ref([
  '已开始运行!',
  '2023-9-19 14:35:42-正在请求代理IP',
  '2023-9-19 14:35:46-获取代理IP:210.45.231.83',
  '2023-9-19 14:35:49-浏览任务:EasiestSystemEver有史以来最简单的系统',
  'www,easiestsystemever.com',
  '2023-9-19 14:35:57-远程访问请求',
  '2023-9-19 14:35:59-请求壳成',
  '2023-9-19 14:36:5-浏览中',
  '2023-9-19 14:36:35-任务完成',
  '2023-9-19 14:36:43-等待发放佣金',
  '2023-9-19 14:36:51-获得佣金：1.69558',
  '************************',
  '023-9-19 14:35:42-正在请求代理IP',
  '2023-9-19 14:33:37获取代理IP:210.45.251.129',
  '2023-9-1914:37:8.浏览任务:FreeDFYFunnel免要DFV漏斗/',
  'faststart9,convertri.com',
  '2023-9-1914:37:14-远程访问语求',
  '2023-9-19 14:37:21-请求完成',
  '2023-9-1914:37:26-浏览中',
  '2023-9-19 14:37:56-任务完成',
  '2023-9-19 14:36:43-等待发放佣金',
  '2023-9-19 14:36:51-获得佣金：1.69558',
  '************************',
  '2023-9-19 14:35:42-正在请求代理IP',
  '2023-9-19 14:35:46-获取代理IP:210.45.231.83',
  '2023-9-19 14:35:49-浏览任务:EasiestSystemEver有史以来最简单的系统',
  'www,easiestsystemever.com',
  '2023-9-19 14:35:57-远程访问请求',
  '2023-9-19 14:35:59-请求壳成',
  '2023-9-19 14:36:5-浏览中',
  '2023-9-19 14:36:35-任务完成',
  '2023-9-19 14:36:43-等待发放佣金',
  '2023-9-19 14:36:51-获得佣金：1.69558'
])
let num = 0
onMounted(() => {
  setInterval(() => {
    if (num > 30) {
      num = 0
      logList.value.splice(30)
    }
    logList.value.push(logList.value[num++])
    nextTick(() => {
      logListRef.value.scrollTop += logListRef.value.scrollHeight
    })
  }, 1000)
})
</script>

<style scoped lang="less">
.fixed-back {
  position: fixed;
  left: 10rem;
  top: 25rem;
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
