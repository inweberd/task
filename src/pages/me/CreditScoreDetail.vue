<template>
  <div>
    <van-nav-bar
      title="信用分"
      safe-area-inset-top
      fixed
      placeholder
      :class="{ inApp: getIsInApp() }"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image :src="my" width="100%" height="100%" fit="cover"></van-image>
    <div style="color: #fff; padding: 0 10px 10px; text-indent: 24px">
      <div>
        特别注意：如果自己只想玩静态收入。自己玩，或者没推广能力，那么。你自己开小号扫自己二维码注册成为自己下级，
        小号升级也会给自己加分。
      </div>
      <div>
        另外，你自己比如是100会员。你自己本人中途升级高一点的下一个等级，也是会给自己加分的。所以，无需过多担心信用分问题!
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import shareholder from '@/assets/img/kaifa.png'
import my from '@/assets/img/creadotInfo.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
</script>
