/**
 * 接口：GET /api/posts 列表 | POST /api/posts 新增
 * App Router 中 app/api/posts/route.js 对应 /api/posts
 */
import { getAllPosts, createPost } from "@/lib/postsStore"

/**
 * GET /api/posts - 获取所有文章
 */
export async function GET() {
  const posts = getAllPosts()
  return Response.json({ code: 0, message: "ok", data: posts })
}

/**
 * POST /api/posts - 新增文章
 * Body: { title: string, content: string }
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const title = body?.title?.trim()
    const content = body?.content?.trim() ?? ""
    if (!title) {
      return Response.json(
        { code: 400, message: "缺少 title", data: null },
        { status: 400 }
      )
    }
    const post = createPost({ title, content })
    return Response.json({ code: 0, message: "ok", data: post })
  } catch (e) {
    return Response.json(
      { code: 500, message: "请求体解析失败", data: null },
      { status: 500 }
    )
  }
}
