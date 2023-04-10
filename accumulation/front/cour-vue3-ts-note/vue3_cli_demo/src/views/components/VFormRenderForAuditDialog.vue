<template>
  <el-dialog class="my_dialog" :title="reportName" width="1280" v-model="showDialog">
    <div class="vform-design-wrap relative">
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRenderRef"></v-form-render>
      <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0"></div>
    </div>

    <el-form style="margin-top: 40px" label-position="top">
      <el-form-item label="审批意见">
        <el-input v-model="auditInfo.auditRemark" placeholder="如果通过可不填，不通过则必填"></el-input>
        <div style="color: red" v-if="showErrorText">请输入审批意见</div>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="verifyFormData(1)">审核不通过</el-button>
        <el-button type="primary" @click="verifyFormData(2)">审核通过</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, toRefs, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { http } from '@/api/index.js'
import { openInfo, deepClone, setProxy } from '@/utils/tools'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
const showErrorText = ref(false)
const vFormRenderRef = ref(null)
const reportName = ref('')
const formJson = reactive({
  widgetList: [],
  formConfig: {
    modelName: 'formData',
    refName: 'vForm',
    rulesName: 'rules',
    labelWidth: 80,
    labelPosition: 'left',
    size: '',
    labelAlign: 'label-left-align',
    cssCode: '',
    customClass: '',
    functions: '',
    layoutType: 'PC',
    jsonVersion: 3,
    onFormCreated: '',
    onFormMounted: '',
    onFormDataChange: '',
    onFormValidate: ''
  }
})
const formData = reactive({})
const optionData = reactive({})

let showDialog = ref(false)

let auditInfo = ref({
  auditRemark: '',
  formDataId: '',
  checkIds: '',
  fromId: '',
  reportId: ''
})

// 显示弹框
function show(row) {
  showDialog.value = true
  reportName.value = row.reportName
  auditInfo.value = {
    formDataId: row.formDataId,
    checkIds: row.checkIds,
    fromId: row.fromId,
    reportId: row.reportId,
    receiver: row.receiver,
    auditRemark: '',
    distributeId: row.distributeId
  }

  http('detail', { formDataId: row.formDataId }).then((res) => {
    nextTick(() => {
      vFormRenderRef.value.setFormJson(JSON.parse(res.formConfigDto.content))
      if (res.formDataDto.formValue) {
        nextTick(() => {
          vFormRenderRef.value.setFormData(JSON.parse(res.formDataDto.formValue))
        })
      }
      nextTick(() => {
        vFormRenderRef.value.disableForm()
      })
    })
    // vFormRenderRef.value.setFormJson(JSON.parse(res.formConfigDto.content))
    // vFormRenderRef.value.disableForm()
    // if (res.formDataDto.formValue) {
    //   nextTick(() => {
    //     vFormRenderRef.value.setFormData(JSON.parse(res.formDataDto.formValue))
    //   })
    // }
  })
}

// 审核数据
const verifyFormData = (data) => {
  if (data === 1 && !auditInfo.value.auditRemark) {
    showErrorText.value = true
    return
  }
  auditInfo.value.auditorStatus = data
  http('audit', setProxy(auditInfo.value)).then((res) => {
    showDialog.value = false
    ElMessage.success('审核完成')
    instance?.proxy?.emitter.emit('refreshAuditTable')
  })
}

// 导出方法
defineExpose({ show })
</script>
<style lang="scss" scoped>
.vform-design-wrap {
  border: 1px solid #f4f5fe;
  padding: 20px;
  overflow-y: scroll;
  :deep .float-right.external-link {
    display: none;
  }

  :deep .el-header.main-header {
    display: none;
  }
}
</style>
