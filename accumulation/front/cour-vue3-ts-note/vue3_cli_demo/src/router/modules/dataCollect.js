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
        path: '/collect/my-report',
        name: 'MyReport',
        meta: {
          title: '我的报表',
          keepAlive: true
        },
        component: () => import('@/views/data-collect/my-report/Index.vue')
      },
      {
        path: '/collect/my-report/distribution-record',
        name: 'distributionRecord',
        meta: {
          hidden: true,
          activeMenuPath: '/collect/my-report',
          title: '分发记录'
        },
        component: () => import('@/views/data-collect/my-report/DistributionRecord.vue')
      },
      {
        path: '/collect/my-report/collection-progress',
        name: 'collectionProgress',
        meta: {
          hidden: true,
          activeMenuPath: '/collect/my-report',
          title: '收集进度'
        },
        component: () => import('@/views/data-collect/my-report/CollectionProgress.vue')
      },
      /* {
        path: '/collect/my-report/my-report-detail',
        name: 'myReportDetail',
        meta: {
          title: '详情'
        },
        component: () => import('@/views/data-collect/my-report/MyReportDetail.vue')
      }, */
      {
        path: '/collect/need-filled',
        name: 'NeedFilled',
        meta: {
          title: '待填报报表',
          keepAlive: true
        },
        component: () => import('@/views/data-collect/NeedFilled.vue')
      },
      {
        path: '/collect/need-filled/fill-in-page',
        name: 'fill-in-page',
        meta: {
          activeMenuPath: '/collect/need-filled',
          hidden: true,
          title: '填报页'
        },
        component: () => import('@/views/data-collect/FillInPage.vue')
      },
      {
        path: '/collect/need-filled/RelatingReport',
        name: 'RelatingReport',
        meta: {
          activeMenuPath: '/collect/need-filled',
          hidden: true,
          title: '关联表'
        },
        component: () => import('@/views/data-collect/RelatingReport.vue')
      },
      {
        path: '/collect/audit-report',
        name: 'AuditReport',
        meta: {
          title: '报表审核',
          keepAlive: true
        },
        component: () => import('@/views/data-collect/AuditReport.vue')
      },
      {
        path: '/collect/test-tb-page',
        name: 'TestTbPage',
        meta: {
          title: '测试表格封装',
          keepAlive: true,
          hidden: true
        },
        component: () => import('@/views/data-collect/TestTbPage.vue')
      }
      /* {
        path: '/collect/my-report1',
        name: 'MyReport',
        meta: {
          title: '我的报表1',
          keepAlive: true,
          hidden: false
        },
        component: () => import('@/views/data-collect/my-report/Index.vue')
      } */
    ]
  }
]
