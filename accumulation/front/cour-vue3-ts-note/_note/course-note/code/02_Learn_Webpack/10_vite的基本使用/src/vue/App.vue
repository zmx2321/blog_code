<template>
  <div>
    <h2>{{message}}</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "Hello App"
      }
    }
  }
</script>

<style scoped>
  h2 {
    color: white;
  }
</style>