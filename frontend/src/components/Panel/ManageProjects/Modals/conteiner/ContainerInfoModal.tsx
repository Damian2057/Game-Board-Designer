import React, {useState} from "react";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import ImageSliderModal from "../ImageSliderModal";
import ElementInfoModal from "../element/ElementInfoModal";
import {ContainerInfoProps} from "../../Props/ContainerInfoProps";
import {Api} from "../../../../../connector/api";
import {ContainerEntity} from "../../../../../model/project/containerEntity";
import {ElementEntity} from "../../../../../model/project/elementEntity";
import {imageIcon} from "../../../../util/Icons";
import ChoiceElement from "../../../../util/ChoiceElement";
import {t} from "i18next";

const ContainerInfoModal: React.FC<ContainerInfoProps> = ({ container, onClose, show }) => {

    const [note, setNote] = useState('')
    const [showImageSliderModal, setShowImageSliderModal] = useState(false)
    const [selectedContainer, setSelectedContainer] = useState<ContainerEntity>()
    const [selectedElement, setSelectedElement] = useState<ElementEntity | null>()

    React.useEffect(() => {
        Api.project.getContainer(container.id).then((res) => {
            setSelectedContainer(res)
            setNote(res.notes[0])
        }).catch((err) => {
            toast.error(err)
        })
    })

    const handleClick=(index: number)=>{
        if (selectedContainer === undefined) {
            return
        }
        setNote(selectedContainer.notes[index])
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
                        <p className='font-bold fs-2 mb-12'>{t("Container")}: {selectedContainer?.name}</p>
                        <Form>
                            <Row>
                                <Col>
                                    <div>
                                        <span className='fw-bold'>{t("Description")}:</span>
                                        <Form.Control
                                            as="textarea"
                                            disabled
                                            placeholder={selectedContainer?.description}
                                            style={{ height: '100px', margin: '1rem 0' }}
                                        />
                                    </div>
                                    <div>
                                        <span className='fw-bold'>{t("Notes")}:</span>
                                        <div>"{note}"</div>
                                        <div className='flex_row'>
                                            {selectedContainer?.notes.map((data, i)=>
                                                <h1 key={i} onClick={()=>handleClick(i)}>.</h1>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span className='fw-bold'>{t("Status")}:</span> {selectedContainer?.status}
                                    </div>
                                    <div>
                                        <span className='fw-bold'>{t("Priority")}:</span> {selectedContainer?.priority}
                                    </div>
                                    <div>
                                        <ChoiceElement name={"Images"} icon={imageIcon} onClick={handleShowImage}/>
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
                                            {selectedContainer?.elements.map((data)=>
                                                <tr key={data.id}>
                                                    <td>{data.name}</td>
                                                    <td>{data.quantity}</td>
                                                    <td><Button className={"button-workspace"} onClick={() => handleShowElement(data)}>{t("Info")}</Button></td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <span className='fw-bold'>{t("Properties")}</span>
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr className='uppercase'>
                                                <th>{t("Name")}</th>
                                                <th>{t("Value")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {selectedContainer?.properties.map((data)=>
                                                <tr key={data.id}>
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
                        imageIds={selectedContainer?.imageIds === undefined ? [] : selectedContainer.imageIds}
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

export default ContainerInfoModal;