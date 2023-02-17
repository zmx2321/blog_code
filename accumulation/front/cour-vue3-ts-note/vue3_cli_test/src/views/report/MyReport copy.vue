<template>
  <div>
    <!-- 当我们在template模板中使用ref对象, 它会自动进行解包 -->
    <h2>当前计数: {{ counter }}</h2>
    <button @click="increment">+1</button>
    <br />

    {{ name }} - {{ age }}
    <button @click="changeAge">+age</button>
    <br />

    <h2>{{ fullName }}</h2>
    <button @click="changeName">修改firstName</button>
  </div>
</template>

<script>
import { ref, toRefs, toRef, reactive, computed } from 'vue'

export default {
  props: {
    /* message: {
      type: String,
      default: '',
      required: true
    } */
  },
  setup() {
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

    return {
      // reactive数据
      state,

      // 数据
      counter,
      name,
      age,
      fullName,

      // 方法
      increment,
      changeAge,
      changeName
    }
  }
}
</script>

<style scoped>
</style>