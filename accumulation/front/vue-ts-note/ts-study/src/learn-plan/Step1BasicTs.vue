<script setup lang="ts">
type Product = {
  id: number
  name: string
  price: number
  tags?: string[]
}

type Role = 'admin' | 'editor' | 'viewer'

const sampleProduct: Product = {
  id: 1,
  name: '示例商品',
  price: 99,
  tags: ['hot', 'new'],
}

function discountPrice(product: Product, discount: number): number {
  return product.price * (1 - discount)
}

function canEdit(role: Role): boolean {
  return role === 'admin' || role === 'editor'
}
</script>

<template>
  <section class="block">
    <h2>Step1：在 JS 上加类型的最小集合</h2>
    <p class="intro">
      你已经会写 Vue3 + JS，这一节只做一件事：把你熟悉的 JS 写法，稍微「加一层类型」，让编辑器能帮你提前发现错误。
    </p>

    <h3>1. 常用基础类型</h3>
    <ul class="list">
      <li><code>string</code> / <code>number</code> / <code>boolean</code></li>
      <li><code>string[]</code> / <code>Array&lt;number&gt;</code></li>
      <li>对象类型：<code>{ id: number; name: string }</code></li>
      <li>联合类型：<code>'admin' | 'editor' | 'viewer'</code></li>
      <li><code>type</code> / <code>interface</code>：给对象起名字，方便复用</li>
    </ul>

    <h3>2. 示例：商品与角色</h3>
    <p>下面是本文件顶部已经写好的 TypeScript 示例：</p>
    <pre class="code">
type Product = {
  id: number
  name: string
  price: number
  tags?: string[]
}

type Role = 'admin' | 'editor' | 'viewer'

function discountPrice(product: Product, discount: number): number {
  return product.price * (1 - discount)
}

function canEdit(role: Role): boolean {
  return role === 'admin' || role === 'editor'
}</pre>

    <h3>3. 你可以在这里动手试一试</h3>
    <p>
      建议你直接打开本文件，尝试改一改类型，例如把 <code>Role</code> 改成别的字符串，看看组件里哪里开始报错。
    </p>

    <h3>4. 正式练习（请去 exercises 中完成）</h3>
    <ol class="list">
      <li>
        打开 <code>src/exercises/Step1BasicsExercise.vue</code>，按照文件中的中文提示，完成：
        <ul>
          <li>定义 <code>User</code>、<code>Product</code> 等类型</li>
          <li>给函数参数和返回值加上合适的类型</li>
          <li>写一个简单的联合类型，并在条件判断里使用</li>
        </ul>
      </li>
      <li>写完后，故意把某个字段写错，比如 <code>namee</code>，感受一下 TS 如何帮你发现问题。</li>
      <li>有疑问可以直接把练习文件贴给我，我帮你做一次类型 review。</li>
    </ol>
  </section>
</template>

<style scoped>
.block {
  border-bottom: 1px solid rgba(148, 163, 184, 0.4);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

h3 {
  font-size: 15px;
  margin: 14px 0 6px;
}

.intro {
  font-size: 13px;
  color: #9ca3af;
}

.list {
  font-size: 13px;
  padding-left: 18px;
}

.code {
  margin-top: 8px;
  padding: 10px 12px;
  background: #e9e9e9;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
}
</style>

