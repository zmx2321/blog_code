export const isObject = (val) => {
    return typeof val === 'object' && val !== null
}

// 判断两个值是否相等
export const hasChanged = (val, oldVal) => {
    return !Object.is(val, oldVal)
}