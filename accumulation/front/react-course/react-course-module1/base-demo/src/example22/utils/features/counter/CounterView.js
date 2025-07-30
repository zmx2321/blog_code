// 导入React核心库
import React from 'react';
// 从react-redux导入connect高阶组件
import { connect } from 'react-redux';
// 导入counterSlice中定义的action creators
import { increment, decrement } from './counterSlice';

// 定义CounterView组件（改为接收props的普通函数组件）
const CounterView = ({
    count,      // 通过connect注入的state
    increment,  // 通过connect注入的action
    decrement   // 通过connect注入的action
}) => {
    return (
        <>
            <h2>
                redux toolkit 示例 <br />
                当前计数: {count}
            </h2>
            {/* 直接使用props中的action方法 */}
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    );
}

// mapStateToProps：将Redux state映射到组件props
const mapStateToProps = (state) => ({
    count: state.counter.value  // 从counter切片获取value值
});

// mapDispatchToProps：将action creators绑定到组件props
const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch(increment()),  // 显式包装避免事件对象传递
    decrement: () => dispatch(decrement())
});

// 使用connect高阶组件包裹组件：
export default connect(
    mapStateToProps,
    mapDispatchToProps  // 使用修正后的dispatch映射
)(CounterView);