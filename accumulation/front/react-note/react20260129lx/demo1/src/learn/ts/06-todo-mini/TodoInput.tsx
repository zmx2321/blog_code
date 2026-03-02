import type { ChangeEvent, KeyboardEvent } from 'react'

/**
 * Todo 输入框 - 受控组件（TS 版）
 * Vue: v-model + @keyup.enter emit
 * React + TS: value + onChange + onKeyDown，事件对象带类型
 */

type Props = {
  value: string
  onChange: (value: string) => void
  onAdd: (text: string) => void
}

function TodoInputTs({ value, onChange, onAdd }: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim())
      onChange('')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <input
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="输入后回车添加（TS 版）"
    />
  )
}

export default TodoInputTs

