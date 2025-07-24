import { useEffect } from 'react';

// 高阶组件函数：给组件添加日志功能
const withLogger = (WrappedComponent) => {
    return function EnhancedComponent (props) {
        useEffect(() => {
            console.log(`组件 ${WrappedComponent.name} 已挂载`);
            return () => {
                console.log(`组件 ${WrappedComponent.name} 即将卸载`);
            };
        }, []);

        useEffect(() => {
            console.log(`组件 ${WrappedComponent.name} 已更新`);
        });

        return <WrappedComponent {...props} />;
    };
}

// 基础组件
// 定义一个基础组件，接收一个title参数
const BaseComponent = ({ title }) => {
    // 返回一个div，包含一个h2标题和一个p段落
    return (
        <div>
            <h2>{title || "基础组件"}</h2>
            <p>这是一个被高阶组件增强的组件</p>
        </div>
    );
}

// 使用高阶组件增强基础组件
const EnhancedComponent = withLogger(BaseComponent);

// 默认导出增强后的组件
export default EnhancedComponent;

// 可选：同时导出基础组件用于对比
export { BaseComponent };