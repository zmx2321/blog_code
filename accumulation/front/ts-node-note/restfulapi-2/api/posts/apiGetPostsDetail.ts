import { DataStore } from '../../data/data';
import { RequestHandler } from 'express'
import { PostDetail } from '../../model/shared/postDetail'

// postsDetail接口
export const apiGetPostsDetail: RequestHandler = (req, res)=> {
    // 接收从页面传过来的值
    // console.log(req.params);

    // 先判断是否有值 - 只返回返回值 - return element
    const selectedPost = DataStore.posts.find((element: any)=> element.id == req.params.id)
    // console.log(selectedPost);

    // 如果不为空
    if(selectedPost) {
        // 过滤todo
        const selectedTodos = DataStore.todos.filter((item: any)=> item.postId == req.params.id);

        res.json(new PostDetail(selectedPost, selectedTodos));
    } else {
        res.status(404).json({
            status: "faild",
            message: "posts not find"
        });
    }
}

// 只有一组数据
/* import { PostSummary } from '../../model/shared/postSummary'
// postsDetail接口
export const apiGetPostsDetail: RequestHandler = (req, res)=> {
    // 接收从页面传过来的值
    console.log(req.params);

    // 先判断是否有值 - 只返回返回值 - return element
    const selectedPost = DataStore.posts.find((element: any)=> element.id == req.params.id)
    // console.log(selectedPost);

    // 如果不为空
    if(selectedPost) {
        res.json(new PostSummary(selectedPost));
    } else {
        res.status(404).json({
            status: "faild",
            message: "posts not find"
        });
    }
} */