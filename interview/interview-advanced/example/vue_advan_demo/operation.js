// 依赖收集 - 读
export const TrackOpTypes = {
    GET: 'get',  // 读取属性值
    HAS: 'has',  // 判断属性是否存在
    ITERATE: 'iterate',  // 遍历属性
}

// 派发更新 - 写
export const TriggerOpTypes = {
    SET: 'set',  // 设置属性值
    ADD: 'add',  // 添加属性
    DELETE: 'delete',  // 删除属性
}