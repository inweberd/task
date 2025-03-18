<template>
    <div style="height: 100%; overflow: auto">
        <van-nav-bar
            :class="{ inApp: getIsInApp() }"
            fixed
            left-arrow
            left-text="返回"
            placeholder
            safe-area-inset-top
            title="平台简介"
            @click-left="$router.back()"
        ></van-nav-bar>

        <van-image :src="jianjie" lazy-load width="100%">
            <template v-slot:loading>
                <van-loading size="20" type="spinner"/>
            </template>
        </van-image>

        <div v-if="0" data-v-316a7dba="" style="padding: 10px">
            <p>
        <span style="color: rgb(53, 152, 219)"
        ><span class="text_H038s" data-text="true"
        >汇盈传媒是百度短视频旗舰品牌，包括汇盈传媒独立App、汇盈传媒极速版，</span
        ><span class="text_H038s" data-text="true"
        ><a
            class="innerLink_UtiNv"
            data-from-module="summary"
            href="https://baike.baidu.com/item/%E7%99%BE%E5%BA%A6App/8548470?fromModule=lemma_inlink"
            rel="noopener"
            style="color: rgb(53, 152, 219)"
            target="_blank"
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
                data-idx="1-1"
                data-tag="paragraph"
                data-uuid="gnwy11ay5j"
            >
        <span style="color: rgb(53, 152, 219)"
        ><span class="text_H038s" data-text="true"
        >汇盈传媒依托百度技术，致力于为用户提供优质的视频内容。汇盈传媒以创作者、用户为核心，每天有大量</span
        ><span class="text_H038s" data-text="true"
        ><a
            class="innerLink_UtiNv"
            data-from-module=""
            href="https://baike.baidu.com/item/%E6%B4%BB%E8%B7%83%E7%94%A8%E6%88%B7/8522285?fromModule=lemma_inlink"
            rel="noopener"
            style="color: rgb(53, 152, 219)"
            target="_blank"
        >活跃用户</a
        ></span
        ><span class="text_H038s" data-text="true"
        >在汇盈传媒上传、观看、分享及评论视频，超200万视频创作者通过汇盈传媒为百度生态用户提供视频内容。</span
        ><span class="supWrap_C9i5o J-supWrap"
        ><sup data-tag="ref">&nbsp;<em id="sup-13" data-ctrid="sXA1MxqOA7Jv"></em></sup></span
        ></span>
            </div>
            <van-image :src="baidu2" lazy-load width="100%">
                <template v-slot:loading>
                    <van-loading size="20" type="spinner"/>
                </template>
            </van-image>
            <div
                class="para_YYuCh content_uczdI MARK_MODULE"
                data-idx="1-1"
                data-tag="paragraph"
                data-uuid="gnwy11ay5j"
            >
                &nbsp;
            </div>
            <div
                class="para_YYuCh content_uczdI MARK_MODULE"
                data-idx="1-2"
                data-tag="paragraph"
                data-uuid="gnwy1qomxc"
            >
        <span style="color: rgb(53, 152, 219)"
        ><span class="text_H038s" data-text="true"
        >百度汇盈传媒还将通过付费专栏、电商带货、视频赞赏、线索导流等多元方式，解决变现的问题。而对于专注的创作者人群，百度方面表示以真金白银和技术全力扶持媒体人、律师、评测大神等泛知识类优质创作者</span
        ><span class="supWrap_C9i5o J-supWrap"
        ><sup data-tag="ref">&nbsp;[1]<em id="sup-1"></em></sup></span
        ><span class="text_H038s" data-text="true">。</span></span
        >
            </div>
            <div
                class="para_YYuCh content_uczdI MARK_MODULE"
                data-idx="1-2"
                data-tag="paragraph"
                data-uuid="gnwy1qomxc"
            >
                &nbsp;
            </div>
            <div
                class="para_YYuCh content_uczdI MARK_MODULE"
                data-idx="1-2"
                data-tag="paragraph"
                data-uuid="gnwy1qomxc"
            >
                &nbsp;
            </div>
            <div
                class="para_YYuCh content_uczdI MARK_MODULE"
                data-idx="1-2"
                data-tag="paragraph"
                data-uuid="gnwy1qomxc"
            >
                <ol class="paraList_tevWj ordered_RRlWo" data-tag="list" data-uuid="gnwy0qeq3k">
                    <li style="color: rgb(53, 152, 219)">
                        <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">1.</span>
                        <div
                            class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
                            data-idx=""
                            data-tag="paragraph"
                            data-uuid="gnwy1d4f2n"
                        >
              <span class="text_H038s" data-text="true" style="color: rgb(53, 152, 219)"
              >Tab类别全而精：汇盈传媒内容全面且划分精细，既有“搞笑”“影视”“音乐”等大众化tab，又有“教育”“军事”“科技”等个性化tab，以满足用户快速获取优质内容需求。</span
              >
                        </div>
                    </li>
                    <li style="color: rgb(53, 152, 219)">
                        <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">2.</span>
                        <div
                            class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
                            data-idx=""
                            data-tag="paragraph"
                            data-uuid="sVCfQ3RK7Ukd"
                        >
              <span style="color: rgb(53, 152, 219)"
              ><span class="text_H038s" data-ctrid-svchjoigvhrs="sVChjOigVHrs" data-text="true"
              >圈一下功能：汇盈传媒打造出专属社区符号，创作者和用户可以在视频中圈出有用的知识点、有趣的话题点、有态度的观点。实现知识的分享与互通，构建一个良好的视频知识社区。</span
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
                            data-idx=""
                            data-tag="paragraph"
                            data-uuid="gnwy1ldjh4"
                        >
              <span class="text_H038s" data-text="true" style="color: rgb(53, 152, 219)"
              >全面的内容生态：优质内容齐上阵，内容来源有政务机构、新闻媒体、优质创作者、头部IP等；内容类型丰富，涵盖短视频、直播、小程序、长视频等形式。</span
              >
                        </div>
                    </li>
                    <li style="color: rgb(53, 152, 219)">
                        <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">4.</span>
                        <div
                            class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
                            data-idx=""
                            data-tag="paragraph"
                            data-uuid="gnwy1d4f5x"
                        >
              <span class="text_H038s" data-text="true" style="color: rgb(53, 152, 219)"
              >优质内容一键关注：汇盈传媒筛选多媒体和优质自媒体账号，进行分类，用户可一键关注，此外用户在观看视频过程中还可直接订阅视频发布者。</span
              >
                        </div>
                    </li>
                    <li style="color: rgb(53, 152, 219)">
                        <span class="orderNum_fLdJZ" style="color: rgb(53, 152, 219)">5.</span>
                        <div
                            class="para_YYuCh orderedList-1_y7B6c MARK_MODULE"
                            data-idx=""
                            data-tag="paragraph"
                            data-uuid="gnwy1ldjiy"
                        >
              <span class="text_H038s" data-text="true" style="color: rgb(53, 152, 219)"
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
import {getIsInApp} from '@/utils/getTopPadding'
import baidu1 from './images/baidu1.png'
import baidu2 from './images/baidu2.png'
import jianjie from './images/jianjie.png'

const articleInfo = ref('')

// axios.get('api/article/one?id=4').then((res) => {
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
