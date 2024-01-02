import { configureStore } from "@reduxjs/toolkit";
// 引入 reducer 函数
import counterSlice from "./modules/counterSlice";

// 使用configureStore创建一个redux仓库
// 并自动配置了 Redux DevTools 扩展 ，这样你就可以在开发时调试 store
export default configureStore({
  reducer: {
    // 告诉 store 使用这个 slice reducer 函数来处理对该状态的所有更新
    counter: counterSlice,
  },
});
