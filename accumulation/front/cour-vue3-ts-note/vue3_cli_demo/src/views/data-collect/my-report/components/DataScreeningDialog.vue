<template>
  <el-dialog v-model="dialogVisible" title="表单设置" width="50%" lock-scroll :close-on-click-modal="false">
    数据总览功能开发中
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="nextSubmit()">下一步</el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script setup>
// vue3工具
import { ref, toRefs, toRef, reactive, computed, defineProps, defineExpose } from 'vue'
import { useRouter } from 'vue-router'

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

/**
 * 定义变量
 */
// 弹窗布尔值
const dialogVisible = ref(false)

/**
 * 定义方法
 */
// 打开弹窗
const openDataScreeningDialog = () => {
  dialogVisible.value = true
}

/**
 * 暴露方法
 */
defineExpose({
  openDataScreeningDialog
})
</script>

<style lang="scss" scoped>
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
