/**
 * 接口：GET/PATCH/DELETE /api/posts/:id
 * 动态路由：app/api/posts/[id]/route.js 的 [id] 从 params 传入
 */
import { getPostById, updatePost, deletePost } from "@/lib/postsStore"

/**
 * GET /api/posts/:id - 获取单篇
 */
export async function GET(request, { params }) {
  const id = params.id
  const post = getPostById(id)
  if (!post) {
    return Response.json(
      { code: 404, message: "文章不存在", data: null },
      { status: 404 }
    )
  }
  return Response.json({ code: 0, message: "ok", data: post })
}

/**
 * PATCH /api/posts/:id - 更新
 * Body: { title?: string, content?: string }
 */
export async function PATCH(request, { params }) {
  const id = params.id
  const post = getPostById(id)
  if (!post) {
    return Response.json(
      { code: 404, message: "文章不存在", data: null },
      { status: 404 }
    )
  }
  try {
    const body = await request.json()
    const updates = {}
    if (body?.title !== undefined) updates.title = String(body.title).trim()
    if (body?.content !== undefined) updates.content = String(body.content)
    const updated = updatePost(id, updates)
    return Response.json({ code: 0, message: "ok", data: updated })
  } catch (e) {
    return Response.json(
      { code: 500, message: "请求体解析失败", data: null },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/posts/:id - 删除
 */
export async function DELETE(request, { params }) {
  const id = params.id
  const ok = deletePost(id)
  if (!ok) {
    return Response.json(
      { code: 404, message: "文章不存在", data: null },
      { status: 404 }
    )
  }
  return Response.json({ code: 0, message: "已删除", data: null })
}
