import { track, tigger, pauseTracking, resumeTracking } from './effect.js'
import { TrackOpTypes, TriggerOpTypes } from './operation.js'
import { relative } from './relative.js'
import { isObject, hasChanged } from './utiles.js'

// vue3源码中的名字是 arrayInstrumentations,意思是仪表盘
/* const obj = {
    includes: () => {},
    indexOf: () => {},
    lastIndexOf: () => {}
} */
// 没必要重新实现原来的方法
const arrayInstrumentations = {}
const RAW = Symbol('raw')  // 用户写的对象可以是任何形式,为了保证它唯一,我们使用Symbol

let arrFunction = ['includes', 'indexOf', 'lastIndexOf']
arrFunction.forEach(key => {
    // 将数组中的每一项赋值给一个函数,这个函数有若干参数
    arrayInstrumentations[key] = function(...args) {
        // 这里的this指向的是代理(proxy)

         // 1、正常找(从代理中找)
         // 调用数组原来的方法
         // 从数组的原型找到相对应自己的方法
        let res = Array.prototype[key].apply(this, args)

         // 2、找不到在原始对象中找
        if(res < 0 || res === false) {
            // console.log('找不到,重新在原始对象中找一遍')
            // 拿到了原始对象,把原始对象作为this,执行一次数组的方法
            return Array.prototype[key].apply(this[RAW], args)
        }

        return res
    }
})

// 判断当前操作是否是改变数组长度,如果是,就不收集依赖
const arrFunction2 = ['push', 'pop', 'shift', 'unshift', 'splice']
arrFunction2.forEach(key => {
    arrayInstrumentations[key] = function(...args) {
        // 暂停依赖收集 - 将依赖收集的开关关掉
        pauseTracking() 
        // 调用数组原来的方法
        let res = Array.prototype[key].apply(this, args)
        // 恢复依赖收集
        resumeTracking()

        return res
    }
})

// 读取属性值
const get = (target, key, receiver)=> {
    // 如果返回的是这个符号,就返回原始对象
    if(key === RAW) {
        return target
    }

    // 依赖收集
    track(target, TrackOpTypes.GET, key)

    // 当无法在代理对象中找到时,去原始数组中重新找一次(vue3里面使用的是第二种方法)
    // 如果obj包含key值,说明这个key是obj里面的几个特殊方法之一,需要特殊处理
    // 同时target要是一个数组
    // 表示在读某个数组(target)的obj中的方法的时候,需要返回改动之后的方法
    // 先调用数组原来的方法,找不到的时候,就改变this指向重新找一次
    // 这种方法的缺陷是,会他每次都会遍历用户的所有数组,比如obj是数组第二项,但依然会遍历所有数组
    // 会多收集一些依赖
    if(arrayInstrumentations.hasOwnProperty(key) && Array.isArray(target)) {
        return arrayInstrumentations[key]
    }

    // 返回对象的属性值,即就是读属性
    // 当读的属性是一个Object.defineProperty(obj, c, {get() {}})的时候
    // 需要改变它的this执行,否则this指向的是obj,我们需要将这个this指向代理对象的时候,才能收集方法中使用的obj中的数据中对象的依赖
    // target[key]我们无法直接修改它的this指向,它是语法层面的代码
    // 但实际上指向了target[key],就会执行一个内部函数,target[[GET]](key, ???),这个???就是我们要修改的this指向
    // target[key]等价于target[[GET]](key, ???),但target[key]在语法层面无法改变this指向,第二个参数一般都是默认的代理对象
    // 所以在Object.defineProperty(obj, c, {get() {}})中,它的this就是默认的obj对象,在语法层面无法修改
    // 我们需要使用反射来修改它的this指向,通过反射可以直接调用它的内部方法,并修改它的this指向
    // 在对象中的每一个方法(get,set,has等),reflect都提供了对应的内部方法,如Reflect.get(obj, key, receiver),Reflect.set(obj, key, value, proxy)
    // receiver就是我们要修改的this指向,即代理对象
    // 第一个参数是你要读的对象,第二个参数是你要读的属性,第三个参数是你要修改的this指向
    // console.log(Reflect.get(target, key, receiver))
    // return Reflect.get(target, key, receiver)

    // 因为可能被代理的是一个对象,对象中的数据也需要被代理,所以需要递归代理
    const result = Reflect.get(target, key, receiver)
    // 如果被代理的是一个对象,就需要递归代理
    if(isObject(result)) {
        return relative(result)
    }
    // 如果不是对象,就直接返回
    return result
}

// 读取属性值
const set = (target, key, value, receiver)=> {
    // 派发更新

    /**
     * add和set都会触发set
     */
    // TODO: 这里为什么不能用in
    const hadKey = target.hasOwnProperty(key)

    // 判断操作类型
    // TODO: 这里为什么不能用in
    const type = hadKey ? TriggerOpTypes.SET : TriggerOpTypes.ADD

    // 需要比较两个值,这里需要拿到旧的值, 上面的value是新的值
    // 这里不能使用reflect,因为在派发更新的时候,不需要去做依赖收集
    const oldValue = target[key]
    // 如果是数组就拿到数组的长度
    const oldLength = Array.isArray(target) ? target.length : undefined

    // 返回的结果
    const result = Reflect.set(target, key, value, receiver)
    // 如果没有修改成功,就返回
    if(!result) {
        return result
    }

    // 赋值之后,拿到新的长度
    const newLength = Array.isArray(target)? target.length : undefined

    // 值有变化,或者是新增属性,才需要派发更新
    // 比如+0和-0不一样,所以这里不能使用===(严格比较),需要使用Object.is
    // 因为Object.is会判断两个值是否相等,并且会判断两个值的类型是否一致,如果类型不一致,会返回false
    if(hasChanged(oldValue, value) || type === TrackOpTypes.ADD) {
        // 派发更新
        tigger(target, type, key)

        // 设置的对象是一个数组
        // 设置前后length发生变化
        // 设置的不是length属性
        // 这种情况,需要手动触发length属性的变化
        if(Array.isArray(target) && oldLength !== newLength) {
            if(key !== 'length') {
                // 手动触发length
                tigger(target, TriggerOpTypes.SET, 'length')
            } else {
                // debugger
                // 如果设置的就是length属性,需要找到被删除的下标,依次触发,派发更新
                for(let i = newLength; i < oldLength; i++) {
                    tigger(target, TriggerOpTypes.DELETE, i.toString())
                }

            }
        }
    }

    return result
}

// 判断属性值是否存在
const has = (target, key)=> {
    // 依赖收集
    // 某个函数,依赖了某个对象的某个属性,尽管不是读属性的值,只是判断这个对象的某个属性是否存在,那么这个函数就会收集起来
    track(target, TrackOpTypes.HAS, key)
    // 把有没有的结果返回出去
    return Reflect.has(target, key)
}

// 遍历对象
const ownKeys = (target)=> {
    // 依赖收集
    track(target, TrackOpTypes.ITERATE)
    // 返回对象的所有属性
    return Reflect.ownKeys(target)
}

// 删除的时候,也需要派发更新
const deleteProperty = (target, key)=> {
    // TODO: 这里为什么不能用in
    const hadKey = target.hasOwnProperty(key)
    // 返回删除结果
    const result = Reflect.deleteProperty(target, key)

    // 需要原来有现在没有,且删除成功,才需要派发更新
    if(hadKey && result) {
        // 派发更新
        tigger(target, TriggerOpTypes.DELETE, key)
    }

    // 返回删除结果
    return result
}

/**
 * 对代理的一些配置
 */
export const handlers = {
    /**
     * 拿到属性值
     * 读
     * 读的时候,会做依赖收集:
     *  1. 依赖收集的意思是,哪个对象的哪个属性,被哪个函数用到了,就把那个函数收集起来,记录一下对应关系
     * 读可以被理解为读某一种信息,不止是读某一个属性,判断某个属性是否存在,也需要被收集起来
     */
    // 可以通过get的拦截器获取到当前的this指向,即代理对象
    get,

    /**
     * 设置属性值
     * 写
     * 写的时候,会做派发更新:
     *  1. 派发更新的意思是,根据之前收集的对应关系,高速这个set方法,你改了哪个对象的哪个属性,我把它对应的函数都执行一遍
     */
    set,

    // 需要再加一个拦截器,因为in操作符不会触发get方法,所以需要拦截in操作符
    // 需要判断哪个对象的哪个属性是否存在
    has,

    // 遍历需要知道哪个对象的哪个属性被遍历了
    ownKeys,

    // 删除的时候,也需要派发更新
    deleteProperty,
}