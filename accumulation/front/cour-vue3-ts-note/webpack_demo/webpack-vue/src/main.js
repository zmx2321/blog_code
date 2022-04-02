// 单只写vue，这样打包并不会出问题，但页面渲染没出来
import { createApp } from 'vue/dist/vue.esm-bundler'  // 将vue当成是一个模块直接去引入
// import { createApp } from 'vue';
import { sum } from "./js/math";
const { priceFormat } = require("./js/format");

import App from './vue/App.vue';

import "./js/element";

console.log(sum(20, 30));
console.log(priceFormat());

console.log("123")

// Vue代码
// const app = createApp({
//   template: "#my-app",
//   components: {

//   },
//   data() {
//     return {
//       title: "Hello World",
//       message: "哈哈哈"
//     }
//   }
// });
const app = createApp(App);
app.mount("#app");
