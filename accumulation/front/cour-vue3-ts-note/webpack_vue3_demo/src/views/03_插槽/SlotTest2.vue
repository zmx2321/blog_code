<template>
  <div>
    <!-- <p>具名插槽</p> -->
    <div>
      <slot name="jmch1">具名插槽默认文本1</slot>
      <slot name="jmch2" message="具名插槽2传的参数">具名插槽默认文本2</slot>
      <slot name="jmch3">具名插槽默认文本3</slot>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>