import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Table } from 'react-bootstrap'
import IconCircle from '../../util/IconCircle'
import toast, { Toaster } from 'react-hot-toast';
import './Workspace.css'
import OrderInfo from '../OrderInfo/OrderInfo';

function Workspace() {

    const initialOrders = [
        { id: 1, name: 'Catan', date: `${new Date().getDay()} - ${new Date().getMonth()} -  ${new Date().getFullYear()}`, status: 'in review', price: 30 },
        { id: 2, name: 'Monopoly', date: `${new Date().getDay() + 7} - ${new Date().getMonth()} -  ${new Date().getFullYear()}`, status: 'in progress', price: 40 }
    ]

    const [orders, setOrders] = useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = React.useState<any | null>(null);

    const handleOrderInfo = (order: any) => {
        setSelectedOrder(order);
    };

    const handleRemoveOrder = (idToRemove: any) => {
        const updatedOrders = orders.filter(order => order.id !== idToRemove);
        setOrders(updatedOrders);
        toast.success('Order removed', { icon: "💀" })
    };

    return (
        <div className='workspace'>
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <Card.Body>
                        <IconCircle path={'/panel/admin'}></IconCircle>
                        <p className='font-bold fs-2'>Workspace</p>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr className='uppercase'>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Details</th>
                                            <th>Status</th>
                                            <th>Continue work</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td className='centered-td'>{order.name}</td>
                                                <td className='centered-td'>{order.date}</td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleOrderInfo(order)}>Info</Button>
                                                </td>
                                                <td className='centered-td'>{order.status}</td>
                                                <td>
                                                    <Button href='/panel/workspace/board' className='button-workspace'>Continue</Button>
                                                </td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleRemoveOrder(order.id)}>Decline</Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {selectedOrder && (
                                            <OrderInfo
                                                order={selectedOrder}
                                                onClose={() => setSelectedOrder(null)}
                                            />
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Workspace