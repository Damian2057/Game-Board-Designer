import React from "react";
import {Carousel, Col, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {Api} from "../../../../connector/api";
import {ImageSliderProps} from "../Props/ImageSliderProps";

const ImageSliderModal: React.FC<ImageSliderProps> = ({ show, imageIds, onClose }) => {

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
                        {imageIds?.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    src={Api.image.getImageUrl(image)}
                                    alt={`Game Img ${index}`}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
            </Col>
        </Modal>
    );
}

export default ImageSliderModal;