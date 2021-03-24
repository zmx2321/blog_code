const express = require('express');
// 由于是post请求，要装一个中间件(body-parser)
const boayParser = require('body-parser');
const path = require('path');
const http = require('http');

const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));

// post请求需要使用中间件，注册中间件
// 为true表示支持post请求
app.use(boayParser.urlencoded({extended: true}));

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

server.listen('3000', ()=> console.log('服务器启动成功：port：http://localhost:3000'));