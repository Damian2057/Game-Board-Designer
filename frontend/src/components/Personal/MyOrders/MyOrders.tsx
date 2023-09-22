import React from "react";
import toast, {Toaster} from "react-hot-toast";
import NavBar from "../../NavBar/NavBar";
import {Button, Container, Table} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {Order} from "../../../model/order/order";
import {Api} from "../../../connector/api";

function MyOrders() {

    const [orders, setOrders] = React.useState([] as Order[]);

    React.useEffect(() => {
        Api.order.getMyOrders().then((orders) => {
            setOrders(orders);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }, []);

    return (
        <div className="MyOrders">
            <NavBar />
            <Toaster />
            <Container className='mt-5'>
                <Card className='shadow border-white'>
                    <p className='font-bold fs-2'>Orders</p>
                    <div className="table-responsive">
                        <Col lg={11} className="mx-auto">
                            <Table striped bordered hover>
                                <thead>
                                <tr className='uppercase'>
                                    <th>Ordered game</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                    <th>Edit</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className='centered-td'>{order.game?.title}</td>
                                        <td className='centered-td'>{order.status}</td>
                                        <td className='centered-td'>
                                            <Button className='button-workspace' onClick={() => {}}>Info</Button>
                                        </td>
                                        <td className='centered-td'>
                                            <Button className='button-workspace' onClick={() => {}}>Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Col>
                    </div>
                </Card>
            </Container>

        </div>
    );
}

export default MyOrders;