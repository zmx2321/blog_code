/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
// import { getRouterList } from '@/api/router'
// import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'
export const useRoutesStore = defineStore('routesStore', {
  state: () => ({
    routes: constantRoutes,
    partialRoutes: []
  }),
  getters: {
    getRoutes: (state) => state.routes,
    getPartialRoutes: (state) => state.partialRoutes
  },
  actions: {
    setRoutes(permissions) {
      //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
      // const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions)
      this.routes = constantRoutes.concat([])
      return []
    },
    setAllRoutes() {
      // let { data } = await getRouterList()
      let { data } = []
      data.push({ path: '*', redirect: '/404', meta: { hidden: true } })
      // let accessRoutes = convertRouter(data)
      this.routes = constantRoutes.concat(data)
      return accessRoutes
    },
    setPartialRoutes(accessRoutes) {
      this.partialRoutes = constantRoutes.concat(accessRoutes)
      return accessRoutes
    }
  }
})
