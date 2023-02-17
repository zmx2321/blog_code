import Layout from '@/layout/index.vue'
export default [
  {
    path: '/',
    meta: {
      hidden: true
    },
    redirect: '/collect'
  },
  {
    component: () => import('@/Example.vue'),
    path: '/example',
    name: 'Example',
    meta: {
      title: '示例2'
    }
  }
]
