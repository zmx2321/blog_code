import { observer } from 'mobx-react-lite';
import CounterStore from './utils/CounterStore';

const counterStore = new CounterStore();

// 观察者组件
const Example17 = observer(() => {
    return (
        <>
            <h2>
                {/* 添加.get()获取实际值 */}
                mobx示例 <br />
                当前计数: {counterStore.count.get()}
            </h2>
            <button onClick={counterStore.increment}>+</button>
            <button onClick={counterStore.decrement}>-</button>
        </>
    );
});

export default Example17;