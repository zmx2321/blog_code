<template>
  <section class="my_report">
    <table-page :title="'报表审核'" @searchHolder="searchHolder" @resetFrom="resetFrom" @rightBtnFun1="createReport">
      <!-- 查询表单 -->
      <template #pageSearch="slotProps">
        <page-search :formData="slotProps.formData" :formOptions="formOptions" />
      </template>

      <!-- 表格 -->
      <template #tableContent>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="全部" name=""></el-tab-pane>
          <el-tab-pane label="待审核" name="3"></el-tab-pane>
          <!-- <el-tab-pane label="已完成" name="1,2,4"></el-tab-pane> -->
        </el-tabs>
        <el-table border stripe :data="tableData" style="width: 100%" tooltip-effect="dark">
          <el-table-column prop="title" label="审核对象" fixed min-width="150" show-overflow-tooltip>
            <template #default="scope">
              <!-- <el-button link type="primary" @click="reportNameClick(scope.row)">{{ scope.row.title }}</el-button> -->
              <div class="text-hidden color-primary pointer" link type="primary" @click="reportNameClick(scope.row)">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="formName" label="审核对象" fixed /> -->
          <el-table-column prop="orgName" label="收集单位" fixed min-width="110" show-overflow-tooltip />
          <el-table-column prop="receiverName" label="收集用户" fixed />
          <el-table-column prop="auditorStatus" label="状态" min-width="100">
            <template #default="scope">
              <!-- <i v-if="scope.row.auditorStatus == 0" class="circle_yellow"></i> -->
              <i v-if="scope.row.auditorStatus == 1" class="circle_red"></i>
              <i v-if="scope.row.auditorStatus == 2" class="circle_green"></i>
              <i v-if="scope.row.auditorStatus == 3" class="circle_blue"></i>
              <!-- <i v-if="scope.row.auditorStatus == 4" class="circle_blue"></i> -->
              <!-- <span v-if="scope.row.auditorStatus == 0">审核中</span> -->
              <span v-if="scope.row.auditorStatus == 1">审核退回</span>
              <span v-if="scope.row.auditorStatus == 2">审核通过</span>
              <span v-if="scope.row.auditorStatus == 3">待审核</span>
              <!-- <span v-if="scope.row.auditorStatus == 4">撤回审核</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="submitTime" label="提交审核时间" fixed min-width="180" />
          <el-table-column prop="checkNames" label="提交人" fixed />
          <el-table-column prop="address" label="操作" min-width="110" fixed="right">
            <template #default="scope">
              <el-button link type="primary" :disabled="scope.row.auditorStatus != 3" @click="showAuditDialog(scope.row)">审核</el-button>
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
          layout="sizes,prev, pager, next"
          :page-sizes="[15, 30, 50, 100]"
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
import { ref, toRefs, toRef, reactive, computed, onActivated, nextTick } from 'vue'
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
  size: 15
})
let activeName = ref('3')
//切换状态
const handleClick = (tab) => {
  console.log(setProxy(tab))
  queryParams.value.auditorStatus = tab.paneName
  getTableData(setProxy(queryParams.value))
}
instance?.proxy?.emitter.on('refreshAuditTable', () => {
  getTableData(setProxy(queryParams.value))
})

const showAuditDialog = (row) => {
  row.reportName = row.title
  console.log(row)
  VFormRenderForAuditDialogRef.value.show(row)
}
// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 1,
    size: 15
  }

  getTableData(setProxy(queryParams.value))
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

// 创建报表
const createReport = () => {
  console.log('创建报表')
}

/**
 * 表格相关
 */
// 点击表单详情
const reportNameClick = (row) => {
  row.reportName = row.title
  console.log(row)
  RefVFormRenderForDetailDialog.value.show(row)
}
// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)
//审核框

// const createReport = (data) => {}
// 获取表格数据
const getTableData = (params) => {
  const query = {
    ...params,
    page: params.page - 1
  }
  http('auditList', query).then((res) => {
    // http('getMyReportList', query).then((res) => {
    /* tableData.value = res
    totalPage.value = res.length */
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
  queryParams.value.auditorStatus = activeName.value
  getTableData(setProxy(queryParams.value))
  // })
}
onActivated(() => {
  initPage()
})
initPage()
</script>

<style lang="scss" scoped>
.dialog-footer {
  // width: 60%;
  margin-left: 52px;
}
</style>
