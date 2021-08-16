import express from 'express';
const app = express();  // 实例化

// 监听路由
// 根路径
app.get("/", (req, res, next)=> {
    res.send('node ts api is working...');
});

// 再加一个路由
app.get("/tours", (req, res, next)=> {
    res.send('get tours');
});

// 再加一个路由
app.post("/tours", (req, res, next)=> {
    res.send('post a new tours');
});

// 打包上线时可以识别端口号
// 启动一个端口
app.listen(process.env.PORT || 8091, ()=> {
    console.log('Server started...');
});