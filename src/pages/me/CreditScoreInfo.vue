<template>
  <div>
    <van-nav-bar
      title="信用分详细说明"
      safe-area-inset-top
      fixed
      placeholder
      :class="{ inApp: getIsInApp() }"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <p style="color: #fff; padding: 10px; text-indent: 24px">
      制度完善 才能长久运营，就跟大家去公司企业上班一样， 业务精英一月拿1万工资。 你业务不行
      一月你拿2000保底也行
    </p>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
</script>
