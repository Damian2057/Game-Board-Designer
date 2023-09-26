import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {OrderEditProps} from "../Props/OrderEditProps";
import {Api} from "../../../../connector/api";
import toast, {Toaster} from "react-hot-toast";

const OrderEdit: React.FC<OrderEditProps> = ({ show, onClose, onSave, editedOrder }) => {

    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editedOrder) {
            setPhone(editedOrder.phone);
            setAddress(editedOrder.address);
            setEmail(editedOrder.email);
            setCity(editedOrder.city);
            setDescription(editedOrder.description);
        }
    }, [editedOrder]);

    const handleSave = () => {
        if (!editedOrder) {
            return;
        }
        Api.order.userUpdateOrder(editedOrder?.id, {
            phone: phone,
            address: address,
            email: email,
            city: city,
            description: description
        }).then((order) => {
            toast.success(`Order updated!`, { icon: "👏" });
            setTimeout(() => {
                onSave(order);
                onClose();
            }, 2000);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    };

    return (
        <Modal show={show} onHide={onClose} className='text-white'>
            <Toaster />
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Edit order ID: {editedOrder?.id}</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={8} className='mx-auto mb-5'>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Phone Number:</Form.Label>
                                <Form.Control type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Address:</Form.Label>
                                <Form.Control type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Email:</Form.Label>
                                <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>City:</Form.Label>
                                <Form.Control type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>Description:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={description || ''}
                                    style={{ height: '100px', margin: '1rem 0' }}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        <div className='flex justify-center items-center'>
                            {/*<ToggleComponent label="Role" initialValue={isAdmin} onChange={setIsAdmin} />*/}
                        </div>
                        <div className='flex justify-center items-center mt-4'>
                            <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px' }}>Save changes</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default OrderEdit;