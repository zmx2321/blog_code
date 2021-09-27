/**
 * utils
 */

// 深拷贝
export const deepClone = (obj = {}) => {
    // obj是null，或者不是对象或数组，直接返回
    if (typeof obj !== 'object' || obj == null) {
        // 递归里面，如果是值，直接返回
        return obj
    }

    // 递归中如果遇到对象里面的值是对象或者数组，走下面的逻辑
    // 初始化返回结果
    let result;
    // 判断是否是数组
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }

    // 无论对象还是数组，都可以使用for in遍历
    for (let key in obj) {
        // 判断这个key是不是这个对象自身所拥有的属性
        // 保证key不是原型的属性
        if (obj.hasOwnProperty(key)) {
            // 递归(重点)
            // obj[key]表示值
            // 递归是为了防止对象中有深层次的东西，因为你不知道要拷贝的对象中有多少层
            result[key] = deepClone(obj[key]);
        }
    }

    // 返回结果
    return result
}

// 防抖
export const debounce = (fn, delay = 500) => {
    // timer是在闭包中的 => 下面的if(timer)
    // 这样不会被外界轻易拿到 => 即不对外暴露
    // 我们在外面使用不需要关心
    // 同时也是在debounce的作用域中
    // 闭包的使用场景：函数当做返回值或者参数传入
    let timer = null;

    // 函数作为返回值，这就形成闭包了
    return function () {
        // 这里面的timer需要在它定义的作用域往上寻找
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            // 触发change事件
            // 第一个参数是改变this指向
            // 第二个参数是获取所有的参数
            // apply第二个参数开始，只接收数组
            // fn函数在执行的时候，argument传进来
            // debounce返回的函数可能会传进来一些参数
            // 面试使用fn()也没问题
            // fn()
            fn.apply(this, arguments)

            // 清空定时器
            timer = null
        }, delay)
    }
}

// 节流
export const throttle = (fn, delay = 100) => {
    let timer = null  // 这个timer是在闭包里面的

    // 如果不使用apply改变this指向，下面的throttle方法的参数指向这个函数
    // 不会传给下面的那个fn
    return function () {
        if (timer) {
            return
        }

        timer = setTimeout(() => {
            // 一般写一个事件，function里面都要加上event参数，即事件对象
            fn.apply(this, arguments)  // 打印坐标

            timer = null
        }, delay)
    }
}