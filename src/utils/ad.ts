import { testBase64 } from '@/utils/testBase64'
import { AES, token as aesToken } from '@/utils/AES'
import CryptoJS from 'crypto-js'

const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent)

const iosConfig = {
  appId: '1812124465782341638-2',
  splash: '1812125317590958151',
  interaction: '1812125381512151120',
  rewardVideo: '1812125475565224008',
  banner: '1812125553453449259',
  feed: '1812125629903028277'
}
const androidConfig = {
  appId: '1812124263906295841-2',
  splash: '1812124735568363610',
  interaction: '1812124810789011518',
  rewardVideo: '1812124893081256030',
  banner: '1812125086669357132',
  feed: '1812125206366404642'
}
const adIdMap = isIos ? iosConfig : androidConfig
export const loadSplash = () => {
  window.splashCb = function (params) {
    if (params.code == 1) {
      //展现
    }
    if (params.code == 0) {
      //错误回调
      //错误信息 params.msg
    }
  }
  if (isIos) {
    window.webkit?.messageHandlers &&
      window.webkit.messageHandlers.loadSplash.postMessage({
        positionID: adIdMap.splash,
        callBack: 'splashCb'
      })
  } else {
    // window.android.loadSplash(adIdMap.splash, 'splashCb')
    window.android && window.android.loadSplash('splashCb')
  }
}

export const testCallback = () => {
  window.android.testCallback()
}

export const loadInteraction = () => {
  window.interactionCb = function (params) {
    if (params.code == 1) {
      //展现
    }
    if (params.code == 0) {
      //错误回调
      //错误信息 params.msg
    }
  }

  if (isIos) {
    // window.webkit.messageHandlers.loadInteraction.postMessage("callBack2")
    // window.callBack2 = function(params){
    //   if(params.code == 1){
    //     showToast("广告加载成功");
    //   } else if(params.code == 0){
    //     showToast(params.msg);
    //   }
    // }

    window.webkit?.messageHandlers &&
      window.webkit.messageHandlers.loadInteraction.postMessage({
        positionID: adIdMap.interaction,
        callBack: 'interactionCb'
      })
  } else {
    // window.android.loadInteraction(adIdMap.interaction, 'interactionCb')
    window.android && window.android.loadInteraction('interactionCb')
  }
}
export const loadPlayRewardVideo = (cb?) => {
  const userId = JSON.parse(window.localStorage.getItem('userInfo'))?.id
  const token = window.localStorage.getItem('token')
  window.rewardVideoCb = function (params) {
    if (params.code == 1) {
      //展现
    }
    if (params.code == 2) {
      cb && cb()
      //奖励达成回调  可以给用户发奖励
    }
    if (params.code == 0) {
      //错误回调
      //错误信息 params.msg
    }
  }
  if (isIos) {
    window.webkit?.messageHandlers &&
      window.webkit.messageHandlers.loadPlayRewardVideo.postMessage({
        positionID: adIdMap.rewardVideo,
        userID: userId,
        callBack: 'rewardVideoCb',
        extraData: encodeURIComponent(
          JSON.stringify({
            token
          })
        )
      })
    // window.webkit.messageHandlers.loadPlayRewardVideo.postMessage({
    //   positionID: adIdMap.rewardVideo,
    //   userID: '123456',
    //   callBack: 'rewardVideoCb',
    //   extraData: 'TestData'
    // })
  } else {
    // window.android.loadPlayRewardVideo(
    //   adIdMap.rewardVideo,
    //   userId,
    //   encodeURIComponent(
    //     JSON.stringify({
    //       token
    //     })
    //   ),
    //   'rewardVideoCb'
    // )
    window.android &&
      window.android.loadPlayRewardVideo(
        userId,
        encodeURIComponent(
          JSON.stringify({
            token
          })
        ),
        'rewardVideoCb'
      )
  }
}
export const loadBanner = () => {
  window.bannerCb = function (params) {
    if (params.code == 1) {
      //展现
    }
    if (params.code == 0) {
      //错误回调
      //错误信息 params.msg
    }
  }
  if (isIos) {
    window.webkit.messageHandlers.loadBanner.postMessage({
      positionID: adIdMap.banner,
      callBack: 'bannerCb'
    })
  } else {
    window.android.loadBanner(adIdMap.banner, 'bannerCb')
  }
}
export const loadFeed = () => {
  window.feedCb = function (params) {
    if (params.code == 1) {
      //展现
    }
    if (params.code == 0) {
      //错误回调
      //错误信息 params.msg
    }
  }
  if (isIos) {
    window.webkit.messageHandlers.loadFeed.postMessage({
      positionID: adIdMap.feed,
      callBack: 'feedCb'
    })
  } else {
    window.android.loadFeed(adIdMap.feed, 'feedCb')
  }
}
export const loadShortVideo = ({ todayCount, price, isVip }) => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const userId = userInfo?.id
  const serial = userInfo?.result?.staff?.serial
  // 当前时间戳
  const unix = Math.round(new Date().getTime() / 1000).toString()
  const key = aesToken('mtehod=GET', 16)
  const iv = aesToken(unix, 16)
  const item = new AES(key, iv)
  // Base64加密
  const XHelios = btoa(`${key} ${iv}`)
  // 根据ASCII排序
  const ASCII = (params) => {
    const keys = Object.keys(params).sort()

    let item = ''
    keys.forEach((key) => {
      const val = params[key]
      if (key.length > 0 && String(val).length > 0) {
        item += `${key}=${val}&`
      }
    })

    if (item.length > 0) item = item.slice(0, -1)

    return item
  }
  const q = {}
  const b = { count: '1', video_id: 'qwer' }
  const params = Object.assign({}, q, b)
  console.log(params)

  const XSsStub = CryptoJS.MD5(ASCII(params)).toString().toUpperCase()
  console.log('serial', serial)
  const token = window.localStorage.getItem('token')

  const iosParams = {
    userId,
    extraData: encodeURIComponent(
      JSON.stringify({
        token
      })
    ),
    token,
    v: !!serial && isVip,
    q: q,
    b: b,
    h: {
      'X-Khronos': unix,
      'X-Helios': XHelios,
      'X-SS-STUB': XSsStub,
      'X-Medusa': item.encrypt(JSON.stringify(params)),
      authorization: token
    }
  }
  console.log('params', iosParams)
  if (isIos) {
    window.webkit.messageHandlers.openContentPage.postMessage({
      userId,
      extraData: encodeURIComponent(
        JSON.stringify({
          token
        })
      ),
      token,
      v: !!serial && isVip,
      q: q,
      b: b,
      h: {
        'X-Khronos': unix,
        'X-Helios': XHelios,
        'X-SS-STUB': XSsStub,
        'X-Medusa': item.encrypt(JSON.stringify(params)),
        authorization: token
      }
    })

    interface params {
      userId: string
      extraData: string
      token: string
      v: boolean // 是否vip
      q: {
        // query
        [key in string]: string
      }
      b: {
        // body
        [key in string]: string
      }
      h: {
        // header
        [key in string]: string
      }
    }

    /**
     * 调用openContentPage方法会传这么个对象过去
     * v:是否vip  q:query参数对象  b:body参数对象  h:header参数对象
     * v为true时
     * 激励视频弹窗可关闭
     * 每次播放视频需要调用下https://zzz.kkwai.cn/api/advertising-log/create接口
     * post请求 query，body，header分别为 q，b，h对象
     * 返回值{
     *    code:200,
     *    msg:"",
     *    data:{}
     *  }
     *  if(msg.length>0) 弹出msg
     *
     * v为false时
     * 激励视频弹窗不可关闭 观看视频不请求接口
     *
     * 激励视频逻辑：
     * 激励视频观看完成后调用https://zzz.kkwai.cn/api/advertising-log/query 接口
     * post请求
     *   OkHttpUtils.get()
     *        .url("https://zzz.kkwai.cn/api/advertising-log/query")
     *        .addHeader("Authorization", token) token为传过来的token
     *        .addParams("trade_no", transId)
     *  {
     *    code:200,
     *    msg:"",
     *    data:{
     *      grant:1
     *    }
     *  }
     *  如果code===200 && data.grant>0 弹出 已发放收益{data.grant}元
     *
     */
  } else {
    window.android.openContentPage(
      userId,
      encodeURIComponent(
        JSON.stringify({
          token,
          m: '今日权益卡生效：获得',
          v: !!serial && isVip,
          t: todayCount,
          c: price,
          q: q,
          b: b,
          h: {
            'X-Khronos': unix,
            'X-Helios': XHelios,
            'X-SS-STUB': XSsStub,
            'X-Medusa': item.encrypt(JSON.stringify(params)),
            authorization: token
          }
        })
      ),
      token
    )
  }
}
export const loadShortPlayVideo = () => {
  const userId = JSON.parse(window.localStorage.getItem('userInfo'))?.id
  const token = window.localStorage.getItem('token')
  if (isIos) {
    window.webkit.messageHandlers.openTubePage.postMessage({
      time: '30',
      userId,
      extraData: encodeURIComponent(
        JSON.stringify({
          token
        })
      )
    })
  } else {
    window.android.openTubePage(
      userId,
      encodeURIComponent(
        JSON.stringify({
          token
        })
      )
    )
  }
}

export const wechatShareLink = (str, scene) => {
  if (isIos) {
    window.webkit.messageHandlers.weiXinShare.postMessage({
      shareURL: 'http://www.baidu.com',
      shareType: '3',
      title: '甜橙视asdasd频'
    }) //朋友圈链接
  } else {
    window.android.shareLink('http://tc.izakq.com/#/signUp?invite=6666aasdsdasd66', 'qwe', scene)
  }
}

export const wechatShareImg = (base64Str?, scene) => {
  if (isIos) {
    window.webkit.messageHandlers.weiXinShare.postMessage({
      image: base64Str || testBase64,
      shareType: scene == 1 ? '1' : '2'
    })
  } else {
    window.android.shareImg(base64Str || testBase64, scene)
  }
}

//系统版本
export function getVersionCode() {
  try {
    var versionCode = window.android.getVersionCode()
    return versionCode
  } catch (e) {
    return -1
  }
}

//强制更新
export function androidUpdate() {
  try {
    window.android.update('https://yy.kkwai.cn/download/app.apk', '修改了一些已知问题！')
  } catch (e) {
    console.log(e)
  }
}
