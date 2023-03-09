<template>
  <div class="distribute-modal">
    <el-dialog
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :visible="visible"
      :title="modelTitle"
      width="600px"
      class="dialogModel"
      @close="$emit('closeModal')">
      <div class="tips">
        <span class="start">*</span>
        当前表单支持分发给下属单位填报，请勾选后点击确定，完成分发
      </div>
      <div class="flex mb10 mt20">
        <div class="btn-operation">
          <!-- <el-checkbox v-model="obj.checkAll" @change="changeCheck($event)">全选</el-checkbox> -->
          <!-- <el-checkbox v-model="obj.checkLeaf" @change="changeCheck($event,'Leat')">选中子项</el-checkbox> -->
        </div>
        <el-button @click="returnInfo">&nbsp;撤 回&nbsp;</el-button>
      </div>
      <div class="tree-content">
        <!-- 分发  -第一集是用户当前的公司，不可以选择 -->
        <div class="title">公司</div>
        <el-tree
          :data="dataTree"
          class="tree-style"
          node-key="id"
          ref="tree"
          show-checkbox
          highlight-current
          :props="defaultProps"
          :check-strictly="true"
          @check="getChecked"></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeModal')">取消</el-button>
        <el-button :loading="submitting" type="primary" @click="saveModel()">分发</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
// 引入vue3功能模块
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue'

// 父组件参数
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  modelTitle: {
    type: String,
    default: ''
  },
  winObj: {
    type: Object,
    default: () => {}
  }
})

/**
 * 表单相关
 */
// 初始化表单数据
let dataTree = ref({})
let submitting = ref(false)
let obj = ref({
  checkAll: false,
  checkLeaf: false
})
let defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
})
let personChoseList = ref([])
// 初始化表单数据
const resetFrom = () => {
  // console.log('初始化表单数据')
  dataTree.value = {}
}
</script>

<style lang="less" scoped>
.distribute-modal {
  /deep/.el-dialog__body {
    padding-top: 20px;
  }
  .btn-operation {
    padding-bottom: 10px;
  }
  .tree-content {
    max-height: 460px;
    overflow: hidden;
    overflow-y: auto;
    .title {
      padding: 0 40px;
      height: 40px;
      line-height: 40px;
      background: #f2f2f2;
    }
    .tree-style {
      padding: 10px 20px 0;
    }
  }
}
</style>
