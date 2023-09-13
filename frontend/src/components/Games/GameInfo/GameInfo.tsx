import React from 'react';
import { Modal, Button, Row, Col, Carousel, Form } from 'react-bootstrap';
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';
import './GameInfo.css'

interface GameInfoProps {
    game: any;
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
            <Modal.Body className='game-info rounded'>
                <Carousel data-bs-theme="dark">
                    <img src={game.img} alt={game.name} style={{ width: '100%', height: '100%' }} />
                </Carousel>
                <Row className='mt-3 align-items-center'>
                    <Col xs={8}>
                        <Modal.Title className='fs-2 fw-bold text-white'>{game.name}</Modal.Title>
                    </Col>
                    <Col xs={4} className='d-flex justify-content-end'>
                        <Link to="/order" state={{ game: game }}><Button className='button-card'>Order</Button></Link>
                    </Col>
                </Row>
                <Row className='gap-2'>
                    {game.tags.map(tag => {
                        return <Col lg={2} className='info-tag text-uppercase' key={tag}>{tag}</Col>
                    })}
                </Row>
                <Form.Control
                    as="textarea"
                    disabled
                    placeholder={game.description}
                    style={{ height: '100px' }}
                />
            </Modal.Body>
        </Modal>
    );
}

export default GameInfo;