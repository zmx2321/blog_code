// 单只写vue，这样打包并不会出问题，但页面渲染没出来
import { createApp } from 'vue/dist/vue.esm-bundler'  // 将vue当成是一个模块直接去引入

// vue代码
const app = createApp({
    template: "<h2>vue3  132546</h2>",
    data() {
        return {
            title: "hello"
        }
    },
})
app.mount('#app')