"use client"

/**
 * 文章列表页：调用 GET /api/posts，展示列表
 * 路由：/posts
 */
import { useState, useEffect } from "react"
import Link from "next/link"

export default function PostsPage() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/posts")
      const json = await res.json()
      if (json.code !== 0) throw new Error(json.message || "请求失败")
      setList(json.data || [])
    } catch (e) {
      setError(e.message)
      setList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) return <div className="container">加载中...</div>
  if (error) return <div className="container">错误：{error}</div>

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1>文章列表</h1>
        <Link href="/posts/new" className="btn btn-primary">写文章</Link>
      </div>
      <div className="card">
        {list.length === 0 ? (
          <p style={{ color: "#666" }}>暂无文章，<Link href="/posts/new">去写一篇</Link></p>
        ) : (
          <ul style={{ listStyle: "none" }}>
            {list.map((post) => (
              <li
                key={post.id}
                style={{
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <Link href={`/posts/${post.id}`} style={{ fontWeight: 500 }}>
                  {post.title}
                </Link>
                <span style={{ color: "#888", marginLeft: "0.5rem", fontSize: "0.9rem" }}>
                  {new Date(post.createdAt).toLocaleDateString("zh-CN")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
