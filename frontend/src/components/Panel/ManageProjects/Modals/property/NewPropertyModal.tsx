import React, {useState} from "react";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {VscSymbolNamespace} from "react-icons/vsc";
import {FaSortAmountDownAlt} from "react-icons/fa";
import {NewPropertyProps} from "../../Props/NewPropertyProps";

const NewPropertyModal: React.FC<NewPropertyProps> = ({ show, onClose, onSave }) => {

    const [name, setName] = useState<string>('');
    const [value, setValue] = useState<string>('');

    const handleSave = () => {
        onSave({
            name: name,
            value: value
        });
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
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Add Property</Modal.Title>
            <Modal.Body>
                <Form as={Col} lg={8} className='mx-auto mb-5'>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div>
                                        <VscSymbolNamespace size={30} />
                                    </div>
                                    <div>
                                        Property name:
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={name}
                                          placeholder="Enter property name"
                                          onChange={(e) => setName(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div>
                                        <FaSortAmountDownAlt size={30} />
                                    </div>
                                    <div>
                                        Value:
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={value}
                                          placeholder="Enter value"
                                          onChange={(e) => setValue(e.target.value)} />
                        </div>
                    </Form.Group>
                    <div className='flex justify-center items-center mt-4'>
                        <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px', paddingInline: '3rem' }}>
                            Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewPropertyModal;