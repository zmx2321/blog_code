<template>
  <el-dialog class="my_dialog" v-model="dialogVisible" title="合并数据" width="70%" lock-scroll :close-on-click-modal="false">
    <table-page :showForm="false">
      <!-- 表格 -->
      <template #tableContent>
        <el-table
          :data="tableData"
          :border="true"
          show-summary
          height="800"
          :summary-method="getSummaries"
          style="width: 100%"
          :span-method="arraySpanMethod"
          :cell-style="cellStyleMethod">
          <!-- <el-table-column prop="OrgName" label="收集对象" width="180" fixed /> -->
          <el-table-column type="index" width="82" label="序号" fixed min-width="200" />
          <el-table-column prop="orgName" label="填报部门" fixed min-width="200" />
          <el-table-column prop="date" label="统计周期" fixed min-width="200" />
          <el-table-column v-for="val in tableColumn" :prop="val.prop" :label="val.label" min-width="200" />
        </el-table>
        <!-- <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.size"
          background
          layout="sizes, prev, pager, next"
          :page-sizes="[15, 30, 50, 100]"
          :total="totalPage"
          class="fr mt12"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" /> -->
      </template>
    </table-page>

    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="nextSubmit()">下一步</el-button>
      </span>
    </template> -->
    <v-form-designer ref="VFormDesignerRef" class="form"></v-form-designer>
  </el-dialog>
</template>

<script setup>
import { ref, toRefs, toRef, reactive, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
// 组件
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
// 接口
import { http } from '@/api/index.js'
const props = defineProps({
  /* message: {
    type: String,
    default: '',
    required: true
  } */
})
// 表单值
let tableData = ref([])
let tableColumn = ref([])
const VFormDesignerRef = ref(null)

let mergeDate = []
// 初始化工具
const router = useRouter()

/**
 * 定义变量
 */
// 弹窗布尔值
let dialogVisible = ref(false)
let temData = {}
// 处理要合并的数据
let spanNameArr = []
/**
 * 定义方法
 */
// 打开弹窗
const openMergePageDialog = (row) => {
  tableData.value = []
  spanNameArr = []
  tableColumn.value = []
  dialogVisible.value = true

  http('apiGetList', row).then((res) => {
    if (res.isError) {
      ElMessage.warning(res.message)
      return
    }

    VFormDesignerRef.value.setFormJson(JSON.parse(res.formConfig.content))
    nextTick(() => {
      let temColumn = VFormDesignerRef.value.getFieldWidgets()
      temColumn.forEach((item) => {
        if (item.field.formItemFlag === true) {
          tableColumn.value.push({
            prop: item.field.options.name,
            label: item.field.options.label
          })
        }
      })
    })

    tableData.value = res.formListData.map((item) => {
      let temValue = item.formValue ? JSON.parse(item.formValue) : item.formValue
      return {
        ...temValue,
        ...item
      }
    })
    formatData()
  })
}
// 只包含数字或小数点，但不是手机号
function isNumberOrDecimalButNotPhone(str) {
  return /^1[0-9]{10}$/.test(str) === false && /^[\d.]+$/.test(str)
}
function cellStyleMethod({ row, column, rowIndex, columnIndex }) {
  if (row.date === '汇总' || row.name === '汇总计算') {
    if (columnIndex !== 0) {
      return { backgroundColor: 'var(--el-table-row-hover-bg-color)', fontWeight: 500 }
    }
  }
}

function formatData() {
  // tableData 后端获取的数据
  let data = JSON.parse(JSON.stringify(tableData.value))
  let pos = 0
  let temp = {}
  // 循环后端返回的数据
  for (let i = 0; i < data.length; i++) {
    // 构造一个临时数据对象，用于存储每个循环的数据
    temp[data[i].orgName] ? temp[data[i].orgName] : (temp[data[i].orgName] = {})
    // 因为表格的字段是动态生成的，所以要循环每个字段来添加数据，如果是确定某个字段需要汇总，那简单很多
    for (const key in data[i]) {
      // 判断是数字，但不是手机号，可以累加起来
      if (isNumberOrDecimalButNotPhone(data[i][key])) {
        // 判断不是数字的，重置为0
        if (temp[data[i].orgName][key] === undefined || isNaN(temp[data[i].orgName][key])) {
          temp[data[i].orgName][key] = 0
        }
        temp[data[i].orgName][key] += parseFloat(data[i][key])
      } else if (isNumberOrDecimalButNotPhone(temp[data[i].orgName][key])) {
      } else {
        temp[data[i].orgName][key] = '--'
      }
    }

    // 利用 name 公司名字区分，如果新一行的数据跟上一行不同，是需要下一个合并了，此处插入一个汇总
    if (i > 0 && data[i].orgName !== data[i - 1].orgName) {
      let orgName = data[i - 1].orgName
      tableData.value.splice(i + pos, 0, {
        ...temp[orgName],
        date: '汇总',
        orgName
      })
      if (i === data.length - 1) {
        orgName = data[i].orgName
        // 最后一行加个汇总
        tableData.value.push({
          ...temp[orgName],
          date: '汇总',
          orgName
        })
      }
      pos++
    }
  }

  getSpanArr(tableData, spanNameArr, 'orgName')
}

// 处理标记
function getSpanArr(data, tempSpanNameArr, label) {
  let temPos = 0
  // data就是我们从后台拿到的数据
  for (let i = 0; i < data.value.length; i++) {
    if (i === 0) {
      tempSpanNameArr.push(1)
      temPos = 0
    } else {
      // 判断当前元素与上一个元素是否相同，放入上下行是否需要合并的标识
      if (data.value[i][label] === data.value[i - 1][label]) {
        tempSpanNameArr[temPos] += 1
        tempSpanNameArr.push(0)
      } else {
        tempSpanNameArr.push(1)
        temPos = i
      }
    }
  }
}

function arraySpanMethod({ row, column, rowIndex, columnIndex }) {
  if (row.date === '汇总') {
    if (columnIndex === 1) {
      return [0, 0]
    } else if (columnIndex === 2) {
      return [1, 1]
    }
  } else {
    if (columnIndex == 1) {
      const _row = spanNameArr[rowIndex]
      const _col = _row > 0 ? 1 : 0
      return {
        // [0,0] 表示这一行不显示， [2,1]表示行的合并数
        rowspan: _row,
        colspan: _col
      }
    }
  }
}
const getSummaries = (param) => {
  const { columns, data } = param
  let temData = data.filter((item) => item.date === '汇总')
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '汇总计算'
      return
    }
    const values = temData.map((item) => Number(item[column.property]))
    if (!values.every((value) => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          let temValue1 = prev + curr
          let temValue2 = temValue1.toString().match(/^\d+(?:\.\d{0,2})?/)
          return Number(temValue2)
        } else {
          return prev
        }
      }, 0)
      sums[index]
    } else {
      sums[index] = '-,--'
    }
  })
  mergeDate = sums
  return sums
}

/**
 * 暴露方法
 */
defineExpose({
  openMergePageDialog
})
</script>

<style lang="scss" scoped>
.form {
  opacity: 0;
  width: 0 !important;
  height: 0 !important;
}
.form_title {
  margin-left: 50px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}
.dashd {
  width: 800px;
  height: 0px;
  border: 0.5px dashed #d9d9d9;
  margin: 15px auto;
}
:deep .el-table__footer {
  font-weight: 500;
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
