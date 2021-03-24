var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var followRouter = require('./routes/follow');

var app = express();
var http = require('http');
var server = http.createServer(app);


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true})); // 允许post请求
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/follow', followRouter);

// 捕获404并转发到错误处理程序
// app.use((req, res, next) => next(createError(404)));

// module.exports = app;
server.listen(3000, () => console.log('服务器启动成功：port：http://localhost:3000'))
