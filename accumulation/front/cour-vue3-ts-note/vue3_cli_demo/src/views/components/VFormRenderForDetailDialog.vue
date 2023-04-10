<template>
  <el-dialog class="my_dialog" :title="reportName" width="1280" v-model="showDialog">
    <div class="vform-design-wrap relative">
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRenderRef" v-if="showDialog"></v-form-render>
      <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0"></div>
    </div>
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

// 显示弹框
function show(row) {
  showDialog.value = true
  reportName.value = row.reportName

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
  :deep .float-right.external-link {
    display: none;
  }

  :deep .el-header.main-header {
    display: none;
  }
}
</style>
