import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 这个routes的类型是非常明确的RouteConfig数组
// const routes: Array<RouteConfig> = [
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
// 去哪，从哪来，下一步
router.beforeEach((to, from, next)=> {
  console.log(to.path);  // 去哪个路由
  next()

  // 可以拿到vm的实例
  // vm实际上就是vue实例即构造函数
  // next((vm)=> {})
})

export default router
