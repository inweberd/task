<template>
  <div id="header" class="position-relative">
    <div class="card bg-danger">
      <div class="card-body">
        <div class="d-flex justify-content-center fw-bold text-white font-18">邀请好友/领现金</div>
        <div class="d-flex justify-content-between align-items-center item">
          <div class="d-flex text-white">
            <el-avatar :src="info.avatar" size="large"></el-avatar>
            <div class="d-flex flex-column justify-content-center ms-5">
              <div class="d-flex">
                <span>{{ info.nickname || info.phone || '无' }}</span>
                <span class="ms-5">V.{{ info.result.staff.serial }}</span>
              </div>
              <span>会员ID：{{ info.id }}</span>
            </div>
          </div>
          <el-button type="warning" round>查看权益</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsers } from '@/store/users'

const { info } = storeToRefs(useUsers())

// 生产随机IP
function randomIP() {
  const getRandomOctet = () => Math.floor(Math.random() * 256)
  return `${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}`
}

// Example usage
console.log(randomIP())

console.log(info.value)
</script>

<style>
body {
  background: white !important;
}
</style>

<style scoped>
#header .card:first-child {
  border-radius: 0 0 50% 50%;
}
#header .card-body {
  height: 250px;
}
#header .item {
  margin: 10px;
}
</style>
