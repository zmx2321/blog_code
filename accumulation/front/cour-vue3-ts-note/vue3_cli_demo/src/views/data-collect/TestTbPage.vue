<template>
  <table-page title="待填报列表" :total="table.total" v-model:searchQuery="searchQuery" @refreshTableData="getTableData">
    <!-- 表格 -->
    <template #tableContent>
      <el-table border stripe :data="table.data" style="width: 100%">
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
    </template>
  </table-page>
</template>

<script setup>
// 引入vue3功能模块
import { ref, reactive, computed, onActivated } from 'vue'
import { http } from '@/api/index.js'

// 搜索条件，用于table更新
const searchQuery = ref({
  page: 1,
  size: 15,
  auditorStatus: '0,1,2,3,4,5'
})
// table的所有数据
const table = ref({
  total: 0,
  data: []
})

// 请求表格数据
function getTableData() {
  const params = {
    ...searchQuery.value,
    page: searchQuery.value.page - 1
  }

  http('getMyForm', params).then((res) => {
    table.value.data = res
    table.value.total = res.length
  })
}

const initPage = () => {
  getTableData()
}
onActivated(() => {
  getTableData()
})
initPage()
</script>

<style lang="scss" scoped></style>
