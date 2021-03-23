/* const http = require('http');
const https = require('https'); */
const fs = require('fs');
const url = require('url');

// 简单的输出
/* let req = http.request({
    'hostname': 'nodejs.cn',
    'path': '/download/'
}, res=> {
    let arr = [];
    let str = '';

    // 获取post请求的数据需要用on
    res.on('data', buffer=> {
        arr.push(buffer);

        str += buffer;
    })

    res.on('end', ()=> {
        // console.log(str);

        fs.writeFile('download.txt', str, {
            encoding: 'utf-8'
        }, ()=> {})
    })
});

req.end(); */

// 下载图片
/* let req = https.request({
    'hostname': 'zmx2321.github.io',
    'path': '/blog/images/hodgepodge/food-menu/hspg.jpg'
}, res=> {
    let arr = [];

    // 获取post请求的数据需要用on
    res.on('data', buffer=> {
        arr.push(buffer);
    })

    res.on('end', ()=> {
        // 抓取图片必须使用buffer
        // console.log(buffer);
        console.log(arr);

        let b = Buffer.concat(arr)

        fs.writeFile('test.jpg', b, ()=> {
            console.log("抓取成功");
        })
    })
});

req.end(); */

// 使用url库
/* let str = 'https://zmx2321.github.io/blog/pages/hodgepodge/food-menu/food-menu-1.html';

let urlObj = url.parse(str);
console.log(urlObj);  // 可以将url拆解形成一个对象 */

// 封装
let getUrl = (sUrl, succ)=> {
    let urlObj = url.parse(sUrl);
    let httpObj = {};

    // 如果是http
    // 块级作用域，let找不到
    if(urlObj.protocol == 'http:') {
        httpObj = require('http');
    } else {
        httpObj = require('https');
    }
    // console.log(httpObj);

    let req = httpObj.request({
        'hostname': urlObj.hostname,
        'path': urlObj.path,
    }, res=> {
        let arr = [];

        res.on('data', buffer=> {
            arr.push(buffer)
        });

        res.on('end', ()=> {
            // console.log(arr);
    
            let b = Buffer.concat(arr)
            // console.log(b);

            succ(b)
        })
    });

    req.end();
    // req.on('error');
}
getUrl('https://zmx2321.github.io/blog/images/hodgepodge/food-menu/hspg.jpg', data=> {
    fs.writeFile('test.jpg', data, ()=> {
        console.log("抓取成功");
    })
});
