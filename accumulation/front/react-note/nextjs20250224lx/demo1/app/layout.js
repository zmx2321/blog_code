import "./globals.css"

/**
 * 根布局：所有页面共用
 * - 必须导出 default
 * - 必须包含 <html> 和 <body>
 * - 子页面内容通过 children 注入
 */
export const metadata = {
  title: "Next.js 学习 Demo",
  description: "一周学习计划 - 接口与页面完整示例",
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <header style={{ background: "#111", color: "#fff", padding: "1rem 0" }}>
          <div className="container">
            <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <a href="/" style={{ color: "#fff", fontWeight: "bold" }}>
                首页
              </a>
              <a href="/posts" style={{ color: "#fff" }}>
                文章列表
              </a>
              <a href="/posts/new" style={{ color: "#fff" }}>
                写文章
              </a>
            </nav>
          </div>
        </header>
        <main style={{ padding: "1.5rem 0" }}>{children}</main>
      </body>
    </html>
  )
}
