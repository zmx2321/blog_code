import Learn01JsxBasics from './learn/01-jsx-basics'
import Learn02StateProps from './learn/02-state-props'
import Learn03ComputedEffect from './learn/03-computed-effect'
import Learn04ConditionalList from './learn/04-conditional-list'
import Learn05EventsForms from './learn/05-events-forms'
import Learn06TodoMini from './learn/06-todo-mini'

function App() {
  return (
    <div style={{ paddingBottom: 40 }}>
      <h1 style={{ marginBottom: 24, color: '#333' }}>
        React 速成 - Vue 工程师对照学习
      </h1>
      <p style={{ marginBottom: 24, color: '#666' }}>
        按「今日学习计划」从上往下练，每个区块都有 Vue 对照提示。
      </p>
      <Learn01JsxBasics />
      <Learn02StateProps />
      <Learn03ComputedEffect />
      <Learn04ConditionalList />
      <Learn05EventsForms />
      <Learn06TodoMini />
    </div>
  )
}

export default App
