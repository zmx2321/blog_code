/**
 *  用以请求接口数据
 */

import axios from './axios'

let base = "/api";


// 获取用户
export const getUser = () => {
    return  axios({
        url: `${base}/user/get`,
        method: 'get',
    });
};