import {Status} from "../../../../model/Status";
import {TaskModel} from "../../../../model/TaskModel";

export interface SectionProps {
    status: Status;
    tasks: TaskModel[];
    setTasks: (tasks: TaskModel[]) => void;
    todos: TaskModel[];
    inProgress: TaskModel[];
    done: TaskModel[];
    blocked: TaskModel[];
}