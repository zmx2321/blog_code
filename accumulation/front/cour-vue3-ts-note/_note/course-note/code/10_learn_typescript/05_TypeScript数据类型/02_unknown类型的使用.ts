function foo() {
  return "abc"
}

function bar() {
  return 123
}

// unknown类型只能赋值给any和unknown类型
// any类型可以赋值给任意类型

let flag = true
let result: unknown // 最好不要使用any
if (flag) {
  result = foo()
} else {
  result = bar()
}

let message: string = result
let num: number = result

console.log(result)

export {}

