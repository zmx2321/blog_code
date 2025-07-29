import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const About = () => {
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
            <button onClick={() => handleNavigate('/')}>
                跳转首页
            </button>
            <h2>关于页面内容</h2>
            <p>这里是示例19的关于页面</p>
        </div>
    );
}

export default About;