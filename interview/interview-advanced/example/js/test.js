const obj = {
  name: 'zhangsan',
  age: 18
}
const desc = Object.getOwnPropertyDescriptor(obj, 'name')
console.log(desc)