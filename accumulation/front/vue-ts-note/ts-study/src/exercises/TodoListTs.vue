<script setup lang="ts">
/**
 * Step2 练习：用 TS 写一个 TodoList 组件
 *
 * 要求（建议先自己实现，再看下面提示）：
 * 1. 使用 <script setup lang="ts">
 * 2. 定义 Todo 类型
 * 3. 使用 ref / reactive 管理输入框和 todos 列表
 * 4. 实现新增、切换完成、删除
 */

// TODO 1：定义 Todo 类型
// 字段：
// - id: number
// - title: string
// - done: boolean
type Todo = {
  id: number,
  title: string,
  done: boolean
}

// TODO 2：定义状态
// 建议：
// - newTitle: Ref<string>
// - todos: Ref<Todo[]>
// 或者用 reactive 包一整个对象也可以

const newTitle = ref<string>("")
const todos = ref<Todo[]>([])

// TODO 3：实现 addTodo 函数
// - 从 newTitle 中读取文本
// - 去掉前后空格，若为空则 return
// - 向 todos 中 push 一个新的 Todo
// - 最后清空输入框
function addTodo() {
  // 在这里实现
  const title = newTitle.value.trim()
  if (!title) return
  todos.value.push({
    id: Date.now(),
    title,
    done: false
  })
  newTitle.value = ""
}

// TODO 4：实现 toggleTodo 函数
// - 参数 id: number
// - 找到对应 todo，切换 done 状态
function toggleTodo(id: number) {
  // 在这里实现
  const todo = todos.value.find(t => t.id === id)
  if (!todo) return
  todo.done = !todo.done
}

// TODO 5（可选）：实现 removeTodo 函数
// - 参数 id: number
// - 从列表中删除对应项
function removeTodo(id: number) {
  // 在这里实现
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<template>
  <section>
    <h2>Step2 练习：TodoListTs.vue</h2>
    <p class="tip">
      打开本文件 <code>TodoListTs.vue</code>，按照上面的 TODO 自己实现一个带类型的 TodoList 组件。
      你可以参考 <code>Step2VueTsBasics.vue</code> 中的示例实现。
    </p>

    <p class="tip">
      建议你先只关心「写出能跑的 JS 逻辑」，然后再为变量和函数参数一点点补充合适的 TS 类型。
    </p>

    <p class="tip">
      做完之后，如果你愿意，可以把这个文件贴给我，我来帮你：
      <br />
      - 看看类型有没有可以简化 / 优化的地方
      <br />
      - 建议一些更贴近日常项目的写法
    </p>
  </section>
</template>

<style scoped>
section {
  border-bottom: 1px dashed rgba(148, 163, 184, 0.4);
  padding-bottom: 12px;
  margin-bottom: 12px;
}

h2 {
  font-size: 15px;
  margin-bottom: 6px;
}

.tip {
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 4px;
}
</style>

