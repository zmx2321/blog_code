import { sum } from "./js/math";  // ES Module的导出
const { priceFormat } = require('./js/format')  // CommonJS的导出

// 浏览器无法直接运行
console.log(sum(20, 30))
console.log(priceFormat())  // 浏览器不能识别CommonJS，用webpack打包，浏览器就可以识别了