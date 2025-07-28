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
    // 开发模式：挂载 → 渲染 → 卸载 → 二次挂载 → 渲染（用于检测副作用）
    // 生产模式：挂载 → 渲染（仅一次）
    // 如果项目使用了React.StrictMode（在create - react - app创建的项目中默认启用），它会故意重复调用组件函数来帮助发现副作用问题

    // jsx 对象
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);