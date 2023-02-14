<template>
  <section class="tset">
    <FormItem>
      test slot
    </FormItem>
  </section>

  <el-button @click="test">test</el-button>

  <!-- <el-form>
    <div class="btn-box mb16">
      <el-button @click="test">test</el-button>
      <el-button
          v-if="btnItems.includes('search')"
          class="secondary-btn"
          @click="onSearch"
          >搜索</el-button
        >
        <el-button
          v-if="btnItems.includes('inquire')"
          class="secondary-btn"
          @click="onInquire"
          >查询</el-button
        >
        <el-button
          v-if="btnItems.includes('export')"
          class="secondary-btn"
          @click="onExport"
          >导出</el-button
        >
        <el-button
          v-if="btnItems.includes('reset')"
          class="plain-btn"
          @click="onReset"
          >重置</el-button
        >
    </div>
  </el-form> -->
</template>

<script>
import FormItem from './FormItem.vue'

export default {
  components: {
    FormItem
  },

  props: {},

  // inject: ['name', 'age', 'length'],

  watch: {},

  computed: {},

  created() {},

  data() {
    return {}
  },

  methods: {
    test() {
      console.log('test')
      this.$emitter.emit('why', { name: 'why', age: 18 })
    }
  }
}
</script>

<style lang="scss" scoped>
.tset {
}
</style>
