<template>
  <el-dialog title="表单设计" width="1280" v-model="showDialog" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="vform-design-wrap">
      <v-form-designer :banned-widgets="bannedWidgets" :designer-config="designerConfig" ref="VFormDesignerRef"></v-form-designer>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="saveFormJson">下一步</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 表单设置弹窗 -->
  <set-form-dialog ref="setFormDialogRef" />
</template>
<script setup>
import { ref, toRefs, reactive, defineExpose } from 'vue'
import { http } from '@/api/index.js'
import { ElMessage } from 'element-plus'

import { getCurrentInstance } from 'vue'

import SetFormDialog from '@/views/data-collect/my-report/components/SetFormDialog.vue'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'

const instance = getCurrentInstance()

let showDialog = ref(false)
const VFormDesignerRef = ref(null)
const setFormDialogRef = ref(null)
let formJson = {}
let formData = {
  config: '',
  row: {}
}
// 保存表单
function saveFormJson() {
  /* formJson = VFormDesignerRef.value.getFormJson()
  formData.formConfig.content = JSON.stringify(formJson)
  http('apiReportPost', { ...formData }).then((res) => {
    showDialog.value = false
    ElMessage({
      message: '保存成功',
      type: 'success'
    })
    instance?.proxy?.emitter.emit('refreshReportTable')
  }) */

  formJson = VFormDesignerRef.value.getFormJson()
  formData.config = JSON.stringify(formJson)
  // console.log(formData)
  // if (formData.formConfig) {
  // }
  // formData = {
  //   formConfig: {
  //     content: JSON.stringify(formJson)
  //   }
  // }
  showDialog.value = false
  setFormDialogRef.value.openCreateReportDialog(formData)
}
// 显示弹框
function show(row) {
  if (row) {
    formData.row = setProxy(row)
    // console.log(formData)

    // console.log(row)
    // activateValue = [row.activateStart.split(' ')[0], row.activateEnd.split(' ')[0]]
    /* formData = {
      formConfig: {},
      report: {
        audit: row.audit == null ? '1' : row.audit, // 审批标识 0关闭，1启用   必填
        reportName: row.reportName, // 表单名称
        tableName: row.tableName, // 数据库名称
        enabled: true // 开启状态 - 页面上没有 - 默认true
      },
      reportSchedule: {
        distributeType: row.distributeType == null ? '1' : row.distributeType, // 分发类型 1:定时分发 ,2:只分发一次 - 必填
        collectObjType: row.collectObjType == null ? '2' : row.collectObjType, // 收集对象类型1, "组织"  2, "个人" - 必填  树只选人
        frequency: row.frequency, // 执行频率 0 未设置 1:年,2:月,3:日 - 必填  distributeType = 1时必填
        distributeTime: row.distributeTime, // 分发时间 - distributeType = 1时必填
        endTimeMode: row.endTimeMode, // 截止日期 , 填写结束模式 1下发后X天，2具体截止时间 必填
        endTimeInt: row.endTimeInt, // endTimeMode=1时必填    下发后X天内可填写
        endTimeStr: row.endTimeStr, // endTimeMode=2时必填  具体结束时间
        activateStart: row.activateStart.split(' ')[0],
        activateEnd: row.activateEnd.split(' ')[0]
      }
    } */
    // console.log(formData)
  }
  // console.log(params)
  // formData = params
  showDialog.value = true
}
// 导出方法
defineExpose({ show })

// 禁止显示的表单组件
const bannedWidgets = [
  'tab',
  'time-range',
  'date-range',
  'table',
  'rate',
  'html-text',
  'color',
  'slider',
  'picture-upload',
  'file-upload',
  'rich-editor',
  'cascader'
]
// 显示的内容
const designerConfig = {
  //是否显示语言切换菜单
  languageMenu: false,
  //是否显示GitHub、文档等外部链接
  externalLink: false,
  //是否显示表单模板
  formTemplates: true,
  //是否禁止修改唯一名称
  widgetNameReadonly: false,
  //是否显示组件事件属性折叠面板
  eventCollapse: true,
  //是否显示清空设计器按钮
  clearDesignerButton: true,
  //是否显示预览表单按钮
  previewFormButton: true,
  //是否显示导入JSON按钮
  importJsonButton: true,
  //是否显示导出JSON器按钮
  exportJsonButton: true,
  //是否显示导出代码按钮
  exportCodeButton: false,
  //是否显示生成SFC按钮
  generateSFCButton: false,
  toolbarMaxWidth: 300,
  toolbarMinWidth: 300,
  //表单设计器预设CSS代码
  presetCssCode: ''
}
</script>
<style lang="scss" scoped>
.vform-design-wrap {
  :deep .float-right.external-link {
    display: none;
  }

  :deep .el-header.main-header {
    display: none;
  }
}
</style>
