const dbConfig = require('../util/dbconfig');  // 数据库配置

validatePhone = [];  // 存放手机号和验证码

// 获取验证码(4位随机数)
let rand = (min, max)=> {
    return Math.floor(Math.random()*(max-min)) + min;
}

// 判断是否发送过验证码
let isSendCode = phone=> {
    for(let item of validatePhone) {
        if(phone == item.phone) {
            return true;
        }
    }

    return false;
}

// 验证码和手机号是否匹配
let findCodeAndPhone = (phone, code)=> {
    for(let item of validatePhone) {
        if(phone == item.phone && code == item.code) {
            return 'login'
        }
    }

    return 'error'
}

// 检测验证码登陆是否是第一次登陆(异步使用promise)
let phoneLoginBind = async phone=> {
    let sql = "select * from user where  username = ? or phone = ?";
    let sqlArr = [phone, phone];

    let res = await dbConfig.sySqlConnect(sql, sqlArr);

    // 判断是否有值
    if(res.length) {
        // 如果用户已经注册了，获取用户信息
        // 获取用户信息详情
        res[0].userinfo = await getUserInfo(res[0].id);

        return res;
    } else {
        // 如果是第一次登陆，就需要进行注册，绑定表
        let res = await regUser(phone);

        // 获取用户信息详情
        res[0].userinfo = await getUserInfo(res[0].id);

        return res;
    }
}

// 用户注册
let regUser = async phone=> {
    // 检测用户是否第一次注册
    let userpic = 'http://xxx/test.png';  // 头像
    let sql = "INSERT INTO user(username, userpic, phone, create_time) VALUES (?, ?, ?, ?)";
    // 用户名默认手机号
    let sqlArr = [phone, userpic, phone, (new Date()).valueOf()];

    let res = await dbConfig.sySqlConnect(sql, sqlArr);

    // 判断数据库操作是否执行成功(成功1 不成功-1)
    if(res.affectedRows === 1) {
        // 获取用户信息
        let user = await getUser(phone);

        // 绑定用户父表
        let userinfo = await createUserInfo(user[0].id);
        if(res.affectedRows === 1) {
            return userinfo;
        } else {
            return false;
        }
    } else {
        // 执行不成功
        return false;
    }
}

// 获取用户信息
let getUser = username=> {
    let sql = "sqlect * from user where id=? or phonr=? or username=?";
    let sqlArr = [username, username, username];

    return dbConfig.sySqlConnect(sql, sqlArr);
}

// 创建用户副表(userinfo)
let createUserInfo = (user_id)=> {
    let sql = "insert into userinfo(userid, age, sex, path) value(?, ?, ?, ?)";
    let sqlArr = [user_id, 18, '女', '无'];

    return dbConfig.sySqlConnect(sql, sqlArr);
}

// 获取注册的用户详情
let getUserInfo = (userid)=> {
    let sql = "select age, sex, path, birthday from userinfo where userid = ?";
    let sqlArr = [userid];

    return dbConfig.sySqlConnect(sql, sqlArr);
}

// 模拟验证码发送接口
let sendCode = (req, res)=> {
    let phone = req.query.phone;  // 获取前端输入的手机号

    // 如果已经发送过验证码
    if(isSendCode(phone)) {
        res.send({
            'code': 400,
            'msg': '已经发送过验证码，稍后再发'
        });
    }

    // 验证码
    let code = rand(1000, 9999);

    // 验证码数组
    validatePhone.push({
        'phone': phone,
        'code': code
    });
    // console.log(validatePhone);

    // 返回的参数
    res.send({
        'code': 200,
        'msg': '发送成功'
    });
    console.log("您的验证码是：", code);
}

// 验证码登陆
let codePhoneLogin = async (req, res)=> {
    let { phone, code } = req.query;

    // 该手机号是否发送过验证码
    if(isSendCode(phone)) {
        // 验证码和手机号是否匹配
        let status = findCodeAndPhone(phone, code);

        // 登陆成功
        // 登陆成功之后的操作
        // 检测验证码登陆是否是第一次登陆
        let user  = await phoneLoginBind(phone);

        if(status == 'login') {
            // 登陆成功
            res.send({
                'code': 200,
                'msg': '登陆成功',
                'data': user[0]
            });
        } else if(status == 'error') {
            // 登陆失败
            res.send({
                'code': 400,
                'msg': '登陆失败'
            });
        }
    } else {
        // 如果没有发送
        res.send({
            'code': 400,
            'msg': '未发送验证码'
        });
    }
}

module.exports = {
    sendCode,  // 模拟验证码发送接口 - 交给user.js注册路由
    codePhoneLogin  // 验证码登陆
}