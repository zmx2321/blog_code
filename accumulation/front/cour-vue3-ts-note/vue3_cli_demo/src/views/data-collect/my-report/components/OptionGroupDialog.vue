<template>
  <!-- +"新增常用组" -->
  <el-dialog class="my_dialog" v-model="dialogVisible" :title="currentGroupTitle" width="50%" lock-scroll :close-on-click-modal="false">
    <div class="name_wrap" v-if="step === '1'">
      <ul>
        <li class="title mb8">{{ currentGroupStatus }}常用组</li>
        <li class="subtitle mb40">可将固定收集对象归为一组</li>
        <li class="input_wrap">
          <el-input v-model="form.groupName" placeholder="请输入常用组名称" clearable></el-input>
        </li>
      </ul>
    </div>

    <select-user v-else ref="refSelectUser" :isAddGroups="false" />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelSubmit">取消</el-button>
        <el-button type="primary" @click="confirmSubmit()">{{ step === '1' ? '下一步' : '确定' }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// vue3工具
import { ref, nextTick, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { http } from '@/api/index.js'

const instance = getCurrentInstance()

const props = defineProps({
  currentGroupStatus: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['resetTab'])

// 表单值
let form = ref({})
let step = ref('1')
let currentGroupTitle = ref('')

// 初始化工具
const router = useRouter()
const refSelectUser = ref(null)

/**
 * 定义变量
 */
// 弹窗布尔值
const dialogVisible = ref(false)

/**
 * 定义方法
 */
// 打开弹窗
const openOptionGroupDialog = (item) => {
  currentGroupTitle.value = ''
  step.value = '1'

  if (item) {
    console.log('编辑', item)

    // 判断是否有值
    let hasChangeRes = eval(item.group_obj).filter((item) => {
      return item.isChange === true
    })
    // console.log(hasChangeRes)

    form.value = {
      id: item.id,
      groupName: item.groupName,
      isChange: hasChangeRes.length === 0 ? false : true
    }
    console.log(form.value)
  } else {
    form.value.groupName = ''
    form.value.groupObj = []
  }

  dialogVisible.value = true
}
const cancelSubmit = () => {
  if (step.value === '2') {
    step.value = '1'
  } else {
    dialogVisible.value = false
  }
}
const confirmSubmit = () => {
  // 下一步
  if (step.value === '1') {
    if (!form.value.groupName) {
      ElMessage.warning('请填写常用组名称')
    } else {
      step.value = '2'

      // console.log(props.currentGroupStatus)
      if (props.currentGroupStatus === '编辑') {
        console.log(form.value)
        currentGroupTitle.value = `编辑组成员 | ${form.value.groupName}`

        nextTick(() => {
          // console.log(refSelectUser.value)
          refSelectUser.value.renderEditUsers(form.value)
        })
      } else {
        currentGroupTitle.value = '添加组成员'
      }

      // emit('resetTab')
    }
  } else {
    // 确定
    // console.log('confirmSubmit', props.currentGroupStatus)

    form.value.groupObj = []
    let selectedUserData = refSelectUser.value.getSelectedUserData()
    selectedUserData = JSON.parse(JSON.stringify(selectedUserData.value))
    // console.log('selectedUserData', selectedUserData)

    // 常用组子项
    selectedUserData.forEach((item) => {
      form.value.groupObj.push({
        userId: item.id,
        stationId: item.stationId,
        isChange: item.isChange
      })
    })
    // console.log('selectedUserData', form.value)

    if (props.currentGroupStatus === '创建') {
      /* if (res.isError) {
        ElMessage.warning(res.message)
        return
      } */
      http('apiReportGroupPost', form.value).then((res) => {
        if (res.isError) {
          ElMessage.warning(res.message)
          return
        }
        // console.log(res)
        ElMessage.success('添加成功')
        dialogVisible.value = false

        // refSelectUser.value.renderGroups()
        instance?.proxy?.emitter.emit('refreshGroupList')
      })
    } else {
      // apiReportGroupPut
      http('apiReportGroupPut', form.value).then((res) => {
        if (res.isError) {
          ElMessage.warning(res.message)
          return
        }
        // console.log(res)
        ElMessage.success('编辑成功')
        dialogVisible.value = false

        // refSelectUser.value.renderGroups()
        instance?.proxy?.emitter.emit('refreshGroupList')
      })
    }
  }
}

/**
 * 暴露方法
 */
defineExpose({
  openOptionGroupDialog
})
</script>

<style lang="scss" scoped>
.name_wrap {
  width: 80%;
  margin: 0 auto;
  text-align: center;

  ul {
    li {
      list-style: none;

      &.title {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 25px;

        color: #484848;
      }
      &.subtitle {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;

        color: #696969;
      }
      &.input_wrap {
      }
    }
  }
}
</style>
