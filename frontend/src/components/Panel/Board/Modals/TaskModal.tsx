import React from "react";
import {useDrag} from "react-dnd";
import {TaskProps} from "../Props/TaskProps";
import TaskInfoModal from "./TaskInfoModal";

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
                    {/*<button className="text-slate-400" onClick={() => handleRemove(task.id)}>*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">*/}
                    {/*        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />*/}
                    {/*    </svg>*/}
                    {/*</button>*/}
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