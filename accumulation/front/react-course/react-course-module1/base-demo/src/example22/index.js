import React from 'react';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import CounterView from './utils/features/counter/CounterView';

// 定义一个名为Example21的函数组件
const Example23 = () => (
    <>
        <h2>Example23 connect</h2>
        <Provider store={store}>
            <CounterView />
        </Provider>
    </>
);

export default Example23;