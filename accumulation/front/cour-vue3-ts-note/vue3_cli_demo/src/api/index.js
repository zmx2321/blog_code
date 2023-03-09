import Request from './axios'

let modulesApis = []
const files = import.meta.globEager('./modules/*.js')
for (const key in files) {
  if (Object.hasOwnProperty.call(files, key)) {
    if (files[key].default) {
      modulesApis.push(...files[key].default)
    }
  }
}

const apiUrls = new Map([
  ['apiAuthRemind', ['/auth/remind', 'post']],
  ['apiAuthToken', ['/auth/token', 'post']],
  ...modulesApis // 我的报表
  /*  */
])

const HeadersMap = new Map([
  ['get', { 'Content-Type': 'application/json' }],
  ['post', { 'Content-Type': 'application/json' }],
  ['file', { 'Content-Type': 'multipart/form-data' }]
])
const commonParams = {}

export function http(apiName, params, preventRepeat = true) {
  const [url, method, header] = apiUrls.get(apiName)
  return Request.request(method, url, { ...commonParams, ...params }, { ...header, ...HeadersMap.get(method) }, preventRepeat, method === 'file')
}
