import { relative } from './relative.js'

const obj = relative({
    a: 1,
    b: 2,
    // 这种写法等价于 Object.defineProperty(obj, c, {get() {}})
    // 这里是属性,不是方法(方法改this指向可以用call),所以修改里面的this指向需要另外思考方法
    // 我们需要深入理解属性的读取
    // 我们知道,读属性实际上就是执行它的内部方法get
    get c() {
        console.log('c被访问了', this)
        // 这里的this指向的是obj
        // 这里的this.a和this.b会触发get,所以会收集c的依赖
        // 只有当this指向的是代理对象的时候,才能收集a和b的依赖
        return this.a + this.b
    },
    // 只会收集最外层的依赖,不会收集嵌套的依赖
    d: {
        // e不是代理对象,即就没有被标记过,所以不会监听到对属性d的读取
        e: 3,
        f: 4
    }
})

const arr = relative([1, 2, 3])

/* // 经过响应式(reactive)之后,每一次返回的都是新的代理,所以两个数据不是同一个对象
// 将它进行缓存之后,就可以解决这个问题,返回同一个代理对象
const state1 = relative(obj)
const state2 = relative(obj)
console.log(state1 === state2) // false */

// 如果reactive传入的是一个代理,需要再另外做处理
/* const state1 = relative(obj)
console.log(state1) */

// 这里只能收集c的依赖,不能收集a和b的依赖
// 我们需要对它进行处理,这里主要是this的指向问题
const fn = () => {
    console.log('fn被执行了')
    // obj.c
    // obj.d.e
    // 使用in,不会触发get方法,所以不会收集依赖,我们需要找到in的内部方法
    // 因为对对象的所有操作,最终都会对应到对象的内部方法
    // 只要找到内部方法,我们就可以找到相对应的拦截器去拦截
    // console.log('e' in obj)
    /* for(let key in obj) {
        // console.log(key)
    } */
    // 依旧会触发for in    
    // Object.keys(obj)
}
// 在外面改变了数据,fn也需要被重新执行,因为可能会改变结果
// obj.e = 5

/* obj.a = 5  // set
obj.e = 5  // add
delete obj.d  // delete
delete obj.g  // 删原来没有的东西,不需要触发
obj.b = 2  // 数据没有改,不算是派发更新,所以不需要触发 */

// 数组的依赖收集
// arr[0]  // 下标就是属性名,所以会触发get
// arr.push(4) // push会触发set
// arr.length  // 会触发get
// delete arr[0]  // 触发delete

// 三种循环触发的依赖更新不一样
// arr.forEach(element => {});  // 需要判断has
// for(let key in arr) {}  // iterate
// for(let i = 0; i < arr.length; i++) {}  
// for of  // iterate
// Cannot convert a Symbol value to a string => 报错,无法将一个符号转换成字符串
// trck方法中的key
// for of实际上就是调用对象的iterator的符号属性(Symbol.iterator),来得到一个迭代器
// for(let item of arr) {}
// 数组的方法
// 依赖收集 [get] includes => 读对象的某一个属性 includes,判断该属性需要不需要被收集,需要这样想: 将来这个信息变化过后,要不要重新运行这个函数
// 依赖收集 [get] length => 读对象的某一个属性 length, 如何以后数组长度变化,有没有可能影响它判断的结果,有就需要进行依赖收集
// 依赖收集 [get] 0
arr.includes(1)

fn()