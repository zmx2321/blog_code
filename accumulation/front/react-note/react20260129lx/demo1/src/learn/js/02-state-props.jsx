import { useState } from 'react'

/**
 * 02 状态与 Props - Vue 工程师对照
 *
 * Vue: ref(0)，改 .value；defineProps / defineEmits
 * React: useState(0)，用 setXxx 改；props 传参，父传回调 = 子传父
 */

// 子组件：展示 count，点击触发父的 +1
function CounterDisplay({ count, onIncrement }) {
  return (
    <div>
      <span>当前：{count} </span>
      <button type="button" onClick={onIncrement}>
        +1
      </button>
    </div>
  )
}

function Learn02StateProps() {
  const [count, setCount] = useState(0)
  // Vue: const count = ref(0); 改 count.value++
  // React: 读 count，写 setCount(c => c + 1)

  return (
    <div className="learn-section">
      <h2>02 状态与 Props</h2>
      <p className="vue-tip">
        Vue: ref + props/emit → React: useState + props（父传 onIncrement 回调 = 子传父）
      </p>
      {/* onIncrement 是父给的"遥控器"，子按按钮就是在"遥控"父的状态。 */}
      <CounterDisplay count={count} onIncrement={() => setCount((c) => c + 1)} />
    </div>
  )
}

export default Learn02StateProps

