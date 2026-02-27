<script setup lang="ts">
/**
 * Step3 练习二：UserList 父组件
 *
 * 目标：
 * - 练习在父组件中声明 User[] 的状态
 * - 使用 UserCard 子组件，并正确绑定 props / emits
 */

// TODO 1：从 UserCard 中复用 User / UserRole 类型（推荐）
// 你可以选择：
// - 把 User / UserRole 类型单独抽到一个文件（如 src/examples/types/user.ts）
// - 或者暂时在这里再定义一次，之后再重构

// TODO 2：定义一个用户列表状态
// 建议：
// const users = ref<User[]>([ ... ])

// TODO 3：实现 onSelect / onDelete 事件处理函数
// 要求：
// - onSelect(id: number): 标记当前选中用户（可以额外建一个 selectedUserId: Ref<number | null>）
// - onDelete(id: number): 从 users 中移除该用户

// TODO 4：在模板中循环渲染 UserCard
// <UserCard
//   v-for="user in users"
//   :key="user.id"
//   :user="user"
//   @select="onSelect"
//   @delete="onDelete"
// />
</script>

<template>
  <section>
    <h2>Step3 练习：UserList.vue</h2>
    <p class="tip">
      打开本文件 <code>UserList.vue</code>，按照上方注释实现一个带类型的用户列表父组件，配合
      <code>UserCard</code> 一起使用。
    </p>
    <p class="tip">
      你可以先不在意样式，专注在：列表状态的类型声明、props / emits 的类型是否正确。
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

