import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {NewEmployeeModalProps} from "../Props/NewEmployeeModalProps";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {PiUserListBold} from "react-icons/pi";
import {BsEnvelope, BsTelephone} from "react-icons/bs";
import {MdAdminPanelSettings} from "react-icons/md";
import ToggleComponent from "./ToggleComponent";
import {RiLockPasswordFill} from "react-icons/ri";

const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({ show, onClose, onSave }) => {


    const [userName, setUserName] = useState<string>('');
    const [roles, setRoles] = useState<string[]>([]);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isActivated, setIsActivated] = useState(true);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        Api.user.getRoles().then(res => {
            setRoles(res);
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    }, []);

    const handleSave = () => {
        // onSave({ id: Date.now(), firstName, lastName, isAdmin });
        // setFirstName('');
        // setLastName('');
        // setIsAdmin(false);
        // onClose();
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
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Add employee</Modal.Title>
            <Modal.Body>
                <Form as={Col} lg={8} className='mx-auto mb-5'>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div>
                                        <BsEnvelope size={30} />
                                    </div>
                                    <div>
                                        Email:
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={email}
                                          placeholder="Enter email"
                                          onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div>
                                        <PiUserListBold size={30} />
                                    </div>
                                    <div>
                                        UserName:
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={userName}
                                          placeholder="Enter username"
                                          onChange={(e) => setUserName(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div>
                                        <BsTelephone size={30} />
                                    </div>
                                    <div>
                                        Phone Number:
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={phone}
                                          placeholder="Enter phone number"
                                          onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div>
                                        <RiLockPasswordFill size={30} />
                                    </div>
                                    <div>
                                        Password:
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control
                                type='password'
                                value={password}
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div>
                                        <MdAdminPanelSettings size={30} />
                                    </div>
                                    <div>
                                        Role:
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >{roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            </Form.Control>
                        </div>
                    </Form.Group>
                    <div className='flex justify-center items-center'>
                        <ToggleComponent label="Active: " initialValue={isActivated}  onChange={setIsActivated}  labels={['Yes', 'No']}/>
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                        <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px', paddingInline: '3rem' }}>
                            Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewEmployeeModal;