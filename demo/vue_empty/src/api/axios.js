import axios from 'axios'
import { Message } from 'element-ui'

import router from '../router'

/* console.log(process.env.VUE_APP_BASE_API)
console.log(process.env) */

const Axios = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api
    timeout: 100000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    // headers: {
    //     "Content-Type": "application/json;charset=utf-8"
    // }
});

//请求拦截  设置统一header
Axios.interceptors.request.use(config => {
    // console.log(config);

    return config
}, error => {
    return Promise.reject(error)
});

//响应拦截  401 过期处理
Axios.interceptors.response.use(response => {
    // console.log(response.data.msg);

    const { code } = response.data;  //响应登录状态码

    // console.log(code);

    // 如果响应请求未登录，则返回登录页面
    if (code == -1){
        Message.error(response.data.msg);
        router.push('/login')
    }

    return response
}, error => {
    console.log(error.response);

    const { status } = error.response;  //响应错误状态
    const { data } = error.response;  //响应错误详情

    // 错误提醒
    Message.error(data.message);

    if (status === 401) {
        Message.error('登录失效，请重新登录');

        localStorage.removeItem('code');
    }

    return Promise.reject(error)
});

export default Axios;