import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import {ListTasksProps} from "../Props/ListTasksProps";
import {TaskModel} from "../../../../model/TaskModel";
import {Status} from "../Status";

const ListTasks: React.FC<ListTasksProps> = ({ tasks, setTasks, id }) => {

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
                <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} done={done} blocked={blocked} />
            ))}
        </div>
    )
}

export default ListTasks

const Section = ({ status, tasks, setTasks, todos, inProgress, done, blocked }) => {

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
            <Header text={text} bg={bg} count={tasksToMap.length} />
            {tasksToMap.length > 0 && tasksToMap.map(task => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return <div className={`${bg} flex items-center h-12 w-64 pl-2 rounded-md uppercase text-white`}>
        <h2 className='m-0'>{text}</h2>
        <div className='ml-4 bg-white text-black w-6 h-6 rounded-full flex items-center justify-center'>{count}</div>
    </div>
}

const Task = ({ task, tasks, setTasks }) => {

    const [modalShow, setModalShow] = React.useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handleRemove = (id) => {
        const fTasks = tasks.filter(t => t.id !== id)

        localStorage.setItem("tasks", JSON.stringify(fTasks))
        setTasks(fTasks)
        toast.success('Task removed', { icon: "💀" })
    }

    return (
        <div>
            <div ref={drag} className={`relative p-4 mt-8 w-64 shadow-md rounded-md cursor-grab ${isDragging ? 'opacity-25' : 'opacity-100'}`} onClick={() => setModalShow(true)}>
                <div className="flex justify-between items-center">
                    <p className="pt-2">{task.name}</p>
                    <button className="text-slate-400" onClick={() => handleRemove(task.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <TaskInfoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

function TaskInfoModal(props) {

    const handleClose = () => {

    }

    const handleSave = () => {

    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    Task Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Modify task</h4>
                <Form>
                    <Form.Group>
                        <Form.Label>Task description</Form.Label>
                        <Form.Control type="text" placeholder="There must be 5 pawns" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={handleSave} style={{ backgroundColor: '#7D53DE', borderColor: '#7D53DE' }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}