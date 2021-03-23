const request = require('request');
const cheerio = require('cheerio');
var mysql = require('mysql');

// 连接数据库
/* const connection = mysql.createConnection({
    host: "localhost", //远程地址，本地MySQL是localhost
    user: "root",
    password: "root"
})

connection.connect(function (err) {
    console.log(err);
    if (err) {
        console.log("连接错误");
        return;
    }
    console.log("成功连接MySQL")
})

connection.end(); */

const uri = 'https://www.sina.com.cn/';

 // 创建数据库连接
let db = mysql.createConnection({
    host:     '127.0.0.1',
    user:     'root',
    password: 'root',
    database: 'spider_data'
});

// db.connect();
db.connect(function (err) {
    // console.log(err);
    if (err) {
        console.log("连接错误");
        return;
    }
    
    console.log("成功连接MySQL")
})

// require http会显示不支持https，所以这里只能使用request
let getNeworkData = (uri, callback)=>{
  request(uri, function (err, res, body) {
    // console.log(body);

    // 获取dom树
    // 如果没有报错，并且页面的状态码是200
    if(!err && res.statusCode == 200) {
      let $ = cheerio.load(body);

      callback($);
    } else {
      console.log(err.message)
    }
  });
}

getNeworkData(uri, $=>{
    // console.log($(this).text());

    let arr = [];

    $('.news_top li').each(function(){
        // console.log($(this).text());

        arr.push($(this).text());
    });

    // console.log(arr);

    let sql = "insert into news set title=?";

    arr.forEach(i=> {
        // console.log(i);

        db.query(sql, i, function(err, result) {
            if (err) throw err;
    
            if (!!result) {
                console.log('插入成功');
                console.log(result.insertId);
            } else {
                console.log('插入失败');
            }
        });
    });

    db.end();
});