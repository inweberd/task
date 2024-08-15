import dayjs from 'dayjs'
import { reqRecordTask, reqTaskMoney } from '@/api/myApi'

/**
 * @description 获取是否是会员
 * @param cb
 * @return boolean
 */
const getIsVip = (cb) => {
  let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  if (!userInfo?.result?.staff?.serial) {
    cb && cb(false)
  } else {
    cb && cb(true)
  }
}

/**
 * @description 获取今日是否分享
 * @param cb
 * @return boolean
 */
const getIsShare = (cb) => {
  cb && cb(localStorage.isShare === dayjs().format('YYYY-MM-DD'))
}

/**
 * @description 获取可领取红包金额
 * @param cb
 * @return [
 *    {
 *     "id": 3,
 *     "name": "3级",
 *     "task": 1,
 *     "unit_price": 15,
 *     "price": 500,
 *     "serial": 3
 *    }
 * ]
 */
const getRedBagMoney = async (cb) => {
  try {
    const res = await reqTaskMoney()

    if (!res.data.length) {
      cb([])
    } else {
      cb(res.data[0])
    }
    redPackageInfo.value = res.data[0]
  } catch (error) {
    console.error('Error in async operation:', error)
    cb('Error :' + error.message)
  }
}

/**
 * @description 领取红包
 * @param id
 * @param cb
 * @return boolean
 */
const receiveRedBag = (id, cb) => {
  reqRecordTask({
    staff_id: id
  }).then((res) => {
    if (res.code === 200) {
      cb(true)
    } else {
      cb(false)
    }
  })
}
export const outsideFn = () => {
  window.getIsVip = getIsVip
  window.getIsShare = getIsShare
  window.getRedBagMoney = getRedBagMoney
  window.receiveRedBag = receiveRedBag
}
