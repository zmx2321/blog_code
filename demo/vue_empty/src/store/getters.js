/**
 * 全局数据响应
 */
 export default {
    title: state => state.common.title,  // 标题
    userInfo: state => state.user.userInfo,  // 用户信息
    loginUser: state => state.user.loginUser  // 登录用户
}