import React, { Component } from 'react'

const handle = (value, data, ...args) => {
    switch (value) {
        case 'add':
            addHandle(data, ...args)
            break
        case 'delete':
            deleteHandle(data)
            break
        default:
            break
    }
}

const addHandle = (data, ...args) => {
    console.log('submit add', data, args) // ...args
}

const deleteHandle = (data) => {
    console.log('submit delete', data)
}

export default class SubmitBtn extends Component {
    render () {
        return (
            <button onClick={() => handle(this.props.alt, this.props.data, this.props.aa, this.props.bb, this.props.cc)}>{this.props.name}</button>
        )
    }
}
