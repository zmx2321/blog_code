import { observable, action } from 'mobx';

// 创建计数器Store（非装饰器写法）
class CounterStore {
    count = observable.box(0);

    increment = action(() => {
        this.count.set(this.count.get() + 1);
    });

    decrement = action(() => {
        this.count.set(this.count.get() - 1);
    });
}

export default CounterStore;