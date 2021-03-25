const mysql = require('mysql');

module.exports = {
    // 数据库配置
    config: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'exapp'  // 数据库
    },

    // 连接数据库，使用mysql的连接池的连接方式
    // 连接池对象
    // 使用连接池的好处是，在数据很大的时候，减少数据查询的时间
    sqlConnect(sql, sqlArr, callback) {
        let pool = mysql.createPool(this.config);

        pool.getConnection((err, conn)=> {
            console.log("请求页面");

            if(err) {
                console.log("连接失败");
                return;
            }

            // 事件驱动回调
            conn.query(sql, sqlArr, callback);

            // 释放连接
            conn.release();
        });
    },

    // 获取异步数据写一个promise回调
    sySqlConnect(sysql, sqlArr) {
        // 写一个promise
        return new Promise((resolve, reject)=> {
            let pool = mysql.createPool(this.config);

            pool.getConnection((err, conn)=> {
                console.log("请求页面");
    
                if(err) {
                    // 使用reject来提示错误
                    reject(err);
                } else {
                    // 事件驱动回调
                    // 直接返回数据
                    conn.query(sysql, sqlArr, (err, data)=>{
                        if(err) {
                            reject(err);
                        } else {
                            // 使用resolve返回数据
                            resolve(data);
                        }
                    });

                    // 释放连接
                    conn.release();
                }
            });
            // 使用promise最好抛出错误
        }).catch(err=> {
            console.log(err);
        });
    }
}