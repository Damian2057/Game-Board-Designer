import React from "react";
import {useDrag} from "react-dnd";
import {TaskProps} from "../Props/TaskProps";
import TaskInfoModal from "./TaskInfoModal";
import PriorityModal from "./PriorityModal";

const TaskModal: React.FC<TaskProps> = ({ task, tasks, setTasks }) => {

    const [modalShow, setModalShow] = React.useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { task: task },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <div>
            <div ref={drag} className={`relative p-4 mt-8 w-64 shadow-md rounded-md cursor-grab ${isDragging ? 'opacity-25' : 'opacity-100'}`} onClick={() => setModalShow(true)}>
                <div className="flex justify-between items-center">
                    <p className="pt-2">{task.name}</p>
                    <p className="text-slate-400 text-sm">{task.type}</p>
                    <PriorityModal priority={task.priority} />
                </div>
            </div>
            <TaskInfoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default TaskModal