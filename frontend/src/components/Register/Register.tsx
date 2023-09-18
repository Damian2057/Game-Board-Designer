import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import IconCircle from '../util/IconCircle';
import './Register.css'
import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {Api} from "../../connector/api";

function Register() {

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const sendRegistrationRequest = () => {
        Api.user.registerUser(username, password, email, phoneNumber).then(response => {
            toast.success('Successfully registered!', { icon: "👋" });
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }).catch(err => {
            if (err.response.data.statusCode === 400) {
                toast.error(`The entered account data is not correct.`, { icon: "💀" })
            } else {
                toast.error(`${err.response.data.message}`, { icon: "💀" })
            }
        });
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
                </Card>

            </Container>
        </div >
    );
}

export default Register;