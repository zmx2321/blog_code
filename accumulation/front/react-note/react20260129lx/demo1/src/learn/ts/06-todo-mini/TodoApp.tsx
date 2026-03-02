import { useState, useMemo } from 'react'
import TodoInputTs from './TodoInput'
import TodoListTs from './TodoList'
import TodoFilterTs from './TodoFilter'

/**
 * 迷你 Todo - 组件化实战（TS 版）
 *
 * Vue 思路：data 里 todos、filter；子组件 props + emit
 * React + TS 思路：useState<Todo[]>、useState<'all' | 'active' | 'done'>
 */

export type Todo = {
  id: number
  text: string
  done: boolean
}

type Filter = 'all' | 'active' | 'done'

let nextId = 1
function createItem(text: string): Todo {
  return { id: nextId++, text, done: false }
}

function TodoAppTs() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [inputValue, setInputValue] = useState<string>('')

  const filteredList = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done)
    if (filter === 'done') return todos.filter((t) => t.done)
    return todos
  }, [todos, filter])

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, createItem(text)])
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="learn-section">
      <h2>06 综合：迷你 Todo（TS 版，组件化实战）</h2>
      <p className="vue-tip">
        Vue: data + 子组件 props/emit → React + TS: useState&lt;Todo[]&gt; +
        明确的 Filter 联合类型
      </p>
      <TodoInputTs value={inputValue} onChange={setInputValue} onAdd={addTodo} />
      <TodoFilterTs filter={filter} onChange={setFilter} />
      <TodoListTs list={filteredList} onToggle={toggleTodo} onRemove={removeTodo} />
    </div>
  )
}

export default TodoAppTs

