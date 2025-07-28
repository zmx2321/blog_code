/**
 * 高阶组件是一个函数，它接受一个组件作为参数，并返回一个新的组件。这个新的组件会使用传入的组件作为其基础，并添加一些额外的功能。
 * 
 * react高阶组件可以让我们写出易于维护的代码
 * 
 * 高阶组件实际上就是拆分组件，将组件拆分成多个小组件，然后通过高阶组件组合起来
 * 
 * 给你一个赛亚人, 你给他一个力量属性，他就能变成赛亚人
 */

function BasicComponent (props) {
    return <div>Hello, {props.name}! {props.message}</div>;
}

function withMessage (WrappedComponent) {
    return function WithMessageComponent (props) {
        return <WrappedComponent {...props} message="附加消息" />;
    };
}

const EnhancedComponent = withMessage(BasicComponent);


const HOC = () => {
    return (
        <>
            <h2>
                这是一个HOC
            </h2>
            {/* 在这个例子中，EnhancedComponent是通过withMessage高阶组件包装后的组件，它接收name属性并显示一个附加的消息。这种方式展示了如何在不使用类的情况下创建和使用高阶组件。 */}
            <EnhancedComponent name="React HOC" />
        </>
    );
};

export default HOC;