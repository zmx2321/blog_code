<template>
  <el-scrollbar class="main-content">
    <router-view></router-view>
  </el-scrollbar>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue'
</script>
<style lang="scss" scoped>
.main-content {
  height: calc(100vh - 60px - 40px);
}
</style>
