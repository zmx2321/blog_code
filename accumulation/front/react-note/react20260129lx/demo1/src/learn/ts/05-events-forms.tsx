import { useState } from 'react'

/**
 * 05 事件与表单（受控组件）- Vue 工程师对照（TS 版）
 *
 * Vue: @click、v-model="text"
 * React + TS: onClick、受控组件 + 输入值类型为 string
 */

function Learn05EventsFormsTs() {
  const [text, setText] = useState<string>('')
  const [clicks, setClicks] = useState<number>(0)

  return (
    <div className="learn-section">
      <h2>05 事件与表单（TS 版）</h2>
      <p className="vue-tip">
        Vue: @click、v-model → React + TS: onClick、value + onChange（string / number 等类型明确）
      </p>
      <p>点击次数: {clicks}</p>
      <button type="button" onClick={() => setClicks((c) => c + 1)}>
        点我
      </button>
      <div style={{ marginTop: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="受控输入，类似 v-model（text: string）"
        />
        <span style={{ marginLeft: 8 }}>你输入了: {text || '(空)'}</span>
      </div>
    </div>
  )
}

export default Learn05EventsFormsTs

