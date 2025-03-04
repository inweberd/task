<template>
  <div class="ToggleLoginAndRegister ToggleLoginAndRegisterClass">
    <div class="toggle-box">
      <div class="list">
        <div
          class="list-item"
          @click="item.fn"
          v-for="(item, index) of list"
          :class="{ active: index === active }"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  active: {
    type: Number,
    default: 0
  }
})

const list = ref([
  {
    label: '登 录',
    fn() {
      router.replace('/common/sign-in')
    }
  },
  {
    label: '注 册',
    fn() {
      router.replace('/common/sign-up')
    }
  }
])
</script>

<style scoped lang="less">
.ToggleLoginAndRegisterClass {
  width: 100%;
  .toggle-box {
    width: 40%;
    margin: 0 auto;
    .list {
      color: #8b8b8b;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .list-item {
        &.active {
          position: relative;
          color: #815bff;
          font-weight: bolder;

          &:after {
            position: absolute;
            top: -10px;
            right: -25px;
            display: block;
            height: 30px;
            width: 20px;
            content: '';
            background: url('../assets/images/toggle-bg.png') no-repeat;
            background-size: 20px auto;
          }
        }
      }
    }
  }
}
</style>
