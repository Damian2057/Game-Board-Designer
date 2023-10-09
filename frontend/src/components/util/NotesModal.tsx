import React from "react";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {NotesProps} from "./NotesProps";
import {GrClose} from "react-icons/gr";

const NotesModal: React.FC<NotesProps> = ({ show, onClose, notes, onSave }) => {
    // Initialize the editedNotes state with the provided notes or an empty array

    React.useEffect(() => {
        setEditedNotes(notes || []);
    }, [notes]);

    const [editedNotes, setEditedNotes] = React.useState<string[]>(notes || []);

    function handleChangeNotes(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        const updatedNotes = [...editedNotes];
        updatedNotes[index] = e.target.value;
        setEditedNotes(updatedNotes);
    }

    function handleSave() {
        onSave(editedNotes);
        onClose();
    }

    function addNote() {
        const updatedNotes = [...editedNotes];
        updatedNotes.push('');
        setEditedNotes(updatedNotes);
    }

    function removeNote(index: number, note: string) {
        const updatedNotes = [...editedNotes];
        updatedNotes.splice(index, 1);
        setEditedNotes(updatedNotes);
    }

    return (
        <Modal show={show} onHide={onClose} className='text-white'>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Body className='fs-5 rounded-md'>
                <Form as={Col} lg={8} className='mx-auto mb-5'>
                    <Col>
                        {editedNotes.map((note, index) => {
                            return (
                                <div key={index} className="d-flex align-items-center">
                                    <Form.Group className="flex-grow-1">
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder='Fill Note'
                                            value={note}
                                            onChange={(e) => handleChangeNotes(e, index)}
                                        />
                                    </Form.Group>
                                    <Button
                                        className='button'
                                        onClick={() => removeNote(index, note)}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderColor: '#ffffff',
                                            borderRadius: '20px',
                                            paddingInline: '2rem',
                                            paddingBlock: '0.5rem',
                                            color: '#7D53DE',
                                        }}
                                    >delete</Button>
                                </div>
                            );
                        })}
                        <Form.Group>
                            <Button
                                type="button"
                                onClick={addNote}
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderColor: '#ffffff',
                                    borderRadius: '20px',
                                    paddingInline: '2rem',
                                    paddingBlock: '0.5rem',
                                    color: '#7D53DE',
                                }}
                            >Add</Button>
                        </Form.Group>
                    </Col>
                </Form>
            </Modal.Body>
            <Button onClick={handleSave}>Save</Button>
        </Modal>
    );
};

export default NotesModal;