<template>
  <section class="tset">
    <PageSearch />
  </section>
</template>

<script>
import PageSearch from '@/components/PageSearch/index.vue'

export default {
  name: 'tset',

  components: {
    PageSearch
  },

  props: {},

  watch: {},

  computed: {},

  data() {
    return {}
  },

  created() {
    this.$emitter.on('why', (info) => {
      console.log('why:', info)
    })
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.tset {
}
</style>
