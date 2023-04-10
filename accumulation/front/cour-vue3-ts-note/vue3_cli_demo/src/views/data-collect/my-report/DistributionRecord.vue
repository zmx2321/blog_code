<template>
  <section class="my_report">
    <table-page
      :title="title"
      :showRightBtn="true"
      :rightBtnMsg="'合并数据'"
      :showBack="true"
      @searchHolder="searchHolder"
      @resetFrom="resetFrom"
      @rightBtnFun1="mergeData">
      <!-- 查询表单 -->
      <template #pageSearch="slotProps">
        <page-search :formData="slotProps.formData" :formOptions="formOptions" />
      </template>

      <!-- 表格 -->
      <template #tableContent>
        <el-table border stripe :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="distribute_time" label="分发时间" fixed min-width="170" />
          <el-table-column prop="status" label="状态" min-width="80">
            <template #default="scope">
              <!-- TODO: 重复过多，可以用对象循环替代 -->
              <i v-if="scope.row.status == 1" class="circle_blue"></i>
              <i v-if="scope.row.status == 2" class="circle_green"></i>
              <i v-if="scope.row.status == 3" class="circle_red"></i>
              <span v-if="scope.row.status == 1">收集中</span>
              <span v-if="scope.row.status == 2">已结束</span>
              <span v-if="scope.row.status == 3">取消填报</span>
            </template>
          </el-table-column>
          <el-table-column prop="schedule_period" label="统计周期" min-width="175" />
          <el-table-column prop="distribute_count" label="下发总数" min-width="100" />
          <el-table-column prop="submit_count" label="已收集">
            <template #default="scope">
              <span>{{ scope.row.submit_count }}份</span>
            </template>
          </el-table-column>
          <el-table-column prop="end_time" label="填报截止时间" min-width="175" />
          <el-table-column fixed="right" label="操作" min-width="200">
            <template #default="slotProps">
              <el-button :disabled="slotProps.row.status == 2 || slotProps.row.status == 3" link type="primary" @click="reissue(slotProps.row)">
                补发
              </el-button>
              <el-button link type="primary" @click="collectionProgress(slotProps.row)">收集进度</el-button>
              <el-dropdown
                @command="
                  (command) => {
                    handleCommand(command, slotProps.row)
                  }
                ">
                <span class="el-dropdown-link">
                  更多
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :disabled="slotProps.row.status == 3" command="deferredFilling">延期填报</el-dropdown-item>
                    <!-- <el-dropdown-item command="withdraw">撤回</el-dropdown-item> -->
                    <el-dropdown-item :disabled="slotProps.row.status == 2 || slotProps.row.status == 3" command="withdraw">
                      取消填报
                    </el-dropdown-item>
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

    <!-- 合并数据 -->
    <merge-Page-dialog ref="mergePageDialogRef" />
    <!-- 补发 -->
    <supply-again-dialog ref="supplyAgainDialogRef" />
    <!-- 时间 -->
    <DeferredFillingDialog ref="refDeferredFillingDialog" />
  </section>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
// 表格页面公共页面
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
// 弹窗
import MergePageDialog from './components/MergePageDialog.vue' // 合并数据
import SupplyAgainDialog from './components/SupplyAgainDialog.vue'
import DeferredFillingDialog from './components/DeferredFillingDialog.vue'
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
let title = ref('分发记录')
let collectDate = ref('')
let value = ref('')

// 定义子组件实例，名称要和上面的ref相同
const mergePageDialogRef = ref(null) // 合并数据
const supplyAgainDialogRef = ref(null) // 补发
const refDeferredFillingDialog = ref(null) // 补发

/**
 * 表单相关
 */
// let options =
// 表单配置
const formOptions = ref([
  /* {
    label: '表单名称',
    prop: 'title',
    element: 'el-input'
  }, */
  {
    label: '分发时间',
    prop: 'time',
    element: 'el-date-picker'
  },
  {
    label: '状态',
    prop: 'status',
    element: 'el-select',
    options: [
      {
        value: '',
        label: '全部'
      },
      {
        value: '1',
        label: '收集中'
      },
      {
        value: '2',
        label: '已结束'
      },
      {
        value: '3',
        label: '取消填报'
      }
    ]
  }
])
// 表单参数
let queryParams = ref({
  page: 1,
  size: 15,
  reportId: route.query.reportId
})

// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 1,
    size: 15,
    reportId: route.query.reportId
  }

  getTableData(setProxy(queryParams.value))
}
// 获取子组件查询方法
const searchHolder = (val) => {
  console.log(val)
  // queryParams.value = setProxy(queryParams.value)

  for (let item in val) {
    // console.log(item)

    if (item === 'time') {
      console.log(val[item])
      if (val[item]) {
        queryParams.value.distributeStartTime = val[item][0] + ' ' + '00:00:00'
        queryParams.value.distributeEndTime = val[item][1] + ' ' + '00:00:00'
      } else {
        queryParams.value.distributeStartTime = undefined
        queryParams.value.distributeEndTime = undefined
      }
    } else {
      queryParams.value[item] = val[item]
    }
  }

  getTableData(queryParams.value)
}
// 合并数据
const mergeData = () => {
  // console.log('合并数据')
  if (changArr.value.distributeIdList) {
    mergePageDialogRef.value.openMergePageDialog(changArr.value)
  } else {
    ElMessage.warning('请选择要合并的数据')
  }
}
const handleSelectionChange = (val) => {
  changArr.value = {
    distributeIdList: [],
    formId: ''
  }
  if (val.length > 0) {
    val.forEach((item) => {
      changArr.value.distributeIdList.push(item.distribute_id)
    })
    changArr.value.formId = val[0].form_id
  }

  console.log('多选', changArr.value)
}
/**
 * 表格相关
 */
// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)
let changArr = ref({
  distributeIdList: [],
  formId: ''
})
// 获取表格数据
const getTableData = (params) => {
  const query = {
    ...params,
    page: params.page - 1
  }
  http('getDistributionRecordList', query).then((res) => {
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

// 补发
const reissue = (row) => {
  // console.log('补发', row)

  supplyAgainDialogRef.value.openSupplyAgainDialogRefDialog(row)
}
// 收集进度
const collectionProgress = (row) => {
  // console.log('收集进度', row)

  router.push({
    path: '/collect/my-report/collection-progress',
    query: {
      distribute_id: row.distribute_id
      // row: JSON.stringify(row)
    }
  })
}

// 更多
const handleCommand = (command, row) => {
  // console.log(command, row)
  switch (command) {
    case 'deferredFilling':
      // console.log('延期填报')
      deferredFillingMed(row)
      break
    case 'withdraw':
      // console.log('撤回')
      withdrawMed(row)
      break
  }
}

// 延期填报
const deferredFillingMed = (row) => {
  // console.log('延期填报', row)

  refDeferredFillingDialog.value.openDeferredFillingDialog(row)
}
// 撤回
const withdrawMed = (row) => {
  // console.log('撤回', row)

  // 信息提示窗
  openInfo('确认取消填报？该操作不可逆。', () => {
    // console.log('撤回操作', row.distribute_id)
    http('recall', { ids: row.distribute_id }).then((res) => {
      // console.log('撤回成功')
      ElMessage.success('撤回成功')

      getTableData(setProxy(queryParams.value))
    })
  })
}

/**
 * 初始化
 */
const initPage = () => {
  // console.log(route.query?.reportId)
  changArr.value = {}
  getTableData(setProxy(queryParams.value))

  instance?.proxy?.emitter.on('refreshDistributionRecordTable', () => {
    getTableData(setProxy(queryParams.value))
  })
}
initPage()
</script>

<style lang="scss" scoped>
.my_report {
}
</style>
