<template>
  <div class="choose-school">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">添加学校</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="nav('/me/declare-school', { type: 1 })">没有找到?</span>
      </template>
      <template v-slot:bottom>
        <Search
          class="mt1r mb1r ml2r mr2r"
          placeholder="搜索大学名称"
          v-model="data.schoolName"
          @clear="data.isSearch = false"
          :is-show-right-text="true"
          @notice="search"
        ></Search>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="nearby" v-if="!data.isSearch">
        <div class="title">
          <img src="../../../assets/img/icon/location.svg" alt="" />
          <span>离我最近</span>
        </div>
        <template v-if="data.nearby.length">
          <div class="item" :key="i" v-for="(item, i) in data.nearby" @click="setSchool(item)">
            {{ item }}
          </div>
        </template>
        <div v-else class="item">无法获取</div>
      </div>
      <div class="line" style="width: calc(100% - 40px); margin-left: 20px"></div>
      <div class="schools" v-if="!data.isSearch">
        <div class="item" :key="i" v-for="(item, i) in data.schools" @click="setSchool(item)">
          {{ item }}
        </div>
      </div>
      <div v-if="data.isSearch">
        <template v-if="data.searchSchools.length">
          <div
            class="item"
            :key="i"
            v-for="(item, i) in data.searchSchools"
            @click="setSchool(item)"
          >
            <span v-if="item.indexOf(data.schoolName) > -1">
              {{ item.substr(0, item.indexOf(data.schoolName)) }}
              <span style="color: #f50">{{ data.schoolName }}</span>
              {{ item.substr(item.indexOf(data.schoolName) + data.schoolName.length) }}
            </span>
            <span v-else>{{ item }}</span>
          </div>
        </template>
        <div v-else class="empty">
          <img src="../../../assets/img/icon/head-image.jpeg" alt="" />
          <div class="title">搜索结果为空</div>
          <div class="sub-title">没有搜索到相关的内容</div>
          <div class="btn" @click="nav('/me/declare-school')">没有学校信息？去申报</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '../../../components/Search.vue'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav.js'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'ChooseSchool'
})

const router = useRouter()
const nav = useNav()
const data = reactive({
  isSearch: false,
  nearby: [],
  schools: [],
  searchSchools: [],
  schoolName: ''
})

onMounted(() => {
  for (let i = 0; i < 20; i++) {
    data.nearby.push('附近大学' + i)
    data.schools.push('所有大学' + i)
  }
})

function setSchool(val) {
  localStorage.setItem('changeSchool', val)
  router.back()
}

function search() {
  if (!data.schoolName.length) return (data.isSearch = false)
  data.isSearch = true
  let all = data.nearby.concat(data.schools)
  data.searchSchools = all.filter((v) => v.includes(data.schoolName))
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.choose-school {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  overflow: auto;

  .content {
    padding-top: 120px;

    .nearby {
      .title {
        padding: 10px 20px;

        img {
          width: 10px;
          height: 10px;
          margin-right: 2px;
        }
      }
    }

    .item {
      padding: 0 20px;
      font-size: 14px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.1s;
      background: var(--main-bg);

      &:active {
        background: var(--active-main-bg);
        color: var(--second-text-color);
      }
    }

    .empty {
      text-align: center;

      .title {
        margin-top: 60px;
        font-size: 18px;
      }

      .sub-title {
        color: var(--second-text-color);
        margin-top: 20px;
        font-size: 14px;
      }

      img {
        margin-top: 60px;
        height: 100px;
        border-radius: 50%;
      }

      .btn {
        margin-top: 150px;
        display: inline-block;
        background: var(--second-btn-color);
        padding: 15px 40px;
        border-radius: 2px;
      }
    }
  }
}
</style>
