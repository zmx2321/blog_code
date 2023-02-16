<template>
  <div>
    <!-- <p>作用域插槽</p> -->
    <template v-for="(item, index) in names" :key="item">
      <slot :item="item" :index="index"></slot>

      <!-- <slot name="aaa"></slot> -->
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      names: {
        type: String,
        default: () => []
      }
    }
  }
</script>

<style scoped>

</style>