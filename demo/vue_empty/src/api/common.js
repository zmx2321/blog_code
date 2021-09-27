/**
 *  用以请求接口数据
 */

import axios from './axios'

let base = "/api";

/**
 * common
 */
// 上传图片
export const getImgURI = params => {
    return  axios({
        url: `${base}/upload/uploadImage`,
        method: 'post',
        data: params
    });
};