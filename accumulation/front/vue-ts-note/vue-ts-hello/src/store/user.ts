// 全局状态管理推荐使⽤vuex-module-decorators，模块化开发轻⽽易举，还能很好的利⽤ts类型推断
// 除了引用VuexModule还需要引用一个模块装饰器
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

// 导入store的实例
import store from './index'

// 定义一个类，继承 VuexModule
// 他不是一个简单的class，而是一个Module
// 所以需要Module装饰器
// 这个装饰器表示，相当于把User模块注册到store实例里面去
@Module({
    name: "user",  // module名称，开启命名空间后会以name为命名空间
    // 动态地把当前这个模块注册到主模块上
    // 是否使用动态加载，简而言之只有在用到当前的module才会加载，详细可以看vuex官网。本篇博客必须选择true，
    // 这也是为什么index.ts一直不用修改的原因，如果设置为false会有很大的变动
    dynamic: true, // 动态注册参数
    store,  // 挂载的store目标
    // namespace // 是否开启命名空间，如果你的模块很多，强烈建议开启
})
class User extends VuexModule {
    // 相当于vuex中state的属性
    username = 'tom'

    // state里面的数据如果要修改
    // Mutation也是一个装饰器
    @Mutation
    // 定义方法
    setUsername(name: string) {
        this.username = name
    }

    @Action
    // 异步方法
    login(userInfo: any) {
        console.log(userInfo)
    }

    @Action
    setUserAction(name: string) {
        this.setUsername(name)
    }
}

// 装饰之后的结果类才是我们要导出的
export default User