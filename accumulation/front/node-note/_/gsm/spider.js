/**
 * @fileOverview 执行爬虫脚本
 * @author zmx2321
 * @by 2021-3-30
*/
const sSpider = require('./dao/w_dao');  // 数据

// 数据相关
let sOption = ()=> {
    sSpider.getData();  // 数据
}

(()=> {
    sOption();  // 数据
})();