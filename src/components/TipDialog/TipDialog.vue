<template>
  <van-overlay :show="modelValue" :z-index="99999999">
    <div class="wrapper" @click.stop>
      <div class="update-container">
        <!--        <div class="title">{{ title }}</div>-->
        <div style="padding: 0px 0">
          <slot></slot>
        </div>
        <van-button
          v-if="showConfirm"
          color="linear-gradient(to right, #fb5b4b, #9c38e5)"
          style="border-radius: 20px; width: 80%"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </van-button>
      </div>
      <div v-if="showClose" class="close" @click="modelValue = false">
        <img src="./img/close.png" />
      </div>
    </div>
  </van-overlay>
</template>
<script lang="ts" setup>
defineProps({
  showClose: {
    default: true
  },
  title: {
    default: '提示'
  },
  showConfirm: {
    default: true
  },
  confirmText: {
    default: '已阅'
  }
})

const emits = defineEmits(['confirm'])

const modelValue = defineModel()

const handleConfirm = () => {
  emits('confirm')
}
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}
.close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 10px;
  img {
    width: 100%;
    height: auto;
  }
}
.update-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 80%;
  background-color: #202022;
  background-image: linear-gradient(to bottom, #fb5b4b 0%, #fff 30%, #fff 100%);
  border-radius: 15px;
  padding: 0px 0 20px;
  color: #000;

  .title {
    text-align: center;
    font-weight: bolder;
    font-size: 18px;
  }
}
</style>
