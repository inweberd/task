<template>
  <div class="gameList gameListClass">
    <van-nav-bar
      title="推广下级玩游戏，得超高返利"
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
            <span v-if="item.value != 8">{{ item.label }}</span>
            <span style="margin-top: -6px" v-else>{{ item.label }}</span>
          </div>
        </div>
        <div class="_1IuUKlAGMrH1UXGdM1loCa">
          <div
            :class="{ show: activeName === '1' }"
            class="_2C3QU_iJVaQd5AF-Xs_Khp gameItem gameItem-ky"
          >
            <div
              v-for="item of pgList"
              @click="toGame('pg', item.code)"
              class="_3oaripjZ52OOjBDUAHwulJ"
            >
              <img :src="item.icon" alt="" />
              <p style="width: 100%; text-align: center; color: #ddd; font-size: 12px">
                {{ item.name }}
              </p>
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
                font-size: 22px;
                color: #fff;
              "
            >
              等待上架中！
              <!--              <van-empty :image="emptyImg" image-size="80" description="等待上架中！" />-->
            </div>
          </div>
          <div
            :class="{ show: ['8'].includes(activeName) }"
            class="_2C3QU_iJVaQd5AF-Xs_Khp gameItem"
          >
            <!--            <div class="_3oaripjZ52OOjBDUAHwulJ">-->
            <!--              <img-->
            <!--                src="https://net.ng-demo.xyz/Areas/Wap11/Content/images/BIimg/live/AG.png"-->
            <!--                alt=""-->
            <!--              />-->
            <!--            </div>-->
            <div style="width: 100%; display: flex; align-items: center; justify-content: center">
              <img src="./images/youxibankuai.jpg" style="width: 100%" alt="" />

              <!--              <van-empty :image="emptyImg" image-size="80" description="等待上架中！" />-->
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
import { closeToast, showFailToast } from 'vant'

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
    label: '体育',
    value: '5',
    className: 'Bh10iLHOD3fbD3yimQB8U'
  },
  {
    label: '彩票',
    value: '6',
    className: '_2lfeI7Rs4oq01GCTjdQYcz'
  },
  {
    label: '真人棋牌',
    value: '7',
    className: '_2lfeI7Rs4oq01GCTjdQYcz'
  },
  {
    label: '游戏板块\n' + '推广挣钱',
    value: '8',
    className: '_2ktsXc1lo5cTtZpxZKiYF6'
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
    name: '黄金摇钱树',
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
    name: '金球射手',
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
  },
  {
    name: '街头涂鸦',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/graffiti-rush/WGBG-dcae39fe.webp',
    code: '1804577'
  },
  {
    name: '宝藏大冒险',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/mr-treas-fort/WGBG-abacaefa.webp',
    code: '1799745'
  },
  {
    name: '幸运草之恋',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/lucky-clover/WGBG-c14c5743.jpg',
    code: '1601012'
  },
  {
    name: '印加奇迹',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/incan-wonders/WGBG-6797bfcf.webp',
    code: '1850016'
  },
  {
    name: '金蛇招财',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/fortune-snake/WGBG-0ff7b563.webp',
    code: '1879752'
  },
  {
    name: '艺伎之刃',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/geisha-revenge/WGBG-f60d7eeb.webp',
    code: '1702123'
  },
  {
    name: '真爱巧克力',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/choc-deluxe/WGBG-4cddc0c1.webp',
    code: '1666445'
  },
  {
    name: '里约嘉年华',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/rio-fantasia/WGBG-96211ea2.webp',
    code: '1786529'
  },
  {
    name: '世界珍宝馆',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/museum-mystery/WGBG-80ca9c12.webp',
    code: '1755623'
  },
  {
    name: '美食夏日祭',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/oishi-delights/WGBG-dab3ef8e.webp',
    code: '1815268'
  },
  {
    name: '三只疯狂小猪',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/three-cz-pigs/WGBG-4ad14e24.webp',
    code: '1727711'
  },
  {
    name: '南美之翼',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/wings-iguazu/WGBG-b655663b.webp',
    code: '1747549'
  },
  {
    name: '极道荣耀',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/yakuza-honor/WGBG-d8cb46dc.webp',
    code: '1760238'
  },
  {
    name: '鲨鱼赏金',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/shark-bounty/WGBG-14592919.webp',
    code: '1648578'
  },
  {
    name: '热血足球',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/futebol-fever/WGBG-d7c09adb.webp',
    code: '1778752'
  },
  {
    name: '小鸡跑酷',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/chicky-run/WGBG-a8333781.jpg',
    code: '1738001'
  },
  {
    name: '丧尸危机',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/zombie-outbrk/WGBG-646a274d.webp',
    code: '1635221'
  },
  {
    name: '阿努比斯',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/anubis-wrath/WGBG-b5794c23.jpg',
    code: '1623475'
  },
  {
    name: '魔法药水',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/mystic-potions/WGBG-a09ee14c.webp',
    code: '1717688'
  },
  {
    name: '墨西哥狂欢',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/pinata-wins/WGBG-ebc64a3a.jpg',
    code: '1492288'
  },
  {
    name: '猿宇宙#3258',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/wild-ape-3258/WGBG-0b185d0e.jpg',
    code: '1508783'
  },
  {
    name: '金龙送宝',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/fortune-dragon/WGBG-78525c39.jpg',
    code: '1695365'
  },
  {
    name: '寻龙探宝2',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/dragon-hatch2/WGBG-f748ba66.jpg',
    code: '1451122'
  },
  {
    name: '狼人传奇',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/werewolf-hunt/WGBG-b5a6b92e.jpg',
    code: '1615454'
  },
  {
    name: '黑帮风云',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/mafia-mayhem/WGBG-ad954edc.jpg',
    code: '1580541'
  },
  {
    name: '铸造大师',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/forge-wealth/WGBG-24ebaad9.jpg',
    code: '1555350'
  },
  {
    name: '怪盗神偷',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/wild-heist-co/WGBG-a373f9d3.jpg',
    code: '1568554'
  },
  {
    name: '忍者小浣熊',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/ninja-raccoon/WGBG-7ddf70cc.jpg',
    code: '1529867'
  },
  {
    name: '角斗士荣耀',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/gladi-glory/WGBG-d14bb74a.jpg',
    code: '1572362'
  },
  {
    name: '皇家游轮',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/cruise-royale/WGBG-245188e4.jpg',
    code: '1473388'
  },
  {
    name: '水果甜心',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/fruity-candy/WGBG-779625ce.jpg',
    code: '1397455'
  },
  {
    name: '超级高尔夫',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/spr-golf-drive/WGBG-400548fd.jpg',
    code: '1513328'
  },
  {
    name: '元素精灵',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/myst-spirits/WGBG-4ee575d4.jpg',
    code: '1432733'
  },
  {
    name: '泰嗨泼水节',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/songkran-spl/WGBG-26faa3c5.jpg',
    code: '1448762'
  },
  {
    name: '烘焙总动员',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/bakery-bonanza/WGBG-53e16c1f.jpg',
    code: '1418544'
  },
  {
    name: '金钱兔',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/fortune-rabbit/WGBG-824e242f.jpg',
    code: '1543462'
  },
  {
    name: '点石成金',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/midas-fortune/WGBG-2cf611e2.jpg',
    code: '1402846'
  },
  {
    name: '美食美刻',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/diner-delights/WGBG-1d3489a9.jpg',
    code: '1372643'
  },
  {
    name: '炼金工坊',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/alchemy-gold/WGBG-ac326465.jpg',
    code: '1368367'
  },
  {
    name: '维京纪元',
    icon: 'https://public.x1skf.com/pages/static/image/zh/NewWebGameBg/asgardian-rs/WGBG-fda6c086.jpg',
    code: '1340277'
  },
  {
    name: '图腾奇迹',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/totem-wonders/WGBG-05786d26.jpg',
    code: '1338274'
  },
  {
    name: '极速赢家',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/speed-winner/WGBG-ff4c958a.jpg',
    code: '127'
  },
  {
    name: '珀尔修斯传奇',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/legend-perseus/WGBG-a4d12900.jpg',
    code: '128'
  },
  {
    name: '发财鱼虾蟹',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/win-win-fpc/WGBG-0e9e8132.jpg',
    code: '129'
  },
  {
    name: '蝶恋花',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/btrfly-blossom/WGBG-357ca4ea.jpg',
    code: '125'
  },
  {
    name: '电玩金猪',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/lucky-piggy/WGBG-067d0bc9.jpg',
    code: '130'
  },
  {
    name: '斗鸡',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/rooster-rbl/WGBG-7440f895.jpg',
    code: '123'
  },
  {
    name: '绝地大逃杀',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/battleground/WGBG-7a2235e0.jpg',
    code: '124'
  },
  {
    name: '虎虎生财',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/fortune-tiger/WGBG-8a0ee67c.jpg',
    code: '126'
  },
  {
    name: '神鹰宝石',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/garuda-gems/WGBG-a4e9b367.jpg',
    code: '122'
  },
  {
    name: '日月星辰',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/dest-sun-moon/WGBG-2f8c4d8a.jpg',
    code: '121'
  },
  {
    name: '假面嘉年华',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/mask-carnival/WGBG-58a5548e.jpg',
    code: '118'
  },
  {
    name: '韩宫御宴',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/queen-banquet/WGBG-2b28f462.jpg',
    code: '120'
  },
  {
    name: '江山美景图',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/oriental-pros/WGBG-3eb34640.jpg',
    code: '112'
  },
  {
    name: '百鬼夜行',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/spirit-wonder/WGBG-540eab3e.jpg',
    code: '119'
  },
  {
    name: '夜醉佳人',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/cocktail-nite/WGBG-786234c0.jpg',
    code: '117'
  },
  {
    name: '钞级表情包',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/emoji-riches/WGBG-5da29a8c.jpg',
    code: '114'
  },
  {
    name: '超市大血拼',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/sprmkt-spree/WGBG-d6615dc8.jpg',
    code: '115'
  },
  {
    name: '丽影奇兵之探秘埃及',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/crypt-fortune/WGBG-f3d5f284.jpg',
    code: '113'
  },
  {
    name: '恐龙帝国',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/jurassic-kdm/WGBG-852af55e.jpg',
    code: '110'
  },
  {
    name: '人鱼公主',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/mermaid-riches/WGBG-b2db9c50.jpg',
    code: '102'
  },
  {
    name: '宝石传奇',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/majestic-ts/WGBG-3fe594a6.jpg',
    code: '95'
  },
  {
    name: '太阳神传说',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/rise-of-apollo/WGBG-97017650.jpg',
    code: '101'
  },
  {
    name: '糖心风暴',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/candy-bonanza/WGBG-65e00f30.jpg',
    code: '100'
  },
  {
    name: '冰锋奇侠',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/jack-frosts/WGBG-3c2dabf2.png',
    code: '97'
  },
  {
    name: '冰火双娇',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/gdn-ice-fire/WGBG-4d347c26.jpg',
    code: '91'
  },
  {
    name: '巴厘之旅',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/bali-vacation/WGBG-bb6de09c.png',
    code: '94'
  },
  {
    name: '新国粹',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/opera-dynasty/WGBG-3df179bd.jpg',
    code: '93'
  },
  {
    name: '金玉满堂',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/jewels-prosper/WGBG-74984401.jpg',
    code: '88'
  },
  {
    name: '艳后之谜',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/sct-cleopatra/WGBG-5a571ba0.jpg',
    code: '90'
  },
  {
    name: '德古拉女爵',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/vampires-charm/WGBG-e1ece64c.jpg',
    code: '58'
  },
  {
    name: '星旅淘金',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/galactic-gems/WGBG-7d43912c.jpg',
    code: '86'
  },
  {
    name: '欢乐嘉年华',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/circus-delight/WGBG-6f1268e7.jpg',
    code: '80'
  },
  {
    name: '澳门壕梦',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/dreams-of-macau/WGBG-4d0666af.jpg',
    code: '79'
  },
  {
    name: '凤凰传奇',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/phoenix-rises/WGBG-d75b447c.jpg',
    code: '82'
  },
  {
    name: '福运象财神',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/ganesha-fortune/WGBG-591278b7.jpg',
    code: '75'
  },
  {
    name: '糖果连连爆',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/candy-burst/WGBG-3b16fea6.jpg',
    code: '70'
  },
  {
    name: '少林足球',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/shaolin-soccer/WGBG-f7ef7ecf.jpg',
    code: '67'
  },
  {
    name: '鼠鼠福福',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/fortune-mouse/WGBG-da1aece4.jpg',
    code: '68'
  },
  {
    name: '亲爱的',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/reel-love/WGBG-e1188ab6.jpg',
    code: '20'
  },
  {
    name: '龙虎争霸',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/dragon-tiger-luck/WGBG-6b0882f9.jpg',
    code: '63'
  },
  {
    name: '拳霸',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/muay-thai-champion/WGBG-662422d0.jpg',
    code: '64'
  },
  {
    name: '宝石侠 - 宝藏征途',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/gem-saviour-conquest/WGBG-cd7fe5e8.jpg',
    code: '62'
  },
  {
    name: '唐伯虎点秋香',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/flirting-scholar/WGBG-7c2b8537.jpg',
    code: '61'
  },
  {
    name: '爱尔兰精灵',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/leprechaun-riches/WGBG-ad01f87a.jpg',
    code: '60'
  },
  {
    name: '忍者vs武侍',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/ninja-vs-samurai/WGBG-7e386636.jpg',
    code: '59'
  },
  {
    name: '冰雪大冲关',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/the-great-icescape/WGBG-d23ec608.jpg',
    code: '53'
  },
  {
    name: '双囍临门',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/double-fortune/WGBG-84cabc82.jpg',
    code: '48'
  },
  {
    name: '嘻游记',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/journey-to-the-wealth/WGBG-9276a38a.jpg',
    code: '50'
  },
  {
    name: '皇上吉祥',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/emperors-favour/WGBG-a6528b1d.jpg',
    code: '44'
  },
  {
    name: '水果丛林',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/jungle-delight/WGBG-cf279187.jpg',
    code: '40'
  },
  {
    name: '象财神',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/ganesha-gold/WGBG-85ae7954.jpg',
    code: '42'
  },
  {
    name: '金猪报财',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/piggy-gold/WGBG-3000b0f3.jpg',
    code: '39'
  },
  {
    name: '宝石侠 - 大宝剑',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/gem-saviour-sword/WGBG-70f6fd91.jpg',
    code: '38'
  },
  {
    name: '至尊百家乐',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/baccarat-deluxe/WGBG-c1637441.jpg',
    code: '31'
  },
  {
    name: '横财来啦',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/fortune-gods/WGBG-870a6149.jpg',
    code: '3'
  },
  {
    name: '摇钱树',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/fortune-tree/WGBG-113e6966.jpg',
    code: '26'
  },
  {
    name: '嘻哈熊猫',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/hip-hop-panda/WGBG-903e5c24.jpg',
    code: '33'
  },
  {
    name: '舞狮进宝',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/prosperity-lion/WGBG-096d0597.jpg',
    code: '36'
  },
  {
    name: '后羿射日',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/legend-of-hou-yi/WGBG-875d659c.jpg',
    code: '34'
  },
  {
    name: '万胜狂欢夜',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/mr-hallow-win/WGBG-881725d0.jpg',
    code: '35'
  },
  {
    name: '逆袭的小红帽',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/hood-wolf/WGBG-9b6ff939.jpg',
    code: '18'
  },
  {
    name: '麻辣火锅',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/hotpot/WGBG-82707b6f.jpg',
    code: '28'
  },
  {
    name: '鱼跃龙门',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/dragon-legend/WGBG-235ef9bc.jpg',
    code: '29'
  },
  {
    name: '宝石侠',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/gem-saviour/WGBG-7a955da6.jpg',
    code: '2'
  },
  {
    name: '抓抓乐',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/plushie-frenzy/WGBG-2ba81075.jpg',
    code: '25'
  },
  {
    name: '美杜莎： 雅典娜的诅咒',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/medusa/WGBG-d1bcce38.jpg',
    code: '7'
  },
  {
    name: '美杜莎2：珀修斯的任务',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/medusa2/WGBG-7d9891d3.jpg',
    code: '6'
  },
  {
    name: '旺旺旺',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/win-win-won/WGBG-8bff8092.jpg',
    code: '24'
  },
  {
    name: '夜戏貂蝉',
    icon: 'https://public.x1skf.com/pages/static/image/en/NewWebGameBg/diaochan/WGBG-a6ce657b.jpg',
    code: '1'
  }
]

// let sum = 0
// const arr = []
// for (const p2item of pgList2) {
//   const f = pgList.find((item) => item.code === p2item.code)
//   if (f) sum++
// }
// alert(sum)
// for (const pitem of pgList) {
//   const f = pgList2.find((item) => item.code === pitem.code)
//   if (f) sum++
//   arr.push(f)
// }
// console.log(arr)
//
// // for (let i = pgList2.length-1; i >=0; i--) {
// //   const f=pgList2.findIndex(item=>)
// // }
// alert(sum)
const toGame = (plat, code) => {
  // Toast({
  //   theme: 'loading',
  //   message: '加载中...',
  //   duration: 0
  // })
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  // reqNgPlay(code)
  // reqNgPlayCode().then((res) => {
  //   console.log('reqNgPlayCode', res)
  // })
  reqNgPlay({
    code,
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
      closeToast()
      // Toast.clear()
    })
}
onActivated(() => {
  // Toast({
  //   theme: 'loading',
  //   message: '加载中...',
  //   duration: 0
  // })
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  reqNgTransfer().then((res) => {
    closeToast()
    // Toast.clear()
  })
  reqNgTransfer({ plat: 'ky' }).then((res) => {
    closeToast()
    // Toast.clear()
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
        color: #000;
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
          color: #374777;
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
