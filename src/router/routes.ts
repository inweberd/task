import Home from '../pages/home/index.vue'
import Short from '../pages/short/short.vue'
import Test from '../pages/test/Test.vue'
import type { RouteRecordRaw } from 'vue-router'

import CommonSignIn from '@/views/common/pages/sign-in.vue'
import CommonSignUp from '@/views/common/pages/sign-up.vue'
import CommonSignForget from '@/views/common/pages/sign-forget.vue'

const routes: RouteRecordRaw[] = [
  // {path: '/', redirect: '/attention'},
  { path: '/', redirect: '/home' },
  { path: '/test', component: Test },

  { path: '/home', component: Home },
  { path: '/short', component: Short, name: 'short' },

  { path: '/me', component: () => import('@/pages/me/index.vue') },
  { path: '/nofinish', component: () => import('@/pages/me/nofinish.vue') },
  { path: '/gameNofinish', component: () => import('@/pages/me/gameNofinish.vue') },
  { path: '/CreditScoreDetail', component: () => import('@/pages/me/CreditScoreDetail.vue') },
  { path: '/CreditScoreInfo', component: () => import('@/pages/me/CreditScoreInfo.vue') },
  { path: '/choujiangDetail', component: () => import('@/pages/me/choujiangDetail.vue') },
  { path: '/weimaiquanDetail', component: () => import('@/pages/me/weimaiquanDetail.vue') },
  {
    path: '/me/edit-userinfo',
    component: () => import('@/pages/me/userinfo/EditUserInfo.vue')
  },
  {
    path: '/me/edit-userinfo-item',
    component: () => import('@/pages/me/userinfo/EditUserInfoItem.vue')
  },

  { path: '/me/my-card', name: 'myCard', component: () => import('@/pages/me/MyCard.vue') },

  // {path: '/login', component: Login},
  // { path: '/signUp', component: () => import('@/pages/login/signUp.vue') },
  // { path: '/forget', component: () => import('@/pages/login/forget.vue') },
  { path: '/login', redirect: '/common/sign-in' },
  { path: '/signUp', redirect: '/common/sign-up' },
  { path: '/forget', redirect: '/common/sign-forget' },
  { path: '/conversion', component: () => import('@/pages/me/conversion.vue') },
  { path: '/rank', component: () => import('@/pages/me/rank.vue') },
  { path: '/invest', component: () => import('@/pages/me/invest.vue') },
  { path: '/myServe', component: () => import('@/pages/me/myServe.vue') },
  { path: '/dep', component: () => import('@/pages/me/dep.vue') },
  { path: '/binddep', component: () => import('@/pages/me/binddep.vue') },
  { path: '/recharge', component: () => import('@/pages/me/recharge.vue') },

  { path: '/article', component: () => import('@/pages/me/article.vue') },
  { path: '/myteam', component: () => import('@/pages/me/myteam.vue') },
  { path: '/teamStat', component: () => import('@/pages/me/myteam-old.vue') },
  { path: '/fenxiang', component: () => import('@/pages/me/MyCard.vue') },
  { path: '/demo', component: () => import('@/pages/me/demo.vue') },
  { path: '/quanminlaibaojiang', component: () => import('@/pages/me/quanminlaibaojiang.vue') },
  { path: '/pingtaijianjie', component: () => import('@/pages/me/pingtaijianjie.vue') },
  { path: '/caozuoshuoming', component: () => import('@/pages/me/caozuoshuoming.vue') },
  { path: '/shourulaiyuan', component: () => import('@/pages/me/shourulaiyuan.vue') },
  { path: '/fenhong', component: () => import('@/pages/me/fenhong.vue') },
  { path: '/wallet', name: 'wallet', component: () => import('@/pages/me/wallet.vue') },
  { path: '/gameList', name: 'gameList', component: () => import('@/pages/game/gameList.vue') },

  {
    path: '/login/retrieve-password',
    component: () => import('@/pages/login/RetrievePassword.vue')
  },

  {
    name: 'common',
    path: '/common',
    component: () => import('@/views/common/layout/base.vue'),
    children: [
      {
        name: 'signIn',
        path: '/common/sign-in',
        component: CommonSignIn,
        meta: { title: '登录' }
      },
      {
        name: 'sign-up',
        path: '/common/sign-up',
        component: CommonSignUp,
        meta: { title: '注册' }
      },
      {
        name: 'sign-forget',
        path: 'sign-forget',
        component: CommonSignForget,
        meta: { title: '忘记密码' }
      }
    ]
  }
]

export default routes
