import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {ContainerInfoProps} from "../../../Props/ContainerInfoProps";
import {ElementEntity} from "../../../../../../model/project/elementEntity";
import ElementInfoModal from "../../element/ElementInfoModal";
import ImageSliderModal from "../../ImageSliderModal";
import {t} from "i18next";

const ContainerInfoNewModal: React.FC<ContainerInfoProps> = ({ container, onClose, show }) => {

    const [note, setNote] = useState(container.notes[0])
    const [showImageSliderModal, setShowImageSliderModal] = useState(false)
    const [selectedElement, setSelectedElement] = useState<ElementEntity | null>()

    const handleClick=(index: number)=>{
        setNote(container.notes[index])
    }

    function handleShowImage() {
        setShowImageSliderModal(true)
    }

    function handleShowElement(data: any) {
        setSelectedElement(data)
    }

    return (
        <div className='NewGameModal'>
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
                        <p className='font-bold fs-2 mb-12'>{t("Container")}: {container.name}</p>
                        <Form>
                            <Row>
                                <Col>
                                    <div>
                                        <span className='fw-bold'>{t("Description")}:</span>
                                        <Form.Control
                                            as="textarea"
                                            disabled
                                            placeholder={container.description}
                                            style={{ height: '100px', margin: '1rem 0' }}
                                        />
                                    </div>
                                    <div>
                                        <span className='fw-bold'>{t("Notes")}:</span>
                                        <div>"{note}"</div>
                                        <div className='flex_row'>
                                            {container.notes.map((data, i)=>
                                                <h1 key={i} onClick={()=>handleClick(i)}>.</h1>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span className='fw-bold'>Status:</span> {container.status}
                                    </div>
                                    <div>
                                        <span className='fw-bold'>Priority:</span> {container.priority}
                                    </div>
                                    <div>
                                        <span className='fw-bold'>Images:</span> <Button variant="outline-primary" onClick={handleShowImage}>{t("Show")}</Button>
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
                                            {container?.elements.map((data, index)=>
                                                <tr key={data.id ? data.id : index}>
                                                    <td>{data.name}</td>
                                                    <td>{data.quantity}</td>
                                                    <td><Button variant="outline-primary" onClick={() => handleShowElement(data)}>{t("Show")}</Button></td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <span className='fw-bold'>{t("Properties")}:</span>
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr className='uppercase'>
                                                <th>{t("Name")}</th>
                                                <th>{t("Value")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {container?.properties.map((data, index)=>
                                                <tr key={data.id ? data.id : index}>
                                                    <td>{data.name}</td>
                                                    <td>{data.value}</td>
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
                        imageIds={container.imageIds}
                        onClose={() => setShowImageSliderModal(false)}
                    />
                    {selectedElement && (
                        <ElementInfoModal
                            element={selectedElement}
                            onClose={() => setSelectedElement(null)}
                            show={true}
                        />
                    )}
                </Card>
            </Container>
        </div>
    )
}

export default ContainerInfoNewModal;