<template>
  <from-bottom-dialog
    :page-id="pageId"
    :modelValue="modelValue"
    @update:modelValue="(e) => $emit('update:modelValue', e)"
    @cancel="closeShare"
    :show-heng-gang="false"
    :touch-moved="false"
    maskMode="light"
    height="320px"
    mode="dark"
  >
    <div class="share">
      <div class="title">
        <span>分享给朋友</span>
        <dy-back mode="light" img="close" direction="right" @click.stop="closeShare"></dy-back>
      </div>
      <div class="content">
        <div class="friends list">
          <div
            class="option"
            :key="i"
            v-for="(item, i) in store.friends.all"
            @click.stop="toggleCall(item)"
          >
            <img
              :style="item.select ? 'opacity: .5;' : ''"
              class="avatar"
              :src="_checkImgUrl(item.avatar)"
              alt=""
            />
            <span>{{ item.name }}</span>
            <img
              v-if="item.select"
              class="checked"
              src="../assets/img/icon/components/check/check-red-share.png"
            />
          </div>
          <div class="option" @click.stop="closeShare($router.push('/message/share-to-friend'))">
            <dy-back class="more" mode="light" direction="right"></dy-back>
            <span>更多朋友</span>
          </div>
        </div>
        <div class="bottom">
          <div class="share2friend" v-if="store.selectFriends.length">
            <div class="line"></div>
            <div class="comment">
              <textarea placeholder="有什么想和好友说的..."></textarea>
              <img class="poster" src="../assets/img/poster/1.jpg" alt="" />
            </div>
            <div class="btns">
              <dy-button type="dark2" radius="7" v-if="store.selectFriends.length > 1" @click="_no"
                >建群并发送
              </dy-button>
              <dy-button type="primary" radius="7" @click="_no"
                >{{ store.selectFriends.length > 1 ? '分别发送' : '发送' }}
              </dy-button>
            </div>
          </div>

          <div class="shares list" v-else>
            <template v-if="mode === 'video'">
              <!-- <div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
								<img class="avatar" src="../assets/img/icon/components/video/torichang.png" alt="" />
								<span>转发</span>
							</div>
							<div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
								<Icon icon="icon-park-solid:good-two" />
								<span>推荐给朋友</span>
							</div>
							<div class="option" @click.stop="copyLink">
								<Icon icon="humbleicons:link" />
								<span>复制链接</span>
							</div>
							<div class="option" @click.stop="_no">
								<img class="small" src="../assets/img/icon/components/video/comeonplay.png" alt="" />
								<span>合拍</span>
							</div>
							<div class="option" @click.stop="_no">
								<img class="small" src="../assets/img/icon/components/video/dou.webp" alt="" />
								<span>帮上热门</span>
							</div>
							<div class="option" @click.stop="$router.push('/home/report', { mode: this.mode })">
								<img class="small" src="../assets/img/icon/components/video/warring.png" alt="" />
								<span>举报</span>
							</div>
							<div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
								<Icon icon="ion:paper-plane" />
								<span>私信朋友</span>
							</div> -->
              <div class="option" @click.stop="zzz('friend')">
                <img
                  style="background-color: #00bbff"
                  class="small"
                  src="../assets/img/QQ.png"
                  alt=""
                />
                <span>QQ好友</span>
              </div>
              <div class="option" @click.stop="zzz('qz')">
                <img
                  style="background-color: #f0ad4e"
                  class="small"
                  src="../assets/img/qq空间.png"
                  alt=""
                />
                <span>QQ空间</span>
              </div>
              <div class="option" @click.stop="shareOnWeChatFriend">
                <img
                  style="background-color: #2dc100"
                  class="small"
                  src="../assets/img/微信.png"
                  alt=""
                />
                <span>微信好友</span>
              </div>
              <div class="option" @click.stop="shareOnWeChatTimeline">
                <img
                  style="background-color: #1aad19"
                  class="small"
                  src="../assets/img/朋友圈.png"
                  alt=""
                />
                <span>朋友圈</span>
              </div>

              <div class="option" v-if="canDownload" @click.stop="closeShare($emit('download'))">
                <Icon icon="mingcute:download-fill" />
                <span>保存本地</span>
              </div>

              <div class="option" @click.stop="closeShare($emit('play-feedback'))">
                <img class="small" src="../assets/img/icon/components/video/feedback.webp" alt="" />
                <span>播放反馈</span>
              </div>
            </template>
            <!-- <template v-if="mode === 'music'">
							<div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
								<img class="small" src="../assets/img/icon/components/video/tofriend.webp" alt="" />
								<span>私信朋友</span>
							</div>
							<div class="option" @click.stop="$router.push('/home/report', { mode: this.mode })">
								<img class="small" src="../assets/img/icon/components/video/warring.png" alt="" />
								<span>举报音乐</span>
							</div>
						</template>
						<template v-if="mode === 'my-music'">
							<div class="option" @click.stop="_no">
								<img class="small" src="../assets/img/icon/components/video/torichang.png" alt="" />
								<span>转发到日常</span>
							</div>
							<div class="option" @click.stop="closeShare($emit('ShareToFriend'))">
								<img class="small" src="../assets/img/icon/components/video/tofriend.webp" alt="" />
								<span>私信朋友</span>
							</div>
						</template> -->
          </div>
        </div>
      </div>
    </div>
  </from-bottom-dialog>
</template>

<script setup>
import FromBottomDialog from './dialog/FromBottomDialog'
import { useBaseStore } from '@/store/pinia'
import { _checkImgUrl, _copy, _hideLoading, _no, _notice, _showLoading, _sleep } from '@/utils'
import { jsapi } from '@/api/myApi'
// import {commonShare, shareTitle, shareUrl, shareImg, shareDesc} from "@/common/wxshare";
defineOptions({
  name: 'Share'
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return false
    }
  },
  item: {},
  videoId: {
    type: String,
    default() {
      return null
    }
  },
  pageId: {
    type: String,
    default() {
      return 'home-index'
    }
  },
  canDownload: {
    type: Boolean,
    default() {
      return true
    }
  },
  mode: {
    type: String,
    default() {
      return 'video'
      //music
      //qrcode
    }
  }
})

const store = useBaseStore()
const emit = defineEmits(['update:item'])

async function copyLink() {
  closeShare()
  _showLoading()
  await _sleep(500)
  _hideLoading()
  _copy(props.item.share_info.share_link_desc + props.item.share_info.share_url)
  //TODO 抖音样式改了
  _notice('复制成功')
}
const router = useRouter()
function zzz(e) {
  // closeShare()
  // router.push('/me/my-card')
  //  `https://connect.qq.com/widget/shareqq/index.html?url=${shareUrl}&title=${sysInfo}&source=${shareUrl}&desc=${sysInfo}&pics=`)
  if (e == 'qz') {
    window.open(
      `https://connect.qq.com/widget/shareqq/index.html?url=http://111.180.196.127:8989/&title=甜橙视频&source=http://111.180.196.127:8989/&desc=甜橙视频&pics=`
    )
  } else if (e == 'friend') {
    const title = '示例网页标题'
    const url = window.location.href
    const summary = '这是一个示例网页。'
    const shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`
    window.open(shareUrl, '_blank')
  }
}
// function shareOnWeChatFriend () {
// //  commonShare(this, shareTitle, shareUrl, shareImg, shareDesc);
// }
function shareOnWeChatTimeline() {
  const title = '示例网页标题'
  const url = window.location.href
  const imgUrl = '' // 你的网站 Logo 或其他图片地址
  const description = '这是一个示例网页。'
  copyToClipboard(url)
  alert('请打开微信客户端，通过粘贴方式分享到朋友圈。')
}
function copyToClipboard(text) {
  const input = document.createElement('textarea')
  document.body.appendChild(input)
  input.value = text
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}
function toggleCall(item) {
  item.select = !item.select
}

function closeShare() {
  store.friends.all = store.friends.all.map((v) => {
    v.select = false
    return v
  })
  emit('update:modelValue', false)
}

function shareOnWeChatFriend(name, title, url, logo) {
  // name 活动名称   title 活动活动简介  url 分享的地址  logo
  var data = {
    //请求参数
    url: 'http://111.180.196.127:8989/ ' //分享的页面地址
  }
  jsapi(data).then((res) => {
    console.log(res)
    if (res.code == '200') {
      let weChatData = res.data
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: weChatData.appId, // 必填，公众号的唯一标识，填自己的！
        timestamp: weChatData.timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
        nonceStr: weChatData.nonceStr, // 必填，生成签名的随机串
        signature: weChatData.signature, // 必填，签名，见附录1
        jsApiList: [
          'updateAppMessageShareData', //分享好友
          'updateTimelineShareData', // 分享朋友圈
          'onMenuShareAppMessage',
          'onMenuShareTimeline'
        ]
      })
      wx.error(function (res) {
        alert(JSON.stringify(res))
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })

      wx.ready(function () {
        alert(111)
        console.log(1211113)
        //自定义“分享到朋友圈”及“分享到 QQ 空间”按钮的分享内容
        wx.updateTimelineShareData({
          title: 'aaa', // 分享时的标题
          desc: '111',
          link: weChatData.url, // 分享时的链接
          success: function () {
            console.log('分享成功')
          },
          cancel: function () {
            console.log('取消分享')
          }
        })
        //自定义分享给朋友、以及分享给qq好友
        wx.updateAppMessageShareData({
          title: '123',
          desc: '123',
          link: weChatData.url,
          dataUrl: '',
          success: function () {
            console.log('分享成功')
          },
          cancel: function () {
            // console.log('取消分享')
          }
        })
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
        wx.onMenuShareAppMessage({
          title: 123, // 分享标题
          desc: 123, // 分享描述
          link: weChatData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
        wx.onMenuShareTimeline({
          // 分享到朋友圈
          title: '123', // 分享标题
          desc: '123', // 分享描述
          link: weChatData.url, //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })
      })
    }
  })
}
</script>

<style lang="less" scoped>
.share {
  width: 100%;
  height: 100%;
  background: var(--color-share-bg);
  border-radius: 10px 10px 0 0;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @space-width: 26px;
  @avatar-width: 58px;
  @icon-width: 30px;

  .title {
    font-size: 14px;
    padding: 10px 20px 30px 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 14px;
      height: 14px;
      padding: 6px;
      border-radius: 50%;
      background: var(--second-btn-color-tran);
      //background: rgb(56, 58, 57);
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .bottom {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .list {
    overflow-x: scroll;
    display: flex;
    padding: 0 20px;
    gap: 22px;
  }

  @c: rgb(51, 51, 51);

  .option {
    width: @avatar-width;
    position: relative;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: @avatar-width;
      height: @avatar-width;
      border-radius: 50%;
    }

    .checked {
      position: absolute;
      top: @avatar-width - 1.5;
      right: -2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    span {
      margin-top: 8px;
      text-align: center;
      width: @avatar-width;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .more {
      width: 20px;
      padding: 19px;
      border-radius: 50%;
      background: @c;
      //background: rgb(56, 58, 57);
    }

    svg {
      .more;
      width: unset;
      padding: 16px;
      font-size: 26px;
      color: rgb(205, 205, 205);
    }

    .small {
      width: @icon-width;
      height: @icon-width;
      padding: 14px;
      border-radius: 50%;
      background: @c;
    }
  }

  .share2friend {
    padding: 20px;
    padding-top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .comment {
      display: flex;
      flex: 1;
      margin-top: 15px;

      textarea {
        flex: 1;
        font-size: 14px;
        outline: none;
        border: none;
        background: transparent;
        color: #fff;
      }

      .poster {
        margin-left: 20px;
        height: 60px;
        width: 60px;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .btns {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;

      .button {
        flex: 1;
      }
    }
  }
}

.share-enter-active,
.share-leave-active {
  transition: all 0.15s ease;
}

.share-enter-from,
.share-leave-to {
  transform: translateY(60vh);
}
</style>
