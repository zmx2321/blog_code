<template>
  <section class="collect_wrap">
    <!-- <div class="collect_title">
      <el-input placeholder="请输入关键字" suffix-icon="el-icon-date" v-model="searchKeyWords"></el-input>
    </div> -->
    <div class="collect_cont">
      <div class="collect_l">
        <div class="collect_l_t mb8">
          <!-- <el-input placeholder="请输入关键字" suffix-icon="el-icon-date" v-model="searchKeyWords"></el-input> -->
          <el-input v-model="searchKeyWords" placeholder="请输入关键字" @input="handleSearch">
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="组织结构" name="tb1">
            <el-tree
              :props="{
                isLeaf: (data, node) => {
                  if (data.type === 2) {
                    // 实体门店 叶子结点 不展示icon
                    return true
                  }
                }
              }"
              :load="loadNode"
              lazy
              show-checkbox
              @check-change="handleCheckChange"></el-tree>
          </el-tab-pane>
          <el-tab-pane label="同部门" name="tb2">
            <el-checkbox-group v-model="checkList" v-for="(item, index) in collectList1" :key="index">
              <el-checkbox :label="item.label" :checked="item.flag" @change="setModel1User(item)">
                <ul>
                  <li>{{ item.label }}</li>
                  <li v-if="item.flag">填报人：{{ model1UserStr }}</li>
                </ul>
              </el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="常用组" name="tb3">常用组</el-tab-pane>
        </el-tabs>
      </div>
      <div class="collect_r"></div>
    </div>
  </section>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, watch } from 'vue'
// 引入工具库
import { setProxy, debounce } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'
// props参数
const props = defineProps({
  distributeStatus: {
    type: String,
    default: '1',
    required: true
  }
})

// 初始化工具
const emit = defineEmits(['setCollectObjList'])

/**
 * 定义变量
 */
// 弹窗布尔值
const model1SelectUserVisible = ref(false)
const count = ref(1)
const activeName = ref('tb1') // 选项卡
const searchKeyWords = ref('') // 搜索框

// 分发模式1
let checkList = ref([])
let collectList1 = ref([])
let collectUserList1 = ref([])
let model1DataTree = ref([])
let model1UserStr = ref('')

// 分发模式2

// 需要传递的最终数据
let collectObjList = ref([])

// watch(
//   searchKeyWords,
//   (newValue, oldValue) => {
//     /* console.log('新的值:', newValue)
//     console.log('旧的值:', oldValue) */

//     // handleSearch()

//     debounce(handleSearch, 5300)
//   },
//   { deep: true }
// )

/**
 * 定义方法
 */
// 输入框
const handleSearch = debounce((value) => {
  // console.log('查询', searchKeyWords)
  searchKeyWords.value = value

  console.log('searchKeyWords.value', searchKeyWords.value)
}, 800)
// 选项卡
const handleTabClick = (val) => {
  // console.log('tab', val)
}

// 获取部门树接口
const getDetTreeAsync = async (orgId) => {
  // let resData = await proxyApi.getDeptTree(orgId)
  let resData = await http('apiOrgCompanyTree', { orgId })
  // console.log(resData)

  return resData
}
// 获取第一层部门树
const getDetTree = async () => {
  let resData = await getDetTreeAsync(10000001)
  console.log(resData)
  collectList1.value = resData
  // console.log(setProxy(collectList1.value))
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
const loadNode = async (node, resolve) => {
  // console.log('loadNode', node.level)
  // // node其实是需要展开树节点，但是第一次的node是个无用的数据，可以认为这个node是element给我们创建的，判断的话，就是level等于0
  // if (node && node.level == 0) {
  //   // getDeptData(0, resolve)
  // } else {
  //   // getDeptData(node, resolve)
  // }

  if (node.level === 0) {
    let data = await getDetTreeAsync(10000001)
    return resolve(data)
  } else {
    let data = await getDetTreeAsync(node.data.id)
    return resolve(data)
  }
}

const handleCheckChange = (val) => {
  if (val.type === 2) {
    collectObjList.value.push(val.id)
    // console.log(collectObjList.value)
    emit('setCollectObjList', collectObjList.value)
  }
}

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
  width: auto;

  // border: solid 1px #dfdada;
  // padding: 10px;

  .collect_title {
  }

  .collect_cont {
    display: flex;
    min-height: 100px;

    .collect_l,
    .collect_r {
      // flex: 1;
    }

    .collect_l {
      width: 50%;
      border-right: solid 1px#dfdada;
      padding-right: 12px;

      .el-tabs {
        .el-tabs__content {
          height: 300px;
          overflow: auto;
        }
      }

      /* .el-tree {
        height: 300px;
        overflow: auto;
      } */
      // background: #f00;
      .collect_l_t {
      }
    }

    .collect_r {
      flex: 1;
    }
  }

  /* .collect_model1_wrap {
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
  } */
  /* .collect_model2_wrap {
  } */
}

:deep(.el-tree) {
  .el-icon.el-tree-node__expand-icon {
    &.is-leaf {
      display: none;
    }

    &:not(.is-leaf) {
      & + .el-checkbox {
        display: none;
      }
    }
  }
}
</style>
