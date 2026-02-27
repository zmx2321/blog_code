<script setup lang="ts">
type ApiResponse<T> = {
  code: number
  data: T
  message: string
}

type Post = {
  id: number
  title: string
  content: string
}

const demoResponse: ApiResponse<Post[]> = {
  code: 0,
  message: 'ok',
  data: [
    { id: 1, title: 'TS 入门', content: '...' },
    { id: 2, title: '在 Vue3 中用 TS', content: '...' },
  ],
}
</script>

<template>
  <section class="block">
    <h2>Step4：接口请求 + 泛型 + 组合式函数</h2>
    <p class="intro">
      你真实项目里最常写的就是「调接口 + 封装 hooks」，这一节只关注：写清楚接口返回类型、封装一个简单的
      <code>useFetch&lt;T&gt;</code>。
    </p>

    <h3>1. 定义接口通用返回类型 ApiResponse&lt;T&gt;</h3>
    <pre class="code">
type ApiResponse&lt;T&gt; = {
  code: number
  data: T
  message: string
}</pre>

    <p class="intro">
      以后你所有接口返回都可以用它表示，比如：
      <code>ApiResponse&lt;User[]&gt;</code>、<code>ApiResponse&lt;Post&gt;</code>。
    </p>

    <h3>2. 封装一个最小可用的 get&lt;T&gt; 函数</h3>
    <pre class="code">
async function get&lt;T&gt;(url: string): Promise&lt;ApiResponse&lt;T&gt;&gt; {
  const res = await fetch(url)
  const json = (await res.json()) as ApiResponse&lt;T&gt;
  return json
}</pre>

    <p class="intro">
      关键点就是：调用时传入泛型参数 <code>&lt;T&gt;</code>，让 <code>data</code> 的类型跟着变。
    </p>

    <h3>3. 组合式函数：useFetch&lt;T&gt;</h3>
    <p class="intro">
      最常见的 TS 场景之一：写一个通用的「数据获取 Hook」，返回 <code>data / loading / error</code> 三件套。
    </p>

    <pre class="code">
// 伪代码结构示例（具体实现留给练习）
export function useFetch&lt;T&gt;(url: string) {
  const data = ref&lt;T | null&gt;(null)
  const loading = ref(false)
  const error = ref&lt;string | null&gt;(null)

  // 发请求，填充 data / loading / error

  return { data, loading, error }
}</pre>

    <h3>4. 实际练习：PostList + useFetch</h3>
    <ol class="list">
      <li>
        打开 <code>src/exercises/useFetch.ts</code>：
        <ul>
          <li>根据注释完成一个通用的 <code>useFetch&lt;T&gt;</code> 函数</li>
          <li>内部可以使用 <code>fetch</code> 或自己造数据（<code>setTimeout</code> 模拟接口）</li>
          <li>只要类型对就行，不追求最优封装</li>
        </ul>
      </li>
      <li>
        再打开 <code>src/exercises/PostList.vue</code>：
        <ul>
          <li>定义 <code>Post</code> 类型</li>
          <li>使用 <code>useFetch&lt;Post[]&gt;</code> 获取列表数据</li>
          <li>在模板中渲染标题列表，正确处理 loading / error / data 三种状态</li>
        </ul>
      </li>
      <li>做完之后，可以尝试把 <code>Post</code> 改成 <code>User</code>，体验一下泛型带来的「复用」。</li>
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

