<template>
  <div class="RequestUpdate" id="RequestUpdate">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">我的求更新记录</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="request">
        <div class="list">
          <div class="item" :key="i" v-for="(item, i) in store.friends.all">
            <div class="left">
              <img :src="_checkImgUrl(item.avatar)" />
              <span class="name">{{ item.name }}</span>
            </div>
            <span class="time">{{ _dateFormat(item.lastLoginTime, 'D') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _dateFormat } from '../../utils'

const store = useBaseStore()

defineOptions({
  name: 'MyRequestUpdate'
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.RequestUpdate {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14px;

  .content {
    padding: 60px 15px 60px 15px;

    .request {
      .list {
        .item {
          padding: 10px 0;

          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            display: flex;
            align-items: center;
            @width: 42px;

            img {
              width: @width;
              height: @width;
              border-radius: 50%;
              margin-right: 10px;
            }
          }

          .time {
            font-size: 12px;
            color: var(--second-text-color);
          }
        }
      }
    }
  }
}
</style>
