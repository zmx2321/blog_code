import { PostSummary } from './postSummary'
import { Todo } from './todo'

// 继承父类
export class PostDetail extends PostSummary {
    price: number;
    currency: string;
    todos: Todo;

    constructor(postData: any, todoData: any) {
        super(postData);  // 调用父级

        this.price = postData.price;
        this.currency = postData.currency;

        this.todos = todoData.map((item: any)=> new Todo(item));
    }
}