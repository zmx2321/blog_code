const mysql = require('mysql');
module.exports = {
  config: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'learn'
  },
  sql_connect: function (sql, arr, callBack) {
    var pool = mysql.createPool(this.config);
    pool.getConnection((err, conn) => {
      if (err) return console.log(err + 'dbconfig连接函数出错');
      conn.query(sql, arr, callBack);
      conn.release();
    })
  },
  // sql_connect_async: function (sysql, sql_arr) {
  //   return new Promise((resolve, reject) => {
  //     var pool = mysql.createPool(this.config);
  //     pool.getConnection((err, conn) => {
  //       if (err) return reject(err)
  //       else {
  //         conn.query(  // 事件驱动回调
  //           sysql,
  //           sql_arr,
  //           // (err, data) => err ? reject(err) : resolve(data)
  //           (err, data) => {
  //             if (err) reject(err)
  //             else resolve(data)
  //           }
  //         )
  //         conn.release();  // 释放连接
  //       }
  //     })
  //   }).catch(err => {
  //     console.log(err + 'sql_connect_async函数出错')
  //   })
  // }
    sql_connect_async: function (sysql, sql_arr) {
    return new Promise((resolve, reject) => {
      var pool = mysql.createPool(this.config);
      pool.getConnection((err, conn) => {
        if (err) return reject(err)
        else {
          conn.query(sysql, sql_arr, (err, data) => {
            if (err) {
              reject(err)
            }
            else {
              resolve(data)
            }
          })
          conn.release();  // 释放连接
        }
      })
    }).catch(err => {
      console.log(err + 'sql_connect_async函数出错')
    })
  }
};

