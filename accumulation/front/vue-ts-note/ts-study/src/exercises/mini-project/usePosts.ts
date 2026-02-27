import { ref } from 'vue'

/**
 * mini-project 练习：usePosts 组合式函数
 *
 * 建议目标：
 * - posts: Ref<Post[]>
 * - fetchPostsByUser(userId: number): Promise<void> | void
 * - createPost(userId: number, payload: { title: string; content: string }): void
 *
 * 你可以用 setTimeout 模拟接口请求，不必真的连后端。
 */

// TODO：在这里实现 usePosts，返回 posts / fetchPostsByUser / createPost

export function usePosts() {
  const posts = ref([]) // TODO: 补全为 Ref<Post[]>

  function fetchPostsByUser(_userId: number) {
    // TODO: 模拟拉取文章列表
  }

  function createPost(_userId: number, _payload: { title: string; content: string }) {
    // TODO: 向 posts 中 push 一条新记录
  }

  return {
    posts,
    fetchPostsByUser,
    createPost,
  }
}

