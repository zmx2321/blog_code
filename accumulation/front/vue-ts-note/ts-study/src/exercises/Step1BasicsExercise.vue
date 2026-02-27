<script setup lang="ts">
/**
 * Step1 练习：基础类型与函数
 *
 * 说明：
 * - 这里只写了一些 TODO 提示，留给你自己完成
 * - 建议你先按 JS 直觉写，再一点点把类型补齐
 * - 做完可以把本文件发给我，我帮你做一次类型 review
 */

// TODO 1：补全 User 类型
// 要求：
// - id: number
// - name: string
// - age: number
// - isVip?: boolean（可选）
type User = any

// TODO 2：补全 Product 类型
// 要求：
// - id: number
// - name: string
// - price: number
// - tags?: string[]（可选）
type Product = any

// TODO 3：定义 Role 联合类型
// 要求：'admin' | 'editor' | 'viewer'
type Role = any

// TODO 4：实现函数 discountPrice
// 要求：
// - 参数 product: Product
// - 参数 discount: number（0-1 之间）
// - 返回：打折后价格 number
function discountPrice(product: any, discount: any) {
  // 在这里写你的实现
  return 0
}

// TODO 5：实现函数 canEdit
// 要求：
// - 参数 role: Role
// - 返回：boolean
// - 逻辑：admin / editor 返回 true，viewer 返回 false
function canEdit(role: any) {
  // 在这里写你的实现
  return false
}

// 示例数据（你可以修改）
const demoUser = {
  id: 1,
  name: 'Demo User',
  age: 20,
}

const demoProduct = {
  id: 1,
  name: 'Demo Product',
  price: 100,
}
</script>

<template>
  <section>
    <h2>Step1 练习：基础类型与函数</h2>
    <p class="tip">
      打开本文件 <code>Step1BasicsExercise.vue</code>，按照注释中的 TODO 提示补全类型和实现。做完后可以把代码发给我，我会帮你一起看是否有更好的 TS 写法。
    </p>
    <p class="tip">
      建议你先不看任何资料，完全靠自己的 JS 直觉去写，然后只为了解决类型报错去补类型，这样更贴近你真实迁移的过程。
    </p>
  </section>
</template>

<style scoped>
section {
  border-bottom: 1px dashed rgba(148, 163, 184, 0.4);
  padding-bottom: 12px;
  margin-bottom: 12px;
}

h2 {
  font-size: 15px;
  margin-bottom: 6px;
}

.tip {
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 4px;
}
</style>

