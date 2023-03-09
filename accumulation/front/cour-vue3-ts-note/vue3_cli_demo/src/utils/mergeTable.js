// import { getRowSpanMethod } from '@/utils/use-span-method.js'
// //调用函数并导出需要的合并列函数 注意需要根据
// //data为查询到的数据
// //['prop1', 'prop2', 'prop3'] 需要合并的列
// const spanMethod = getRowSpanMethod(data, ['prop1', 'prop2', 'prop3'])

/**
 * 合并相同数据，导出合并列所需的方法(只适合el-table)
 */
export function getRowSpanMethod(data, rowSpanArray) {
  /**
   * 要合并列的数据
   */
  const rowSpanNumObject = {}

  //初始化 rowSpanNumObject
  rowSpanArray.map((item) => {
    rowSpanNumObject[item] = new Array(data.length).fill(1, 0, 1).fill(0, 1)
    rowSpanNumObject[`${item}-index`] = 0
  })
  //计算相关的合并信息
  for (let i = 1; i < data.length; i++) {
    rowSpanArray.map((key) => {
      const index = rowSpanNumObject[`${key}-index`]
      if (data[i][key] === data[i - 1][key]) {
        rowSpanNumObject[key][index]++
      } else {
        rowSpanNumObject[`${key}-index`] = i
        rowSpanNumObject[key][i] = 1
      }
    })
  }

  //提供合并的方法并导出
  const spanMethod = function ({ row, column, rowIndex, columnIndex }) {
    if (rowSpanArray.includes(column['property'])) {
      const rowspan = rowSpanNumObject[column['property']][rowIndex]
      if (rowspan > 0) {
        return { rowspan: rowspan, colspan: 1 }
      }
      return { rowspan: 0, colspan: 0 }
    }
    return { rowspan: 1, colspan: 1 }
  }

  return spanMethod
}
