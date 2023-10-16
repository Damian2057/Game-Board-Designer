import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {StartNewProjectProps} from "../Props/StartNewProjectProps";
import ListProjectsModal from "./ListProjectsModal";
import {Project} from "../../../../model/project/project";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";

const StartNewProjectModal: React.FC<StartNewProjectProps> = ({onClose, onSave}) => {

    const todoIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>)

    const project = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-kanban w-10 h-10"
             viewBox="0 0 16 16">
            <path
                d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z"/>
            <path
                d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z"/>
        </svg>)

    const [showListProjectsModal, setShowListProjectsModal] = React.useState(false)

    function handleStartNewProject() {
        setShowListProjectsModal(true)
    }

    function handleStartNewOrder() {

    }

    function handleSave(project: Project | null) {
        toast(`Project ${project?.name} started`, { icon: "👏" });
        onClose();
    }

    return (
        <div className='NewGameModal'>
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <Card.Body>
                        <div className='icon-position' >
                            <a onClick={onClose} >
                                <div className='icon-circle' >
                                    <GrClose />
                                </div>
                            </a>
                        </div>
                        <p className='font-bold fs-2'>Start New Project</p>
                        <Row className="w-100 d-flex justify-content-center">
                            <Col lg={4}>
                                <Card onClick={handleStartNewProject} id="panelCard" className="mt-5 p-2 shadow" style={{
                                    backgroundColor: '#7D53DE',
                                    borderColor: '#7D53DE',
                                    color: 'white',
                                    borderRadius: '20px'
                                }}>
                                    <Card.Body>
                                        <div className="text-start flex gap-3 items-center">
                                            {project}
                                        </div>
                                        <div className="py-2">
                                            <span className="fs-3 fw-bold">{'Start Project'}</span>
                                        </div>
                                        <div className="font-semibold py-3">{}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card onClick={handleStartNewOrder} id="panelCard" className="mt-5 p-2 shadow" style={{
                                    backgroundColor: '#7D53DE',
                                    borderColor: '#7D53DE',
                                    color: 'white',
                                    borderRadius: '20px'
                                }}>
                                    <Card.Body>
                                        <div className="text-start flex gap-3 items-center">
                                            {todoIcon}
                                        </div>
                                        <div className="py-2">
                                            <span className="fs-3 fw-bold">{'Start Order'}</span>
                                        </div>
                                        <div className="font-semibold py-3">{}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            {showListProjectsModal && (
                <ListProjectsModal
                    onClose={() => setShowListProjectsModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    )
}

export default StartNewProjectModal;