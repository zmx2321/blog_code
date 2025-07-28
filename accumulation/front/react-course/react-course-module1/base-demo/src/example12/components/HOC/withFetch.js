/**
 * 高阶组件
 * 获取数据  对状态赋值  属性传递
 */
import React, { useEffect, useState } from 'react';

/* function withFetching (fetchType) {
    return function (WrappedComponent) {
        return function WithFetchingWrapper (props) {
            // 实现代码...
        }
    }
} */

// // 箭头函数柯里化
// const funcA = a => b => c => { /* 逻辑 */ }

// // 等价于传统函数
// function funcA (a) {
//     return function (b) {
//         return function (c) {
//             // 逻辑
//         }
//     }
// }

// 函数式高阶组件：withFetching
const withFetching = (fetchType) => (WrappedComponent) => {
    return function WithFetchingWrapper (props) {
        const [data, setData] = useState([]);

        useEffect(() => {
            if (fetchType === 'A') {
                setData([
                    { id: 1, name: '111' },
                    { id: 2, name: '222' },
                    { id: 3, name: '333' },
                ]);
            } else {
                setData([
                    { id: 4, name: 'aaa' },
                    { id: 5, name: 'bbb' },
                    { id: 6, name: 'ccc' },
                ]);
            }
        }, []);

        return <WrappedComponent {...props} data={data} />;
    };
};

export default withFetching;