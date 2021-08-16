import { AxiosInstance } from 'axios'

// 在vue/types/vue文件中声明一个接口
// 这个接口中规定了所有vue实例中的所有成员属性
// 很多插件都对vue的构造函数有扩展
declare module 'vue/types/vue' {
  interface Vue {
    axios: AxiosInstance
  }
}