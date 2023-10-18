import React, { useEffect, useState } from 'react'
import {ListTasksProps} from "../Props/ListTasksProps";
import {TaskModel} from "../../../../model/TaskModel";
import {Status} from "../../../../model/Status";
import SectionModal from "./SectionModal";

const ListTasksModal: React.FC<ListTasksProps> = ({ tasks, setTasks, id }) => {

    const [todos, setTodos] = useState([] as TaskModel[]);
    const [inProgress, setInProgress] = useState([] as TaskModel[]);
    const [done, setDone] = useState([] as TaskModel[]);
    const [blocked, setBlocked] = useState([] as TaskModel[]);
    const statuses = [Status.TODO, Status.IN_PROGRESS, Status.BLOCKED, Status.DONE];

    useEffect(() => {
        const filteredTodos = tasks.filter(task => task.status === Status.TODO)
        const filteredInProgress = tasks.filter(task => task.status === Status.IN_PROGRESS)
        const filteredDone = tasks.filter(task => task.status === Status.DONE)
        const filteredBlocked = tasks.filter(task => task.status === Status.BLOCKED)

        setTodos(filteredTodos);
        setInProgress(filteredInProgress);
        setDone(filteredDone);
        setBlocked(filteredBlocked);

    }, [tasks]);

    return (
        <div className='flex gap-16'>
            {statuses.map((status, index) => (
                <SectionModal key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} done={done} blocked={blocked} />
            ))}
        </div>
    )
}

export default ListTasksModal