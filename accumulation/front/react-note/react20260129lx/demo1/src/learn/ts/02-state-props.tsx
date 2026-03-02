import { useState } from 'react'

/**
 * 02 状态与 Props - Vue 工程师对照（TS 版）
 *
 * Vue: ref(0)，改 .value；defineProps / defineEmits
 * React + TS: useState<number>(0)，props 用类型约束
 */

type CounterDisplayProps = {
  count: number
  onIncrement: () => void
}

// 子组件：展示 count，点击触发父的 +1
function CounterDisplayTs({ count, onIncrement }: CounterDisplayProps) {
  return (
    <div>
      <span>当前：{count} </span>
      <button type="button" onClick={onIncrement}>
        +1
      </button>
    </div>
  )
}

function Learn02StatePropsTs() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="learn-section">
      <h2>02 状态与 Props（TS 版）</h2>
      <p className="vue-tip">
        Vue: ref + props/emit → React + TS: useState&lt;number&gt; + 明确的 props 类型
      </p>
      <CounterDisplayTs count={count} onIncrement={() => setCount((c) => c + 1)} />
    </div>
  )
}

export default Learn02StatePropsTs

