<template>
  <div class="publish">
    <van-nav-bar
      fixed
      left-arrow
      placeholder
      safe-area-inset-top
      title="广告发布"
      @click-left="$router.back()"
    >
      <template #right>
        <span style="color: #000" @click="$router.push('/publishIntroduce')"> 发布规则 </span>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>

    <div class="content">
      <text-area
        label="标题"
        v-model:content="messageContent"
        rows="2"
        maxlength="40"
        placeholder="请输入标题，40字以内"
      />

      <LabelTitle tips="截图" icon-name="text_area" :is-require="true" />
      <van-uploader :after-read="afterRead" />
      <text-area
        label="内容描述"
        v-model:content="messageContent"
        rows="5"
        maxlength="200"
        placeholder="请输入内容描述"
      />
    </div>
    <el-button
      color="#fcd323"
      size="large"
      style="
        border-radius: 30px;
        border: none;
        color: #444;
        width: calc(100% - 20px);
        height: 40px;
        margin: 0 10px;
      "
      type="primary"
      >发布
    </el-button>
  </div>
</template>
<script setup lang="ts">
import TextArea from '@/components/textArea/TextArea.vue'
import LabelTitle from '@/components/labelTitle/LabelTitle.vue'
import { ref } from 'vue'

const messageContent = ref('')

const afterRead = () => {}
</script>

<style scoped lang="less">
.publish {
  color: #303133;
  font-size: 14px;
  height: calc(100vh);
  background-color: #f3f3f3;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  :deep(.van-nav-bar) {
    background-color: #fed61f !important;
    .van-nav-bar__title {
      color: #000 !important;
    }

    .van-icon {
      color: #000 !important;
      font-size: 18px !important;
    }
  }

  :deep(.van-search) {
    background-color: #fed621;
  }
  .content {
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
  }
}
</style>
