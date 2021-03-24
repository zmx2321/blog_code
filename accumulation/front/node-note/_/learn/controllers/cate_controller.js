const db_config = require('../utils/db_config');

// 获取分类
function getCate(req, res, next) {
  const sql = 'select * from cate';
  const sql_arr = [];
  function callBack(err, data) {
    console.log(data)
    if(err) console.log('连接出错');
    else {
      res.send({'data': data})
    }
  };
  db_config.sql_connect(sql, sql_arr, callBack)
};

function postCate(req, res, next) {
  const { id } = req.query;
  const sql = 'select * from post where cate_id=?';
  const sql_arr = [id];
  function callBack(err, data) {
    if (err) return console.log('连接出错');
    res.send({'data:': data});
  };
  db_config.sql_connect(sql, sql_arr, callBack)
}

module.exports = {
  getCate,
  postCate
}