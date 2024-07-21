import wx from 'weixin-js-sdk'
import { reqSignature } from '@/api/myApi'
export function loadWx(callback?: Function) {
  // if (import.meta.env.DEV) {
  //   return Promise.resolve()
  // }
  return new Promise((resolve, reject) => {
    // 此处是为了兼容ios调用jssdk签名失败的问题 ios在初始进入项目时会存储WxCodeUrl
    const url = sessionStorage.getItem('WxCodeUrl') || location.href.split('#')[0]
    reqSignature({
      url
    }).then((res) => {
      console.log('res', res)
      const { timestamp, nonceStr, signature } = res.data
      wx.config({
        debug: false,
        // debug: navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1,
        appId: 'wx3b8d04c3e730a20a',
        timestamp,
        nonceStr,
        signature,
        jsApiList: ['scanQRCode', 'getLocation', 'openLocation', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
      })
      wx.ready(() => {
        console.log(1111)
        callback && callback()
        resolve(null)
      })
      wx.error(() => {
        reject()
      })
    })
  })
}
