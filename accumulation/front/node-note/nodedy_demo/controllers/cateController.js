const dbConfig = require('../util/dbconfig');  // 数据库配置

// 获取分类
let getCate = (req, res)=> {
    let sql = "select * from cate";
    let sqlArr = [];
    let callback = (err, data)=> {
        if(err) {
            console.log("连接出错");
        } else {
            // 如果连接正常，返回接口数据
            res.send({
            'list': data
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 获取指定分类的文章列表
// 写完之后注册路由
let getPostCate = (req, res)=> {
    let { id } = req.query;  // 分类id  => req.query.id

    // select * from post where cate_id = 1
    let sql = "select * from post where cate_id = ?";
    let sqlArr = [id];
    let callback = (err, data)=> {
        if(err) {
            console.log("连接出错");
        } else {
            // 如果连接正常，返回接口数据
            res.send({
            'list': data
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

module.exports = {
    getCate,  // 获取分类
    getPostCate  // 获取指定分类的文章列表
}