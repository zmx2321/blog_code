<template>
  <div>111</div>
</template>

<script setup>
// 引入vue3功能模块
import { ref, reactive, computed } from 'vue'
import { http } from '@/api/index.js'

// 需要父组件传进来的内容
const props = defineProps({
  title: {
    // 页面标题
    type: String,
    default: '',
    required: false
  }
})

const initPage = () => {}
initPage()
</script>

<style lang="scss" scoped></style>
