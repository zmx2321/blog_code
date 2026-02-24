"use client"

/**
 * 文章详情页：GET 展示，PATCH 编辑，DELETE 删除
 * 路由：/posts/:id
 */
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export default function PostDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchPost = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/posts/${id}`)
      const json = await res.json()
      if (json.code !== 0) throw new Error(json.message || "请求失败")
      const p = json.data
      setPost(p)
      setTitle(p?.title ?? "")
      setContent(p?.content ?? "")
    } catch (e) {
      setError(e.message)
      setPost(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchPost()
  }, [id])

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      })
      const json = await res.json()
      if (json.code !== 0) throw new Error(json.message || "更新失败")
      setPost(json.data)
      setEditing(false)
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("确定删除这篇文章？")) return
    setDeleteLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (json.code !== 0) throw new Error(json.message || "删除失败")
      router.push("/posts")
      router.refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) return <div className="container">加载中...</div>
  if (error && !post) return <div className="container">错误：{error}，<Link href="/posts">返回列表</Link></div>

  return (
    <div className="container">
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/posts" style={{ fontSize: "0.9rem" }}>← 返回列表</Link>
      </div>
      <div className="card">
        {editing ? (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>标题</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>内容</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            {error && <p style={{ color: "#c00", marginBottom: "0.5rem" }}>{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={submitLoading} style={{ marginRight: "0.5rem" }}>
              {submitLoading ? "保存中..." : "保存"}
            </button>
            <button type="button" className="btn" onClick={() => setEditing(false)}>取消</button>
          </form>
        ) : (
          <>
            <h1 style={{ marginBottom: "0.5rem" }}>{post?.title}</h1>
            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1rem" }}>
              {post?.createdAt ? new Date(post.createdAt).toLocaleString("zh-CN") : ""}
            </p>
            <p style={{ whiteSpace: "pre-wrap" }}>{post?.content || "（无内容）"}</p>
            {error && <p style={{ color: "#c00", marginTop: "0.5rem" }}>{error}</p>}
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-primary" onClick={() => setEditing(true)}>编辑</button>
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? "删除中..." : "删除"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
