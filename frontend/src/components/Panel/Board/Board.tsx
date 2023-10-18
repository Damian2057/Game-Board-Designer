import React from 'react'
import { Button, Row, Col, Card } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CreateTask from './CreateTask';
import ListTasks from './ListTasks';
import IconCircle from '../../util/IconCircle';
import './Board.css'
import {useParams} from "react-router-dom";

type Props = {}

function Board({ }: Props) {

    const { id } = useParams();
    const [tasks, setTasks] = React.useState([])

    React.useEffect(() => {
        // setTasks(JSON.parse(localStorage.getItem('tasks')));
    }, [])

    return (

        <div className='board'>
            <DndProvider backend={HTML5Backend}>
                <Toaster />
                <Card className='shadow border-white flex' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%'
                }}>
                    <div className='flex flex-row justify-end items-end'>
                        <IconCircle path={'/panel/workspace'} />
                    </div>
                    <h1 className='pb-5'>Board</h1>
                    <Row className='w-100'>
                        <Col lg={3}>
                            <button className='rounded-md w-40 p-2 bg-green-500 text-white'>Completed</button>
                        </Col>
                        <Col lg={3}>
                            <button className='rounded-md w-40 p-2 bg-red-500 text-white'>Decline</button>
                        </Col>
                        <Col lg={3}>
                            <button className='rounded-md w-40 p-2 bg-blue-500 text-white'>Order details</button>
                        </Col>
                        <Col lg={3}>
                            <button className='rounded-md w-40 p-2 bg-pink-500 text-white'>Scheme</button>
                        </Col>
                    </Row>
                    <div className='bg-slate-100 flex flex-col p-3 gap-16 justify-center items-center'>
                        {/*<CreateTask tasks={tasks} setTasks={setTasks} />*/}
                        <ListTasks tasks={tasks} setTasks={setTasks} />
                    </div>
                </Card>

            </DndProvider >
        </div>
    )
}

export default Board