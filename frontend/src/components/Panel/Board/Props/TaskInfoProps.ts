import {TaskModel} from "../../../../model/TaskModel";

export interface TaskInfoProps {
    show: boolean;
    onHide: () => void;
    task: TaskModel;
}