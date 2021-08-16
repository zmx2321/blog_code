import express from 'express';
import { DataStore } from './data/data';
// console.log(DataStore);

const app = express();  // 实例化

// 监听路由
// 根路径
app.get("/", (req, res, next)=> {
    res.send('node ts api is working...');
});

// 实现posts接口
app.get("/posts", (req, res, next)=> {
    res.json(DataStore.posts);
});

// 实现todo接口
app.post("/todos", (req, res, next)=> {
    res.json(DataStore.todos);
});

// 打包上线时可以识别端口号
// 启动一个端口
app.listen(process.env.PORT || 8091, ()=> {
    console.log('Server started...');
});