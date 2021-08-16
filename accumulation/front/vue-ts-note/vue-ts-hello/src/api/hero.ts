import axios from "axios"

/* export function getResultAxios<T>() {
    // 使用get方法的时候，没有传递任何类型，他就不知道返回什么类型，只能用any表示
    return axios.get<T>('/api/heros')
} */

export const getResultAxios = <T>() => {
    return axios.get<T>('/api/heros')
};