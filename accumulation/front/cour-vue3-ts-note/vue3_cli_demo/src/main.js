import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import components from '@/components/index.js'
import ElementPlus from 'element-plus'
import VForm3 from 'vform3-builds'
import './assets/styles/index.scss'
import 'vform3-builds/dist/designer.style.css'
import './assets/iconfont.js'

import '@/router/filter.js'

// 引入事件总线库
import emitter from '@/utils/eventbus'

const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$emitter = emitter // 定义全局事件总线

app.use(pinia).use(components).use(router).use(ElementPlus).use(VForm3).mount('#app')
