const db_config = require('../utils/db_config');

async function follow(req, res, next) {
  const { user_id, follow_id } = req.query;
  if (!await checkFollow(user_id, follow_id)) {
    if (user_id === follow_id) return res.send({code: 400, msg: '不能关注自己'})
    else{
      const sql = 'insert into follow (follow_id, user_id, create_time) values(?, ?, ?)';
      const sql_arr = [follow_id, user_id, (new Date()).valueOf()];
      const result = await db_config.sql_connect_async(sql, sql_arr);
      if (result.affectedRows === 1) {
        res.send({code: 200, msg: '关注成功！'})
      }
      else res.send({code: 400, msg: '关注失败！'})
    }
  } else res.send({code: 400, msg: '不能重复关注！'}) 
};

// 工具函数

// 检查用户是否关注
async function checkFollow(user_id, follow_id) {
  const sql = 'select * from follow where user_id = ? and follow_id=?';
  const sql_arr = [user_id, follow_id];
  const result = await db_config.sql_connect_async(sql, sql_arr);
  if (result.length) return true;
  return false;
}
module.exports = {
  follow
};