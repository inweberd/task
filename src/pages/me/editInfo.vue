<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="编辑信息"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>

    <div
      style="
        background-color: #2e3350;
        margin: 20px;
        border-radius: 10px;
        font-size: 16px;
        line-height: 24px;
      "
    >
      <van-field
        v-model="name"
        class="unp"
        label="用户名"
        placeholder="请输入用户名"
        maxlength="20"
        style="
          font-weight: bolder;
          margin-bottom: 10px;
          color: #fff !important;
          background-color: transparent;
        "
      />
    </div>

    <div
      style="
        margin-top: 20px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      "
    >
      <el-button
        class="w-100"
        color="#01c5f0"
        size="large"
        style="
          border: none;
          width: 85%;
          border-radius: 15px;
          color: #fff;
          background-image: linear-gradient(to right, #fb5b4b, #9c38e5);
        "
        type="primary"
        @click="save"
        >保存
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { onActivated, ref } from 'vue'
import { reqUpdateUserInfo, reqUserInfo } from '@/api/myApi'
import { _notice } from '@/utils'
import bus from '@/utils/bus'
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

const name = ref('')

const router = useRouter()

const save = () => {
  if (!name.value) {
    return showToast('请输入用户名')
  }

  const data = {
    id: userInfo.id,
    nickname: name.value
  }
  reqUpdateUserInfo(data).then((res) => {
    if (res.code !== 200) {
      return _notice(res.msg)
    }
    showSuccessToast('修改成功！')

    router.back()
  })
}

onActivated(() => {
  userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  name.value = userInfo.nickname
})
</script>
<style scoped></style>
