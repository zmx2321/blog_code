import React, { Component } from 'react'

const handle = (value, data) => {
    switch (value) {
        case 'add':
            addHandle(data)
            break
        case 'delete':
            deleteHandle(data)
            break
        default:
            break
    }
}

const addHandle = (data) => {
    console.log('submit add', data)
}

const deleteHandle = (data) => {
    console.log('submit delete', data)
}

export default class SubmitBtn extends Component {
    render () {
        return (
            <button onClick={() => handle(this.props.alt, this.props.data)}>{this.props.name}</button>
        )
    }
}
