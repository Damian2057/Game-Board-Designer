import React, {useEffect, useState} from "react";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {MdDriveFileRenameOutline} from "react-icons/md";
import {ComponentEditProps} from "../Props/ComponentEditProps";
import {t} from "i18next";

const ComponentEditModal: React.FC<ComponentEditProps> = ({ show, onClose, onSave, editedComponent }) => {

    const [componentName, setComponentName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);


    useEffect(() => {
        if (editedComponent) {
            setComponentName(editedComponent.name);
            setQuantity(editedComponent.quantity)
        }
    }, [editedComponent]);


    const handleSave = () => {
        if (editedComponent) {
            Api.game.updateComponent(editedComponent.id, {
                name: componentName,
                quantity: quantity
            }).then((component) => {
                onSave(component);
                toast.success(t('Successfully updated'), { icon: "👋" });
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
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>{t('Edit Component')}</Modal.Title>
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
                                            {t('Component name')}
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={componentName} onChange={(e) => setComponentName(e.target.value)} />
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
                                            {t('Quantity')}
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={quantity} onChange={(e) =>setQuantity(parseFloat(e.target.value))} />
                            </div>
                        </Form.Group>
                        <div className='flex justify-center items-center mt-4'>
                            <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px' }}>{t('Save Data')}</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default ComponentEditModal;