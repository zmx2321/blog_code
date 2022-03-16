import { createApp } from 'vue'  // 将vue当成是一个模块直接去引入

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