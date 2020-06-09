import React, {Component} from 'react';
// 引入下载的依赖
import PropTypes from 'prop-types';

// 引入css
import './comment-list.css'

// 引入外部组件
import CommentItem from '../comment-item/comment-item';

export default class CommentList extends Component {
    // 给当前的组件类指定属性-简易写法-静态属性
    static propTypes = {
        // isRequired表示需要被传过来
        comments: PropTypes.array.isRequired  // 数据类型为数组
    }

    render() {
        // 需要去读组件类的值
        const { comments } = this.props

        return (
            <div>
                <span>comment-list.jsx：评论列表</span>

                {/* 调用评论列表项组件 */}
                <div className="comment-list">
                    {/* <CommentItem comment={comments} /> */}
                    {/* 使用map遍历CommentItem组件 */} */}
                    {
                        comments.map((comment, index)=> {
                            // console.log(comment);

                            // 第一个comment要与子组件的组件类的属性名一致
                            // 第二个comment要与形参的名一致
                            // 数组中的标签必须要有key，否则会有警告
                            <CommentItem comment={comment} key={index} />
                        })
                    }
                </div>
            </div>
        )
    }
}

// 声明读取的属性-给当前的组件类指定属性-复杂写法
// 需要下载依赖（npm install --save prop-types）
/* CommentList.propTypes = {
    comments: PropTypes.array.isRequired
} */