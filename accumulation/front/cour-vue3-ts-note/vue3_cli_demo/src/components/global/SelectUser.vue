<template>
  <section class="page-wrap" flex="main:justify">
    <section class="content-wrap" style="border-right: 1px solid #f5f5f5; min-height: 400px">
      <!-- 搜索内容 -->
      <div flex="cross:center">
        <SvgIcon name="search" class="search-icon"></SvgIcon>
        <el-input v-model="searchKeyWords" placeholder="请输入关键字检索" @input="handleSearch" clearable :disabled="currentTab === '3'"></el-input>
      </div>
      <!-- 切换 tabs -->
      <el-tabs v-model="currentTab" class="demo-tabs" stretch @tab-click="handleTabClick">
        <el-tab-pane label="组织结构" name="1">
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
              @check-change="handleSelectedTreeUser"></el-tree>
            <el-checkbox-group v-model="selectedUsers" style="font-size: 14px" v-if="currentTab === '1' && searchKeyWords !== ''">
              <div class="check_group_wrap" v-for="item in sameTreeUsers" :key="item.id" flex="main:justify cross:center">
                <div class="check_group_left" style="display: block">
                  <ul>
                    <li>{{ item.username }}&nbsp;&nbsp;&nbsp;{{ item.stationName }}</li>
                    <li>{{ item.orgName }}&nbsp;&nbsp;&nbsp;{{ item.departmentName }}</li>
                  </ul>
                </div>
                <el-checkbox class="check_group_right" :label="item"><br /></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="同部门" name="2">
          <el-scrollbar height="300px">
            <el-checkbox-group v-model="selectedUsers" style="font-size: 14px">
              <div class="check_group_wrap" v-for="item in sameDepartmentUsers" :key="item.id" flex="main:justify cross:center">
                <div class="check_group_left" style="display: block">
                  <ul>
                    <li>{{ item.username }}&nbsp;&nbsp;&nbsp;{{ item.stationName }}</li>
                    <li>{{ item.orgName }}&nbsp;&nbsp;&nbsp;{{ item.departmentName }}</li>
                  </ul>
                </div>
                <el-checkbox class="check_group_right" :label="item"><br /></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="常用组" name="3" v-if="isSingle">
          <el-button class="mb8" icon="el-icon-plus" @click="addGroup" v-if="isAddGroups">新增组</el-button>
          <!-- <el-scrollbar height="300px">
            <el-checkbox-group v-model="selectedUsers" style="font-size: 14px">
              <div v-for="item in sameGroupUsers" :key="item.id" flex="main:justify cross:center">
                <div style="display: block">{{ item.label }}</div>
                <el-checkbox :label="item"><br /></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-scrollbar> -->
          <el-scrollbar height="300px">
            <el-checkbox-group v-model="selectedGroupUsers" style="font-size: 14px">
              <div class="check_group_wrap" v-for="item in sameGroupUsers" :key="item.id" flex="main:justify cross:center">
                <div class="check_group_left" style="display: block">
                  {{ item.groupName }}({{ item.length }})
                  <span class="ml8" v-if="item.isChange">人员变动</span>
                </div>
                <div class="check_group_right">
                  <ul>
                    <li v-if="isAddGroups"><el-button icon="el-icon-edit" circle @click="editGroup(item)"></el-button></li>
                    <li v-if="isAddGroups"><el-button icon="el-icon-delete" circle @click="delGroup(item)"></el-button></li>
                    <li>
                      <el-checkbox :label="item" @change="getSelectedUserByGroup"><br /></el-checkbox>
                    </li>
                  </ul>
                </div>
              </div>
            </el-checkbox-group>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <!-- 每个组显示内容 -->
    </section>
    <section class="content-wrap" style="width: 50%">
      <div style="color: #666666">已选择({{ rightSelectedUsers.length }})</div>
      <el-scrollbar height="300px" class="mt16">
        <!-- <div v-for="(item, index) in selectedUsers" :key="item.id" flex="main:justify cross:center">
          <div v-if="isAddGroups">{{ item.label }}</div>
          <div v-else :style="{ color: item.isChange ? '#f00' : '' }">{{ item.label }}{{ item.isChange }}</div>
          <svg-icon name="close" class="close-icon" @click="deleteSelectedUser(index)"></svg-icon>
        </div> -->
        <div class="check_group_wrap" v-for="(item, index) in rightSelectedUsers" :key="item.id" flex="main:justify cross:center">
          <div class="check_group_left" style="display: block">
            <!-- {{ item }} -->
            <ul v-if="isAddGroups">
              <li>{{ item.label }}&nbsp;&nbsp;&nbsp;{{ item.stationName }}</li>
              <li>{{ item.orgName }}&nbsp;&nbsp;&nbsp;{{ item.departmentName }}</li>
            </ul>
            <ul v-else :style="{ color: item.isChange ? '#f00' : '' }">
              <li>{{ item.label }}&nbsp;&nbsp;&nbsp;{{ item.stationName }}</li>
              <li>{{ item.orgName }}&nbsp;&nbsp;&nbsp;{{ item.departmentName }}</li>
            </ul>
          </div>
          <svg-icon name="close" class="close-icon" @click="deleteSelectedUser(index, item)"></svg-icon>
        </div>
      </el-scrollbar>
    </section>

    <!-- 常用组 -->
    <option-group-dialog ref="refOptionGroupDialog" :currentGroupStatus="currentGroupStatus" @resetTab="resetTab" />
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, getCurrentInstance } from 'vue'
// 引入请求功能
import { http } from '@/api/index.js'
// 引入工具库
import { debounce } from '@/utils/tools'
// 组件
import OptionGroupDialog from '@/views/data-collect/my-report/components/OptionGroupDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const instance = getCurrentInstance()

let searchKeyWords = ref('')
let currentTab = ref('1')
let selectedUsers = ref([]) // 右边的数组 - 选中的人
let selectedGroupUsers = ref([]) // 右边的数组 - 选中的常用组
const dialogVisible = ref(false)
const refOptionGroupDialog = ref(null)
const currentGroupStatus = ref('创建')

let defaultTreeSelect = ref([])
let sameDepartmentUsers = ref([])
let sameGroupUsers = ref([])
let sameTreeUsers = ref([])

// 右侧选中显示的组
let rightSelectedUsers = ref([])
// 组中选的人
let _groupSelectedUsers = []

const props = defineProps({
  isAddGroups: {
    type: Boolean,
    default: true
  },
  isSingle: {
    type: Boolean,
    default: true
  }
})

const resetTab = () => {
  currentTab.value = '1'
}

// 输入框
const handleSearch = debounce((value) => {
  // console.log('查询', searchKeyWords)
  searchKeyWords.value = value

  if (currentTab.value === '1') {
    apiOrgCompanyTreeAsync({ showName: searchKeyWords.value })
  }
  if (currentTab.value === '2') {
    setDepartmentApi(searchKeyWords.value)
  }
}, 800)

// 获取最终数据
const getSelectedUserData = () => {
  // console.log('selectedUsers', rightSelectedUsers)

  return rightSelectedUsers
}
const resetRightSelectedUsers = () => {
  // console.log('111')
  rightSelectedUsers.value = []
  currentTab.value = '1'
  selectTab('1')
}
// 获取默认用户
const setDefaultUser = (userList) => {
  selectedUsers.value = userList.map((item) => {
    return {
      id: item.id,
      departmentName: item.departmentName, // 部门名称
      orgName: item.orgName, // 组织名称
      username: item.username, // 用户名称
      label: item.username, // 用户名称
      stationName: item.stationName, // 职位名称
      stationId: item.stationId, // 职位id
      isChange: item.isChange ? true : false
    }
  })
}

// 渲染编辑用户
const renderEditUsers = (val) => {
  // console.log('渲染编辑用户', val)
  queryUserByIdApi(val.id)
}
// 渲染常用组
const renderGroups = () => {
  // console.log('渲染常用组')
  currentTab.value = '3'
  selectTab('3')
}
const addGroup = () => {
  // currentTab.value = '1'
  currentGroupStatus.value = '创建'
  refOptionGroupDialog.value.openOptionGroupDialog()
}
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

/**
 * 删除选中的人
 * @param {Number} index 下标
 */
const deleteSelectedUser = (index, spliceItem) => {
  // console.log(index)
  rightSelectedUsers.value.splice(index, 1)
  let _index = selectedUsers.value.findIndex((_item) => _item.id === spliceItem.id)
  console.log(_index)
  selectedUsers.value.splice(_index, 1)
  // selectedUsers
}

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
        stationName: item.stationName, // 职位名称
        stationId: item.stationId, // 职位id
        isChange: item.isChange ? true : false
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
  // console.log(val, selected)
  if (val.type === 2) {
    let index = rightSelectedUsers.value.findIndex((item) => item.id === val.id)
    if (index < 0 && selected) {
      rightSelectedUsers.value.push(val)
    } else if (index >= 0 && !selected) {
      rightSelectedUsers.value.splice(index, 1)
    }
  }
}

const selectTab = (tbNum) => {
  if (tbNum === '1') {
  }

  // 部门
  if (tbNum === '2') {
    setDepartmentApi()
  }

  // 常用组
  if (tbNum === '3') {
    sameGroupUsers.value = []
    http('apiReportGroupGet').then((res) => {
      // console.log(res)
      // 部门名称 departmentName   组织名称   orgName  用户名称  username  职位名称 stationName
      res.forEach((item) => {
        sameGroupUsers.value.push({
          id: item.id,
          groupName: item.groupName,
          label: item.groupName,
          group_obj: item.group_obj,
          length: eval(item.group_obj).length,
          isChange: item.isChange ? true : false
        })
      })
    })
  }
}
// 选项卡
const handleTabClick = (tab) => {
  // console.log('tab', tab.props.name)
  searchKeyWords.value = ''

  switch (tab.props.name) {
    case '1':
      break
    case '2':
      selectTab('2') // 部门
      break
    case '3':
      selectTab('3') // 常用组
      break
  }
}
// 编辑常用组
const editGroup = (item) => {
  console.log('编辑常用组', item)

  currentGroupStatus.value = '编辑'
  refOptionGroupDialog.value.openOptionGroupDialog(item)
}
// 根据常用组获取用户
const getSelectedUserByGroup = (check) => {
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
}
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

const handleRightSelectedUsers = () => {
  let tempArr = JSON.parse(JSON.stringify(selectedUsers.value))
  let rightSelectedUsersTemp = JSON.parse(JSON.stringify(rightSelectedUsers.value))
  // let temp2Arr = []
  // console.log(tempArr)
  let tempUserIds = tempArr.map((item) => item.id)
  _groupSelectedUsers.forEach((item) => {
    if (!tempUserIds.includes(item.id)) {
      tempArr.push(item)
    }
  })

  // rightSelectedUsers.value = tempArr

  let temp2Arr = tempArr.concat(rightSelectedUsersTemp)
  rightSelectedUsers.value = temp2Arr.filter(function (item, index, self) {
    return self.findIndex((el) => el.id == item.id) === index
  })
  // console.log(rightSelectedUsers.value)
}

// 删除常用组
const delGroup = (item) => {
  // console.log('删除常用组', item)

  ElMessageBox.confirm('确定删除常用组吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      http('apiReportGroupDelete', { id: item.id }).then((res) => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        })
        selectTab('3') // 常用组
      })
    })
    .catch(() => {})
}

watch(selectedUsers, (list) => {
  // console.log(list)
  handleRightSelectedUsers()
  defaultTreeSelect.value = list.map((item) => item.id)
})
/**
 * 初始化
 */
const initPage = () => {
  instance?.proxy?.emitter.on('refreshGroupList', () => {
    selectTab('3')
  })
}
initPage()

/**
 * 暴露方法
 */
defineExpose({
  getSelectedUserData,
  renderEditUsers,
  selectTab,
  renderGroups,
  resetRightSelectedUsers,
  setDefaultUser
})
</script>

<style lang="scss" scoped>
.page-wrap {
  .search-icon {
    font-size: 22px;
    color: var(--el-color-primary);
  }
  .content-wrap {
    width: 50%;
    padding: 0 24px;

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
