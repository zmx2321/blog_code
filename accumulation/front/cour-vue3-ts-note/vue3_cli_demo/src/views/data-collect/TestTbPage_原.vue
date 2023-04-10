<template>
  <table-page :title="'待填报报表'" @searchHolder="searchHolder" @resetFrom="resetFrom" @rightBtnFun1="createReport">
    <!-- 查询表单 -->
    <template #pageSearch="slotProps">
      <page-search :formData="slotProps.formData" :formOptions="formOptions" />
    </template>

    <!-- 表格 -->
    <template #tableContent>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0,1,2,3,4,5"></el-tab-pane>
        <el-tab-pane label="待提交" name="0,1"></el-tab-pane>
        <el-tab-pane label="审核中" name="3"></el-tab-pane>
        <!-- <el-tab-pane label="已完成" name="1,2,4"></el-tab-pane> -->
      </el-tabs>
      <el-table border stripe :data="tableData" style="width: 100%">
        <!-- <el-table-column prop="name" label="报表名称" fixed /> -->
        <el-table-column prop="name" label="报表名称" fixed>
          <template #default="scope">
            <el-button link type="primary" @click="reportNameClick(scope.row)">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="distributeTime" label="下发日期" fixed />
        <el-table-column prop="orgName" label="收集单位" fixed />
        <el-table-column prop="username" label="收集用户" width="180" fixed />
        <el-table-column prop="auditorStatus" label="状态" width="180">
          <template #default="scope">
            <i v-if="scope.row.auditorStatus == 0" class="circle_blue"></i>
            <i v-if="scope.row.auditorStatus == 1" class="circle_red"></i>
            <i v-if="scope.row.auditorStatus == 2" class="circle_green"></i>
            <i v-if="scope.row.auditorStatus == 3" class="circle_green"></i>
            <i v-if="scope.row.auditorStatus == 4" class="circle_yellow"></i>
            <i v-if="scope.row.auditorStatus == 5" class="circle_red"></i>
            <span v-if="scope.row.auditorStatus == 0">待提交</span>
            <span v-if="scope.row.auditorStatus == 1">审核退回</span>
            <span v-if="scope.row.auditorStatus == 2">已提交</span>
            <span v-if="scope.row.auditorStatus == 3">审核中</span>
            <span v-if="scope.row.auditorStatus == 4">取消填报</span>
            <span v-if="scope.row.auditorStatus == 5">已截至</span>
            <!-- <span v-if="scope.row.auditorStatus == 5">已截止</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="截至日期" width="240" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button
              :disabled="scope.row.auditorStatus == 0 && scope.row.isExpired == 1"
              v-if="scope.row.auditorStatus == 0"
              link
              type="primary"
              @click="fillInNow(scope.row)">
              立即填写
            </el-button>
            <el-button
              v-if="scope.row.auditorStatus == 1 || scope.row.auditorStatus == 2 || scope.row.auditorStatus == 3"
              link
              type="primary"
              @click="reportNameClick(scope.row)">
              查看详情
            </el-button>
            <el-button
              :disabled="scope.row.auditorStatus == 4 || scope.row.isExpired == 1"
              v-if="scope.row.auditorStatus == 1 || scope.row.auditorStatus == 4"
              link
              type="primary"
              @click="fillInNow(scope.row)">
              重新填写
            </el-button>
            <!-- <el-button link >创建关联收集表</el-button> -->
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

  <!-- vfrom弹窗 -->
  <VFormRenderForDetailDialog ref="RefVFormRenderForDetailDialog"></VFormRenderForDetailDialog>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, onActivated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 表格页面公共页面
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
import VFormRenderForDetailDialog from '@/views/components/VFormRenderForDetailDialog.vue'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
// 初始化工具
const router = useRouter()
const route = useRoute()

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
  size: 15,
  auditorStatus: '0,1,2,3,4,5'
})

// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 1,
    size: 15,
    auditorStatus: '0,1,2,3,4,5'
  }

  getTableData(setProxy(queryParams.value))
}

instance?.proxy?.emitter.on('refreshAuditTable', () => {
  getTableData(setProxy(queryParams.value))
})
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
  RefVFormRenderForDetailDialog.value.show(row)
}

// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)
let activeName = ref('0,1,2,3,4,5')

// 获取表格数据
const getTableData = (params) => {
  const query = {
    ...params,
    page: params.page - 1
  }
  http('getMyForm', query).then((res) => {
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
//切换状态
const handleClick = (tab) => {
  console.log(setProxy(tab))
  queryParams.value.auditorStatus = tab.paneName
  getTableData(setProxy(queryParams.value))
  // if (tab.paneName === 'four') {
  //   console.log('@@@ first')
  //   queryParams.value.auditorStatus = [1, 2, 4]
  //   console.log(setProxy(queryParams.value))
  //   getTableData(setProxy(queryParams.value))
  // } else {
  //   queryParams.value.auditorStatus = tab.paneName
  //   getTableData(setProxy(queryParams.value))
  // }
}
// 立即填写
const fillInNow = (row) => {
  console.log('立即填写', row)
  localStorage.setItem('formDataId', row.formDataId)
  router.push({
    path: '/collect/need-filled/fill-in-page',
    query: {
      formDataId: row.formDataId
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
  // handleClick('')
}

console.log(222)
initPage()
</script>

<style lang="scss" scoped>
.switch {
  width: 600px;
  height: 40px;
  background-color: #ccc;
  span {
    display: inline-block;
    // width: 65px;
    height: 100%;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    margin-right: 30px;
  }
  .switch_bottom {
    color: #3e7bfa;
    border-bottom: 2px solid #3e7bfa;
  }
}
</style>
