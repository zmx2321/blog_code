<script setup lang="ts">
/**
 * Step4 练习二：PostList 组件
 *
 * 目标：
 * - 使用 useFetch<T> 获取文章列表
 * - 在模板中处理 loading / error / data 三种状态
 */

// TODO 1：定义 Post 类型
// 建议：
// type Post = { id: number; title: string; content: string; createdAt: string }

// TODO 2：引入并使用 useFetch<Post[]>
// const { data, loading, error } = useFetch<Post[]>('/api/posts')

// TODO 3：在模板中展示：
// - loading 为 true 时显示「加载中」
// - error 不为空时显示错误信息
// - 正常时渲染文章标题列表
</script>

<template>
  <section>
    <h2>Step4 练习：PostList.vue</h2>
    <p class="tip">
      按上方 TODO，使用 <code>useFetch&lt;T&gt;</code> 获取文章列表数据，并在模板中处理不同状态。
    </p>
  </section>
</template>

<style scoped>
section {
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

