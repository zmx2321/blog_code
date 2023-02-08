<template>
  <div>
    <h2 v-bind="$attrs">{{title}}</h2>
    <p>{{content}}</p>
  </div>
</template>

<script>
  export default {
    // props: ['title', 'content']
    inheritAttrs: false,
    props: {
      title: String,
      content: {
        type: String,
        required: true,
        default: "123"
      },
      counter: {
        type: Number
      },
      // 在父传子的时候,如果props里面是对象,并且需要给他默认值的时候,需要写成方法,
      // 因为使用组件的时候会多次使用,即会创建多个组件实例,每个组件实例中都有一个props属性,props里面的默认对象也是一样的,他们都指向的是一个对象,如果一个组件改了值,那么所有的使用了那个组件的对象的值都会发生改变
      info: {
        type: Object,
        default() {
          return {name: "why"}
        }
      },
      messageInfo: {
        type: String
      }
    }
  }
</script>

<style scoped>

</style>