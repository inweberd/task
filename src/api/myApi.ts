import { axiosInstance } from '@/utils/myrequest'
import { AES, token as aesToken } from '@/utils/AES'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
export function login(data) {
  return axiosInstance({ url: 'api/comm/login', method: 'post', data })
}
export function register(data) {
  return axiosInstance({ url: 'api/comm/register', method: 'post', data })
}
export function sociallogin(data) {
  return axiosInstance({ url: 'api/comm/social-login', method: 'post', data })
}
export function column(data) {
  return axiosInstance({ url: 'api/staff/column', method: 'get', data })
}
export function payCard(params) {
  return axiosInstance({ url: 'api/pay-card/column', method: 'get', params })
}
export function bank_list(data) {
  return axiosInstance({ url: 'api/pay-card/bank-list', method: 'get', data })
}
export function create(data) {
  return axiosInstance({ url: 'api/wallet-fetch/create', method: 'get', data })
}
export function logout(data) {
  return axiosInstance({ url: 'api/comm/logout', method: 'DELETE', data })
}
export function article(data) {
  return axiosInstance({ url: 'api/article/one', method: 'get', data })
}

export function articleall(data) {
  return axiosInstance({ url: 'api/article/all', method: 'get', data })
}
export function jsapi(data) {
  return axiosInstance({ url: 'api/we-chat/jsapi', method: 'post', data })
}

// 获取全部会员
export function reqAllStaff(data) {
  return axiosInstance({ url: '/api/vip/rows', method: 'get' })
}

// 获取已有会员列表
export function reqMyStaff() {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

  return axiosInstance({ url: '/api/vip/order?uid=' + userInfo.id, method: 'get' })
}

// 创建订单
export function reqCreateOrder(data) {
  return axiosInstance({ url: '/api/users-wallet/recharge', method: 'post', data })
}

// 获取钱包信息
export function reqWalletInfo() {
  return axiosInstance({ url: '/api/users-wallet/mine', method: 'get' })
}

// 获取用户信息 返回值和登录时返回值相同
export function reqUserInfo(data) {
  return axiosInstance({ url: 'api/users/one', method: 'get', params: data })
}

// 更新用户信息
export function reqUpdateUserInfo(data) {
  return axiosInstance({ url: 'api/users/update', method: 'put', data })
}

// 获取个人收益
export function reqUserIncome() {
  return axiosInstance({ url: '/api/users-wallet/summary', method: 'get' })
}

// 购买会员
export function reqEnterStaff(id) {
  // return Promise.resolve({
  //   code: 200
  // })
  // return axiosInstance({ url: 'api/staff-entry/ok', method: 'post', data })
  return axiosInstance({ url: '/api/vip/exchange?vipId=' + id, method: 'post' })
}

// 记录任务
export function reqRecordTask() {
  return axiosInstance({ url: 'api/staff-entry/quick-task', method: 'post' })
}

// 记录任务
export function reqTaskMoney() {
  return axiosInstance({ url: 'api/staff-entry/task', method: 'get' })
}

// 查询下级分销
export function reqUserDistribution(data) {
  return axiosInstance({ url: 'api/users/distribution', method: 'get', params: data })
}

// 获取成员信息
export function reqUserMemberInfo(params) {
  return axiosInstance({ url: 'api/users/member', method: 'get', params })
}

// 获取成员信息一二三级
export function reqUserMemberTeamIds() {
  return axiosInstance({ url: 'api/users/team', method: 'get' })
}

// 获取成员信息一二三级
export function reqUserMemberTeamList(params) {
  // if (!data.ids) {
  //   return Promise.resolve({
  //     code: 200,
  //     data: {
  //       page: 0,
  //       count: 0,
  //       data: []
  //     }
  //   })
  // }
  return axiosInstance({ url: '/api/users/member', method: 'get', params })
}

// 查询我的会员信息
export function reqUserStaff() {
  return axiosInstance({ url: 'api/users/staff', method: 'get' })
}

// 查询我的会员信息
export function reqResetPwd(data) {
  return axiosInstance({ url: 'api/comm/reset-password', method: 'post', data })
}

// 收入支出日志
export function reqWalletLog(params) {
  return axiosInstance({ url: '/api/users-wallet/logs', method: 'get', params })
  // return axiosInstance({ url: 'api/wallet-log/all', method: 'get', params })
}

// 兑换日志
export function reqWalletFetch(params) {
  return axiosInstance({ url: 'api/wallet-fetch/all', method: 'get', params })
}

// 上传
export function reqUpload(file) {
  const formdata = new FormData()
  formdata.append('file', file)
  return axiosInstance({
    url: 'api/file/upload',
    method: 'post',
    data: formdata,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 微信jssdk签名
export function reqSignature(data) {
  return axiosInstance({ url: 'api/we-chat/jsapi', method: 'post', data })
}

// 添加一条分享记录
export function reqCreateShareLog(data = {}) {
  return axiosInstance({ url: 'api/share-log/create', method: 'post', data })
}

// 卖家发起转赠
export function reqWalletTransfer(data) {
  return axiosInstance({ url: 'api/users-wallet-trade/transfer', method: 'post', data })
}

// 买家确认转赠
export function reqWalletBuyConfirm(data) {
  return axiosInstance({
    url: '/api/users-wallet-trade/transfer-buy-confirm',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 卖家确认转赠
export function reqWalletSellConfirm(data) {
  return axiosInstance({
    url: '/api/users-wallet-trade/transfer-sell-confirm',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 转赠分页
export function reqTradePage(params) {
  return axiosInstance({ url: 'api/users-wallet-trade/find', method: 'get', params })
}

// 删除兑换方式
export function reqDeleteCard(params) {
  return axiosInstance({ url: 'api/pay-card/delete', method: 'delete', params })
}

// 获取充值方式
export function reqRechargeColumn(params) {
  return axiosInstance({ url: 'api/pay/channel', method: 'get', params })
}

// 钱包统计
export function reqWalletStat() {
  return axiosInstance({ url: '/api/config/one?key=BONUS_POOL', method: 'get' })
}

// 手续费排行榜金额总计
export function reqWalletStatShouxufei() {
  return axiosInstance({ url: '/api/config/one?key=BONUS_POOL_TRANSFER', method: 'get' })
}

// 查询用户数量
export function reqUserCount() {
  return axiosInstance({ url: 'api/users/count', method: 'get' })
}

// 拉新领取奖励 4人
export function reqPullNew() {
  return axiosInstance({ url: '/api/staff-entry/pull-new', method: 'post' })
}
// 拉新领取奖励 2人
export function reqPullNewLite() {
  return axiosInstance({ url: '/api/staff-entry/pull-new-lite', method: 'post' })
}

// 获取今日领取次数
export function reqAdvertisingCount() {
  return axiosInstance({ url: '/api/advertising-log/count', method: 'get' })
}

// 获取单价
export function reqAdvertisingSinglePrice() {
  return axiosInstance({ url: '/api/advertising-log/price', method: 'get' })
}

// 一键领取
export function reqQuickReceive() {
  return axiosInstance({ url: '/api/advertising-log/quick', method: 'post' })
}

// 排行榜
export function getWalletRank(id) {
  // return axiosInstance({ url: '/api/wallet-logs/rank', method: 'get', params })
  return axiosInstance({ url: '/api/climb-ladder/rank?limit=100&vipId=' + id, method: 'get' })
}

// 手续费排行榜
export function getWalletRankByVip(params = {}) {
  // return axiosInstance({ url: '/api/wallet-logs/rank', method: 'get', params })
  return axiosInstance({ url: '/api/treasure-basin/rank-by-vip', method: 'get', params })
}

// 会员领取
export function createAdLog(data = {}) {
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
  const q = ''
  const b = { count: '1', video_id: 'qwer' }
  const params = Object.assign({}, q, b)
  const XSsStub = CryptoJS.MD5(ASCII(params)).toString().toUpperCase()

  console.log(params)

  return axiosInstance({
    url: '/api/advertising-log/create',
    method: 'post',
    data: b,
    headers: {
      'X-Khronos': unix,
      'X-Helios': XHelios,
      'X-SS-STUB': XSsStub,
      'X-Medusa': item.encrypt(JSON.stringify(params))
    }
  })
}

// 开始游戏
export function reqNgPlay(data) {
  return axiosInstance({
    url: 'api/ng-game/play',
    method: 'post',
    data
  })
}

// 根据游戏类型请求code
export function reqNgPlayCode() {
  return axiosInstance({
    url: 'api/ng-game/code?plat=ky',
    method: 'get'
  })
}

// 额度转换
export function reqNgTransfer(data = {}) {
  return axiosInstance({ url: 'api/ng-game/transfer', method: 'post', data })
  // return Promise.resolve({ code: 200 })
}

// 额度转换
export function getRankRecord() {
  return axiosInstance({ url: '/api/wallet-log/rank-record', method: 'get' })
}

// 每日购买返利红包
export function reqBonusInvite(mode) {
  return axiosInstance({ url: '/api/wallet/bonus-invite?mode=' + mode, method: 'post' })
}

// 聚宝盆分页
export function reqTreasureBasinPage() {
  return axiosInstance({
    url: '/api/climb-ladder/rows',
    method: 'get'
  })
}

// 聚宝盆购买
export function reqTreasureBasinBuy(id) {
  return axiosInstance({ url: '/api/climb-ladder/exchange?climbLadderId=' + id, method: 'post' })
}

// 查询聚宝盆
// export function getAlreadyBuyTreasureBasin() {
//   return axiosInstance({ url: '/api/treasure-basin/order?limit=100&finished=0', method: 'get' })
//   // return axiosInstance({ url: '/api/treasure-basin/order?limit=100', method: 'get' })
// }

export function getAlreadyBuyTreasureBasin() {
  // return axiosInstance({ url: '/api/treasure-basin/order?limit=30&finished=0', method: 'get' })

  // 今天开始的时间戳（00:00:00）
  let startOfDay = dayjs().startOf('day').valueOf()
  startOfDay = parseInt(startOfDay / 1000)
  // startOfDay = 1749351703
  // startOfDay = 1749352530
  // 今天结束的时间戳（23:59:59.999）
  let endOfDay = dayjs().endOf('day').valueOf()
  endOfDay = parseInt(endOfDay / 1000)
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

  console.log('今天开始的时间戳:', startOfDay)
  console.log('今天结束的时间戳:', endOfDay)
  return axiosInstance({
    // url: `/api/climb-ladder/order?limit=100&create_time=${startOfDay},${endOfDay}&status[]=pending&onlyTrashed=false&page=1&order=id desc`,
    url: `api/climb-ladder/order?page=1&limit=100&onlyTrashed=false&createTime[]=${startOfDay}&createTime[]=${endOfDay}&uid=${userInfo.id}`,
    method: 'get'
  })
}

// 个人聚宝盆信息汇总
export function reqTreasureBasinSummary() {
  return axiosInstance({ url: '/api/treasure-basin/summary', method: 'get' })
}

// 用户佣金互转记录
export function reqTransferLogs(params) {
  return axiosInstance({
    url: '/api/wallet-logs/find',
    method: 'get',
    params
  })
}

// 电子钱包列表
export function reqDianziQianbaoList() {
  return axiosInstance({ url: '/api/users-wallet/e-find', method: 'get' })
}

// 电子钱包列表
export function reqWalletSave(data) {
  return axiosInstance({
    url: '/api/users-wallet/e-save',
    data,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 电子钱包列表
export function reqUpdateWalletAuth(params) {
  return axiosInstance.put('/api/users-wallet/update', params)
}

// 获取转赠订单详情
export function reqWalletTradeTake(params) {
  return axiosInstance({
    url: '/api/users-wallet-trade/take',
    method: 'get',
    params
  })
}

// 排行榜金额
export function reqConfigTake() {
  return axiosInstance.get('/api/config/take?no=PRIZE_POOL')
}

// 广告分页
export function reqFindPoster(params) {
  // return axiosInstance.get('/api/poster/find', params)

  return axiosInstance({ url: 'api/poster/find', method: 'get', params })
}

// 发布广告
export function getPosterCreate(data) {
  return axiosInstance({
    url: '/api/poster/create',
    method: 'post',
    data
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  })
}

// 置顶广告
export function reqPosterTop(params) {
  return axiosInstance({ url: '/api/poster/top', method: 'put', params })
}

// 刷新广告
export function reqPosterRefresh(params) {
  return axiosInstance({ url: '/api/poster/refresh', method: 'put', params })
}
