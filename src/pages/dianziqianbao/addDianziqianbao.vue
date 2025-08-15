<template>
  <div class="adddianziqianbao">
    <van-nav-bar
      fixed
      left-arrow
      placeholder
      safe-area-inset-top
      title="添加收款账号"
      @click-left="$router.back()"
    >
      <!--      <template #right>-->
      <!--        <van-icon name="add-o" size="22" @click="addDianziqianbao" />-->
      <!--      </template>-->
    </van-nav-bar>
    <div class="content">
      <!--      <div style="border-radius: 8px; margin: 12px 12px 0; overflow: hidden">-->
      <LabelTitle tips="收款方式" icon-name="text_area" :is-require="true" />

      <van-field
        v-model="sceneDesc"
        is-link
        readonly
        label="收款方式"
        placeholder="请选择"
        @click="showPicker = true"
      />
      <!--      </div>-->
      <text-area
        label="实名认证"
        v-model:content="detail.name"
        rows="2"
        placeholder="请输入真实姓名"
      />

      <!--      <text-area label="收款账号" v-model:content="detail.account" rows="2" placeholder="请输入" />-->

      <LabelTitle tips="收款码" icon-name="text_area" :is-require="true" />
      <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />

      <!--      <text-area-->
      <!--        :is-require="false"-->
      <!--        label="备注"-->
      <!--        v-model:content="detail.remark"-->
      <!--        rows="5"-->
      <!--        maxlength="200"-->
      <!--        placeholder="请输入"-->
      <!--      />-->
    </div>
    <el-button
      color="#fcd323"
      size="large"
      style="
        background: linear-gradient(-90deg, rgb(63, 205, 235), rgb(188, 226, 158));

        border-radius: 30px;
        border: none;
        color: #444;
        width: calc(100% - 20px);
        height: 40px;
        margin: 0 10px;
      "
      type="primary"
      @click="save"
      >保存
    </el-button>

    <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
      <van-picker
        :model-value="pickerValue"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="
          ({ selectedValues }) => {
            console.log(selectedValues)
            detail.scene = selectedValues[0]
            showPicker = false
          }
        "
      />
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onActivated } from 'vue'
import TextArea from '@/components/textArea/TextArea.vue'
import LabelTitle from '@/components/labelTitle/LabelTitle.vue'
import { find } from '@/utils/tree'
import { showToast } from 'vant'
import { reqWalletSave } from '@/api/myApi'
import { useRouter } from 'vue-router'

const router = useRouter()

const columns = [
  { text: '支付宝', value: 'alipay' },
  { text: '微信', value: 'wechat' }
]

const fieldValue = ref('')
const showPicker = ref(false)
const pickerValue = ref([])

const sceneDesc = computed(() => {
  const result = find(columns, true, (item) => {
    return detail.value.scene === item.value
  })
  return result ? result?.text : ''
})

const afterRead = () => {}

const fileList = ref([])

const detail = ref({
  scene: '',
  name: '',
  account: '',
  remark: ''
})

const save = () => {
  console.log('fileList', fileList.value)

  if (!detail.value.scene) {
    showToast('请选择收款方式')
    return
  }
  if (!detail.value.name) {
    showToast('请输入姓名')
    return
  }
  // if (!detail.value.account) {
  //   showToast('请输入账号')
  //   return
  // }
  if (!fileList.value.length) {
    showToast('请上传收款码')
    return
  }

  const formdata = new FormData()
  formdata.append('scene', detail.value.scene)
  formdata.append('name', detail.value.name)
  formdata.append('account', detail.value.name)
  formdata.append('remark', detail.value.remark)
  formdata.append('qrCode', fileList.value[0].file)
  console.log('formdata', formdata)
  reqWalletSave(formdata).then((res) => {
    if (res.code !== 200) {
      return showToast(res.msg)
    }

    console.log('reqWalletSave', res)
    showToast('添加成功！')
    router.back()
  })
}
onActivated(() => {
  detail.value = {
    scene: '',
    name: '',
    account: '',
    remark: ''
  }
  fileList.value = []
})
</script>

<style scoped lang="less">
.adddianziqianbao {
  color: #303133;
  font-size: 14px;
  height: calc(100vh);
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  :deep(.van-field__control) {
    background-color: transparent;
    border: none;
    margin-bottom: 0;
    padding: 0;
    height: auto;
  }

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

  :deep(.van-cell) {
    //background-color: #fff;
    background: #f5f5f5;
    border-radius: 10px;

    .van-field__label {
      display: none;
      color: #323233;
    }
  }

  .content {
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
  }
}
</style>
