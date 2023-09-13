import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import IconCircle from '../util/IconCircle';
import './Register.css'

function Register() {
    return (
        <div className="register">
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
                                        <Form.Control type='text' placeholder='Username'></Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} controlId="registerPhoneNumber" >
                                    <Form.Label column sm={10} xs={10} className='form-label'>
                                        Phone number
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control type='number' placeholder='123123123'></Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="registerEmail">
                                    <Form.Label column sm={10} xs={10} className='form-label'>
                                        Email
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control type='e-mail' placeholder="example@mail.com" />
                                    </Col>
                                </Form.Group>

                                <Form.Group controlId="registerPassword">
                                    <Form.Label column sm={10} xs={10} className='form-label'>
                                        Password
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Col>
                                </Form.Group>
                                <Col lg={10} xs={10} className='mx-auto mb-5'>
                                    <Button type="submit" className='register-button'>Sign Up</Button>
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