import router from './index'
import { getPageTitle } from '@/utils/tools.js'
import { http } from '@/api/index.js'
import { setStorage } from '@/utils/storage.js'

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  if (to.query.loginId || to.query.loginid) {
    if (to.query.loginid) {
      const res = await http('apiAuthRemind', to.query)
      next()
    } else {
      const res = await http('apiAuthToken', { username: to.query.loginId, password: '123456' })
      setStorage('token', res.token)
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {})
