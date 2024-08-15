import cache from '@/utils/cache'

import { defineStore } from 'pinia'
import { useIntervalFn } from '@vueuse/core'
import { POST } from '@/utils/axios.ts'
// import { useCookies }    from '@vueuse/integrations/useCookies'

// const LOGIN_TOKEN = 'LOGIN_TOKEN'
// const cookies     = useCookies([LOGIN_TOKEN])

// 对应后端表名 - 很重要，不要改，不要作死
export const key = 'users'

interface Users {
  id: number
  account: string
  password: string
  nickname: string
  email: string
  phone: string
  avatar: string
  description: string
  title: string
  gender: string
  exp: number
  source: string
  status: 'normal' | 'banned'
  remark: string
  json: any
  text: any
  login_time: number
  create_time: number
  update_time: number
  delete_time: number
}

export const useUsers = defineStore(key, {
  state: () => ({
    info: {} as Users,
    token: '',
    status: {
      // 登录校验了没
      check: false,
      // 是否已登录
      login: false
    }
  }),
  actions: {
    // 初始化仓库
    init(): void {
      const info = cache.get(`${key}[info]`)
      if (info) this.info = Object.assign(this.info, info)

      const token = cache.get('token')
      if (token) this.token = token

      // 初始化先校验一次 - 防止刷新页面时登录状态丢失
      this.check()
      // 定时器 - 10分钟检查一次
      useIntervalFn(() => this.check(), 10 * 60 * 1000)
    },
    // 校验用户登录是否合法
    check(): void {
      // 如果没有token则不校验
      if (!this.token) return
      this.status.check = true
      this.status.login = true
      return
      // 还没有校验过
      if (!this.status.check)
        POST('/api/comm/check-token', null, {
          ShowResolveMessage: false
        })
          .then(({ code, data }) => {
            this.FinishCheck(code, data)
          })
          .catch(() => {})
          .finally(() => (this.status.check = true))
    },
    // 异步校验
    async AsyncCheck(): Promise<void> {
      // const { code, data } = await POST('/api/comm/check-token', null, {
      //   ShowResolveMessage: false
      // }).finally(() => (this.status.check = true))
      //
      // this.FinishCheck(code, data)
      this.status.check = true
    },
    // 校验完成
    FinishCheck(code: number, data: any): void {
      // 429 为频繁请求
      // if (code === 429) return
      //
      // if (code !== 200) {
      //   this.token = ''
      //   this.info = {} as Users
      //   this.status.login = false
      //   // 清除缓存
      //   cache.del('token')
      //   cache.del(`${key}[info]`)
      //
      //   return
      // }
      //
      // const { user, token, valid_time } = data
      // this.info = user
      // this.token = token
      this.status.login = true
      // const expires = new Date(Date.now() + parseInt(valid_time) * 1000)

      // // 缓存用户信息
      // cache.set(`${key}[info]`, user)
      // // 缓存 token
      // cache.set('token', token)
    }
  }
})
