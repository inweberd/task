<template>
  <div class="TipBtn TipBtnClass">
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="btn" @click="show = false"><slot></slot></div>
      </div>
    </van-overlay>
  </div>
</template>
<script setup lang="ts">
const show = defineModel()
console.log('show', show)
</script>

<style scoped lang="less">
.TipBtnClass {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .btn {
    width: 75%;
    height: 50px;
    background-color: #fff;
    background: url('@/assets/img/tip-btn-bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
  }
}
</style>
