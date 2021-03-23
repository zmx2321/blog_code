const fs = require('fs');

// 简单的异步读取文件
/* fs.readFile('test.txt', (err, data)=> {
    if(err) {
        return console.error(err);
    }

    console.log('异步读取:' + data.toString());
}) */

// 简单的同步读取文件
/* let data = fs.readFileSync('test.txt');
console.log('同步读取:' + data.toString());
console.log("程序执行完毕"); */

// 打开文件
/* console.log('准备打开文件!');
fs.open('test.txt', 'r+', (err, fd)=> {
    if(err) {
        return console.err(err);
    }

    console.log('文件打开成功', fd);
}); */

