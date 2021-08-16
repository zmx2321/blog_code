// 定义实体类
export class Todo {
    postId: number;
    userId: number;
    id: number;
    title: number;
    completed: boolean;

    constructor(data: any) {
        this.postId = data.postId;
        this.userId = data.userId;
        this.id = data.id;
        this.title = data.title;
        this.completed = data.completed;
    }
}