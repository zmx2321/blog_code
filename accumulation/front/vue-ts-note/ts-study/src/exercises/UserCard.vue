<script setup lang="ts">
/**
 * Step3 练习一：UserCard 子组件（Props + Emits）
 *
 * 目标：
 * - 练习在组件里用 TS 写 props 和 emits
 * - 模拟一个用户卡片，向父组件抛出 select / delete 事件
 */

// TODO 1：定义 UserRole 和 User 类型
// 建议：
// export type UserRole = 'admin' | 'editor' | 'viewer'
// export interface User { id: number; name: string; role: UserRole }

// TODO 2：定义 UserCardProps 类型
// 字段：
// - user: User

// TODO 3：使用 defineProps 声明 props，类型为 UserCardProps
// const props = defineProps<...>()

// TODO 4：使用 defineEmits 声明事件
// 事件：
// - 'select'：参数为 user.id (number)
// - 'delete'：参数为 user.id (number)
// const emit = defineEmits<{
//   (e: 'select', id: number): void
//   (e: 'delete', id: number): void
// }>()

// TODO 5：编写触发事件的函数（可选）
// function handleSelect() { emit('select', props.user.id) }
// function handleDelete() { emit('delete', props.user.id) }
</script>

<template>
  <div class="card">
    <!-- 这里先写一个占位模板，等你实现完逻辑后可以自行美化 -->
    <p class="tip">
      请在 <code>&lt;script setup&gt;</code> 中完成 UserCard 的 props / emits 类型定义和触发逻辑。
    </p>
  </div>
</template>

<style scoped>
.card {
  padding: 8px 10px;
  border-radius: 8px;
  background: #020617;
  border: 1px solid #4b5563;
  margin-bottom: 6px;
}

.tip {
  font-size: 13px;
  color: #9ca3af;
}
</style>

