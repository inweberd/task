<template>
  <van-overlay :show="modelValue" :z-index="99999999">
    <div class="wrapper" @click.stop>
      <div class="update-container">
        <div v-if="showClose" class="close" @click="modelValue = false">
          <img src="./img/close.png" />
        </div>
        <div class="title">{{ title }}</div>
        <div style="padding: 15px 0">
          <slot></slot>
        </div>
        <van-button
          v-if="showConfirm"
          color="linear-gradient(to right, #ff8b6e, #ff625c)"
          style="border-radius: 20px; width: 80%"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </van-button>
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
}

.update-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 80%;
  background-color: #202022;
  background-image: linear-gradient(to bottom, #e1b087 0%, #fff 30%, #fff 100%);
  border-radius: 15px;
  padding: 15px 0 20px;
  color: #000;

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 30px;

    img {
      width: 100%;
      height: auto;
    }
  }

  .title {
    text-align: center;
    font-weight: bolder;
    font-size: 18px;
  }
}
</style>
