import { createApp } from 'vue';
import App from './09_render函数的使用/App.vue';

const app = createApp(App);

// app.mixin({
//   data() {
//     return {}
//   },
//   methods: {

//   },
//   created() {
//     console.log("全局的created生命周期");
//   }
// });

app.mount("#app");