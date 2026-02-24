# Next.js 一周学习 Demo

用「文章列表 + 详情 + 增删改」串起路由、组件、API、CRUD，不连数据库，内存数组模拟数据。适合有 Vue/React 基础、想在一周内上手 Next.js 并会写简单接口的同学。

## 如何运行

```bash
# 安装依赖
npm install

# 开发
npm run dev
```

浏览器打开 **http://localhost:3000**。

- 首页：介绍与导航  
- 文章列表：http://localhost:3000/posts  
- 写文章：http://localhost:3000/posts/new  
- 文章详情/编辑：http://localhost:3000/posts/1（1 可换成任意 id）

## 接口列表（均返回 `{ code, message, data }`）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/posts | 获取所有文章 |
| POST | /api/posts | 新增文章，Body: `{ "title": "标题", "content": "内容" }` |
| GET | /api/posts/:id | 获取单篇 |
| PATCH | /api/posts/:id | 更新，Body: `{ "title": "?", "content": "?" }` |
| DELETE | /api/posts/:id | 删除 |

数据存在内存中（`lib/postsStore.js`），重启 dev 会恢复为初始 3 条。

## 学习文档

- **总计划**：[LEARN_PLAN.md](./LEARN_PLAN.md) — 七天安排与知识点对应表  
- **每日任务**：`docs/day1-项目与路由.md` ～ `docs/day7-整理与验收.md`

建议：先跑通本 Demo，再按 Day1～Day7 顺序看文档并做练习。
