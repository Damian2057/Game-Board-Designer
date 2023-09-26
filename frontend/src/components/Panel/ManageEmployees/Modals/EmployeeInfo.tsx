import React from "react";
import {Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {EmployeeInfoProps} from "../Props/EmployeeInfoProps";

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} className='text-white' style={{}}>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Employee: {employee?.id}</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={8} className='mx-auto mb-5'>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Username:</Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={employee?.username} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Email:</Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={employee?.email} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Phone Number:</Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={employee?.phoneNumber} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Active:</Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={employee?.isActive ? 'Yes' : 'No'} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <span>
                                <Form.Label className='fw-bold'>Role:</Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={employee?.role} />
                            </span>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default EmployeeInfo;