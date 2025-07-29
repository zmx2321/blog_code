import React from 'react';

import MovieA from './components/MovieA';
import MovieB from './components/MovieB';

// import Movie from './components/Movie';


// 高阶组件
/**
 * 利用js的闭包,[柯里化函数]
 */

// 高阶组件复用页面
const Example12 = () => {
    return (
        <>
            <br />
            使用高阶组件,重构Movie*组件
            <br />
            <MovieA />
            <MovieB />

        </>
    )
}

export default Example12;
