import Layout from '@/layout/index.vue'
export default [
  {
    path: '/vform',
    redirect: '/vform/designer',
    name: 'VForm',
    component: Layout,
    meta: {
      title: '模板'
    },
    children: [
      {
        path: 'designer',
        name: 'Designer',
        component: () => import('@/views/v-form-designer/index.vue')
      }
    ]
  }
]
