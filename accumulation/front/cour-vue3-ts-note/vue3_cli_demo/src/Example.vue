<template>
  <!-- 计算属性 -->
  <div>{{ bigCount }}</div>

  <!-- 子组件 -->
  <ExampleSub @subClick="subClick"></ExampleSub>

  <!-- Teleport 是一种能够将我们的模板移动到 DOM 中 Vue app 之外的其他位置的技术 -->
  <!-- to 属性就是目标位置 -->
  <div id="content"></div>
  <teleport to="#content">
    <div>我是一个 Toast 文案</div>
  </teleport>
</template>

<script setup>
// 引入子组件
import ExampleSub from './components/ExampleSub.vue'
// 引入 vue 内置方法
import { ref, toRefs, reactive, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import { http } from '@/api/index'

// 计算属性
let count1 = ref(0)
let bigCount = computed(() => {
  return 3 + count1.value
})

// 监听 watch
// 监听多个响应式数据
const count = ref(0)
const count2 = ref(1)
watch([count, count2], ([newCount, newCount2], [oldCount, oldCount2]) => {})
//还有第二种写法
watch([count, count2], (newValue, oldVlaue) => {
  console.log(newValue) //[newCount, newCount2]
  console.log(oldValue) //[oldCount, oldCount2]
})

// 子组件传值点击方法
function subClick(params) {
  console.log(params)
}

// 生命周期
onBeforeMount(() => {
  console.log('组件挂载之前')
})
onMounted(() => {
  console.log('组件挂载完成')
})
onBeforeUpdate(() => {
  console.log('数据更新，虚拟 DOM 打补丁之前')
})
onUpdated(() => {
  console.log('数据更新，虚拟 DOM 渲染完成')
})
onBeforeUnmount(() => {
  console.log('组件销毁之前')
})
onUnmounted(() => {
  console.log('组件销毁之后')
})
</script>
<style lang="scss" scoped></style>
