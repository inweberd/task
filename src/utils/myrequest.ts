import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import config from '@/config'
import { _notice } from './index'
class EventEmitter {
  constructor() {
    this.event = {}
  }
  on(type, cbres, cbrej) {
    if (!this.event[type]) {
      this.event[type] = [[cbres, cbrej]]
    } else {
      this.event[type].push([cbres, cbrej])
    }
  }

  emit(type, res, ansType) {
    if (!this.event[type]) return
    else {
      this.event[type].forEach((cbArr) => {
        if (ansType === 'resolve') {
          cbArr[0](res)
        } else {
          cbArr[1](res)
        }
      })
    }
  }
}
// 根据请求生成对应的key
function generateReqKey(config, hash) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data), hash].join('&')
}

// 存储已发送但未响应的请求
const pendingRequest = new Set()
// 发布订阅容器
const ev = new EventEmitter()
// 接口响应成功
function handleSuccessResponse_limit(response) {
  const reqKey = response.config.pendKey
  if (pendingRequest.has(reqKey)) {
    let x = null
    try {
      x = JSON.parse(JSON.stringify(response))
    } catch (e) {
      x = response
    }
    pendingRequest.delete(reqKey)
    ev.emit(reqKey, x, 'resolve')
    delete ev.reqKey
  }
}

// 接口走失败响应
function handleErrorResponse_limit(error) {
  if (error.type && error.type === 'limiteResSuccess') {
    return Promise.resolve(error.val.data)
  } else if (error.type && error.type === 'limiteResError') {
    return Promise.reject(error.val)
  } else {
    const reqKey = error.config.pendKey
    if (pendingRequest.has(reqKey)) {
      let x = null
      try {
        x = JSON.parse(JSON.stringify(error))
      } catch (e) {
        x = error
      }
      pendingRequest.delete(reqKey)
      ev.emit(reqKey, x, 'reject')
      delete ev.reqKey
    }
  }
  return Promise.reject(error)
}
export const axiosInstance = axios.create({
  baseURL: '',
  timeout: 60000
})

// request拦截器
axiosInstance.interceptors.request.use(
  async (config) => {
    let hash = location.hash
    // 生成请求Key
    let reqKey = generateReqKey(config, hash)

    if (pendingRequest.has(reqKey)) {
      // 如果是相同请求,在这里将请求挂起，通过发布订阅来为该请求返回结果
      // 这里需注意，拿到结果后，无论成功与否，都需要return Promise.reject()来中断这次请求，否则请求会正常发送至服务器
      let res = null
      try {
        // 接口成功响应
        res = await new Promise((resolve, reject) => {
          ev.on(reqKey, resolve, reject)
        })
        return Promise.reject({
          type: 'limiteResSuccess',
          val: res
        })
      } catch (limitFunErr) {
        // 接口报错
        return Promise.reject({
          type: 'limiteResError',
          val: limitFunErr
        })
      }
    } else {
      // 将请求的key保存在config
      config.pendKey = reqKey
      pendingRequest.add(reqKey)
    }

    // 如果没有设置Content-Type，默认application/json
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    let token = window.localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/*
 * 响应拦截器，无论失败或者成功都会返回{ success: boolean, data: xxx }这种类型的数据，没有reject和抛error。
 * 如果有问题，拦截器里会进行提示。在then里面总是会接收到返回值
 * */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log('response',response)
    /*
     * 响应成功的拦截器，主要是对data作处理，如果没有返回data，那么会添加一个data字段，并把response.data的内容合并到data里面，然后返回
     * */

    // 将拿到的结果发布给其他相同的接口
    handleSuccessResponse_limit(response)

    const { data } = response
    // console.log(response)
    if (typeof data === 'string') {
      return { success: true, code: 200, data }
    } else {
      if (data.data === undefined || data.data === null) {
        data.data = { ...data }
      }
      let resCode = data.code
      if (resCode) {
        if (resCode === 401) {
          _notice('登录过期，请重新登录！')
          setTimeout(() => {
            window.localStorage.removeItem('userInfo')
            window.localStorage.removeItem('token')
            window.location.reload()
          }, 2000)
          return
        }

        try {
          resCode = Number(resCode)
        } catch (e) {
          data.code = resCode = 500
          data.success = false
        }
        if (resCode === 0) {
          data.code = resCode = 200
          data.success = true
        }
        if (resCode !== 200) {
          // _notice(response.data.msg || '请求失败，请稍后重试！')
        } else {
          data.success = true
        }
      } else {
        data.code = 200
        data.success = true
      }
      return data
    }
  },
  (error: AxiosError) => {
    console.log('error', error)
    return handleErrorResponse_limit(error)

    // console.log(error.response)
    // console.log(error.response.status)
    if (error.response === undefined) {
      _notice('服务器响应超时')
      return { success: false, code: 500, msg: '服务器响应超时', data: [] }
    }
    if (error.response.status >= 500) {
      _notice('服务器出现错误')
      return { success: false, code: 500, msg: '服务器出现错误', data: [] }
    }
    if (error.response.status === 404) {
      _notice('接口不存在')
      return { success: false, code: 404, msg: '接口不存在', data: [] }
    }
    if (error.response.status === 400) {
      _notice('接口报错')
      return { success: false, code: 400, msg: '接口报错', data: [] }
    }
    if (error.response.status === 401) {
      return { success: false, code: 401, msg: '用户名或密码不正确', data: [] }
    } else {
      const data: any = error.response.data
      if (data === null || data === undefined) {
        _notice('请求失败，请稍后重试！')
        return { success: true, code: 200, data: [] }
      } else {
        const resCode = data.code
        if (data.data === undefined || data.data === null) {
          data.data = { ...data }
        }
        if (resCode && typeof resCode == 'number' && resCode !== 200) {
          _notice('请求失败，请稍后重试！')
        } else {
          data.code = 200
          data.success = true
        }
        return data
      }
    }
  }
)

export interface ApiResponse<T = any> {
  data: T
  success: boolean
}

// export default axiosInstance
