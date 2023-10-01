import React, { useState } from 'react'
import { Button, Card, Col, Container, Table } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';
import IconCircle from '../../util/IconCircle';
import OrderInfo from './Modals/OrderInfo';
import {Api} from "../../../connector/api";
import {Order} from "../../../model/order/order";
import ReactPaginate from "react-paginate";
import OrderEdit from "./Modals/OrderEdit";

export default function Orders() {

    const itemsPerPage = 8;

    const [orders, setOrders] = useState([] as Order[]);
    const [pageCount, setPageCount] = useState(0);
    const [selectedOrderInfo, setSelectedOrderInfo] = React.useState<Order | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedOrder, setEditedOrder] = useState<Order | null>(null);

    React.useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = ()=> {
        Api.order.findOrderPage(1, itemsPerPage, {
            status: 'PENDING'
        }).then((res) => {
            setOrders(res.items);
            setPageCount(res.meta.totalPages)
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    const handlePageClick = (data: any) => {
        Api.order.findOrderPage(data.selected + 1, itemsPerPage, {
            status: 'PENDING'
        }).then((res) => {
            setOrders(res.items);
            setPageCount(res.meta.totalPages)
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function handleOrderClaim(order: Order) {
        
    }

    function handleOrderEdit(order: Order) {
        setEditedOrder(order);
        setShowEditModal(true);
    }

    function handleOrderInfo(order: Order) {
        setSelectedOrderInfo(order)
    }

    function handleSaveEditedOrder() {

    }

    return (
        <div className='Orders' style={{ backgroundColor: '#7D53DE', height: '100vh' }}>
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
                        <IconCircle path={'/panel/admin'} />
                        <p className='font-bold fs-2'>Orders</p>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr className='uppercase'>
                                            <th>ID</th>
                                            <th>Ordered game</th>
                                            <th>Submit Date</th>
                                            <th>Last Update</th>
                                            <th>Status</th>
                                            <th>Edit</th>
                                            <th>Info</th>
                                            <th>Claim</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className='centered-td'>{order.id}</td>
                                            <td className='centered-td'>{order.game.title}</td>
                                            <td className='centered-td'>{order.submittingDate}</td>
                                            <td className='centered-td'>{order.lastUpdate}</td>
                                            <td className='centered-td'>{order.status}</td>
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => handleOrderEdit(order)}>Edit</Button>
                                            </td>
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => handleOrderInfo(order)}>Info</Button>
                                            </td>
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => handleOrderClaim(order)}>Claim</Button>
                                            </td>
                                        </tr>
                                    ))}
                                        {selectedOrderInfo && (
                                            <OrderInfo
                                                order={selectedOrderInfo}
                                                onClose={() => setSelectedOrderInfo(null)}
                                            />
                                        )}
                                    </tbody>
                                </Table>
                                <OrderEdit
                                    name={"order"}
                                    show={showEditModal}
                                    onClose={() => setShowEditModal(false)}
                                    onSave={handleSaveEditedOrder}
                                    editedOrder={editedOrder}
                                />
                            </Col>
                        </div>
                        <ReactPaginate
                            previousLabel="previous"
                            nextLabel="next"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={pageCount}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                        />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}