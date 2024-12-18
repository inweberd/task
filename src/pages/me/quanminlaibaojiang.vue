<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="超级大赢家"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <van-image
      lazy-load
      v-for="item of imgArr"
      :src="item"
      width="100%"
      @click="handleClick"
    ></van-image>
  </div>
</template>

<script lang="ts" setup>
import img1 from './images/quanminlaibaojiang/1.png'
import img2 from './images/quanminlaibaojiang/2.png'
import img3 from './images/quanminlaibaojiang/3.png'
import img4 from './images/quanminlaibaojiang/4.png'
import img5 from './images/quanminlaibaojiang/5.png'
import img6 from './images/quanminlaibaojiang/6.png'
import img7 from './images/quanminlaibaojiang/7.png'
import img8 from './images/quanminlaibaojiang/8.png'
import img9 from './images/quanminlaibaojiang/9.png'
import img10 from './images/quanminlaibaojiang/10.png'
import img11 from './images/quanminlaibaojiang/11.png'
import img12 from './images/quanminlaibaojiang/12.png'
import img13 from './images/quanminlaibaojiang/13.png'
import img14 from './images/quanminlaibaojiang/14.png'
import img15 from './images/quanminlaibaojiang/15.png'
import img16 from './images/quanminlaibaojiang/16.png'

const handleClick = () => {
  showDialog({
    message:
      '游戏正在开发中，预计元旦火热上线！\n' +
      '\n' +
      '每日推广佣金，可以用来进行游戏娱乐，中奖可提现，投入1块钱，最多可中奖30000（3万元）爆奖奖金！中奖，无任何附加条件，直接可提现！\n' +
      '\n' +
      '长期稳定，信誉，正规企业，合法合规!'
  })
}
const imgArr = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16
]

// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { showImagePreview } from 'vant'
import { Toast } from 'tdesign-mobile-vue'
// const showImage = () => {
//   showImagePreview([shareholder])
// }
</script>
<style scoped>
html {
  background: red;
}
body {
  background: red;
}
#app {
  background: red;
}
</style>
