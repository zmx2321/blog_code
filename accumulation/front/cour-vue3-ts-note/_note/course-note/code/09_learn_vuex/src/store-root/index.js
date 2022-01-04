import { createStore } from "vuex"
import axios from 'axios'
import { INCREMENT_N } from './mutation-types'

const store = createStore({
  state() {
    return {
      counter: 100,
      name: "why",
      age: 18,
      height: 1.88,
      books: [
        { name: "深入Vuejs", price: 200, count: 3 },
        { name: "深入Webpack", price: 240, count: 5 },
        { name: "深入React", price: 130, count: 1 },
        { name: "深入Node", price: 220, count: 2 },
      ],
      discount: 0.6,
      banners: []
    };
  },
  getters: {
    totalPrice(state, getters) {
      let totalPrice = 0
      for (const book of state.books) {
        totalPrice += book.count * book.price
      }
      return totalPrice * getters.currentDiscount
    },
    currentDiscount(state) {
      return state.discount * 0.9
    },
    totalPriceCountGreaterN(state, getters) {
      return function(n) {
        let totalPrice = 0
        for (const book of state.books) {
          if (book.count > n) {
            totalPrice += book.count * book.price
          }
        }
        return totalPrice * getters.currentDiscount
      }
    },
    nameInfo(state) {
      return `name: ${state.name}`
    },
    ageInfo(state) {
      return `age: ${state.age}`
    },
    heightInfo(state) {
      return `height: ${state.height}`
    }
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    // 10 -> payload
    // {n: 10, name: "why", age: 18} -> payload
    [INCREMENT_N](state, payload) {
      console.log(payload);
      state.counter += payload.n
    },
    addBannerData(state, payload) {
      state.banners = payload
    }
  },
  actions: {
    // 放函数
    // 1.参数问题
    incrementAction(context, payload) {
      console.log(payload)
      setTimeout(() => {
        context.commit('increment')
      }, 1000);
    },
    // 2.context的其他属性
    decrementAction({ commit, dispatch, state, rootState, getters, rootGetters }) {
      commit("decrement")
    },
    getHomeMultidata(context) {
      return new Promise((resolve, reject) => {
        axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
          context.commit("addBannerData", res.data.data.banner.list)
          resolve({name: "coderwhy", age: 18})
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
});

export default store;
