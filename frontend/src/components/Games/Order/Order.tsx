import React from "react";
import { useLocation } from 'react-router-dom';
import { Card, Button, Table, Container, FloatingLabel } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import IconCircle from "../../util/IconCircle";
import './Order.css'

const Order: React.FC = () => {
    const location = useLocation<{ state: { game } }>();
    const { game } = location.state;

    if (!game) {
        return <div>Game not found</div>;
    }

    return (
        <div className="order">
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
                                        <td>{game.name}</td>
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
                                        <Form.Control type='text' placeholder='User'></Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label column sm={10} xs={10} className='order-form-label'>
                                        Last Name
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control type='text' placeholder='Name'></Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label column sm={10} xs={10} className='order-form-label'>
                                        City
                                    </Form.Label>
                                    <Col sm={10} xs={10} className='mx-auto'>
                                        <Form.Control type='text' placeholder='City'></Form.Control>
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
                                            <Form.Control type='text' placeholder='Wolczanska 123'></Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label column sm={10} xs={10} className='order-form-label'>
                                            Phone number
                                        </Form.Label>
                                        <Col sm={10} xs={10} className='mx-auto'>
                                            <Form.Control type='number' placeholder='123123123'></Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={11} sm={10} xs={10} className="mt-4 mx-auto" >
                                    <FloatingLabel controlId="floatingInputGrid" label="Comments">
                                        <Form.Control type="text" placeholder="Leave a comment here" style={{ height: '80' }} />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Col lg={3} className="mt-4 mx-auto">
                                <Button type="submit" className="order-button py-2 px-4">Submit order</Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Order;