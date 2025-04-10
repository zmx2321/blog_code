<template>
  <div class="form-item">
    <el-input v-if="isInput" v-model="currentVal" v-bind="bindProps" v-on="bindEvents">
      <i
        v-if="isShowIcon"
        :slot="itemOptions.icon"
        :class="itemOptions.iconClass"
        @click="
          () => {
            itemOptions.iconClick && itemOptions.iconClick(currentVal)
          }
        "></i>
    </el-input>
    <el-input-number
      v-if="isInputNumber"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      :controls-position="itemOptions['controls-position'] || 'right'"></el-input-number>
    <el-autocomplete v-if="isAutocomplete" v-model="currentVal" v-bind="bindProps" v-on="bindEvents"></el-autocomplete>

    <el-select
      v-if="isSelectAndSearch"
      filterable
      remote
      reserve-keyword
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      :remoteMethod="itemOptions.remoteMethod">
      <el-option v-for="item in itemOptions.options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>

    <el-select v-if="isSelect" v-model="currentVal" v-bind="bindProps" v-on="bindEvents">
      <el-option v-for="item in itemOptions.options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>

    <!-- datetimerange/daterange -->
    <el-date-picker
      v-if="isDatePickerDateRange"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      :type="itemOptions.type || 'datetimerange'"
      :picker-options="itemOptions.pickerOption ? pickerOptionsRange : null"
      start-placeholder="开始日期"
      range-separator="至"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']"
      :value-format="itemOptions.valueFormat"></el-date-picker>

    <!-- monthrange -->
    <el-date-picker
      v-if="isDatePickerMonthRange"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      type="monthrange"
      :picker-options="pickerOptionsRangeMonth"
      start-placeholder="开始日期"
      range-separator="至"
      end-placeholder="结束日期"
      value-format="yyyy-MM"></el-date-picker>

    <!-- others -->
    <el-date-picker
      v-if="isDatePickerOthers"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      :type="itemOptions.type"
      placeholder="请选择日期"></el-date-picker>

    <el-cascader v-if="isCascader" v-model="currentVal" v-bind="bindProps" v-on="bindEvents"></el-cascader>
  </div>
</template>

<script>
import { pickerOptionsRange, pickerOptionsRangeMonth } from '@u/date'

export default {
  inheritAttrs: false,

  props: {
    value: {},
    itemOptions: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      pickerOptionsRange: pickerOptionsRange,
      pickerOptionsRangeMonth: pickerOptionsRangeMonth
    }
  },

  computed: {
    // 双向绑定数据值
    currentVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    // 绑定属性
    bindProps() {
      const obj = { ...this.itemOptions }
      // 移除冗余属性
      delete obj.label
      delete obj.prop
      delete obj.element
      delete obj.initValue
      delete obj.rules
      delete obj.events
      if (obj.element === 'el-select') {
        delete obj.options
      }
      if (!obj.style) {
        obj.style = 'width: 240px;'
      }
      return obj
    },
    // 绑定方法
    bindEvents() {
      return this.itemOptions.events || {}
    },
    // 是否显示icon
    isShowIcon() {
      return this.itemOptions.icon
    },
    // el-input
    isInput() {
      return this.itemOptions.element === 'el-input'
    },
    // el-autocomplete
    isAutocomplete() {
      return this.itemOptions.element === 'el-autocomplete'
    },
    // el-input-number
    isInputNumber() {
      return this.itemOptions.element === 'el-input-number'
    },
    // el-select
    isSelectAndSearch() {
      return this.itemOptions.element === 'el-select-search'
    },
    isSelect() {
      return this.itemOptions.element === 'el-select'
    },
    // el-date-picker (type: datetimerange/daterange)
    isDatePickerDateRange() {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      const isDateRange = !this.itemOptions.type || this.itemOptions.type === 'datetimerange' || this.itemOptions.type === 'daterange'
      return isDatePicker && isDateRange
    },
    // el-date-picker (type: monthrange)
    isDatePickerMonthRange() {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      const isMonthRange = this.itemOptions.type === 'monthrange'
      return isDatePicker && isMonthRange
    },
    //  el-date-picker (type: other)
    isDatePickerOthers() {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      return isDatePicker && !this.isDatePickerDateRange && !this.isDatePickerMonthRange
    },
    // el-cascader
    isCascader() {
      return this.itemOptions.element === 'el-cascader'
    }
  },

  created() {},

  methods: {},

  components: {}
}
</script>

<style lang='scss' scoped>
.el-cascader {
  width: 100%;
}
</style>
