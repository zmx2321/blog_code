import { useState } from 'react'
import Learn01JsxBasics from './learn/js/01-jsx-basics'
import Learn02StateProps from './learn/js/02-state-props'
import Learn03ComputedEffect from './learn/js/03-computed-effect'
import Learn04ConditionalList from './learn/js/04-conditional-list'
import Learn05EventsForms from './learn/js/05-events-forms'
import Learn06TodoMini from './learn/js/06-todo-mini'

import Learn01JsxBasicsTs from './learn/ts/01-jsx-basics'
import Learn02StatePropsTs from './learn/ts/02-state-props'
import Learn03ComputedEffectTs from './learn/ts/03-computed-effect'
import Learn04ConditionalListTs from './learn/ts/04-conditional-list'
import Learn05EventsFormsTs from './learn/ts/05-events-forms'
import Learn06TodoMiniTs from './learn/ts/06-todo-mini'

function App() {
  const [showTs, setShowTs] = useState(false)

  return (
    <div style={{ paddingBottom: 40 }}>
      <h1 style={{ marginBottom: 24, color: '#333' }}>
        React 速成 - Vue 工程师对照学习
      </h1>
      <p style={{ marginBottom: 16, color: '#666' }}>
        按「今日学习计划」从上往下练，每个区块都有 Vue 对照提示。
      </p>
      <div style={{ marginBottom: 24 }}>
        <button
          type="button"
          onClick={() => setShowTs((prev) => !prev)}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            border: '1px solid #42b883',
            background: showTs ? '#42b883' : '#fff',
            color: showTs ? '#fff' : '#42b883',
            cursor: 'pointer',
          }}
        >
          {showTs ? '切换回 JS 案例' : '查看 TS 案例（React + TS）'}
        </button>
      </div>
      {showTs ? (
        <>
          <Learn01JsxBasicsTs />
          <Learn02StatePropsTs />
          <Learn03ComputedEffectTs />
          <Learn04ConditionalListTs />
          <Learn05EventsFormsTs />
          <Learn06TodoMiniTs />
        </>
      ) : (
        <>
          <Learn01JsxBasics />
          <Learn02StateProps />
          <Learn03ComputedEffect />
          <Learn04ConditionalList />
          <Learn05EventsForms />
          <Learn06TodoMini />
        </>
      )}
    </div>
  )
}

export default App
