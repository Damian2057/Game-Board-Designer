import React, {useState} from "react";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose, GrStatusCriticalSmall} from "react-icons/gr";
import {StatusUpdateProps} from "../Props/StatusUpdateProps";

const StatusUpdateModal: React.FC<StatusUpdateProps> = ({show, onClose, onSave, editedOrder }) => {

    const [selectedStatus, setSelectedStatus] = useState('');
    const [status, setStatus] = useState<string[]>([]);

    React.useEffect(() => {
        if (!editedOrder) {
            return;
        }
        Api.order.getAvailableStatuses().then((statuses) => {
            setStatus(statuses);
            setSelectedStatus(editedOrder.status)
        }).catch((error) => {
            toast.error(`${error.response.data.message}`, { icon: "💀" });
        });
    }, [editedOrder]);

    const handleSave = () => {
        if (!editedOrder) {
            return;
        }
        let stat = selectedStatus != editedOrder.status ? selectedStatus : null;
        Api.order.advanceUpdateOrder(editedOrder.id, {
            status: stat,
        }).then((order) => {
            onSave(order);
            toast.success(`Status updated`);
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
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Edit Status</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={8} className='mx-auto mb-5'>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <GrStatusCriticalSmall size={30} />
                                        </div>
                                        <div>
                                            Status:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >{status.map((stat) => (
                                    <option key={stat} value={stat}>
                                        {stat}
                                    </option>
                                ))}
                                </Form.Control>
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

export default StatusUpdateModal;