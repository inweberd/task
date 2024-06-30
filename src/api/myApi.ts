import { axiosInstance } from '@/utils/myrequest'
export function login(data) {
  return axiosInstance({ url: 'api/comm/login', method: 'post', data })
}
export function register(data) {
  return axiosInstance({ url: 'api/comm/register', method: 'post', data })
}
export function sociallogin(data) {
  return axiosInstance({ url: 'api/comm/social-login', method: 'post', data })
}
export function mine(data) {
  return axiosInstance({ url: 'api/staff-entry/mine', method: 'get', data })
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
