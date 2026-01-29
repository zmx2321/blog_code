import { useState, useMemo, useEffect } from 'react'

/**
 * 03 派生值与副作用 - Vue 工程师对照
 *
 * Vue: computed(() => a + b)、watch(source, cb)
 * React: useMemo(() => a + b, [a,b])、useEffect(() => {}, [deps])
 */

function Learn03ComputedEffect() {
  const [count, setCount] = useState(1)
  const [name, setName] = useState('')

  // 派生值：类似 Vue computed
  const double = useMemo(() => count * 2, [count])

  // 副作用：类似 Vue watch，空数组 = 只跑一次（mounted）
  useEffect(() => {
    const t = setTimeout(() => setName('已挂载'), 500)
    return () => clearTimeout(t) // 清理 = Vue onUnmounted
  }, [])

  useEffect(() => {
    if (!name) return
    console.log('name 变了:', name)
  }, [name])

  return (
    <div className="learn-section">
      <h2>03 派生值与副作用</h2>
      <p className="vue-tip">
        Vue: computed / watch → React: useMemo / useEffect
      </p>
      <p>count: {count}，double: {double}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>+1</button>
      <p>name: {name || '...'}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="输入看 effect" />
    </div>
  )
}

export default Learn03ComputedEffect
