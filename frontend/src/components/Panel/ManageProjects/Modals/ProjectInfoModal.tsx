import React, {useState} from "react";
import {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {ProjectInfoProps} from "../Props/ProjectInfoProps";
import ImageSliderModal from "./ImageSliderModal";
import BoxInfoModal from "./box/BoxInfoModal";
import ElementInfoModal from "./element/ElementInfoModal";
import ContainerInfoModal from "./conteiner/ContainerInfoModal";
import ChoiceElement from "../../../util/ChoiceElement";
import {boxIcon, imageIcon} from "../../../util/Icons";
import {t} from "i18next";

const ProjectInfoModal: React.FC<ProjectInfoProps> = ({ project, onClose }) => {

    const [note, setNote] = useState(project.notes[0])
    const [showImageSliderModal, setShowImageSliderModal] = useState(false)
    const [showBoxModal, setShowBoxModal] = useState(false)
    const [selectedElement, setSelectedElement] = useState<any>()
    const [selectedContainer, setSelectedContainer] = useState<any>()

    const handleClick=(index: number)=> {
        setNote(project.notes[index])
    }

    function handleShowImage() {
        setShowImageSliderModal(true)
    }

    function handleShowBox() {
        setShowBoxModal(true)
    }

    function handleShowElement(data: any) {
        setSelectedElement(data)
    }

    function handleShowContainer(data: any) {
        setSelectedContainer(data)
    }

    return (
        <div className='NewGameModal'>
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%'
                }}>
                    <Card.Body>
                        <div className='icon-position' >
                            <a onClick={onClose} >
                                <div className='icon-circle' >
                                    <GrClose />
                                </div>
                            </a>
                        </div>
                        <p className='font-bold fs-2 mb-12'>{t("Project")}: {project.name}</p>
                        <Form>
                            <Row>
                                <Col>
                                    <div>
                                        <span className='fw-bold'>{t("Description")}:</span>
                                        <Form.Control
                                            as="textarea"
                                            disabled
                                            placeholder={project.description}
                                            style={{ height: '100px', margin: '1rem 0' }}
                                        />
                                    </div>
                                    <div>
                                        <span className='fw-bold'>{t("Notes")}:</span>
                                        <div>"{note}"</div>
                                        <div className='flex_row'>
                                            {project.notes.map((data, i)=>
                                                <h1 key={i} onClick={()=>handleClick(i)}>.</h1>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span className='fw-bold'>Template:</span> {project.isTemplate ? t("Yes") : t("No")}
                                    </div>
                                    <div>
                                        <span className='fw-bold'>Completed:</span> {project.isCompleted ? t("Yes") : t("No")}
                                    </div>
                                    <div>
                                        <span className='fw-bold'>{t("Games")}:</span>
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr className='uppercase'>
                                                <th>{t("Game")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {project.games.map((data)=>
                                                <tr key={data.id}>
                                                    <td>{data.title}</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <ChoiceElement name={t("box")} icon={boxIcon} onClick={handleShowBox}/>
                                        </div>
                                        <div>
                                            <ChoiceElement name={t("Images")} icon={imageIcon} onClick={handleShowImage}/>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <span className='fw-bold'>{t("Container")}:</span>
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr className='uppercase'>
                                                <th>{t("Container")}</th>
                                                <th>{t("Quantity")}</th>
                                                <th>{t("Info")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {project.containers.map((data)=>
                                                <tr key={data.id}>
                                                    <td>{data.name}</td>
                                                    <td>{data.quantity}</td>
                                                    <td><Button className={"button-workspace"} onClick={() => handleShowContainer(data)}>{t("Show")}</Button></td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <span className='fw-bold'>{t("Elements")}:</span>
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr className='uppercase'>
                                                <th>{t("Element")}</th>
                                                <th>{t("Quantity")}</th>
                                                <th>{t("Info")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {project.elements.map((data)=>
                                                <tr key={data.id}>
                                                    <td>{data.name}</td>
                                                    <td>{data.quantity}</td>
                                                    <td><Button className={"button-workspace"} onClick={() => handleShowElement(data)}>{t("Show")}</Button></td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                    <ImageSliderModal
                        show={showImageSliderModal}
                        imageIds={project.imageIds}
                        onClose={() => setShowImageSliderModal(false)}
                    />
                    <BoxInfoModal
                        box={project.box}
                        onClose={() => setShowBoxModal(false)}
                        show={showBoxModal}
                    />
                    {selectedElement && (
                        <ElementInfoModal
                            element={selectedElement}
                            onClose={() => setSelectedElement(null)}
                            show={true}
                        />
                    )}
                    {selectedContainer && (
                        <ContainerInfoModal
                            container={selectedContainer}
                            onClose={() => setSelectedContainer(null)}
                            show={true}
                        />
                    )}
                </Card>
            </Container>
        </div>
    )
}

export default ProjectInfoModal;