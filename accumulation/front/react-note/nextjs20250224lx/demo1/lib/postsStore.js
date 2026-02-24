/**
 * 模拟数据层：内存中的文章数组（不连数据库）
 * 重启 dev 会恢复为初始数据
 */

let posts = [
  { id: "1", title: "Next.js 入门", content: "App Router、页面与布局。", createdAt: "2025-02-24T10:00:00Z" },
  { id: "2", title: "API Routes 写接口", content: "在 app/api 下用 Route Handler 写 GET/POST 等。", createdAt: "2025-02-24T11:00:00Z" },
  { id: "3", title: "客户端请求接口", content: "用 fetch 在 Client Component 里调自己的 API。", createdAt: "2025-02-24T12:00:00Z" },
]

/** 生成新 id */
function nextId () {
  const ids = posts.map((p) => parseInt(p.id, 10)).filter((n) => !Number.isNaN(n))
  return String(ids.length > 0 ? Math.max(...ids) + 1 : 1)
}

/**
 * 获取所有文章
 * @returns {Array<{id: string, title: string, content: string, createdAt: string}>}
 */
export function getAllPosts () {
  return [...posts]
}

/**
 * 根据 id 获取一篇文章
 * @param {string} id
 * @returns {Object|undefined}
 */
export function getPostById (id) {
  return posts.find((p) => p.id === String(id))
}

/**
 * 新增文章
 * @param {{ title: string, content: string }} data
 * @returns {{ id: string, title: string, content: string, createdAt: string }}
 */
export function createPost (data) {
  const now = new Date().toISOString()
  const post = {
    id: nextId(),
    title: data.title || "",
    content: data.content || "",
    createdAt: now,
  }
  posts.push(post)
  return post
}

/**
 * 更新文章
 * @param {string} id
 * @param {{ title?: string, content?: string }} data
 * @returns {Object|undefined}
 */
export function updatePost (id, data) {
  const index = posts.findIndex((p) => p.id === String(id))
  if (index === -1) return undefined
  posts[index] = { ...posts[index], ...data }
  return posts[index]
}

/**
 * 删除文章
 * @param {string} id
 * @returns {boolean}
 */
export function deletePost (id) {
  const index = posts.findIndex((p) => p.id === String(id))
  if (index === -1) return false
  posts.splice(index, 1)
  return true
}
