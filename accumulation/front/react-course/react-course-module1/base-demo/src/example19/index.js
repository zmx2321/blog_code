import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Example19 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        // 带参数跳转示例
        navigate(path, {
            state: {
                from: location.pathname,
                timestamp: Date.now()
            }
        });
    };

    return (
        <div>
            <h2>当前路径：{location.pathname}</h2>

            <button onClick={() => handleNavigate('/')}>
                跳转首页
            </button>

            <button onClick={() => handleNavigate('/about')}>
                跳转关于页
            </button>

            <button onClick={() => handleNavigate(-1)}>
                返回上一页
            </button>
        </div>
    );
}

export default Example19;