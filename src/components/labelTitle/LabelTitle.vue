<template>
  <div class="LabelTitle LabelTitleClass">
    <div class="label">
      <span class="is_require" v-if="isRequire">*</span>
      <!--      <img :src="getIconPath()" alt="" class="icon" />-->
      <span class="tips">{{ tips }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isRequire: {
    type: Boolean,
    required: false,
    default: false
  },
  iconName: {
    type: String,
    required: false,
    default: 'camera'
  },
  tips: {
    type: String,
    required: true
  }
})
const getIconPath = () => {
  return new URL(`./images/${props.iconName}.png`, import.meta.url).href
}
</script>

<style scoped lang="less">
.LabelTitleClass {
  .label {
    min-height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 5px;
    .is_require {
      color: red;
      transform: translateY(3px);
    }
    .tips {
      margin-left: 4px;
    }
    img {
      margin-left: 4px;
      width: 20px;
      height: 20px;
    }
    span {
      color: #000;
      font-size: 14px;
    }
  }
}
</style>
