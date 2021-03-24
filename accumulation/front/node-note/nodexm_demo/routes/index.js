const express = require('express');
const router = express.Router();
const cate = require('../controllers/cateController');

// 注册获取分类路由
router.get('/', cate.getCate);

// 注册获取指定分类的文章路由
router.get('/getPostCate', cate.getPostCate);

module.exports = router;











// const dbConfig = require('../util/dbconfig');

// // 页面显示出来的消息
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   /* let sql = "select * from cate";
//   let sqlArr = [];
//   let callback = (err, data)=> {
//     if(err) {
//       console.log("连接出错");
//     } else {
//       // 如果连接正常，返回接口数据
//       res.send({
//         'list': data
//       });
//     }
//   }

//   dbConfig.sqlConnect(sql, sqlArr, callback); */

//   // res.render('index', { title: 'Express' });
// });

// module.exports = router;
