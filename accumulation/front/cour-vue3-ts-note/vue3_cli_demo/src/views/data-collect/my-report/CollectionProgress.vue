<template>
  <section class="my_report">
    <table-page
      :title="'收集进度'"
      :showRightBtn="true"
      :rightBtnMsg="'数据总览'"
      :showBack="true"
      @searchHolder="searchHolder"
      @resetFrom="resetFrom"
      @rightBtnFun1="dataScreeningBtn">
      <!-- 查询表单 -->
      <template #pageSearch="slotProps">
        <page-search :formData="slotProps.formData" :formOptions="formOptions" />
      </template>

      <!-- 右边的按钮一个以上 -->
      <template #rightBtnOther>
        <li class="ml8">
          <el-button @click="batchReturn">批量退回</el-button>
        </li>
      </template>

      <!-- 表格 -->
      <template #tableContent>
        <el-table border stripe :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" tooltip-effect="dark">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="OrgName" label="收集对象" fixed min-width="130" show-overflow-tooltip>
            <template #default="scope">
              <!-- <el-tooltip :content="scope.row.orgName"> -->
              <div @click="reportNameClick(scope.row)" class="text-hidden color-primary pointer">{{ scope.row.orgName }}</div>
              <!-- </el-tooltip> -->
            </template>
          </el-table-column>
          <!-- <el-table-column prop="OrgName" label="收集对象" width="180" fixed /> -->
          <el-table-column prop="submitTime" label="提交时间" min-width="180" />
          <el-table-column prop="orgShortname" label="填报部门" min-width="200" show-overflow-tooltip />
          <el-table-column prop="receiverName" label="填报用户" min-width="90" />
          <el-table-column prop="checkNames" label="审核用户" min-width="100" />
          <el-table-column prop="auditorStatus" label="状态" min-width="110">
            <template #default="scope">
              <i v-if="scope.row.isExpired == 5" class="circle_red"></i>
              <i v-else-if="scope.row.auditorStatus == 0 || scope.row.auditorStatus == 1" class="circle_blue"></i>
              <i v-else-if="scope.row.auditorStatus == 2" class="circle_green"></i>
              <i v-else-if="scope.row.auditorStatus == 3" class="circle_yellow"></i>
              <i v-else-if="scope.row.auditorStatus == 4" class="circle_red"></i>
              <!-- <span v-if="(scope.row.auditorStatus == 1 || scope.row.auditorStatus == 0) && scope.row.isExpired != 5">填写中</span>
              <span v-if="scope.row.auditorStatus == 2">已上报</span>
              <span v-if="scope.row.auditorStatus == 3">审核中</span>
              <span v-if="scope.row.auditorStatus == 4">取消填报</span>
              <span v-if="scope.row.isExpired == 5">已截止</span> -->
              {{ statusTxt(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="170">
            <template #default="slotProps">
              <el-button :disabled="slotProps.row.auditorStatus != 2" link type="primary" @click="sendBack(slotProps.row)">退回重填</el-button>
              <!-- <el-button link type="primary" @click="returnToRefill(slotProps.row)">退回重填</el-button> -->
              <el-button
                :disabled="slotProps.row.auditorStatus == 0 || slotProps.row.auditorStatus == 1"
                link
                type="primary"
                @click="reportNameClick(slotProps.row)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.size"
          background
          layout="sizes,prev, pager, next"
          :page-sizes="[15, 30, 50, 100]"
          :total="totalPage"
          class="fr mt12"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </template>
    </table-page>
    <el-dialog append-to-body title="退回重填" v-model="sendButton" width="30%">
      <el-form>
        <el-form-item label="退回原因">
          <el-input :rows="6" type="textarea" v-model="sendBackRemark" placeholder="请输入退回原因，不超过500字符"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="sendButton = false">取消</el-button>
          <el-button type="primary" @click="sendBackApi()">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 数据总览 -->
    <data-screening-dialog ref="dataScreeningDialogRef" />
    <!-- 收集进度详情 -->
    <collection-detail-dialog ref="collectionDetailDialogRef" />
    <!-- vfrom弹窗 -->
    <VFormRenderForDetailDialog ref="RefVFormRenderForDetailDialog"></VFormRenderForDetailDialog>
  </section>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
// 组件
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
// 弹窗
import SetFormDialog from './components/SetFormDialog.vue' // 创建报表
import DataScreeningDialog from './components/DataScreeningDialog.vue' // 数据汇总
import CollectionDetailDialog from './components/CollectionDetailDialog.vue' // 详情
import VFormRenderForDetailDialog from '@/views/components/VFormRenderForDetailDialog.vue'
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'

// 初始化工具
const route = useRoute()
const router = useRouter()
// 定义子组件实例，名称要和上面的ref相同
const dataScreeningDialogRef = ref(null) // 数据总览
const collectionDetailDialogRef = ref(null) // 收集进度详情
const RefVFormRenderForDetailDialog = ref(null) // 表单设置弹窗

/**
 * 表单相关
 */
// 表单配置
const formOptions = ref([
  {
    label: '收集对象名称',
    prop: 'orgName',
    element: 'el-input',
    show: true
  }
])
// 表单参数
let queryParams = ref({
  page: 1,
  size: 15,
  distributeId: route.query.distribute_id
})
let sendButton = ref(false)
// 表单初始化
const resetFrom = () => {
  queryParams.value = {
    page: 1,
    size: 15,
    distributeId: route.query.distribute_id
  }

  getTableData(setProxy(queryParams.value))
}
// 获取子组件查询方法
const searchHolder = (val) => {
  queryParams.value = setProxy(queryParams.value)

  for (let item in val) {
    console.log(val[item])
    queryParams.value[item] = val[item]
  }

  getTableData(setProxy(queryParams.value))
}

const statusTxt = (row) => {
  if (row.isExpired == 5) {
    return '已截止'
  }
  if (row.auditorStatus == 1 || row.auditorStatus == 0) {
    return '填写中'
  }
  if (row.auditorStatus == 2) {
    return '已上报'
  }
  if (row.auditorStatus == 3) {
    return '审核中'
  }
  if (row.auditorStatus == 4) {
    return '取消填报'
  }
}
// 数据总览
const dataScreeningBtn = () => {
  if (isShowData.includes(0) || isShowData.includes(1) || isShowData.includes(3) || isShowData.includes(4) || isShowData.includes(5)) {
    ElMessage.warning('仅支持选择已上报的数据')
    return
  }

  // console.log('数据总览', changArr.value.formDataIdList)
  if (JSON.stringify(changArr.value.formDataIdList) === '[]') {
    ElMessage.warning('至少选择一项')
    return
  }
  // TODO: Ref + 操作
  // dataScreeningDialogRef.value.openDataScreeningDialog()

  // http('apiGetListData', changArr.value).then((res) => {
  //   console.log(res)
  //   dataScreeningDialogRef.value.openDataScreeningDialog(res)
  // })
  if (changArr.value.formDataIdList) {
    dataScreeningDialogRef.value.openDataScreeningDialog(changArr.value)
  } else {
    ElMessage.warning('请选择要合并的数据')
  }
}
// 批量退回
const batchReturn = () => {
  // console.log('批量退回', JSON.stringify(changArr.value))
  if (isShowData.includes(0) || isShowData.includes(1) || isShowData.includes(3) || isShowData.includes(4) || isShowData.includes(5)) {
    ElMessage.warning('仅支持选择已上报的数据')
    return
  }

  if (JSON.stringify(changArr.value) !== '{}' && changArr.value.formDataIdList.length > 0) {
    http('apiSendBackFormData', { formDataIdList: changArr.value.formDataIdList, distributeId: route.query.distribute_id }).then((res) => {
      // console.log('退回成功')
      ElMessage.success(res)
      initPage()
    })
  } else {
    ElMessage.warning('请选择要退回的报表')
  }
}
let backTemp = {}
let sendBackRemark = ref('')
const sendBack = (row) => {
  sendButton.value = true
  backTemp = row
}
const sendBackApi = () => {
  http('apiSendBackFormData', {
    formDataIdList: [backTemp.formDataId],
    distributeId: route.query.distribute_id,
    auditRemark: sendBackRemark.value
  }).then((res) => {
    ElMessage.success('表单数据退回成功')
    sendButton.value = false
    initPage()
  })
}
/**
 * 表格相关
 */
// 点击表单详情
const reportNameClick = (row) => {
  console.log(row)
  row.reportName = row.title
  RefVFormRenderForDetailDialog.value.show(row)
}
// 初始化表格数据
let tableData = ref([])
let totalPage = ref(0)
let changArr = ref({
  formDataIdList: [],
  formId: ''
})
let isShowData = []
// 获取表格数据
const getTableData = (params) => {
  /* tableData.value = [
    {
      reportName: '11'
    }
  ] */
  const query = {
    ...params,
    page: params.page - 1
  }
  http('getCollectionProgressList', query).then((res) => {
    /* tableData.value = res
    totalPage.value = res.length */
    tableData.value = res.content
    totalPage.value = res.totalElements
  })
}
const handleSizeChange = (val) => {
  queryParams.value.size = val
  getTableData(setProxy(queryParams.value))
}
const handleCurrentChange = (val) => {
  // console.log(val)
  queryParams.value.page = val
  getTableData(setProxy(queryParams.value))
}

const handleSelectionChange = (val) => {
  changArr.value = {
    formDataIdList: [],
    formId: ''
    // isShowData: []
  }
  isShowData = []
  // console.log(val, 'val')
  if (val.length > 0) {
    val.forEach((item) => {
      changArr.value.formDataIdList.push(item.formDataId)
      // changArr.value.isShowData.push(item.auditorStatus)
      isShowData.push(item.auditorStatus)
    })
    changArr.value.formId = val[0].formId
  }

  console.log('多选', changArr.value)
}
// 退回重填
const returnToRefill = (row) => {
  // console.log('退回重填', row)

  // 信息提示窗
  openInfo('确定将此表单退回重填？。', () => {
    console.log('撤回操作', row)

    http('apiSendBackFormData', { formDataIdList: [row.formDataId] }).then((res) => {
      console.log('退回成功')
      initPage()
    })
  })
}
// 查看详情
const showDetail = (row) => {
  // console.log('查看详情', row)

  collectionDetailDialogRef.value.openCollectionDetailDialog()

  /* router.push({
    path: '/collect/my-report/my-report-detail',
    query: {
      row: JSON.stringify(row)
    }
  }) */
}

/**
 * 初始化
 */
const initPage = () => {
  localStorage.removeItem('formDataId')
  changArr.value = {}
  // queryParams.value.distributeId = route.query.distribute_id
  getTableData(setProxy(queryParams.value))
}
initPage()
</script>

<style lang="scss" scoped></style>
