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
      <template v-slot:default>
        <button>default - aaa</button>
      </template>
      <template v-slot:jmch1>
        <button>jmch1 - sss</button>
      </template>
      <!-- <template #jmch1>
        <button>jmch1</button>
      </template> -->
      <template #jmch2="jmch2Props">
        <button>jmch2</button>
        {{ jmch2Props.message }}
      </template>
      <template #jmch3>
        <button>jmch3</button>
      </template>
      <template #[name]>
        <i>动态插槽示例</i>
      </template>
    </SlotTest2>

    <p>使用作用域插槽</p>
    <SlotTest3 :names="names">
      <template v-slot="slotProps">
        <button>{{slotProps.item}}-{{slotProps.index}}</button>
      </template>
    </SlotTest3>
    <!-- 简写 -->
    <!-- <SlotTest3 :names="names" v-slot="slotProps">
        <button>{{slotProps.item}}-{{slotProps.index}}</button>
    </SlotTest3> -->
    <!-- <SlotTest3 :names="names">
      <template v-slot="zyySlot">
        <button>{{zyySlot.item}}-{{zyySlot.index}}</button>
      </template>
    </SlotTest3> -->
  </div>
</template>

<script>
  import SlotTest1 from './SlotTest1.vue';  // 普通插槽
  import SlotTest2 from './SlotTest2.vue';  // 具名插槽
  import SlotTest3 from './SlotTest3.vue';  // 作用域插槽

  export default {
    components: {
      SlotTest1,
      SlotTest2,
      SlotTest3
    },
    data() {
      return {
        names: ["why", "kobe", "james", "curry"],
        name: "test"
      }
    }
  }
</script>

<style scoped>

</style>