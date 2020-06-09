import React, {Component} from 'react';
import logo from '../../logo.svg'

// 引入外部组件
import CommentAdd from '../comment-add/comment-add'  // 添加评论
import CommentList from '../comment-list/comment-list'  // 评论列表

export default class App extends Component {
    // 初始化状态-复杂写法
    // 给组件对象指定state属性，默认值为null
    /* constructor (props) {
        super(props);

        this.state = {
            // 评论列表项
            comments: [
                {
                    username: "Tom",
                    content: "React 真香",
                },{
                    username: "Jack",
                    content: "React 太难了",
                }
            ]
        }
    } */
    // 简易写法
    state = {
        // 评论列表项
        comments: [
            {
                username: "Tom",
                content: "React 真香",
            },{
                username: "Jack",
                content: "React 太难了",
            }
        ]
    }

    render() {
        // 评论列表
        const { comments } = this.state;

        return (
            <div>
                <span>app.jsx：评论功能</span>
                <img style={{ display: 'none' }} src={logo} alt="logo" />

                <div className="comment_add">
                    <CommentAdd />
                </div>
                <div className="comment_list">
                    <CommentList comments={ comments } />
                </div>
            </div>
        )
    }
}