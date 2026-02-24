# Day 6：刷新与缓存（约 2 小时）

## 今日目标

- 知道为什么有时「刚删/刚改完，列表还显示旧数据」：列表是之前 fetch 的结果，没有重新请求。
- 会用在合适时机重新 fetch，或 `router.refresh()`，让界面和数据一致。

## 在 Demo 里对应哪里

- 新增成功后：`app/posts/new/page.js` 里 `router.push("/posts")` + `router.refresh()`，列表页会重新拉数据（若列表是 Client 且用 useEffect 依赖或初次挂载拉取，跳转过去会重新挂载一般会再请求；显式 `refresh` 可让服务端组件再跑一遍）。
- 删除成功后：`app/posts/[id]/page.js` 里 `router.push("/posts")` + `router.refresh()`，回到列表时看到最新数据。

## 核心概念

1. **Client 的 state**：列表数据在 useState 里，不重新请求就不会变。所以「删/改」后跳回列表时，要么列表页重新 mount 会 useEffect 再请求，要么在列表页提供「刷新」按钮再调一次 fetch。
2. **router.refresh()**：让 Next 重新执行当前路由的 Server Component 并更新 RSC payload；若列表是 Client 且自己 fetch，主要靠「重新请求」或「刷新按钮」。
3. **fetch 缓存**：Next 对 fetch 有默认缓存，开发时 `fetch(url, { cache: "no-store" })` 可避免拿到旧数据；我们当前 Demo 的列表是客户端 fetch，每次进页面会重新请求，一般没问题。

## 自己动手做

1. 在文章列表页加一个「刷新」按钮，点击时重新 `fetch("/api/posts")` 并 setList，确认删掉一篇后回列表点刷新能看到已删。
2. 试一次：不点刷新，删除后 `router.push("/posts")` 是否已经会重新请求？（因为列表页重新挂载，useEffect 会再跑一次。）

## 小结

- 数据不更新多半是没再请求或没再 setState；删/改后跳转 + 列表重新请求或 refresh 即可。
- 服务端 fetch 想禁用缓存可加 `cache: "no-store"`。
