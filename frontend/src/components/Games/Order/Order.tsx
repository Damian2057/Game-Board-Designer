import React, {useState} from "react";
import { useLocation } from 'react-router-dom';
import { Card, Button, Table, Container, FloatingLabel } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import IconCircle from "../../util/IconCircle";
import './Order.css'
import {Api} from "../../../connector/api";
import toast, {Toaster} from "react-hot-toast";

const Order: React.FC = () => {
    const location = useLocation();

    const { game } = location.state;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');

    if (!game) {
        return <div>Game not found</div>;
    }

    const sendOrderRequest = () => {
        Api.order.submitOrder(firstName, lastName, city, address, phoneNumber, comment, game.id, email).then(() => {
            toast.success('Successfully ordered!', { icon: "👋" });
        }).catch(err => {
            if (err.response.data.statusCode === 400) {
                toast.error(`The entered order data is not correct.`, { icon: "💀" })
            } else {
                toast.error(`${err.response.data.message}`, { icon: "💀" })
            }
        });
    };

    return (
        <div className="order">
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <IconCircle path={'/games'} />
                    <h1 className="fw-bold m-0">Order</h1>
                    <Card.Body>
                        <Col lg={11} className="mx-auto">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>COUNT</th>
                                        <th>PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{game.title}</td>
                                        <td>1</td>
                                        <td>${game.price}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>

                        <Form>
                            <Row className='names-row mx-lg-3 mx-md-1 mx-sm-0'>
                                <Form.Group as={Col} >
                                    <Form.Label column sm={10} xs={10} className='order-form-label'>
                                        First Name
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control
                                            type='text'
                                            placeholder='firstname'
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label column sm={10} xs={10} className='order-form-label'>
                                        Last Name
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control
                                            type='text'
                                            placeholder='lastname'
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label column sm={10} xs={10} className='order-form-label'>
                                        City
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control
                                            type='text'
                                            placeholder='City'
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Row className='names-row mx-lg-0 mx-md-0 mx-sm-0'>
                                <Col>
                                    <Form.Group>
                                        <Form.Label column sm={10} xs={10} className='order-form-label'>
                                            Address
                                        </Form.Label>
                                        <Col sm={10} xs={10} className='mx-auto'>
                                            <Form.Control
                                                type='text'
                                                placeholder='address'
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label column sm={10} xs={10} className='order-form-label'>
                                            Phone number
                                        </Form.Label>
                                        <Col sm={10} xs={10} className='mx-auto'>
                                            <Form.Control
                                                type='tel'
                                                placeholder='999 999 999'
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label column sm={10} xs={10} className='order-form-label'>
                                            Email
                                        </Form.Label>
                                        <Col sm={10} xs={10} className='mx-auto'>
                                            <Form.Control
                                                type='text'
                                                placeholder='yourEmail@domain.com'
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={11} sm={10} xs={10} className="mt-4 mx-auto" >
                                    <FloatingLabel controlId="floatingInputGrid" label="Comments">
                                        <Form.Control
                                            type="text"
                                            placeholder="Leave a comment here"
                                            style={{ height: '80' }}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Col lg={3} className="mt-4 mx-auto">
                                <Button type="button" className="order-button py-2 px-4" onClick={sendOrderRequest}>Submit order</Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Order;