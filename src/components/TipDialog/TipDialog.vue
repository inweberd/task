<template>
  <van-overlay :show="modelValue" :z-index="2">
    <div class="wrapper" @click.stop>
      <div class="update-container">
        <!--        <div class="title">{{ title }}</div>-->
        <div style="padding: 0px 0; color: #000">
          <slot></slot>
        </div>
        <van-button
          v-if="showConfirm"
          color="linear-gradient(-90deg, rgb(63, 205, 235), rgb(188, 226, 158))"
          style="border-radius: 20px; width: 80%; color: #0775f1; font-weight: bolder"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </van-button>
        <div v-if="showClose" class="close" @click="modelValue = false">
          <van-icon name="cross" />
        </div>
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
  position: relative;
}

.close {
  position: absolute;
  top: -20px;
  right: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #c2c7d2;
  display: flex;
  justify-content: center;
  align-items: center;

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
  background-color: #fff;
  //background-image: linear-gradient(to bottom, #4e76bc 0%, #4e76bc 30%, #4e76bc 100%);
  //background: url('@/assets/img/main-bg.jpg');
  background-size: 100% 100%;
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
