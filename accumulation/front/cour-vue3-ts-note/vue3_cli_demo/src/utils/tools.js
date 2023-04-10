import { isEmpty } from '@/utils/validate.js'
import { setting } from '@/config/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * 递归
 * @param {*} children 需要递归的数组
 * @param {*} key 递归的字段
 * @returns 返回拍平的数组
 */
export const recursion = (children, key) => {
  const arr = []
  if (!children) return
  children.forEach((item) => {
    if (!isEmpty(item[key])) {
      item.children = recursion(item[key])
    }
    arr.push(item)
  })
  return arr
}

/**
 * 获取页面标题
 * @param {*} pageTitle 传入的标题名称
 * @returns 返回页面标题
 */
export function getPageTitle(pageTitle) {
  const { title, titleReverse, titleSeparator } = setting

  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (title) newTitles.push(title)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join(titleSeparator)
}

/**
 * 深拷贝
 * @param {*} obj 需要深拷贝的字段
 * @returns 返回深拷贝
 */
export const deepClone = (obj = {}) => {
  // obj是null，或者不是对象或数组，直接返回
  if (typeof obj !== 'object' || obj == null) {
    // 递归里面，如果是值，直接返回
    return obj
  }

  // 递归中如果遇到对象里面的值是对象或者数组，走下面的逻辑
  // 初始化返回结果
  let result
  // 判断是否是数组
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  // 无论对象还是数组，都可以使用for in遍历
  for (let key in obj) {
    // 判断这个key是不是这个对象自身所拥有的属性
    // 保证key不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归(重点)
      // obj[key]表示值
      // 递归是为了防止对象中有深层次的东西，因为你不知道要拷贝的对象中有多少层
      result[key] = deepClone(obj[key])
    }
  }

  // 返回结果
  return result
}
// TODO: 建议用其他方式
// 信息提示窗
export const openInfo = (msg, next) => {
  ElMessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      next()

      /* ElMessage({
        type: 'success',
        message: '操作成功'
      }) */
    })
    .catch(() => {
      /* ElMessage({
        type: 'info',
        message: 'Delete canceled'
      }) */
    })
}
// TODO: 建议用其他方式
export const setProxy = (proxyObj) => {
  return JSON.parse(JSON.stringify(proxyObj))
}

// 函数防抖
export const debounce = (fn, wait) => {
  // console.log('debounce', fn, wait)
  var timer = null

  return function () {
    var context = this,
      args = arguments

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
