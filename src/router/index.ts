import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'
import { useBaseStore } from '@/store/pinia'
import { IS_SUB_DOMAIN } from '@/config'

const router = createRouter({
  // history: IS_SUB_DOMAIN ? createWebHashHistory() : createWebHistory(),
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log('savedPosition', savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
// 检测用户使用的是微信浏览器或者qq浏览器
const isWeChatBrowser =
  navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('qqbrowser') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('qq') !== -1
let routeDeep = ['/signUp', '/forget', 'fenxiang', 'test']
router.beforeEach((to, from) => {
  // console.log()

  // if (
  //   to.query.invite &&
  //   to.query.uid &&
  //   isWeChatBrowser &&
  //   to.path === '/signUp' &&
  //   !to.query.injectWeixin
  // ) {
  //   router.push({
  //     path: '/fenxiang',
  //     query: to.query
  //   })
  //   return
  // }

  let token = window.localStorage.getItem('token')
  if (routeDeep.some((e) => to.fullPath.includes(e))) {
    return true
  }

  if (!token && to.fullPath !== '/login' && !routeDeep.some((e) => e === to.fullPath)) {
    return '/login'
  }
  const baseStore = useBaseStore()
  //footer下面的5个按钮，对跳不要用动画
  const noAnimation = ['/', '/home', '/me', '/shop', '/message', '/publish', '/home/live', '/test']
  if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
    return true
  }

  const toDepth = routes.findIndex((v) => v.path === to.path)
  const fromDepth = routes.findIndex((v) => v.path === from.path)
  // const fromDepth = routeDeep.indexOf(from.path)

  if (toDepth > fromDepth) {
    if (to.matched && to.matched.length) {
      const toComponentName = to.matched[0].components?.default.name
      baseStore.updateExcludeNames({ type: 'remove', value: toComponentName })
      // console.log('前进')
      // console.log('删除', toComponentName)
    }
  } else {
    if (from.matched && from.matched.length) {
      const fromComponentName = from.matched[0].components?.default.name
      baseStore.updateExcludeNames({ type: 'add', value: fromComponentName })

      // console.log('后退')
      // console.log('添加', fromComponentName)
    }
  }
  return true
})

export default router
