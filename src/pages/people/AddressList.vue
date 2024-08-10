<template>
  <div class="AddressList">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">手机通讯录</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="recommend">
        <div class="title">
          <div class="left">已有20+位朋友加入抖音</div>
        </div>
        <div class="list">
          <People :key="i" v-for="(item, i) in data.list" :people="item"></People>
        </div>
      </div>
      <div class="footer">为尊重用户选择，仅展示已授权用户</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import People from './components/People.vue'
import { reactive } from 'vue'

defineOptions({
  name: 'AddressList'
})

const data = reactive({
  list: [
    {
      type: 5
    }
  ]
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.AddressList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;

  .content {
    padding-top: 60px;

    .recommend {
      .title {
        padding: 20px 20px 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          color: var(--second-text-color);

          img {
            width: 10px;
            height: 10px;
          }
        }

        .right {
          border-radius: 50%;
          background: var(--second-text-color);
          padding: 5px;
          width: 10px;
          height: 10px;
        }
      }
    }

    .footer {
      text-align: center;
      line-height: 60px;
      height: 60px;
      color: var(--second-text-color);
    }
  }
}
</style>
