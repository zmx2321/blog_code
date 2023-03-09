<template>
  <el-dialog :title="reportName" width="1280" v-model="showDialog">
    <div class="vform-design-wrap relative">
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRenderRef"></v-form-render>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, toRefs, reactive, defineExpose, nextTick } from 'vue'
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

// 显示弹框
function show(row) {
  showDialog.value = true
  reportName.value = row.reportName

  http('detail', { formDataId: row.formDataId }).then((res) => {
    vFormRenderRef.value.setFormJson(JSON.parse(res.formConfigDto.content))
    vFormRenderRef.value.disableForm()
    if (res.formDataDto.formValue) {
      nextTick(() => {
        vFormRenderRef.value.setFormData(JSON.parse(res.formDataDto.formValue))
      })
    }
  })
}

// 导出方法
defineExpose({ show })
</script>
<style lang="scss" scoped>
.vform-design-wrap {
  border: 1px solid #f4f5fe;
  padding: 20px;
  margin: 20px;
  overflow-y: scroll;
  max-height: 800px;
  :deep .float-right.external-link {
    display: none;
  }

  :deep .el-header.main-header {
    display: none;
  }
}
</style>
