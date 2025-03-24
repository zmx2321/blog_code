import { TrackOpTypes, TriggerOpTypes } from './operation.js'

// 依赖收集
export const track = (target, type, key) => {
    // 如果是遍历,就不需要有key
    if(type === TrackOpTypes.ITERATE) {
        console.log(`%c 依赖收集 [${type}]`, 'color: #f00')

        return
    }

    // console.log('track - 依赖收集', target, type, key)
    console.log(`%c 依赖收集 [${type}]`, 'color: #f00', key)
}

// 派发更新
export const tigger = (target, type, key) => {
    // console.log('tigger - 派发更新', target, type, key)
    console.log(`%c 派发更新 [${type}]`, 'color: #00f', key)
}