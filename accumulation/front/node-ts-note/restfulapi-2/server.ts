import express from 'express';
import { 
    apiGetPosts,  // posts接口
 } from './api/posts/apiGetPosts'
import { 
    apiGetPostsDetail,  // postsDetail接口
 } from './api/posts/apiGetPostsDetail'

const app = express();  // 实例化

// 打包上线时可以识别端口号
// 启动一个端口
app.listen(process.env.PORT || 8091, ()=> {
    console.log('Server started...');
});

// 实现posts接口
app.get("/posts", apiGetPosts);  // posts接口
app.get("/posts/:id", apiGetPostsDetail);  // postsDetail接口

// 监听路由
// 根路径
app.get("/", (req, res, next)=> {
    res.send('node ts api is working...');
});
