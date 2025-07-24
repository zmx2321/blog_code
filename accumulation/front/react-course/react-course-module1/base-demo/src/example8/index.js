import React, { useState } from 'react';

const refInput = React.createRef();

const handleClick = () => {
    // refInput.current.focus();
    console.log('refInput+++++', refInput.current);
    console.log('refInput+++++', refInput.current.value);
}

// 非受控组件
const Example8 = () => {
    const [val, setVal] = useState('');

    const handleChange = (e) => {
        setVal(e.target.value);
    }

    return (
        <>
            {/* 非受控组件: 组件的状态值不与状态进行绑定,而是通过ref进行操作 */}
            input: <input type="text" onChange={handleChange} ref={refInput} />
            button: <button onClick={handleClick}>focus</button>
            {val}
        </>
    )
}

export default Example8;
