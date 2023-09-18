import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {Container, Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import IconCircle from '../util/IconCircle';
import './Register.css'
import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {Api} from "../../connector/api";
import {useNavigate} from "react-router-dom";
import {GrClose} from "react-icons/gr";

function Register() {

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [showActivateCodeModal, setShowActivateCodeModal] = useState(false);

    const sendRegistrationRequest = () => {
        setShowActivateCodeModal(true);
        Api.user.registerUser(username, password, email, phoneNumber).then(() => {
            toast.success('Successfully registered!', { icon: "👋" });
            setShowActivateCodeModal(true);
        }).catch(err => {
            if (err.response.data.statusCode === 400) {
                toast.error(`The entered account data is not correct.`, { icon: "💀" })
            } else {
                toast.error(`${err.response.data.message}`, { icon: "💀" })
            }
        });
    };

    const handleOpenCodeModal = () => {
        setShowActivateCodeModal(true);
    };

    const handleCloseCodeModal = () => {
        setShowActivateCodeModal(false);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className="register">
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <IconCircle path={'/'} />
                    <Row className='register-card-content'>
                        <Col>
                            <Card.Title className='register-title'>Create An Account</Card.Title>
                            <span className='user-already'>Already an user? <a className='redirect' href='/login'>Sign In</a></span>
                            <br/>
                            <span className='user-already'>Activate account? <a className='redirect' onClick={handleOpenCodeModal}>Activate</a></span>
                            <Form>
                                <Form.Group as={Col} controlId="registerUsername" >
                                    <Form.Label column sm={10} xs={10} className='form-label'>
                                        Username
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} controlId="registerPhoneNumber" >
                                    <Form.Label column sm={10} xs={10} className='form-label'>
                                        Phone number
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control
                                            type='tel'
                                            placeholder='+48 321 321 321'
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="registerEmail">
                                    <Form.Label column sm={10} xs={10} className='form-label'>
                                        Email
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control
                                            type='email'
                                            placeholder="example@mail.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group controlId="registerPassword">
                                    <Form.Label column sm={10} xs={10} className='form-label'>
                                        Password
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Col lg={10} xs={10} className='mx-auto mb-5'>
                                    <Button type="button" className='register-button' onClick={sendRegistrationRequest}>
                                        Sign Up
                                    </Button>
                                </Col>
                            </Form>
                        </Col>
                        <Col lg={6} md={6} sm={8}>
                            <img className='image' src="/src/assets/undraw_register.svg" alt="Undraw Register" style={{ width: '100%', height: '100%' }} />
                        </Col>
                    </Row>
                    <CodeModal show={showActivateCodeModal} onClose={handleCloseCodeModal}/>
                </Card>
            </Container>
        </div >
    );
}

export default Register;

interface Props {
    show: boolean;
    onClose: () => void;
}

const CodeModal: React.FC<Props> = ({ show, onClose }) => {

    const [code, setCode] = useState('');

    const handleSend = () => {
        Api.user.activateUser(code).then(() => {
            toast.success('Successfully activated!', { icon: "👋" });
            onClose();
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    };

    return (
        <Modal show={show} onHide={onClose} className='text-white'>
            <Toaster />
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Enter activation code</Modal.Title>
            <Modal.Body>
                <Form as={Col} lg={8} className='mx-auto mb-5'>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>Enter Code:</Form.Label>
                            <Form.Control type='text'
                                          placeholder="Enter Code"
                                          value={code}
                                          onChange={(e) => setCode(e.target.value)} />
                        </div>
                    </Form.Group>
                    <div className='flex justify-center items-center mt-4'>
                        <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSend} style={{ color: '#7D53DE', borderRadius: '20px', paddingInline: '3rem' }}>
                            Activate</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};