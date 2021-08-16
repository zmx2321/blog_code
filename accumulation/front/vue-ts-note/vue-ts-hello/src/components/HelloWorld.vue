<template>
  <section id="hello">
    <!-- 使用字符串注解 -->
    <h1>{{ msg }}</h1>

    <!-- 使用字符串数组注解 -->
    <div v-for="heroName in herosName" :key="heroName">
      {{ heroName }}
    </div>

    <!-- 使用复杂对象注解 -->
    <!-- 针对函数的约束 -->
    <div v-for="hero in heros" :key="hero.id" @click="clickHero(hero)">
      {{ hero }}
      {{ hero.name }}
    </div>

    <!-- 事件约束 -->
    <!-- 按回车的时候响应事件 -->
    <input type="text" @keydown.enter="addHero">

    <!-- 获取存取器数据 -->
    <p>共{{ total }} 个可选英雄</p>

    <!-- 使用泛型 -->
    <p>使用泛型</p>
    <div v-for="hero in heros0" :key="hero.id">
      {{ hero }}
      {{ hero.name }}
    </div>

    <!-- 使用promise获取数据 -->
    <p>使用promise获取数据</p>
    <div v-for="hero in heros00" :key="hero.id">
      {{ hero }}
      {{ hero.name }}
    </div>

    <!-- 使用接口 -->
    <p>使用接口</p>
    <div v-for="hero in heros_as" :key="hero.id">
      {{ hero }}
      {{ hero.name }}
    </div>

    <button @click="pointFather">子组件给父组件的事件</button>

    <!-- 使用vuex -->
    <p>使用vuex</p>
    <button @click="getVuexData">vuex同步获取数据</button>
    <button @click="getVuexDataAsync">vuex异步获取数据</button>
    <h3>{{ username }}</h3>
  </section>
</template>

<script lang="ts">
// 这是ts组件基本的模版
// Component是非常关键的一个类，是装饰器
// ts组件的基本模版都要引入Component和Vue这两个关键类
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

// 类型别名
import { Hero } from '@/data-type'  // 外部引入
// type和interface很相似
/* type Hero = { 
  id: number,
  name: string,
  classify: string 
} */

// 调用工具方法
// import * as util from '@/api/utils'
import { getResult, getResultPromise } from '@/api/utils'

// 导入接口
// import { Result } from '@/types/index'

// 定义一个泛型方法
// 在小括号前面约束了这个方法
// 说明我们在使用这个方法的时候，需要动态指定一下这个类型
// 他可以告诉我们，将来返回的这个Result里面到底data指什么
/* function getResult<T>(): Result<T> {
  const data: any = [
    { id: 10, name: "卤蛋0", classify: "射手0" },
    { id: 20, name: "后羿0", classify: "射手0" }
  ]

  return { ok: 1, data }
} */

// 箭头函数一
/* const getResult = <T,>(): Result<T> => {
  const data: any = [
    { id: 10, name: "卤蛋0", classify: "射手0" },
    { id: 20, name: "后羿0", classify: "射手0" }
  ]

  return { ok: 1, data }
}; */

// 箭头函数二
/* const getResult: <T>() => Result<T> = () => {
  const data: any = [
    { id: 10, name: "卤蛋0", classify: "射手0" },
    { id: 20, name: "后羿0", classify: "射手0" }
  ]

  return { ok: 1, data }
}; */

// 搞一个异步方法模拟请求
// 泛型还能嵌套
/* const getResultPromise: <T>()=> Promise<Result<T>> = ()=> {
  const data: any = [
    { id: 100, name: "卤蛋00", classify: "射手00" },
    { id: 200, name: "后羿00", classify: "射手00" }
  ]

  // 这里的promise可以确保和上面的result是相符合的
  return Promise.resolve({ ok:1, data })
} */

// 真正接口调用
import { getResultAxios } from '@/api/hero'
import axios from "axios"
/* // 我们在调这个方法的时候，不指定结果是什么
// 我们在这里只需要做一个转发
// 我们把泛型复制到下面
// 将来用户在调这个接口的时候，只要动态的把类型传进来，下面的get方法同样也知道传进来的类型是什么了
function getResultAxios<T>() {
  // 使用get方法的时候，没有传递任何类型，他就不知道返回什么类型，只能用any表示
  return axios.get<T>('/api/heros')
} */

// 为了使用vuex
import { getModule } from 'vuex-module-decorators'
// 导入user
import User from '@/store/user'

// 现在需要用getModule方法得到user实例
// 这里的user其实就可以直接使用了
const user = getModule(User)


// ts最重要核⼼语⾔特性之一；装饰器
// 有了装饰器这个类才能用注解
// 我们用注解这个语法，把它装饰在自定义类的上面，并且这个类要继承Vue的构造函数
// 如果上面不需要使用其他组件，只要使用这个装饰就可以 => @Component
// 如果还需要引入其他组件，可以在装饰器里面添加，以函数的方式去使用它
// 建议一些配置，和业务无关的东西写在这里

// HelloWorld只是一个普通的class，但被Component装饰之后，他就变成了一个vue的组件类
// 有些类似vue的继承返回的构造函数，即相当于组件的构造函数
// 传进去的是一个HelloWorld类，传出来的是一个构造函数
@Component({
  components: {
    // 组件名称
  }
})
// @Component
// 这里写业务逻辑相关的东西
export default class HelloWorld extends Vue {
  // 我们之前是需要加一个data，然后在里面return各种数据
  // ts里面可以直接写，在模版里面就可以直接使用
  // 这里定义的数据实际上就是类的成员属性
  // 即只要声明一个成员属性，就可以像以前一样，把它当成data里面的值去使用了
  // msg = "ts+vue实战"
  msg:string = "";  // 字符串注解

  // 父组件传值，子组件接收
  // 对参数进行约束
  @Prop({
    type: String,
    required: false  // 如果是必须的就为true
  })
  // 编译器会报没有初始化的警告，需要加一个断言
  // !是一个断言，表示msg0一定会有值
  // 一个装饰器装饰一个目标，再有其他属性就再加一个prop装饰另外一个属性
  // 这个msg0就是上面prop装饰器的目标
  msg0!: string;

  herosName: string[] = [] // 字符串数组

  // 自定义类型 - 推荐写法
  // 需要类型别名
  // 对象里的数据结构需要和类型别名结构相同
  heros:Hero[] = [
    {
      id: 1,
      name: '卤蛋',
      classify: "射⼿"
    },
    {
      id: 2,
      name: '后羿',
      classify: "射⼿"
    }
  ]
  
  // 偷懒写法
  /* // 但后面还有其他的就不好写了
  heros: {name: string}[] = [
    {
      name: '卤蛋1'
    },
    {
      name: '后羿1'
    } 
  ] */

  // 直接使用any
  /* heros:any = [
    {
      name: '卤蛋'
    },
    {
      name: '后羿'
    }
  ] */

  // 使用泛型
  heros0: Hero[] = []  // 定义并指定类型

  // 异步模拟请求
  heros00: Hero[] = []  // 定义并指定类型

  // 接口请求
  heros_as: Hero[] = []  // 定义并指定类型

  // vue的生命周期
  // 只要和生命周期的钩子一致，就可以成为一个生命周期
  async created() {
    this.msg = "ts+vue实战"  // 使用字符串注解

    console.log("获取父组件的值---", this.msg0)

    this.herosName = ['⻧蛋', '后羿']  // 使用字符串数组注解

    // 执行泛型方法
    // 需要指定一下类型，如果不指定，会显示unknow，表示不指定返回的类型是什么
    // 这里表示返回的类型是英雄构成的数组
    this.heros0 = getResult<Hero[]>().data
    console.log(getResult().ok)

    // 异步模拟请求
    console.log((await getResultPromise()).ok)
    // 异步执行了这个方法之后才获取data
    // 使用await实际上就是拿到promise里面的result，拿到result才可以获取里面的data
    this.heros00 = (await getResultPromise<Hero[]>()).data

    // 获取接口数据
    this.heros_as = (await getResultAxios<Hero[]>()).data

    // 或者也可以直接调用
    // 最好直接明确告诉get方法返回的结果
    // 返回的结果是hero数组
    // axios.get<Hero[]>('/api/heros')里面实际上就是一个promise
    axios.get<Hero[]>('/api/heros').then(res=> {
      console.log(res)
    })

    // 模块扩展
    this.axios.get<Hero[]>('/api/user').then(res=> {
      console.log("通过全局axios请求的数据", res)
    })
  }  // 不能加分号

  // 事件可以理解成类里面的方法，所以不用和之前一样写methods
  // 针对函数的约束
  // 如果不声明类型，就不知道里面有没有name属性，不安全
  clickHero(hero: Hero) {
    // 这里的hero通过传参得来
    // console.log(hero)
    console.log("clickHero", hero.name);
  }

  // 回车事件约束
  // 这里的事件对象类型属于键盘事件
  addHero(e: KeyboardEvent) {
    // 现在由于是强类型，所以每一步都会有类型的提示
    // e.target  // 可能是事件派发者，可能是空
    // console.log("获取事件对象", e)

    // 确定目前派发的类型是输入框
    // 这里没法加value，即e.target.value不存在
    // 这个target不是一个输入框，他是输入框的父类，所以没有value
    // 所以这时候要做个断言，必须告诉他这东西就是一个html的input元素
    // 即 e.target as HTMLInputElement
    // 获取事件对象中的input元素
    // console.log(e.target as HTMLInputElement)

    // e.target这个类型太泛了，要把他确定成输入框这种类型 => 断言
    // 因为可以派发事件的元素太多了，在编译器的角度上无法判断，必须由程序员告诉他
    let inp = e.target as HTMLInputElement;
    console.log(inp.value)  // 获取input框内容

    // 在数组中push
    // 如果没有分类，和自定义的类型不匹配会报错
    // 修改自定义类型，分类改成可选
    if(inp.value) {
      this.heros.push({
        id: this.heros.length + 1,
        name: inp.value
      })
    }
    
    inp.value = ""
    console.log(this.heros)

    // 全局引入提示信息
    this.$notify.success('新增英雄成功！')
  }

  // 子组件给父组件的事件 - 使用装饰器完成
  // 方法名称会成为事件名称
  // 这里的return为父组件事件的参数
  // 这里是驼峰命名，父组件事件要用中划线
  @Emit()
  pointFather() {
    console.log("子组件给父组件的事件")

    return "pointFather参数"
  }

  // // vuex action改变数据
  // vgact() {
  //   user.setUserAction("ee")
  //   // user.setUsername("fds")
  // }

  // vuex同步获取数据
  getVuexData() {
    console.log("vuex同步获取数据")
    user.setUsername("fds")
  }

  // vuex异步获取数据
  getVuexDataAsync() {
    console.log("vuex异步获取数据")
    user.setUserAction("ee")
  }

  // 做一个英雄总数的统计，用存取器来做，get/set
  // 存取器：会作为计算属性对待
  // 这个只是es6中class里面的存取器
  get total() {
    return this.heros.length
  }

  // 计算属性，return的东西可以直接拿来用
  get username() {
    return user.username
  }
}
</script>

<style scoped lang="less">

</style>