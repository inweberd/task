<script setup>
import { reactive, ref, watch } from 'vue'
import { _checkImgUrl, _duration, _formatNumber, _stopPropagation, cloneDeep } from '@/utils'
import { recommendedLongVideo, shortPlayVideo } from '@/api/videos'
import ScrollList from '@/components/ScrollList.vue'
import { useNav } from '@/utils/hooks/useNav'
import SlideItem from '@/components/slide/SlideItem.vue'
import { useBaseStore } from '@/store/pinia'

const router = useRouter()
const tab = ref([
  // { name: '关注', id: 1 },
  { name: '推荐', id: 2 },
  { name: '历史观看', id: 3 }
  // { name: '短剧', id: 4 },
  // { name: '图文', id: 5 },
  // { name: '平顶山', id: 6 }
])

const nav = useNav()
const key = ref(0)
const activeTab = ref(2)
const tabClick = (value) => {
  activeTab.value = value
  key.value++
}
const store = useBaseStore()

const toShortDetail = (path, query, data) => {
  console.log('data', data)
  data = JSON.parse(JSON.stringify(data))
  data.dateInfo.videoList = data.dateInfo.videoList.map((item, index) => {
    const { id, title, total, playCount, cover } = data.dateInfo
    return {
      id,
      title,
      total,
      playCount,
      cover,
      currentPlayUrl: item,
      no: index,
      type: 'shortPlayVideo'
    }
  })
  // console.log('dataList', dataList)
  // store.routeData = cloneDeep({ list: dataList, index: 0 })
  store.playVideoData = cloneDeep(data.dateInfo)
  router.push({ path, query })

  // if (data) {
  // }
  // router.push({ path, query })
}
</script>

<template>
  <SlideItem :key="key">
    <div class="navs">
      <div v-for="(item, index) in tab" :key="index">
        <div
          class="navItem"
          :class="{ activeIndex: activeTab == item.id }"
          @click="tabClick(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="long-video">
      <ScrollList class="Scroll" :api="shortPlayVideo">
        <template v-slot="{ list }">
          <div class="list" style="padding-top: 30px">
            <div
              class="item"
              :key="i"
              v-for="(item, i) in list"
              @click="toShortDetail('/shortPlayDetail', {}, { dateInfo: item, index: i })"
            >
              <img v-lazy="item.cover" alt="" class="poster" />
              <div class="duration">
                <van-icon name="play" />
                {{ item.playCount }}万
              </div>
              <div class="title">
                {{ item.title }}
              </div>
              <div class="bottom">
                <div class="l">
                  <div class="name">共{{ item.total || 0 }}集</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ScrollList>
    </div>
    <BaseFooter v-bind:init-tab="4" />
  </SlideItem>
</template>

<style scoped lang="less">
.navs {
  width: 90%;
  margin-left: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  .navItem {
    display: flex;
    margin-right: 10px;
    color: #fff;
    &.activeIndex {
      font-weight: bold;
      color: rgb(11, 87, 208);
    }
  }
}

.long-video {
  font-size: 14px;
  color: white;
  background: rgb(21, 23, 36);

  .Scroll {
    height: calc(var(--vh, 1vh) * 100 - var(--footer-height)) !important;
  }
}

.list {
  width: 96%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 2%;
  .item {
    position: relative;
    width: 32%;
    margin-bottom: 12px;
    .poster {
      border-radius: 12px;
      width: 100%;
      height: 160px;
      object-fit: cover;
    }

    .title {
      color: white;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 2px 0;
    }

    .f {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
    }

    .duration {
      color: white;
      position: absolute;
      bottom: 45px;
      left: 5px;
      font-size: 12px;
    }

    .bottom {
      color: gray;
      .f;
      font-size: 13px;
      .l {
        .f;
        justify-content: flex-start;

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 1; //显示的行
        }

        .avatar {
          @w: 20px;
          width: @w;
          height: @w;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }

    &.big {
      grid-column-start: 1;
      grid-column-end: 3;
      margin: 0;

      &.pause {
        .duration {
          display: block;
        }

        .options {
          display: none;
        }
      }

      .duration {
        display: none;
        bottom: 67px;
      }

      .title {
        height: unset;
        -webkit-line-clamp: 1;
      }

      .title,
      .bottom {
        padding: 0 10px;
      }
    }

    &.l {
      margin-right: 5px;
    }

    &.r {
      margin-left: 5px;
    }
  }
}
</style>
