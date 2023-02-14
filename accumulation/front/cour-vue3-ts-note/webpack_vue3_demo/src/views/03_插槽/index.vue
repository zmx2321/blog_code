<template>
  <div>
    <p>使用普通插槽</p>
    <SlotTest1></SlotTest1>
    <SlotTest1 v-slot="slotProps">
      <button>插槽内容</button>
      My name is {{ slotProps.personName }} and I am {{ slotProps.age }} years old this year
    </SlotTest1>
    <SlotTest1 v-slot="{ personName, age }">
      My name is {{ personName }} and I am {{ age }} years old this year
    </SlotTest1>

    <p>使用具名插槽</p>

    <SlotTest2>
      <template #jmch1>
        <button>jmch1</button>
      </template>
      <template #jmch2="jmch2Props">
        <button>jmch2</button>
        {{ jmch2Props.message }}
      </template>
      <template #jmch3>
        <button>jmch3</button>
      </template>
    </SlotTest2>
  </div>
</template>

<script>
  import SlotTest1 from './SlotTest1.vue';  // 普通插槽
  import SlotTest2 from './SlotTest2.vue';  // 具名插槽

  export default {
    components: {
      SlotTest1,
      SlotTest2
    }
  }
</script>

<style scoped>

</style>