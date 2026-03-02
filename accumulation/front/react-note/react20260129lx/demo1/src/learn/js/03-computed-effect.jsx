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
  // 组件挂载后执行 const t = setTimeout(() => setName('已挂载'), 500)
  // 组件卸载前 执行 return () => clearTimeout(t) // 清理 = Vue onUnmounted
  // [] 空数组的作用, 决定 useEffect 什么时候执行

  /**
   * useEffect(fn)	无依赖	每次渲染后都执行
   * useEffect(fn, [])	空数组	只在挂载时执行一次
   * useEffect(fn, [a, b])	指定依赖	挂载时 + 依赖变化时执行
   *
   * [] = "只跑一趟"（mounted）
   * return = "临走前打扫干净"（unmounted）
   */
  useEffect(() => {
    const t = setTimeout(() => setName('已挂载'), 500)
    return () => clearTimeout(t) // 清理 = Vue onUnmounted
  }, [])

  // useEffect(fn, [a, b])	指定依赖	挂载时 + 依赖变化时执行
  // 即name变化的时候,执行
  // 如果有return,则组件卸载会执行
  useEffect(() => {
    // 只有返回的是函数,清理函数才会被执行
    if (!name) return // 返回 undefined，不是函数！清理函数不会被执行
    console.log('name 变了:', name)

    /* if (!name) {
      return () => { }        // ✅ 空函数也是函数！
    } */

    // 如果想销毁时调用,以下两种方式都可以
    // return () => fn()
    // return fn
    // 清理函数
    return () => {
      console.log('清理:', name)
    }
  }, [name])

  return (
    <div className="learn-section">
      <h2>03 派生值与副作用</h2>
      <p className="vue-tip">Vue: computed / watch → React: useMemo / useEffect</p>
      <p>
        count: {count}，double: {double}
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
      <p>name: {name || '...'}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="输入看 effect" />
    </div>
  )
}

export default Learn03ComputedEffect

