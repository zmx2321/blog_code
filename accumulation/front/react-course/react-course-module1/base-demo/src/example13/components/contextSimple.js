/**
 * context 类比 vue 的 provide/inject
 * 
 * react中是 provider 和 consumer
 */

import { useState } from 'react';
import ToolBar from './ToolBar';
import { ThemeContext } from './ThemeContext';

const ContextSimple = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        console.log('toggleTheme', theme);
    }

    return (
        <>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <button onClick={toggleTheme}>切换主题</button>
                <ToolBar />
            </ThemeContext.Provider>
        </>
    )
}

export default ContextSimple;