<template>
  <div style="height: 100%; overflow: auto; background-color: #eeeff3">
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
    <div class="list">
      <div class="list-item" v-for="item of list">
        <div>
          <div class="info">
            <div title="金蛇招财" class="name">{{ item.name }}</div>
            <div class="online-no">{{ item.online }}人在线</div>
          </div>
          <div class="content">
            <div class="l">
              <div class="icon">
                <img :src="item.icon" class="" style="opacity: 1" />
              </div>
              <div class="detail ani">
                <div class="t">
                  <div class="value">{{ item.value }}倍</div>
                  <div class="label">最高赢奖倍数</div>
                </div>
                <div class="b">
                  <div class="rtp">
                    <div class="value">{{ item.rtp }}</div>
                    <div class="label">波动率</div>
                  </div>
                  <div class="right">
                    <div class="value">{{ item.return }}</div>
                    <div class="label">返还率</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="r">
              <div class="button" @click="toGame(item.code)">
                <div>立即游戏</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    <van-image-->
    <!--      lazy-load-->
    <!--      v-for="item of imgArr"-->
    <!--      :src="item"-->
    <!--      width="100%"-->
    <!--      @click="handleClick"-->
    <!--    ></van-image>-->
  </div>
</template>

<script lang="ts" setup>
import img1 from './images/quanminlaibaojiang/1.webp'
import img2 from './images/quanminlaibaojiang/2.webp'
import img3 from './images/quanminlaibaojiang/3.webp'
import img4 from './images/quanminlaibaojiang/4.webp'
import img5 from './images/quanminlaibaojiang/5.webp'
import img6 from './images/quanminlaibaojiang/6.webp'
import img7 from './images/quanminlaibaojiang/7.webp'
import img8 from './images/quanminlaibaojiang/8.webp'

// const handleClick = () => {
//   showDialog({
//     message:
//       '游戏正在开发中，预计元旦火热上线！\n' +
//       '\n' +
//       '每日推广佣金，可以用来进行游戏娱乐，中奖可提现，投入1块钱，最多可中奖30000（3万元）爆奖奖金！中奖，无任何附加条件，直接可提现！\n' +
//       '\n' +
//       '长期稳定，信誉，正规企业，合法合规!'
//   })
// }

// import rule from '@/assets/img/rule.jpg'
import { getIsInApp } from '@/utils/getTopPadding'
import { showImagePreview } from 'vant'
import { Toast } from 'tdesign-mobile-vue'
import { reqNgPlay } from '@/api/myApi'
import { showDialog, showFailToast } from 'vant'

// const showImage = () => {
//   showImagePreview([shareholder])
// }

const list = [
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
    name: '麻将胡了2',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img2,
    value: '100000',
    rtp: '中',
    return: '96.95%',
    code: '74'
  },
  {
    name: '少林足球',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img3,
    value: '4000',
    rtp: '中',
    return: '96.93%',
    code: '67'
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
    name: '赏金女王',
    online: Math.floor(Math.random() * 1000 + 1000),
    icon: img5,
    value: '50000',
    rtp: '中',
    return: '96.74%',
    code: '84'
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
  }
]

const toGame = (code) => {
  Toast({
    theme: 'loading',
    message: '加载中...',
    duration: 0
  })
  reqNgPlay(code)
    .then((res) => {
      console.log('reqNgPlay', res)
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
</script>
<style scoped lang="less">
.list {
  margin: 6px;

  .list-item {
    padding: 10px 8px;
    background-color: #fff;
    border-radius: 8px;
    margin-top: 10px;

    .info {
      width: 100%;
      justify-content: space-between;
      display: flex;
      height: 27px;

      .name {
        color: #424351;
        font-weight: 700;
        font-size: 16px;
      }

      .online-no {
        font-size: 10px;
        line-height: 12px;
        color: #b7b8c9;
        white-space: nowrap;
      }
    }

    .content {
      display: flex;
      justify-content: space-between;

      .l {
        display: flex;

        .icon {
          margin: 0 6px 0 4px;
          width: 90px;
          height: 90px;

          img {
            border-radius: 10px;
            width: 100%;
          }
        }

        .detail {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .t {
            .value {
              color: #424351;
              font-weight: 700;
              font-size: 13px;
            }

            .label {
              font-size: 10px;
              line-height: 11px;
              color: #b7b8c9;
              margin-top: 4px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .b {
            display: flex;

            .rtp {
              border-right: 1px solid rgba(183, 184, 201, 0.3);
              padding: 0 10px 0 0;

              .value {
                color: #424351;
                font-weight: 700;
                font-size: 13px;
              }

              .label {
                font-size: 10px;
                color: #b7b8c9;
                margin-top: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }

            .right {
              padding: 0 0 0 10px;

              .value {
                color: #424351;
                font-weight: 700;
                font-size: 13px;
              }

              .label {
                font-size: 10px;
                color: #b7b8c9;
                margin-top: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .r {
        display: flex;
        flex-direction: column-reverse;

        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 84, 254, 0.15);
          border: 1px solid rgba(0, 84, 254, 0.2);
          color: #0054fe;
          border-radius: 4px;
          font-size: 12px;
          padding: 8px 12px;
        }
      }
    }
  }
}
</style>
