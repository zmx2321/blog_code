<template>
  <div style="width: 100%">
    <div style="text-align: right">
      <el-button v-if="buttonShow" type="success" @click="createDialog = true">创建关联收集表</el-button>
      <el-button v-else type="success" @click="checkProgress">查看收集进度</el-button>
      <!-- <el-button type="success" @click="createDialog = true">创建关联收集表</el-button> -->
    </div>
  </div>
  <section class="top_title" v-if="formDataDto.auditorStatus === 1">
    <p class="title_status">表单被退回</p>
    <div class="top_hr"></div>
    <div class="title_info">
      <div class="info_bas">
        <div style="margin-right: 350px">
          <span style="color: #a6a6a6">审核人：</span>
          {{ formDataDto.checkNames || '无' }}
        </div>
        <div>
          <span style="color: #a6a6a6">退回时间：</span>
          {{ formDataDto.checkTime || '无' }}
        </div>
      </div>
      <div class="info_audit">
        <div class="audit_left"><span style="color: #a6a6a6">退回原因：</span></div>
        <div class="audit_right">
          {{ formDataDto.auditRemark }}
          <!-- 公司营收数据必填，请填写后重新提交。若有疑问请联系李四19999999999：公司营收数据必填，请填写后重新提交。若有疑问请联系李四19999999999：公司营收数据必填，请填写后重新提交。若有疑问请联系李四19999999999：公司营收数据必填，请填写后重新提交。若有疑问请联系李四19999999999 -->
        </div>
      </div>
    </div>
  </section>
  <section class="report_form">
    <div class="report_info">
      <div>
        <span style="color: #a6a6a6">收集单位：</span>
        {{ formDataDto.orgName || '无' }}
      </div>
      <div>
        <span style="color: #a6a6a6">收集用户：</span>
        {{ formDataDto.receiverName || '无' }}
      </div>
      <div>
        <span style="color: #a6a6a6">下发时间：</span>
        {{ reportDistribute.distributeTime || '无' }}
      </div>
      <div>
        <span style="color: #a6a6a6">截止日期：</span>
        {{ reportDistribute.endTime || '无' }}
      </div>
    </div>
    <div class="vForm">
      <v-form-render :option-data="{}" ref="vFormRenderRef"></v-form-render>
    </div>

    <div class="handler pb24 mt32">
      <el-button @click="cancelClick">取消</el-button>
      <el-button @click="submitClick" type="primary" plain>保存</el-button>
      <el-button type="primary" @click="submitClick('submit')">{{ reportDto.audit === 0 ? '立即提交' : '提交审核' }}</el-button>
      <!-- <el-button type="primary" @click="dialogVisible = true">选择审核人</el-button> -->
      <el-dialog class="my_dialog sp_dialog" v-model="dialogVisible" title="选择审核人" width="30%" lock-scroll :close-on-click-modal="false">
        <div class="subtitle"><p>单人审批，选择本部门领导审批即可</p></div>
        <!-- <select-company-user ref="SelectCompanyUserRef" @setCollectObjList="setCollectObjList" :distributeStatus="'2'" /> -->
        <select-user-single ref="refSelectUserSingle" :isSingle="false" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmSubmit()">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </section>
  <el-dialog class="my_dialog" v-model="createDialog" title="创建关联表">
    <el-form :model="form" label-width="90px" :rules="rules" ref="formRef" label-position="left">
      <el-form-item label="表单名称" prop="report.reportName">
        <el-input style="width: 260px" v-model="form.report.reportName" />
      </el-form-item>
      <el-form-item label="报表审批" prop="report.audit">
        <el-radio-group v-model="form.report.audit" class="ml-4">
          <el-radio label="1" size="large">启用</el-radio>
          <el-radio label="0" size="large">停用</el-radio>
        </el-radio-group>
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="createDialog = false">取消</el-button>
        <el-button type="primary" @click="creatRelation()">下一步</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- <select-user ref="refSelectUser" /> -->
  <el-dialog class="my_dialog" v-model="selectUserDialog" title="配置收集对象">
    <select-user ref="refSelectUser" />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="selectUserDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmSelectUser()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, onMounted, nextTick } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 表格页面公共页面
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
import SelectCompanyUser from '@/components/global/SelectCompanyUser.vue'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'
// 初始化工具
const route = useRoute()
const router = useRouter()
const vFormRenderRef = ref(null)
const props = defineProps({
  /* message: {
    type: String,
    default: '',
    required: true
  } */
})
// 定义子组件实例，名称要和上面的ref相同
const SelectCompanyUserRef = ref(null)
const refSelectUser = ref(null)
const refSelectUserSingle = ref(null)
const selectUserDialog = ref(false)

/**
 * 定义方法
 */
const dialogVisible = ref(false) // 弹窗布尔值
const setCollectObjList = (val) => {
  formDataDto.value.checkIds = setProxy(val[0])
  // console.log(formDataDto.value.checkIds, '@@')
}

const confirmSubmit = () => {
  // formDataDto.value.checkIds = []
  // if (refSelectUser.value) {
  // 获取选择用户
  let selectedUserData = refSelectUserSingle.value.getSelectedUserData()
  selectedUserData = JSON.parse(JSON.stringify(selectedUserData.value))
  // console.log('select', selectedUserData)

  // return

  if (selectedUserData.length === 0) {
    ElMessage.warning('必须选择一个审核人')
    return
  }
  if (selectedUserData.length > 1) {
    ElMessage.warning('只能选择一个审核人')
    return
  }
  // console.log('submit', selectedUserData)
  /* selectedUserData.forEach((item) => {
      formDataDto.value.checkIds.push(item.id)
    }) */
  // }
  temp = {
    ...temp,
    // checkIds: formDataDto.value.checkIds
    checkIds: selectedUserData[0].id
  }
  // console.log(temp)
  // return

  // console.log(temp)
  http('apiSubmitFormData', temp).then((res) => {
    ElMessage.success('提交成功')
    instance?.proxy?.emitter.emit('refreshNeedFilledTable')
    router.back()
  })

  dialogVisible.value = false
}
/**
 * 初始化
 */
let formDataDto = ref({})
let reportDistribute = ref({})
let reportDto = ref({})
let temp = ref({})

// 创建关联表配置
let createDialog = ref(false)
let form = ref({
  report: {
    reportName: '',
    audit: '1',
    enabled: '1',
    reportId: ''
  },
  reportSchedule: {
    distributeType: '2',
    endTimeMode: '1',
    endTimeInt: ''
  },
  formConfig: {
    id: ''
  }
})
let reportId = ref('')
let formTemp = ref({})
let routePush = ref({})
let buttonShow = ref(true)
// 表单校验规则
const rules = reactive({
  formConfig: {},
  report: {
    reportName: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
    // tableName: [{ required: true, message: '请输入数据库名称', trigger: 'blur' }],
    audit: [{ required: true, message: '请选择报表审批类型', trigger: 'blur' }]
  },
  reportSchedule: {
    endTimeInt: [{ required: true, message: '请选择截止日期', trigger: 'blur' }]
  }
})
const creatRelation = () => {
  http('apiCreateRelevance', form.value).then((res) => {
    selectUserDialog.value = true
    reportId = res.reportId
    http('queryByReportId', { reportId: res.reportId }).then((resById) => {
      console.log(resById)
      formTemp.value = resById
    })
    // console.log(res)
    // router.push({
    //   path: '/collect/need-filled/RelatingReport',
    //   query: {
    //     reportId: res.reportId
    //     // scheduleId: res.scheduleId
    //   }
    // })
  })
}
const confirmSelectUser = () => {
  if (refSelectUser.value) {
    // 获取选择用户
    // form.value.reportSchedule.collectObj = []
    let selectedUserData = refSelectUser.value.getSelectedUserData()
    selectedUserData = JSON.parse(JSON.stringify(selectedUserData.value))
    console.log('submit', selectedUserData)

    // formTemp.value
    let params = {
      // 表单内容 - 自定义报表
      formConfig: {
        content: formTemp.value.formConfigDto.content // 必填
      },
      // 报表基本参数 - 必填
      report: {
        audit: formTemp.value.reportDto.audit, // 审批标识 0关闭，1启用   必填
        reportName: formTemp.value.reportDto.reportName, // 表单名称
        tableName: formTemp.value.reportDto.tableName, // 数据库名称
        enabled: formTemp.value.reportDto.enabled, // 开启状态 - 页面上没有 - 默认true
        reportId: formTemp.value.reportDto.reportId
      },
      // 报表具体数据  distribute
      reportSchedule: {
        distributeType: formTemp.value.reportScheduleDto.distributeType, // 分发类型 1:定时分发 ,2:只分发一次 - 必填
        collectObjType: formTemp.value.reportScheduleDto.collectObjType, // 收集对象类型1, "组织"  2, "个人" - 必填  树只选人
        frequency: formTemp.value.reportScheduleDto.frequency, // 执行频率 0 未设置 1:年,2:月,3:日 - 必填  distributeType = 1时必填
        distributeTime: formTemp.value.reportScheduleDto.distributeTime, // 分发时间 - distributeType = 1时必填
        distributeDay: formTemp.value.reportScheduleDto.distributeDay, // 分发时间 - distributeType = 1时必填
        distributeMonth: formTemp.value.reportScheduleDto.distributeMonth, // 分发时间 - distributeType = 1时必填
        endTimeMode: formTemp.value.reportScheduleDto.endTimeMode, // 截止日期 , 填写结束模式 1下发后X天，2具体截止时间 必填
        endTimeInt: formTemp.value.reportScheduleDto.endTimeInt, // endTimeMode=1时必填    下发后X天内可填写
        endTimeStr: formTemp.value.reportScheduleDto.endTimeStr, // endTimeMode=2时必填  具体结束时间
        activateStart: formTemp.value.reportScheduleDto.activateStart, // 有效开始时间  distributeType = 1时必填
        activateEnd: formTemp.value.reportScheduleDto.activateEnd, // 有效结束时间  distributeType = 1时必填
        // 生效时间  activateStart   activateEnd distributeType = 1时必填
        /* collectObj: [
        { orgId: 10000095, userIds: [20019880, 20019879] },
        { orgId: 10000096, userIds: [20019881, 20019882] }
      ] */
        collectObj: [] // collectObjType = 2时只传数组 必填
      }
    }

    selectedUserData.forEach((item) => {
      params.reportSchedule.collectObj.push(item.id)
    })

    console.log('接口参数', params)
    http('distribute', params).then((res) => {
      if (res.isError) {
        ElMessage.warning(res.message)
        return
      }
      ElMessage.success('提交成功')
      router.push({
        path: '/collect/need-filled/RelatingReport',
        query: {
          reportId: reportId,
          distributeId: res.distributeId
          // scheduleId: res.scheduleId
        }
      })
    })
  }
}
const checkProgress = () => {
  router.push({
    path: '/collect/need-filled/RelatingReport',
    query: routePush.value
  })
}
// 取消点击
const cancelClick = () => {
  router.back()
}
const submitHolder = (type, next, NoElMessage) => {
  vFormRenderRef.value
    .getFormData()
    .then((json) => {
      // console.log(json)
      let params = {
        formValue: JSON.stringify(json),
        formDataId: formDataDto.value.formDataId
      }
      let apiName = type === 'submit' ? 'apiSubmitFormData' : 'apiFormData'
      if (type === 'submit') {
        params = {
          ...formDataDto.value,
          ...params
        }
        temp = { ...params }
        dialogVisible.value = true
      } else {
        // 提交保存
        http(apiName, params).then((res) => {
          if (!NoElMessage) ElMessage.success('保存成功')
          router.back()
        })
      }
      // // 提交
      // http(apiName, params).then((res) => {
      //   ElMessage.success('保存成功')
      //   router.back()
      // })
    })
    .catch((error) => {
      console.log(error)
      // Form Validation failed
    })
}
// 保存 JSON
const submitClick = (type, next) => {
  submitHolder(type, next, 'NoElMessage')
  vFormRenderRef.value
    .getFormData()
    .then((json) => {
      // console.log(json)
      let params = {
        formValue: JSON.stringify(json),
        formDataId: formDataDto.value.formDataId
      }
      let apiName = type === 'submit' ? 'apiSubmitFormData' : 'apiFormData'
      if (type === 'submit') {
        params = {
          ...formDataDto.value,
          ...params
        }

        dialogVisible.value = true
      } else {
        // 提交
        http(apiName, params).then((res) => {
          ElMessage.success('保存成功')
          router.back()
        })
      }
      // // 提交
      // http(apiName, params).then((res) => {
      //   ElMessage.success('保存成功')
      //   router.back()
      // })
    })
    .catch((error) => {
      console.log(error)
      // Form Validation failed
    })
}
// 初始化请求数据
const initPage = () => {
  http('detail', { formDataId: route.query.formDataId }).then((res) => {
    form.value.formConfig.id = res.formConfigDto.id //创建关联表参数
    form.value.report.reportId = res.reportDto.reportId //创建关联表参数
    if (res.relevanceStatus == 1) {
      buttonShow.value = false
      routePush.value = {
        reportId: res.relevanceReportId,
        distributeId: res.relevanceDistributeId,
        scheduleId: res.reportDto.scheduleId
      }
    }
    formDataDto.value = res.formDataDto
    reportDistribute.value = res.reportDistribute
    reportDto.value = res.reportDto
    vFormRenderRef.value.setFormJson(JSON.parse(res.formConfigDto.content))
    if (formDataDto.value.formValue) {
      nextTick(() => {
        vFormRenderRef.value.setFormData(JSON.parse(formDataDto.value.formValue))
      })
    }
  })
}
onMounted(() => {
  initPage()
})
</script>

<style lang="scss" scoped>
// .handler {
//   background-color: #fff;
//   left: 0;
//   bottom: 0;
//   padding: 20px auto;
// }
.top_title {
  width: 1558px;
  background: #ffffcb;
  padding: 25px;
  .top_hr {
    width: 1492px;
    height: 0px;
    border: 0.5px solid #d9d9d9;
  }
  .title_status {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #4a4a4a;
    margin-bottom: 14px;
  }
  .title_info {
    margin-top: 20px;
    .info_bas {
      display: flex;
      margin-bottom: 20px;
    }
    .info_audit {
      display: flex;
      .audit_left {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #4a4a4a;
      }
      .audit_right {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #d02c36;
      }
    }
  }
}
.report_form {
  width: 1558px;
  height: 500px;
  padding: 25px;
  // background-color: #ff0;
  .report_info {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    div {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-align: right;
      color: #4a4a4a;
      margin-right: 35px;
    }
  }

  :deep .el-card {
    margin-bottom: 16px;
    .el-card__body {
      padding: 12px;
    }
  }
  .vForm {
    max-height: 500px;
    // background-color: #f3f;
    overflow: auto;
  }
}

:deep .sp_dialog {
  // background: #f00;
  .el-dialog__header {
    padding-bottom: 0;
  }

  .el-dialog__body {
    // position: relative;
    max-height: auto !important;
    overflow: hidden !important;

    .subtitle {
      position: relative;
      top: -20px;
      font-size: 12px;
      color: #a4a4a4;
    }
  }
}
</style>
