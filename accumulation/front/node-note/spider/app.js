const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const uri = 'http://sports.sina.com.cn/nba/1.shtml';

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

// 封装一个请求数据的方法
getNeworkData(uri, $=>{
  $('#right a').each(function(){
    // console.log($(this).text());

    // 获取子页面链接
    let newsUrl = $(this).attr('href');
    // console.log(newsUrl);

    // 请求子页面
    getNeworkData(newsUrl, $=>{
      console.log($('#artibody').text());

      let article = $('#artibody').text();
      let timeStr = new Date().valueOf();

      fs.writeFileSync('./news/' + timeStr + '.txt', article);
    })
  })
})