<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="下载方式"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <!--    <div class="big-title" style="margin-top: 10px">365钱包下载地址：</div>-->
    <!--    <div class="box">-->
    <!--      <a href="https://agonyload.i3sth2te.com/home/#/download"> 备用下载地址1 </a>-->
    <!--      <div style="margin-top: 10px"></div>-->
    <!--      <a href="https://nmvlm.ishihuijie.com/xp6v/mmiyy2flot"> 备用下载地址2 </a>-->
    <!--      <div style="margin-top: 10px"></div>-->
    <!--      <a href="https://www.365.app">官网</a>-->
    <!--    </div>-->

    <div class="big-title" style="margin-top: 10px">JDPAY钱包下载地址：</div>
    <div class="box">
      <a href="https://jdpp1.com/#/"> 下载地址 </a>
      <div style="margin-top: 10px">
        <!--              苹果安卓通用直链：-->
      </div>
      <div style="margin-top: 10px"></div>
      <a href="https://yszro.sfplgdvz.com/api/c/ezuhn88e"> 苹果安卓通用直链1 </a>
      <div style="margin-top: 10px"></div>
      <a href="https://mjezz.uytpkk.com/uB0zAxZ2/n2i3ody0yt"> 苹果安卓通用直链2 </a>
      <div style="margin-top: 10px"></div>
      <a href="https://s20w2la.tomorrowgold.com:1002/d/32763431746c6f"> 苹果安卓通用直链3 </a>
      <div style="margin-top: 10px"></div>
      <a href="http://www.jdpweb.com/pc.html"> JDPAY钱包 H5 网页版本（无需下载app） </a>
      <div style="margin-top: 10px"></div>
      <a href="http://8.218.116.194"> H5国内访问 </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { showImagePreview } from 'vant'
</script>
<style scoped lang="less">
.box {
  background-color: #2e3350;
  margin: 10px 20px;
  border-radius: 10px;
  padding: 15px;
  a {
    color: #ddd;
    text-decoration: underline;
    & + a {
      margin-top: 10px;
    }
  }
}
</style>
