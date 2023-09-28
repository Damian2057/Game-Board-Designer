import React, {useState} from "react";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {NewTagProps} from "../Props/NewTagProps";
import {AiFillTags} from "react-icons/ai";

const NewTag: React.FC<NewTagProps> = ({ show, onClose, onSave }) => {

    const [tagName, setTagName] = useState<string>('');

    const handleSave = () => {
        Api.game.createTag({
            name: tagName
        }).then((tag) => {
            onSave(tag);
            toast.success('Successfully created!', { icon: "👋" });
            onClose();
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
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
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Add tag</Modal.Title>
            <Modal.Body>
                <Form as={Col} lg={8} className='mx-auto mb-5'>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div>
                                        <AiFillTags size={30} />
                                    </div>
                                    <div>
                                        Tag name:
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={tagName}
                                          placeholder="Enter tag name"
                                          onChange={(e) => setTagName(e.target.value)} />
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

export default NewTag;