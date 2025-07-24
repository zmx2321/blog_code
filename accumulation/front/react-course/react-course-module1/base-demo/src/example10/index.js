import React from 'react';

// 在父组件中使用
import EnhancedComponent from './components/EnhancedComponent';

import HOC from './components/HOC';

/**
 * 高阶组件不是组件,本质上是一个函数
 * 接收一个组件或者多个组件,返回一个新组件
 * 这个组件就是高阶组件
 */

const Example10 = () => {
    return (
        <>
            {/* // 渲染时会自动输出日志：
            // 组件 BaseComponent 已挂载
            // 组件 BaseComponent 已更新 */}
            {/* <EnhancedComponent title="示例组件" /> */}
            HOC:
            <br />
            <HOC />
        </>
    );
};

export default Example10;
