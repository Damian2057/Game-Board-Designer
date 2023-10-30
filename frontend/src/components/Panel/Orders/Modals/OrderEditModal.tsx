import React, {useEffect, useState} from "react";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose, GrStatusCriticalSmall} from "react-icons/gr";
import {PiUserListBold} from "react-icons/pi";
import {BsEnvelope, BsTelephone} from "react-icons/bs";
import {MdOutlineDescription} from "react-icons/md";
import {OrderEditProps} from "../Props/OrderEditProps";
import {User} from "../../../../model/user/user";
import {FaAddressBook, FaUserAstronaut} from "react-icons/fa";
import {BiSolidCity} from "react-icons/bi";
import {GiPriceTag} from "react-icons/gi";
import CustomSelect from "./CustomSelect";
import {t} from "i18next";

const OrderEditModal: React.FC<OrderEditProps> = ({ name, show, onClose, onSave, editedOrder }) => {

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
    const [employees, setEmployees] = useState<User[]>([]);
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
        Api.user.findUser({
            roles: 'admin,employee'
        }).then(res => {
            setEmployees(res);
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        })
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
        if (!editedOrder) {
            return;
        }
        let first = firstName != editedOrder.firstName ? firstName : null;
        let last = lastName != editedOrder.lastName ? lastName : null;
        let mail = email != editedOrder.email ? email : null;
        let phoneNum = phone != editedOrder.phone ? phone : null;
        let desc = description != editedOrder.description ? description : null;
        let addr = address != editedOrder.address ? address : null;
        let cit = city != editedOrder.city ? city : null;
        let pri = price != editedOrder.price ? price : null;
        let cur = currency != editedOrder.currency ? currency : null;
        let stat = selectedStatus != editedOrder.status ? selectedStatus : null;
        let work = worker != editedOrder.worker ? worker : null;
        Api.order.advanceUpdateOrder(editedOrder.id, {
            firstName: first,
            lastName: last,
            email: mail,
            phone: phoneNum,
            description: desc,
            address: addr,
            city: cit,
            price: pri,
            currency: cur,
            status: stat,
            worker: work
        }).then((order) => {
            onSave(order);
            toast.success(t('Successfully updated'), { icon: "👋" });
            onClose();
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    };

    const handleChange = (e: any) => {
        const name = e.target.value;
        if (name == 'None') {
            return;
        }
        const worker = employees.find(user => user.email === name);
        if (worker) {
            setWorker(worker);
        }
    }


    return (
        <Modal show={show} onHide={onClose} className='text-white' dialogClassName='custom-modal'>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>{t('Edit')} {name}</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={12} className='mx-auto py-0 px-4'>
                        <div className='flex flex-row gap-8'>
                            <Form.Group as={Col}>
                                <div>
                                    <Form.Label className='fw-bold'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <PiUserListBold size={30} />
                                            </div>
                                            <div>
                                                {t('firstname')}
                                            </div>
                                        </div>
                                    </Form.Label>
                                    <Form.Control type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <div>
                                    <Form.Label className='fw-bold'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <PiUserListBold size={30} />
                                            </div>
                                            <div>
                                                {t('lastname')}
                                            </div>
                                        </div>
                                    </Form.Label>
                                    <Form.Control type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </Form.Group>
                        </div>
                        <div className='flex flex-row gap-8'>
                            <Form.Group as={Col}>
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
                                    <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </Form.Group>
                            <Form.Group as={Col}>
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
                                    <Form.Control type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </Form.Group>
                        </div>
                        <div className='flex flex-row gap-8'>
                            <Form.Group as={Col}>
                                <div>
                                    <Form.Label className='fw-bold'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <FaAddressBook size={30} />
                                            </div>
                                            <div>
                                                {t('address')}
                                            </div>
                                        </div>
                                    </Form.Label>
                                    <Form.Control type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <div>
                                    <Form.Label className='fw-bold'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <BiSolidCity size={30} />
                                            </div>
                                            <div>
                                                {t('City')}
                                            </div>
                                        </div>
                                    </Form.Label>
                                    <Form.Control type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                            </Form.Group>
                        </div>
                        <Form.Group>
                            <div>
                                <Form.Label className='fw-bold'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div>
                                            <MdOutlineDescription size={30} />
                                        </div>
                                        <div>
                                            {t('Description')}
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
                        <div className='flex flex-row gap-8 justify-center items-center'>
                            <Form.Group as={Col} className="mt-0">
                                <div>
                                    <Form.Label className='fw-bold'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <GiPriceTag size={30} />
                                            </div>
                                            <div>
                                                {t('Price')}
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
                            <Form.Group as={Col} className='mt-16'>
                                <Form.Select className='currency-select ' aria-label="Currency selector" defaultValue={currency} onChange={(e) => setCurrency(e.target.value)}>
                                    <option disabled value={''}>{t('Choose currency')}</option>
                                    <option value={'PLN'}>PLN</option>
                                    <option value={'EUR'}>EUR</option>
                                    <option value={'USD'}>USD</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='flex flex-row gap-8'>
                            <Form.Group as={Col}>
                                <div>
                                    <Form.Label className='fw-bold'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <GrStatusCriticalSmall size={30} />
                                            </div>
                                            <div>
                                                {t('Status')}
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
                            <Form.Group as={Col}>
                                <div>
                                    <Form.Label className='fw-bold'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <FaUserAstronaut size={30} />
                                            </div>
                                            <div>
                                                {t('Assigned to')}
                                            </div>
                                        </div>
                                    </Form.Label>
                                    <CustomSelect
                                        value={worker ? worker.email : 'None'}
                                        onChange={(e) => handleChange(e)}
                                        employees={employees}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                        <div className='flex justify-center items-center mt-4'>
                            <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px' }}>{t('Save Data')}</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default OrderEditModal;
