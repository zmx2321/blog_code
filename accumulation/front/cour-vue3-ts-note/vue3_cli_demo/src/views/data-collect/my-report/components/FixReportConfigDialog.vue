<template>
  <el-dialog class="my_dialog" v-model="dialogVisible" title="修改报表配置" width="50%" lock-scroll :close-on-click-modal="false">
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef" label-position="left">
      <el-form-item label="分发时间" prop="reportSchedule.distributeTime">
        <el-select v-model="form.reportSchedule.distributeMonth" placeholder="月" style="width: 80px; margin-right: 10px">
          <el-option v-for="item in 12" :key="item" :label="item + '月'" :value="item.toString()"></el-option>
        </el-select>
        <el-select v-model="form.reportSchedule.distributeDay" placeholder="日" style="width: 80px; margin-right: 10px">
          <el-option v-for="item in 28" :key="item" :label="item + '日'" :value="item.toString()"></el-option>
        </el-select>
        <el-time-picker
          v-model="form.reportSchedule.distributeTime"
          style="width: 80px"
          type="time"
          format="HH:mm"
          value-format="HH:mm"
          placeholder="时分"></el-time-picker>
      </el-form-item>
      <el-form-item label="截至日期" class="distributeStatus_body" prop="reportSchedule.endTimeMode">
        <div class="dis_box">
          <div class="dis_inbox ml4">
            <input type="radio" id="ziran" value="1" v-model="form.reportSchedule.endTimeMode" @change="setTimeMode" />
            <label for="ziran" class="dis_inbox_title ml4">
              下发后
              <el-input
                style="width: 40px; margin: 0 8px"
                v-model="form.reportSchedule.endTimeInt"
                :disabled="form.reportSchedule.endTimeMode !== '1'" />
              天内可填写（自然日）
            </label>
          </div>
          <div class="dis_inbox ml4 mt8">
            <input type="radio" id="juti" value="2" v-model="form.reportSchedule.endTimeMode" @change="setTimeMode" />
            <label for="juti" class="dis_inbox_title ml4">
              <el-date-picker
                :disabled="form.reportSchedule.endTimeMode === '1'"
                v-model="form.reportSchedule.endTimeStr"
                style="width: 238px"
                :disabled-date="disabledDate"
                type="date"
                placeholder="请选择时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"></el-date-picker>
            </label>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="生效时间" prop="reportSchedule.activateValue">
        <div style="width: 150px">
          <el-date-picker
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 260px"
            v-model="form.reportSchedule.activateValue"
            type="daterange"
            range-separator="——"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="setActivateValue" />
        </div>
      </el-form-item>
      <!-- </div> -->
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
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 接口
import { http } from '@/api/index.js'
// 引入工具库
import { setProxy } from '@/utils/tools'

const instance = getCurrentInstance()

const props = defineProps({
  /* message: {
    type: String,
    default: '',
    required: true
  } */
})
// 表单值
let form = ref({
  report: {},
  reportSchedule: {}
})

// 初始化工具
const router = useRouter()
const formRef = ref(null)

// let activateValue = ref([]) // 有效日期

/**
 * 定义变量
 */
// 弹窗布尔值
const dialogVisible = ref(false)
// 表单校验规则
const rules = reactive({
  formConfig: {},
  report: {
    /* reportName: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
    tableName: [{ required: true, message: '请输入数据库名称', trigger: 'blur' }], */
    audit: [{ required: true, message: '请选择报表审批类型', trigger: 'blur' }]
  },
  reportSchedule: {
    distributeType: [{ required: true, message: '请选择分发类型', trigger: 'blur' }],
    collectObjType: [{ required: true, message: '请选择收集对象', trigger: 'blur' }],
    // frequency: [{ required: true, message: '请选择执行频率', trigger: 'blur' }],
    distributeTime: [{ required: true, message: '请选择分发时间', trigger: 'blur' }],
    endTimeMode: [{ required: true, message: '请选择截止日期', trigger: 'blur' }],
    activateValue: [{ required: true, message: '请选择生效时间', trigger: 'blur' }]
  }
})

/**
 * 定义方法
 */
// 打开弹窗
const openFixReportConfigDialog = (reportId) => {
  // console.log('修改报表配置', reportId)

  dialogVisible.value = true

  // 详情id
  http('queryByReportId', { reportId }).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    // console.log('修改报表配置', res)

    form.value = {
      report: {
        reportId: reportId,
        enabled: res.reportDto.enabled == null ? true : res.reportDto.enabled // 开启状态 - 页面上没有 - 默认true
        // enabled: res.reportDto.enabled == null ? '1' : res.reportDto.enabled.toString() // 开启状态 - 页面上没有 - 默认true
      },
      reportSchedule: {
        distributeTime: res.reportScheduleDto.distributeTime, // 分发时间 - distributeType = 1时必填
        distributeDay: res.reportScheduleDto.distributeDay ? res.reportScheduleDto.distributeDay.toString() : null, // 分发时间 - distributeType = 1时必填
        distributeMonth: res.reportScheduleDto.distributeMonth ? res.reportScheduleDto.distributeMonth.toString() : null, // 分发时间 - distributeType = 1时必填
        endTimeMode: res.reportScheduleDto.endTimeMode.toString(), // 截止日期 , 填写结束模式 1下发后X天，2具体截止时间 必填
        endTimeInt: res.reportScheduleDto.endTimeInt, // endTimeMode=1时必填    下发后X天内可填写
        endTimeStr: res.reportScheduleDto.endTimeStr, // endTimeMode=2时必填  具体结束时间
        frequency: res.reportScheduleDto.frequency, //
        // activateStart: res.reportScheduleDto.activateStart ? res.reportScheduleDto.activateStart.split(' ')[0] : null, // 有效开始时间  distributeType = 1时必填
        // activateEnd: res.reportScheduleDto.activateEnd ? res.reportScheduleDto.activateEnd.split(' ')[0] : null, // 有效结束时间  distributeType = 1时必填
        activateStart: res.reportScheduleDto.activateStart ? res.reportScheduleDto.activateStart.split(' ')[0] : null, // 有效开始时间  distributeType = 1时必填
        activateEnd: res.reportScheduleDto.activateEnd ? res.reportScheduleDto.activateEnd.split(' ')[0] : null, // 有效结束时间  distributeType = 1时必填
        distributeYear: res.reportScheduleDto ? res.reportScheduleDto.distributeYear : 2023
        // distributeType: res.distributeType
      }
    }

    if (res.reportScheduleDto.activateStart) {
      form.value.reportSchedule.activateValue = [
        res.reportScheduleDto.activateStart.split(' ')[0] + ' ' + '00:00:00',
        res.reportScheduleDto.activateEnd.split(' ')[0] + ' ' + '23:59:59'
      ]
    }

    setTimeMode()
  })
}
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}
const setTimeMode = () => {
  if (form.value.reportSchedule.endTimeMode === '1') {
    form.value.reportSchedule.endTimeStr = ''
  } else {
    form.value.reportSchedule.endTimeInt = ''
  }
}
// 日期
const setActivateValue = (val) => {
  if (val) {
    form.value.reportSchedule.activateStart = val[0] + ' ' + '00:00:00'
    form.value.reportSchedule.activateEnd = val[1] + ' ' + '23:59:59'
  }
}
const submitData = () => {
  let params = JSON.parse(JSON.stringify(form.value))
  if (params.reportSchedule.activateValue) {
    delete params.reportSchedule.activateValue
  }
  // console.log(params)

  http('fixReportConfig', params).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    ElMessage.success('操作成功')

    dialogVisible.value = false

    instance?.proxy?.emitter.emit('refreshReportTable')
  })
}
// 提交
const confirmSubmit = async (formEl) => {
  // console.log('提交', setProxy(form.value))
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      submitData()
    } else {
      console.log(fields)
      ElMessage.warning('表单填写有误')
    }
  })
}

/**
 * 暴露方法
 */
defineExpose({
  openFixReportConfigDialog
})
</script>

<style lang="scss" scoped>
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
