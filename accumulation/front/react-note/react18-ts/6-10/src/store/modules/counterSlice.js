import { createSlice } from "@reduxjs/toolkit";

// 创建react数据切片 利用createSlice()
export const counterSlice = createSlice({
  // 类似于vuex的命名空间，必须是唯一值
  // 与pinia的defineStore()的第一个参数一个意思，都是唯一值，做区分
  name: "counter",
  // 公共状态
  initialState: { value: 0, list: [1, 1, 1] },
  // 方法
  reducers: {
    // 方法接收2个参数，第一个参数是变量，第二个参数是载荷(也就是使用方法传入的参数)
    // 增加1
    increment: (state) => {
      state.value += 1;
      state.list.push(1);
    },
    // 减少1
    decrement: (state) => {
      state.value -= 1;
      state.list.pop(1);
    },
  },
});

// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
