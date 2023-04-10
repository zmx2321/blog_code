<template>
  <section class="form-item">
    aaaa{{ itemOptions }}
    <el-form-item :label="itemOptions.label" v-if="itemOptions.element === 'el-input'">
      <el-input />
    </el-form-item>
    <!-- <el-form-item label="Activity name">
      <el-input v-model="pageSearchData.title" />
    </el-form-item> -->
    <!-- <el-input v-if="isInput" v-model="currentVal" v-bind="bindProps" v-on="bindEvents">
      <i
        v-if="isShowIcon"
        :slot="itemOptions.icon"
        :class="itemOptions.iconClass"
        @click="
          () => {
            itemOptions.iconClick && itemOptions.iconClick(currentVal)
          }
        "></i>
    </el-input> -->
  </section>
</template>

<script setup>
import { ref, toRefs, toRef, reactive, computed } from 'vue'

const props = defineProps({
  itemOptions: {
    type: Object,
    default: () => {}
  }
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
