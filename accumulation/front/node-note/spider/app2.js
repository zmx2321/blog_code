const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const uri = 'http://sports.sina.com.cn/nba/1.shtml';

// require http会显示不支持https，所以这里只能使用request
/* let getNeworkData = (uri, callback)=>{
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
} */

// // 封装一个请求数据的方法
// getNeworkData(uri, $=>{
//     // console.log($.html());
//     console.log($.text());

//   $('#right a').each(function(){
//     // console.log($(this).text());

//     /* // 获取子页面链接
//     let newsUrl = $(this).attr('href');
//     // console.log(newsUrl);

//     // 请求子页面
//     getNeworkData(newsUrl, $=>{
//       console.log($('#artibody').text());

//       let article = $('#artibody').text();
//       let timeStr = new Date().valueOf();

//       fs.writeFileSync('./news/' + timeStr + '.txt', article);
//     }) */
//   })
// })

// 异步封装方法
const requestPromise = uri=> {
    return new Promise((resolve, reject)=> {
        request(uri, (err, res, body)=> {
            // resolve();
            if(res.statusCode === 200) {
                let $ = cheerio.load(body);

                // 成功的时候返回dom
                resolve($);
            } else {
                // 报错的时候抛出异常
                reject(err);
            }
        })
    });
}

// 获取结果
requestPromise(uri).then($=> {
    // 如果是正常的请求
    // console.log($.html());
    // console.log($.text());

    $('#right a').each(function(){
        // console.log($(this).text());
        // console.log($(this).attr('href'));

        getArticle($(this).attr('href'));
    })
});

// 获取文章
let getArticle = async uri=> {
    // 要等到这个函数执行完之后才拿到结果
    let $ = await requestPromise(uri); 
    // console.log($.html());

    let article = {
        name: $('.main-content.w1240 > h1').text(),
        desc: $('#artibody').text()
    }

    console.log(article);
}

/* arr.reduce((res, url)=> {
    return new Promise(async resolve=> {
        await getList(url);  // 等这个方法执行完之后
        resolve();
    });
}, Promise.resolve()); */