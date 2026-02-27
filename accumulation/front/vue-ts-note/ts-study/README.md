# ts-study：Vue3 + TypeScript 自学项目（1 天从 JS 迁移到 TS）

> 你已经熟悉 Vue3 + JS，本项目只为一件事服务：**在真实 Vue3 项目里，快速上手 TypeScript，完成从 JS 到 TS 的迁移。**

本仓库结构非常简单：

- `src/learn-plan`：学习计划说明 + 概念讲解页面
- `src/examples`：示例组件（对标你日常写法的 TS 版本）
- `src/exercises`：练习组件（预留空位让你自己写，文件里有中文题目）

你只要：

1. 按顺序打开这些页面在浏览器中查看；
2. 对照注释阅读代码；
3. 在 `exercises` 里按题目要求自行补全；
4. 不会的地方直接把对应文件的代码发给我，我帮你改。

---

## 一、运行方式

```bash
cd ts-study
npm install
npm run dev
```

浏览器打开 `http://localhost:5173`（默认端口），你会看到首页导航，按顺序点击进入各模块。

---

## 二、学习路径总览（建议 1 天或拆成 2～3 天）

1. **基础 TS 思维（对 JS 稍微「加类型」）**
   - 文件：`src/learn-plan/Step1BasicTs.vue`
   - 内容：基础类型、对象/数组、函数类型、联合类型
   - 练习：`src/exercises/Step1BasicsExercise.vue`

2. **在 Vue3 组件里写 TS**
   - 文件：`src/learn-plan/Step2VueTsBasics.vue`
   - 内容：`<script setup lang="ts">`、`ref` / `reactive` / `computed` / `watch`
   - 练习：`src/exercises/TodoListTs.vue`

3. **Props / Emits / 父子组件通信**
   - 文件：`src/learn-plan/Step3PropsEmits.vue`
   - 内容：`defineProps`、`defineEmits`、提取公共类型
   - 练习：`src/exercises/UserCard.vue` + `src/exercises/UserList.vue`

4. **接口请求 + 泛型 + 组合式函数**
   - 文件：`src/learn-plan/Step4ApiAndComposables.vue`
   - 内容：接口返回类型、泛型 `ApiResponse<T>`、`useFetch<T>` 的写法
   - 练习：`src/exercises/PostList.vue`、`src/exercises/useFetch.ts`

5. **小型实战：用户 + 文章迷你后台**
   - 文件：`src/learn-plan/Step5MiniProject.vue`
   - 内容：用前面所有知识串起来
   - 练习：`src/exercises/mini-project` 目录（留给你完整实战）

你可以完全只看这些文件，不需要查外部文档，也能把日常开发迁移到 TS。

---

## 三、如何使用这个项目学习

- **像刷题一样**：每个学习页面后面都有「思考题 / 练习题」，对应的空白实现放在 `src/exercises` 里。
- **遇到不会写的类型**：
  - 先按 JS 直觉写代码；
  - 然后 **只加最少的类型** 让编辑器不报错；
  - 实在不确定时，把代码发给我，我帮你优化。
- **重点不是记概念，而是把你现有的写法多加一层「类型安全」。**

---

## 四、目录说明（本子项目）

```text
ts-study/
├── src/
│   ├── App.vue              # 入口：导航到各学习页面
│   ├── main.ts              # Vue3 入口
│   ├── learn-plan/          # 学习计划 + 知识讲解
│   │   ├── Step1BasicTs.vue
│   │   ├── Step2VueTsBasics.vue
│   │   ├── Step3PropsEmits.vue
│   │   ├── Step4ApiAndComposables.vue
│   │   └── Step5MiniProject.vue
│   ├── examples/            # 示例代码（已写好）
│   └── exercises/           # 练习代码（预留空位）
└── ...
```

你可以按顺序完成全部练习，完成后基本就能在实际 Vue3 项目里自然使用 TS 了。
