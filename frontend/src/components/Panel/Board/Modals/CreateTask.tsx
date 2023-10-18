import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {

    const [task, setTask] = useState({
        id: '',
        name: '',
        status: 'todo'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3)
            return toast.error("A task must have more than 3 characters");

        if (task.name.length > 100)
            return toast.error("A task must not be more than 100 characters");


        setTasks((prev) => {
            const list = [...prev, task] //prev=tasks

            localStorage.setItem('tasks', JSON.stringify(list))

            return list
        });

        toast.success("Task created")

        setTask({
            id: '',
            name: '',
            status: 'todo'
        })
    }

    return (
        <div className='pt-5'>
            <form onSubmit={handleSubmit}>
                <input type="text" className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-10 w-64 px-2'
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <button className='rounded-md bg-yellow-500 px-4 h-10 text-white'>Create</button>
            </form>
        </div>
    )
}

export default CreateTask