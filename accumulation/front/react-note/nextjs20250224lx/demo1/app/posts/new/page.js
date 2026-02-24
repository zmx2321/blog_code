"use client"

/**
 * 写文章页：表单提交到 POST /api/posts
 * 路由：/posts/new
 */
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      })
      const json = await res.json()
      if (json.code !== 0) throw new Error(json.message || "提交失败")
      router.push("/posts")
      router.refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: "1rem" }}>写文章</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>标题</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入标题"
              required
            />
          </div>
          <div className="form-group">
            <label>内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入内容"
            />
          </div>
          {error && <p style={{ color: "#c00", marginBottom: "0.5rem" }}>{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "提交中..." : "发布"}
          </button>
        </form>
      </div>
    </div>
  )
}
