import { testBase64 } from '@/utils/testBase64'

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
export const loadShortVideo = () => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const userId = userInfo?.id
  const serial = userInfo?.result?.staff?.serial
  const token = window.localStorage.getItem('token')
  if (isIos) {
    window.webkit.messageHandlers.openContentPage.postMessage({
      userId,
      extraData: encodeURIComponent(
        JSON.stringify({
          token
        })
      ),
      token
    })
  } else {
    window.android.openContentPage(
      userId,
      encodeURIComponent(
        JSON.stringify({
          token,
          v: !!serial
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
