# Day 2：组件与「用客户端」（约 2 小时）

## 今日目标

- 知道默认是 Server Component，不能直接用 `useState`、`useEffect`、事件。
- 需要交互时在文件顶行写 `"use client"`，变成 Client Component。
- 会写简单展示组件 + 一个带状态的组件（如计数器）。

## 在 Demo 里对应哪里

- **Server Component**（无 `"use client"`）：`app/page.js`、`app/layout.js`。
- **Client Component**（有 `"use client"`）：`app/posts/page.js`（用 `useState`、`useEffect`、`fetch`）、`app/posts/new/page.js`（表单、`useRouter`）、`app/posts/[id]/page.js`（编辑、删除）。

## 核心概念

1. **Server Component**：只在服务端渲染，不能写 `useState`、`onClick`、`useEffect`。可 async、可直接读库/接口（服务端）。
2. **Client Component**：首行 `"use client"`，可写 Hooks、事件、浏览器 API、`fetch` 调自己的 API。
3. 从 Server 可以 import 并渲染 Client 组件；反过来不行（Client 里可以 import Server 组件当 children 传进去，但一般用 Client 包一层交互）。

## 自己动手做

1. 在 `app` 下建 `components` 文件夹，写一个 `Counter.js`：`"use client"`，内有一个数字 + 按钮点击加 1，在 `app/page.js` 里引入并渲染（若 `page.js` 是 Server，可直接 `<Counter />`）。
2. 再写一个纯展示组件 `Hello.js`（不写 `"use client"`），接收 `name` 显示 `Hello, {name}`，在首页用 `<Hello name="Next" />`。

## 小结

- 要交互、状态、`useEffect`、`fetch` → 用 `"use client"`。
- 纯展示、无状态 → 可不写，默认 Server Component。
