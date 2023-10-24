import React, { useState } from 'react'
import {Button, Card, Col, Container, Form, Table} from 'react-bootstrap'
import IconCircle from '../../util/IconCircle'
import toast, { Toaster } from 'react-hot-toast';
import './Workspace.css'
import {Project} from "../../../model/project/project";
import {Api} from "../../../connector/api";
import ProjectInfoModal from "../ManageProjects/Modals/ProjectInfoModal";
import StartNewProjectModal from "./Modals/StartNewProjectModal";
import {useNavigate} from "react-router-dom";
import {t} from "i18next";

function  Workspace() {

    const [myProjects, setMyProjects] = useState([] as Project[]);
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
    const [showStartNewProjectModal, setShowStartNewProjectModal] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchMyProjects();
    }, []);

    const fetchMyProjects = () => {
        Api.project.getMyProjects().then((projects) => {
            setMyProjects(projects);
        }).catch((error) => {
            toast.error(`${error.response.data.message}`, {icon: "💀"});
        });
    }

    const handleProjectInfo = (order: any) => {
        setSelectedProject(order);
    };

    function handleCompleteChange(e: any) {
        const name = e.target.value;
        if (name == 'Completed') {
            Api.project.getMyCompletedProjects().then((projects) => {
                setMyProjects(projects);
            }).catch((error) => {
                toast.error(`${error.response.data.message}`, {icon: "💀"});
            });
        } else if (name == 'OnGoing') {
            Api.project.getMyOnGoingProjects().then((projects) => {
                setMyProjects(projects);
            }).catch((error) => {
                toast.error(`${error.response.data.message}`, {icon: "💀"});
            });
        } else {
            Api.project.getMyProjects().then((projects) => {
                setMyProjects(projects);
            }).catch((error) => {
                toast.error(`${error.response.data.message}`, {icon: "💀"});
            });
        }
    }

    function startNewProject() {
        setShowStartNewProjectModal(true);
    }

    function handleCloseStartNewProject() {
        setShowStartNewProjectModal(false);
        fetchMyProjects();
    }

    function redirectProjectBoard(proj: Project) {
        navigate(`/panel/workspace/board/${proj.id}`);
    }

    return (
        <div className='workspace'>
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <Card.Body>
                        <IconCircle path={'/panel/admin'}></IconCircle>
                        <p className='font-bold fs-2'>{t('My workspace')}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Form.Select className='form-select' aria-label="Worker selector" defaultValue={''} onChange={handleCompleteChange}>
                                    <option disabled value={''}>{t('Choose status')}</option>
                                    <option value={'All'}>{t('All')}</option>
                                    <option value={'Completed'}>{t('Completed')}</option>
                                    <option value={'OnGoing'}>{t('OnGoing')}</option>
                                </Form.Select>
                            </div>
                            <div>
                                <Button type="button"
                                        onClick={startNewProject}
                                        style={{
                                            backgroundColor: '#7D53DE',
                                            borderColor: '#7D53DE',
                                            borderRadius: '20px',
                                            marginBottom: '1rem',
                                            paddingInline: '2rem',
                                            paddingBlock: '0.5rem'
                                        }}
                                >{t('Start New Project')}</Button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr className='uppercase'>
                                            <th>ID</th>
                                            <th>{t('Name')}</th>
                                            <th>{t('Containers')}</th>
                                            <th>{t('Elements')}</th>
                                            <th>{t('Completed')}</th>
                                            <th>{t('Game')}</th>
                                            <th>{t('Info')}</th>
                                            <th>{t('Continue work')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myProjects.map((proj) => (
                                            <tr key={proj.id}>
                                                <td className='centered-td'>{proj.id}</td>
                                                <td className='centered-td'>{proj.name}</td>
                                                <td className='centered-td'>{proj.containers.length}</td>
                                                <td className='centered-td'>{proj.elements.length}</td>
                                                <td className='centered-td'>{proj.isCompleted ? t('Completed') : t('OnGoing')}</td>
                                                <td className='centered-td'>{proj.currentGame?.title}</td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleProjectInfo(proj)}>{t('Info')}</Button>
                                                </td>
                                                <td>
                                                    <Button onClick={() => redirectProjectBoard(proj)} className='button-workspace'>{t('Continue')}</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>
                        {selectedProject && (
                            <ProjectInfoModal
                                project={selectedProject}
                                onClose={() => setSelectedProject(null)}
                            />
                        )}
                        {showStartNewProjectModal && (
                            <StartNewProjectModal
                                onClose={handleCloseStartNewProject}
                                onSave={() => {}}
                            />
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Workspace