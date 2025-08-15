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
        v-model:content="formData.title"
        rows="2"
        maxlength="40"
        placeholder="请输入标题，40字以内"
      />

      <LabelTitle tips="截图" icon-name="text_area" :is-require="true" />
      <van-uploader :after-read="afterRead" max-count="9" v-model="fileList" @delete="afterDel" />
      <text-area
        label="内容描述"
        v-model:content="formData.content"
        rows="5"
        maxlength="200"
        placeholder="请输入内容描述"
      />
    </div>
    <el-button
      color="#fcd323"
      size="large"
      @click="submit"
      style="
        border-radius: 30px;
        background: linear-gradient(-90deg, rgb(63, 205, 235), rgb(188, 226, 158));
        border: none;
        color: #444;
        width: calc(100% - 20px);
        height: 40px;
        margin: 0 10px;
      "
      type="primary"
      >发布
    </el-button>
    <div style="background-color: #fff; border-radius: 10px; margin: 10px; padding: 8px">
      发布一条广告3金币/次 <br />
      置顶24小时，10金币/次 <br />
      刷新广告排名4金币/次 <br />

      安全提示，投资有风险，合作需谨慎 <br />
      蚂蚁优选对于广告内容双方在沟通时，发生的投资，交易行为，不做任何承诺和担保， <br />
      请谨慎甄别，注意骗子行径！慎重考虑！ <br />
    </div>
  </div>
</template>
<script setup lang="ts">
import TextArea from '@/components/textArea/TextArea.vue'
import LabelTitle from '@/components/labelTitle/LabelTitle.vue'
import { ref } from 'vue'
import { showToast } from 'vant'
import { getPosterCreate, reqUpload, reqWalletSave } from '@/api/myApi'

const messageContent = ref('')
const fileList = ref([])
const formData = ref({
  title: '',
  content: '',
  image: ''
})

const router = useRouter()
const filePathArr = []
const afterRead = (fileInfo) => {
  fileInfo.status = 'uploading'
  fileInfo.message = '上传中...'
  reqUpload(fileInfo.file).then((res) => {
    console.log('res', res)
    fileInfo.status = 'success'
    fileInfo.message = '上传成功'
    filePathArr.push(res.data.path)
    // formData.value.image = res.data.path
  })
}
const afterDel = (fileInfo, delInfo) => {
  filePathArr.splice(delInfo.index, 1)
  // formData.value.image = ''
}

const submit = () => {
  if (!formData.value.title) {
    showToast('请输入标题')
    return
  }
  if (!formData.value.content) {
    showToast('请输入内容描述')
    return
  }
  if (!filePathArr.length) {
    showToast('请上传截图')
    return
  }

  formData.value.image = filePathArr.join(',')
  // const formdata = new FormData()
  // formdata.append('title', formData.value.title)
  // formdata.append('content', formData.value.title)
  // formdata.append('image', fileList.value[0].file)
  // console.log('formdata', formdata)
  getPosterCreate(formData.value).then((res) => {
    if (res.code !== 200) {
      return showToast(res.msg)
    }

    console.log('reqWalletSave', res)
    showToast('添加成功！')
    router.back()
  })
}
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
    background-color: #fff !important;
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
