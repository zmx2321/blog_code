const express = require('express')
const app = express()

const request = require('request');
const cheerio = require('cheerio');

const port = 3000

app.get('/', (req, res) => {
  // 第一个参数是报错，第二个参数是输出，第三个参数是页面的内容
  request('https://www.jikexueyuan.com', function (error, response, body) {
    // 如果没有错，并且页面的状态码是200
    if(!error && response.statusCode == 200) {
      $ = cheerio.load(body);  // 当前的$就相当于整个body的前端选择器

      // 以json格式的方式在页面输出
      // 获取导航栏ul下面的所有li
      // 判断目标网页上被$选择器选中的class数目
      res.json({
        // 'Classnum': $('.aside-allCategory').length
        'Classnum': $('ul.aside-cList li').length
      });
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})