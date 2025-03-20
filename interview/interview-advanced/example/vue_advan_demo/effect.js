// 依赖收集
export const track = (target, key) => {
    console.log('track - 依赖收集', target, key)
}

// 派发更新
export const tigger = (target, key) => {
    console.log('tigger - 派发更新', target, key)
}