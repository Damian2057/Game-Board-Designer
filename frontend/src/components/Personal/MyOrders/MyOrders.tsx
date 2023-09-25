import React from "react";
import toast, {Toaster} from "react-hot-toast";
import NavBar from "../../NavBar/NavBar";
import {Button, Container, Table} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {Order} from "../../../model/order/order";
import {Api} from "../../../connector/api";
import OrderInfo from "./OrderInfo";
import OrderEdit from "./OrderEdit";

function MyOrders() {

    const [orders, setOrders] = React.useState([] as Order[]);

    const [selectedOrderInfo, setSelectedOrderInfo] = React.useState<Order | null>(null);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [editedOrder, setEditedOrder] = React.useState<Order | null>(null);

    React.useEffect(() => {
        Api.order.getMyOrders().then((orders) => {
            setOrders(orders);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }, []);

    const handleOrderInfo = (order: Order) => {
        setSelectedOrderInfo(order);
    };

    const handleEditOrder = (order: Order) => {
        setEditedOrder(order);
        setShowEditModal(true);
    };

    const handleSaveEditedOrder = (editedOrder: Order) => {
        const updatedOrders = orders.map((order) =>
            order.id === editedOrder.id ? editedOrder : order
        );
        setOrders(updatedOrders);
        setEditedOrder(null);
        setShowEditModal(false);
    };

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
                                            <Button className='button-workspace' onClick={() => handleOrderInfo(order)}>Info</Button>
                                        </td>
                                        <td className='centered-td'>
                                            <Button className='button-workspace' onClick={() => handleEditOrder(order)}>Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                                {selectedOrderInfo && (
                                    <OrderInfo
                                        order={selectedOrderInfo}
                                        onClose={() => setSelectedOrderInfo(null)}
                                    />
                                )}
                            </Table>
                            <OrderEdit
                                show={showEditModal}
                                onClose={() => setShowEditModal(false)}
                                onSave={handleSaveEditedOrder}
                                editedOrder={editedOrder}
                            />
                        </Col>
                    </div>
                </Card>
            </Container>

        </div>
    );
}

export default MyOrders;