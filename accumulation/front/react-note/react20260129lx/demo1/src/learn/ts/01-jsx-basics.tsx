/**
 * 01 JSX 基础 - Vue 工程师对照（TS 版）
 *
 * Vue: <template> 里写 HTML，{{ }} 插值
 * React + TS: 函数组件 + JSX，{ } 里写表达式
 */

import type { CSSProperties } from 'react'

function Learn01JsxBasicsTs() {
  const name: string = 'React + TS'
  const count: number = 42
  const isGreen: boolean = true
  const styleObj: CSSProperties = { color: 'green', fontSize: '18px' }

  return (
    <div className="learn-section">
      <h2>01 JSX 基础（TS 版）</h2>
      <p className="vue-tip">
        Vue: template + {'{{ }}'} 插值 → React + TS: JSX + 类型（string / number / boolean 等）
      </p>
      <p>
        你好，{name}！数字：{count}
      </p>
      <p>
        表达式：{1 + 2}，三元：{isGreen ? '绿色' : '非绿'}
      </p>
      <p style={styleObj}>style 用对象，class 写成 className（已加上 TS 类型）</p>
    </div>
  )
}

export default Learn01JsxBasicsTs

