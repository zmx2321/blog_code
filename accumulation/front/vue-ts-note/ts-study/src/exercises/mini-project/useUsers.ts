import { ref } from 'vue'

/**
 * mini-project 练习：useUsers 组合式函数
 *
 * 建议目标：
 * - users: Ref<User[]>
 * - currentUserId: Ref<number | null>
 * - selectUser(id: number): void
 *
 * 你可以从 ./types 中引入 User 类型，也可以边写边调整。
 */

// TODO：在这里实现 useUsers，返回 users / currentUserId / selectUser

export function useUsers() {
  const users = ref([]) // TODO: 补全为 Ref<User[]>
  const currentUserId = ref<number | null>(null)

  function selectUser(_id: number) {
    // TODO: 实现选中逻辑
  }

  return {
    users,
    currentUserId,
    selectUser,
  }
}

