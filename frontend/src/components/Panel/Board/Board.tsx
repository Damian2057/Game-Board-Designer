import React from 'react'
import {Row, Col, Card } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ListTasksModal from './Modals/ListTasksModal';
import IconCircle from '../../util/IconCircle';
import './Board.css'
import {useNavigate, useParams} from "react-router-dom";
import {Project} from "../../../model/project/project";
import {Api} from "../../../connector/api";
import {TaskModel} from "../../../model/TaskModel";
import StatusUpdateModal from "./Modals/StatusUpdateModal";
import {Order} from "../../../model/order/order";

function Board() {

    const { id } = useParams();
    const [tasks, setTasks] = React.useState([] as TaskModel[])
    const [project, setProject] = React.useState<Project>()
    const [showStatusModal, setShowStatusModal] = React.useState(false);
    const [currentStatus, setCurrentStatus] = React.useState('' as string);
    const navigate = useNavigate();

    React.useEffect(() => {
        Api.project.getProject(id).then((project) => {
            setProject(project);
            mapElementsToTask(project)
            if (project.order) {
                setCurrentStatus(project.order.status);
            }
        }).catch((error) => {
            toast.error(`${error.response.data.message}`, { icon: "💀" });
        });
    }, [])

    function mapElementsToTask(proj: Project) {
        const taskTODO: TaskModel[] = []
        proj?.elements?.forEach((element) => {
            taskTODO.push(new TaskModel(element.id, element.name, element.status, element.priority, element.type));
        })
        taskTODO.push(new TaskModel(proj.box.id, proj.box.name, proj.box.status, proj.box.priority, proj.box.type))
        proj.containers?.forEach((container) => {
            taskTODO.push(new TaskModel(container.id, container.name, container.status, container.priority, container.type));
           container.elements?.forEach((element) => {
                taskTODO.push(new TaskModel(element.id, element.name, element.status, element.priority, element.type));
           });
        });

        setTasks(taskTODO);
    }

    function deleteProject() {
        //TODO: delete project
    }

    function markAsCompleted() {
        Api.project.completeProject(id).then(() => {
            toast.success(`Project marked as completed`);
            setTimeout(() => {
                navigate('/panel/workspace');
            }, 2000);
        }).catch((error) => {
            toast.error(`${error.response.data.message}`, { icon: "💀" });
        });
    }

    function handleSaveStatusUpdate(order: Order | undefined) {
        setShowStatusModal(false);
        if (order?.status) {
            setCurrentStatus(order.status);
        }
    }

    function handleStatusSelect() {
        setShowStatusModal(true);
    }

    return (
        <div className='board'>
            <DndProvider backend={HTML5Backend}>
                <Toaster />
                <Card className='shadow border-white flex' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%' }}>
                    <div className='flex flex-row justify-end items-end'>
                        <IconCircle path={'/panel/workspace'} />
                    </div>
                    <h1 className='pb-5'>{project?.name}</h1>
                    <Row className='w-100 justify-content-end'>
                        {project?.order && (
                            <Col lg={3} className="text-right">
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <Row>
                                        <button className='rounded-md w-40 p-2 bg-blue-500 text-white' onClick={handleStatusSelect}>Status</button>
                                    </Row>
                                    <Row>
                                        <div className="rounded-md w-40 p-2 bg-blue-500 text-white d-flex align-items-center justify-content-center" style={{ width: '100px', height: '40px' }}>
                                            <p className="m-0">{currentStatus}</p>
                                        </div>
                                    </Row>
                                </div>
                            </Col>
                        )}
                        {project?.order && (
                            <Col lg={3} className="text-right">
                                <div>
                                    <Row>
                                        <button className='rounded-md w-40 p-2 bg-blue-500 text-white'>Order Details</button>
                                    </Row>
                                </div>
                            </Col>
                        )}
                        <Col lg={3} className="text-right">
                            <div>
                                <Row>
                                    <button className='rounded-md w-40 p-2 bg-red-500 text-white' onClick={deleteProject}>Decline</button>
                                </Row>
                                <Row>
                                    <button className='rounded-md w-40 p-2 bg-green-500 text-white' onClick={markAsCompleted}>Complete</button>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <div className='bg-slate-100 flex flex-col p-3 gap-16 justify-center items-center'>
                        <ListTasksModal tasks={tasks} setTasks={setTasks} id={project?.id}/>
                    </div>
                </Card>
            </DndProvider>
            <StatusUpdateModal
                show={showStatusModal}
                onClose={() => setShowStatusModal(false)}
                onSave={handleSaveStatusUpdate}
                editedOrder={project?.order}
            />
        </div>
    )
}

export default Board