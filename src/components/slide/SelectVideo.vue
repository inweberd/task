<template>
  <div class="SelectVideo SelectVideoClass" @click.stop="showSelect">
    <div class="select-container">
      <div class="info">
        <span>选集</span>
        <span> · </span>
        <span>全{{ dataInfo?.shortPlayNum || 0 }}集</span>
        <span> · </span>
        <span>永久免费</span>
      </div>
      <div class="icon">
        <van-icon name="arrow-up" size="14" />
      </div>
    </div>
  </div>
  <van-popup v-model:show="showPopup" position="bottom">
    <div class="short-info">
      <div class="short-info-desc">
        <div class="short-info-desc-l">
          <div class="pic">
            <!--            <img-->
            <!--              src="https://img1.baidu.com/it/u=3518673092,2032183538&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1720026000&t=303e5dcea62618c83e137f06be50ef71"-->
            <!--              alt=""-->
            <!--            />-->
            <img
              v-lazy="_checkImgUrl(dataInfo.video?.cover?.url_list?.[0])"
              alt=""
              class="poster"
            />
          </div>
          <div class="title">
            <div class="title-t">{{ dataInfo.desc }}</div>
            <div class="title-b">
              <div class="tag">永久免费</div>
              <div class="total">已完结 共{{ dataInfo?.shortPlayNum || 0 }}集</div>
            </div>
          </div>
        </div>
        <!--        <div class="short-info-desc-r">追剧</div>-->
      </div>
      <div class="short-info-tab">
        <div
          class="tab-item"
          :class="{ active: index === activeTab }"
          v-for="(item, index) of tabArr"
          @click="activeTab = index"
        >
          {{ item[0] }}-{{ item[item.length - 1] }}
        </div>
      </div>
      <div class="num-box">
        <div class="num-item" v-for="(item, index) of numArr">
          <div class="num" :class="{ active: item === activeNum }" @click="changeVideo(item)">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, defineEmits } from 'vue'
import { _checkImgUrl } from '@/utils'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue', 'change', 'reset'])
const dataInfo = computed({
  get: () => {
    return props.modelValue
  },
  set: (val: string) => {
    emits('update:modelValue', val)
  }
})
setTimeout(() => {
  console.log('dataInfo', dataInfo.value)
}, 3000)
const showPopup = ref(false)

const activeNum = ref(1)
const activeTab = ref(0)
const tabArr = computed(() => {
  const arr = []
  for (let i = 0; i < dataInfo.value?.shortPlayNum || 0; i++) {
    if (!(i % 30)) {
      arr.push([])
    }
    arr[arr.length - 1].push(i + 1)
  }
  return arr
})

const numArr = computed(() => {
  return tabArr.value[activeTab.value]
})

const showSelect = () => {
  showPopup.value = true
}

const changeVideo = (item) => {
  activeNum.value = item
  dataInfo.value.video.play_addr.url_list[0] = dataInfo.value.shortPlayList[item - 1]
}
</script>

<style scoped lang="less">
.SelectVideoClass {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #000;
  height: var(--footer-height);
  display: flex;
  align-items: center;
  justify-content: center;

  .select-container {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    background-color: #1a1a1a;
    color: #f1ebeb;
    height: 40px;
    width: 80%;
    border-radius: 6px;
  }
}
.short-info {
  padding: 20px;
  &-desc {
    display: flex;
    justify-content: flex-start;
    &-l {
      display: flex;
      .pic {
        width: 60px;
        height: 80px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        margin-left: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        &-t {
          font-size: 20px;
          color: #000;
          font-weight: bolder;
        }
        &-b {
          display: flex;
          align-items: center;
          .tag {
            color: #67c23a;
            padding: 4px 6px;
            font-size: 12px;
            background-color: #f0f9eb;
            border-radius: 5px;
            overflow: hidden;
          }
          .total {
            margin-left: 8px;
            color: #aaa;
          }
        }
      }
    }
    &-r {
    }
  }

  &-tab {
    margin: 20px 0;
    display: flex;
    width: 100%;
    overflow-y: auto;

    .tab-item {
      font-size: 16px;
      color: #bdbbbb;
      margin-right: 20px;

      &.active {
        color: #000;
        font-weight: bolder;
      }
    }
  }
  .num-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 8px;
    .num-item {
      text-align: center;
      .num {
        //width: fit-content;
        background-color: #f7f7f7;
        padding: 14px;

        &.active {
          background-color: #efded6;
          color: #f60;
        }
      }
    }
  }
}
</style>
