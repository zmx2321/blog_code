/**
 * 筛选：全部 / 未完成 / 已完成
 * Vue: v-model 或 :value + @input
 * React: value + onChange
 */
const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '未完成' },
  { key: 'done', label: '已完成' },
]

function TodoFilter({ filter, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          style={{
            padding: '4px 12px',
            background: filter === f.key ? '#42b883' : '#eee',
            color: filter === f.key ? '#fff' : '#333',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

export default TodoFilter

