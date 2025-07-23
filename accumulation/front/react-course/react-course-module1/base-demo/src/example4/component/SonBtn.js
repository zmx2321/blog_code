import React, { Component } from 'react'

const handle = (props) => {
    const { onEdit } = props;

    if (onEdit) {
        const editData = {
            name: '子组件数据',
            age: new Date().getTime()
        };
        // 子组件调用父组件传过来的方法, 并将数据传递过去
        onEdit(editData);
    }
}

export default class SonBtn extends Component {
    render () {
        return (
            <>
                {/* 添加按钮, 子组件接收到父组件传过来的方法 */}
                <button onClick={() => handle(this.props)}>子传父</button>
            </>
        )
    }
}
