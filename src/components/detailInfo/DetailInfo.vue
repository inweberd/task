<template>
  <div class="detail-wrap">
    <van-cell-group :inset="isInset" :title="groupTitle">
      <van-cell
        :title="item.label + '：'"
        :label-width="item.labelWidth === undefined ? 80 : item.labelWidth"
        :key="item.value"
        :required="item.required"
        v-for="item in calcColumnList"
      >
        <slot :name="item.key" :row="item"> {{ detailInfo[item.key] || '- -' }}{{ detailInfo[item.key] ? item.unit : '' }} </slot>
      </van-cell>
      <div class="itemTag" v-if="itemTagContent" :style="{ backgroundColor: itemTagColor }">
        <span>{{ itemTagContent }}</span>
      </div>
    </van-cell-group>
  </div>
</template>
<script lang="ts" setup>
import { computed, unref } from 'vue';

const props = defineProps({
  detailInfo: {
    type: Object
  },
  columnList: {
    type: Array
  },
  isInset: {
    type: Boolean,
    default: true
  },
  itemTagContent: {
    type: String
  },
  itemTagColor: {
    type: String,
    default: '#1890ff'
  },
  groupTitle: {
    type: String,
    default: ''
  },
  hasChildren: {
    type: Boolean,
    default: false
  }
});

const calcColumnList = computed(() => {
  return (props.columnList || []).filter((item) => {
    if (item.key === 'relName') {
      console.log('item', item);
    }
    return !unref(item.hide);
  });
});
</script>
<style lang="less" scoped>
.detail-wrap {
  padding-top: 3px;
  border-radius: 5px;
  border: 1px solid #ededef;
  overflow: hidden;
  .van-cell-group {
    .van-cell {
      &:nth-child(odd) {
        background-color: #f9f9f9;
      }

      :deep(.van-cell__title) {
        color: #666;
        flex: 0 0 100px;
      }

      .van-cell__value {
        color: rgb(50, 50, 51);
        text-align: left;
      }
      overflow: hidden;
    }
  }
  .itemTag {
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
    right: -20px;
    top: 8px;
    transform: rotate(45deg);
    box-shadow: 0 0 10px #888;

    span {
      font-size: 12px;
      color: #fff;
      display: block;
      margin: 1px 0;
      padding: 1px 20px;
      text-align: center;
      text-shadow: 0 0 5px #444;
    }
  }
}
:deep(.van-cell) {
  font-size: 15px;
}
</style>
