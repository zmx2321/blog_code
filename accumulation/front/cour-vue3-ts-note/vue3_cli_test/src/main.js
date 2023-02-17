import { createApp } from 'vue'

import App from './App.vue'

import { createPinia } from 'pinia'
import router from './router'
import '@/router/filter.js'

import './assets/styles/index.scss'
import './utils/iconfont.js'

import components from '@/components/index.js'

import MyPlugins from './plugins/index.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router).use(MyPlugins).use(components).mount('#app')
