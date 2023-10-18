import {TaskModel} from "../../../../model/TaskModel";

export interface TaskProps {
    task: TaskModel;
    tasks: TaskModel[];
    setTasks: (tasks: TaskModel[]) => void;
}