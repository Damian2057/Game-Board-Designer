export class TaskModel {
    id: number;
    name: string;
    status: string;
    priority: string;
    type: string;

    constructor(id: number, name: string, status: string, priority: string, type: string) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.priority = priority;
        this.type = type;
    }
}