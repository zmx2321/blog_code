<template>
  <el-dialog class="my_dialog" v-model="dialogVisible" title="补发" width="50%" lock-scroll :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="formRef" label-position="left">
      <!-- <el-form-item label="分发类型" class="distributeStatus_body" prop="collectObjType">
        <div class="dis_box">
          <div class="dis_inbox ml4">
            <input type="radio" id="dingshi" value="1" v-model="form.collectObjType" />
            <label for="dingshi" class="dis_inbox_title ml4">定时发放</label>
            <div class="dis_inbox_text">
              支持按照配置的内容定时下发到指定对象，创建后无法编辑表单内容，一般适用于内容已固化的收集表单。支持单张报表/多报表数据汇总。
            </div>
          </div>
          <div class="dis_inbox ml4">
            <input type="radio" id="rengong" value="2" v-model="form.collectObjType" />
            <label for="rengong" class="dis_inbox_title ml4">人工发放</label>
            <div class="dis_inbox_text">在配置分发对象时需要选定机构和接收用户。支持数据按照组织机构汇总。</div>
          </div>
        </div>
      </el-form-item> -->
      <!-- <el-form-item label="收集对象" class="distributeStatus_body" prop="collectObjType">
        <div class="dis_box">
          <div class="dis_inbox ml4">
            <input type="radio" id="zuzhi" value="1" disabled v-model="form.collectObjType" />
            <label for="zuzhi" class="dis_inbox_title ml4">组织机构</label>
            <div class="dis_inbox_text">在配置分发对象时需要选定机构和接收用户。支持数据按照组织机构汇总。</div>
          </div>
          <div class="dis_inbox ml4">
            <input type="radio" id="renyuan" value="2" v-model="form.collectObjType" />
            <label for="renyuan" class="dis_inbox_title ml4">人员</label>
            <div class="dis_inbox_text">在配置分发对象时只需选定接收用户。</div>
          </div>
        </div>
      </el-form-item> -->

      <div class="form_title">收集对象配置</div>
      <div class="dashd"></div>
      <!-- 补发弹窗 -->
      <!-- <select-company-user ref="SelectCompanyUserRef" @setCollectObjList="setCollectObjList" :distributeStatus="'2'" /> -->
      <select-user ref="refSelectUser" />
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSubmit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// vue3工具
import { ref, toRefs, toRef, reactive, computed, getCurrentInstance, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 组件
import SelectCompanyUser from '@/components/global/SelectCompanyUser.vue'
// 接口
import { http } from '@/api/index.js'
// 引入工具库
import { setProxy } from '@/utils/tools'

const instance = getCurrentInstance()
// 定义子组件实例，名称要和上面的ref相同
const SelectCompanyUserRef = ref(null)
const refSelectUser = ref(null)

const props = defineProps({
  /* message: {
    type: String,
    default: '',
    required: true
  } */
})
// 表单值
let form = ref({})

// 初始化工具
const router = useRouter()

// 表单校验规则
const rules = reactive({
  collectObjType: [{ required: true, message: '请选择分发类型', trigger: 'blur' }]
})

/**
 * 定义变量
 */
// 弹窗布尔值
const dialogVisible = ref(false)

/**
 * 定义方法
 */
// 打开弹窗
const openSupplyAgainDialogRefDialog = (row) => {
  console.log('补发', row)
  dialogVisible.value = true

  http('queryByReportId', { reportId: row.report_id }).then((res) => {
    console.log(res.reportScheduleDto.collectObj)
    // apiReportGroupFindByIds
    http('apiReportGroupFindByIds', { ids: res.reportScheduleDto.collectObj }).then((resUser) => {
      // console.log(resUser)
      resUser.forEach((item) => {
        item.label = item.username
      })
      nextTick(() => {
        refSelectUser.value.setDefaultUser(resUser)
      })
    })
  })

  form.value = {
    distributeId: row.distribute_id,
    collectObjType: row.collectObjType == null ? '2' : row.collectObjType, // 收集对象类型1, "组织"  2, "个人" - 必填  树只选人
    collectObj: row.collectObj == null ? [] : row.collectObj // 人
  }
}
const setCollectObjList = (val) => {
  form.value.collectObj = setProxy(val)
}
const confirmSubmit = () => {
  // form.value.collectObj = [20001044, 20015064]
  // console.log('提交', setProxy(form.value))
  if (refSelectUser.value) {
    // 获取选择用户
    form.value.collectObj = []
    let selectedUserData = refSelectUser.value.getSelectedUserData()
    selectedUserData = JSON.parse(JSON.stringify(selectedUserData.value))
    // console.log('submit', selectedUserData)

    selectedUserData.forEach((item) => {
      form.value.collectObj.push(item.id)
    })
  }
  // console.log(form.value)

  http('setSupplyAgain', setProxy(form.value)).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }
    ElMessage.success('操作成功')

    dialogVisible.value = false

    instance?.proxy?.emitter.emit('refreshDistributionRecordTable')
  })
}

/**
 * 暴露方法
 */
defineExpose({
  openSupplyAgainDialogRefDialog
})
</script>

<style lang="scss" scoped>
.form_title {
  // margin-left: 50px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}
.dashd {
  // width: 800px;
  height: 0px;
  border: 0.5px dashed #d9d9d9;
  margin: 15px auto;
}
.dis_box {
  .dis_inbox {
    .dis_inbox_title {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    .dis_inbox_text {
      width: 440px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      margin-left: 20px;
    }
  }
}
</style>
