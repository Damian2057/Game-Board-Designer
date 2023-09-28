import React, {useEffect, useState} from "react";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {PiUserListBold} from "react-icons/pi";
import {TagEditProps} from "../Props/TagEditProps";
import {MdDriveFileRenameOutline} from "react-icons/md";

const TagEdit: React.FC<TagEditProps> = ({ show, onClose, onSave, editedTag }) => {

    const [tagName, setTagName] = useState<string>('');


    useEffect(() => {
        if (editedTag) {
            setTagName(editedTag.name);
        }
    }, [editedTag]);


    const handleSave = () => {
        if (editedTag) {
            Api.game.updateTag(editedTag.id, {
                name: tagName,
            }).then((tag) => {
                onSave(tag);
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
                                            Tag name:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={tagName} onChange={(e) => setTagName(e.target.value)} />
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

export default TagEdit;