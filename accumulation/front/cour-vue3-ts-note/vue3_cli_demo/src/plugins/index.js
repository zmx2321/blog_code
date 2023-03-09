import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ID_INJECTION_KEY } from 'element-plus'

import mitt from 'mitt'
const Mit = mitt()

import VForm3 from '@/../lib/vform/designer.umd.js'
import '../../lib/vform/designer.style.css'

import VForm3Render from '@/../lib/vform/render.umd.js'
import '../../lib/vform/render.style.css'

import 'virtual:svg-icons-register'
const plugins = {
  install(app, b) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app
      .provide(ID_INJECTION_KEY, {
        prefix: Math.floor(Math.random() * 10000),
        current: 0
      })
      .use(VForm3)
      .use(ElementPlus, {
        locale: zhCn
      })

    app.config.globalProperties.emitter = Mit
  }
}

export default plugins
