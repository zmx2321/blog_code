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
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="distribute_time" label="分发时间" width="180" fixed />
          <el-table-column prop="status" label="状态" width="180">
            <template #default="scope">
              <span v-if="scope.row.status == 0">收集中</span>
              <span v-if="scope.row.status == 1">已完成</span>
              <span v-if="scope.row.status == 2">已撤回</span>
            </template>
          </el-table-column>
          <el-table-column prop="schedule_period" label="统计周期" />
          <el-table-column prop="distribute_count" label="下发总数" />
          <el-table-column prop="submit_count" label="已收集">
            <template #default="scope">
              <span>{{ scope.row.submit_count }}份</span>
            </template>
          </el-table-column>
          <el-table-column prop="end_time" label="填报截止时间" width="240" />
          <el-table-column fixed="right" label="操作" width="240">
            <template #default="slotProps">
              <el-button link type="primary" @click="reissue(slotProps.row)">补发</el-button>
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
                    <el-dropdown-item command="deferredFilling">延期填报</el-dropdown-item>
                    <el-dropdown-item command="withdraw">撤回</el-dropdown-item>
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
          layout="prev, pager, next"
          :page-sizes="[100, 200, 300, 400]"
          :total="totalPage"
          class="fr mt12"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </template>
    </table-page>

    <!-- 合并数据 -->
    <merge-Page-dialog ref="mergePageDialogRef" />
  </section>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
// 表格页面公共页面
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
// 弹窗
import MergePageDialog from './components/MergePageDialog.vue' // 合并数据
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'

// 初始化工具
const router = useRouter()

/**
 * 页面基本数据
 */
let title = ref('高速公路板块2023年能耗数据')
let collectDate = ref('')
let value = ref('')

// 定义子组件实例，名称要和上面的ref相同
const mergePageDialogRef = ref(null) // 合并数据

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
    label: '表单名称',
    prop: 'title',
    element: 'el-input'
  },
  {
    label: '分发时间',
    prop: 'time',
    element: 'el-date-picker'
  },
  {
    label: '状态',
    prop: 'status',
    element: 'el-select',
    options: options
  }
])
// 表单参数
let queryParams = ref({
  page: 0,
  size: 10,
  reportId: 1
})

// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 0,
    size: 10
  }

  getTableData(setProxy(queryParams.value))
}
// 获取子组件查询方法
const searchHolder = (val) => {
  // console.log(val)
  // console.log(val, queryParams.value)

  queryParams.value = Object.assign(val, queryParams.value)

  getTableData(setProxy(queryParams.value))
}
// 合并数据
const mergeData = () => {
  console.log('合并数据')

  mergePageDialogRef.value.openMergePageDialog()
}

/**
 * 表格相关
 */
// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)

// 获取表格数据
const getTableData = (params) => {
  http('getDistributionRecordList', params).then((res) => {
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

// 补发
const reissue = (row) => {
  console.log('补发', row)
}
// 收集进度
const collectionProgress = (row) => {
  console.log('收集进度', row)

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
  console.log('延期填报', row)
}
// 撤回
const withdrawMed = (row) => {
  // console.log('撤回', row)

  // 信息提示窗
  openInfo('确认撤回？撤回后将无法填写。', () => {
    console.log('撤回操作', row.distribute_id)
    http('recall', { ids: row.distribute_id }).then((res) => {
      console.log('撤回成功')
    })
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
}
</style>
