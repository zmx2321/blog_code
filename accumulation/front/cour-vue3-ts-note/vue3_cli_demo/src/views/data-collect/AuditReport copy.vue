<template>
  <div class="main">
    <div class="top_title">
      <p>报表审核</p>
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
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
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
        <el-table-column prop="name" label="审核对象" width="280" />
        <el-table-column prop="demo1" label="收集单位" width="180" />
        <el-table-column prop="demo2" label="收集用户" width="180" />
        <el-table-column prop="demo3" label="状态" width="180" />
        <el-table-column prop="demo4" label="提交审核时间" width="180" />
        <el-table-column prop="demo5" label="提交人" width="180" />
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button text>审核</el-button>
            <el-button text>审核意见</el-button>
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
    name: '路公司2022年能耗数据',
    demo1: '浙江沪杭甬高速公路股份有限公司科创中心',
    demo2: '慕容李四',
    demo3: '待审核',
    demo4: '2023.01.28 09:00',
    demo5: '张三丰'
  },
  {
    name: '金融板块通用经营报表',
    demo1: '浙江沪杭甬高速公路股份有限公司科创中心',
    demo2: '慕容李四',
    demo3: '待审核',
    demo4: '2023.01.28 09:00',
    demo5: '张三丰'
  },
  {
    name: '商贸物流板块通用经营报表',
    demo1: '浙江沪杭甬高速公路股份有限公司科创中心',
    demo2: '慕容李四',
    demo3: '待审核',
    demo4: '2023.01.28 09:00',
    demo5: '张三丰'
  },
  {
    name: '月度能耗数据统计',
    demo1: '浙江沪杭甬高速公路股份有限公司科创中心',
    demo2: '慕容李四',
    demo3: '待审核',
    demo4: '2023.01.28 09:00',
    demo5: '张三丰'
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
    width: 100%;
    height: 100%;
  }
}
</style>
