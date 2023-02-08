import { createApp } from 'vue'
// import App from './App.vue'
import router from './router'

// import App from './views/01_父组件传递子组件'
import App from './views/02_子组件传递父组件'

createApp(App).use(router).mount('#app')
