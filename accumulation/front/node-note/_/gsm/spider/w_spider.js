/**
 * @fileOverview 获取四川水电数据
 * @author zmx2321
 * @by 2021-3-30
*/

const request = require('request');  // 请求静态资源数据比较方便
const superagent = require('superagent');  // 向服务器发起http请求，修改请求头文件比较方便(链式和键值对的方式)
const cheerio = require('cheerio');  // 把字符串解析成html，并可用jquery核心选择器获取内容

let urlObj = {
    mainUrl: 'http://xxx.html',  // 主页面 - 具体值以iframe的形式嵌入
    uriTitle: 'https://xxx.html',  // 页面地址(只含标题)
    uriDetail: 'https://xxx'  // 请求接口获取数据
}

// 获取标题
let getTitle = ()=> {
    // 执行异步请求
    return new Promise((resolve, reject)=> {
        request(urlObj.uriTitle, (err, res)=> {
            // 如果没有报错，并且页面的状态码是200
            if(!err && res.statusCode == 200) {
                let $ = cheerio.load(res.body);

                let title = $('table').text();

                // console.log($.html());

                resolve(title);
            } else {
                reject("获取数据错误!");
            }
        })
    });
}

// 获取详情数据
let getDetail = ()=> {
    let query = {
        rnd: new Date().getTime()
    }

    // 执行异步请求
    return new Promise((resolve, reject)=> {
        superagent.get(urlObj.uriDetail)
                  .query(query)
                  .end((err, res)=> {
                      if(!err) {
                        let $ = cheerio.load(res.text);

                        let detail = $.text();

                        resolve(detail);
                      } else {
                        reject("获取数据错误!");
                      }
                  });
    });
}

module.exports = {
    getTitle,  // 获取标题
    getDetail,  // 获取详情数据
}