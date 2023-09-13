import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import IconCircle from '../util/IconCircle';
import './Login.css'

function Login() {
    return (
        <div className="login">
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
                                        <Form.Control type='e-mail' placeholder="example@mail.com" />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="loginPassword">
                                    <Form.Label column sm={10} xs={10} className='form-label'>
                                        Password
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Col>
                                </Form.Group>
                                <Col lg={10} xs={10} className='mx-auto mb-5'>
                                    <Button type="submit" className='login-button'>Sign In</Button>
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