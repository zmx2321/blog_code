<template>
  <el-dialog class="my_dialog" v-model="dialogVisible" title="数据总览" width="70%" lock-scroll :close-on-click-modal="false">
    <div>
      <el-button v-if="button" @click="citationData">引用数据</el-button>
      <el-button @click="exportDataWithExcel">导出数据</el-button>
      <el-button @click="upDate">更新数据</el-button>
    </div>
    <table-page :showForm="false">
      <!-- 表格 -->
      <template #tableContent>
        <el-table border stripe v-loading="loading" :data="tableData" show-summary :summary-method="getSummaries" style="width: 100%">
          <!-- <el-table-column prop="OrgName" label="收集对象" width="180" fixed /> -->
          <el-table-column type="index" width="100" fixed label="序号" />
          <el-table-column label="收集对象" width="200" fixed prop="orgName" />
          <el-table-column v-for="val in tableColumn" :prop="val.prop" :label="val.label" min-width="200" />
        </el-table>
        <!-- <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.size"
          background
          layout="sizes, prev, pager, next"
          :page-sizes="[15, 30, 50, 100]"

          :total="totalPage"
          class="fr mt12"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" /> -->
      </template>
    </table-page>
    <v-form-designer ref="VFormDesignerRef" class="form"></v-form-designer>
  </el-dialog>
</template>

<script setup>
// vue3工具
import { ref, toRefs, toRef, reactive, computed, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { isEmpty } from '@/utils/validate.js'

import { ElMessage, ElMessageBox } from 'element-plus'
// 组件
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
import { getStorage } from '@/utils/storage.js'
import axios from 'axios'
// 接口
import { http } from '@/api/index.js'
import { exportExcel } from '@/api/modules/app.js'
const props = defineProps({
  /* message: {
    type: String,
    default: '',
    required: true
  } */
})
// 引用数据是否显示
let button = ref(false)

// 表单值
let tableData = ref([])
let tableColumn = ref([])
let mergeDate = []
let downQuery = {}
// 初始化工具
const router = useRouter()
const VFormDesignerRef = ref(null)

/**
 * 定义变量
 */
// 弹窗布尔值
let dialogVisible = ref(false)
let loading = ref(false)

/**
 * 定义方法
 */
// 打开弹窗
const openDataScreeningDialog = (row) => {
  loading.value = true
  if (localStorage.getItem('formDataId')) {
    button = true
  }
  downQuery = row
  tableData.value = []
  tableColumn.value = []
  // console.log('openDataScreeningDialog', row)
  dialogVisible.value = true
  http('apiGetListData', row).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }

    VFormDesignerRef.value.setFormJson(JSON.parse(res.formConfig.content))
    nextTick(() => {
      let temColumn = VFormDesignerRef.value.getFieldWidgets()
      temColumn.forEach((item) => {
        if (item.field.formItemFlag === true) {
          tableColumn.value.push({
            prop: item.field.options.name,
            label: item.field.options.label
          })
        }
      })
    })

    let tableDataTemp = res.formListData
    tableDataTemp.forEach((item) => {
      console.log(JSON.parse(item.formValue), 'JSON.parse(item.formValue')
      tableData.value.push({ ...JSON.parse(item.formValue), orgName: item.orgName })
    })
    loading.value = false
  })
}

const citationData = () => {
  mergeDate.shift()
  mergeDate.shift()
  // console.log(mergeDate, 'citationData')
  // console.log(tableColumn.value, 'tableColumn.value')
  let obj = {}
  tableColumn.value.forEach((item, index) => {
    obj[item.prop] = mergeDate[index]
  })
  // console.log(obj, 'obj')
  let formDataId = JSON.parse(JSON.stringify(localStorage.getItem('formDataId')))
  let params = {
    formValue: JSON.stringify(obj),
    formDataId
  }
  http('apiFormData', params).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    router.push({
      path: '/collect/need-filled/fill-in-page',
      query: {
        formDataId
      }
    })
  })
  localStorage.removeItem('formDataId')
}

// 导出
const exportDataWithExcel = () => {
  let params = {
    formDataIdList: downQuery.formDataIdList,
    formId: downQuery.formId,
    sums: mergeDate
  }
  // let params = {
  //   formDataId: downQuery.formDataIdList.join(),
  //   // formDataIdList: JSON.stringify(downQuery.formDataIdList),
  //   formId: downQuery.formId
  // }
  // const url = import.meta.env.VITE_APP_BASE_URL  '/api/formData/download'
  exportExcel(params, '/api/formData/download')
  // arrJoinString =arr.join();

  // // console.log(params, 'download')
  // let url = import.meta.env.VITE_APP_BASE_URL + '/api/formData/download'
  // // 使用原生xhr并添加请求头
  // let xhr = new XMLHttpRequest()
  // let formData = new FormData()
  // let createObjectURL = (object) => {
  //   return window.URL ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
  // }
  // for (let item in params) {
  //   formData.append(item, params[item])
  // }
  // xhr.open('post', url)
  // // let token = 'Bearer ' + getToken()
  // let token = getStorage('token')
  // xhr.setRequestHeader('Authorization', token)
  // // 'Content-Type': 'multipart/form-data',
  // xhr.setRequestHeader('Content-Type', 'application/json; application/octet-stream')
  // // xhr.responseType = 'blob'
  // xhr.responseType = 'arraybuffer'
  // console.log(token)
  // let filename = '数据总览报表.xlsx'
  // xhr.onload = function (e) {
  //   let blob = this.response
  //   if (window.navigator.msSaveOrOpenBlob) {
  //     navigator.msSaveBlob(blob)
  //   } else {
  //     let a = document.createElement('a')
  //     let url = createObjectURL(blob, filename)
  //     a.href = url
  //     a.download = filename
  //     document.body.appendChild(a)
  //     a.click()
  //     window.URL.revokeObjectURL(url)
  //   }
  // }
  // xhr.send(formData) // 发送formdata到xhr
  // xhr.send(formData);  // 发送formdata到xhr
  /* http('apiDownloadFormDate', params).then((res) => {
    // console.log(res, '导出')
    // let url = window.URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel' }))
    var url = createObjectURL(new Blob([res]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', `数据总览报表.xlsx`)
    document.body.appendChild(link)
    link.click()
  }) */
}

//更新
const upDate = () => {
  loading.value = true
  console.log(loading.value)
  http('apiGetListData', downQuery).then((res) => {
    loading.value = false
    ElMessage.success('更新成功')
  })
}
function isNumberOrDecimalButNotPhone(str) {
  return /^1[0-9]{10}$/.test(str) === false && /^[\d.]+$/.test(str)
}
const getSummaries = (param) => {
  const { columns, data } = param
  const sums = []

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总计'
      return
    }
    const values = data.map((item) => {
      let temValue = item[column.property]
      if (typeof temValue !== 'boolean' && isNumberOrDecimalButNotPhone(temValue)) {
        return Number(item[column.property])
      } else {
        return 'test'
      }
    })
    if (!values.every((value) => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          let temValue1 = prev + curr
          let temValue2 = temValue1.toString().match(/^\d+(?:\.\d{0,2})?/)
          return Number(temValue2)
        } else {
          return prev
        }
      }, 0)
      sums[index]
    } else {
      sums[index] = '-,--'
    }
  })
  mergeDate = sums
  return sums
}
defineExpose({
  openDataScreeningDialog
})
</script>

<style lang="scss" scoped>
.form {
  width: 0px !important;
  height: 0px !important;
}
.form_title {
  margin-left: 50px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}
.dashd {
  width: 800px;
  height: 0px;
  border: 0.5px dashed #d9d9d9;
  margin: 15px auto;
}
.dis_box {
  .dis_inbox {
    .dis_inbox_title {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    .dis_inbox_text {
      width: 440px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      margin-left: 20px;
    }
  }
}
</style>
