import React from "react";
import {OrderInfoProps} from "./OrderInfoProps";
import {Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import Col from "react-bootstrap/Col";

const OrderInfo: React.FC<OrderInfoProps> = ({ order, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} className='text-white' style={{}}>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Employee info</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={8} className='mx-auto mb-5'>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>First Name:</Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={order.customer?.username} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Last Name:</Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={order.customer?.username} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <span>
                                <Form.Label className='fw-bold'>Role:</Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={order.customer?.username} />
                            </span>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default OrderInfo;