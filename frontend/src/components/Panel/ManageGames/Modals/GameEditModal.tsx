import React, {useEffect, useState} from "react";
import {EmployeeEditProps} from "../../ManageEmployees/Props/EmployeeEditProps";
import {Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {PiUserListBold} from "react-icons/pi";
import {BsEnvelope, BsTelephone} from "react-icons/bs";
import {RiLockPasswordFill} from "react-icons/ri";
import {MdAdminPanelSettings} from "react-icons/md";
import ToggleComponent from "../../ManageEmployees/Modals/ToggleComponent";
import {GameEditProps} from "../Props/GameEditProps";

const GameEditModal: React.FC<GameEditProps> = ({ show, onClose, onSave, editedGame }) => {

    const [userName, setUserName] = useState<string>('');
    const [roles, setRoles] = useState<string[]>([]);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isActivated, setIsActivated] = useState(true);
    const [selectedRole, setSelectedRole] = useState('');


    // useEffect(() => {
    //     if (editedEmployee) {
    //         Api.user.getRoles().then(res => {
    //             setRoles(res);
    //         }).catch(err => {
    //             toast.error(`${err.response.data.message}`, { icon: "💀" })
    //         });
    //         setUserName(editedEmployee.username);
    //         setEmail(editedEmployee.email);
    //         setPhone(editedEmployee.phoneNumber);
    //         setIsActivated(editedEmployee.isActive);
    //         setSelectedRole(editedEmployee.role);
    //     }
    // }, [editedEmployee]);
    //
    //
    // const handleSave = () => {
    //     if (editedEmployee) {
    //         let name = userName != editedEmployee.username ? userName : null;
    //         let phoneNumber = phone != editedEmployee.phoneNumber ? phone : null;
    //         let mail = email != editedEmployee.email ? email : null;
    //         let pass = password != '' ? password : null;
    //         Api.user.updateUser(editedEmployee.id, {
    //             username: name,
    //             phoneNumber: phoneNumber,
    //             email: mail,
    //             password: pass,
    //             role: selectedRole,
    //             isActive: isActivated
    //         }).then((user) => {
    //             onSave(user);
    //             toast.success('Successfully updated!', { icon: "👋" });
    //             onClose();
    //         }).catch(err => {
    //             toast.error(`${err.response.data.message}`, { icon: "💀" })
    //         });
    //     }
    // };

    return (
        <Modal show={show} onHide={onClose} className='text-white'>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Edit employee</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={8} className='mx-auto mb-5'>
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
                                <Form.Control type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                        </Form.Group>
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
                                <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                            Phone number:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                            {/*<Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px' }}>Save changes</Button>*/}
                        </div>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default GameEditModal;