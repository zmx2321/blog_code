/**
 * 首页：App Router 中 app/page.js 对应路由 /
 */
export default function HomePage() {
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginBottom: "0.5rem" }}>Next.js 一周学习 Demo</h1>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          用「文章列表 + 详情 + 增删改」串起：路由、组件、API、CRUD。
        </p>
        <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
          <li>
            <a href="/posts">文章列表</a>：从 API 拉数据，展示列表
          </li>
          <li>
            <a href="/posts/new">写文章</a>：表单提交到 POST /api/posts
          </li>
          <li>点击某篇文章进入详情，可编辑、删除（调用 PATCH/DELETE 接口）</li>
        </ul>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#888" }}>
          学习文档见项目根目录：<code>LEARN_PLAN.md</code>、<code>docs/</code>
        </p>
      </div>
    </div>
  )
}
