// 导入接口
import { Result } from '@/types/index'

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
export const getResult: <T>() => Result<T> = () => {
    const data: any = [
      { id: 10, name: "卤蛋0", classify: "射手0" },
      { id: 20, name: "后羿0", classify: "射手0" }
    ]
  
    return { ok: 1, data }
};
  
// 搞一个异步方法模拟请求
// 泛型还能嵌套
/* export function getResultPromise<T>(): Promise<Result<T>> {
  const data: any = [
    { id: 100, name: "卤蛋00", classify: "射手00" },
    { id: 200, name: "后羿00", classify: "射手00" }
  ]
  
  // 这里的promise可以确保和上面的result是相符合的
  return Promise.resolve({ ok:1, data })
} */

// 回调函数
export const getResultPromise: <T>()=> Promise<Result<T>> = ()=> {
  const data: any = [
    { id: 100, name: "卤蛋00", classify: "射手00" },
    { id: 200, name: "后羿00", classify: "射手00" }
  ]

  // 这里的promise可以确保和上面的result是相符合的
  return Promise.resolve({ ok:1, data })
}

