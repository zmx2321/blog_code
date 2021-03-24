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
let codePhoneLogin = (req, res)=> {
    let { phone, code } = req.query;

    // 该手机号是否发送过验证码
    if(isSendCode(phone)) {
        // 验证码和手机号是否匹配
        let status = findCodeAndPhone(phone, code);

        // 登陆成功
        // 登陆成功之后的操作
        if(status == 'login') {
            // 登陆成功
            res.send({
                'code': 200,
                'msg': '登陆成功'
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