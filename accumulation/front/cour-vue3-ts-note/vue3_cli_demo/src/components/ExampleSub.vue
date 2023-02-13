<template>
  <el-button @click="onEmitChange">父子组件传值</el-button>
</template>
<script setup>
const emit = defineEmits(['subClick'])
function onEmitChange() {
  emit('subClick', '子组件传值过来了')
}
</script>
<style lang="scss" scoped></style>
