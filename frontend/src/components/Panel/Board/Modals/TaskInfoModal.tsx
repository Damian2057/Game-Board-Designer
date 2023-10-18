import {Button, Form, Modal} from "react-bootstrap";
import React from "react";
import {TaskInfoProps} from "../Props/TaskInfoProps";


const TaskInfoModal: React.FC<TaskInfoProps> = ({ show, onHide }) => {

    const handleClose = () => {
    }

    const handleSave = () => {

    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Task Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Modify task</h4>
                <Form>
                    <Form.Group>
                        <Form.Label>Task description</Form.Label>
                        <Form.Control type="text" placeholder="There must be 5 pawns" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    onClick={handleSave}
                    style={{ backgroundColor: '#7D53DE', borderColor: '#7D53DE' }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskInfoModal;