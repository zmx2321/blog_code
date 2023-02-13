import Request from './axios'

const apiUrls = new Map([
  ['apiSendSms', ['member/sms/send', 'post']],
  ['apiSendSms', ['member/sms/send', 'get']]
])

const HeadersMap = new Map([
  ['get', { 'Content-Type': 'application/json' }],
  ['post', { 'Content-Type': 'application/x-www-form-urlencoded' }],
  ['file', { 'Content-Type': 'multipart/form-data' }]
])
const commonParams = {}

export function http(apiName, params, preventRepeat = true) {
  const [url, method, header] = apiUrls.get(apiName)
  return Request.request(
    method,
    url,
    { ...commonParams, ...params },
    { ...header, ...HeadersMap.get(method) },
    preventRepeat,
    method === 'file'
  )
}
