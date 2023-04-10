<template>
  <section class="page-wrap">
    <section class="content-wrap" style="min-height: 400px">
      <el-select
        :border="true"
        v-model="selectValue"
        style="width: 370px; border: 2px solid #f5f5f5; margin-bottom: 12px"
        placeholder="Select"
        size="large"
        @change="setType">
        <!-- @change="handleTabClick"> -->
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <!-- 搜索内容 -->
      <div flex="cross:center" style="width: 370px; border: 2px solid #f5f5f5">
        <SvgIcon name="search" class="search-icon ml8"></SvgIcon>
        <el-input v-model="searchKeyWords" placeholder="请输入关键字检索" @input="handleSearch" clearable :disabled="currentTab === '3'"></el-input>
      </div>
      <!-- 切换 tabs -->
      <!-- <el-tabs v-model="currentTab" class="demo-tabs" stretch @tab-click="handleTabClick"> -->
      <div v-if="selectValue == 1" class="mt16">
        <el-scrollbar height="300px">
          <el-tree
            v-if="currentTab === '1' && searchKeyWords === ''"
            :default-checked-keys="defaultTreeSelect"
            check-on-click-node
            :props="{
              isLeaf: (data, node) => data.type === 2
            }"
            node-key="id"
            :load="loadTreeNode"
            lazy
            check-strictly
            show-checkbox
            ref="refMyTree"
            @check-change="handleSelectedTreeUser"></el-tree>
          <el-checkbox-group v-model="selectedUsers" style="font-size: 14px" v-if="currentTab === '1' && searchKeyWords !== ''">
            <div class="check_group_wrap" v-for="item in sameTreeUsers" :key="item.id" flex="main:justify cross:center">
              <div class="check_group_left" style="display: block">
                <ul>
                  <li>{{ item.username }}&nbsp;&nbsp;&nbsp;{{ item.stationName }}</li>
                  <li>{{ item.orgName }}&nbsp;&nbsp;&nbsp;{{ item.departmentName }}</li>
                </ul>
              </div>
              <el-checkbox class="check_group_right" :label="item" @change="getSingleUser(item)"><br /></el-checkbox>
            </div>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
      <div v-if="selectValue == 2" class="mt16">
        <el-scrollbar height="300px">
          <el-checkbox-group v-model="selectedUsers" style="font-size: 14px">
            <div class="check_group_wrap" v-for="item in sameDepartmentUsers" :key="item.id" flex="main:justify cross:center">
              <div class="check_group_left" style="display: block">
                <ul>
                  <li>{{ item.username }}&nbsp;&nbsp;&nbsp;{{ item.stationName }}</li>
                  <li>{{ item.orgName }}&nbsp;&nbsp;&nbsp;{{ item.departmentName }}</li>
                </ul>
              </div>
              <el-checkbox class="check_group_right" :label="item" @change="getSingleUser(item)"><br /></el-checkbox>
            </div>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
      <!-- </el-tabs> -->
      <!-- 每个组显示内容 -->
    </section>

    <!-- 常用组 -->
    <!-- <option-group-dialog ref="refOptionGroupDialog" :currentGroupStatus="currentGroupStatus" @resetTab="resetTab" /> -->
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, getCurrentInstance } from 'vue'
// 引入请求功能
import { http } from '@/api/index.js'
// 引入工具库
import { debounce } from '@/utils/tools'
// 组件
// import OptionGroupDialog from '@/views/data-collect/my-report/components/OptionGroupDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const instance = getCurrentInstance()

let searchKeyWords = ref('')
let currentTab = ref('1')
let selectedUsers = ref([]) // 右边的数组 - 选中的人
let selectedGroupUsers = ref([]) // 右边的数组 - 选中的常用组
// const dialogVisible = ref(false)
// const refOptionGroupDialog = ref(null)
// const currentGroupStatus = ref('创建')
const refMyTree = ref(null)

let defaultTreeSelect = ref([])
let sameDepartmentUsers = ref([])
let sameGroupUsers = ref([])
let sameTreeUsers = ref([])
let selectValue = ref('2')
let options = [
  {
    value: '1',
    label: '同公司人员'
  },
  {
    value: '2',
    label: '同部门人员'
  }
]
// 右侧选中显示的组
let rightSelectedUsers = ref([])
// 组中选的人
// let _groupSelectedUsers = []

const props = defineProps({
  /* isAddGroups: {
    type: Boolean,
    default: true
  },
  isSingle: {
    type: Boolean,
    default: true
  } */
})

const setType = (val) => {
  // console.log(val)
  searchKeyWords.value = ''

  if (val === '2') {
    setDepartmentApi()
  }
}

const getSingleUser = (val) => {
  // console.log(val)

  selectedUsers.value = selectedUsers.value.includes(val) ? [val] : []
}

/* const resetTab = () => {
  currentTab.value = '1'
} */

// 输入框
const handleSearch = debounce((value) => {
  // console.log('查询', searchKeyWords)
  searchKeyWords.value = value

  if (selectValue.value === '1') {
    apiOrgCompanyTreeAsync({ showName: searchKeyWords.value })
  }
  if (selectValue.value === '2') {
    setDepartmentApi(searchKeyWords.value)
  }
}, 800)

// 获取最终数据
const getSelectedUserData = () => {
  // console.log('selectedUsers', rightSelectedUsers)

  return selectedUsers
}
// const resetRightSelectedUsers = () => {
//   // console.log('111')
//   rightSelectedUsers.value = []
//   currentTab.value = '1'
//   selectTab('1')
// }
// // 获取默认用户
// const setDefaultUser = (userList) => {
//   console.log('获取默认用户', userList)

//   rightSelectedUsers.value = userList
// }

// // 渲染编辑用户
// const renderEditUsers = (val) => {
//   // console.log('渲染编辑用户', val)
//   queryUserByIdApi(val.id)
// }
// 渲染常用组
// const renderGroups = () => {
//   // console.log('渲染常用组')
//   currentTab.value = '3'
//   selectTab('3')
// }
// const addGroup = () => {
//   // currentTab.value = '1'
//   currentGroupStatus.value = '创建'
//   refOptionGroupDialog.value.openOptionGroupDialog()
// }
// 同部门接口
const setDepartmentApi = (showName) => {
  // console.log('showName', showName)
  sameDepartmentUsers.value = []
  http('apiOrgQueryDepartment', { showName }).then((res) => {
    // 部门名称 departmentName   组织名称   orgName  用户名称  username  职位名称 stationName
    // console.log(res)
    res.forEach((item) => {
      sameDepartmentUsers.value.push({
        id: item.id,
        departmentName: item.departmentName, // 部门名称
        orgName: item.orgName, // 组织名称
        username: item.username, // 用户名称
        label: item.username, // 用户名称
        stationName: item.stationName, // 职位名称
        stationId: item.stationId, // 职位id
        isChange: item.isChange ? true : false
      })
    })
  })
}
setDepartmentApi()

/**
 * 删除选中的人
 * @param {Number} index 下标
 */
// const deleteSelectedUser = (index) => {
//   rightSelectedUsers.value.splice(index, 1)
// }

/**
 * 获取组织树结构
 * @param {Number} orgId 上层组织名称
 */
const apiOrgCompanyTreeAsync = async (params) => {
  let resData = await http('apiOrgCompanyTree', params)
  // console.log(resData)

  // 在组织结构输入
  if (currentTab.value === '1' && searchKeyWords.value !== '') {
    // console.log('在组织结构输入')
    sameTreeUsers.value = []
    resData.forEach((item) => {
      sameTreeUsers.value.push({
        id: item.id,
        departmentName: item.departmentName, // 部门名称
        orgName: item.orgName, // 组织名称
        username: item.username, // 用户名称
        label: item.username, // 用户名称
        stationName: item.stationName // 职位名称
      })
    })

    return
  }

  return resData
}
/**
 * 加载节点
 * @param {object} node 树的内容
 * @param {function} resolve 处理方法
 */
const loadTreeNode = async (node, resolve) => {
  if (node.level === 0) {
    let data = await apiOrgCompanyTreeAsync({ orgId: 10000001 })
    return resolve(data)
  } else {
    let data = await apiOrgCompanyTreeAsync({ orgId: node.data.id })
    return resolve(data)
  }
}
/**
 * 组织树选择用户
 * @param {Number} val 选中的id
 */
const handleSelectedTreeUser = (val, selected) => {
  if (val.type === 2 && selected) {
    refMyTree.value.setCheckedKeys([])
    refMyTree.value.setChecked(val, true)
    selectedUsers.value = [val]
    // console.log(selectedUsers.value)
  }
}

// const selectTab = (tbNum) => {
//   if (tbNum === '1') {
//   }

//   // 部门
//   if (tbNum === '2') {
//     setDepartmentApi()
//   }

//   // 常用组
//   if (tbNum === '3') {
//     sameGroupUsers.value = []
//     http('apiReportGroupGet').then((res) => {
//       // console.log(res)
//       // 部门名称 departmentName   组织名称   orgName  用户名称  username  职位名称 stationName
//       res.forEach((item) => {
//         sameGroupUsers.value.push({
//           id: item.id,
//           groupName: item.groupName,
//           label: item.groupName,
//           group_obj: item.group_obj,
//           length: eval(item.group_obj).length,
//           isChange: item.isChange ? true : false
//         })
//       })
//     })
//   }
// }
// 选项卡
/* const handleTabClick = (val) => {
  selectedUsers.value = []
  console.log('val', val)
  searchKeyWords.value = ''

  switch (val) {
    case '1':
      break
    case '2':
      selectTab('2') // 部门
      break
    case '3':
      selectTab('3') // 常用组
      break
  }
} */
// 编辑常用组
/* const editGroup = (item) => {
  console.log('编辑常用组', item)

  currentGroupStatus.value = '编辑'
  refOptionGroupDialog.value.openOptionGroupDialog(item)
} */
// 根据常用组获取用户
/* const getSelectedUserByGroup = (check) => {
  if (selectedGroupUsers.value.length === 0) {
    _groupSelectedUsers = []
    handleRightSelectedUsers()
    return
  }
  _groupSelectedUsers = []
  selectedGroupUsers.value.forEach(async (item) => {
    let temRes = await http('apiReportGroupQueryById', { id: item.id })
    temRes.forEach((item) => {
      _groupSelectedUsers.push({
        ...item,
        id: item.userId,
        label: item.username, // 用户名称
        isChange: item.isChange ? true : false
      })
    })
    handleRightSelectedUsers()
  })
} */
// 根据id查询
// const queryUserByIdApi = (id) => {
//   // console.log(id)
//   // let tempSelectedUsers = []
//   http('apiReportGroupQueryById', { id }).then((res) => {
//     res.forEach((item) => {
//       _groupSelectedUsers.push({
//         ...item,
//         id: item.userId,
//         label: item.username, // 用户名称
//         isChange: item.isChange ? true : false
//         // id: item.userId,
//         // departmentName: item.departmentName, // 部门名称
//         // orgName: item.orgName, // 组织名称
//         // username: item.username, // 用户名称
//         // label: item.username, // 用户名称
//         // stationName: item.stationName, // 职位名称
//         // stationId: item.stationId, // 职位id
//         // isChange: item.isChange ? true : false
//       })
//     })
//     handleRightSelectedUsers()
//   })
// }

// const handleRightSelectedUsers = () => {
/* let tempArr = JSON.parse(JSON.stringify(selectedUsers.value))
  let rightSelectedUsersTemp = JSON.parse(JSON.stringify(rightSelectedUsers.value))
  // let temp2Arr = []
  // console.log(tempArr)
  let tempUserIds = tempArr.map((item) => item.id)
  _groupSelectedUsers.forEach((item) => {
    if (!tempUserIds.includes(item.id)) {
      tempArr.push(item)
    }
  })

  let temp2Arr = tempArr.concat(rightSelectedUsersTemp)
  rightSelectedUsers.value = temp2Arr.filter(function (item, index, self) {
    return self.findIndex((el) => el.id == item.id) === index
  })
  console.log(selectedUsers.value) */
// selectedUsers.value = []
// console.log(rightSelectedUsersTemp)
// }

// 删除常用组
// const delGroup = (item) => {
//   // console.log('删除常用组', item)

//   ElMessageBox.confirm('确定删除常用组吗?', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning'
//   })
//     .then(() => {
//       http('apiReportGroupDelete', { id: item.id }).then((res) => {
//         ElMessage({
//           type: 'success',
//           message: '操作成功'
//         })
//         selectTab('3') // 常用组
//       })
//     })
//     .catch(() => {})
// }

// watch(selectedUsers, (list) => {
//   // console.log(list)
//   handleRightSelectedUsers()
//   defaultTreeSelect.value = list.map((item) => item.id)
// })
// /**
//  * 初始化
//  */
// const initPage = () => {
//   instance?.proxy?.emitter.on('refreshGroupList', () => {
//     selectTab('3')
//   })
// }
// initPage()

/**
 * 暴露方法
 */
defineExpose({
  getSelectedUserData
  // renderEditUsers,
  // selectTab,
  // renderGroups,
  // resetRightSelectedUsers,
  // setDefaultUser
})
</script>

<style lang="scss" scoped>
.page-wrap {
  max-height: 62vh;
  overflow: auto;
  // position: relative;

  // .subtitle {
  //   position: absolute;
  //   top: -36px;
  //   font-size: 12px;
  //   color: #a4a4a4;
  // }
  .search-icon {
    font-size: 22px;
    color: var(--el-color-primary);
    // margin-left: 2px;
  }
  .content-wrap {
    width: 100%;
    // padding: 0 24px;
    padding: 0;

    .check_group_wrap {
      min-height: 25px;
      border-bottom: 0.5px solid #d9d9d9;
      margin-bottom: 6px;
      padding-bottom: 3px;

      .check_group_left {
        ul {
          width: 96%;
          min-width: 230px;

          li {
            line-height: 23px;
          }
        }
        span {
          font-size: 12px;
          color: #f00;
        }
      }
      .check_group_right {
        ul {
          li {
            position: relative;
            display: inline-block;

            &:not(:last-child) {
              margin-right: 10px;
            }

            &:first-child,
            &:nth-child(2) {
              top: -3px;
            }

            .el-button {
              width: 10px;
              height: 10px;
              border: none;
            }
          }
        }
      }
    }

    :deep .el-input__wrapper {
      box-shadow: none;
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
  }
}
</style>
