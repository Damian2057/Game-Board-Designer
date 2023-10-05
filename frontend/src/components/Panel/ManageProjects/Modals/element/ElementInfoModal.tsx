import React, {useState} from "react";
import {Api} from "../../../../../connector/api";
import {Carousel, Col, Form, Modal, Row} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {ElementInfoProps} from "../../Props/ElementInfoProps";
import {Element} from "../../../../../model/project/element";

const ElementInfo: React.FC<ElementInfoProps> = ({ show, element, onClose }) => {

    const [selectedElement, setSelectedElement] = React.useState<Element>();
    const [note, setNote] = useState(element.notes[0])

    React.useEffect(() => {
        Api.project.getElement(element.id).then((e) => setSelectedElement(e));
    });

    const handleClick=(index: number)=>{
        setNote(element.notes[index])
    }

    return (
        <Modal show={show} onHide={onClose}>
            <div className='icon-position' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Col className='d-flex justify-content-center'>
                <Modal.Body className='game-info rounded'>
                    <Carousel data-bs-theme="dark">
                        {selectedElement?.imageIds.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    src={Api.image.getImageUrl(image)}
                                    alt={`Game Img ${index}`}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <Row className='mt-3 align-items-center'>
                        <Col xs={8}>
                            <Modal.Title className='fs-2 fw-bold text-white'>{selectedElement?.name}</Modal.Title>
                        </Col>
                    </Row>
                    <Row className='mt-3 align-items-center text-white'>
                        <Col xs={8}>
                            <div>
                                <span className='fw-bold'>Status:</span> {selectedElement?.status}
                            </div>
                            <div>
                                <span className='fw-bold'>Priority:</span> {selectedElement?.priority}
                            </div>
                        </Col>
                    </Row>
                    <Row className='gap-2'>
                        {selectedElement?.properties && (
                            <table className="tags-table">
                                <thead>
                                <tr>
                                    <th>name</th>
                                    <th>value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedElement?.properties?.map((prop, index) => (
                                    <tr key={prop.id}>
                                        <td className="tag-cell">
                                            <div className="tag-content">
                                                <span>{prop.name}</span>
                                            </div>
                                        </td>
                                        <td className="tag-cell">
                                            <div className="tag-content">
                                                <span>{prop.value}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </Row>
                    <Row className='mt-3 text-white'>
                        <div>
                            <span className='fw-bold'>Notes:</span>
                            <div>"{note}"</div>
                            <div className='flex_row'>
                                {element.notes.map((data, i)=>
                                    <h1 key={i} onClick={()=>handleClick(i)}>.</h1>
                                )}
                            </div>
                        </div>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Control
                            as="textarea"
                            disabled
                            placeholder={selectedElement?.description}
                            style={{ height: '100px', margin: '1rem 0' }}
                        />
                    </Row>
                </Modal.Body>
            </Col>
        </Modal>
    );
}

export default ElementInfo;