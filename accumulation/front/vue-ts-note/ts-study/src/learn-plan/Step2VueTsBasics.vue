<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

type Todo = {
  id: number
  title: string
  done: boolean
}

const state = reactive({
  todos: [
    { id: 1, title: '看完 Step1 基础 TS', done: true },
    { id: 2, title: '在 Vue 中写一个 TS 组件', done: false },
  ] as Todo[],
  filter: 'all' as 'all' | 'active' | 'done',
})

const newTitle = ref<string>('')

const filteredTodos = computed<Todo[]>(() => {
  if (state.filter === 'active') return state.todos.filter(t => !t.done)
  if (state.filter === 'done') return state.todos.filter(t => t.done)
  return state.todos
})

function addTodo(): void {
  const title = newTitle.value.trim()
  if (!title) return
  state.todos.push({
    id: Date.now(),
    title,
    done: false,
  })
  newTitle.value = ''
}

function toggleTodo(id: number): void {
  const todo = state.todos.find(t => t.id === id)
  if (!todo) return
  todo.done = !todo.done
}

watch(
  () => state.todos.map(t => t.done),
  () => {
    // 这里只是示例：类型推断为 boolean[]
  },
)
</script>

<template>
  <section class="block">
    <h2>Step2：在 Vue3 组件里写 TS</h2>
    <p class="intro">
      这一节开始把 TS 真正用到 Vue3 组件中，重点感受：<code>ref</code>、<code>reactive</code>、
      <code>computed</code>、<code>watch</code> 最小需要哪些类型注解。
    </p>

    <h3>1. 核心模式</h3>
    <ul class="list">
      <li><code>&lt;script setup lang="ts"&gt;</code>：打开 TS 模式</li>
      <li><code>const count = ref&lt;number&gt;(0)</code>：给 <code>ref</code> 内部值指定类型</li>
      <li><code>const state = reactive({ ... })</code>：对象内部用前面定义好的类型（如 <code>Todo</code>）</li>
      <li><code>computed&lt;Todo[]&gt;(() =&gt; ...)</code>：可以显式写返回类型，更利于阅读</li>
      <li>函数：给参数与返回值写类型，例如 <code>function addTodo(): void</code></li>
    </ul>

    <h3>2. 示例：带类型的 Todo 小组件（本文件顶部已实现）</h3>
    <p>你可以对照这里的逻辑看类型：</p>
    <ol class="list">
      <li><code>Todo</code> 类型定义了组件内部数组每一项的结构。</li>
      <li><code>state.todos</code> 明确为 <code>Todo[]</code>，后续操作都不会写错字段名。</li>
      <li><code>filteredTodos</code> 用 <code>computed&lt;Todo[]&gt;</code> 写明返回数组类型。</li>
      <li><code>toggleTodo(id: number)</code> 中，<code>id</code> 类型清晰可见。</li>
    </ol>

    <div class="demo">
      <h4>示例：带类型的 Todo（可运行）</h4>
      <div class="todo-input">
        <input v-model="newTitle" placeholder="输入待办，然后回车或点添加" @keydown.enter="addTodo" />
        <button type="button" @click="addTodo">添加</button>
      </div>
      <div class="filters">
        <button
          v-for="f in ['all', 'active', 'done']"
          :key="f"
          type="button"
          :class="{ active: state.filter === f }"
          @click="state.filter = f as any"
        >
          {{ f }}
        </button>
      </div>
      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id" :class="{ done: todo.done }">
          <label>
            <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo.id)" />
            {{ todo.title }}
          </label>
        </li>
      </ul>
    </div>

    <h3>3. 正式练习（TodoListTs.vue）</h3>
    <ol class="list">
      <li>打开 <code>src/exercises/TodoListTs.vue</code>，你会看到一个只有注释的空壳组件。</li>
      <li>
        仿照这里的写法，实现：
        <ul>
          <li><code>Todo</code> 类型定义</li>
          <li><code>ref</code> / <code>reactive</code> 状态（输入框 + 列表）</li>
          <li>新增、切换完成、删除等函数，并给参数标类型</li>
        </ul>
      </li>
      <li>完成后，把纯 TS 错误消掉即可，不追求「最优写法」。有需要我可以帮你做二次重构。</li>
    </ol>
  </section>
</template>

<style scoped>
.block {
  border-bottom: 1px solid rgba(148, 163, 184, 0.4);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

h3 {
  font-size: 15px;
  margin: 14px 0 6px;
}

.intro {
  font-size: 13px;
  color: #9ca3af;
}

.list {
  font-size: 13px;
  padding-left: 18px;
}

.demo {
  margin-top: 10px;
  padding: 10px 12px;
  background: #efefef;
  border-radius: 8px;
}

.todo-input {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.todo-input input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #4b5563;
  /* background: #020617; */
  color: #e5e7eb;
}

.todo-input button {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: white;
  font-size: 13px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.filters button {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: transparent;
  /* color: #e5e7eb; */
  cursor: pointer;
}

.filters button.active {
  background: #2563eb;
  border-color: #2563eb;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
}

.todo-list li + li {
  margin-top: 4px;
}

.todo-list li.done {
  opacity: 0.6;
  text-decoration: line-through;
}
</style>

