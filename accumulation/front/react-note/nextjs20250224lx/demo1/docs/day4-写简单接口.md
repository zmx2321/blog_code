# Day 4：写简单接口（约 2 小时）

## 今日目标

- 在 `app/api/xxx/route.js` 里用 `GET`、`POST` 等函数导出，对应 HTTP 方法。
- 会用内存里的对象数组当「数据库」，实现 list / get one / create / update / delete。
- 统一返回格式：`{ code, message, data }`，错误时设好 status。

## 在 Demo 里对应哪里

- **列表 + 新增**：`app/api/posts/route.js`
  - `export async function GET()` → 返回全部文章。
  - `export async function POST(request)` → `await request.json()` 取 body，校验后往 `lib/postsStore.js` 里 push。
- **单条**：`app/api/posts/[id]/route.js`
  - `GET` → 根据 `params.id` 查一条，没有就 404。
  - `PATCH` → 解析 body，更新一条。
  - `DELETE` → 删除一条。
- **数据层**：`lib/postsStore.js` 里一个数组 + `getAllPosts`、`getPostById`、`createPost`、`updatePost`、`deletePost`。

## 核心概念

1. **Route Handler**：`app/api/路径/route.js`，导出 `GET`、`POST`、`PATCH`、`DELETE` 等，每个对应一个 HTTP 方法。
2. **动态接口**：`app/api/posts/[id]/route.js`，第二个参数是 `{ params }`，`params.id` 即 URL 里的 id。
3. **请求体**：`const body = await request.json()`；返回用 `Response.json({ ... }, { status: 400 })`。

## 自己动手做

1. 不抄 Demo，自己写一个「待办」接口：`app/api/todos/route.js` 的 GET/POST，`app/api/todos/[id]/route.js` 的 GET/PATCH/DELETE，数据放在 `lib/todosStore.js` 的一个数组里。
2. 用浏览器或 Postman 调一遍：GET 列表、POST 新增、PATCH 改一条、DELETE 删一条，确认返回格式一致。

## 小结

- 接口 = `app/api/.../route.js`，导出同名 HTTP 方法。
- 动态段在 `params` 里；body 用 `request.json()`；统一用 `Response.json` 返回。
