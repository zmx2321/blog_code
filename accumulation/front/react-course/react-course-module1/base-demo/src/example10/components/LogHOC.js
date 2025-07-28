import React from 'react'

// 打印日志的高阶组件
// 传入一个组件,做一些操作,返回一个新的组件
const withLog = (Comp) => {
    // 返回的新组件增加生命周期日志
    return function NewComponent (props) {
        console.log(`组件 ${Comp.name} 被创建`);
        React.useEffect(() => {
            console.log(`组件 ${Comp.name} 完成渲染`);
            return () => {
                console.log(`组件 ${Comp.name} 即将卸载`);
            };
        }, []);

        return <Comp {...props} />;
    };
}


// 创建测试用展示组件
const TestComponent = (props) => (
    <div style={{ border: '1px solid #ccc', padding: 10 }}>
        <h3>测试组件</h3>
        <p>接收参数：{props.message}</p>
    </div>
);

// 用高阶组件增强测试组件
const EnhancedComponent = withLog(TestComponent);

const LogHOC = () => {
    return (
        <>
            <h2>高阶组件演示</h2>
            <EnhancedComponent message="来自高阶组件的参数" />
        </>
    )
}

export default LogHOC