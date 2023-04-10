import axios from 'axios'
import { getStorage } from '@/utils/storage.js'

export function exportExcel (params, tempUrl = '/api/crm/export/exportGrowthRecord') {
  // 导出表格
  const temConfig = {
    headers: {
      'Content-Type': 'application/json; application/octet-stream',
      Authorization: getStorage('token')
    },
    responseType: 'arraybuffer'
  }
  return new Promise((resolve, reject) => {
    let url = import.meta.env.VITE_APP_BASE_URL + tempUrl
    axios.post(url, params, temConfig).then((res) => {
      if (res.status === 200) {
        const blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          // word文档为application/msword,pdf文档为application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8
        })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        const fname = '表格.xlsx' // 下载文件的名字
        link.href = objectUrl
        link.setAttribute('download', decodeURI(fname))
        document.body.appendChild(link)
        link.click()
      } else {
      }
    })
  })
}
