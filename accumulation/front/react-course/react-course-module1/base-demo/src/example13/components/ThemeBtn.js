import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeBtn = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            style={{
                backgroundColor: theme === 'dark' ? '#333' : '#FFF',
                color: theme === 'dark' ? '#FFF' : '#333',
                padding: '10px 20px',
                cursor: 'pointer',
            }}
            onClick={toggleTheme}
        >
            当前主题：{theme}（点击切换）
        </button>
    )
}

export default ThemeBtn
