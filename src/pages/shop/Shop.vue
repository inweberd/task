<template>
  <div id="Shop">
    <div class="wrapper">
      <div class="search">
        <div class="search-input">
          <Icon icon="tabler:search" />
          <div class="placeholder">50元话费充值</div>
          <Icon color="gray" icon="lucide:camera" />
          <div class="search-notice">搜索</div>
        </div>
        <div class="more">
          <Icon icon="ep:shopping-cart" />
        </div>
      </div>
    </div>
    <ScrollList class="Scroll" :api="recommendedShop">
      <template v-slot="{ list }">
        <div class="top-card">
          <div class="card">
            <div class="options">
              <div class="option" @click="_no">
                <Icon icon="lets-icons:order-light" />
                <div>我的订单</div>
              </div>
              <div class="option" @click="_no">
                <Icon icon="material-symbols-light:charging-station-outline" />
                <div>手机充值</div>
              </div>
              <div class="option" @click="_no">
                <Icon icon="system-uicons:message" />
                <div>购物消息</div>
              </div>
              <div class="option" @click="_no">
                <Icon icon="fluent:location-16-regular" />
                <div>小时达</div>
              </div>
              <div class="option" @click="_no">
                <Icon icon="dashicons:money-alt" />
                <div>退款/售后</div>
              </div>
              <div class="option" @click="_no">
                <Icon icon="icon-park-outline:clothes-turtleneck" />
                <div>潮流服饰</div>
              </div>
            </div>
          </div>
          <div class="card" style="margin-bottom: 5px">
            <div class="baiyibutie">
              <div class="item">
                <img src="@/assets/img/icon/shop/baiyibutie.png" alt="" />
                <span>38节补贴</span>
              </div>
              <div class="item">
                <img src="@/assets/img/icon/shop/1.webp" alt="" />
                <span class="price">
                  <span class="m">￥</span>
                  <span>470</span>
                </span>
              </div>
              <div class="item">
                <img src="@/assets/img/icon/shop/2.webp" alt="" />
                <span class="price">
                  <span class="m">￥</span>
                  <span>699</span>
                </span>
              </div>
              <div class="item">
                <img src="@/assets/img/icon/shop/3.png" alt="" />
                <span class="price">
                  <span class="m">￥</span>
                  <span>8.8</span>
                </span>
              </div>
              <div class="item">
                <img src="@/assets/img/icon/shop/4.jpg" alt="" />
                <span class="price">
                  <span class="m">￥</span>
                  <span>2.99</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <WaterfallList :list="list">
          <template v-slot="{ item }">
            <div class="goods" @click="nav('/shop/detail', {}, item)">
              <div class="item">
                <img class="poster" v-lazy="_checkImgUrl('goods/' + item.cover)" />
                <div class="bottom">
                  <div class="desc">
                    {{ item.name }}
                  </div>
                  <div class="discounts" v-if="item.discount">
                    {{ item.discount }}
                  </div>
                  <div class="info">
                    <div class="price">
                      ￥
                      <div class="big">{{ item.price }}</div>
                    </div>
                    <div class="num">已售{{ item.sold }}件</div>
                  </div>
                  <div class="low" v-if="item.isLowPrice">近30天低价</div>
                </div>
              </div>
            </div>
          </template>
        </WaterfallList>
      </template>
    </ScrollList>
    <BaseFooter v-bind:init-tab="2" :is-white="true" style="position: fixed; left: 0" />
  </div>
</template>

<script setup lang="tsx">
import { useNav } from '@/utils/hooks/useNav'
import { _checkImgUrl, _no } from '@/utils'
import ScrollList from '@/components/ScrollList.vue'
import { recommendedShop } from '@/api/user'
import WaterfallList from '@/components/WaterfallList.vue'

defineOptions({
  name: 'Shop'
})

const nav = useNav()
</script>

<style scoped lang="less">
@fColor: #f1f1f1;

#Shop {
  font-size: 14px;
  position: relative;
  background: #f8f8f8;
  padding: 10px;
  color: black;

  .wrapper {
  }

  .search {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    height: 36px;
    box-sizing: border-box;
    margin-bottom: 10px;

    svg {
      color: gray;
      font-size: 20px;
    }

    .search-input {
      border: 2px solid red;
      border-radius: 12px;
      height: 100%;
      padding: 0 10px;
      padding-right: 3px;
      flex: 1;
      gap: 10px;
      display: flex;
      align-items: center;

      .placeholder {
        flex: 1;
      }

      img {
        margin-right: 10px;
      }

      .search-notice {
        background: rgb(242, 62, 92);
        padding: 0 10px;
        height: 85%;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }

    .more {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
    }
  }

  .card {
    background: white;
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  .options {
    display: flex;
    overflow-x: auto;
    box-sizing: border-box;

    .option {
      width: 17vw;
      flex-shrink: 0;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      svg {
        font-size: 30px;
        margin-bottom: 3px;
      }
    }
  }

  .baiyibutie {
    display: flex;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      font-size: 12px;
      color: gray;

      img {
        width: 80%;
      }

      .price {
        color: red;
        font-size: 16px;
        font-weight: bold;

        .m {
          font-size: 10px;
        }
      }
    }
  }

  .Scroll {
    position: relative;
    z-index: 2;
    height: calc(var(--vh, 1vh) * 100 - var(--footer-height) * 2) !important;
  }

  .fixed {
    background: @fColor;
  }

  .top-card {
    margin-bottom: 10px;
  }

  @p: 5px;

  .goods {
    box-sizing: border-box;
    margin-bottom: 10px;

    .item {
      border-radius: 8px;
      overflow: hidden;
      background: white;

      img {
        width: 100%;
      }

      .bottom {
        padding: 10px;

        .desc {
          color: black;
          font-size: 16px;
          margin-bottom: 8px;
          @lh: 18px;
          line-height: @lh;
          height: @lh * 2;
          overflow: hidden;
        }

        .discounts {
          display: inline-block;
          @c: rgb(199, 89, 106);
          border: 1px solid @c;
          padding: 0 4px;
          color: @c;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .info {
          display: flex;
          align-items: flex-end;

          .price {
            color: rgb(248, 38, 74);
            display: flex;
            align-items: flex-end;
            font-size: 14px;
            margin-right: 5px;

            .big {
              font-size: 22px;
              font-weight: bold;
              transform: translateY(2px);
            }
          }

          .num {
            color: darkgray;
            font-size: 12px;
          }
        }

        .low {
          margin-top: 2px;
          color: rgb(230, 153, 92);
        }
      }
    }
  }
}
</style>
