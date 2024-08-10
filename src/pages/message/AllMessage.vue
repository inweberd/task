<template>
  <div id="AllMessage">
    <BaseHeader :is-fixed="false">
      <template v-slot:center>
        <div class="center" @click="data.isShowType = !data.isShowType">
          <span class="f16">{{ showTypeText }}</span>
          <img
            :class="{ show: data.isShowType }"
            src="@/assets/img/icon/arrow-up-white.png"
            alt=""
          />
        </div>
      </template>
    </BaseHeader>
    <transition name="fade">
      <div class="type-dialog" v-if="data.isShowType">
        <div class="dialog-content">
          <div class="row" @click="toggleShowType(1)">
            <div class="left">
              <img src="@/assets/img/icon/message/done-gray.png" alt="" />
              <span>全部消息</span>
            </div>
          </div>
          <div class="row" @click="toggleShowType(2)">
            <div class="left">
              <img src="@/assets/img/icon/message/like-gray.png" alt="" />
              <span>赞</span>
            </div>
          </div>
          <div class="row" @click="toggleShowType(3)">
            <div class="left">
              <img src="@/assets/img/icon/message/call-gray.png" alt="" />
              <span>@我的</span>
            </div>
          </div>
          <div class="row" @click="toggleShowType(4)">
            <div class="left">
              <img src="@/assets/img/icon/message/comment-gray.png" alt="" />
              <span>评论</span>
            </div>
          </div>
        </div>
        <div class="mask" @click="data.isShowType = false"></div>
      </div>
    </transition>
    <Scroll ref="mainScroll">
      <div class="messages">
        <div
          class="message"
          v-for="(item, i) in store.friends.all"
          :key="i"
          @click="nav('/message/visitors')"
        >
          <div class="left">
            <img v-lazy="_checkImgUrl(item.avatar)" alt="" class="avatar" />
          </div>
          <div class="right">
            <div class="desc">
              <div class="name">{{ item.name }}</div>
              <div class="bottom">
                <div class="desc-content">近期访问过你的主页</div>
                <div class="time">01-11</div>
              </div>
            </div>
            <img
              v-lazy="_checkImgUrl(store.userinfo.cover_url[0].url_list[0])"
              alt=""
              class="poster"
            />
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script setup lang="ts">
import Scroll from '@/components/Scroll.vue'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl } from '@/utils'

import { computed, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'

defineOptions({
  name: 'AllMessage'
})

const store = useBaseStore()
const nav = useNav()
const data = reactive({
  isShowType: false,
  selectShowType: 1
})

const showTypeText = computed(() => {
  switch (data.selectShowType) {
    case 1:
      return '全部消息'
    case 2:
      return '赞'
    case 3:
      return '@我的'
    case 4:
      return '评论'
    default:
      return ''
  }
})

function toggleShowType(index) {
  data.selectShowType = index
  data.isShowType = false
}
</script>

<style scoped lang="less">
#AllMessage {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: var(--color-message);
  overflow: auto;
  color: white;
  font-size: 14px;
  display: flex;
  flex-direction: column;

  .center {
    display: flex;
    align-items: center;

    img {
      width: 15px;
      transform: rotate(180deg);
      transition: all 0.3s;
      margin-left: 3px;
    }

    .show {
      transform: rotate(0deg);
    }
  }

  .type-dialog {
    z-index: 9;
    position: fixed;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    margin-top: var(--common-header-height);

    .dialog-content {
      border-radius: 0 0 4px 4px;
      background: var(--color-message);
      overflow: hidden;

      img {
        width: 18px;
      }
    }

    .mask {
      z-index: 8;
      position: fixed;
      height: calc(var(--vh, 1vh) * 100);
      width: 100vw;
      background: var(--mask-dark);
    }
  }

  .scroll {
    flex: 1;
    padding: 0 10px;
  }

  .messages {
    .message {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;

      &:first-child {
        margin-top: 20px;
      }

      .left {
        display: flex;
        align-items: center;
        position: relative;

        .avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
        }
      }

      .right {
        flex: 1;
        display: flex;
        justify-content: space-between;

        .desc {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          color: white;
          font-size: 16px;

          .bottom {
            display: flex;
            align-items: center;
            font-size: 13px;
            color: lightgrey;

            .time {
              font-size: 12px;
              margin-left: 10px;
              color: var(--second-text-color);
            }
          }
        }

        .poster {
          margin-left: 10px;
          width: 58px;
          height: 70px;
          object-fit: cover;
          border-radius: 3px;
        }
      }
    }

    .look-all {
      font-size: 12px;
      color: var(--second-text-color);
      display: flex;
      justify-content: center;
      align-items: center;

      .close {
        margin-left: 10px;
        transform: rotate(270deg) !important;
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>
