import Layout from '@/layout/index.vue'
export default [
  {
    path: '/',
    redirect: '/home',
    name: 'App',
    component: Layout,
    meta: {
      title: '示例'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    component: () => import('@/Example.vue'),
    path: '/example',
    name: 'Example',
    meta: {
      title: '示例'
    }
  }
]
