import React from 'react';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import CounterView, { ClassCounterView } from './utils/features/counter/CounterView';

// 定义一个名为Example21的函数组件
const Example21 = () => (
    <>
        <h2>Example21 connect</h2>
        <Provider store={store}>
            <CounterView />
            <hr />
            <ClassCounterView />
        </Provider>
    </>
);

export default Example21;