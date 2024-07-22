const isIos = false
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
const adIdMap = isIos ? androidConfig : androidConfig
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
    window.webkit.messageHandlers.loadSplash.postMessage({
      positionID: adIdMap.splash,
      callBack: 'splashCb'
    })
  } else {
    window.android.loadSplash(adIdMap.splash, 'splashCb')
  }
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
    window.webkit.messageHandlers.loadInteraction.postMessage({
      positionID: adIdMap.interaction,
      callBack: 'interactionCb'
    })
  } else {
    window.android.loadInteraction(adIdMap.interaction, 'interactionCb')
  }
}
export const loadPlayRewardVideo = () => {
  const userId = JSON.parse(window.localStorage.getItem('userInfo'))?.id
  const token = window.localStorage.getItem('token')
  window.rewardVideoCb = function (params) {
    if (params.code == 1) {
      //展现
    }
    if (params.code == 2) {
      //奖励达成回调  可以给用户发奖励
    }
    if (params.code == 0) {
      //错误回调
      //错误信息 params.msg
    }
  }
  if (isIos) {
    window.webkit.messageHandlers.loadPlayRewardVideo.postMessage({
      positionID: adIdMap.rewardVideo,
      userID: userId,
      callBack: 'rewardVideoCb',
      extraData: token
    })
  } else {
    window.android.loadPlayRewardVideo(adIdMap.rewardVideo, userId, token, 'rewardVideoCb')
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
export const wechatShare = () => {
  window.android.share('http://tc.izakq.com/#/signUp?invite=6666aasdsd66')
}
