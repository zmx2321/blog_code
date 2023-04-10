import router from './index'
import { getPageTitle } from '@/utils/tools.js'
import { http } from '@/api/index.js'
import { setStorage, getStorage } from '@/utils/storage.js'
const needAdmin = true

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  /**
   * 登录部分内容，由交投统一登录传参数过来处理
   */
  if (to.query.loginId || to.query.loginid) {
    if (to.query.loginid) {
      const res = await http('apiAuthRemind', to.query)
      setStorage('userInfo', res.user)
      setStorage('token', res.token)
      if (needAdmin) {
        if (!res.user.roles.includes('admin') && to.path === '/collect/my-report') {
          next('/collect/need-filled')
        } else {
          next()
        }
      } else {
        next()
      }
    } else {
      const res = await http('apiAuthToken', { username: to.query.loginId, password: '123456' })
      setStorage('userInfo', res.user)
      setStorage('token', res.token)
      if (needAdmin) {
        if (!res.user.roles.includes('admin')) {
          next('/collect/need-filled')
        } else {
          next()
        }
      } else {
        next()
      }
    }
  } else {
    if (needAdmin) {
      if (!getStorage('userInfo').roles.includes('admin') && to.path === '/collect/my-report') {
        next('/collect/need-filled')
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

router.afterEach(() => {})
