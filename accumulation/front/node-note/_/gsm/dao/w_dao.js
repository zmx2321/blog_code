/**
 * @fileOverview 四川水电数据存库
 * @author zmx2321
 * @by 2021-3-30
*/

const dbConfig = require('../util/dbconfig');  // 数据库配置
const wData = require('../spider/w_spider');  // 获取数据

// 获取数据
let getData = async ()=> {
    // 数据初始化
    let title = "",  // 获取标题 
        detail = "";  // 获取详情数据

    // 获取标题
    try{
        title = await wData.getTitle();

        console.log(title);
    } catch(err) {
        console.log(err)
    }

    // 获取详情数据
    try{
        detail = await wData.getDetail();

        console.log(detail);
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getData,
}



// 获取分类
let getCate = (req, res)=> {
    let sql = "select * from cate";
    let sqlArr = [];
    let callback = (err, data)=> {
        if(err) {
            console.log("连接出错");
        } else {
            // 如果连接正常，返回接口数据
            console.log(data);
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

getCate();


/* // 用户注册
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
} */