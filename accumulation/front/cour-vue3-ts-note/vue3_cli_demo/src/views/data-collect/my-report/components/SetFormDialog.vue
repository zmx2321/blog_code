<template>
  <el-dialog v-model="dialogVisible" class="my_dialog" title="表单设置" width="660px" lock-scroll :close-on-click-modal="false">
    <div class="form_title">基础配置</div>
    <div class="dashd"></div>
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef" label-position="left">
      <el-form-item label="表单名称" prop="report.reportName">
        <el-input style="width: 260px" v-model="form.report.reportName" />
      </el-form-item>
      <el-form-item label="数据库名称" prop="report.tableName">
        <el-input style="width: 260px" v-model="form.report.tableName" @input="validDataBank()" />
      </el-form-item>
      <el-form-item label="分发类型" class="distributeStatus_body" prop="reportSchedule.distributeType">
        <div class="dis_box">
          <div class="dis_inbox ml4">
            <input type="radio" id="dingshi" value="1" v-model="form.reportSchedule.distributeType" />
            <label for="dingshi" class="dis_inbox_title ml4">定时发放</label>
            <div class="dis_inbox_text">
              支持按照配置的内容定时下发到指定对象，创建后无法编辑表单内容，一般适用于内容已固化的收集表单。支持单张报表/多报表数据汇总。
            </div>
          </div>
          <div class="dis_inbox ml4">
            <input type="radio" id="rengong" value="2" v-model="form.reportSchedule.distributeType" />
            <label for="rengong" class="dis_inbox_title ml4">人工发放</label>
            <div class="dis_inbox_text">在配置分发对象时需要选定机构和接收用户。支持数据按照组织机构汇总。</div>
          </div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="收集对象" class="distributeStatus_body" prop="reportSchedule.collectObjType">
        <div class="dis_box">
          <div class="dis_inbox ml4">
            <input type="radio" id="zuzhi" value="1" disabled v-model="form.reportSchedule.collectObjType" />
            <label for="zuzhi" class="dis_inbox_title ml4">组织机构</label>
            <div class="dis_inbox_text">在配置分发对象时需要选定机构和接收用户。支持数据按照组织机构汇总。</div>
          </div>
          <div class="dis_inbox ml4">
            <input type="radio" id="renyuan" value="2" v-model="form.reportSchedule.collectObjType" />
            <label for="renyuan" class="dis_inbox_title ml4">人员</label>
            <div class="dis_inbox_text">在配置分发对象时只需选定接收用户。</div>
          </div>
        </div>
      </el-form-item> -->
      <el-form-item label="报表审批" prop="report.audit">
        <el-radio-group v-model="form.report.audit" class="ml-4" style="position: relative; top: -6px">
          <el-radio label="1" size="large">启用</el-radio>
          <el-radio label="0" size="large">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="报表状态" prop="report.enabled">
        <el-radio-group v-model="form.report.enabled" class="ml-4">
          <el-radio label="1" size="large">启用</el-radio>
          <el-radio label="0" size="large">停用</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <div v-if="form.reportSchedule.distributeType === '1'">
        <div class="form_title">定时分发配置</div>
        <div class="dashd"></div>
        <el-form-item label="执行频率" prop="reportSchedule.frequency">
          <el-select v-model="form.reportSchedule.frequency" placeholder="请选择执行频率" style="width: 260px">
            <!-- <el-option label="未设置" value="0" /> -->
            <el-option label="只执行一次" value="4" />
            <el-option label="年" value="1" />
            <el-option label="月" value="2" />
            <el-option label="日" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="分发时间" prop="reportSchedule.distributeTime" v-if="form.reportSchedule.frequency">
          <!-- 月 - 显示日时分 2 日 - 显示时分 3 -->
          <el-date-picker
            v-if="form.reportSchedule.frequency === '4'"
            v-model="form.reportSchedule.distributeYear"
            style="width: 120px; margin-right: 10px"
            type="year"
            placeholder="年"
            :disabled-date="disabledDate"
            format="YYYY年"
            value-format="YYYY"></el-date-picker>
          <el-select
            v-model="form.reportSchedule.distributeMonth"
            placeholder="月"
            style="width: 80px; margin-right: 10px"
            v-if="form.reportSchedule.frequency !== '2' && form.reportSchedule.frequency !== '3'">
            <el-option v-for="item in 12" :key="item" :label="item + '月'" :value="item.toString()"></el-option>
          </el-select>
          <el-select
            v-model="form.reportSchedule.distributeDay"
            placeholder="日"
            style="width: 80px; margin-right: 10px"
            v-if="form.reportSchedule.frequency !== '3'">
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
        <el-form-item label="截至日期" class="distributeStatus_body" prop="reportSchedule.endTimeInt">
          <div class="dis_box">
            <div class="dis_inbox ml4">
              <!-- <input type="radio" id="ziran" value="1" v-model="form.reportSchedule.endTimeMode" @change="setTimeMode" /> -->
              <label for="ziran" class="dis_inbox_title ml4">
                下发后
                <el-input style="width: 40px; margin: 0 8px" v-model="form.reportSchedule.endTimeInt" />
                <!-- <el-input
                  style="width: 40px; margin: 0 8px"
                  v-model="form.reportSchedule.endTimeInt"
                  :disabled="form.reportSchedule.endTimeMode !== '1'" /> -->
                天内可填写（自然日）
              </label>
            </div>
            <!-- <div class="dis_inbox ml4 mt8">
              <input type="radio" id="juti" value="2" v-model="form.reportSchedule.endTimeMode" @change="setTimeMode" />
              <label for="juti" class="dis_inbox_title ml4">
                <el-date-picker
                  :disabled="form.reportSchedule.endTimeMode === '1'"
                  v-model="form.reportSchedule.endTimeStr"
                  style="width: 238px"
                  type="date"
                  placeholder="请选择时间"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"></el-date-picker>
              </label>
            </div> -->
          </div>
        </el-form-item>
        <el-form-item label="生效时间" v-if="form.reportSchedule.frequency !== '4'" prop="reportSchedule.activateValue">
          <div style="width: 150px">
            <el-date-picker
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 260px"
              v-model="form.reportSchedule.activateValue"
              :disabled-date="disabledDate"
              type="daterange"
              range-separator="——"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="setActivateValue" />
          </div>
        </el-form-item>
        <!-- <el-form-item label="生效时间" v-if="form.reportSchedule.frequency !== '4'" prop="activateValue">
          <div style="width: 150px">
            <el-date-picker
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 260px"
              v-model="activateValue"
              :disabled-date="disabledDate"
              type="daterange"
              range-separator="——"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="setActivateValue" />
          </div>
        </el-form-item> -->
      </div>
    </el-form>
    <div v-if="form.reportSchedule.distributeType === '1'">
      <!-- <div> -->
      <div class="form_title">收集对象配置</div>
      <div class="dashd"></div>
      <!-- <select-company-user ref="SelectCompanyUserRef" @setCollectObjList="setCollectObjList" :distributeStatus="form.reportSchedule.distributeType" /> -->
      <!-- <select-company-user ref="SelectCompanyUserRef" @setCollectObjList="setCollectObjList" :distributeStatus="'2'" /> -->
      <!-- <select-company-user-new ref="SelectCompanyUserRef" @setCollectObjList="setCollectObjList" :distributeStatus="'2'" /> -->
      <!-- <select-company-user ref="SelectCompanyUserRef" @setCollectObjList="setCollectObjList" :distributeStatus="'2'" /> -->
      <select-user ref="refSelectUser" />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSubmit(formRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- <VFormDesignerDialog ref="RefVformDialog"></VFormDesignerDialog> -->
</template>

<script setup>
// vue3工具
import { ref, toRefs, toRef, reactive, computed, getCurrentInstance, nextTick } from 'vue'
import { useRouter } from 'vue-router'
// 组件
import SelectCompanyUser from '@/components/global/SelectCompanyUser.vue'
import SelectCompanyUserNew from '@/components/global/SelectCompanyUserNew.vue'
// import VFormDesignerDialog from '@/views/components/VFormDesignerDialog.vue'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
import { checkInput } from '@/utils/validate'
import { http } from '@/api/index.js'
import { ElMessage } from 'element-plus'
const RefVformDialog = ref(null)
// import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()

const props = defineProps({
  /* message: {
    type: String,
    default: '',
    required: true
  } */
})

// 初始化工具
const router = useRouter()

/**
 * 定义变量
 */
const dialogVisible = ref(false) // 弹窗布尔值
const formRef = ref(null)

// 定义子组件实例，名称要和上面的ref相同
const SelectCompanyUserRef = ref(null)
const refSelectUser = ref(null)

// 表单值
let form = ref({
  formConfig: {
    content: ''
  },
  report: {
    audit: '1',
    enabled: '1'
  },
  reportSchedule: {
    distributeType: '1',
    collectObjType: '2',
    endTimeMode: '1',
    collectObj: []
  }
})

// let activateValue = ref([]) // 有效日期

const disabledDate = (time) => {
  // console.log(time)
  return time.getTime() < Date.now() - 8.64e7
}

// 自定义验证类型
const validDataBank = () => {
  let reg
  // reg = /([\u4e00-\u9fa5])/g
  // form.value.report.tableName = form.value.report.tableName.replace(reg, '')
  form.value.report.tableName = form.value.report.tableName.replace(/([\u4e00-\u9fa5])/g, '').replace(/[@]/g, '')
}

// 表单校验规则
const rules = reactive({
  formConfig: {},
  report: {
    reportName: [
      { required: true, message: '请输入表单名称', trigger: 'blur' },
      { max: 30, message: '长度在30个字符以内', trigger: 'blur' }
    ],
    tableName: [
      { required: true, message: '请输入数据库名称', trigger: 'blur' },
      { max: 50, message: '长度在50个字符以内', trigger: 'blur' }
    ],
    audit: [{ required: true, message: '请选择报表审批类型', trigger: 'blur' }]
  },
  reportSchedule: {
    distributeType: [{ required: true, message: '请选择分发类型', trigger: 'blur' }],
    collectObjType: [{ required: true, message: '请选择收集对象', trigger: 'blur' }],
    frequency: [{ required: true, message: '请选择执行频率', trigger: 'blur' }],
    distributeTime: [{ required: true, message: '请选择分发时间', trigger: 'blur' }],
    endTimeInt: [{ required: true, message: '请选择截止日期', trigger: 'blur' }],
    activateValue: [{ required: true, message: '请选择生效时间', trigger: 'blur' }]
  }
  // activateValue: [{ required: true, message: '请选择生效时间', trigger: 'blur' }]
})

// 分发类型
// const distributeStatus = ref('1')

/**
 * 定义方法
 */
// 打开弹窗
const openCreateReportDialog = ({ config, row, currentStatus }) => {
  dialogVisible.value = true
  // console.log('000', config, row)
  console.log('0000', row, currentStatus)

  // 清空
  nextTick(() => {
    if (refSelectUser.value !== null) {
      refSelectUser.value.resetRightSelectedUsers()
    }
  })

  if (currentStatus === '编辑') {
    // console.log('从此报表新建', row)

    form.value = {
      formConfig: {
        content: config
      },
      report: {
        audit: row.audit == null ? '1' : row.audit.toString(), // 审批标识 0关闭，1启用   必填
        reportName: row.reportName, // 表单名称
        // tableName: row.tableName, // 数据库名称
        tableName: '', // 数据库名称
        enabled: row.enabled.toString() // 开启状态 - 页面上没有 - 默认true
      },
      reportSchedule: {
        distributeType: row.distributeType == null ? '1' : row.distributeType.toString(), // 分发类型 1:定时分发 ,2:只分发一次 - 必填
        collectObjType: row.collectObjType == null ? '2' : row.collectObjType, // 收集对象类型1, "组织"  2, "个人" - 必填  树只选人
        frequency: row.frequency ? row.frequency.toString() : null, // 执行频率 0 未设置 1:年,2:月,3:日 - 必填  distributeType = 1时必填
        // distributeTime: row.distributeTime, // 分发时间 - distributeType = 1时必填
        endTimeMode: row.endTimeMode, // 截止日期 , 填写结束模式 1下发后X天，2具体截止时间 必填
        endTimeInt: row.endTimeInt, // endTimeMode=1时必填    下发后X天内可填写
        endTimeStr: row.endTimeStr, // endTimeMode=2时必填  具体结束时间
        // activateStart: res.reportScheduleDto.activateStart ? res.reportScheduleDto.activateStart.split(' ')[0] : null, // 有效开始时间  distributeType = 1时必填
        // activateEnd: res.reportScheduleDto.activateEnd ? res.reportScheduleDto.activateEnd.split(' ')[0] : null // 有效结束时间  distributeType = 1时必填
        activateStart: row.activateStart ? row.activateStart.split(' ')[0] + ' ' + '00:00:00' : '',
        activateEnd: row.activateEnd ? row.activateEnd.split(' ')[0] + ' ' + '23:59:59' : '',
        // distributeTime: row.distributeTime, // 分发时间 - distributeType = 1时必填
        distributeTime: row.distributeTime, // 分发时间 - distributeType = 1时必填
        distributeYear: row.distributeYear ? row.distributeYear.toString() : '',
        distributeMonth: row.distributeMonth ? row.distributeMonth.toString() : '',
        distributeDay: row.distributeDay ? row.distributeDay.toString() : ''
        // distributeDay: row.distributeDay.toString()
      }
    }
    if (row.activateStart) {
      // console.log(row.activateStart)
      // activateValue: [row.activateStart, row.activateEnd]
      form.value.reportSchedule.activateValue = [row.activateStart.split(' ')[0] + ' ' + '00:00:00', row.activateEnd.split(' ')[0] + ' ' + '23:59:59']
    }
    // console.log(form.value)
  } else {
    // form.value.formConfig.content = config
    // 表单值
    form.value = {
      formConfig: {
        content: config
      },
      report: {
        audit: '1',
        enabled: '1'
      },
      reportSchedule: {
        distributeType: '1',
        collectObjType: '2',
        endTimeMode: '1',
        collectObj: []
      }
    }
  }
}
// 日期
const setActivateValue = (val) => {
  if (val) {
    form.value.reportSchedule.activateStart = val[0] + ' ' + '00:00:00'
    form.value.reportSchedule.activateEnd = val[1] + ' ' + '23:59:59'
  }
}
// 获取表单数据
const getFormData = () => {
  if (form.value.reportSchedule.distributeType === '2') {
    // form.value.reportSchedule.activateStart = '2023-01-01' // 开启状态 - 页面上没有 - 默认true
    // form.value.reportSchedule.activateEnd = '2023-01-02' // 开启状态 - 页面上没有 - 默认true
    // form.value.reportSchedule.endTimeInt = '22' // 开启状态 - 页面上没有 - 默认true
  }

  if (refSelectUser.value) {
    // 获取选择用户
    form.value.reportSchedule.collectObj = []
    let selectedUserData = refSelectUser.value.getSelectedUserData()
    selectedUserData = JSON.parse(JSON.stringify(selectedUserData.value))
    // console.log('submit', selectedUserData)

    selectedUserData.forEach((item) => {
      form.value.reportSchedule.collectObj.push(item.id)
    })
  }

  // 人工分发没有分发频率
  // console.log(form.value.reportSchedule.distributeType)
  if (form.value.reportSchedule.distributeType === '1') {
    if (form.value.reportSchedule.frequency === '4') {
      let { distributeYear, distributeMonth, distributeDay } = form.value.reportSchedule
      let tempDate = `${distributeYear}-${distributeMonth}-${distributeDay}`
      // console.log('执行频率为只执行一次,分发时间必须在今天之前', tempDate)
      if (disabledDate(new Date(tempDate))) {
        ElMessage.warning('执行频率为只执行一次,分发时间必须在今天之前')
        return
      }
    } else {
      let { activateStart } = form.value.reportSchedule
      if (activateStart) {
        if (disabledDate(new Date(activateStart.split(' ')[0]))) {
          ElMessage.warning('执行频率为年月日,截至日期必须在今天之前')
          return
        }
      }
    }
  }
  // 数据库名称不能纯数字
  if (!isNaN(parseFloat(form.value.report.tableName)) && isFinite(form.value.report.tableName)) {
    ElMessage.warning('数据库名称不能为纯数字')
    return
  }

  // if(parseInt(form.value.report.tableName))

  let params = JSON.parse(JSON.stringify(form.value))
  if (params.reportSchedule.activateValue) {
    delete params.reportSchedule.activateValue
  }
  // console.log(params)

  http('apiReportPost', params).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    dialogVisible.value = false
    ElMessage({
      message: '保存成功',
      type: 'success'
    })

    instance?.proxy?.emitter.emit('refreshReportTable')

    // 表单值
    form.value = {
      formConfig: {
        content: ''
      },
      report: {
        audit: '1',
        enabled: '1'
      },
      reportSchedule: {
        distributeType: '1',
        collectObjType: '2',
        endTimeMode: '1',
        collectObj: []
      }
    }
  })
}
// 确定
const confirmSubmit = async (formEl) => {
  // getFormData() // 获取表单数据
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      getFormData() // 获取表单数据
    } else {
      console.log(fields)
      ElMessage.warning('表单填写有误')
    }
  })
}

const setCollectObjList = (val) => {
  form.value.reportSchedule.collectObj = setProxy(val)
}
const setTimeMode = () => {
  if (form.value.reportSchedule.endTimeInt === '1') {
    form.value.reportSchedule.endTimeStr = ''
  } else {
    form.value.reportSchedule.endTimeInt = ''
  }
}

/**
 * 暴露方法
 */
defineExpose({
  openCreateReportDialog
})
</script>

<style lang="scss" scoped>
.form_title {
  font-weight: 500;
  font-family: 'PingFang SC';
  font-style: normal;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
}
.dashd {
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
      color: #a6a6a6;
    }
  }
}
</style>
