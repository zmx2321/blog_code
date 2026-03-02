/**
 * 01 JSX 基础 - Vue 工程师对照
 *
 * Vue: <template> 里写 HTML，{{ }} 插值
 * React: 函数 return JSX，{ } 里写表达式，没有单独 template
 */

function Learn01JsxBasics() {
  const name = 'React'
  const count = 42
  const isGreen = true
  const styleObj = { color: 'green', fontSize: '18px' }

  return (
    <div className="learn-section">
      <h2>01 JSX 基础</h2>
      <p className="vue-tip">
        Vue: template + {'{{ }}'} 插值 → React: return JSX，用 {'{ }'} 写表达式
      </p>
      <p>你好，{name}！数字：{count}</p>
      <p>表达式：{1 + 2}，三元：{isGreen ? '绿色' : '非绿'}</p>
      <p style={styleObj}>style 用对象，class 写成 className</p>
    </div>
  )
}

export default Learn01JsxBasics

