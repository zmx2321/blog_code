import { useState, useMemo, useEffect } from 'react'

/**
 * 03 派生值与副作用 - Vue 工程师对照（TS 版）
 *
 * Vue: computed(() => a + b)、watch(source, cb)
 * React + TS: useMemo / useEffect，并给 state / 派生值加类型
 */

function Learn03ComputedEffectTs() {
  const [count, setCount] = useState<number>(1)
  const [name, setName] = useState<string>('')

  // 派生值：类似 Vue computed
  const double: number = useMemo(() => count * 2, [count])

  // 副作用：类似 Vue watch，空数组 = 只跑一次（mounted）
  useEffect(() => {
    const t = setTimeout(() => setName('已挂载'), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!name) return
    console.log('name 变了:', name)
  }, [name])

  return (
    <div className="learn-section">
      <h2>03 派生值与副作用（TS 版）</h2>
      <p className="vue-tip">
        Vue: computed / watch → React + TS: useMemo / useEffect + 类型约束
      </p>
      <p>
        count: {count}，double: {double}
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
      <p>name: {name || '...'}</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入看 effect（带 string 类型）"
      />
    </div>
  )
}

export default Learn03ComputedEffectTs

