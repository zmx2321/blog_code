import Layout from '@/layout/index.vue'
export default [
  {
    path: '/vform',
    redirect: '/vform/designer',
    name: 'VForm',
    component: Layout,
    meta: {
      title: '拖拽模板'
    },
    children: [
      {
        path: 'designer',
        name: 'Designer',
        meta: {
          title: '模板项目'
        },
        component: () => import('@/views/v-form-designer/index.vue')
      }
    ]
  }
]
