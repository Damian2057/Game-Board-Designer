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
import {t} from "i18next";

const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({ show, onClose, onSave }) => {


    const [userName, setUserName] = useState<string>('');
    const [roles, setRoles] = useState<string[]>([]);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isActivated, setIsActivated] = useState(true);
    const [selectedRole, setSelectedRole] = useState('employee');

    useEffect(() => {
        Api.user.getRoles().then(res => {
            setRoles(res);
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    }, []);

    const handleSave = () => {
        Api.user.createUser({
            username: userName,
            password: password,
            email: email,
            phoneNumber: phone,
            role: selectedRole,
            isActive: isActivated
        }).then(() => {
            toast.success(t('Employee created successfully'), { icon: "👏" });
            onSave(null);
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
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>{t('Add employee')}</Modal.Title>
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
                                        {t('Email')}
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={email}
                                          placeholder={t('Enter email')}
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
                                        {t('Username')}
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={userName}
                                          placeholder={t('Enter username')}
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
                                        {t('Phone')}
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control type='text'
                                          value={phone}
                                          placeholder={t('Enter phone number')}
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
                                        {t('Password')}
                                    </div>
                                </div>
                            </Form.Label>
                            <Form.Control
                                type='password'
                                value={password}
                                placeholder={t('Enter password')}
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
                                        {t('Role')}
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
                        <ToggleComponent label="Active: " initialValue={isActivated}  onChange={setIsActivated}  labels={[t('Yes'), t('No')]}/>
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                        <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px', paddingInline: '3rem' }}>
                            {t('add')}</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewEmployeeModal;