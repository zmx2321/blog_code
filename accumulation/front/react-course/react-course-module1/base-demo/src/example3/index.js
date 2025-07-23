// react中组件传参实际上就是函数传参,使用props来接收参数
function Example3 (props) {
    console.log(props);

    return (
        <div className="example3">
            { props.name }
        </div>
    );
}

export default Example3;

/**
 * 类组件
 */

/* import React from 'react';

class Example3 extends React.Component {
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