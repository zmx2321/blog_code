export function isEmpty (value) {
  if (value == null || value === undefined || value === 'undefined') {
    // 等同于 value === undefined || value === null
    return true
  }
  const type = Object.prototype.toString.call(value).slice(8, -1)
  switch (type) {
    case 'String':
      return value.trim() === ''
    case 'Array':
      return value.length === 0
    case 'Object':
      return JSON.stringify(value) === '{}' // 普通对象使用 for...in 判断，有 key 即为 false
    default:
      return false // 其他对象均视作非空
  }
}

export const checkInput = (str, type) => {
  // 校验
  switch (type) {
    case 'phone': // 手机号码
      return /^1[0-9]{10}$/.test(str)
    case 'tel': // 座机
      return /^(0d{2,3}-d{7,8})(-d{1,4})?$/.test(str)
    case 'card': // 身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
    case 'pwd': // 密码以字母开头，只能包含字母、数字和下划线
      return /^[a-zA-Z]w{5,17}$/.test(str)
    case 'postal': // 邮政编码
      return /[1-9]d{5}(?!d)/.test(str)
    case 'QQ': // QQ号
      return /^[1-9][0-9]{4,9}$/.test(str)
    case 'email': // 邮箱
      return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
        str
      )
    case 'money': // 金钱(小数点两位)
      return /^d*(?:.d{0,2})?$/.test(str)
    case 'IP': // IP
      return /((?:(?:25[0-5]|2[0-4]d|[01]?d?d).){3}(?:25[0-5]|2[0-4]d|[01]?d?d))/.test(
        str
      )
    case 'date': // 日期时间
      return (
        /^(d{4})-(d{2})-(d{2}) (d{2})(?::d{2}|:(d{2}):(d{2}))$/.test(str) ||
        /^(d{4})-(d{2})-(d{2})$/.test(str)
      )
    case 'number': // 数字
      return /^[0-9]$/.test(str)
    case 'english': // 英文
      return /^[a-zA-Z]+$/.test(str)
    case 'chinese': // 中文
      return /^[u4E00-u9FA5]+$/.test(str)
    case 'lower': // 小写
      return /^[a-z]+$/.test(str)
    case 'upper': // 大写
      return /^[A-Z]+$/.test(str)
    case 'HTML': // HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str)
    case 'input': // 常用输入框
      return /^[\u4e00-\u9fa5A-Za-z0-9]{1,20}/.test(str)
    default:
      return true
  }
}
