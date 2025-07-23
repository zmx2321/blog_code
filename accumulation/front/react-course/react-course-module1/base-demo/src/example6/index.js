import React, { Component } from 'react';

class Example6 extends Component {
    static defaultProps = {
        myMsg: 'Hello World Example6'
    }

    constructor(props) {
        super(props);

        console.log('1、初始化,加载默认的状态')

        // 初始化 state，使用传入的 msg 作为初始值  
        this.state = { count: 0 };
    }

    componentWillUnmount () {
        console.log('2、父组件将要被挂载')
    }

    componentDidMount () {
        // 当前的这个方法中 ， 发起ajax请求， 获取数据 数据驱动视图
        console.log('4、组件挂载完成')
    }

    // 重要 - 做性能优化
    shouldComponentUpdate (nextProps, nextState) {
        console.log('5、组件是否要更新')
        // 默认返回 true，表示要更新
        // return true;

        // 只在 count 为偶数时才更新组件
        // 只能看到偶数,不能看到奇数
        // 为奇数的时候不触发render,达到性能优化
        if (nextState.count % 2 === 0) {
            return true;
        } else {
            return false;
        }
    }

    componentWillUpdate () {
        console.log('6、组件将要更新')
    }

    componentDidUpdate () {
        console.log('7、组件更新完成')
    }

    componentWillUnmount () {
        console.log('8、组件将要卸载')
    }

    handleClick () {
        console.log('点击事件')

        // { count: this.state.count + 1 }
        this.setState((prevState, prevProps) => {
            return {
                count: prevState.count + 1
            }
        }, () => {
            console.log('状态更新完成')
        });
    }

    render () {
        console.log('3、渲染组件')

        return (
            <>
                <h2>
                    当前的值为：{this.state.count}
                </h2>
                <button onClick={this.handleClick.bind(this)}>+1</button>
            </>
        )
    }
}

export default Example6;