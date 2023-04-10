<template>
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
      <el-table border stripe :data="tableData" style="width: 100%" tooltip-effect="dark">
        <el-table-column prop="reportName" label="报表名称" fixed min-width="150" show-overflow-tooltip />
        <!-- 0关闭  1启用 -->
        <el-table-column prop="enabled" label="状态">
          <template #default="scope">
            <i v-if="scope.row.enabled == 0" class="circle_red"></i>
            <i v-if="scope.row.enabled == 1" class="circle_green"></i>
            <span v-if="scope.row.enabled == 0">关闭</span>
            <span v-if="scope.row.enabled == 1">启用</span>
          </template>
        </el-table-column>
        <!-- 1定时分发 2分发一次-人工分发 -->
        <el-table-column prop="distributeType" label="分发模式" min-width="150">
          <template #default="scope">
            <span v-if="scope.row.distributeType == '1'">
              定时分发
              <br />
              {{ setTbMode(scope.row) }}
            </span>
            <span v-if="scope.row.distributeType == '2'">人工分发</span>
          </template>
        </el-table-column>
        <!-- activateStart -  activateEnd -->
        <el-table-column label="生效时间段" min-width="180">
          <template #default="scope">
            <!-- <span>{{ scope.row.activateStart }}-{{ scope.row.activateEnd }}</span> -->
            <!-- 定时分发才有 -->
            <!-- {{ scope.row.distributeType === 1 ? `${scope.row.activateStart}-${scope.row.activateEnd}` : '-' }} -->
            {{ getTbTime(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="endTimeMode" label="填报截止时间" min-width="180">
          <template #default="scope">
            <!-- 定时分发才有 -->
            <div v-if="scope.row.distributeType === 1">
              <span v-if="scope.row.endTimeMode === 1">{{ `下发后${scope.row.endTimeInt}天内` }}</span>
              <span v-else>{{ scope.row.endTimeStr }}</span>
            </div>
            <span v-else>-</span>
            <!-- <span v-if="scope.row.endTimeMode == 1">
                {{ scope.row.distributeType === 1 ? `下发后${scope.row.endTimeInt}天内` : '-' }}
              </span>
              <span v-if="scope.row.endTimeMode == 2">{{ scope.row.endTimeStr }}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="recentlyTime" label="最近分发记录" min-width="180" />
        <el-table-column fixed="right" label="操作" min-width="220">
          <template #default="slotProps">
            <el-button link type="primary" @click="distributionRecord(slotProps.row)">分发记录</el-button>
            <el-button
              link
              type="primary"
              @click="distributeNow(slotProps.row)"
              :disabled="slotProps.row.distributeType == '1' || slotProps.row.enabled == 0">
              立即分发
            </el-button>
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
                  <el-dropdown-item command="open">{{ slotProps.row.enabled === 1 ? '停用' : '启用' }}</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
  <VFormDesignerDialog ref="RefVformDialog"></VFormDesignerDialog>
  <VFormRenderForDetailDialog ref="RefVFormRenderForDetailDialog"></VFormRenderForDetailDialog>
  <!-- 立即分发弹窗 -->
  <DistributeNowDialog ref="distributeNowDialogRef" />
  <!-- 修改报表配置弹窗 -->
  <fix-report-config-dialog ref="fixReportConfigDialogRef" />
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// import { ElMessage } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
// 组件
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
import VFormDesignerDialog from '@/views/components/VFormDesignerForNewDialog.vue'
import VFormRenderForDetailDialog from '@/views/components/VFormRenderForDetailDialog.vue'
// 弹窗
// import SetFormDialog from './components/SetFormDialog.vue'
import DistributeNowDialog from './components/DistributeNowDialog.vue'
import FixReportConfigDialog from './components/FixReportConfigDialog.vue'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'

const instance = getCurrentInstance()

// 初始化工具
const router = useRouter()
// 定义子组件实例，名称要和上面的ref相同
const RefVFormRenderForDetailDialog = ref(null) // 表单设置弹窗
const distributeNowDialogRef = ref(null) // 立即分发弹窗
const RefVformDialog = ref(null)
const fixReportConfigDialogRef = ref(null) // 修改报表配置

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
  },
  {
    label: '状态',
    prop: 'enabled',
    element: 'el-select',
    options: [
      {
        value: '0',
        label: '关闭'
      },
      {
        value: '1',
        label: '启用'
      }
    ]
  }
])
// 表单参数
let queryParams = ref({
  page: 1,
  size: 15
})

// 点击表单详情
const reportNameClick = (row) => {
  RefVFormRenderForDetailDialog.value.show(row)
}
// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 1,
    size: 15
  }

  getTableData(setProxy(queryParams.value))
}

// 生效时间段
const getTbTime = (item) => {
  // console.log(item)
  if (item.distributeType === 1) {
    if (item.activateStart) {
      // console.log(item.frequency)
      // 只执行一次不显示生效时间段
      if (item.frequency !== 4) {
        return `${item.activateStart}-${item.activateEnd}`
      } else {
        return '-'
      }
    } else {
      return '-'
    }
  } else {
    return '-'
  }
}

const setTbMode = (item) => {
  /**
   * 定时分发
   * 分发频率
   *  4 - 只分发一次 - 需要年月日时分 - 定时分发(只执行一次) - 无
   *  1 - 年 - 需要月日时分 - 需要有效时间 - 定时分发(每年1月20日9点45分) - 有效时间
   *  2 - 月 - 需要日时分 - 需要有效时间 - 定时分发(每月12号9点45分) - 有效时间
   *  3 - 日 - 需要时分 - 需要有效时间 - 定时分发(每日9点45分) - 有效时间
   */
  /* let str = ''
  if (item.distributeType === 1) {
    // console.log(item)
    switch (item.frequency) {
      case 4:
        str = '只执行一次'
        break
      case 1:
        str = `每年${item.distributeMonth}月${item.distributeDay}日${item.distributeTime}`
        break
      case 2:
        str = `每月${item.distributeDay}日${item.distributeTime}`
        break
      case 2:
        str = `每日${item.distributeTime}`
        break
    }

    return `定时分发(${str})`
  } else {
    return '人工分发'
  } */
  let str = ''
  // console.log(item)
  switch (item.frequency) {
    case 4:
      str = '(只执行一次)'
      break
    case 1:
      str = `(每年${item.distributeMonth}月${item.distributeDay}日${item.distributeTime})`
      break
    case 2:
      str = `(每月${item.distributeDay}日${item.distributeTime})`
      break
    case 2:
      str = `(每日${item.distributeTime})`
      break
  }

  return str
}

// 获取子组件查询方法
const searchHolder = (val) => {
  queryParams.value = setProxy(queryParams.value)

  for (let item in val) {
    // console.log(val[item])
    queryParams.value[item] = val[item]
  }

  // getTableData(val)
  getTableData(setProxy(queryParams.value))
}
// 创建报表
const createReport = () => {
  // console.log('创建报表')

  // RefVformDialog.value.show(form.value)
  RefVformDialog.value.show()
}

/**
 * 表格相关
 */
// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)
let enabledStatue = ref('启用')

// 获取表格数据
const getTableData = (params) => {
  const query = {
    ...params,
    page: params.page - 1
  }
  http('getMyReportList', query).then((res) => {
    tableData.value = res.content
    totalPage.value = res.totalElements
  })
}

const handleSizeChange = (val) => {
  // console.log(val)
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
  // console.log('分发记录', row)

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
  console.log(command, row, '调用方法')

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
  console.log('从此报表新建', row)

  RefVformDialog.value.show(row.reportId)
}
// 修改报表配置
const fixMed = (row) => {
  console.log('修改报表配置', row)
  if (row.enabled === 0) {
    ElMessage.warning('请启用表单后再进行操作')
    return
  }
  if (row.distributeType === 2) {
    ElMessage.warning('定时分发时才可以进行修改报表配置')
    return
  }
  //  distributeType: row.distributeType == null ? '1' : row.distributeType.toString(),

  fixReportConfigDialogRef.value.openFixReportConfigDialog(row.reportId)
}
// 启用
const openMed = (row) => {
  // console.log('启用', row.reportId, row.enabled)
  let params = {
    report: {
      reportId: row.reportId
    }
  }
  let statusStr = ''
  // 启用状态需要停用
  if (row.enabled === 1) {
    params.report.enabled = 0
    statusStr = '确认要停用此报表吗？停用后自动分发将会即刻失效且无法手动分发。'
    // params.report.enabled = false
  } else {
    params.report.enabled = 1
    statusStr = '确认要启用此报表吗'
    // params.report.enabled = true
  }
  // console.log(params)

  /* http('enable', params).then((res) => {
    // console.log('删除操作', row)
    // getTableData(setProxy(queryParams.value))
    ElMessage.success('操作成功')
    getTableData(setProxy(queryParams.value))
  }) */

  // 信息提示窗
  openInfo(statusStr, () => {
    console.log('调用停用')
    http('enable', params).then((res) => {
      if (res.isError) {
        ElMessage.warning(res.message)
        return
      }
      // console.log('删除操作', row)
      // getTableData(setProxy(queryParams.value))
      ElMessage.success('操作成功')
      getTableData(setProxy(queryParams.value))
    })
  })
}
// 删除
const deleteMed = (row) => {
  // console.log('删除', row)
  if (row.enabled === 1) {
    ElMessage.warning('删除前先停用表单')
    return
  }

  let params = {
    ids: row.reportId
  }

  // 信息提示窗
  openInfo('确认删除此表单？删除后无法恢复。', () => {
    // console.log('删除操作', row)
    http('deleteReport', params).then(() => {
      ElMessage.success('操作成功')
      getTableData(setProxy(queryParams.value))
    })
  })
}

/**
 * 初始化
 */
const initPage = () => {
  // console.log(pinia)
  getTableData(setProxy(queryParams.value))

  instance?.proxy?.emitter.on('refreshReportTable', () => {
    getTableData(setProxy(queryParams.value))
  })
}
initPage()
</script>

<script>
export default {
  name: 'MyReport'
}
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
