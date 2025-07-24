/**
 * 受控组件
 * 1. 状态值绑定到组件的value属性上
 * 2. 状态值的修改通过onChange事件进行
 */
/**
 * 目前流行的写法是 hooks
 */

import React, { useState } from 'react';

// 受控组件: 受状态控制的组件,需要与状态进行相应的绑定
const Example7 = () => {
    const [val, setVal] = useState('hello world');
    const [data, setData] = useState([]);

    const handleChange = (e) => {
        setVal(e.target.value);
    }

    const handleClick = () => {
        console.log('handleClick+++++', val);
        setData(prevData => [...prevData, val]);
    }

    return (
        <>
            {/* 使用val绑定状态值,使用onchange进行修改 */}
            input: <input type="text" value={val} onChange={handleChange} />
            button: <button onClick={handleClick}>获取输入框的值</button>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </>
    )
}

export default Example7;