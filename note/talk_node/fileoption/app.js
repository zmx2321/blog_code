const fs = require('fs');

// 同步读取文件
/* // 第一个参数表示文件路径或者是文件的描述符
// 第二个参数是option，是配置选项
// 比如设置编码，默认为none，返回内容为buffer，就是二进制的
const buf = fs.readFileSync('data.txt', {
    encoding: 'utf-8'
});
// 返回字符串，文件内容
console.log(buf); */

// 异步读取
/* // 比同步多了一个回调的参数
const filedata = fs.readFile('data.txt', {
    encoding: 'utf-8'
    // 第一个参数是err
}, (err, data)=> {
    console.log(data);
}); */

// 异步写入文件
/* // 第一个参数是路径，第二个参数是内容，第三个参数是配置选项
// 最后一个参数是异步的回调，因为是写入，就不需要返回数据了
fs.writeFile('data.txt', "写入的内容", {
    encoding: 'utf-8'
}, err=> {
    // console.log(err);
}) */

// 同步写入文件
/* fs.writeFileSync('data.txt', '同步写入文件', {
    encoding: 'utf-8'
}); */

// 同步追加写入文件
/* fs.appendFileSync('data.txt', '同步追加写入文件', {
    encoding: 'utf-8'
}); */

// 异步追加写入文件
/* fs.appendFile('data.txt', "异步追加写入文件", {
    encoding: 'utf-8'
}, err=> {
    // console.log(err);
}) */

// 同步拷贝写入文件
/* // 第一个参数是源文件路径，第二个参数是目标文件路径(如果目标文件路径不存在会自动创建)
fs.copyFileSync('data.txt', 'data2.txt') */

// 异步拷贝写入文件
/* // 第一个参数是源文件路径，第二个参数是目标文件路径(如果目标文件路径不存在会自动创建)
fs.copyFile('data.txt', 'data2.txt', ()=> {}) */

// 模拟同步拷贝写入
/* let copy = (file, target)=> {
    const data = fs.readFileSync(file);
    fs.writeFileSync(target, data);
}
copy('data.txt', 'data3.txt'); */

// 打开文件
/* // 有4个参数,第一个参数是要打开的文件
// 第二个参数是设置的标识位（有读的权限）
// 第三个参数是异步回调(异步打开文件)
// 回调的参数，第二个参数是文件描述符
fs.open('data.txt', 'r', (err, fd)=> {
    // 文件描述符 => 在nodejs中为了抽象不同操作系统之间的差异
    // 使用数值的表示方法，相当于id，非负整数
    console.log(fd);  // 3

    fs.open('data2.txt', 'r', (err, fd)=> {
        // 递增的
        console.log(fd);  // 4
    })
}); */

// 关闭文件
/* fs.open('data.txt', 'r', (err, fd)=> {
    // 关闭文件 - 异步
    // 根据文件描述符关闭
    fs.close(fd, err=> {
        if(!err){
            console.log('关闭成功');
        } else {
            console.log(err);
        }
    });
}); */

// 大文件的读取(将buffer中的数据读取文件)
/* // 创建一个内存大小，单位为字节
// 创建了一个长度为1000的buffer(内存大小)
const buf = Buffer.alloc(1000);  // byte
// 打开文件
fs.open('data.txt', 'r', (err, fd)=>{
    // 读取 => 异步读取
    // 有6个参数，第一个参数为文件描述符
    // 第二个参数是将文本内容读取到buffer
    // 第三个参数是向buffer写入的初始位置
    // 第四个参数是读取文件的长度(byte)
        // 一个汉字(3个字节)
        // 这个值需要比创建的内存大小小
    // 第五个参数是读取文件的初始位置
        // 从0开始读取
    // 第六个参数是异步回调
        // 第一个参数是错误回调，第二个参数是实际读取的字节数
        // 第三个参数是buffer => 被写入缓存区的对象
    fs.read(fd, buf, 0, 100, 0, (err, byteRead, buffer)=> {
        console.log(byteRead);  // 文件中实际的读取长度
        console.log(buffer.toString());  // 因为buffer是二进制的
    })
}) */

// 大文件的写入(将buffer中的数据写入文件)
/* // buffer相当于中转站
// 当数据源内存太大或者内存不确定，无法一次性放入内存写入的时候，就可以分段写入
// 创建一个中转站，将内容存入
const buf = Buffer.from("测试1");
// 打开文件
// r+ => 读写都可以
fs.open('data.txt', 'r+', (err, fd)=> {
    console.log(fd);
    // 写入 => 异步写入
    // 6个参数，第一个参数为文件描述符
    // 第二个参数是buffer(中转站)
    // 第三个参数是向buffer读取的初始位置
    // 第四个参数是读取文件的长度(byte)
    // 第五个参数是写入文件的初始位置
        // 第一个参数是错误回调，第二个参数是实际读取的字节数
        // 第三个参数是buffer => 被写入缓存区的对象

    fs.write(fd, buf, 0, 7, 0, (err, size, buf)=>{
        fs.close(fd, err=> {
            console.log("关闭文件");
        })
    })
}); */

// 同步查看目录权限
/* // 第一个参数路径
// 他会检查路径是否是可读或者可写（没有权限就抛出异常）
// 当有操作权限的时候，没有返回值
// 当没有权限或者路径非法，就会报错
// 所以一般都是要抛出异常(try...catch)
try {
    fs.accessSync('a')
    console.log('可读可写');
} catch(e) {
    console.log('不可访问');
} */

// 异步查看目录权限
/* // 他就不用try catch了，因为他有错误回调
fs.access('a', err=>{
    if(err) {
        console.log('不可访问');
    } else {
        console.log('可访问');
    }
}) */

// 获取文件目录信息 - 同步方法
/* let file = fs.statSync('data.txt');
console.log(file);
console.log(file.size); */

// 获取文件目录信息 - 异步方法
/* let file = fs.stat('data.txt', (err, data)=> {
    console.log(data);
}) */

// 创建目录 - 同步
// fs.mkdirSync('aa');

// 创建目录 - 异步
// fs.mkdir('aa', err=>{})

// 读取目录 - 同步
// console.log(fs.readdirSync('aa'));

// 删除目录 - 同步
// fs.rmdirSync('aa');

// 删除目录 - 异步
// fs.rmdir('a', err=>{});

// 删除文件 - 同步
// fs.unlinkSync('data3.txt');

// 删除文件 - 异步
fs.unlink('data2.txt', err=>{});