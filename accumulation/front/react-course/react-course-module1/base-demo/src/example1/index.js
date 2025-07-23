import { useState, useEffect } from 'react';

// 组件名称要大写,否则会报错
function Example1 () {
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        // 清除定时器，避免内存泄漏
        return () => clearInterval(intervalId);
    }, []); // 空依赖数组表示这个effect只在组件挂载和卸载时运行一次

    return (
        <div className="example1">
            {time}
        </div>
    );
}

export default Example1;