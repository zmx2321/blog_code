<template>
  <div>
    <!-- <p>普通插槽</p> -->
    <div>
      <slot personName="testProp" age="18">插槽默认文本</slot>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>