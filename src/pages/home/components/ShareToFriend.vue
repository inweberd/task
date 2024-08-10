<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="cancel"
    maskMode="light"
    :height="height"
  >
    <div class="content" :style="{ minHeight: height }">
      <div class="create-chat" v-show="!showJoinedChat">
        <Search
          :isShowRightText="isShowRightText"
          @click="handleClick"
          @notice="onNotice"
          rightText="取消"
          rightTextColor="gray"
          placeholder="搜索"
          v-model="searchKey"
        />
        <template v-if="searchKey">
          <div class="friend-list" v-if="searchResult.length">
            <div
              class="friend-item"
              :key="i"
              v-for="(item, i) in searchResult"
              @click="handleClick2(item)"
            >
              <img class="left" v-lazy="_checkImgUrl(item.avatar)" alt="" />
              <div class="right">
                <div class="info">
                  <span class="name">
                    <span v-if="item.name.indexOf(searchKey) > -1">
                      {{ item.name.substr(0, item.name.indexOf(searchKey))
                      }}<span style="color: #fc2f56">{{ searchKey }}</span
                      >{{ item.name.substr(item.name.indexOf(searchKey) + searchKey.length) }}
                    </span>
                    <span v-else>{{ item.name }}</span>
                  </span>
                </div>
                <dy-button :type="item.shared ? 'dark' : 'primary'" @click="item.shared = true">
                  {{ item.shared ? '已' : '' }}分享
                </dy-button>
              </div>
            </div>
          </div>
          <div class="no-result" v-else>
            <div class="notice-h1">搜索结果为空</div>
            <div class="notice-h2">没有搜索到相关的联系人</div>
          </div>
        </template>
        <template v-else>
          <div class="joined-chat-group-nav" @click="showJoinedChat = true">
            <img class="left" src="../../../assets/img/icon/people-gray.png" alt="" />
            <div class="right">
              <span>已加入的群聊</span>
              <dy-back direction="right" mode="gray" scale=".7" />
            </div>
          </div>
          <div class="friend-list">
            <div class="index">所有朋友</div>
            <div class="friend-item" :key="i" v-for="(item, i) in localFriends">
              <img class="left" v-lazy="_checkImgUrl(item.avatar)" alt="" />
              <div class="right">
                <span>{{ item.name }}</span>
                <dy-button :type="item.shared ? 'dark' : 'primary'" @click="item.shared = true">
                  {{ item.shared ? '已' : '' }}分享
                </dy-button>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="joined-chat-group" v-show="showJoinedChat">
        <div class="nav">
          <dy-back @click="showJoinedChat = false" mode="light" scale="1"></dy-back>
          <span>已加入的群聊</span>
          <span>&nbsp;</span>
        </div>

        <div class="chat-list">
          <div class="chat-item" :key="i" v-for="(item, i) in localFriends">
            <img class="left" v-lazy="_checkImgUrl(item.avatar)" alt="" />
            <div class="right">
              <div class="title">
                <div class="name">{{ text }}</div>
                <div class="num">(3)</div>
              </div>
              <dy-button :type="item.shared ? 'dark' : 'primary'" @click="item.shared = true">
                {{ item.shared ? '已' : '' }}分享
              </dy-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>
<script>
import FromBottomDialog from '../../../components/dialog/FromBottomDialog'
import { mapState } from 'pinia'
import Search from '../../../components/Search'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, cloneDeep } from '@/utils'
/*
分享给朋友
* */
export default {
  name: 'ShareTo',
  components: {
    FromBottomDialog,
    Search
  },
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    },
    pageId: {
      type: String,
      default: 'home-index'
    }
  },
  data() {
    return {
      height: '70vh',
      showJoinedChat: false,
      isShowRightText: false,
      text: 'AAAAAAA、BBBBBBBB、CCCCCCCCCCCCC',
      localFriends: [],
      searchResult: [],
      searchKey: ''
    }
  },
  watch: {
    searchKey(newVal) {
      if (newVal) {
        let temp = cloneDeep(this.localFriends)
        this.searchResult = temp.filter((v) => {
          // return v.name.includes(newVal) || v.account.includes(newVal);
          return v.name.includes(newVal)
        })
      } else {
        this.searchResult = []
      }
    },
    modelValue(newVal) {
      if (newVal) {
        this.localFriends = cloneDeep(this.friends.all)
        this.localFriends.map((v) => (v.shared = false))
      } else {
        this.searchKey = ''
        this.height = '70vh'
        this.isShowRightText = false
        this.showJoinedChat = false
      }
    }
  },
  computed: {
    ...mapState(useBaseStore, ['friends']),
    selectFriends() {
      return this.localFriends.filter((v) => v.shared)
    }
  },
  created() {},
  methods: {
    _checkImgUrl,
    handleClick() {
      this.isShowRightText = true
      this.height = 'calc(var(--vh, 1vh) * 100)'
    },
    handleClick2(item) {
      item.select = !item.select
      this.searchKey = ''
    },
    onNotice() {
      this.isShowRightText = false
      this.searchKey = ''
      this.height = '70vh'
    },
    cancel() {
      this.height = '70vh'
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.button {
  width: 64px;
  height: 26px !important;
}

@avatar-width: 38px;

.friend-list {
  padding: 0 15px;

  .index {
    color: var(--second-text-color);
    height: 60px;
    line-height: 60px;
    font-size: 13px;
  }

  .friend-item {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    //background: #fff;

    &:nth-child(1) {
      margin-top: 10px;
    }

    .left {
      width: @avatar-width;
      height: @avatar-width;
      border-radius: 50%;
      margin-right: 15px;
    }

    .right {
      font-size: 14px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        height: 20px;
      }
    }
  }
}

.content {
  color: white;

  .create-chat {
    padding-bottom: 40px;
    background: var(--main-bg);

    .search-ctn {
      padding: 0 15px;
    }

    .joined-chat-group-nav {
      border-bottom: 1px solid var(--line-color);
      height: 50px;
      padding: 0 15px;
      display: flex;
      align-items: center;

      .left {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }

      .right {
        font-size: 14px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .btn-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--main-bg);
      //background: red;
      display: flex;
      align-items: center;
      justify-content: center;

      .btn {
        margin-bottom: 20px;
        width: calc(100% - 40px);
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 14px;
        justify-content: center;
        background: #3f445c;
        border-radius: 2px;

        &.primary {
          background: var(--primary-btn-color);
        }
      }
    }

    .no-result {
      height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .notice-h1 {
        font-size: 16px;
      }

      .notice-h2 {
        margin-top: 10px;
        font-size: 14px;
        color: var(--second-text-color);
      }
    }
  }

  .joined-chat-group {
    background: var(--main-bg);

    .nav {
      font-size: 16px;
      padding: 15px;
      display: flex;
      justify-content: space-between;
    }

    .chat-list {
      padding: 0 15px;

      .chat-item {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;

        &:nth-last-child(1) {
          margin-bottom: 0;
        }

        &:nth-child(1) {
          margin-top: 10px;
        }

        .left {
          width: @avatar-width;
          height: @avatar-width;
          border-radius: 50%;
          margin-right: 15px;
        }

        .right {
          font-size: 14px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title {
            width: 55vw;
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            .name {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            .num {
              margin-left: 5px;
              color: var(--second-text-color);
            }
          }

          img {
            height: 15px;
          }
        }
      }
    }
  }
}
</style>
