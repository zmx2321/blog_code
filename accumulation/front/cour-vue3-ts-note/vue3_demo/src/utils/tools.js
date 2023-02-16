import { isEmpty } from '@/utils/validate.js'
import { setting } from '@/config/index.js'

export const recursion = (children, key) => {
  const arr = []
  if (!children) return
  children.forEach((item) => {
    if (isEmpty(item[key])) {
      item.children = recursion(item[key])
    }
    arr.push(item)
  })
  return arr
}

export function getPageTitle(pageTitle) {
  const { title, titleReverse, titleSeparator } = setting

  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (title) newTitles.push(title)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join(titleSeparator)
}
