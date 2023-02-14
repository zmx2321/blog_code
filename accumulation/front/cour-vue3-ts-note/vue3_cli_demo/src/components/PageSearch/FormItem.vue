<template>
  <section class="tset">
    <slot>
      <i>我是默认的i元素</i>
    </slot>
  </section>
</template>

<script>
// import { computed } from 'vue'

export default {
  components: {},

  props: {},

  // provide() {
  //   return {
  //     /* name: 'why',
  //     age: 18, */
  //   }
  // },

  watch: {},

  created() {},

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.tset {
}
</style>
