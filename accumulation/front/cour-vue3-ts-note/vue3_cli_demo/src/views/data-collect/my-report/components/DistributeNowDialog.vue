<template>
  <el-dialog class="my_dialog" v-model="dialogVisible" title="立即分发设置" width="50%" lock-scroll :close-on-click-modal="false">
    <div class="form_title">基础配置</div>
    <div class="dashd"></div>
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef" label-position="left">
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
                type="date"
                :disabled-date="disabledDate"
                placeholder="请选择时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"></el-date-picker>
            </label>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <div class="form_title">收集对象配置</div>
    <div class="dashd"></div>
    <!-- <select-company-user ref="SelectCompanyUserRef" @setCollectObjList="setCollectObjList" :distributeStatus="'2'" /> -->
    <select-user ref="refSelectUser" />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSubmit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// vue3工具
import { ref, toRefs, toRef, reactive, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 组件
import SelectCompanyUser from '@/components/global/SelectCompanyUser.vue'
// 引入工具库
import { setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'

// 初始化工具
const emit = defineEmits(['distributeSuccess'])
const instance = getCurrentInstance()

const props = defineProps({
  isMyReport: {
    type: Boolean,
    default: true
  }
})

// 表单值
let form = ref({
  formConfig: {},
  report: {},
  reportSchedule: {
    endTimeMode: '1'
  }
})

const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}

// 表单校验规则
const rules = reactive({
  formConfig: {},
  report: {},
  reportSchedule: {
    endTimeMode: [{ required: true, message: '请选择截止日期', trigger: 'blur' }]
  }
})

// 初始化工具
const router = useRouter()
// 定义子组件实例，名称要和上面的ref相同
const SelectCompanyUserRef = ref(null)
const refSelectUser = ref(null)

/**
 * 定义变量
 */
const dialogVisible = ref(false) // 弹窗布尔值
let params = ref({
  formConfig: {},
  report: {},
  reportSchedule: {
    // endTimeMode: '1'
  }
}) // 提交数据

/**
 * 定义方法
 */
// 打开弹窗
const openDistributeNowDialog = (reportId) => {
  dialogVisible.value = true
  // console.log(reportId)
  // rowId = reportId

  // 详情id
  http('queryByReportId', { reportId }).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    console.log(res)

    refSelectUser.value.resetRightSelectedUsers()

    // console.log(res.reportScheduleDto)

    /* if (res.reportScheduleDto.endTimeMode === 1) {
      // console.log('int')
      form.value.reportSchedule.endTimeMode = '1'
      form.value.reportSchedule.endTimeInt = res.reportScheduleDto.endTimeInt
    } else {
      // console.log('str')
      form.value.reportSchedule.endTimeMode = '2'
      form.value.reportSchedule.endTimeStr = res.reportScheduleDto.endTimeStr
    } */
    // form.value.reportSchedule.endTimeInt = res.reportScheduleDto.endTimeInt

    params.value = {
      // 表单内容 - 自定义报表
      formConfig: {
        content: res.formConfigDto.content // 必填
      },
      // 报表基本参数 - 必填
      report: {
        audit: res.reportDto.audit, // 审批标识 0关闭，1启用   必填
        reportName: res.reportDto.reportName, // 表单名称
        tableName: res.reportDto.tableName, // 数据库名称
        enabled: res.reportDto.enabled, // 开启状态 - 页面上没有 - 默认true
        reportId
      },
      // 报表具体数据  distribute
      reportSchedule: {
        distributeType: res.reportScheduleDto.distributeType, // 分发类型 1:定时分发 ,2:只分发一次 - 必填
        collectObjType: res.reportScheduleDto.collectObjType, // 收集对象类型1, "组织"  2, "个人" - 必填  树只选人
        frequency: res.reportScheduleDto.frequency, // 执行频率 0 未设置 1:年,2:月,3:日 - 必填  distributeType = 1时必填
        distributeTime: res.reportScheduleDto.distributeTime, // 分发时间 - distributeType = 1时必填
        distributeDay: res.reportScheduleDto.distributeDay, // 分发时间 - distributeType = 1时必填
        distributeMonth: res.reportScheduleDto.distributeMonth, // 分发时间 - distributeType = 1时必填
        /*  endTimeMode: res.reportScheduleDto.endTimeMode, // 截止日期 , 填写结束模式 1下发后X天，2具体截止时间 必填
        endTimeInt: res.reportScheduleDto.endTimeInt, // endTimeMode=1时必填    下发后X天内可填写
        endTimeStr: res.reportScheduleDto.endTimeStr, // endTimeMode=2时必填  具体结束时间 */
        endTimeMode: '1', // 截止日期 , 填写结束模式 1下发后X天，2具体截止时间 必填
        endTimeInt: '', // endTimeMode=1时必填    下发后X天内可填写
        endTimeStr: '', // endTimeMode=2时必填  具体结束时间
        activateStart: res.reportScheduleDto.activateStart, // 有效开始时间  distributeType = 1时必填
        activateEnd: res.reportScheduleDto.activateEnd, // 有效结束时间  distributeType = 1时必填
        // 生效时间  activateStart   activateEnd distributeType = 1时必填
        /* collectObj: [
        { orgId: 10000095, userIds: [20019880, 20019879] },
        { orgId: 10000096, userIds: [20019881, 20019882] }
      ] */
        collectObj: [] // collectObjType = 2时只传数组 必填
      }
    }

    console.log('111', params.value)
  })
}
const setCollectObjList = (val) => {
  // console.log(params, 'collect')
  params.value.reportSchedule.collectObj = setProxy(val)
  // params.collectObj = setProxy(val)
}
const confirmSubmit = () => {
  if (refSelectUser.value) {
    // 获取选择用户
    params.value.reportSchedule.collectObj = []
    let selectedUserData = refSelectUser.value.getSelectedUserData()
    selectedUserData = JSON.parse(JSON.stringify(selectedUserData.value))
    // console.log('submit', selectedUserData)

    selectedUserData.forEach((item) => {
      params.value.reportSchedule.collectObj.push(item.id)
    })
  }

  // console.log('Confirm', params)
  params.value.reportSchedule.endTimeInt = form.value.reportSchedule.endTimeInt
  if (form.value.reportSchedule.endTimeStr) {
    params.value.reportSchedule.endTimeStr = form.value.reportSchedule.endTimeStr + ' ' + '00:00:00'
  } else {
    params.value.reportSchedule.endTimeStr = ''
  }
  params.value.reportSchedule.endTimeMode = form.value.reportSchedule.endTimeMode
  console.log(JSON.parse(JSON.stringify(params.value)))

  // console.log(params.value)
  // if (!props.isMyReport) {
  //   emit('distributeSuccess', 'res')
  // }

  http('distribute', JSON.parse(JSON.stringify(params.value))).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    dialogVisible.value = false
    ElMessage.success('提交成功')

    if (!props.isMyReport) {
      emit('distributeSuccess', res)
    } else {
      // instance?.proxy?.emitter.emit('refreshReportTable')

      console.log(params.value)

      router.push({
        path: '/collect/my-report/distribution-record',
        query: {
          reportId: params.value.report.reportId
        }
      })
    }
  })
}
const setTimeMode = () => {
  if (form.value.reportSchedule.endTimeMode === '1') {
    form.value.reportSchedule.endTimeStr = ''
  } else {
    form.value.reportSchedule.endTimeInt = ''
  }
}

/**
 * 暴露方法
 */
defineExpose({
  openDistributeNowDialog
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
