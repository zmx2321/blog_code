import { DataStore } from '../data/data';
import { RequestHandler } from 'express'
import { PostSummary } from '../model/shared/postSummary'

// posts接口
export const apiGetPosts: RequestHandler = (req, res)=> {
    res.json(DataStore.posts.map((item: any)=> new PostSummary(item)));
}

// postsDetail接口
export const apiGetPostsDetail: RequestHandler = (req, res) => {
    // 接收从页面传过来的值
    // console.log(req.params);

    DataStore.posts.forEach((item: any)=> {
        // console.log(item);
        if(item.id == req.params.id) {
            // res.json(item);
            // 先对PostSummary实例化，把item传递过去，就都定义了ts的数据类型了
            res.json(new PostSummary(item));
        }
    });
}