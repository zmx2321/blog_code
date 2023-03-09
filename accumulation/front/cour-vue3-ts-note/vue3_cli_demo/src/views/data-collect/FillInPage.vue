<template>
  <section class="top_title" v-if="formDataDto.auditorStatus === 1">
    <p class="title_status">表单被退回</p>
    <div class="top_hr"></div>
    <div class="title_info">
      <div class="info_bas">
        <div style="margin-right: 350px">审核人：{{ formDataDto.checkNames || '无' }}</div>
        <div>退回时间：{{ formDataDto.time || '无' }}</div>
      </div>
      <div class="info_audit">
        <div class="audit_left">退回原因：</div>
        <div class="audit_right">
          {{ formDataDto.auditRemark }}
          <!-- 公司营收数据必填，请填写后重新提交。若有疑问请联系李四19999999999：公司营收数据必填，请填写后重新提交。若有疑问请联系李四19999999999：公司营收数据必填，请填写后重新提交。若有疑问请联系李四19999999999：公司营收数据必填，请填写后重新提交。若有疑问请联系李四19999999999 -->
        </div>
      </div>
    </div>
  </section>
  <section class="report_form">
    <div class="report_info">
      <div>收集单位：{{ formDataDto.orgName || '无' }}</div>
      <div>收集用户：{{ formDataDto.receiverName || '无' }}</div>
      <div>下发时间：{{ formDataDto.distributeTime || '无' }}</div>
      <div>截止日期：{{ formDataDto.endTime || '无' }}</div>
    </div>

    <v-form-render :option-data="{}" ref="vFormRenderRef"></v-form-render>

    <div class="handler pb24 mt32">
      <el-button @click="cancelClick">取消</el-button>
      <el-button @click="submitClick" type="primary" plain>保存</el-button>
      <el-button type="primary" @click="submitClick('submit')">{{ reportDto.audit === 0 ? '立即提交' : '提交审核' }}</el-button>
      <!-- <el-button type="primary" @click="dialogVisible = true">选择审核人</el-button> -->
      <el-dialog v-model="dialogVisible" title="选择审核人" width="50%" lock-scroll :close-on-click-modal="false">
        <select-company-user ref="SelectCompanyUserRef" @setCollectObjList="setCollectObjList" :distributeStatus="'2'" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmSubmit()">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </section>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, defineProps, onMounted, nextTick, defineExpose } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 表格页面公共页面
import TablePage from '@/components/global/tablePage/index.vue'
import PageSearch from '@/components/global/PageSearch/index.vue'
import SelectCompanyUser from '@/components/global/SelectCompanyUser.vue'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
// 引入工具库
import { openInfo, deepClone, setProxy } from '@/utils/tools'
// 接口
import { http } from '@/api/index.js'
// 初始化工具
const route = useRoute()
const router = useRouter()
const vFormRenderRef = ref(null)
const props = defineProps({
  /* message: {
    type: String,
    default: '',
    required: true
  } */
})
// 定义子组件实例，名称要和上面的ref相同
const SelectCompanyUserRef = ref(null)
/**
 * 定义方法
 */
const dialogVisible = ref(false) // 弹窗布尔值
const setCollectObjList = (val) => {
  formDataDto.value.checkIds = setProxy(val[0])
  console.log(formDataDto.value.checkIds, '@@')
}

const confirmSubmit = () => {
  temp = {
    ...temp,
    checkIds: formDataDto.value.checkIds
  }
  http('apiSubmitFormData', temp).then((res) => {
    ElMessage.success('提交成功')
    instance?.proxy?.emitter.emit('refreshNeedFilledTable')
    router.back()
  })
  dialogVisible.value = false
}
/**
 * 初始化
 */
let formDataDto = ref({})
let reportDto = ref({})
let temp = ref({})
// 取消点击
const cancelClick = () => {
  router.back()
}
const submitHolder = (type, next) => {
  vFormRenderRef.value
    .getFormData()
    .then((json) => {
      console.log(json)
      let params = {
        formValue: JSON.stringify(json),
        formDataId: formDataDto.value.formDataId
      }
      let apiName = type === 'submit' ? 'apiSubmitFormData' : 'apiFormData'
      if (type === 'submit') {
        params = {
          ...formDataDto.value,
          ...params
        }
        temp = { ...params }
        dialogVisible.value = true
      } else {
        // 提交保存
        http(apiName, params).then((res) => {
          ElMessage.success('保存成功')
          router.back()
        })
      }
      // // 提交
      // http(apiName, params).then((res) => {
      //   ElMessage.success('保存成功')
      //   router.back()
      // })
    })
    .catch((error) => {
      console.log(error)
      // Form Validation failed
    })
}
// 保存 JSON
const submitClick = (type, next) => {
  submitHolder(type, next)
  vFormRenderRef.value
    .getFormData()
    .then((json) => {
      console.log(json)
      let params = {
        formValue: JSON.stringify(json),
        formDataId: formDataDto.value.formDataId
      }
      let apiName = type === 'submit' ? 'apiSubmitFormData' : 'apiFormData'
      if (type === 'submit') {
        params = {
          ...formDataDto.value,
          ...params
        }

        dialogVisible.value = true
      } else {
        // 提交
        http(apiName, params).then((res) => {
          ElMessage.success('保存成功')
          router.back()
        })
      }
      // // 提交
      // http(apiName, params).then((res) => {
      //   ElMessage.success('保存成功')
      //   router.back()
      // })
    })
    .catch((error) => {
      console.log(error)
      // Form Validation failed
    })
}
// 初始化请求数据
const initPage = () => {
  http('detail', { formDataId: route.query.formDataId }).then((res) => {
    formDataDto.value = res.formDataDto
    reportDto.value = res.reportDto
    vFormRenderRef.value.setFormJson(JSON.parse(res.formConfigDto.content))
    if (formDataDto.value.formValue) {
      nextTick(() => {
        vFormRenderRef.value.setFormData(JSON.parse(formDataDto.value.formValue))
      })
    }
  })
}
onMounted(() => {
  initPage()
})
</script>

<style lang="scss" scoped>
// .handler {
//   background-color: #fff;
//   left: 0;
//   bottom: 0;
//   padding: 20px auto;
// }
.top_title {
  width: 1558px;
  background: #ffffcb;
  padding: 25px;
  .top_hr {
    width: 1492px;
    height: 0px;
    border: 0.5px solid #d9d9d9;
  }
  .title_status {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #4a4a4a;
    margin-bottom: 14px;
  }
  .title_info {
    margin-top: 20px;
    .info_bas {
      display: flex;
      margin-bottom: 20px;
    }
    .info_audit {
      display: flex;
      .audit_left {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #4a4a4a;
      }
      .audit_right {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #d02c36;
      }
    }
  }
}
.report_form {
  width: 1558px;
  height: 500px;
  padding: 25px;
  // background-color: #ff0;
  .report_info {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    div {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-align: right;
      color: #4a4a4a;
      margin-right: 35px;
    }
  }
}
</style>
