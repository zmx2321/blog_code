import qs from 'qs' // 参数编译
import axios from 'axios'

import { pushPending, removePending, existInPending, createTask, handleTask } from './utils'

const baseURL = import.meta.env.VITE_APP_BASE_URL

// 请求封装
export const request = (method, url, params, headers, preventRepeat = true, uploadFile = false) => {
  const key = baseURL + url + '?' + qs.stringify(params)
  return new Promise((resolve) => {
    const instance = axios.create({
      baseURL: baseURL + url,
      headers: {
        ...headers,
        token: ''
      },
      timeout: 30 * 1000
    })

    instance.interceptors.request.use(
      (config) => {
        if (preventRepeat) {
          config.cancelToken = new axios.CancelToken((cancelToken) => {
            // 判断是否存在请求中的当前请求 如果有取消当前请求
            if (existInPending(key)) {
              cancelToken()
            } else {
              pushPending({ key, cancelToken })
            }
          })
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    instance.interceptors.response.use(
      (response) => {
        if (preventRepeat) {
          removePending(key)
        }
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 请求执行前加入task
    createTask(key, resolve)

    instance(
      Object.assign(
        {},
        { method },
        method === 'post' || method === 'put'
          ? { data: !uploadFile ? qs.stringify(params) : params }
          : { params }
      )
    )
      .then((response) => {
        // 处理task
        handleTask(key, response)
      })
      .catch(() => {})
  })
}
// 定义对外Get、Post请求
export default {
  // 单独导出 用于put等非常规请求及需要特殊处理header的请求
  request
}
