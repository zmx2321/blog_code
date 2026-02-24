/**
 * 全局 404：访问不存在的路由时显示
 * 文件名固定为 not-found.js
 */
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <h1>404</h1>
        <p>页面不存在</p>
        <Link href="/">返回首页</Link>
      </div>
    </div>
  )
}
