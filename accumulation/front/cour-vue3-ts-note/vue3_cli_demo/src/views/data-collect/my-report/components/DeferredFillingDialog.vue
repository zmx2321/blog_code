<template>
  <el-dialog class="my_dialog" v-model="dialogVisible" title="延期填报" width="50%" lock-scroll :close-on-click-modal="false">
    <div class="form_title">基础配置</div>
    <div class="dashd"></div>
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef" label-position="left">
      <el-form-item label="截至日期" class="distributeStatus_body" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          style="width: 238px"
          type="date"
          placeholder="请选择时间"
          :disabled-date="disabledDate"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"></el-date-picker>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSubmit(formRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// vue3工具
import { ref, toRefs, toRef, reactive, computed, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
// 引入工具库
import { setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'

// 初始化工具
const emit = defineEmits(['distributeSuccess'])
const instance = getCurrentInstance()

// 表单值
let form = ref({})
const formRef = ref(null)

// 表单校验规则
const rules = reactive({
  endTime: [{ required: true, message: '请选择截止日期', trigger: 'blur' }]
})

/**
 * 定义变量
 */
const dialogVisible = ref(false) // 弹窗布尔值

/**
 * 定义方法
 */
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}
// 打开弹窗
const openDeferredFillingDialog = (row) => {
  // console.log(row)
  form.value = {}

  dialogVisible.value = true
  form.value.distributeId = row.distribute_id
}
const confirmSubmit = (formEl) => {
  // console.log(form.value)

  http('apiReportDistributePut', form.value).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    dialogVisible.value = false
    ElMessage.success('提交成功')
    instance?.proxy?.emitter.emit('refreshDistributionRecordTable')
  })

  /* if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      getFormData() // 获取表单数据
    } else {
      console.log('error submit!', fields)
    }
  }) */
}

/**
 * 暴露方法
 */
defineExpose({
  openDeferredFillingDialog
})
</script>

<style lang="scss" scoped>
.form_title {
  // margin-left: 50px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}
.dashd {
  // width: 800px;
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
