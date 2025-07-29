import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

// 创建页面组件
const Home = () => <h3>首页内容</h3>;
const About = () => <h3>关于页面</h3>;

const Example18 = () => {
    return (
        <Router>
            <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                <Link to="/" style={{ marginRight: '20px' }}>首页</Link>
                <Link to="/about">关于</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default Example18;