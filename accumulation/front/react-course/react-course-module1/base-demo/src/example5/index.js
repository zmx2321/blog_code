import { useState } from 'react'

const Example5 = () => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }

    return (
        <div className="example5">
            点击次数：{count}
            <br />
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default Example5;