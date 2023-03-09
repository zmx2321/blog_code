<template>
  <section class="my_report">
    <table-page
      :title="'收集进度'"
      :showRightBtn="true"
      :rightBtnMsg="'数据总览'"
      :showBack="true"
      @searchHolder="searchHolder"
      @resetFrom="resetFrom"
      @rightBtnFun1="dataScreeningBtn">
      <!-- 查询表单 -->
      <template #pageSearch="slotProps">
        <page-search :formData="slotProps.formData" :formOptions="formOptions" />
      </template>

      <!-- 右边的按钮一个以上 -->
      <template #rightBtnOther>
        <li class="ml8">
          <el-button @click="batchReturn">批量退回</el-button>
        </li>
      </template>

      <!-- 表格 -->
      <template #tableContent>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="OrgName" label="收集对象" fixed>
            <template #default="scope">
              <el-button link type="primary" @click="reportNameClick(scope.row)">{{ scope.row.OrgName }}</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="OrgName" label="收集对象" width="180" fixed /> -->
          <el-table-column prop="checkTime" label="提交时间" width="180" />
          <el-table-column prop="orgShortname" label="填报部门(取部门字段)" />
          <el-table-column prop="receiverName" label="填报用户" />
          <el-table-column prop="checkNames" label="审核用户" />
          <el-table-column prop="auditorStatus" label="状态" width="180">
            <template #default="scope">
              <span v-if="scope.row.auditorStatus == 0">填写中</span>
              <span v-if="scope.row.auditorStatus == 1">已上报</span>
              <span v-if="scope.row.auditorStatus == 2">审核中</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="slotProps">
              <el-button link type="primary" @click="returnToRefill(slotProps.row)">退回重填</el-button>
              <el-button link type="primary" @click="showDetail(slotProps.row)">查看详情</el-button>
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

    <!-- 数据总览 -->
    <data-screening-dialog ref="dataScreeningDialogRef" />
    <!-- 收集进度详情 -->
    <collection-detail-dialog ref="collectionDetailDialogRef" />
    <!-- vfrom弹窗 -->
    <VFormRenderForDetailDialog ref="RefVFormRenderForDetailDialog"></VFormRenderForDetailDialog>
  </section>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
// 组件
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
// 弹窗
import SetFormDialog from './components/SetFormDialog.vue' // 创建报表
import DataScreeningDialog from './components/DataScreeningDialog.vue' // 数据汇总
import CollectionDetailDialog from './components/CollectionDetailDialog.vue' // 详情
import VFormRenderForDetailDialog from '@/views/components/VFormRenderForDetailDialog.vue'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'

// 初始化工具
const router = useRouter()
// 定义子组件实例，名称要和上面的ref相同
const dataScreeningDialogRef = ref(null) // 数据总览
const collectionDetailDialogRef = ref(null) // 收集进度详情
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
  size: 10,
  distributeId: 1
})

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
// 数据总览
const dataScreeningBtn = () => {
  // console.log('数据总览')

  dataScreeningDialogRef.value.openDataScreeningDialog()
}
// 批量退回
const batchReturn = () => {
  console.log('批量退回')
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

// 获取表格数据
const getTableData = (params) => {
  /* tableData.value = [
    {
      reportName: '11'
    }
  ] */
  http('getCollectionProgressList', params).then((res) => {
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

// 退回重填
const returnToRefill = (row) => {
  console.log('退回重填', row)

  // 信息提示窗
  openInfo('确认撤回？撤回后将无法填写。', () => {
    console.log('撤回操作', row)
  })
}
// 查看详情
const showDetail = (row) => {
  console.log('查看详情', row)

  collectionDetailDialogRef.value.openCollectionDetailDialog()

  /* router.push({
    path: '/collect/my-report/my-report-detail',
    query: {
      row: JSON.stringify(row)
    }
  }) */
}

/**
 * 初始化
 */
const initPage = () => {
  // queryParams.value.distributeId = 1
  getTableData(setProxy(queryParams.value))
}
initPage()
</script>

<style lang="scss" scoped></style>
