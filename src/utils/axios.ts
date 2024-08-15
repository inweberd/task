import { ElLoading, type LoadingOptions, ElMessage } from 'element-plus'
import axios, { type AxiosResponseHeaders, type RawAxiosResponseHeaders } from 'axios'
import type { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from 'axios'

import { storeToRefs } from 'pinia'
import { useUsers } from '@/store/users.ts'
import { Token } from '@/utils/crypto.ts'

const pending = new Map()
const loadingInstance: LoadingInstance = {
  target: null,
  count: 0
}

interface MapStringAny {
  [key: string]: any
}
interface ApiResponse<T = any> {
  code: number
  data: T
  msg: string
}

/**
 * 创建axios实例
 * @param config axios请求配置
 * @param options 请求配置
 * @returns Promise<AxiosResponse<any>>
 */
function CreateAxios(
  config: AxiosRequestConfig,
  options: Options = {}
): Promise<AxiosResponse<any>> {
  // 请求头信息
  const headers = config.headers || {}
  // 创建axios实例
  const instance = axios.create({
    // baseURL: uri(),
    timeout: 1000 * 300,
    headers: Object.assign(
      {
        'Content-Type': 'application/json'
      },
      headers
    ),
    // 上传进度
    onUploadProgress: function (event) {
      options.onUploadProgress && options.onUploadProgress(event)
    }
  })

  // 合并请求配置
  options = Object.assign(
    {
      // 自动携带token，默认为true
      AutoToken: true,
      // 是否开启取消重复请求, 默认为 true
      OnlyRequest: true,
      // 是否开启loading层效果, 默认为false
      loading: false,
      // 是否开启接口错误信息展示，默认为true
      ShowRejectMessage: true,
      // 是否开启接口成功信息展示，默认为true
      ShowResolveMessage: true,
      // 显示 code 2xx 信息
      Show2xxMessage: false,
      // 跳转 code 3xx 信息
      Jump3xxMessage: false,
      // 显示 code 4xx 信息
      Show4xxMessage: true,
      // 显示 code 5xx 信息
      Show5xxMessage: false
    },
    options
  )

  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // 移除重复请求
      RemovePending(config)
      // 如果开启取消重复请求，则添加到队列中
      options.OnlyRequest && AddPending(config)

      // 创建loading实例
      if (options.loading) {
        loadingInstance.count++
        if (loadingInstance.count === 1) {
          loadingInstance.target = ElLoading.service(options.LoadingOptions)
        }
      }

      const { token } = storeToRefs(useUsers())

      // 自动携带token
      // if (config.headers) {
      //     if (options.AutoToken && token.value) config.headers.Authorization = token.value
      // }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  instance.interceptors.response.use(
    (response: any) => {
      // 响应数据
      const { config, data } = response
      // 配置项
      const { loading, ShowResolveMessage, Show2xxMessage, Show4xxMessage } = options

      // 移除重复请求
      RemovePending(config)
      // 关闭loading
      loading && CloseLoading(options)

      // 显示2xx错误信息
      if (
        ShowResolveMessage &&
        Show2xxMessage &&
        data &&
        parseInt(data.code) >= 200 &&
        parseInt(data.code) < 300
      ) {
        ElMessage({ type: 'success', message: data.msg, plain: true })
      }

      // 显示4xx错误信息
      if (
        ShowResolveMessage &&
        Show4xxMessage &&
        data &&
        parseInt(data.code) >= 400 &&
        parseInt(data.code) < 500
      ) {
        ElMessage({ type: 'error', message: data.msg, plain: true })
      }

      // 显示5xx错误信息
      if (
        ShowResolveMessage &&
        Show4xxMessage &&
        data &&
        parseInt(data.code) >= 500 &&
        parseInt(data.code) < 600
      ) {
        ElMessage({ type: 'error', message: data.msg, plain: true })
      }

      return response
    },
    (error) => {
      const { config } = error
      // 配置项
      const { loading } = options

      // 移除重复请求
      config && RemovePending(config)
      // 关闭loading
      loading && CloseLoading(options)

      // 错误继续返回给到具体页面
      return Promise.reject(error)
    }
  )

  // 返回axios实例
  return instance(config)
}

/**
 * GET请求
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求配置
 * @returns Promise<ApiResponse<any>>
 */
export const GET = async (
  url: string,
  params: MapStringAny | null = {},
  options: Options = {}
): Promise<ApiResponse> => {
  // 请求头信息
  const headers = options.headers || {}

  const response = await CreateAxios({ url, params, headers, method: 'GET' }, options)

  const { code, msg, data } = response.data
  return { code, msg, data } as ApiResponse<any>
}

/**
 * DEL =请求
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求配置
 * @returns Promise<ApiResponse<any>>
 */
export const DEL = async (
  url: string,
  params: MapStringAny | null = {},
  options: Options = {}
): Promise<ApiResponse> => {
  // 请求头信息
  const headers = options.headers || {}

  const response = await CreateAxios({ url, params, headers, method: 'DELETE' }, options)

  const { code, msg, data } = response.data
  return { code, msg, data } as ApiResponse
}

/**
 * PUT请求
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求配置
 * @returns Promise<ApiResponse<any>>
 */
export const PUT = async (
  url: string | undefined,
  params: MapStringAny | null = {},
  options: Options = {}
): Promise<ApiResponse> => {
  // 请求头信息
  const headers = options.headers || {}

  const response = await CreateAxios({ url, headers, data: params, method: 'PUT' }, options)

  const { code, msg, data } = response.data
  return { code, msg, data } as ApiResponse
}

/**
 * POST请求
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求配置
 * @returns Promise<ApiResponse<any>>
 */
export const POST = async (
  url: string | undefined,
  params: MapStringAny | null = {},
  options: Options = {}
): Promise<ApiResponse> => {
  // 请求头信息
  const headers = options.headers || {}

  const response = await CreateAxios({ url, headers, data: params, method: 'POST' }, options)

  const { code, msg, data } = response.data
  return { code, msg, data } as ApiResponse
}

/**
 * 关闭Loading层实例
 */
function CloseLoading(options: Options) {
  if (options.loading && loadingInstance.count > 0) loadingInstance.count--
  if (loadingInstance.count === 0) {
    loadingInstance.target.close()
    loadingInstance.target = null
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 */
function AddPending(config: AxiosRequestConfig) {
  const key = PendingKey(config)
  const cancelToken = new axios.CancelToken((cancel) => {
    if (!pending.has(key)) {
      pending.set(key, cancel)
    }
  })
  config.cancelToken = config.cancelToken || cancelToken
}

/**
 * 删除重复的请求
 */
function RemovePending(config: AxiosRequestConfig) {
  const key = PendingKey(config)
  if (pending.has(key)) {
    const cancelToken = pending.get(key)
    cancelToken(key)
    pending.delete(key)
  }
}

/**
 * 生成每个请求的唯一key
 */
function PendingKey(config: AxiosRequestConfig) {
  // eslint-disable-next-line prefer-const
  let { url, method, params, data, headers } = config

  // response里面返回的config.data是个字符串对象
  if (typeof data === 'string') data = JSON.parse(data)

  // 生成唯一key
  return Token(
    [
      url,
      method,
      headers && headers.Authorization ? headers.Authorization : '',
      JSON.stringify(params),
      JSON.stringify(data)
    ].join('&')
  )
}

interface LoadingInstance {
  target: any
  count: number
}
interface Options {
  // 请求头信息
  headers?: AxiosResponseHeaders | RawAxiosResponseHeaders
  // 自动携带token，默认为true
  AutoToken?: boolean
  // 是否开启取消重复请求, 默认为 true
  OnlyRequest?: boolean
  // 是否开启loading层效果, 默认为false
  loading?: boolean
  // loading配置
  LoadingOptions?: LoadingOptions
  // 是否开启接口错误信息展示，默认为true
  ShowRejectMessage?: boolean
  // 是否开启接口成功信息展示，默认为true
  ShowResolveMessage?: boolean
  // 显示 code 2xx 信息
  Show2xxMessage?: boolean
  // 跳转 code 3xx 信息
  Jump3xxMessage?: boolean
  // 显示 code 4xx 信息
  Show4xxMessage?: boolean
  // 显示 code 5xx 信息
  Show5xxMessage?: boolean
  // 上传进度
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}
