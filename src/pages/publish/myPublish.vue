<template>
  <div class="publish">
    <van-nav-bar
      @click-left="$router.back()"
      fixed
      left-arrow
      placeholder
      safe-area-inset-top
      title="我发布的"
    >
      <!--      <template #right>-->
      <!--        &lt;!&ndash;                    <van-icon name="friends-o" size="18" @click="service = true" />&ndash;&gt;-->
      <!--        <span @click="$router.push('/publishIntroduce')"> 我发布的 </span>-->
      <!--      </template>-->
    </van-nav-bar>
    <!--    <van-search placeholder="请输入搜索关键词" />-->
    <div class="content">
      <!--      <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">-->
      <!--        <van-swipe-item>-->
      <!--          <img alt="" src="@/pages/home/images/banner1.jpg" />-->
      <!--        </van-swipe-item>-->
      <!--        <van-swipe-item> <img alt="" src="@/pages/home/images/banner2.jpg" /></van-swipe-item>-->
      <!--      </van-swipe>-->

      <!--      <van-divider-->
      <!--        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
      <!--        style="margin-top: 80px"-->
      <!--      ></van-divider>-->
      <!--      <van-divider-->
      <!--        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
      <!--        style="margin-top: 80px"-->
      <!--      ></van-divider>-->
      <!--      <van-divider-->
      <!--        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
      <!--        style="margin-top: 80px"-->
      <!--      ></van-divider>-->
      <!--      <van-divider-->
      <!--        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
      <!--        style="margin-top: 80px"-->
      <!--      ></van-divider>-->
      <!--      <van-divider-->
      <!--        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
      <!--        style="margin-top: 80px"-->
      <!--      ></van-divider>-->
      <!--      <van-divider-->
      <!--        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
      <!--        style="margin-top: 80px"-->
      <!--      ></van-divider>-->
      <!--      <van-divider-->
      <!--        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
      <!--        style="margin-top: 80px"-->
      <!--      ></van-divider>-->
      <div class="list">
        <div class="coupleta">
          <van-pull-refresh style="padding-top: 20px" v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="暂无数据"
              @load="getDataList"
            >
              <template v-for="(item, index) in dataList" :key="item.id">
                <!--              <div class="task top">-->
                <div class="task" :class="getClass(item)">
                  <div class="avatar">
                    <div class="img-box"><!----><img draggable="false" :src="avatar" /></div>
                  </div>
                  <div class="top">
                    <div class="title">{{ item.title }}</div>
                    <!--                  <div class="tag">游戏</div>-->
                  </div>
                  <div style="color: #999; padding: 8px 18px" v-if="item.content">
                    {{ item.content }}
                  </div>
                  <van-grid :border="false" :column-num="4" :gutter="1">
                    <van-grid-item v-for="sub_item in item.image.split(',')" :key="sub_item">
                      <van-image
                        @click="showImage(sub_item)"
                        :src="sub_item"
                        class="img-item"
                        fit="cover"
                        position="center"
                      />
                    </van-grid-item>
                    <!--                  <van-grid-item>-->
                    <!--                    <van-image :src="img7" class="img-item" fit="cover" position="center" />-->
                    <!--                  </van-grid-item>-->
                    <!--                  <van-grid-item>-->
                    <!--                    <van-image :src="img6" class="img-item" fit="cover" position="center" />-->
                    <!--                  </van-grid-item>-->
                    <!--                  <van-grid-item>-->
                    <!--                    <van-image :src="img1" class="img-item" fit="cover" position="center" />-->
                    <!--                  </van-grid-item>-->
                  </van-grid>
                  <div class="bottom">
                    <div class="visit">
                      <!--                    <van-icon name="eye-o" />-->
                      <!--                    3496人查看-->
                      <van-button
                        size="small"
                        type="primary"
                        style="margin-right: 10px"
                        @click="toTop(item)"
                        >置顶</van-button
                      >
                      <van-button @click="toRefresh(item)" size="small" type="success"
                        >刷新</van-button
                      >
                    </div>
                    <div class="date">{{ toDate(item.updateTime) }}</div>
                  </div>
                </div>
              </template>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>

      <div v-if="false" class="list" style="min-height: 50vh">
        <div class="coupleta">
          <div class="task top">
            <div class="avatar">
              <div class="img-box">
                <!----><img
                  draggable="false"
                  src="https://lx.aosenn.com/uploads/20240312/e64fece94f5a8f6a71298b50bfce0086.gif"
                />
              </div>
            </div>
            <div class="top">
              <div class="title">星钻世界</div>
              <div class="tag">游戏</div>
            </div>
            <van-grid :border="false" :column-num="4" :gutter="1">
              <van-grid-item>
                <van-image :src="img3" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img7" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img6" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img1" class="img-item" fit="cover" position="center" />
              </van-grid-item>
            </van-grid>
            <div class="bottom">
              <div class="visit">
                <van-icon name="eye-o" />
                3496人查看
              </div>
              <div class="date">2025-07-03 13:20</div>
            </div>
          </div>
          <div class="task top">
            <div class="avatar">
              <div class="img-box">
                <!----><img
                  draggable="false"
                  src="https://lx.aosenn.com/uploads/20240312/5eed09a854f831049dbb8d1e012eaa0b.jpg"
                />
              </div>
            </div>
            <div class="top">
              <div class="title">星钻世界</div>
              <div class="tag">游戏</div>
            </div>
            <van-grid :border="false" :column-num="4" :gutter="1">
              <van-grid-item>
                <van-image :src="img4" class="img-item" fit="cover" position="center" />
              </van-grid-item>
            </van-grid>
            <div class="bottom">
              <div class="visit">
                <van-icon name="eye-o" />
                3496人查看
              </div>
              <div class="date">2025-07-03 13:20</div>
            </div>
          </div>
          <div class="task">
            <div class="avatar">
              <div class="img-box">
                <!----><img
                  draggable="false"
                  src="https://lx.aosenn.com/uploads/20240312/5a134878c8a9632a34c6d380f1d70dd4.jpg"
                />
              </div>
            </div>
            <div class="top">
              <div class="title">星钻世界</div>
              <div class="tag">游戏</div>
            </div>
            <van-grid :border="false" :column-num="4" :gutter="1">
              <van-grid-item>
                <van-image :src="img2" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img5" class="img-item" fit="cover" position="center" />
              </van-grid-item>
            </van-grid>
            <div class="bottom">
              <div class="visit">
                <van-icon name="eye-o" />
                3496人查看
              </div>
              <div class="date">2025-07-03 13:20</div>
            </div>
          </div>
          <div class="task">
            <div class="avatar">
              <div class="img-box">
                <!----><img
                  draggable="false"
                  src="https://lx.aosenn.com/uploads/20221225/c046992a3c3af37de31812957f573243.gif"
                />
              </div>
            </div>
            <div class="top">
              <div class="title">星钻世界</div>
              <div class="tag">游戏</div>
            </div>
            <van-grid :border="false" :column-num="4" :gutter="1">
              <van-grid-item>
                <van-image :src="img3" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img7" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img6" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img1" class="img-item" fit="cover" position="center" />
              </van-grid-item>
            </van-grid>
            <div class="bottom">
              <div class="visit">
                <van-icon name="eye-o" />
                3496人查看
              </div>
              <div class="date">2025-07-03 13:20</div>
            </div>
          </div>
          <div class="task">
            <div class="avatar">
              <div class="img-box">
                <!----><img
                  draggable="false"
                  src="https://lx.aosenn.com/uploads/20231221/b24877a0168e080a1c4f4c7f8234fc68.png"
                />
              </div>
            </div>
            <div class="top">
              <div class="title">星钻世界</div>
              <div class="tag">游戏</div>
            </div>
            <van-grid :border="false" :column-num="4" :gutter="1">
              <van-grid-item>
                <van-image :src="img3" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img7" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img6" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img1" class="img-item" fit="cover" position="center" />
              </van-grid-item>
            </van-grid>
            <div class="bottom">
              <div class="visit">
                <van-icon name="eye-o" />
                3496人查看
              </div>
              <div class="date">2025-07-03 13:20</div>
            </div>
          </div>
          <div class="task">
            <div class="avatar">
              <div class="img-box">
                <!----><img
                  draggable="false"
                  src="https://lx.aosenn.com/uploads/20240312/ff70392a2cfb34335b4ed4d8a887d9c3.png"
                />
              </div>
            </div>
            <div class="top">
              <div class="title">星钻世界</div>
              <div class="tag">游戏</div>
            </div>
            <van-grid :border="false" :column-num="4" :gutter="1">
              <van-grid-item>
                <van-image :src="img3" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img7" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img6" class="img-item" fit="cover" position="center" />
              </van-grid-item>
              <van-grid-item>
                <van-image :src="img1" class="img-item" fit="cover" position="center" />
              </van-grid-item>
            </van-grid>
            <div class="bottom">
              <div class="visit">
                <van-icon name="eye-o" />
                3496人查看
              </div>
              <div class="date">2025-07-03 13:20</div>
            </div>
          </div>
        </div>
        <!---->
      </div>
    </div>
    <!--    <van-floating-bubble-->
    <!--      axis="xy"-->
    <!--      icon="plus"-->
    <!--      magnetic="x"-->
    <!--      style="background-color: #fed721"-->
    <!--      @click="$router.push('addPublish')"-->
    <!--    >-->
    <!--    </van-floating-bubble>-->
    <!--    <BaseFooter :is-white="true" v-bind:init-tab="2" />-->
  </div>
</template>
<script lang="ts" setup>
import BaseFooter from '@/components/BaseFooter.vue'
import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import img6 from './images/6.jpg'
import img7 from './images/7.jpg'
import { onActivated, onMounted, reactive, ref } from 'vue'
import { reqFindPoster, reqPosterRefresh, reqPosterTop, reqWalletLog } from '@/api/myApi'
import avatar from '@/assets/img/logo.png'
import utils from '@/utils/utils'
import { showToast } from 'vant'

const loading = ref(true)
const finished = ref(false)
const refreshing = ref(false)
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))

const dataList = ref([])
const searchInfo = reactive({
  page: 0,
  limit: 15
})
const getDataList = () => {
  searchInfo.page++
  loading.value = true
  reqFindPoster({
    page: searchInfo.page,
    limit: searchInfo.limit,
    order: 'id desc',
    uid: userInfo.value.id
    // order: 'id desc',
    // type: '1',
    // scene: 'reward'
    // bind_type: 'incentive'
  }).then(({ code, msg, data }) => {
    loading.value = false
    refreshing.value = false

    if (code !== 200) {
      finished.value = true
      return
    }
    // 数据全部加载完成
    dataList.value.push(...(data.data || []))
    if ((data.data || []).length === 0 || dataList.value.length >= data.count) {
      finished.value = true
    }
  })
}
const getClass = (item) => {
  const now = new Date().getTime()
  if (item.status === 'pending') {
    return 'pending'
  }

  if (item.status === 'fail') {
    return 'fail'
  }

  if (item.topTime * 1000 > now) {
    return 'top'
  } else {
    return 'success'
  }
}
const showImage = (img) => {
  showImagePreview([img])
}
const toDate = (value) => utils.timeToDate(value)
const onRefresh = () => {
  dataList.value = []
  finished.value = false
  searchInfo.page = 0
  getDataList()
}
const toTop = (item) => {
  console.log('toTop', item)
  reqPosterTop({
    id: item.id
  }).then((res) => {
    console.log('res', res)
    showToast(res.msg)
  })
}

const toRefresh = (item) => {
  console.log('toTop', item)
  reqPosterRefresh({
    id: item.id
  }).then((res) => {
    console.log('res', res)
    showToast(res.msg)
  })
}
onMounted(() => {
  dataList.value = []
  finished.value = false
  searchInfo.page = 0
  getDataList()
})
</script>

<style lang="less" scoped>
.publish {
  color: #303133;
  font-size: 14px;
  height: 100vh;
  background-color: #f3f3f3;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  :deep(.van-nav-bar) {
    background-color: #fff !important;

    .van-icon {
      color: #000 !important;
      font-size: 18px !important;
    }
  }

  :deep(.van-search) {
    background-color: #fed621;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    //background: url('https://lx.aosenn.com/h5/static/shouye/homepage_nav_bg_img@.png') no-repeat;
    //background-size: 100% 150px;
    //background-position: 0 0;
    //padding-top: 20px;
    color: #303133;
    .my-swipe {
      margin: 0px 10px 0;
      border-radius: 10px;
      overflow: hidden;

      .van-swipe-item {
        height: 180px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      margin: 30px 12px 0 12px;
      justify-content: space-between;

      .coupleta {
        width: 98%;
        margin: 5px auto;

        .task {
          width: 100%;
          background-color: #fff;
          border-radius: 10px;
          margin-bottom: 30px;
          position: relative;

          &.top {
            &:after {
              content: '置顶';
              position: absolute;
              top: -8px;
              right: 20px;
              background-image: linear-gradient(to right, #5742f6, #806dfb);
              color: #fff;
              padding: 2px 6px;
              border-radius: 6px;
            }
          }

          &.success {
            &:after {
              content: '发布成功';
              position: absolute;
              top: -8px;
              right: 20px;
              background: #07c160;
              color: #fff;
              padding: 2px 6px;
              border-radius: 6px;
            }
          }

          &.pending {
            &:after {
              content: '待审核';
              position: absolute;
              top: -8px;
              right: 20px;
              background: #1989fa;
              color: #fff;
              padding: 2px 6px;
              border-radius: 6px;
            }
          }

          &.fail {
            &:after {
              content: '发布失败';
              position: absolute;
              top: -8px;
              right: 20px;
              background: #c91a05;
              color: #fff;
              padding: 2px 6px;
              border-radius: 6px;
            }
          }

          .avatar {
            position: absolute;
            top: -15px;
            left: 10px;
            overflow: hidden;
            .img-box {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              overflow: hidden;
            }

            img {
              width: 100%;
              height: 100%;
            }
          }

          .img-item {
            aspect-ratio: 1;
            width: 100%;
            overflow: hidden;
            border-radius: 6px;
          }

          .top {
            display: flex;
            margin-left: 60px;
            align-items: center;
            padding-top: 4px;
            margin-bottom: 10px;
            .title {
              font-size: 14px;
              color: #777;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .tag {
              margin-left: 10px;
              font-size: 12px;
              padding: 1px 8px;
              border: 1px solid #489fce;
              color: #489fce;
              border-radius: 5px;
            }
          }

          .bottom {
            margin-top: -6px;
            display: flex;
            justify-content: space-between;
            padding: 0 10px 6px;
            box-sizing: border-box;
            color: #aaa;
            font-size: 12px;
            position: relative;
            z-index: 2;
          }
        }
      }
    }
  }
}
</style>
