/**
 * 项目的入口文件
 * 必须先导入react和react-dom包
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ReactDom 有一个render 方法
// 创建react虚拟根节点 - 获取public下的 <div id="root"></div>
const root = ReactDOM.createRoot(document.querySelector('#root'));
// render里面的内容表示 jsx, 表示js+xml
// jsx是一个对象,是虚拟 dom 语法糖
// 将render里面的虚拟dom,即jsx,直接插入到 root 根节点
root.render(
    // jsx 对象
    <React.StrictMode>
        <App />
    </React.StrictMode>
);