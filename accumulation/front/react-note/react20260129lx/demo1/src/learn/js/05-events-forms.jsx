import { useState } from 'react'

/**
 * 05 事件与表单（受控组件）- Vue 工程师对照
 *
 * Vue: @click、v-model="text"
 * React: onClick、value={text} + onChange={e => setText(e.target.value)}
 */

function Learn05EventsForms() {
  const [text, setText] = useState('')
  const [clicks, setClicks] = useState(0)

  return (
    <div className="learn-section">
      <h2>05 事件与表单</h2>
      <p className="vue-tip">
        Vue: @click、v-model → React: onClick、value + onChange（受控组件）
      </p>
      <p>点击次数: {clicks}</p>
      <button type="button" onClick={() => setClicks((c) => c + 1)}>
        点我
      </button>
      <div style={{ marginTop: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="受控输入，类似 v-model"
        />
        <span style={{ marginLeft: 8 }}>你输入了: {text || '(空)'}</span>
      </div>
    </div>
  )
}

export default Learn05EventsForms

