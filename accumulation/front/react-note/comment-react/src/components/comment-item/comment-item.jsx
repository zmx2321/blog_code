import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 引入外部样式
import './comment-item.css'

export default class CommentItem extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    render() {
        const { comment } = this.props;
        console.log(comment);

        return (
            <li>{comment.username}说：{comment.content}</li>
        )
    }
}