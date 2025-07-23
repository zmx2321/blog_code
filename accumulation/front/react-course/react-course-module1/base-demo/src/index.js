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
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);