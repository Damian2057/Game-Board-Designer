import React, {useEffect, useState} from "react";
import {Api} from "../../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {MdDriveFileRenameOutline} from "react-icons/md";
import {PropertyEditProps} from "../../Props/PropertyEditProps";

const PropertyEditModal: React.FC<PropertyEditProps> = ({ show, onClose, onSave, editedProp }) => {

    const [name, setName] = useState<string>('');
    const [value, setValue] = useState<string>('');


    useEffect(() => {
        if (editedProp) {
            setName(editedProp.name);
            setValue(editedProp.value)
        }
    }, [editedProp]);


    const handleSave = () => {
        if (editedProp) {
            Api.property.updateProperty({
                name: name,
                value: value
            }, editedProp.id).then((prop) => {
                onSave(prop);
                toast.success('Successfully updated!', { icon: "👋" });
                onClose();
            }).catch(err => {
                toast.error(`${err.response.data.message}`, { icon: "💀" })
            });
        }
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
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Edit Tag</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={8} className='mx-auto mb-5'>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <MdDriveFileRenameOutline size={30} />
                                        </div>
                                        <div>
                                            Component name:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <MdDriveFileRenameOutline size={30} />
                                        </div>
                                        <div>
                                            Component quantity:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={value} onChange={(e) => setValue(e.target.value)} />
                            </div>
                        </Form.Group>
                        <div className='flex justify-center items-center mt-4'>
                            <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px' }}>Save changes</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default PropertyEditModal;