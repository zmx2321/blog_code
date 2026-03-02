import { useState } from 'react'

/**
 * 04 条件渲染与列表 - Vue 工程师对照（TS 版）
 *
 * Vue: v-if / v-for="x in list" :key="x.id"
 * React + TS: { condition && <Node />}、list.map(x => <Node key={x.id} />) + 列表项类型
 */

type Item = {
  id: number
  label: string
}

const INIT_ITEMS_TS: Item[] = [
  { id: 1, label: '苹果' },
  { id: 2, label: '香蕉' },
  { id: 3, label: '橙子' },
]

function Learn04ConditionalListTs() {
  const [show, setShow] = useState<boolean>(true)
  const [items, setItems] = useState<Item[]>(INIT_ITEMS_TS)

  return (
    <div className="learn-section">
      <h2>04 条件与列表（TS 版）</h2>
      <p className="vue-tip">
        Vue: v-if / v-for → React + TS: 条件渲染 + 列表 map，列表项用 Item 类型
      </p>
      <label>
        <input
          type="checkbox"
          checked={show}
          onChange={(e) => setShow(e.target.checked)}
        />
        显示下方内容
      </label>
      {show && <p>这段是条件渲染出来的</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.label}
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Learn04ConditionalListTs

