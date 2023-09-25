import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {OrderEditProps} from "./OrderEditProps";

const OrderEdit: React.FC<OrderEditProps> = ({ show, onClose, onSave, editedOrder }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    // useEffect(() => {
    //     setFirstName(editedOrder.firstName);
    //     setLastName(editedOrder.lastName);
    //     setIsAdmin(editedOrder.isAdmin);
    // }, [editedOrder]);
    //
    //
    // const handleSave = () => {
    //     onSave({ id: editedEmployee.id, firstName, lastName, isAdmin });
    //     onClose();
    // };

    return (
        <Modal show={show} onHide={onClose} className='text-white'>
            {/*<div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>*/}
            {/*    <a onClick={onClose} >*/}
            {/*        <div className='icon-circle' >*/}
            {/*            <GrClose />*/}
            {/*        </div>*/}
            {/*    </a>*/}
            {/*</div>*/}
            {/*<Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Edit employee</Modal.Title>*/}
            {/*<div className='game-info rounded'>*/}
            {/*    <Modal.Body className=' fs-5 rounded-md'>*/}
            {/*        <Form as={Col} lg={8} className='mx-auto mb-5'>*/}
            {/*            <Form.Group>*/}
            {/*                <div>*/}
            {/*                    <Form.Label className='fw-bold'>First Name:</Form.Label>*/}
            {/*                    <Form.Control type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />*/}
            {/*                </div>*/}
            {/*            </Form.Group>*/}
            {/*            <Form.Group>*/}
            {/*                <div>*/}
            {/*                    <Form.Label className='fw-bold'>Last Name:</Form.Label>*/}
            {/*                    <Form.Control type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />*/}
            {/*                </div>*/}
            {/*            </Form.Group>*/}
            {/*            <div className='flex justify-center items-center'>*/}
            {/*                /!*<ToggleComponent label="Role" initialValue={isAdmin} onChange={setIsAdmin} />*!/*/}
            {/*            </div>*/}
            {/*            <div className='flex justify-center items-center mt-4'>*/}
            {/*                <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px' }}>Save changes</Button>*/}
            {/*            </div>*/}
            {/*        </Form>*/}
            {/*    </Modal.Body>*/}
            {/*</div>*/}
        </Modal>
    );
}

export default OrderEdit;