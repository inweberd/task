<template>
  <div class="yongjinjiajiang" style="height: 100%; overflow: auto">
    <van-nav-bar
      title="佣金嘉奖"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <span style="color: #1e83d3" @click="showOverlay = true"> 嘉奖规则 </span>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <div style="display: flex; justify-content: center; margin-top: 0px">
      <div style="position: relative; width: fit-content" @click="reqGetMoney">
        <img
          src="@/assets/img/rebbag-yongjinjiajiang.png"
          alt=""
          style="width: 250px; height: 315px"
        />
        <span
          style="
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 140px;
            color: #fff;
            font-size: 26px;
          "
        >
          好运降临
        </span>
        <span
          style="
            position: absolute;
            left: 50%;
            color: #fff000;
            transform: translateX(-50%);
            font-size: 24px;
            top: 175px;
          "
        >
          佣金加奖
        </span>
        <span
          style="
            position: absolute;
            left: 50%;
            color: #fff000;
            transform: translateX(-50%);
            top: 205px;
            font-size: 26px;
          "
        >
          {{ money }}元
        </span>
      </div>
    </div>
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div
        style="
          width: 100%;
          height: 100%;
          border-radius: 10px;
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <van-image @click="showOverlay = false" width="94%" :src="shareholder"></van-image>
      </div>
    </van-overlay>
    <van-image @click="showOverlay = false" width="100%" :src="shareholder"></van-image>
    <TipDialog
      v-model="showGonggaoOverlay"
      confirm-text="已阅"
      :show-close="false"
      @confirm="showGonggaoOverlay = false"
    >
      <p
        style="
          text-align: center;
          font-size: 22px;
          color: #fff;
          font-weight: bolder;
          margin-top: 10px;
        "
      >
        领取失败
      </p>
      <p style="text-align: center; color: #fff; padding: 10px; margin: 10px 0; font-size: 18px">
        暂无可领取红包，请积极推广，奖励红包，多多领取！
      </p>
    </TipDialog>
    <TipDialog
      v-model="successOverlay"
      confirm-text="已阅"
      :show-close="false"
      @confirm="successOverlay = false"
    >
      <p
        style="
          text-align: center;
          font-size: 22px;
          color: #fff;
          font-weight: bolder;
          margin-top: 10px;
        "
      >
        领取成功
      </p>
      <p style="text-align: center; color: #fff; padding: 10px; margin: 10px 0; font-size: 18px">
        恭喜您领取汇盈集团奖上奖红包！请继续积极推广，再接再厉。每日红包大奖送不停
      </p>
    </TipDialog>
    <!--  width="94%"-->
    <!--  height="100%"-->
    <!--  style="margin-left: 3%; margin-top: -140px"-->
    <!--&gt;</van-image>-->
  </div>
</template>

<script lang="ts" setup>
import shareholder from '@/assets/img/yongjinjiajiang.png'
// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { closeToast, showImagePreview, showToast } from 'vant'
import { reqBonusInvite } from '@/api/myApi'
import { onActivated, ref } from 'vue'
const showImage = () => {
  showImagePreview([shareholder])
}

const showOverlay = ref(false)
const showGonggaoOverlay = ref(false)
const successOverlay = ref(false)

const money = ref(0)

const getRed = (showLoading = true) => {
  showLoading &&
    showLoadingToast({
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
  reqBonusInvite('query').then((res) => {
    closeToast()
    money.value = res.data.bonus || 0
  })
}

const reqGetMoney = () => {
  if (!money.value) {
    showGonggaoOverlay.value = true
    return
  }
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  reqBonusInvite('take').then((res) => {
    if (res.code === 200) {
      successOverlay.value = true
      getRed(false)
    } else {
      showToast(res.msg)
    }
  })
}

onActivated(() => {
  getRed()
})
</script>
<style scoped lang="less">
.yongjinjiajiang {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  :deep(.van-image__img) {
    width: 100%;
    height: auto;
  }
  :deep(.van-nav-bar) {
    .van-icon {
      color: #000 !important;
    }
  }

  :deep(.van-nav-bar__content) {
    background-color: #fff;
    .van-nav-bar__title {
      color: #000 !important;
    }
  }
}
</style>
