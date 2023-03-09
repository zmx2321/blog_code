const pending = [] // 用于存储每个ajax请求的取消函数和ajax标识
const task = {} // 用于存储每个ajax请求的处理函数，通过请求结果调用，以ajax标识为key

// 请求开始前推入pending
export const pushPending = (item) => {
  pending.push(item)
}
// 请求完成后取消该请求，从列表删除
export const removePending = (key) => {
  for (const p in pending) {
    if (pending[p].key === key) {
      // 当前请求在列表中存在时
      pending[p].cancelToken() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从列表中移除
    }
  }
}
// 请求前判断是否已存在该请求
export const existInPending = (key) => {
  return pending.some((e) => e.key === key)
}

// 创建task
export const createTask = (key, resolve) => {
  const callback = (response) => {
    if (response.data.status === -1) {
      // 这里处理授权逻辑
    } else if (response.data.status) {
      // 这里做全局错误提示
    }
    resolve(response.data)
  }
  if (!task[key]) task[key] = []
  task[key].push(callback)
}
// 处理task
export const handleTask = (key, response) => {
  for (let i = 0; task[key] && i < task[key].length; i++) {
    task[key][i](response)
  }
  task[key] = undefined
}
