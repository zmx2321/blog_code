/**
 * 单条 Todo - 展示 + 切换完成 + 删除
 * Vue: props + emit('toggle', 'remove')
 * React: props + onToggle / onRemove 回调
 */
function TodoItem({ item, onToggle, onRemove }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => onToggle(item.id)}
      />
      <span style={{ textDecoration: item.done ? 'line-through' : 'none', flex: 1 }}>
        {item.text}
      </span>
      <button type="button" onClick={() => onRemove(item.id)}>
        删除
      </button>
    </li>
  )
}

export default TodoItem

