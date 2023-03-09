<template>
  <div class="main">
    <div class="top_title">
      <p>待填报报表</p>
    </div>
    <!-- 搜索栏 -->
    <div class="top_search">
      <div>
        <el-input class="search_box" v-model="input" placeholder="请输入表单名称" />
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <!-- 标签切换 -->
    <div class="">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待提交" name="second"></el-tab-pane>
        <el-tab-pane label="审核中" name="third"></el-tab-pane>
        <el-tab-pane label="已完成" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 表格 -->
    <div class="table_box">
      <el-table
        :data="tableData"
        :columns="columns"
        :default-sort="defaultSort"
        :show-header="true"
        :show-footer="true"
        :row-class-name="rowClassName">
        <el-table-column prop="name" label="报表名称" width="280" />
        <el-table-column prop="status" label="状态" width="180">
          <template #default="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-if="scope.row.status == 2">停用</span>
          </template>
        </el-table-column>
        <el-table-column prop="mode" label="分发模式" width="180" />
        <el-table-column prop="time" label="生效时间段" width="180" />
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button text>分发记录</el-button>
            <el-button text>立即分发</el-button>
            <el-button text>更多</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>

<script setup>
// 引入 vue 内置方法
import { ref, toRefs, reactive, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import { http } from '@/api/index'

let input = ref('')
// const search = {
//   console.log('搜索')
// }

let tableData = ref([
  {
    name: '高速公路板块2023年能耗数据',
    status: 1,
    mode: 1,
    time: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: '高速公路板块2023年能耗数据',
    status: 1,
    mode: 1,
    time: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: '高速公路板块2023年能耗数据',
    status: 2,
    mode: 1,
    time: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: '高速公路板块2023年能耗数据',
    status: 2,
    mode: 1,
    time: 'No. 189, Grove St, Los Angeles'
  }
])

// 生命周期
onBeforeMount(() => {
  console.log('组件挂载之前')
})
onMounted(() => {
  console.log('组件挂载完成')
})
onBeforeUpdate(() => {
  console.log('数据更新，虚拟 DOM 打补丁之前')
})
onUpdated(() => {
  console.log('数据更新，虚拟 DOM 渲染完成')
})
onBeforeUnmount(() => {
  console.log('组件销毁之前')
})
onUnmounted(() => {
  console.log('组件销毁之后')
})
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  // padding: 20px 0;
  .top_title {
    margin-bottom: 20px;
    p {
      font-size: 20px;
      line-height: 28px;
    }
  }
  .top_search {
    padding-top: 20px;
    .search_box {
      width: 193px;
      height: 36px;
      margin-right: 15px;
    }
  }
  .table_box {
    width: 70%;
    height: 100%;
  }
}
</style>
