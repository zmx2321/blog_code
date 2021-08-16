// 供出一个接口
// 用来自定义各种类型的类型别名
// 泛型 => 使我们定义的各种类型更加通用
// 其实也可以写成 type Result<T> = {}
// 两者在大多数情况下是可以替代的
// interface更显结构性一些
// 一般来说，能用interface实现，就用interface，如果不能就用type
export interface Result<T> {
    ok: 0 | 1;  // result对象的ok值可以是0或1
    data: T;  // result对象的data值不确定，可以是hreos也可以是fruits等
}