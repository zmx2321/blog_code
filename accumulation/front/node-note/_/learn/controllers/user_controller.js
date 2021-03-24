const db_config = require('../utils/db_config');
const fs = require('fs');
let validatePhineCode = [];

function sendCode(req, res, next) {
  const phone = req.query.phone;
  if (sendCodeP(phone)) {
    return res.send({ code: 400, msg: '验证码已发送！' })
  }
  const code = random(1000, 9999);
  validatePhineCode.push({
    code: 200,
    msg: '发送成功',
    phone,
    验证码: code,
  });
  res.send({ code: 200, msg: '发送成功', 验证码: code })

  // const sql = 'select * from user';
  // const sql_arr = [];
  // function callBack(err, data) {
  //   console.log(data)
  //   if (err) console.log('连接出错');
  //   else {
  //     res.send({ 'data': data })
  //   }
  // };
  // db_config.sql_connect(sql, sql_arr, callBack)
};
async function codePhoneLogin(req, res, next) {
  const { phone, code } = req.query;
  if (findCode_and_phone(phone, code)) {
    const user = await phoneLoginBind(phone);
    return res.send({ code: 200, msg: '登录成功', data: user[0] })
  };
  return res.send({ code: 400, msg: '验证码不匹配~！' })
};
function login(req, res, next) {
  const { username, password, email, phone } = req.query;
  console.log(username, password, email)
  const reg_phone = /^1[3456789]\d{9}$/;
  const reg_email = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+.([a-z-A-Z]{2,4})$/;
  if (reg_phone.test(username)) {
    const sql = 'select * from user where phone=? and password=? or username=? and password=?';
    const sql_arr = [username, password, username, password]
    async function callBack(err, data) {
      if (err) return res.send({ code: 400, msg: '登录信息不正确！' })
      if (data === []) return res.send({ code: 400, msg: '用户或密码不正确', data: [] })
      const user_id = data[0].id;
      const result = await getUserInfo(user_id);
      data[0].userinfo = result[0];
      res.send({ code: 200, msg: '登录成功！', data: data[0] })
    };
    db_config.sql_connect(sql, sql_arr, callBack);
  }
  else if (reg_email.test(email)) {
    const sql = 'select * from user where email=? and password=?';
    const sql_arr = [email, password];
    async function callBack(err, data) {
      if (err) return res.send({ code: 400, msg: '出错了' })
      if (data === []) return res.send({ code: 400, msg: '邮箱或密码不正确！', data: [] })
      const user_id = data[0].id;
      const result = await getUserInfo(user_id);
      data[0].userinfo = result[0];
      res.send({ code: 200, msg: '登录成功！', data: data[0] })
    };
    db_config.sql_connect(sql, sql_arr, callBack);
  }
  else {
    console.log('3')
    const sql = 'select * from user where phone=? and password=?';
    const sql_arr = [username, password];
    async function callBack(err, data) {
      if (err) return res.send({ code: 400, msg: '登录信息不正确！' });
      if (data === []) return res.send({ code: 400, msg: '用户或密码不正确', data: [] });
      const user_id = data[0].id;
      const result = await getUserInfo(user_id);
      data[0].userinfo = result[0];
      res.send({ code: 200, msg: '登录成功！', data: data[0] });
    };
    db_config.sql_connect(sql, sql_arr, callBack);
  }
};
// 修改资料
async function editUserInfo(req, res, next) {
  const { user_id, username, age, sex, job, path, birthday } = req.query;
  const bool = await setUserName(user_id, username);
  if (bool) {
    const result = await setUserInfo(user_id, age, sex, job, path, birthday);
    if (result.length) res.send({code: 200, msg: '修改成功', data: result[0]});
    else res.send({code: 400, msg: '修改失败', data: []});
  }
  else {
    return res.send({code: 400, msg: '修改失败', data: []});
  }
}
// 修改密码
async function setPassword(req, res, next) {
  const {user_id, oldPwd, newPwd } = req.query;
  const userPwd = await checkUserPwd(user_id);
  console.log(user_id, oldPwd, newPwd)
  if (userPwd) {
    if (oldPwd === userPwd) {
      const sql = 'update user set password=? where id=?';
      const sql_arr = [newPwd, user_id];
      const result = await db_config.sql_connect_async(sql, sql_arr);
      if (result.affectedRows === 1) {
        res.send({code: 200, msg: '修改成功！'});
      }
      else{
        res.send({code: 400, msg: '修改失败！'});
      }
    }
    else {
      console.log(oldPwd, newPwd)
      res.send({code: 200, msg: '新旧密码不一致！'});
    }
  }
  else {
    const sql = 'update user set password=? where id=?';
    const sql_arr = [newPwd, user_id];
    const result = await db_config.sql_connect_async(sql, sql_arr);
    if (result.affectedRows === 1) {
      res.send({code: 200, msg: '修改成功！'});
    }
    else{
      res.send({code: 400, msg: '修改失败！'});
    }
  }
}
// 绑定邮箱
async function bindEmail(req, res, next) {
  const { user_id, email } = req.query;
  const sql = 'update user set email=? where id=?';
  const sql_arr = [email, user_id];
  const result = await db_config.sql_connect_async(sql, sql_arr);
  if (result.affectedRows === 1) res.send({code: 200, msg: '绑定邮箱成功！'})
  else res.send({code: 200, msg: '绑定邮箱失败！'})
};
// 退出登录
async function logOut(req, res, next) {
  validatePhineCode = [];
  res.send({code: 200, msg: '退出登录'});
}
// 单图片上传
function uploadfile(req, res, next) {
  if (req.file.length === 0) return res.render('error', {message: '上传文件不能为空！'});
  else {
    const file = req.file;
    fs.renameSync('./public/uploads/'+ file.filename, './public/uploads/'+ file.originalname)
    res.set({'content-type': 'application/json; charset=utf-8'});
    const { user_id } = req.query;
    const img_src = 'http://localhost:3000/uploads/' + file.originalname;
    const sql = 'update user set avatar=? where id=?';
    const sql_arr = [img_src, user_id];
    db_config.sql_connect(sql, sql_arr, function (err, data){
      if (err) return console.log(err);
      if (data.affectedRows === 1) res.send({code: 200, msg: '修改成功'});
      else res.send({code: 400, msg: '修改失败！'});
    });

  }
};
// 多图片上传
function upMorefile(req, res, next) {
  const { files, user_id } = req;
  if (files.length === 0) return res.render('err', {message: '上传图片不能为空！'});
  if (files.length > 9) return res.render('err', {message: '批量上传图片数量最多为9张！'});
  res.set({'content-type': 'application/json; charset=utf-8'});
  Array.prototype.forEach.call(files, (file, index) => {
    fs.renameSync('./public/uploads/'+ file.filename, './public/uploads/'+ file.originalname);
    const url = 'http://localhost:3000/uploads/' + file.originalname;
    const sql = 'insert into image(url, create_time, user_id) values(?, ?, ?)';
    const sql_arr = [url, (new Date().valueOf()), user_id];

    db_config.sql_connect(sql, sql_arr, function(err, data) {
      if (data.affectedRows === 1) {
        if (index + 1 === files.length) res.send({code: 200, msg: '上传成功'});
      }
      else {
        res.send({code: 400, msg: '上传失败！'});
      }
    })
  })
};
// 发布视频
async function publish(req, res) {
  const {user_id, title, url, path, visible, cover } = req.query;
  const sql = 'insert into list (user_id, title, url, path, visible, cover, create_time) values(?, ?, ?, ?, ?, ?, ?)';
  const sql_arr = [user_id, title, url, path, visible, cover, (new Date().valueOf()) ];
  const post_id = await db_config.sql_connect_async(sql, sql_arr).then(data => data.insertId).catch(err => false);
  if (post_id) res.send({code: 200, msg: '发布成功！'})
  else res.send({code: 400, msg: '发布失败！'})
}
// 工具方法
function sendCodeP(phone) {
  for (var item of validatePhineCode) {
    if (phone == item.phone) {
      return true;
    }
    return false;
  }
}
function findCode_and_phone(phone, code) {
  for (var item of validatePhineCode) {
    if (phone === item.phone && parseInt(code) === item['验证码']) {
      return true
    }
  }
}
// 监测是否是第一次登录
async function phoneLoginBind(phone) {
  const sql = 'select * from user where username=? or phone=?';
  const sql_arr = [phone, phone];
  let res = await db_config.sql_connect_async(sql, sql_arr);
  if (res.length) {
    res[0].userinfo = await getUserInfo(res[0].id);
    return res;
  }
  else {
    let res = await registerUser(phone);
    res[0].userinfo = await getUserInfo(res[0].id);
    return res;
  }
};
// 注册信息
async function registerUser(phone) {
  const avatar = 'https://profile.csdnimg.cn/B/4/F/2_anonymous996';
  const sql = 'insert into user(username, avatar, phone, create_time) values(?, ?, ?, ?)';
  const sql_arr = ['就叫小王吧', avatar, phone, (new Date().valueOf())];
  const res = await db_config.sql_connect_async(sql, sql_arr);
  if (res.affectedRows == 1) {
    const user = await getUser(phone);
    let userinfo = await createUserInfo(user[0].id);  // 创建用户副表
    const Throw = userinfo.affectedRows == 1 ? user : false;
    return Throw;
  }
  else return false;
};
// 取用户信息
async function getUser(username) {
  const sql = 'select * from user where phone=? or username=? or id=?';
  const sql_arr = [username, username, username];
  return db_config.sql_connect_async(sql, sql_arr);
}
// 创建表
function createUserInfo(user_id) {
  const sql = 'insert into userinfo(user_id, age, sex, job) values(?, ?, ?, ?)'
  const sql_arr = [user_id, 18, '男', '飞行员'];
  return db_config.sql_connect_async(sql, sql_arr);
};
// 获取注册的用户详情
function getUserInfo(user_id) {
  const sql = 'select age, sex, job, path, birthday from userinfo where user_id'
  const sql_arr = [user_id];
  return db_config.sql_connect_async(sql, sql_arr);
};
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
};
// 查看用户详情
async function findUserInfo(user_id) {
  const sql = 'select * from userinfo where user_id=?';
  const sql_arr = [user_id];
  const res = await db_config.sql_connect_async(sql, sql_arr);
  if (res.length) return true;
  return false;
};
// 设置用户
async function setUserInfo(user_id, age, sex, job, path, birthday) {
  if (findUserInfo(user_id)) {
    const sql = 'update userinfo set age=?, sex=?, job=?, path=?, birthday=? where user_id = ? ';
    const sql_arr = [age, sex, job, path, birthday, user_id]
    const res = await db_config.sql_connect_async(sql, sql_arr);
    if (res.affectedRows === 1) {
      const user = await getUser(user_id);
      const userinfo = await getUserInfo(user_id);
      user[0].userinfo = userinfo[0];
      return user;
    }
    return false
  }
  else {
    const sql = 'insert into userinfo (user_id, age, sex, job, path, birthday) values(?, ?, ?, ?, ?, ?)'
    const sql_arr = [user_id, age, sex, job, path, birthday];
    const res = await db_config.sql_connect_async(sql, sql_arr);
    if (res.affectedRows === 1) {
      const user = await getUser(user_id);
      const userinfo = await getUserInfo(user_id);
      user[0].userinfo = userinfo[0];
      return user;
    }
    return false;
  }
}
// 修改用户名称
async function setUserName(user_id, username) {
  const sql = 'update user set username=? where id=?';
  const sql_arr = [username, user_id];
  const res = await db_config.sql_connect_async(sql, sql_arr);
  if (res.affectedRows === 1) return true;
  return false;
};
// 检查用户密码
async function checkUserPwd(user_id) {
  const sql = 'select * from user where id=?';
  const sql_arr = [user_id];
  const res = await db_config.sql_connect_async(sql, sql_arr);
  if (res.length) return res[0].password;
  return 0;
};

module.exports = {
  sendCode,
  codePhoneLogin,
  login,
  editUserInfo,
  setPassword,
  bindEmail,
  logOut,
  uploadfile,
  upMorefile,
  publish
}