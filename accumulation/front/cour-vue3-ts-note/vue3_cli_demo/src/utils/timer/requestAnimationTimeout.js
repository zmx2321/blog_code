// requestAnimationTimeout.js
// 创建自定 方法 requestAnimationTimeout 用于延迟执行
// 创建自定 方法 cancelAnimationTimeout 用于清除还未执行的requestAnimationTimeout
import getRequestAnimationFrame, { cancelRequestAnimationFrame } from './getRequestAnimationFrame'

const dataSetTimeout = getRequestAnimationFrame()

export const cancelAnimationTimeout = (frame) => cancelRequestAnimationFrame(frame.id)

export const requestAnimationTimeout = (callback, delay = 0) => {
  const start = Date.now()
  function timeout() {
    if (Date.now() - start >= delay) {
      callback.call()
    } else {
      obj.id = dataSetTimeout(timeout)
    }
  }

  const obj = {
    id: dataSetTimeout(timeout)
  }

  return obj
}
