<script setup lang="ts">
const steps = [
  '定义 User / Post 类型（可以复用前面练习里的）',
  '封装 users / posts 的「假接口」或 useUsers / usePosts 组合式函数',
  '做一个左右布局：左侧用户列表，右侧当前选中用户的文章列表',
  '支持切换当前用户、为某个用户新增一篇文章',
] as const
</script>

<template>
  <section class="block">
    <h2>Step5：小型实战——用户 + 文章迷你后台</h2>
    <p class="intro">
      最后一步，用前面所有内容串起来，做一个你完全能掌控的小项目：左边用户列表，右边文章列表，全程用 TS。
    </p>

    <h3>1. 项目结构建议</h3>
    <pre class="code">
src/
  exercises/
    mini-project/
      types.ts
      useUsers.ts
      usePosts.ts
      MiniApp.vue</pre>

    <p class="intro">
      你可以完全按上面这个结构来，也可以根据自己习惯调整，关键是：所有状态和接口都带上合适的 TS 类型。
    </p>

    <h3>2. 最低目标（建议全部完成）</h3>
    <ul class="list">
      <li>1 个用户列表：点击用户时，高亮当前选中用户。</li>
      <li>右侧显示该用户的文章列表。</li>
      <li>可以为当前用户新增一篇文章（只要能看到效果即可）。</li>
      <li>所有 User / Post / 函数参数 / 返回值都有合理的类型。</li>
    </ul>

    <h3>3. 推荐实现步骤</h3>
    <ol class="list">
      <li>在 <code>src/exercises/mini-project/types.ts</code> 中定义 <code>User</code> / <code>Post</code> 类型。</li>
      <li>实现 <code>useUsers.ts</code>：返回 <code>users</code>、<code>currentUser</code>、<code>selectUser</code>。</li>
      <li>实现 <code>usePosts.ts</code>：返回 <code>posts</code>、<code>fetchPostsByUser</code>、<code>createPost</code> 等。</li>
      <li>在 <code>MiniApp.vue</code> 中组合它们，完成布局和交互。</li>
    </ol>

    <h3>4. 真正练到的 TS 能力</h3>
    <ul class="list">
      <li>给接口和状态建模：<code>User</code> / <code>Post</code> / <code>ApiResponse</code>。</li>
      <li>用组合式函数 + 泛型组织逻辑，例如 <code>useFetch&lt;T&gt;</code>。</li>
      <li>在组件 / hooks / 工具函数之间复用类型。</li>
    </ul>

    <h3>5. 练习入口</h3>
    <p class="intro">
      练习文件都在 <code>src/exercises/mini-project</code> 目录下（骨架已为你准备好，里面有详细 TODO 注释）。写完后，如果你愿意，可以把
      <code>MiniApp.vue</code> 或任意一个 hook 文件贴给我，我帮你做一次整体 TS 代码 review。
    </p>

    <ul class="list">
      <li v-for="s in steps" :key="s">
        {{ s }}
      </li>
    </ul>
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

