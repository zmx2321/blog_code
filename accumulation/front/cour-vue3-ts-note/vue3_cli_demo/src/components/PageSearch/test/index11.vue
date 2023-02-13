<template>
  <div class="search-form-box">
    <el-form :model="formData"
             ref="formRef"
             :inline="true"
             class="f-wrap">
      <template v-for="(item, index) in formOptions">
        <el-form-item :key="index"
                      :prop="item.prop"
                      :label="item.label ? (item.label) : ''"
                      :rules="item.rules"
                      v-if="isShow(item.show)">
          <!-- slot 添加自定义配置项 -->
          <slot v-if="item.slot"
                :name="item.slot"></slot>
          <form-item v-else
                     v-model="formData[item.prop]"
                     :itemOptions="item" />

        </el-form-item>
      </template>

      <div class="btn-box mb16">
        <el-button v-if="btnItems.includes('search')"
                   class="secondary-btn"
                   @click="onSearch">搜索</el-button>
        <el-button v-if="btnItems.includes('inquire')"
                   class="secondary-btn"
                   @click="onInquire">查询</el-button>
        <el-button v-if="btnItems.includes('export')"
                   class="secondary-btn"
                   @click="onExport">导出</el-button>
        <el-button v-if="btnItems.includes('reset')"
                   class="plain-btn"
                   @click="onReset">重置</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import formItem from './FormItem'

export default {
  props: {
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
      default () {
        return []
      }
    },
    // 提交按钮项，多个用逗号分隔（search, export, reset）
    btnItems: {
      type: String,
      default () {
        return ''
      }
    }
  },

  data () {
    return {
      formData: {}
    }
  },

  watch: {
    formOptions (newVal, oldVal) {
      newVal.forEach(res => {
        if (res.value !== undefined) {
          this.formData[res.prop] = res.value
        }
      })
    }
  },

  computed: {
    isShow () {
      return function (val) {
        return val !== undefined ? val : true
      }
    }

  },

  created () {
    this.addInitValue()
  },

  methods: {
    // 搜索
    onSearch () {
      this.$emit('onSearch', this.formData)
    },
    // 查询
    onInquire () {
      this.$emit('onInquire', this.formData)
    },
    // 导出
    onExport () {
      this.$emit('onExport', this.formData)
    },
    onReset () {
      this.$emit('onReset')
      this.addInitValue()
      // this.$refs.formRef.resetFields()
    },
    // 添加初始值
    addInitValue () {
      const obj = {}
      this.formOptions.forEach(v => {
        if (v.value !== undefined) {
          obj[v.prop] = v.value
        }
      })
      this.formData = obj
    }
  },
  components: { formItem }
}
</script>

<style lang='scss' scoped>
.search-form-box {
  /deep/ .el-form {
    .el-form-item {
      display: inline-block;
      margin-right: 24px !important;
      margin-bottom: 16px;
    }
  }
}
</style>
