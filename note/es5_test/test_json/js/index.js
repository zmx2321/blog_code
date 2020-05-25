// 示例一
/**
 * 反序列化 JSON.parse(text [, reviver])
 * 
 * JSON.parse接受文本(JSON格式)并转换成一个ECMAScript值。
 * 该可选的reviver参数是有带有key和value两个参数的函数，
 * 其作用于结果——让过滤和转换返回值成为可能
 */
// 示例1.1
/* var result = JSON.parse('{"a": 1, "b": "2"}');

console.log(result.b);  // 2 */

// 示例1.2
/* // 如果我们想确保解析的值是个整数，我们可以使用reviver方法
var result = JSON.parse('{"a": 1, "b": "2"}', function(key, value){
    if (typeof value == 'string'){
      return parseInt(value);
    } else {
      return value; 
    }
})
  
console.log(result.b); */

// 示例二
/**
 * 序列化 JSON.stringify(value [, replacer [, space]])
 * 
 * JSON.stringify允许作者接受一个ECMAScript值然后转换成JSON格式的字符串。 
 * 在其最简单的形式中，JSON.stringify接受一个值返回一个字符串
 */
// 示例2.1
/* var mike = JSON.stringify({mike: "taylor"});
console.log(mike);  // {"mike":"taylor"}
console.log(typeof mike);  // string */

// 示例2.2
// 如果我们需要改变值字符串化的方式，或是对我们选择的提供过滤，我们可以将其传给replacer函数。
// 例如，我们想过滤出即将被字符串化的对象中值为13的属性
/* var nums = {
    "first": 7,
    "second": 14,
    "third": 13
}
  
var luckyNums = JSON.stringify(nums, function(key, value){
    if (value == 13) {
        return undefined;
    } else {
        return value;
    }
});
  
console.log(luckyNums);  // {"first": 7, "second": 14} */

// 示例2.3
// 如果replacer方法返回undefined, 
// 则键值对就不会包含在最终的JSON中。
// 我们同样可以传递一个space参数以便获得返回结果的可读性帮助。
// space参数可以是个数字，表明了作缩进的JSON字符串或字符串每个水平上缩进
// 的空格数。如果参数是个超过10的数值，或是超过10个字符的字符串，
// 将导致取数值10或是截取前10个字符
var nums = {
    "first": 7,
    "second": 14,
    "third": 13
}

var luckyNums = JSON.stringify(nums, function(key, value) {
    if (value == 13) {
        return undefined;
    } else {
        return value;
    }
}, 0);

// // 如果数字为2，结果为
// {
//   "first": 7,
//   "second": 14
// }


console.log(luckyNums);  // {"first":7, "second":14}  一行
