<template>
  <section class="collect_wrap">
    <!-- <div v-if="distributeStatus === '1'" class="collect_model1_wrap">
      <el-checkbox-group v-model="checkList" v-for="(item, index) in collectList1" :key="index">
        <el-checkbox :label="item.label" :checked="item.flag" @change="setModel1User(item)">
          <ul>
            <li>{{ item.label }}</li>
            <li v-if="item.flag">填报人：{{ model1UserStr }}</li>
          </ul>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-if="distributeStatus === '2'">人工分发2</div> -->
  </section>

  <el-dialog v-model="model1SelectUserVisible" title="请选择填报人员" width="50%" lock-scroll :close-on-click-modal="false">
    <!-- <el-tree
      :data="model1DataTree"
      class="tree-style"
      node-key="id"
      ref="tree"
      show-checkbox
      highlight-current
      :props="defaultProps"
      :check-strictly="true"
      @check="getChecked"></el-tree> -->
    <el-tree-select
      lazy
      ref="treeRef"
      :load="loadNode"
      :props="{}"
      value-key=""
      placeholder="请选择"
      show-checkbox
      check-strictly
      highlight-current
      :default-expanded-keys="defaultExpandedNodes" />
    <!-- <el-tree-select v-model="form.deptId" lazy ref="treeRef" :load="loadNode" :props="{ value: "deptId", label: "deptName"}" value-key="deptId"
    node-key="deptId" placeholder="请选择" show-checkbox check-strictly highlight-current :default-expanded-keys="defaultExpandedNodes" /> -->

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="model1SelectUserVisible = false">取消</el-button>
        <el-button type="primary" @click="model1Submit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue'
// 接口
import * as proxyApi from '@/api/data-collect/my-report/proxyApi.js'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'

// props参数
const props = defineProps({
  distributeStatus: {
    type: String,
    default: '1',
    required: true
  }
})

/**
 * 定义变量
 */
// 弹窗布尔值
const model1SelectUserVisible = ref(false)

// 分发模式1
let checkList = ref([])
let collectList1 = ref([])
let collectUserList1 = ref([])
let model1DataTree = ref([])
let model1UserStr = ref('')

/**
 * 定义方法
 */
// 获取部门树接口
const getDetTreeAsync = (orgId, next) => {
  proxyApi.getDeptTree(orgId).then((res) => {
    // console.log('获取部门树', res.data)

    next(res.data)
  })
}
// 获取第一层部门树
const getDetTree = () => {
  getDetTreeAsync(10000001, (resData) => {
    // console.log(resData)

    resData.forEach((item) => {
      item.flag = false
    })
    collectList1.value = resData
  })
}
// 选择公司触发
const setModel1User = (item) => {
  model1SelectUserVisible.value = true

  // console.log(item.id)
  getDetTreeAsync(item.id, (resData) => {
    console.log(resData)
    model1DataTree.value = resData
  })
  /* item = setProxy(item)`
  console.log('checkList', checkList.value)
  // item.flag = false
  console.log('setModel1User', item) */
}
// 模式一提交
const model1Submit = () => {
  console.log('模式一提交')
}
// 模式一提交
const loadNode = (node, resolve) => {
  console.log('loadNode', node.level)
  // node其实是需要展开树节点，但是第一次的node是个无用的数据，可以认为这个node是element给我们创建的，判断的话，就是level等于0
  if (node && node.level == 0) {
    // getDeptData(0, resolve)
  } else {
    // getDeptData(node, resolve)
  }
}

// 打开弹窗
/* const openSelectCompanyUserDialog = () => {
  console.log('openSelectCompanyUserDialog')
  // dialogVisible.value = true
} */

/**
 * 初始化
 */
const initPage = () => {
  getDetTree() // 获取部门树
  /* proxyApi.getCompanyTree().then((res) => {
    res.data.children.forEach((item) => {
      item.flag = false
    })
    collectList1.value = res.data.children
    console.log('获取组织树', res.data.children)
  })
  proxyApi.getCompanyUser(10000087).then((res) => {
    console.log('根据组织树获取用户', res)
  })
  proxyApi.getDeptTree(10000001).then((res) => {
    console.log('获取部门树', res.data)
  })
  console.log(111) */
}
initPage()
</script>

<style lang="scss" scoped>
.collect_wrap {
  .collect_model1_wrap {
    .el-checkbox-group {
      .el-checkbox__label {
        ul {
          li {
            display: inline-block;
            list-style: none;

            &:not(:last-child) {
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
  .collect_model2_wrap {
  }
}
</style>
