<template>
  <section class="my_report">
    <table-page
      :title="title"
      :showRightBtn="true"
      :rightBtnMsg="'配置关联表'"
      :showBack="true"
      @searchHolder="searchHolder"
      @resetFrom="resetFrom"
      @rightBtnFun1="createDialog = true">
      <!-- 查询表单 -->
      <template #pageSearch="slotProps">
        <page-search :formData="slotProps.formData" :formOptions="formOptions" />
      </template>

      <!-- 右边的按钮一个以上 -->
      <template #rightBtnOther>
        <li class="ml8">
          <el-button :disabled="tableData.length > 0" @click="distributeReport">分发报表</el-button>
          <el-button @click="batchReturn">批量退回</el-button>
          <el-button @click="dataScreeningBtn">数据总览</el-button>
        </li>
      </template>
      <!-- 表格 -->
      <template #tableContent>
        <el-table border stripe :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="orgName" label="收集对象" fixed min-width="120">
            <template #default="scope">
              <el-button link type="primary" @click="reportNameClick(scope.row)">{{ scope.row.orgName }}</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="orgName" label="收集对象" width="180" fixed /> -->
          <el-table-column prop="submitTime" label="提交时间" min-width="150" />
          <el-table-column prop="orgShortname" label="填报部门(取部门字段)" />
          <el-table-column prop="receiverName" label="填报用户" />
          <el-table-column prop="checkNames" label="审核用户" />
          <el-table-column prop="auditorStatus" label="状态">
            <template #default="scope">
              <i v-if="scope.row.isExpired == 5" class="circle_red"></i>
              <i v-else-if="scope.row.auditorStatus == 0 || scope.row.auditorStatus == 1" class="circle_blue"></i>
              <i v-else-if="scope.row.auditorStatus == 2" class="circle_green"></i>
              <i v-else-if="scope.row.auditorStatus == 3" class="circle_yellow"></i>
              <i v-else-if="scope.row.auditorStatus == 4" class="circle_red"></i>
              {{ statusTxt(scope.row) }}
              <!-- <span v-if="scope.row.auditorStatus == 1 || scope.row.auditorStatus == 0">填写中</span>
              <span v-if="scope.row.auditorStatus == 2">已上报</span>
              <span v-if="scope.row.auditorStatus == 3">审核中</span>
              <span v-if="scope.row.auditorStatus == 4">取消填报</span>
              <span v-if="scope.row.isExpired == 5">已截止</span> -->
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="220">
            <template #default="slotProps">
              <el-button :disabled="slotProps.row.auditorStatus != 2" link type="primary" @click="sendBack(slotProps.row)">退回重填</el-button>
              <!-- <el-button link type="primary" @click="returnToRefill(slotProps.row)">退回重填</el-button> -->
              <el-button
                :disabled="slotProps.row.auditorStatus == 0 || slotProps.row.auditorStatus == 1"
                link
                type="primary"
                @click="reportNameClick(slotProps.row)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.size"
          background
          layout="sizes,prev, pager, next"
          :page-sizes="[15, 30, 50, 100]"
          :total="totalPage"
          class="fr mt12"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </template>
    </table-page>
    <el-dialog class="my_dialog" v-model="createDialog" title="配置关联表">
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
          <el-button type="primary" @click="creatRelation()">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog class="my_dialog" append-to-body title="退回重填" v-model="sendButton" width="30%">
      <el-form>
        <el-form-item label="退回原因">
          <el-input :rows="6" type="textarea" v-model="sendBackRemark" placeholder="请输入退回原因，不超过500字符"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="sendButton = false">取消</el-button>
          <el-button type="primary" @click="sendBackApi()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
  <!-- 数据总览 -->
  <data-screening-dialog ref="dataScreeningDialogRef" />
  <!-- 收集进度详情 -->
  <collection-detail-dialog ref="collectionDetailDialogRef" />
  <!-- vfrom弹窗 -->
  <VFormRenderForDetailDialog ref="RefVFormRenderForDetailDialog"></VFormRenderForDetailDialog>
  <!-- 立即分发弹窗 -->
  <DistributeNowDialog ref="distributeNowDialogRef" :isMyReport="false" @distributeSuccess="distributeSuccess" />
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
// 表格页面公共页面
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
// 弹窗
import DistributeNowDialog from './my-report/components/DistributeNowDialog.vue'
import DataScreeningDialog from './my-report/components/DataScreeningDialog.vue' // 数据汇总
import CollectionDetailDialog from './my-report/components/CollectionDetailDialog.vue' // 详情
import VFormRenderForDetailDialog from '@/views/components/VFormRenderForDetailDialog.vue'

// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'

// 初始化工具
const router = useRouter()
const route = useRoute()

const instance = getCurrentInstance()

/**
 * 页面基本数据
 */
let title = ref('关联表收集进度')
let collectDate = ref('')
let value = ref('')

// 定义子组件实例，名称要和上面的ref相同
const dataScreeningDialogRef = ref(null) // 数据总览
const collectionDetailDialogRef = ref(null) // 收集进度详情
const distributeNowDialogRef = ref(null) // 立即分发弹窗
const RefVFormRenderForDetailDialog = ref(null) // 表单设置弹窗
let isShowData = []

/**
 * 表单相关
 */
let options = [
  {
    value: 0,
    label: '收集中'
  },
  {
    value: 1,
    label: '已完成'
  },
  {
    value: 2,
    label: '已撤回'
  }
]
// 表单配置
const formOptions = ref([
  {
    label: '公司名称',
    prop: 'title',
    element: 'el-input'
  }
])
// 表单参数
let queryParams = ref({
  page: 1,
  size: 15
})

// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 1,
    size: 15,
    distributeId: ''
  }

  getTableData(setProxy(queryParams.value))
}

const statusTxt = (row) => {
  if (row.isExpired == 5) {
    return '已截止'
  }
  if (row.auditorStatus == 1 || row.auditorStatus == 0) {
    return '填写中'
  }
  if (row.auditorStatus == 2) {
    return '已上报'
  }
  if (row.auditorStatus == 3) {
    return '审核中'
  }
  if (row.auditorStatus == 4) {
    return '取消填报'
  }
}
// 获取子组件查询方法
const searchHolder = (val) => {
  queryParams.value = setProxy(queryParams.value)

  for (let item in val) {
    console.log(val[item])
    queryParams.value[item] = val[item]
  }

  getTableData(setProxy(queryParams.value))
}

/**
 * 表格相关
 */
// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)

// 获取表格数据
const getTableData = (params) => {
  const query = {
    ...params,
    page: params.page - 1
  }
  http('getCollectionProgressList', query).then((res) => {
    tableData.value = res.content
    totalPage.value = res.totalElements
  })
}
const handleSizeChange = (val) => {
  queryParams.value.size = val
  getTableData(setProxy(queryParams.value))
}
const handleCurrentChange = (val) => {
  // console.log(val)
  queryParams.value.page = val
  getTableData(setProxy(queryParams.value))
}
// 关联表配置
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
    endTimeInt: '',
    scheduleId: ''
  },
  formConfig: {
    id: ''
  }
})
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
  http('apiUpdateRelevance', form.value).then((res) => {
    console.log(res)
    createDialog.value = false
  })
}
let changArr = ref({
  formDataIdList: [],
  formId: ''
})
const handleSelectionChange = (val) => {
  changArr.value = {
    formDataIdList: [],
    formId: ''
  }
  isShowData = []
  // console.log(val, 'val')
  if (val.length > 0) {
    val.forEach((item) => {
      changArr.value.formDataIdList.push(item.formDataId)
      // changArr.value.isShowData.push(item.auditorStatus)
      isShowData.push(item.auditorStatus)
    })
    changArr.value.formId = val[0].formId
    console.log('22', isShowData)
  }

  console.log('多选', changArr.value)
}

// 批量退回
const batchReturn = () => {
  console.log('批量退回')
  /* if (JSON.stringify(changArr.value) !== '{}' && changArr.value.formDataIdList.length > 0) {
    http('apiSendBackFormData', { formDataIdList: changArr.value.formDataIdList }).then((res) => {
      // console.log('退回成功')
      ElMessage.success('退回成功')
      initPage()
    })
  } else {
    ElMessage.warning('请选择要退回的报表')
  } */
  if (isShowData.includes(0) || isShowData.includes(1) || isShowData.includes(3) || isShowData.includes(4) || isShowData.includes(5)) {
    ElMessage.warning('仅支持选择已上报的数据')
    return
  }

  if (JSON.stringify(changArr.value) !== '{}' && changArr.value.formDataIdList.length > 0) {
    http('apiSendBackFormData', { formDataIdList: changArr.value.formDataIdList }).then((res) => {
      // console.log('退回成功')
      ElMessage.success(res.msg)
      initPage()
    })
  } else {
    ElMessage.warning('请选择要退回的报表')
  }
}
let backTemp = {}
let sendBackRemark = ref('')
const sendBack = (row) => {
  sendButton.value = true
  backTemp = row
}
const sendBackApi = () => {
  http('apiSendBackFormData', {
    formDataIdList: [backTemp.formDataId],
    distributeId: route.query.distributeId,
    auditRemark: sendBackRemark.value
  }).then((res) => {
    ElMessage.success('表单数据退回成功')
    sendButton.value = false
    initPage()
  })
}
// 数据总览
const dataScreeningBtn = () => {
  // console.log('数据总览')
  // TODO: Ref + 操作
  // dataScreeningDialogRef.value.openDataScreeningDialog()

  // http('apiGetListData', changArr.value).then((res) => {
  //   console.log(res)
  //   dataScreeningDialogRef.value.openDataScreeningDialog(res)
  // })
  if (isShowData.includes(0) || isShowData.includes(1) || isShowData.includes(3) || isShowData.includes(4) || isShowData.includes(5)) {
    ElMessage.warning('仅支持选择已上报的数据')
    return
  }
  if (JSON.stringify(changArr.value.formDataIdList) === '[]') {
    ElMessage.warning('至少选择一项')
    return
  }
  if (changArr.value.formDataIdList.length > 0) {
    dataScreeningDialogRef.value.openDataScreeningDialog(changArr.value)
  } else {
    ElMessage.warning('请选择要合并的数据')
  }
}
// 分发关联表
const distributeReport = () => {
  console.log('分发关联表')
  distributeNowDialogRef.value.openDistributeNowDialog(route.query.reportId)
}
// 分发之后
const distributeSuccess = (res) => {
  console.log('分发之后', res)
  queryParams.value.distributeId = res.distributeId
  getTableData(setProxy(queryParams.value))
}
// 退回重填
const returnToRefill = (row) => {
  console.log('退回重填', row)

  // 信息提示窗
  openInfo('确定将此表单退回重填？。', () => {
    console.log('撤回操作', row)

    http('apiSendBackFormData', { formDataIdList: [row.formDataId] }).then((res) => {
      // console.log('退回成功')
      ElMessage.success('退回成功')
      initPage()
    })
  })
}
// 查看详情
const reportNameClick = (row) => {
  row.reportName = row.title
  console.log(row)
  RefVFormRenderForDetailDialog.value.show(row)
}
/**
 * 初始化
 */
const initPage = () => {
  console.log(route.query, 'route.query')
  queryParams.value.distributeId = route.query.distributeId || ''
  form.value.report.reportId = route.query.reportId || ''
  form.value.reportSchedule.scheduleId = route.query.scheduleId || ''
  getTableData(setProxy(queryParams.value))

  // instance?.proxy?.emitter.on('refreshDistributionRecordTable', () => {
  //   getTableData(setProxy(queryParams.value))
  // })
}
initPage()
</script>

<style lang="scss" scoped>
.my_report {
}
</style>
