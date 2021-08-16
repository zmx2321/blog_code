import posts from './posts.json'
import todos from './todo.json'

export class DataStore {
    // 左边的数据表示静态全局
    static posts = posts;
    static todos = todos;
}