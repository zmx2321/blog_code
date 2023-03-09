<template>
  <section class="my_report">
    <table-page
      :title="'我的报表'"
      :showRightBtn="true"
      :rightBtnMsg="'新建表单'"
      @searchHolder="searchHolder"
      @resetFrom="resetFrom"
      @rightBtnFun1="createReport">
      <!-- 查询表单 -->
      <template #pageSearch="slotProps">
        <page-search :formData="slotProps.formData" :formOptions="formOptions" />
      </template>

      <!-- 表格 -->
      <template #tableContent>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="reportName" label="报表名称" fixed />
          <!-- <el-table-column prop="reportName" label="报表名称" fixed>
            <template #default="scope">
              <el-button link type="primary" @click="reportNameClick(scope.row)">{{ scope.row.reportName }}</el-button>
            </template>
          </el-table-column> -->
          <!-- 0关闭  1启用 -->
          <el-table-column prop="enabled" label="状态" width="180">
            <template #default="scope">
              <i v-if="scope.row.enabled == 0" class="circle_red"></i>
              <i v-if="scope.row.enabled == 1" class="circle_green"></i>
              <span v-if="scope.row.enabled == 0">关闭</span>
              <span v-if="scope.row.enabled == 1">启用</span>
            </template>
          </el-table-column>
          <!-- 1定时分发 2分发一次-人工分发 -->
          <el-table-column prop="distributeType" label="分发模式" width="180">
            <template #default="scope">
              <span v-if="scope.row.distributeType == '1'">定时分发</span>
              <span v-if="scope.row.distributeType == '2'">人工分发</span>
            </template>
          </el-table-column>
          <!-- activateStart -  activateEnd -->
          <el-table-column label="生效时间段" width="180">
            <template #default="scope">
              <span>{{ scope.row.activateStart }}-{{ scope.row.activateEnd }}</span>
            </template>
          </el-table-column>
          <!-- end_time_int  下发后X天内可填写  end_time_str  具体截至时间  end_time_mode 填写结束模式 1下发后X天，2具体截止时间  -->
          <!-- <el-table-column prop="distributeTime" label="填报截止时间" /> -->
          <el-table-column prop="endTimeMode" label="填报截止时间" width="180">
            <template #default="scope">
              <!-- {{ scope.row.endTimeMode }}aaa -->
              <span v-if="scope.row.endTimeMode == 1">下发后{{ scope.row.endTimeInt }}天内</span>
              <span v-if="scope.row.endTimeMode == 2">{{ scope.row.endTimeStr }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="distribute_time" label="最近分发记录" width="150" />
          <el-table-column fixed="right" label="操作" width="280">
            <!-- <template #default="slotProps"> -->
            <template #default="slotProps">
              <el-button link type="primary" @click="distributionRecord(slotProps.row)">分发记录</el-button>
              <el-button link type="primary" @click="distributeNow(slotProps.row)" :disabled="slotProps.row.distributeType == '1'">
                立即分发
              </el-button>
              <!-- <el-dropdown @command="handleCommand"> -->
              <el-dropdown
                @command="
                  (command) => {
                    handleCommand(command, slotProps.row)
                  }
                ">
                <div class="el-dropdown-link" flex="cross:center">
                  <div>更多</div>
                  <el-icon>
                    <arrow-down />
                  </el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="create">从此报表新建</el-dropdown-item>
                    <el-dropdown-item command="fix">修改报表配置</el-dropdown-item>
                    <el-dropdown-item command="open">启用</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- <pagination /> -->
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

  <!-- 表单设置弹窗 -->
  <!-- <set-form-dialog ref="setFormDialogRef" /> -->
  <!-- vfrom弹窗 -->
  <VFormDesignerDialog ref="RefVformDialog"></VFormDesignerDialog>
  <VFormRenderForDetailDialog ref="RefVFormRenderForDetailDialog"></VFormRenderForDetailDialog>
  <!-- 立即分发弹窗 -->
  <DistributeNowDialog ref="distributeNowDialogRef" />
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, defineProps /* getCurrentInstance */ } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 组件
import TablePage from '@/components/global/tablePage/index.vue'
import Pagination from '@/components/global/tablePage/Pagination.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
import VFormDesignerDialog from '@/views/components/VFormDesignerForNewDialog.vue'
import VFormRenderForDetailDialog from '@/views/components/VFormRenderForDetailDialog.vue'
// 弹窗
// import SetFormDialog from './components/SetFormDialog.vue'
import DistributeNowDialog from './components/DistributeNowDialog.vue'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'

// const instance = getCurrentInstance()

// 初始化工具
const router = useRouter()
// 定义子组件实例，名称要和上面的ref相同
const setFormDialogRef = ref(null) // 表单设置弹窗
const RefVFormRenderForDetailDialog = ref(null) // 表单设置弹窗
const distributeNowDialogRef = ref(null) // 立即分发弹窗
const RefVformDialog = ref(null)

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
  page: 0,
  size: 100
})

// 点击表单详情
const reportNameClick = (row) => {
  RefVFormRenderForDetailDialog.value.show(row)
}
// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 0,
    size: 100
  }

  getTableData(setProxy(queryParams.value))
}

/* instance?.proxy?.emitter.on('refreshReportTable', () => {
  getTableData(setProxy(queryParams.value))
}) */

// 获取子组件查询方法
const searchHolder = (val) => {
  // console.log(val, queryParams.value)

  queryParams.value = Object.assign(val, queryParams.value)

  getTableData(setProxy(queryParams.value))
}
// 创建报表
const createReport = () => {
  // console.log('创建报表')

  // setFormDialogRef.value.openCreateReportDialog()
  // RefVformDialog.value.show(form.value)
  RefVformDialog.value.show()
}

/**
 * 表格相关
 */
// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)

// 获取表格数据
const getTableData = (params) => {
  // tableData.value = [
  //   {
  //     reportName: '11'
  //   }
  // ]
  http('getMyReportList', params).then((res) => {
    tableData.value = res.content
    totalPage.value = res.totalElements
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
      reportId: row.reportId
    }
  })
}
// 立即分发
const distributeNow = (row) => {
  // console.log('立即分发', row)

  distributeNowDialogRef.value.openDistributeNowDialog(row.reportId)
}

// 更多
const handleCommand = (command, row) => {
  // console.log(command, row)

  switch (command) {
    case 'create':
      // console.log('从此报表新建')
      createMed(row)
      break
    case 'fix':
      // console.log('修改报表配置')
      fixMed(row)
      break
    case 'open':
      // console.log('启用')
      openMed(row)
      break
    case 'delete':
      // console.log('删除')
      deleteMed(row)
      break
  }
}

// 从此报表新建
const createMed = (row) => {
  // console.log('从此报表新建', row)

  // setFormDialogRef.value.openCreateReportDialog(row)
  RefVformDialog.value.show(row)
}
// 修改报表配置
const fixMed = (row) => {
  console.log('修改报表配置', row)
}
// 启用
const openMed = (row) => {
  console.log('启用', row)

  // ElMessage
  http('getMyReportList', params).then((res) => {
    // console.log('删除操作', row)
    // getTableData(setProxy(queryParams.value))
    ElMessage.success('操作成功')
    getTableData(setProxy(queryParams.value))
  })

  // // 信息提示窗
  // openInfo('确认删除此表单？删除后无法恢复。', () => {
  //   // console.log('删除操作', row)
  //   /* http('getMyReportList', params).then((res) => {
  //     console.log('删除操作', row)
  //     getTableData(setProxy(queryParams.value))
  //   }) */
  // })
}
// 删除
const deleteMed = (row) => {
  // console.log('删除', row)

  // 信息提示窗
  openInfo('确认删除此表单？删除后无法恢复。', () => {
    // console.log('删除操作', row)
    /* http('getMyReportList', params).then((res) => {
      console.log('删除操作', row)
      getTableData(setProxy(queryParams.value))
    }) */
  })
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
.my_report {
  /* .el-dropdown-link {
    margin-left: 12px;
    margin-top: 6px;
    font-weight: 450;
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  } */
}
</style>
