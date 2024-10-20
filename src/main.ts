import { createApp } from 'vue'
import App from './App.vue'
import './assets/less/index.less'
import { Lazyload } from 'vant'
// import { startMock } from '@/mock'
import router from './router'
import mixin from './utils/mixin'
import VueLazyload from '@jambonn/vue-lazyload'
import { createPinia } from 'pinia'
import { useClick } from '@/utils/hooks/useClick'
import bus, { EVENT_KEY } from '@/utils/bus'
import { setToastDefaultOptions, resetToastDefaultOptions } from 'vant'
const vClick = useClick()
const pinia = createPinia()
const app = createApp(App)
app.mixin(mixin)
setToastDefaultOptions('loading', { forbidClick: true })
const loadImage = new URL('./assets/img/icon/img-loading.png', import.meta.url).href
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadImage,
  attempt: 1
})
app.use(pinia)
app.use(router)
app.mount('#app')
app.directive('click', vClick)
app.use(Lazyload)
// 初始化状态管理器
import { useUsers } from '@/store/users'
useUsers().init()

//放到最后才可以使用pinia
// startMock()
setTimeout(() => {
  bus.emit(EVENT_KEY.HIDE_MUTED_NOTICE)
  window.showMutedNotice = false
}, 2000)
bus.on(EVENT_KEY.REMOVE_MUTED, () => {
  window.isMuted = false
})
