import React, { useState, useEffect } from 'react';

const Example9 = () => {
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(null);

    // 模拟 componentDidMount
    useEffect(() => {
        console.log('组件挂载完成');

        // 初始化定时器
        const newTimer = setInterval(() => {
            console.log('定时器运行中...');
        }, 1000);
        setTimer(newTimer);

        // 模拟 componentWillUnmount
        return () => {
            console.log('组件即将卸载');
            clearInterval(newTimer);
        };
    }, []);

    // 模拟 componentDidUpdate
    useEffect(() => {
        console.log(`计数器更新为：${count}`);
    }, [count]); // 仅在count变化时触发

    return (
        <div>
            <h2>生命周期示例</h2>
            <p>当前计数：{count}</p>
            <button onClick={() => setCount(c => c + 1)}>
                增加计数
            </button>

            {/* 用于演示卸载的嵌套组件 */}
            {count < 3 && <ChildComponent />}
        </div>
    );
}

// 子组件用于演示卸载
const ChildComponent = () => {
    useEffect(() => {
        console.log('子组件挂载');
        return () => console.log('子组件卸载');
    }, []);

    return <div>子组件（当计数 ≥3 时消失）</div>;
}

export default Example9;