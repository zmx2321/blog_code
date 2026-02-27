<script setup lang="ts">
type UserRole = 'admin' | 'editor' | 'viewer'

type User = {
  id: number
  name: string
  role: UserRole
}

const demoUser: User = {
  id: 1,
  name: '张三',
  role: 'admin',
}
</script>

<template>
  <section class="block">
    <h2>Step3：Props / Emits / 父子组件通信</h2>
    <p class="intro">
      这一节只做一件事：把你已经很熟悉的父子组件通信（props + emit），用 TS 的方式写出来，让 IDE 能完整提示。
    </p>

    <h3>1. 在 &lt;script setup&gt; 中声明 Props</h3>
    <pre class="code">
const props = defineProps&lt;{
  title: string
  count?: number
  tags: string[]
}&gt;()</pre>

    <p class="intro">
      注意：<code>defineProps&lt;{ ... }&gt;()</code> 里你直接写对象类型，和普通 TS 没区别，只是这个对象专门描述
      <code>props</code>。
    </p>

    <h3>2. 在 &lt;script setup&gt; 中声明 Emits</h3>
    <pre class="code">
const emit = defineEmits&lt;{
  (e: 'update:count', value: number): void
  (e: 'delete'): void
}&gt;()</pre>

    <p class="intro">
      约定事件名 + 参数类型后，<code>emit('update:count', ...)</code> 就会有完整的类型检查和自动补全。
    </p>

    <h3>3. 示例场景：用户卡片</h3>
    <ul class="list">
      <li>子组件 <code>UserCard</code>：展示一个用户信息，内部有「选中」「删除」按钮。</li>
      <li>
        Props：
        <code>user: User</code>
      </li>
      <li>Emits：<code>'select'</code> / <code>'delete'</code>，都携带 <code>user.id: number</code></li>
      <li>父组件 <code>UserList</code>：维护一个 <code>User[]</code> 列表，监听子组件事件。</li>
    </ul>

    <p class="intro">
      上面这个场景你在 JS 里肯定写过很多次，这里只是加上一层「类型」，让你在重构 / 改字段时更安全。
    </p>

    <h3>4. 实际练习：UserCard / UserList</h3>
    <ol class="list">
      <li>打开 <code>src/exercises/UserCard.vue</code>：</li>
      <li>
        按注释完成：
        <ul>
          <li>定义 <code>UserRole</code> / <code>User</code> 类型（可以参考本文件顶部）</li>
          <li>用 <code>defineProps&lt;UserCardProps&gt;</code> 声明 props</li>
          <li>用 <code>defineEmits</code> 声明 <code>'select'</code> / <code>'delete'</code> 事件</li>
        </ul>
      </li>
      <li>
        再打开 <code>src/exercises/UserList.vue</code>：
        <ul>
          <li>写一个 <code>ref&lt;User[]&gt;</code> 或 <code>reactive</code> 的用户列表</li>
          <li>在模板中循环渲染 <code>UserCard</code></li>
          <li>实现 <code>onSelect(id: number)</code> / <code>onDelete(id: number)</code>，注意参数类型声明</li>
        </ul>
      </li>
      <li>写完后，随便改一个类型（比如把 <code>id</code> 改成 string），看看有哪些地方会即时报错。</li>
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

