import React from "react";
import {Carousel, Col, Form, Modal, Row} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {Api} from "../../../../../connector/api";
import {BoxInfoProps} from "../../Props/BoxInfoProps";
import {Box} from "../../../../../model/project/box";

const BoxInfo: React.FC<BoxInfoProps> = ({ show, box, onClose }) => {

    const [selectedBox, setSelectedBox] = React.useState<Box>();

    React.useEffect(() => {
       Api.project.getBox(box.id).then((box) => {
           setSelectedBox(box)
       });
    });

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
                        {selectedBox?.imageIds.map((image, index) => (
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
                            <Modal.Title className='fs-2 fw-bold text-white'>{selectedBox?.name}</Modal.Title>
                        </Col>
                    </Row>
                    <Row className='mt-3 align-items-center text-white'>
                        <Col xs={8}>
                            <div>
                                <span className='fw-bold'>Status:</span> {selectedBox?.status}
                            </div>
                            <div>
                                <span className='fw-bold'>Priority:</span> {selectedBox?.priority}
                            </div>
                        </Col>
                    </Row>
                    <Row className='gap-2'>
                        {selectedBox?.properties && (
                            <table className="tags-table">
                                <thead>
                                <tr>
                                    <th>name</th>
                                    <th>value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedBox?.properties?.map((prop) => (
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
                    <Row className='mt-3'>
                        <Form.Control
                            as="textarea"
                            disabled
                            placeholder={selectedBox?.description}
                            style={{ height: '100px', margin: '1rem 0' }}
                        />
                    </Row>
                </Modal.Body>
            </Col>
        </Modal>
    );
}

export default BoxInfo;