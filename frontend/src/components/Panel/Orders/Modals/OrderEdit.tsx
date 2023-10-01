import React, {useEffect, useState} from "react";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose, GrStatusCriticalSmall, GrStatusInfo} from "react-icons/gr";
import {PiUserListBold} from "react-icons/pi";
import {BsEnvelope, BsTelephone} from "react-icons/bs";
import {MdAdminPanelSettings, MdOutlineDescription} from "react-icons/md";
import {OrderEditProps} from "../Props/OrderEditProps";
import {User} from "../../../../model/user/user";
import {FaAddressBook, FaUserAstronaut} from "react-icons/fa";
import {BiSolidCity} from "react-icons/bi";
import {GiPriceTag} from "react-icons/gi";

const OrderEdit: React.FC<OrderEditProps> = ({ name, show, onClose, onSave, editedOrder }) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currency, setCurrency] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [status, setStatus] = useState<string[]>([]);
    const [worker, setWorker] = useState<User>();

    useEffect(() => {
        Api.order.getAvailableStatuses().then(res => {
            setStatus(res);
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
        if (!editedOrder) {
            return;
        }
        setEmail(editedOrder.email);
        setPhone(editedOrder.phone);
        setDescription(editedOrder.description);
        setAddress(editedOrder.address);
        setCity(editedOrder.city);
        setPrice(editedOrder.price);
        setFirstName(editedOrder.firstName);
        setLastName(editedOrder.lastName);
        setCurrency(editedOrder.currency);
        setSelectedStatus(editedOrder.status);
        setWorker(editedOrder.worker);

    }, [editedOrder]);


    const handleSave = () => {
        // if (editedEmployee) {
        //     let name = userName != editedEmployee.username ? userName : null;
        //     let phoneNumber = phone != editedEmployee.phoneNumber ? phone : null;
        //     let mail = email != editedEmployee.email ? email : null;
        //     let pass = password != '' ? password : null;
        //     Api.user.updateUser(editedEmployee.id, {
        //         username: name,
        //         phoneNumber: phoneNumber,
        //         email: mail,
        //         password: pass,
        //         role: selectedRole,
        //         isActive: isActivated
        //     }).then((user) => {
        //         onSave(user);
        //         toast.success('Successfully updated!', { icon: "👋" });
        //         onClose();
        //     }).catch(err => {
        //         toast.error(`${err.response.data.message}`, { icon: "💀" })
        //     });
        // }
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
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Edit {name}</Modal.Title>
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
                                            FirstName:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
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
                                            LastName:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
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
                                            <FaAddressBook size={30} />
                                        </div>
                                        <div>
                                            Address:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <BiSolidCity size={30} />
                                        </div>
                                        <div>
                                            City:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <MdOutlineDescription size={30} />
                                        </div>
                                        <div>
                                            Description:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder='Game description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <GiPriceTag size={30} />
                                        </div>
                                        <div>
                                            Price:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Game price'
                                    value={isNaN(price) ? '' : price.toString()}
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                    step="any"
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Select className='form-select ' aria-label="Currency selector" defaultValue={currency} onChange={(e) => setCurrency(e.target.value)}>
                                <option disabled value={''}>Choose currency</option>
                                <option value={'PLN'}>PLN</option>
                                <option value={'EUR'}>EUR</option>
                                <option value={'USD'}>USD</option>
                            </Form.Select>
                        </Form.Group>
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

                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <FaUserAstronaut size={30} />
                                        </div>
                                        <div>
                                            Assigned to:
                                        </div>
                                    </div>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={worker?.username}
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

export default OrderEdit;