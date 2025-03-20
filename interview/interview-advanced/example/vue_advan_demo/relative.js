import { track, tigger } from './effect.js'

export const relative = target=> {
    return new Proxy(target, {
        get(target, key) {
            // 依赖收集
            track(target, key)
            // 返回对象的属性值
            return target[key]
        },
        set(target, key, value) {
            // 派发更新
            tigger(target, key)
            return Reflect.set(target, key, value)
        }
    })
}