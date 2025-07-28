import React from 'react';

import MovieA from './components/MovieA';
import MovieB from './components/MovieB';


// 高阶组件

// 高阶组件复用页面
const Example11 = () => {
    return (
        <>
            <br />
            不使用高阶组件实现
            <br />
            <MovieA />
            <MovieB />
        </>
    )
}

export default Example11;
