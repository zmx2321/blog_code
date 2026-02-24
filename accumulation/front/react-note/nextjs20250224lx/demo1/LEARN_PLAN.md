# Next.js 一周学习计划（每天约 2 小时，纯 JS）

> 不依赖视频，用本仓库的文档 + 可运行 Demo 自学。先跑通 Demo，再按「每日任务」拆开练。

---

## 一、先跑通 Demo（约 30 分钟）

1. **安装依赖并启动**
   ```bash
   npm install
   npm run dev
   ```
2. 浏览器打开 **http://localhost:3000**
3. 按首页提示：点「文章列表」→ 点某篇进详情 →「写文章」→ 在详情里「编辑」「删除」
4. 对照下面「知识点怎么串起来」把请求和文件对应一遍

### 知识点怎么串起来（本 Demo）

| 你做的事           | 用到的 Next 概念           | 对应文件 |
|--------------------|----------------------------|----------|
| 打开首页           | 根布局 + 根页面            | `app/layout.js`、`app/page.js` |
| 点「文章列表」     | 路由即目录：`/posts`       | `app/posts/page.js` |
| 列表显示数据       | 前端 `fetch` 调自己的 API  | `fetch("/api/posts")` → `app/api/posts/route.js` |
| 点「写文章」       | 路由：`/posts/new`         | `app/posts/new/page.js` |
| 提交新文章         | POST 接口                  | `POST` → `app/api/posts/route.js`，数据存 `lib/postsStore.js` |
| 点某篇文章         | 动态路由：`/posts/[id]`     | `app/posts/[id]/page.js`，`useParams().id` |
| 详情拉取/编辑/删除 | GET/PATCH/DELETE 接口      | `app/api/posts/[id]/route.js` |

接口统一返回：`{ code, message, data }`，数据不写数据库，用内存数组模拟（见 `lib/postsStore.js`）。

---

## 二、七天安排（每天约 2 小时）

| 天数 | 主题           | 目标 | 文档 |
|------|----------------|------|------|
| Day1 | 项目与路由     | 会起项目、会改页面和路由 | [docs/day1-项目与路由.md](docs/day1-项目与路由.md) |
| Day2 | 组件与「用客户端」 | 会写 Server/Client 组件、会加简单交互 | [docs/day2-组件与客户端.md](docs/day2-组件与客户端.md) |
| Day3 | 动态路由与列表详情 | 会做列表页、详情页、动态 `[id]` | [docs/day3-动态路由与列表详情.md](docs/day3-动态路由与列表详情.md) |
| Day4 | 写简单接口     | 会写 GET/POST/PATCH/DELETE，用内存数组 | [docs/day4-写简单接口.md](docs/day4-写简单接口.md) |
| Day5 | 前端调接口     | 列表/新增/编辑/删除都调自己的 API | [docs/day5-前端调接口.md](docs/day5-前端调接口.md) |
| Day6 | 刷新与缓存     | 知道为什么数据不刷新、怎么刷新 | [docs/day6-刷新与缓存.md](docs/day6-刷新与缓存.md) |
| Day7 | 整理与验收     | 目录清晰、能讲清流程、可选部署 | [docs/day7-整理与验收.md](docs/day7-整理与验收.md) |

每天文档里有：**今日概念**、**在 Demo 里对应哪里**、**自己动手做**。优先把 Demo 跑熟，再按文档做小练习。

---

## 三、验收标准（一周后）

- **接口**：能写出至少 5 个（list / get / create / update / delete），用对象数组模拟数据。
- **页面**：列表 + 详情 + 新增/编辑（可和 Demo 一样，也可自己换一个资源名）。
- **串起来**：页面真实请求自己的 API，走通一遍增删改查。

---

## 四、目录结构（本仓库）

```
├── LEARN_PLAN.md          # 本文件：总计划
├── README.md              # 运行说明 + 接口列表
├── docs/                  # 每日学习任务
│   ├── day1-项目与路由.md
│   ├── day2-组件与客户端.md
│   ├── …
│   └── day7-整理与验收.md
├── app/
│   ├── layout.js          # 根布局
│   ├── page.js            # 首页
│   ├── not-found.js       # 404
│   ├── globals.css
│   ├── posts/             # 文章相关页面
│   │   ├── page.js        # 列表
│   │   ├── new/page.js    # 新增
│   │   └── [id]/page.js   # 详情/编辑
│   └── api/
│       └── posts/
│           ├── route.js   # GET 列表、POST 新增
│           └── [id]/route.js  # GET/PATCH/DELETE 单条
└── lib/
    └── postsStore.js      # 模拟数据（内存数组）
```

建议：先跑 Demo → 再按 Day1～Day7 顺序看文档并动手做对应练习。
