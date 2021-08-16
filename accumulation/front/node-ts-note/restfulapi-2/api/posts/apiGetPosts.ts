import { DataStore } from '../../data/data';
import { RequestHandler } from 'express'
import { PostSummary } from '../../model/shared/postSummary'

// posts接口
export const apiGetPosts: RequestHandler = (req, res)=> {
    // 只返回返回值 - 相当于执行箭头函数后面的方法，然后return item
    res.json(DataStore.posts.map((item: any)=> new PostSummary(item)));
}