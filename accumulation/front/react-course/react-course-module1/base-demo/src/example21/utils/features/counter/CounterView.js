import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';
import { connect } from 'react-redux';

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

// 新增 connect 版本组件
const mapStateToProps = (state) => ({
    count: state.counter.value
});

// 修改mapDispatchToProps为函数形式
const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
});

export const ClassCounterView = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ count, increment, decrement }) => (
    <>
        <h2>
            connect 示例 <br />
            当前计数: {count}
        </h2>
        {/* 移除事件对象参数传递 */}
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
    </>
));

export default CounterView;
