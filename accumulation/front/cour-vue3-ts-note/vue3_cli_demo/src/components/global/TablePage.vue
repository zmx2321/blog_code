<template>
  <div class="table-page">
    <div class="title" v-if="props.title">{{ props.title }}</div>
    <TheTableFilter class="mt16"></TheTableFilter>

    <slot name="tableContent"></slot>

    <el-pagination
      v-model:current-page="searchCondition.page"
      v-model:page-size="searchCondition.size"
      background
      layout="total, sizes, prev, pager, next"
      :page-sizes="[15, 30, 50, 100]"
      :total="props.total"
      class="pagination"
      @size-change="paginationChange"
      @current-change="paginationChange" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { http } from '@/api/index.js'
// 组件内容
import TheTableFilter from '@/components/the-table-filter/index.vue'

// 导出注册
const emit = defineEmits(['update:searchQuery', 'refreshTableData'])

// 筛选表格条件
const searchCondition = ref({
  page: 1,
  size: 15
})
/**
 * 表格分页组件修改后方法
 */
function paginationChange() {
  emit('update:searchQuery', { ...props.searchQuery, ...searchCondition.value })
  emit('refreshTableData')
}

// 需要父组件传进来的内容
const props = defineProps({
  // 页面标题
  title: {
    type: String,
    default: '',
    required: false
  },
  // 表格数据总数
  total: {
    type: Number,
    default: 0,
    required: true
  },
  // 表格搜索条件
  searchQuery: {
    type: Object,
    default: {},
    required: true
  }
})
</script>

<style lang="scss" scoped>
.table-page {
  .title {
    font-weight: 500;
    font-size: 18px;
  }

  .pagination {
    text-align: right;
    margin-top: 16px;
  }

  .mt16 {
    margin-top: 16px;
  }
}
</style>
