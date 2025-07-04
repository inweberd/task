<template>
  <div class="TextArea TextAreaClass">
    <LabelTitle :tips="label" icon-name="text_area" :is-require="isRequire" v-if="showTitle" />
    <van-field
      ref="fieldRef"
      v-model.trim="content2"
      v-bind="$attrs"
      autosize
      type="textarea"
      show-word-limit
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import LabelTitle from '@/components/labelTitle/LabelTitle.vue'
import type { FieldInstance } from 'vant'
const props = defineProps({
  content: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  isRequire: {
    type: Boolean,
    default: true
  }
})
const fieldRef = ref<FieldInstance>()
onMounted(() => {
  if (props.autoFocus) {
    nextTick(() => {
      fieldRef.value?.focus()
    })
  }
})
const emits = defineEmits(['update:content'])
const content2 = computed({
  get() {
    return props.content
  },
  set(newValue: string) {
    emits('update:content', newValue)
  }
})
</script>

<style lang="scss" scoped>
.TextAreaClass {
  :deep(.van-field__control) {
    //border-bottom: 1px solid #b6b6b6;
  }
  :deep(.van-cell) {
    padding: 0;
  }
  :deep(textarea) {
    padding: 5px;
    background-color: #f5f5f5;
    border-radius: 10px;
  }
  :deep(textarea::placeholder) {
    //padding-left: 10px;
  }
}
</style>
