const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

// 注册路由
// 由于app.js中 app.use('/users', usersRouter)
// 地址实际为 /users/sendCode
// 使用post请求 - 使用postman
// 由于是post请求，要装一个中间件(body-parser)
// 在app.js中引用插件
router.post('/sendCode', user.sendCode);

// 验证码登陆
router.post('/codePhoneLogin', user.codePhoneLogin);

module.exports = router;
