import React from "react";
import {OrderInfoProps} from "../Props/OrderInfoProps";
import {Form, Modal, Row} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import Col from "react-bootstrap/Col";
import {AiFillTags} from "react-icons/ai";

const OrderInfo: React.FC<OrderInfoProps> = ({ order, onClose }) => {
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
                <Row className='mt-3 align-items-center'>
                    <Col xs={8}>
                        <Modal.Title className='fs-2 fw-bold text-white'>Order ID: {order.id}</Modal.Title>
                    </Col>
                </Row>
                <Row className='gap-2 text-white'>
                    <Col xs={0}>
                        <div className="tag-content">
                            <span>Status: {order.status}</span>
                        </div>
                    </Col>
                </Row>
                <Row className='gap-2 text-white'>
                    <Col xs={0}>
                        <div className="tag-content">
                            <span>Phone Number: {order.phone}</span>
                        </div>
                    </Col>
                </Row>
                <Row className='gap-2 text-white'>
                    <Col xs={0}>
                        <div className="tag-content">
                            <span>Address: {order.address}</span>
                        </div>
                    </Col>
                </Row>
                <Row className='gap-2 text-white'>
                    <Col xs={0}>
                        <div className="tag-content">
                            <span>Email: {order.email}</span>
                        </div>
                    </Col>
                </Row>
                <Row className='gap-2'>
                    <table className="tags-table">
                        <thead>
                        <tr>
                            <th>Games:</th>
                            <th>Price:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={order.game.id}>
                            <td className="tag-cell">
                                <div className="tag-content">
                                    <AiFillTags size={30} />
                                    <span>{order.game.title}</span>
                                </div>
                            </td>
                            <td className="tag-cell">
                                <div className="tag-content">
                                    <span>{order.game.price}</span>
                                    <span>{order.game.currency}</span>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Row>
                <Row className='mt-3'>
                    <Form.Control
                        as="textarea"
                        disabled
                        placeholder={order.description}
                        style={{ height: '100px', margin: '1rem 0' }}
                    />
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default OrderInfo;