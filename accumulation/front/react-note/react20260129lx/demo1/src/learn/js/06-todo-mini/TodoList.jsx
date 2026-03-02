/**
 * Todo 列表 - 只负责展示列表，每条用 TodoItem
 * Vue: v-for + :key
 * React: list.map + key
 */
import TodoItem from './TodoItem'

function TodoList({ list, onToggle, onRemove }) {
  if (list.length === 0) {
    return <p style={{ color: '#888' }}>暂无事项</p>
  }
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {list.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}

export default TodoList

