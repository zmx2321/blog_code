<template>
  <el-dialog class="my_dialog" title="表单设计" width="1280" v-model="showDialog">
    <div class="vform-design-wrap">
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRenderRef"></v-form-render>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import FormJson from './form.json'

const vFormRenderRef = ref(null)
const formJson = reactive(FormJson)
const formData = reactive({})
const optionData = reactive({})

let showDialog = ref(false)

// 保存表单
function saveFormJson() {
  vFormRenderRef.value
    .getFormData()
    .then((res) => {
      // Form Validation OK
      console.log(JSON.stringify(res))
    })
    .catch((error) => {
      // Form Validation failed
      ElMessage.error(error)
    })
}

// 显示弹框
function show(formDataId) {
  showDialog.value = true

  http('detail', { formDataId }).then((res) => {
    formJson = res.formDataDto.formConfigDto.content
    formData = res.formDataDto.formDataDto.formValue
    // totalPage.value = res.data.totalElements
  })
}

// 导出方法
defineExpose({ show })

const submitForm = () => {
  vFormRef.value
    .getFormData()
    .then((formData) => {
      // Form Validation OK
      alert(JSON.stringify(formData))
    })
    .catch((error) => {
      // Form Validation failed
      ElMessage.error(error)
    })
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
