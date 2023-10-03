import React from 'react'
import {Button, Card, Carousel, Col, Container, Form, Row, Table} from 'react-bootstrap'
import './ManageProjec.css'
import IconCircle from '../../util/IconCircle'
import { BsXLg } from 'react-icons/bs'
import {Toaster} from "react-hot-toast";
import OrderInfoModal from "../Orders/Modals/OrderInfoModal";
import OrderEditModal from "../Orders/Modals/OrderEditModal";
import ReactPaginate from "react-paginate";

export default function ManageProject() {

    const categories = ['Strategy', 'Party', 'Cooperative', 'Eurogames', 'Abstract', 'Family']
    const [category, setCategory] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [images, setImages] = React.useState([]);

    const handleChange = (e: any) => {
        const selectedValue = e.target.value;

        if (!tags.includes(selectedValue)) {
            setCategory(selectedValue);
            setTags(prevTags => [...prevTags, selectedValue]);
        }
    }

    const handleRemoveTag = (tagToRemove: any) => {
        setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };

    const handleImageSelect = (event) => {
        const selectedFiles = event.target.files;
        const imageURLs = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const imageURL = URL.createObjectURL(selectedFiles[i]);
            imageURLs.push(imageURL);
        }

        setImages((prevImages) => [...prevImages, ...imageURLs]);
    };

    return (
        <div className='ManageProject'>
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
                        <Col lg={3} className='mb-4'>
                            <Form.Select className='form-select' aria-label="Category selector" defaultValue={''} onChange={handleWithStatusOrders}>
                                <option disabled value={''}>Choose status</option>
                                {statuses.map(item => {
                                    return (<option key={item} value={item}>{item}</option>)
                                })}
                            </Form.Select>
                        </Col>
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
                                        <th>Worker</th>
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
                                            <td className='centered-td'>{order.worker ? order.worker.username : 'Not claimed'}</td>
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
                                        <OrderInfoModal
                                            order={selectedOrderInfo}
                                            onClose={() => setSelectedOrderInfo(null)}
                                        />
                                    )}
                                    </tbody>
                                </Table>
                                <OrderEditModal
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