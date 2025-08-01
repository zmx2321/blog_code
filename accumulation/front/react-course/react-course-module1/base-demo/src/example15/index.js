import { Provider } from 'react-redux';
import { store } from './utils/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './utils/counterSlice';

// 正确层级：Provider应该包裹整个应用根组件
const Example15 = () => {
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
        <Example15 />
    </Provider>
);
