import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

const CounterView = () => {
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

export default CounterView;
