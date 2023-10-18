import {useDrop} from "react-dnd";
import {Status} from "../../../../model/Status";
import toast from "react-hot-toast";
import React from "react";
import {SectionProps} from "../Props/SectionProps";
import HeaderModal from "./HeaderModal";
import TaskModal from "./TaskModal";


const SectionModal: React.FC<SectionProps> = ({ status, tasks, setTasks, todos, inProgress, done, blocked }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo";
    let bg = 'bg-orange-400';
    let tasksToMap = todos;

    if (status === Status.IN_PROGRESS) {
        text = 'In Progress';
        bg = 'bg-purple-400';
        tasksToMap = inProgress;
    }

    if (status === Status.DONE) {
        text = 'Done';
        bg = 'bg-green-400';
        tasksToMap = done;
    }

    if (status === Status.BLOCKED) {
        text = 'Blocked';
        bg = 'bg-red-400';
        tasksToMap = blocked;
    }

    const addItemToSection = (id) => {
        setTasks(prev => {
            const modifiedTasks = prev.map(t => {
                if (t.id === id) {
                    return { ...t, status: status }
                }
                return t;
            });

            localStorage.setItem("tasks", JSON.stringify(modifiedTasks));

            toast("Task status changed", { icon: "😎" });

            return modifiedTasks;
        })
    }

    return (
        <div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? 'bg-slate-200' : ''}`}>
            <HeaderModal text={text} bgColor={bg} count={tasksToMap.length} />
            {tasksToMap.length > 0 && tasksToMap.map((task, index) => <TaskModal key={index} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    )
}

export default SectionModal