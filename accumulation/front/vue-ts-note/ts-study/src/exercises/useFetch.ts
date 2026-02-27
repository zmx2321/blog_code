import { ref } from 'vue'

/**
 * Step4 练习一：实现一个最小可用的 useFetch<T>
 *
 * 目标：
 * - 练习在组合式函数中使用泛型
 * - 返回 data / loading / error 三件套
 *
 * 建议实现方向（伪代码）：
 *
 * export function useFetch<T>(url: string) {
 *   const data = ref<T | null>(null)
 *   const loading = ref(false)
 *   const error = ref<string | null>(null)
 *
 *   // 发请求，更新 data / loading / error
 *
 *   return { data, loading, error }
 * }
 */

// TODO：在这里实现 useFetch<T> 函数
// 要求：
// - 使用泛型参数 <T>
// - data: Ref<T | null>
// - loading: Ref<boolean>
// - error: Ref<string | null>
// - 可以直接用 fetch，也可以用 setTimeout 模拟接口

export function useFetch<T>(_url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 在这里补充你的请求逻辑

  return {
    data,
    loading,
    error,
  }
}

