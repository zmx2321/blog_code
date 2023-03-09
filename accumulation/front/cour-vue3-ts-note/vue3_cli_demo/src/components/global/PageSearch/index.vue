<template>
  <section class="form_wrap">
    <el-form :model="formData" label-width="120px" inline>
      <template v-for="(item, index) in formOptions">
        <!-- 输入框 -->
        <el-form-item :key="index" :prop="item.prop" :label="item.label ? item.label : ''" v-if="item.element === 'el-input'" label-width="auto">
          <el-input v-model="formData[item.prop]" :placeholder="`请输入${item.label}`" clearable />
        </el-form-item>

        <!-- 时间选择器 -->
        <el-form-item
          :key="index"
          :prop="item.prop"
          :label="item.label ? item.label : ''"
          v-if="item.element === 'el-date-picker'"
          label-width="auto">
          <el-date-picker
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="formData[item.prop]"
            :placeholder="`请选择${item.label}`"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>

        <!-- 选择框 -->
        <el-form-item :key="index" :prop="item.prop" :label="item.label ? item.label : ''" v-if="item.element === 'el-select'" label-width="auto">
          <el-select v-model="formData[item.prop]" :placeholder="`请选择${item.label}`" clearable>
            <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
  </section>
</template>

<script setup>
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue'
import FormItem from './FormItem.vue'

const props = defineProps({
  formData: {
    type: Object,
    default: () => {}
  },
  /**
   * 表单配置
   * 示例：
   * [{
   *   label: '用户名', // label文字
   *   prop: 'username', // 字段名
   *   element: 'el-input', // 指定elementui组件
   *   pickerOption: true, // 日期选择是否显示快捷选项
   *   valueFormat: 'yyyy-MM-dd' // 日期格式
   *   initValue: '阿黄', // 字段初始值
   *   placeholder: '请输入用户名', // elementui组件属性
   *   rules: [{ required: true, message: '必填项', trigger: 'blur' }], // elementui组件属性
   *   events: { // elementui组件方法
   *     input (val) {
   *       console.log(val)
   *     },
   *     ...... // 可添加任意elementui组件支持的方法
   *   }
   *   ...... // 可添加任意elementui组件支持的属性
   * }]
   */
  formOptions: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.form_wrap {
  // width: 80%;
  // flex: 1;
  // overflow: hidden;
  .el-form {
    .el-form-item {
      // margin-right: 0;

      .el-input,
      .el-select {
        width: 150px;
      }
    }
  }
}
</style>
