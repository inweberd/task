<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="平台简介"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>

    <van-image width="100%" lazy-load :src="baidu1">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>

    <div data-v-316a7dba="" style="padding: 10px">
      <p>
        <span style="color: rgb(53, 152, 219)"
          ><span class="text_H038s" data-text="true"
            >全民来瓜分是百度短视频旗舰品牌，包括全民来瓜分独立App、全民来瓜分极速版，</span
          ><span class="text_H038s" data-text="true"
            ><a
              class="innerLink_UtiNv"
              style="color: rgb(53, 152, 219)"
              href="https://baike.baidu.com/item/%E7%99%BE%E5%BA%A6App/8548470?fromModule=lemma_inlink"
              target="_blank"
              rel="noopener"
              data-from-module="summary"
              >百度App</a
            ></span
          ><span class="text_H038s" data-text="true"
            >短视频、百度搜索短视频等。致力于打造泛知识短视频平台，全面覆盖知识、生活、健康、文化、历史、科普、科技、情感、资讯、影视等领域。</span
          ></span
        >
      </p>
      <p>&nbsp;</p>
      <div
        class="para_YYuCh content_uczdI MARK_MODULE"
        data-tag="paragraph"
        data-uuid="gnwy11ay5j"
        data-idx="1-1"
      >
        <span style="color: rgb(53, 152, 219)"
          ><span class="text_H038s" data-text="true"
            >全民来瓜分依托百度技术，致力于为用户提供优质的视频内容。全民来瓜分以创作者、用户为核心，每天有大量</span
          ><span class="text_H038s" data-text="true"
            ><a
              class="innerLink_UtiNv"
              style="color: rgb(53, 152, 219)"
              href="https://baike.baidu.com/item/%E6%B4%BB%E8%B7%83%E7%94%A8%E6%88%B7/8522285?fromModule=lemma_inlink"
              target="_blank"
              rel="noopener"
              data-from-module=""
              >活跃用户</a
            ></span
          ><span class="text_H038s" data-text="true"
            >在全民来瓜分上传、观看、分享及评论视频，超200万视频创作者通过全民来瓜分为百度生态用户提供视频内容。</span
          ><span class="supWrap_C9i5o J-supWrap"
            ><sup data-tag="ref">&nbsp;<em id="sup-13" data-ctrid="sXA1MxqOA7Jv"></em></sup></span
        ></span>
      </div>
      <van-image width="100%" lazy-load :src="baidu2">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div
        class="para_YYuCh content_uczdI MARK_MODULE"
        data-tag="paragraph"
        data-uuid="gnwy11ay5j"
        data-idx="1-1"
      >
        &nbsp;
      </div>
      <div
        class="para_YYuCh content_uczdI MARK_MODULE"
        data-tag="paragraph"
        data-uuid="gnwy1qomxc"
        data-idx="1-2"
      >
        <span style="color: rgb(53, 152, 219)"
          ><span class="text_H038s" data-text="true"
            >百度全民来瓜分还将通过付费专栏、电商带货、视频赞赏、线索导流等多元方式，解决变现的问题。而对于专注的创作者人群，百度方面表示以真金白银和技术全力扶持媒体人、律师、评测大神等泛知识类优质创作者</span
          ><span class="supWrap_C9i5o J-supWrap"
            ><sup data-tag="ref">&nbsp;[1]<em id="sup-1"></em></sup></span
          ><span class="text_H038s" data-text="true">。</span></span
        >
      </div>
      <div
        class="para_YYuCh content_uczdI MARK_MODULE"
        data-tag="paragraph"
        data-uuid="gnwy1qomxc"
        data-idx="1-2"
      >
        &nbsp;
      </div>
      <div
        class="para_YYuCh content_uczdI MARK_MODULE"
        data-tag="paragraph"
        data-uuid="gnwy1qomxc"
        data-idx="1-2"
      >
        &nbsp;
      </div>
      <div
        class="para_YYuCh content_uczdI MARK_MODULE"
        data-tag="paragraph"
        data-uuid="gnwy1qomxc"
        data-idx="1-2"
      >
        <ol class="paraList_tevWj ordered_RRlWo" data-tag="list" data-uuid="gnwy0qeq3k">
          <li style="color: rgb(53, 152, 219)">
            <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">1.</span>
            <div
              class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
              data-tag="paragraph"
              data-uuid="gnwy1d4f2n"
              data-idx=""
            >
              <span class="text_H038s" style="color: rgb(53, 152, 219)" data-text="true"
                >Tab类别全而精：全民来瓜分内容全面且划分精细，既有“搞笑”“影视”“音乐”等大众化tab，又有“教育”“军事”“科技”等个性化tab，以满足用户快速获取优质内容需求。</span
              >
            </div>
          </li>
          <li style="color: rgb(53, 152, 219)">
            <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">2.</span>
            <div
              class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
              data-tag="paragraph"
              data-uuid="sVCfQ3RK7Ukd"
              data-idx=""
            >
              <span style="color: rgb(53, 152, 219)"
                ><span class="text_H038s" data-ctrid-svchjoigvhrs="sVChjOigVHrs" data-text="true"
                  >圈一下功能：全民来瓜分打造出专属社区符号，创作者和用户可以在视频中圈出有用的知识点、有趣的话题点、有态度的观点。实现知识的分享与互通，构建一个良好的视频知识社区。</span
                ><span class="supWrap_C9i5o J-supWrap"
                  ><sup class="" data-tag="ref"
                    >&nbsp;[2]<em id="sup-2" data-ctrid="sVChjOigVHrs"></em></sup></span
              ></span>
            </div>
          </li>
          <li style="color: rgb(53, 152, 219)">
            <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">3.</span>
            <div
              class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
              data-tag="paragraph"
              data-uuid="gnwy1ldjh4"
              data-idx=""
            >
              <span class="text_H038s" style="color: rgb(53, 152, 219)" data-text="true"
                >全面的内容生态：优质内容齐上阵，内容来源有政务机构、新闻媒体、优质创作者、头部IP等；内容类型丰富，涵盖短视频、直播、小程序、长视频等形式。</span
              >
            </div>
          </li>
          <li style="color: rgb(53, 152, 219)">
            <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">4.</span>
            <div
              class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
              data-tag="paragraph"
              data-uuid="gnwy1d4f5x"
              data-idx=""
            >
              <span class="text_H038s" style="color: rgb(53, 152, 219)" data-text="true"
                >优质内容一键关注：全民来瓜分筛选多媒体和优质自媒体账号，进行分类，用户可一键关注，此外用户在观看视频过程中还可直接订阅视频发布者。</span
              >
            </div>
          </li>
          <li style="color: rgb(53, 152, 219)">
            <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">5.</span>
            <div
              class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
              data-tag="paragraph"
              data-uuid="gnwy1ldjiy"
              data-idx=""
            >
              <span class="text_H038s" style="color: rgb(53, 152, 219)" data-text="true"
                >保护未成年人的青少年模式，在青少年模式下，精选适合未成年人所观看的优质内容，</span
              >
            </div>
          </li>
        </ol>
      </div>
    </div>
    <!--    <div v-html="articleInfo.content" style="padding: 10px"></div>-->
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { axiosInstance as axios } from '@/utils/myrequest'
import { closeToast, showLoadingToast } from 'vant'
import baidu1 from './images/baidu1.png'
import baidu2 from './images/baidu2.png'

const articleInfo = ref('')

// showLoadingToast({
//   duration: 0,
//   message: '加载中'
// })
// axios.get('api/article/one?id=4').then((res) => {
//   closeToast()
//   if (res.code === 200) {
//     articleInfo.value = res.data
//   }
// })
</script>
<style scoped>
html {
  background: red;
}
body {
  background: red;
}
#app {
  background: red;
}
</style>
