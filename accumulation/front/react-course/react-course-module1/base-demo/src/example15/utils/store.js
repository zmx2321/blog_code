import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// 确保正确导出store
export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
});
