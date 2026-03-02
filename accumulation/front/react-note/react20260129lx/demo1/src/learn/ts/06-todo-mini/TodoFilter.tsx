/**
 * 筛选：全部 / 未完成 / 已完成（TS 版）
 */

type Filter = 'all' | 'active' | 'done'

const FILTERS_TS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '未完成' },
  { key: 'done', label: '已完成' },
]

type Props = {
  filter: Filter
  onChange: (value: Filter) => void
}

function TodoFilterTs({ filter, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {FILTERS_TS.map((f) => (
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

export default TodoFilterTs

