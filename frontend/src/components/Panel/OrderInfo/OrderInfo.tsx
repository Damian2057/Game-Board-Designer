import React from 'react'
import { Modal, Row, Col } from 'react-bootstrap';
import { GrClose } from "react-icons/gr";

interface OrderInfoProps {
    order: any;
    onClose: () => void;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ order, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} className='text-white'>
            <div className='icon-position' >
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Row className='align-items-center'>
                <Col>
                    <Modal.Title className='fs-1 text-center fw-bold'>
                        <div>{order.name}</div>
                    </Modal.Title>
                    <Modal.Body className=' fs-5'>
                        <div>
                            <span className='fw-bold'>Price:</span> ${order.price}
                        </div>
                        <div>
                            <span className='fw-bold'>Order date:</span> {order.date}
                        </div>
                        <div>
                            <span className='fw-bold'>Order status:</span> {order.status}
                        </div>
                    </Modal.Body>
                </Col>
            </Row>
        </Modal>

    )
}

export default OrderInfo