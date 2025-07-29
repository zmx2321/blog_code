import React from 'react';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import CounterView from './utils/features/counter/CounterView';

const Example16 = () => (
    <>
        <h2>
            最推荐写法
        </h2>
        <Provider store={store}>
            <CounterView />
        </Provider>
    </>
);

export default Example16;
