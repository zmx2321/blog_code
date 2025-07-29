/**
 * 利用js的闭包,[柯里化函数]实现组件代理
 * 我们可以在代理组件中,经过业务逻辑的处理,获取一些信息,最后基于属性等方法,传递给我们最终要渲染的组件
 */

const Demo = (props) => {
    console.log(props);

    return (
        <>
            <h2>
                我是Demo组件
            </h2>
        </>
    )
}

// 正常是直接导出demo组件
// export default Demo

const proxyTest = Component => {
    // 可以直接导出一个组件(demo组件)
    // 就是一个普通的组件
    // return Component

    let isUse = true;  // 还可以传自定义属性

    // 我们可以对这个组件做一系列代理操作
    // 使用闭包,可以对组件进行操作
    return props => {
        console.log('proxyTest', props);

        return <Component {...props} isUse={isUse} />

    }
}

// 高阶组件导出的是柯里化函数
// 即导出的是proxyTest的返回值
export default proxyTest(Demo)