import React from "react";
import {Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {UserInfoProps} from "../Props/UserInfoProps";
import {PiUserListBold} from "react-icons/pi";
import {BsEnvelope, BsTelephone} from "react-icons/bs";
import {MdAdminPanelSettings} from "react-icons/md";

const EmployeeInfoModal: React.FC<UserInfoProps> = ({ name, employee, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} className='text-white' style={{}}>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>{name}: {employee?.id}</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={8} className='mx-auto mb-5'>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <PiUserListBold size={30} />
                                        </div>
                                        <div>
                                            UserName:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={employee?.username} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <BsEnvelope size={30} />
                                        </div>
                                        <div>
                                            Email:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={employee?.email} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <BsTelephone size={30} />
                                        </div>
                                        <div>
                                            Phone number:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' readOnly disabled placeholder={employee?.phoneNumber} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <MdAdminPanelSettings size={30} />
                                        </div>
                                        <div>
                                            Role: {employee?.role}
                                        </div>
                                    </div>
                                </Form.Label>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Active: {employee?.isActive ? 'Yes' : 'No'}</Form.Label>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default EmployeeInfoModal;