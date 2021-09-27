import Vue from 'vue'
import Vuex from 'vuex'

// 模块
import user from './modules/user'
import common from './modules/common'

// getters
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common,  // 公共信息
        user,  // 用户信息
    },
    getters,
})
