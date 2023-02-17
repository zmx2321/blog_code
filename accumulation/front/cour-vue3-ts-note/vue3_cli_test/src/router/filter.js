import router from './index'
import {getPageTitle} from '@/utils/tools.js'

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  next()
})

router.afterEach(() => {})
