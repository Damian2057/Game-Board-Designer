import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import IconCircle from '../util/IconCircle';
import './Login.css'
import {Api} from "../../connector/api";
import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendLoginRequest = () => {
        Api.auth.login(email, password).then(response => {
            Api.auth.setAuthToken(response.token);
            Api.auth.setRefreshToken(response.refresh);
            Api.auth.setUser(response.user);
            toast.success(`Welcome back, ${response.user?.username}!`, { icon: "👋" });
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        })
    };

    return (
        <div className="login">
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%'
                }}>
                    <IconCircle path={'/'} />
                    <Row className='login-card-content'>
                        <Col lg={6} sm={12}>
                            <Card.Title className='login-title'>Sign In</Card.Title>
                            <span className='new-user'>New user? <a className='redirect' href='/register'>Create an account</a></span>
                            <Form>
                                <Form.Group controlId="loginEmail">
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
                                <Form.Group controlId="loginPassword">
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
                                    <Button type="button" className='login-button' onClick={sendLoginRequest}>
                                        Sign In
                                    </Button>
                                </Col>
                            </Form>
                        </Col>
                        <Col lg={6} md={6} sm={8}>
                            <img className='image' src="/src/assets/undraw_login.svg" alt="Undraw Login" />
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
}

export default Login;