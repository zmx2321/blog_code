<template>
  <div>
    <!-- <p>具名插槽</p> -->
    <div>
      <!-- 不写默认名称为default -->
      <slot></slot>
      <slot name="jmch1">具名插槽默认文本1</slot>
      <slot name="jmch2" message="具名插槽2传的参数">具名插槽默认文本2</slot>
      <slot name="jmch3">具名插槽默认文本3</slot>

      <!-- 封装高阶组件可能会用到 -->
      <slot :name="name"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String
    }
  }
</script>

<style scoped>

</style>