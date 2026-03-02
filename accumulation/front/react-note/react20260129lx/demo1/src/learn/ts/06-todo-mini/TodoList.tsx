/**
 * Todo 列表 - 只负责展示列表，每条用 TodoItem（TS 版）
 */
import type { Todo } from './TodoApp'
import TodoItemTs from './TodoItem'

type Props = {
  list: Todo[]
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

function TodoListTs({ list, onToggle, onRemove }: Props) {
  if (list.length === 0) {
    return <p style={{ color: '#888' }}>暂无事项</p>
  }
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {list.map((item) => (
        <TodoItemTs
          key={item.id}
          item={item}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}

export default TodoListTs

