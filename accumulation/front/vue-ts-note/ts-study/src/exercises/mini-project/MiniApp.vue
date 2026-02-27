<script setup lang="ts">
/**
 * mini-project 练习主入口：MiniApp.vue
 *
 * 目标（建议）：
 * - 左侧用户列表（使用 useUsers）
 * - 右侧当前用户的文章列表（使用 usePosts）
 *
 * 这里仅保留说明文字和布局占位，具体实现交给你。
 */

// TODO：
// 1. 从 ./useUsers 和 ./usePosts 中引入组合式函数
// 2. 调用它们，拿到 users / currentUserId / posts 等状态
// 3. 在模板中完成左右布局和交互
</script>

<template>
  <section class="mini-app">
    <h2>Mini Project：用户 + 文章迷你后台</h2>
    <p class="tip">
      打开 <code>MiniApp.vue</code>，结合 <code>useUsers</code> / <code>usePosts</code> 实现一个属于你的迷你后台。
      完全按你平时写 Vue3 + JS 的习惯来，只是多加一层类型。
    </p>
  </section>
</template>

<style scoped>
.mini-app {
  border-bottom: 1px dashed rgba(148, 163, 184, 0.4);
  padding-bottom: 12px;
  margin-bottom: 12px;
}

h2 {
  font-size: 15px;
  margin-bottom: 6px;
}

.tip {
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 4px;
}
</style>

