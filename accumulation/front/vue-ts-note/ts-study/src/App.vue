<script setup lang="ts">
import Step1BasicTs from './learn-plan/Step1BasicTs.vue'
import Step2VueTsBasics from './learn-plan/Step2VueTsBasics.vue'
import Step3PropsEmits from './learn-plan/Step3PropsEmits.vue'
import Step4ApiAndComposables from './learn-plan/Step4ApiAndComposables.vue'
import Step5MiniProject from './learn-plan/Step5MiniProject.vue'

type TabKey =
  | 'step1'
  | 'step2'
  | 'step3'
  | 'step4'
  | 'step5'

const tabs: { key: TabKey; label: string; desc: string }[] = [
  { key: 'step1', label: 'Step1 基础 TS 思维', desc: '在 JS 上加类型的最小集合' },
  { key: 'step2', label: 'Step2 Vue3 + TS 基础', desc: '<script setup lang=\"ts\">、ref/reactive/computed' },
  { key: 'step3', label: 'Step3 Props & Emits', desc: '组件通信 + 类型安全' },
  { key: 'step4', label: 'Step4 接口 & 组合式函数', desc: '接口类型、泛型、useFetch' },
  { key: 'step5', label: 'Step5 小型实战项目', desc: '用户 + 文章迷你后台' },
]

const activeTab: TabKey = 'step1'
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>ts-study：Vue3 + TypeScript 实战学习</h1>
      <p class="subtitle">
        目标：从熟练 Vue3 + JS到可以在真实项目中自然使用 TS，只用本项目，不查外部资料也能学完。
      </p>
    </header>

    <main class="main">
      <nav class="nav">
        <h2>学习路径</h2>
        <ul>
          <li v-for="tab in tabs" :key="tab.key" class="nav-item">
            <div class="nav-title">
              <span class="nav-label">{{ tab.label }}</span>
              <small class="nav-desc">{{ tab.desc }}</small>
            </div>
          </li>
        </ul>
        <p class="tip">
          建议顺序学习，从上到下；每个 Step 的对应练习都在 <code>src/exercises</code> 目录下。
        </p>
      </nav>

      <section class="content">
        <!-- 为了简单，这里不做真正的 tab 切换，直接按顺序展示所有 Step。
             你也可以自己加上基于 activeTab 的切换，当作一个小练习。 -->
        <Step1BasicTs />
        <Step2VueTsBasics />
        <Step3PropsEmits />
        <Step4ApiAndComposables />
        <Step5MiniProject />
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.header {
  margin-bottom: 24px;
}

.header h1 {
  font-size: 26px;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #555;
}

.main {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 24px;
  width: 100%;
}

.nav {
  padding: 16px 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.nav h2 {
  font-size: 16px;
  margin-bottom: 12px;
}

.nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item + .nav-item {
  margin-top: 10px;
}

.nav-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-label {
  font-size: 14px;
  font-weight: 600;
}

.nav-desc {
  font-size: 12px;
  color: #666;
}

.tip {
  margin-top: 12px;
  font-size: 12px;
  color: #666;
}

.content {
  padding: 20px 22px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

@media (max-width: 900px) {
  .main {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
