/**
 * Todo 输入框 - 受控组件
 * Vue: v-model + @keyup.enter emit
 * React: value + onChange + onKeyDown 回调
 */
function TodoInput({ value, onChange, onAdd }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim())
      onChange('')
    }
  }
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="输入后回车添加"
    />
  )
}

export default TodoInput

