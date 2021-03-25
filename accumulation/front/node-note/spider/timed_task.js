const https = require('https');
const schedule = require("node-schedule");

let uri = `https://www.baidu.com/`;

// 获取状态码
let httpGet = ()=> {
  https.get(uri, res=> { 
    console.log("状态码: " + res.statusCode); 
  }).on('error', err=> { 
    console.log("error: " + err.message); 
  });
}

// 实例化定时任务
let rule = new schedule.RecurrenceRule();
let times = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];  // 每隔5秒
rule.second = times;  // 只设置秒，将times数组赋值给rule.second(秒)
schedule.scheduleJob(rule, ()=> {
  console.log(new Date);

  httpGet();  // 获取状态码
});