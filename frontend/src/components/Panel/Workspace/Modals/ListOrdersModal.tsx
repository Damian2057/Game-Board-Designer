import React, {useState} from "react";
import {StartNewProjectProps} from "../Props/StartNewProjectProps";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {Order} from "../../../../model/order/order";
import OrderInfoModal from "../../Orders/Modals/OrderInfoModal";
import SelectProjectForOpenModal from "./SelectProjectForOrderModal";
import {Project} from "../../../../model/project/project";
import {t} from "i18next";

const ListOrdersModal: React.FC<StartNewProjectProps> = ({onClose, onSave}) => {

    const [orders, setOrders] = useState([] as Order[]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedOrderInfo, setSelectedOrderInfo] = useState<Order | null>();

    React.useEffect(() => {
        fetchOrders();
    }, []);

    function fetchOrders() {
        Api.order.getOrdersAsWorker().then((res) => {
            const claimedOrders = res.filter((order) => order.status === 'CLAIMED');
            setOrders(claimedOrders);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function handleOrderInfo(order: Order) {
        setSelectedOrderInfo(order);
    }

    function handleStartOrder(order: Order) {
        setSelectedOrder(order);
    }

    function handleSaveProjectOrder(project: Project | null) {
        Api.project.assignOrderToProject(selectedOrder!.id, project!.id, selectedOrder!.game.id).then((res) => {
            toast.success(t('Order assigned to project'), { icon: "👏" });
            setSelectedOrder(null)
            onSave(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    return (
        <div className='ManageProject'>
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <Card.Body>
                        <div className='icon-position' >
                            <a onClick={onClose} >
                                <div className='icon-circle' >
                                    <GrClose />
                                </div>
                            </a>
                        </div>
                        <p className='font-bold fs-2'>{t('Orders')}</p>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>ID</th>
                                        <th>{t('Ordered Game')}</th>
                                        <th>{t('Status')}</th>
                                        <th>{t('Submit Date')}</th>
                                        <th>{t('Last Update')}</th>
                                        <th>{t('Info')}</th>
                                        <th>{t('Start')}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className='centered-td'>{order.id}</td>
                                            <td className='centered-td'>{order.game.title}</td>
                                            <td className='centered-td'>{order.status}</td>
                                            <td className='centered-td'>{order.submittingDate}</td>
                                            <td className='centered-td'>{order.lastUpdate}</td>
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => handleOrderInfo(order)}>{t('Info')}</Button>
                                            </td>
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => handleStartOrder(order)}>{t('Start')}</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>
                    </Card.Body>
                </Card>
                {selectedOrderInfo && (
                    <OrderInfoModal
                        order={selectedOrderInfo}
                        onClose={() => setSelectedOrderInfo(null)}
                    />
                )}
                {selectedOrder && (
                    <SelectProjectForOpenModal
                        game={selectedOrder.game}
                        onSave={handleSaveProjectOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )}
            </Container>
        </div>
    )
}

export default ListOrdersModal;