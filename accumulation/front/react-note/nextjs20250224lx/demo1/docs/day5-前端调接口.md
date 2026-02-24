# Day 5：前端调接口（约 2 小时）

## 今日目标

- 在 Client Component 里用 `fetch` 调自己的 API（如 `/api/posts`）。
- 列表页：`useEffect` 里 GET 列表，设 state 渲染；loading、error 状态要处理。
- 新增：表单 `onSubmit` 里 POST，成功后跳转或刷新列表。
- 详情页：GET 单条展示；编辑用 PATCH；删除用 DELETE，成功后跳转列表。

## 在 Demo 里对应哪里

- **列表**：`app/posts/page.js` — `fetch("/api/posts")` → `setList(json.data)`，有 loading/error。
- **新增**：`app/posts/new/page.js` — `fetch("/api/posts", { method: "POST", body: JSON.stringify(...) })`，成功后 `router.push("/posts")`。
- **详情/编辑/删除**：`app/posts/[id]/page.js` — GET 拉详情，PATCH 保存编辑，DELETE 删掉并 `router.push("/posts")`，都用 `fetch`。

## 核心概念

1. **同源**：前端和 Next 在同一域名下，直接 `fetch("/api/xxx")` 即可，无需写完整 URL。
2. **POST/PATCH**：记得 `headers: { "Content-Type": "application/json" }` 和 `body: JSON.stringify(data)`。
3. **router**：`import { useRouter } from "next/navigation"`，`router.push("/posts")`、`router.refresh()` 可刷新服务端数据。

## 自己动手做

1. 给 Day 4 的「待办」写简单页面：列表页调 GET，一个表单调 POST；列表每项点进去是详情页，详情页可 PATCH 和 DELETE。不要求样式多好，能跑通即可。
2. 在列表或表单处加简单 loading（如按钮 disabled + 文案「提交中…」）。

## 小结

- 前端用 `fetch` 调 `/api/...`，注意 method、headers、body。
- 改完数据后用 `router.push` 或 `router.refresh()` 更新界面。
