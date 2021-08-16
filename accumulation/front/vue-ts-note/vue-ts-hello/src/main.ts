import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import router from './router'
import store from './store'

import axios from "axios"

//挂载（使其可以在各个组件使用）
Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
