import Layout from '@/layout/index.vue'
export default [
  {
    path: '/collect',
    redirect: '/collect/my-report',
    component: Layout,
    meta: {
      title: '数据采集',
      icon: 'menu-collect'
    },
    children: [
      {
        path: 'my-report',
        name: 'MyReport',
        meta: {
          title: '我的报表'
        },
        component: () => import('@/views/data-collect/MyReport.vue')
      },
      {
        path: 'need-filled',
        name: 'NeedFilled',
        meta: {
          title: '待填报报表'
        },
        component: () => import('@/views/data-collect/NeedFilled.vue')
      },
      {
        path: 'audit-report',
        name: 'AuditReport',
        meta: {
          title: '报表审核'
        },
        component: () => import('@/views/data-collect/AuditReport.vue')
      }
    ]
  }
]
