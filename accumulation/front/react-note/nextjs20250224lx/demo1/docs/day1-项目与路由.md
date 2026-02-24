# Day 1：项目与路由（约 2 小时）

## 今日目标

- 能在本机跑起 Next 项目并改首页内容。
- 理解「路由即目录」：`app/xxx/page.js` 对应路径 `/xxx`。
- 会改根布局、会加一个简单新页面（如 `/about`）。

## 在 Demo 里对应哪里

- 根页面：`app/page.js` → 打开 http://localhost:3000 看到的内容。
- 根布局：`app/layout.js` → 所有页面共用的头部、`<html>/<body>`。
- 文章列表：`app/posts/page.js` → 路径 `/posts`。

## 核心概念

1. **App Router**：路由由 `app` 目录下的文件夹 + `page.js` 决定。
   - `app/page.js` → `/`
   - `app/posts/page.js` → `/posts`
   - `app/posts/new/page.js` → `/posts/new`
2. **layout.js**：该目录及子路由共用，根目录的 `layout.js` 包住整个应用。
3. 用 `<a href="/posts">` 或 Next 的 `<Link href="/posts">` 做导航。

## 自己动手做

1. 改 `app/page.js` 里的一行文案，保存后看浏览器是否热更新。
2. 新建 `app/about/page.js`，写一句「关于页」，在 `app/layout.js` 的导航里加一个「关于」链接，点过去能打开 `/about`。
3. 打开 `app/not-found.js`，访问 http://localhost:3000/xxx 看 404 是否出现。

## 小结

- 路由 = `app` 下目录 + `page.js`。
- 改 `layout.js` 影响所有页面；改 `page.js` 只影响当前路由。
