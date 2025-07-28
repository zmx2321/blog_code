import { createContext } from 'react';

// 创建Context对象
export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { }
});