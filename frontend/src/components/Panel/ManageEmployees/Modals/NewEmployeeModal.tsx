import React, {useState} from "react";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {NewEmployeeModalProps} from "../Props/NewEmployeeModalProps";

const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({ show, onClose, onSave }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSave = () => {
        onSave({ id: Date.now(), firstName, lastName, isAdmin });
        setFirstName('');
        setLastName('');
        setIsAdmin(false);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} className='text-white'>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Add employee</Modal.Title>
            <Modal.Body>
                <Form as={Col} lg={8} className='mx-auto mb-5'>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>First Name:</Form.Label>
                            <Form.Control type='text'
                                          placeholder="Enter first name"
                                          value={firstName}
                                          onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>Last Name:</Form.Label>
                            <Form.Control type='text'
                                          placeholder="Enter last name"
                                          value={lastName}
                                          onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </Form.Group>
                    {/*<Form.Group>*/}
                    {/*    <div className='flex justify-center items-center'>*/}
                    {/*        <ToggleComponent label="Role" initialValue={isAdmin} onChange={setIsAdmin} />*/}
                    {/*    </div>*/}
                    {/*</Form.Group>*/}
                    <div className='flex justify-center items-center mt-4'>
                        <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px', paddingInline: '3rem' }}>
                            Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewEmployeeModal;