<template>
  <div class="gameList gameListClass">
    <van-nav-bar
      title="游戏大厅"
      safe-area-inset-top
      fixed
      placeholder
      :class="{ inApp: getIsInApp() }"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <section class="MEvhpqJsUzf5ML0TIC7Lx">
      <div class="_3GSCwNQRJwIJZ58cybgYLW">
        <div class="_3fjli6OU5bBO5wMUslOt_c">
          <div
            v-for="item of tabList"
            class="_2TcTCnWhzfeNsB8LpQM5pV"
            :class="{ active: activeName === item.value }"
            @click="activeName = item.value"
          >
            <div class="SHA_z4ugAD8lQYQU372Rk" :class="[item.className]"></div>
            <span>{{ item.label }}</span>
          </div>
        </div>
        <div class="_1IuUKlAGMrH1UXGdM1loCa">
          <div
            @click="toGame('pg')"
            :class="{ show: activeName === '1' }"
            class="_2C3QU_iJVaQd5AF-Xs_Khp gameItem gameItem-ky"
          >
            <div v-for="item of pgList" class="_3oaripjZ52OOjBDUAHwulJ">
              <img :src="item.icon" alt="" />
            </div>
          </div>
          <div
            @click="toGame('ky')"
            :class="{ show: activeName === '2' }"
            class="_2C3QU_iJVaQd5AF-Xs_Khp gameItem gameItem-ky"
          >
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/220.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/510.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/620.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/830.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/910.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/2011.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/950.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/630.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/900.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/1960.webp" alt="" />
            </div>

            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/201.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/204.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/203.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/205.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/206.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/207.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/208.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/209.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/210.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/211.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/213.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/215.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/216.webp" alt="" />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img src="@/pages/me/images/quanminlaibaojiang/217.webp" alt="" />
            </div>
          </div>
          <div
            v-if="false"
            :class="{ show: activeName === '6' }"
            class="_1NGhLtJqbRn6HuTx9Jzuth gameItem"
          >
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/SG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/AG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/BBIN.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/CQ9.png"
                alt=""
              />
            </div>

            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/FG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/JDB.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/JOKER.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/LGD.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/MG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/MT.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/MW.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/PG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/PNG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/PP.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/PT.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/game/WL.png"
                alt=""
              />
            </div>
          </div>
          <div
            v-if="false"
            :class="{ show: activeName === '3' }"
            class="_2J8G_gXyFUjn_MQZKu6eKr gameItem"
          >
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/lottery/BBIN.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/lottery/IG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/lottery/VR.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/lottery/SGWIN.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/lottery/TCG.png"
                alt=""
              />
            </div>
          </div>
          <div
            v-if="false"
            :class="{ show: activeName === '4' }"
            class="_2C3QU_iJVaQd5AF-Xs_Khp gameItem"
          >
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/AG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/BBIN.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/MG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/PT.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/OG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/BG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/CQ9.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/DG.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/SEXY.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/ALLBET.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/EVO.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/EBET.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/WM.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/WL.png"
                alt=""
              />
            </div>
          </div>

          <div
            :class="{ show: ['4', '5', '6', '7'].includes(activeName) }"
            class="_2C3QU_iJVaQd5AF-Xs_Khp gameItem"
          >
            <!--            <div class="_3oaripjZ52OOjBDUAHwulJ">-->
            <!--              <img-->
            <!--                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/AG.png"-->
            <!--                alt=""-->
            <!--              />-->
            <!--            </div>-->
            <div
              style="
                width: 100%;
                height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #000;
              "
            >
              <van-empty :image="emptyImg" image-size="80" description="开发中，敬请期待！" />
            </div>
          </div>
          <div
            v-if="false"
            :class="{ show: activeName === '5' }"
            class="_1NGhLtJqbRn6HuTx9Jzuth gameItem"
          >
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/AG.png"
                alt=""
              />
            </div>
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/BBIN.png"
                alt=""
              />
            </div>
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/SABA.png"
                alt=""
              />
            </div>
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/SS.png"
                alt=""
              />
            </div>
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/IM.png"
                alt=""
              />
            </div>
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/NEWBB.png"
                alt=""
              />
            </div>
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/CROWN.png"
                alt=""
              />
            </div>
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/WL.png"
                alt=""
              />
            </div>
            <div class="_2cecEuhrgEAL2aVtEAylKs">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/sport/FB.png"
                alt=""
              />
            </div>
          </div>
          <div
            v-if="false"
            :class="{ show: activeName === '6' }"
            class="_1-kX8MCXrKYuyPKAWqrw7a gameItem"
          ></div>
          <div
            v-if="false"
            :class="{ show: activeName === '7' }"
            class="_1-kX8MCXrKYuyPKAWqrw7a gameItem"
          >
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/lottery/ESB.png"
                alt=""
              />
            </div>
            <div class="_3oaripjZ52OOjBDUAHwulJ">
              <img
                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/lottery/AVIA.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { getIsInApp } from '@/utils/getTopPadding'
import { onActivated, ref } from 'vue'
import img65 from '@/pages/me/images/quanminlaibaojiang/65.webp'
import img2 from '@/pages/me/images/quanminlaibaojiang/2.webp'
import img5 from '@/pages/me/images/quanminlaibaojiang/5.webp'
import img7 from '@/pages/me/images/quanminlaibaojiang/7.webp'
import img8 from '@/pages/me/images/quanminlaibaojiang/8.webp'
import img1 from '@/pages/me/images/quanminlaibaojiang/1.webp'
import img4 from '@/pages/me/images/quanminlaibaojiang/4.webp'
import img6 from '@/pages/me/images/quanminlaibaojiang/6.webp'
import img26 from '@/pages/me/images/quanminlaibaojiang/26.webp'
import img37 from '@/pages/me/images/quanminlaibaojiang/37.webp'
import img41 from '@/pages/me/images/quanminlaibaojiang/41.webp'
import img57 from '@/pages/me/images/quanminlaibaojiang/57.webp'
import img69 from '@/pages/me/images/quanminlaibaojiang/69.webp'
import img73 from '@/pages/me/images/quanminlaibaojiang/73.webp'
import img83 from '@/pages/me/images/quanminlaibaojiang/83.webp'
import img85 from '@/pages/me/images/quanminlaibaojiang/85.webp'
import img92 from '@/pages/me/images/quanminlaibaojiang/92.webp'
import img103 from '@/pages/me/images/quanminlaibaojiang/103.webp'
import img104 from '@/pages/me/images/quanminlaibaojiang/104.webp'
import img105 from '@/pages/me/images/quanminlaibaojiang/105.webp'
import img106 from '@/pages/me/images/quanminlaibaojiang/106.webp'
import img107 from '@/pages/me/images/quanminlaibaojiang/107.webp'
import img108 from '@/pages/me/images/quanminlaibaojiang/108.webp'
import img132 from '@/pages/me/images/quanminlaibaojiang/132.webp'
import img1312883 from '@/pages/me/images/quanminlaibaojiang/1312883.webp'
import img1381200 from '@/pages/me/images/quanminlaibaojiang/1381200.webp'
import img1420892 from '@/pages/me/images/quanminlaibaojiang/1420892.webp'
import img1489936 from '@/pages/me/images/quanminlaibaojiang/1489936.webp'
import img1594259 from '@/pages/me/images/quanminlaibaojiang/1594259.webp'
import img1655268 from '@/pages/me/images/quanminlaibaojiang/1655268.webp'
import img1671262 from '@/pages/me/images/quanminlaibaojiang/1671262.webp'
import img1682240 from '@/pages/me/images/quanminlaibaojiang/1682240.webp'
import img98 from '@/pages/me/images/quanminlaibaojiang/98.jpg'
import emptyImg from './images/empty.png'
import { Toast } from 'tdesign-mobile-vue'
import { reqNgPlay, reqNgTransfer } from '@/api/myApi'
import { showFailToast } from 'vant'

const activeName = ref('1')

const tabList = ref([
  {
    label: 'PG电子',
    value: '1',
    className: '_1ZEQ7iSuAw4dutmxl1NwMg'
  },
  {
    label: '开元棋牌',
    value: '2',
    className: 'yqN4QarkEsbLj_T7zfEQW'
  },
  // {
  //   label: '棋牌娱乐',
  //   value: '3',
  //   className: 'TnhTj-YCWMSf6abQv6_6Y'
  // },
  // {
  //   label: '开元棋牌',
  //   value: '4',
  //   className: '_2ktsXc1lo5cTtZpxZKiYF6'
  // },
  {
    label: '真人棋牌',
    value: '5',
    className: 'Bh10iLHOD3fbD3yimQB8U'
  },
  {
    label: '彩票游戏',
    value: '6',
    className: '_2lfeI7Rs4oq01GCTjdQYcz'
  },
  {
    label: '体育游戏',
    value: '7',
    className: '_2lfeI7Rs4oq01GCTjdQYcz'
  }
])

const pgList = [
  {
    name: '麻将胡了',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img65,
    value: '100000',
    rtp: '中',
    return: '96.97%',
    code: '65'
  },
  {
    name: '麻将胡了2',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img2,
    value: '100000',
    rtp: '中',
    return: '96.95%',
    code: '74'
  },
  {
    name: '赏金女王',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img5,
    value: '50000',
    rtp: '中',
    return: '96.74%',
    code: '84'
  },
  // {
  //   name: '少林足球',
  //   online: Math.floor(Math.random() * 1000 + 1000),
  //   icon: img3,
  //   value: '4000',
  //   rtp: '中',
  //   return: '96.93%',
  //   code: '67'
  // },
  {
    name: '招财喵',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img7,
    value: '100000',
    rtp: '中',
    return: '96.73%',
    code: '89'
  },
  {
    name: '赏金大对决',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img8,
    value: '5000',
    rtp: '高',
    return: '96.75%',
    code: '135'
  },
  {
    name: '赏金船长',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1,
    value: '30000',
    rtp: '中',
    return: '96.15%',
    code: '54'
  },
  {
    name: '赢财神',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img4,
    value: '100000',
    rtp: '中',
    return: '96.97%',
    code: '71'
  },
  {
    name: '寻宝黄金城',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img6,
    value: '100000',
    rtp: '中',
    return: '96.71%',
    code: '87'
  },
  {
    name: '摇钱树',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img26,
    value: '50000',
    rtp: '中',
    return: '95.32%',
    code: '1312883'
  },
  {
    name: '圣诞欢乐送',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img37,
    value: '70000',
    rtp: '中',
    return: '96.71%',
    code: '37'
  },
  {
    name: '埃及寻宝',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img41,
    value: '40000',
    rtp: '中',
    return: '96.78%',
    code: '41'
  },
  {
    name: '寻龙探宝',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img57,
    value: '80000',
    rtp: '中',
    return: '96.54%',
    code: '57'
  },
  {
    name: '比基尼天堂',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img69,
    value: '100000',
    rtp: '中',
    return: '96.63%',
    code: '69'
  },
  {
    name: '探秘宝典',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img73,
    value: '70000',
    rtp: '中',
    return: '96.72%',
    code: '73'
  },
  {
    name: '火树赢花',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img83,
    value: '90000',
    rtp: '中',
    return: '96.85%',
    code: '83'
  },
  {
    name: '阿拉丁神灯',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img85,
    value: '40000',
    rtp: '中',
    return: '96.47%',
    code: '85'
  },
  {
    name: '水上泰神奇',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img92,
    value: '80000',
    rtp: '中',
    return: '96.36%',
    code: '92'
  },
  {
    name: '比特淘金',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img103,
    value: '70000',
    rtp: '中',
    return: '96.19%',
    code: '103'
  },
  {
    name: '亡灵大盗',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img104,
    value: '60000',
    rtp: '中',
    return: '96.63%',
    code: '104'
  },
  {
    name: '霹雳神偷',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img105,
    value: '80000',
    rtp: '中',
    return: '96.28%',
    code: '105'
  },
  {
    name: '麒麟送宝',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img106,
    value: '60000',
    rtp: '中',
    return: '96.86%',
    code: '106'
  },
  {
    name: '美猴王传奇',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img107,
    value: '40000',
    rtp: '中',
    return: '96.36%',
    code: '107'
  },
  {
    name: '美洲野牛',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img108,
    value: '50000',
    rtp: '中',
    return: '96.47%',
    code: '108'
  },
  {
    name: '疯狂过山车',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img132,
    value: '100000',
    rtp: '中',
    return: '96.50%',
    code: '132'
  },
  {
    name: '黄金摇钱树',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1312883,
    value: '90000',
    rtp: '中',
    return: '96.63%',
    code: '1312883'
  },
  {
    name: '夏威夷探奇',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1381200,
    value: '60000',
    rtp: '中',
    return: '96.71%',
    code: '1381200'
  },
  {
    name: '电音派对',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1420892,
    value: '40000',
    rtp: '中',
    return: '96.45%',
    code: '1420892'
  },
  {
    name: '金秋射手',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1489936,
    value: '50000',
    rtp: '中',
    return: '96.92%',
    code: '1489936'
  },
  {
    name: '非洲大冒险',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1594259,
    value: '70000',
    rtp: '中',
    return: '96.35%',
    code: '1594259'
  },
  {
    name: '沙皇宝藏',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1655268,
    value: '90000',
    rtp: '中',
    return: '96.67%',
    code: '1655268'
  },
  {
    name: '宝石矿工',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1671262,
    value: '80000',
    rtp: '中',
    return: '96.81%',
    code: '1671262'
  },
  {
    name: '快钱来了',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img1682240,
    value: '100000',
    rtp: '中',
    return: '96.71%',
    code: '1682240'
  },
  {
    name: '十倍金牛',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img98,
    value: '4000',
    rtp: '中',
    return: '96.41%',
    code: '98'
  }
]
const toGame = (plat) => {
  Toast({
    theme: 'loading',
    message: '加载中...',
    duration: 0
  })
  // reqNgPlay(code)
  // reqNgPlayCode().then((res) => {
  //   console.log('reqNgPlayCode', res)
  // })
  reqNgPlay({
    // code: '',
    plat
  })
    .then((res) => {
      // console.log('reqNgPlay', res)
      if (res.code === 200) {
        window.location.href = res.data.url
      } else {
        showFailToast('游戏加载失败！' + res.msg)
      }
    })
    .finally(() => {
      Toast.clear()
    })
}
onActivated(() => {
  Toast({
    theme: 'loading',
    message: '加载中...',
    duration: 0
  })
  reqNgTransfer().then((res) => {
    Toast.clear()
  })
  reqNgTransfer({ plat: 'ky' }).then((res) => {
    Toast.clear()
  })
})
</script>

<style scoped lang="less">
.gameListClass {
  color: red;
  height: 100%;
}

.MEvhpqJsUzf5ML0TIC7Lx {
  padding: 14px;
  height: calc(100% - 60px);

  ._3GSCwNQRJwIJZ58cybgYLW {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    ._3fjli6OU5bBO5wMUslOt_c {
      ._2TcTCnWhzfeNsB8LpQM5pV {
        color: #263440;
        margin: 0;
        padding: 0;
        outline: 0;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        width: 80px;
        height: 40px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 6px 0 rgba(65, 70, 92, 0.3);
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100% 100%;
        align-items: center;
        position: relative;
        background-image: url('./images/tabNormal.png');

        &.active {
          background-image: url(./images/tabSelected.png);
          box-shadow: 0 4px 6px 0 rgba(168, 135, 102, 0.5);
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          background-repeat: no-repeat;
          background-size: cover;
          border-bottom: 1px solid #bd9f7f;
        }
        .SHA_z4ugAD8lQYQU372Rk {
          background-image: url(./images/home_tabs.png);
          background-repeat: no-repeat;
          background-size: 49px 576px;
          justify-content: center;
          width: 44px;
          height: 44px;
          position: absolute;
          left: -4px;
          align-items: center;
          display: flex;

          &._1ZEQ7iSuAw4dutmxl1NwMg {
            background-position: -2px -338px;
          }
          &.TnhTj-YCWMSf6abQv6_6Y {
            background-position: -2px -194px;
          }
          &.yqN4QarkEsbLj_T7zfEQW {
            background-position: -2px -242px;
          }
          &._2ktsXc1lo5cTtZpxZKiYF6 {
            background-position: -2px -98px;
          }
          &.Bh10iLHOD3fbD3yimQB8U {
            background-position: -2px -2px;
          }
          &._2lfeI7Rs4oq01GCTjdQYcz {
            background-position: -2px -146px;
          }
          &._2lfeI7Rs4oq01GCTjdQYcz {
            background-position: -2px -146px;
          }
        }
        span {
          display: inline-block;
          width: 46px;
          text-align: center;
          font-size: 10px;
          color: #9aa4c2;
          position: absolute;
          right: 2px;
          top: 13px;
        }
      }
    }
    ._1IuUKlAGMrH1UXGdM1loCa {
      position: relative;
      z-index: 0;
      flex: 1;
      padding-left: 11px;
      height: 100%;
      overflow: scroll;

      .gameItem {
        animation: _1jzRjZabUL1MVeemy9gqnK 0.2s ease;
        display: none;
        &.show {
          display: block;
        }
        &.hide {
          display: none;
        }
        ._2cecEuhrgEAL2aVtEAylKs {
          width: 100%;
          height: 140px;
          border-radius: 6px;
          margin-bottom: 10px;
          box-shadow: 0 2px 14px 0 rgba(65, 70, 92, 0.3);
          position: relative;

          img {
            width: 100%;
            height: 100%;
          }
        }

        &-ky {
          ._3oaripjZ52OOjBDUAHwulJ {
            height: auto !important;
            img {
              height: auto !important;
            }
          }
        }

        ._3oaripjZ52OOjBDUAHwulJ {
          width: calc(33% - 6px);
          margin: 3px;
          box-sizing: border-box;
          height: 90px;
          display: inline-block;
          margin-bottom: 10px;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 14px 0 rgba(65, 70, 92, 0.3);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      @keyframes _1jzRjZabUL1MVeemy9gqnK {
        0% {
          transform: translate3d(0, 10%, 0);
          visibility: visible;
        }
        100% {
          transform: translateZ(0);
        }
      }
    }
  }
}
</style>
