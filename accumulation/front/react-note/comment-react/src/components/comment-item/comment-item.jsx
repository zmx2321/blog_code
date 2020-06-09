import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 引入外部样式
import './comment-item.css'

export default class commentItem extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    render() {
        const { comment } = this.props;
        console.log(comment);

        return (
            <div>
                <span>comment-item.jsx：评论列表项</span>

                <ul>
                    <li>{comment.username}说：</li>
                    <li>{comment.content}</li>
                </ul>
            </div>
        )
    }
}