# Day 3：动态路由与列表详情（约 2 小时）

## 今日目标

- 会做动态路由：`app/posts/[id]/page.js`，在组件里用 `useParams()` 拿到 `id`。
- 能做一个「列表页 + 详情页」结构，列表点某项进详情。

## 在 Demo 里对应哪里

- 列表：`app/posts/page.js`，从 `fetch("/api/posts")` 拿数据，渲染链接到 `/posts/1`、`/posts/2`…
- 动态路由：`app/posts/[id]/page.js`，`const params = useParams()`，`params.id` 即 URL 里的 id。
- 详情页用 `fetch(\`/api/posts/${id}\`)` 拉单条（Day 4 会写这个接口，这里先会用即可）。

## 核心概念

1. **动态段**：文件夹名用方括号 `[id]`，表示这一段是动态的，如 `/posts/123` 中 `id = "123"`。
2. **useParams()**：在 Client Component 里用，`useParams().id` 拿到当前路由里的 `id`。
3. 列表到详情：列表项用 `<Link href={\`/posts/${post.id}\`}>`，点进去就是详情页。

## 自己动手做

1. 若你还没自己写列表/详情：新建一个「图书」模块，`app/books/page.js` 写死 3 本书的数组，渲染成列表，每项链接到 `app/books/[id]/page.js`；详情页用 `useParams().id` 从数组里 find 出这本书并展示。
2. 在详情页处理「id 不存在」：找不到时显示「未找到」或跳 404。

## 小结

- 动态路由 = `[参数名]` 文件夹 + `page.js`。
- Client 里用 `useParams()` 取参数；列表用 `Link` 链到详情。
