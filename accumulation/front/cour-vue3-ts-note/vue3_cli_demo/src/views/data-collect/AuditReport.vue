<template>
  <section class="my_report">
    <table-page :title="'报表审核'" @searchHolder="searchHolder" @resetFrom="resetFrom" @rightBtnFun1="createReport">
      <!-- 查询表单 -->
      <template #pageSearch="slotProps">
        <page-search :formData="slotProps.formData" :formOptions="formOptions" />
      </template>

      <!-- 表格 -->
      <template #tableContent>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="formName" label="审核对象" fixed>
            <template #default="scope">
              <el-button link type="primary" @click="reportNameClick(scope.row)">{{ scope.row.formName }}</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="formName" label="审核对象" fixed /> -->
          <el-table-column prop="OrgName" label="收集单位" fixed />
          <el-table-column prop="ReceiverName" label="收集用户" fixed />
          <el-table-column prop="auditorStatus" label="状态" width="180">
            <template #default="scope">
              <i v-if="scope.row.auditorStatus == 0" class="circle_yellow"></i>
              <i v-if="scope.row.auditorStatus == 1" class="circle_red"></i>
              <i v-if="scope.row.auditorStatus == 2" class="circle_green"></i>
              <i v-if="scope.row.auditorStatus == 3" class="circle_blue"></i>
              <i v-if="scope.row.auditorStatus == 4" class="circle_blue"></i>
              <span v-if="scope.row.auditorStatus == 0">审核中</span>
              <span v-if="scope.row.auditorStatus == 1">审核失败</span>
              <span v-if="scope.row.auditorStatus == 2">审核成功</span>
              <span v-if="scope.row.auditorStatus == 3">等待提交</span>
              <span v-if="scope.row.auditorStatus == 4">撤回审核</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkTime" label="提交审核时间" fixed />
          <el-table-column prop="CheckNames" label="提交人" fixed />
          <el-table-column prop="address" label="操作">
            <template #default="scope">
              <el-button link type="primary" v-if="scope.row.auditorStatus != 1" @click="showAuditDialog(scope.row)">审核</el-button>
              <el-tooltip class="box-item" effect="dark" :content="scope.row.auditRemark" placement="top" v-if="scope.row.auditorStatus === 1">
                <el-button link type="primary" v-if="scope.row.auditorStatus === 1">审核意见</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.size"
          background
          layout="prev, pager, next"
          :page-sizes="[100, 200, 300, 400]"
          :total="totalPage"
          class="fr mt12"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </template>
    </table-page>
  </section>
  <!-- <el-dialog append-to-body title="提示" v-model="checkButton" width="30%">
    <el-form>
      <el-form-item label="审批意见" :label-width="'120px'">
        <el-input v-model="auditInfo.auditRemark" placeholder="如果通过可不填，不通过则必填" style="width: 330px"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="checkInfo(1)">不通过</el-button>
        <el-button type="primary" @click="checkInfo(2)">通过</el-button>
      </span>
    </template>
  </el-dialog> -->
  <v-form-render-for-audit-dialog ref="VFormRenderForAuditDialogRef"></v-form-render-for-audit-dialog>

  <!-- vfrom弹窗 -->
  <VFormRenderForDetailDialog ref="RefVFormRenderForDetailDialog"></VFormRenderForDetailDialog>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
// 表格页面公共页面
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
import VFormRenderForAuditDialog from '@/views/components/VFormRenderForAuditDialog.vue'
import VFormRenderForDetailDialog from '@/views/components/VFormRenderForDetailDialog.vue'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
// 初始化工具
const router = useRouter()
const VFormRenderForAuditDialogRef = ref(null)
const RefVFormRenderForDetailDialog = ref(null) // 表单设置弹窗
/**
 * 表单相关
 */
// 表单配置
const formOptions = ref([
  {
    label: '表单名称',
    prop: 'reportName',
    element: 'el-input',
    show: true
  }
])
// 表单参数
let queryParams = ref({
  page: 1,
  size: 10
})

instance?.proxy?.emitter.on('refreshAuditTable', () => {
  getTableData(setProxy(queryParams.value))
})

function showAuditDialog(row) {
  VFormRenderForAuditDialogRef.value.show(row)
}
// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 1,
    size: 10
  }

  getTableData(setProxy(queryParams.value))
}
// 获取子组件查询方法
const searchHolder = (val) => {
  // console.log(val, queryParams.value)

  queryParams.value = Object.assign(val, queryParams.value)

  getTableData(setProxy(queryParams.value))
}

// 创建报表
const createReport = () => {
  console.log('创建报表')
}

/**
 * 表格相关
 */
// 点击表单详情
const reportNameClick = (row) => {
  RefVFormRenderForDetailDialog.value.show(row)
}
// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)
//审核框

// const createReport = (data) => {}
// 获取表格数据
const getTableData = (params) => {
  http('auditList', params).then((res) => {
    tableData.value = res
    totalPage.value = res.length
  })
}
const handleSizeChange = (val) => {
  queryParams.value.size = val
}
const handleCurrentChange = (val) => {
  // console.log(val)
  queryParams.value.page = val
  getTableData(setProxy(queryParams.value))
}

// 分发记录
const distributionRecord = (row) => {
  console.log('分发记录', row)

  router.push({
    path: '/collect/my-report/distribution-record',
    query: {
      row: JSON.stringify(row)
    }
  })
}
// 分发记录
const distributeNow = (row) => {
  console.log('立即分发', row)
}

/**
 * 初始化
 */
const initPage = () => {
  getTableData(setProxy(queryParams.value))
}
initPage()
</script>

<style lang="scss" scoped>
.dialog-footer {
  // width: 60%;
  margin-left: 52px;
}
</style>
