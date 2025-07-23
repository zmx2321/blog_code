import React, { Component } from 'react'

const handle = (value) => {
    switch (value) {
        case 'add':
            addHandle()
            break
        case 'delete':
            deleteHandle()
            break
        default:
            break
    }
}

const addHandle = () => {
    console.log('submit add')
}

const deleteHandle = () => {
    console.log('submit delete')
}

export default class SubmitBtn extends Component {
    render () {
        return (
            <button onClick={() => handle(this.props.alt)}>{this.props.name}</button>
        )
    }
}
