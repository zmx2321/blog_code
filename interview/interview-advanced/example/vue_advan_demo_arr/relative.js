import { handlers } from './handlers.js'
import { isObject } from './utiles.js'

// 这里使用weekmap,因为如果使用map,如果这个对象在外边一单不再使用了,它希望垃圾回收将它回收掉,但这个对象引用还会在对象中存在,就会回收不掉,造成内存泄漏
// 所以我们使用weakmap,weakmap的key值是弱引用,当对象在外部不再使用的时候,会将整个键值对自动回收掉
const targetMap = new WeakMap()

// 自己实现的响应式代理
// vue3中 => let data = reactive({name: '张三', age: 18})
export const relative = target=> {
    /**
     * 监听对象
     */
    // 如果不是对象，直接返回
    if(!isObject(target)) {
        return target
    }

    // 每一次返回的都是新的代理(new),所以两个数据不是同一个对象
    // const state1 = relative(obj)
    // const state2 = relative(obj)
    // console.log(state1 === state2) // false
    // 没有必要,所以在监听这里,我们需要将传过来的数据(target)和下面的这个poxy做一个关联
    // 我们需要当传入同样的数据的时候,返回同一个proxy代理
    // 需要建立一个map结构,来做一个关联,如果传入的对象已经被代理过了,就直接返回之前的代理
    // 如果有对象的key值,说明已经被代理过了,可以直接返回之前的代理
    // 是对象,有缓存,就把缓存返回
    if(targetMap.has(target)) {
        return targetMap.get(target)  // 直接返回之前代理过的对象
    }

    // 是对象,没有缓存,设置代理
    // 代理对象,无论给你什么对象,一定会返回一个新的代理
    const proxy = new Proxy(target, handlers)

    // 建立关联
    targetMap.set(target, proxy)
    return proxy
}