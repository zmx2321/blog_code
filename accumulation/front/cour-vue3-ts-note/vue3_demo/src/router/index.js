import { createRouter, createWebHistory } from 'vue-router'

// import store from '@/store'

// 动态读取 modules 中文件
let configRouters = []

const files = import.meta.globEager('./modules/*.js')
for (const key in files) {
  if (Object.hasOwnProperty.call(files, key)) {
    if (files[key].default) {
      configRouters.push(...files[key].default)
    }
  }
}

// store.commit('tabs/COMMIT_ROUTES', configRouters)

const constantRoutes = [...configRouters]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
