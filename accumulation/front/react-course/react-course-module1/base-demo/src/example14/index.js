import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 创建counter slice
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: state => { state.value += 1 },
        decrement: state => { state.value -= 1 }
    }
});

// 创建store
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});

const { increment, decrement } = counterSlice.actions;

const Example14 = () => {
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

    return (
        <>
            <h2>
                redux toolkit 示例 <br />
                当前计数: {count}
            </h2>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </>
    );
}

// 用Provider包裹根组件
export default () => (
    <Provider store={store}>
        <Example14 />
    </Provider>
);