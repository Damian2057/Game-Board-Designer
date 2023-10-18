import {TaskModel} from "../../../../model/TaskModel";

export interface ListTasksProps {
    tasks: TaskModel[];
    setTasks: (tasks: TaskModel[]) => void;
    id: number | undefined;
}