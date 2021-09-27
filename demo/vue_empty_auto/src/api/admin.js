/**
 *  用以请求接口数据
 */

import axios from './axios'

let base = "/api";

/**
 *  登录/注销/修改密码
 */
// 登录
export const login = params => {
    return  axios({
        url: `${base}/admin/login`,
        method: 'post',
        data: params
    });
};

// 注销
export const logout = () => {
    return  axios({
        url: `${base}/admin/logout`,
        method: 'post'
    });
};

// 修改密码
export const ModifyPassword = params => {
    return  axios({
        url: `${base}/user/modify`,
        method: 'post',
        data: params
    });
};