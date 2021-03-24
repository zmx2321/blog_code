const express = require('express');
const path = require('path');
const http = require('http');

const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

server.listen('3000', ()=> console.log('服务器启动成功：port：http://localhost:3000'));