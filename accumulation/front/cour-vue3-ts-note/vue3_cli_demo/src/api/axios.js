import qs from 'qs' // 参数编译
import axios from 'axios'
import { getStorage } from '@/utils/storage.js'
import { ElMessage } from 'element-plus'

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
        Authorization: getStorage('token')
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
        ElMessage.error({ message: '请求超时!' })
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
      (err) => {
        handlerResponseError(err)
        return Promise.reject(error)
      }
    )

    // 请求执行前加入task
    createTask(key, resolve)

    instance(
      // Object.assign({}, { method }, method === 'post' || method === 'put' ? { data: !uploadFile ? qs.stringify(params) : params } : { params })
      Object.assign({}, { method }, method === 'post' || method === 'put' ? { data: params } : { params })
    )
      .then((response) => {
        // 处理task
        handleTask(key, response)
      })
      .catch(() => {})
  })
}

function handlerResponseError(err) {
  if (err.code === 'ERR_CANCELED') return
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误(400)'
        break
      case 401:
        err.message = '未授权，请重新登录(401)'
        break
      case 403:
        err.message = '拒绝访问(403)'
        break
      case 404:
        err.message = '请求出错(404)'
        break
      case 408:
        err.message = '请求超时(408)'
        break
      case 500:
        err.message = '服务器错误(500)'
        break
      case 501:
        err.message = '服务未实现(501)'
        break
      case 502:
        err.message = '网络错误(502)'
        break
      case 503:
        err.message = '服务不可用(503)'
        break
      case 504:
        err.message = '网络超时(504)'
        break
      case 505:
        err.message = 'HTTP版本不受支持(505)'
        break
      default:
        err.message = `连接出错(${err.response.status})!`
    }
  } else {
    err.message = '连接服务器失败!'
  }
  ElMessage.error({ message: err.message })
}

// 定义对外Get、Post请求
export default {
  // 单独导出 用于put等非常规请求及需要特殊处理header的请求
  request
}
