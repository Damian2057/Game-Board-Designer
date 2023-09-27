import React from 'react';
import { Modal, Button, Row, Col, Carousel, Form } from 'react-bootstrap';
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';
import './GameInfo.css'
import {Game} from "../../../model/game/game";
import {Api} from "../../../connector/api";
import {AiFillTags} from "react-icons/ai";

interface GameInfoProps {
    game: Game;
    onClose: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ game, onClose }) => {

    return (
        <Modal show={true} onHide={onClose}>
            <div className='icon-position' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Modal.Body className='game-info rounded'>
                        <Carousel data-bs-theme="dark">
                            {game.imageIds.map((image, index) => (
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
                                <Modal.Title className='fs-2 fw-bold text-white'>{game.title}</Modal.Title>
                            </Col>
                        </Row>
                        <Row className='gap-2'>
                            <table className="tags-table">
                                <thead>
                                <tr>
                                    <th>Tags:</th>
                                </tr>
                                </thead>
                                <tbody>
                                {game.tags?.map((tag, index) => (
                                    <tr key={tag.id}>
                                        <td className="tag-cell">
                                            <div className="tag-content">
                                                <AiFillTags size={30} />
                                                <span>{tag.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Row>
                        <Row className='mt-3'>
                            <Form.Control
                                as="textarea"
                                disabled
                                placeholder={game.description}
                                style={{ height: '100px', margin: '1rem 0' }}
                            />
                        </Row>
                    </Modal.Body>
                </Col>
                <Col lg={6}>
                    <Row className='gap-2'>
                        <table className="tags-table">
                            <thead>
                            <tr>
                                <th>Components</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {game.components?.map((component, index) => (
                                <tr key={component.id}>
                                    <td className="tag-cell">
                                        <div className="tag-content">
                                            <span>{component.name}</span>
                                        </div>
                                    </td>
                                    <td className="tag-cell">
                                        <div className="tag-content">
                                            <span>{component.quantity}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Row>
                </Col>
            </Row>
        </Modal>
    );
}

export default GameInfo;