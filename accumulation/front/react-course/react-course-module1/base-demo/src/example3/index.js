// react中组件传参实际上就是函数传参,使用props来接收参数
const Example3 = (props) => {
    // 会将jsx所接收的属性转换为单个对象,传递到组件中,这个对象就是props
    console.log(props);

    return (
        <div className="example3">
            { props.name }
        </div>
    );
}

export default Example3;

/* // react中组件传参实际上就是函数传参,使用props来接收参数
function Example3 (props) {
    // 会将jsx所接收的属性转换为单个对象,传递到组件中,这个对象就是props
    console.log(props);

    return (
        <div className="example3">
            { props.name }
        </div>
    );
}

export default Example3; */

/**
 * 类组件 - 真实项目中应用最多
 */

/* import React, { Component } from 'react';

// class Example3 extends React.Component {
class Example3 extends Component {
    // 如果有构造函数,默认就会调用super(props)
    constructor(props) {
        // 有构造函数必须调用super
        super(props);
    }

    // render函数中必须return jsx 元素
    render() {
        console.log(this.props);

        return (
            <div className="example3">
                { this.props.name }
                <br />
                { this.props.testData }
            </div>
        );
    }
}

export default Example3;  */