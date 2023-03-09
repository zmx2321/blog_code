<template>
  <el-pagination
    v-model:current-page="queryParams.page"
    v-model:page-size="queryParams.size"
    background
    layout="prev, pager, next"
    :page-sizes="[100, 200, 300, 400]"
    :total="totalPage"
    class="fr mt12"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>

<script setup>
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue'

const props = defineProps({
  /* message: {
    type: String,
    default: '',
    required: true
  } */
})

// counter编程一个ref的可响应式的引用
// counter = 100;
let counter = ref(100)
const firstName = ref('Kobe')
const lastName = ref('Bryant')

// 响应式数据
const state = reactive({})
const info = reactive({ name: 'why', age: 18 })
// let { name, age } = toRefs(info)  // 对所有属性转换成响应式
let { name } = info
let age = toRef(info, 'age') // 对一个属性转换成响应式

// 计算属性 - 数据需要响应式
// const fullName = computed(() => firstName.value + ' ' + lastName.value)  // 只读,需要重写set方法
const fullName = computed({
  get: () => firstName.value + ' ' + lastName.value,
  set(newValue) {
    const names = newValue.split(' ')
    firstName.value = names[0]
    lastName.value = names[1]
  }
})

// 局部函数
const increment = () => {
  counter.value++
  console.log(counter.value)
}
const changeAge = () => {
  age.value++
  // info.age++
  console.log(age.value)
}
const changeName = () => {
  // firstName.value = "James"
  fullName.value = 'test ddd'
}
</script>

<style lang="scss" scoped></style>
