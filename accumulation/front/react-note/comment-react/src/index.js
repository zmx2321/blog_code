import React from 'react'
import ReactDOM from 'react-dom'  // 渲染dom
import App from './components/app/app'  // 引入app组件

// 这里的id看public下的index.html
ReactDOM.render(<App />, document.getElementById('root'));