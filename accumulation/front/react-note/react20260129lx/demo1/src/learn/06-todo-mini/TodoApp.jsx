import { useState, useMemo } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'

/**
 * 迷你 Todo - 组件化实战
 *
 * Vue 思路：data 里 todos、filter；子组件 props + emit
 * React 思路：useState(todos, filter)；状态提升在父组件，子组件用 props + 回调
 */
let nextId = 1
function createItem(text) {
  return { id: nextId++, text, done: false }
}

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [inputValue, setInputValue] = useState('')

  const filteredList = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done)
    if (filter === 'done') return todos.filter((t) => t.done)
    return todos
  }, [todos, filter])

  const addTodo = (text) => {
    setTodos((prev) => [...prev, createItem(text)])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="learn-section">
      <h2>06 综合：迷你 Todo（组件化实战）</h2>
      <p className="vue-tip">
        Vue: data + 子组件 props/emit → React: useState 提升到父组件，子组件 props + 回调
      </p>
      <TodoInput value={inputValue} onChange={setInputValue} onAdd={addTodo} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <TodoList list={filteredList} onToggle={toggleTodo} onRemove={removeTodo} />
    </div>
  )
}

export default TodoApp
