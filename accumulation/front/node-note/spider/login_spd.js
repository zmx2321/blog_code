const cheerio=require("cheerio");
const request = require('request');

const CryptoJS = require('crypto-jS');  // 加密

let config = {
    loginUrl: 'https://www.oschina.net/action/user/hash_login?from=',  // 登录地址
    homeUrl: 'https://www.oschina.net/', // 首页
    username: '18329042835',
    password: '123456789'
}

/**
* @desc 模拟登录开源中国
*/
let loginOschina = ()=> {
  let option = {
    url: config.loginUrl,
    method: 'POST',
    form: {
      email: config.username,
      pwd: CryptoJS.SHA1(config.password).toString(),
      verifyCode: '',
      ave_login: '1'
    }
  }
  request(option, (err, req, res) => {
    // console.log(req.headers['set-cookie']);  // 获取cookie ！！！重要
    let option = {
      url: config.homeUrl,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'Cookie': req.headers['set-cookie'],
      }
    }
    request(option, (err, req, res) => {
      $ = cheerio.load(res);
      let name = $('#userSidebar > div > h3').text()

      if (name) {
        console.log('登录成功，昵称为:', name)
      }
    })
  })
}

loginOschina(config)

















// const uri = 'https://www.douban.com/'
// const uri = 'https://accounts.douban.com/passport/login'
// const uri = 'https://accounts.douban.com/j/mobile/login/basic'
// const uri = 'https://movie.douban.com/tag/#/?sort=U&range=0,10&tags=&start=0'

/* let loginMsg = {
    username:"18329042835",
    password:"123456789a",
};

var options = {
    url: 'https://accounts.douban.com/j/mobile/login/basic',
    headers: {
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4449.6 Safari/537.36',
        'User-Agent': 'request',
    }
  }; */

 /*  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info.stargazers_count + " Stars");
      console.log(info.forks_count + " Forks");
    }
  } */

/* // 请求头文件
let headers = {
    // 模拟浏览器 - 反爬虫
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4449.6 Safari/537.36',
}
 */

/* request(options, (err, res, body)=> {
    // let $ = cheerio.load(body);
    // console.log($.html());

    console.log(body);

// // 获取dom树
// // 如果没有报错，并且页面的状态码是200
// if(!err && res.statusCode == 200) {
//     let $ = cheerio.load(body);

//     callback($);
// } else {
//     console.log(err.message)
// }
});
 */

