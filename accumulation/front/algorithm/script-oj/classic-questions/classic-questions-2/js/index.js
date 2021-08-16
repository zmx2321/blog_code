/**
    完成 extname 函数，它会接受一个文件名作为参数，你需要返回它的扩展名。

    例如，输入 emoji.png，返回 .png
 */
const extname = (filename) => {
   /**
    * 通过正则（）获取后缀
    * 
    * . 除了换行符之外的任意字符
    * + 重复一次或一次以上
    */
   let matchList = filename.match(/(.+)(\.[a-zA-Z]+)/);  // 匹配捕获任意字符出现一次或一次以上，后面连接".任意字母"
   return matchList ? matchList[matchList.length - 1] : "";  // 判断捕获后的数据,如果存在数组(不为null)，则值取数组索引length-1，否则值为空
}

let res = extname("emoji.png");
let res1 = extname("hello");
let res3 = extname(".hello");
console.log(res);
console.log(res1);
console.log(res3);