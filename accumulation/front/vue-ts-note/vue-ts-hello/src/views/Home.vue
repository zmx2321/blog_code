<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld @point-father="getSon" msg0="Welcome to Your Vue.js + TypeScript App 入门"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  getSon(val:string) {
    console.log("父组件方法参数为子组件的return值，getSon", val)
  }
}
</script>

