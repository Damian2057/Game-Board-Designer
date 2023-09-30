import React, { useState } from 'react'
import { Button, Card, Col, Container, Table } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';
import IconCircle from '../../util/IconCircle';
import OrderInfo from '../OrderInfo/OrderInfo';
import {Api} from "../../../connector/api";
import {Order} from "../../../model/order/order";

type Props = {}

const Orders = (props: Props) => {

    const itemsPerPage = 8;

    const [orders, setOrders] = useState([] as Order[]);
    const [pageCount, setPageCount] = useState(0);
    const [selectedOrderInfo, setSelectedOrderInfo] = React.useState<Order | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedOrder, setEditedOrder] = useState<Order | null>(null);

    const initialProjects = [
        { id: 1, name: 'Catan', date: `${new Date().getDay()} - ${new Date().getMonth()} -  ${new Date().getFullYear()}`, status: 'in review', price: 30 },
        { id: 2, name: 'Monopoly', date: `${new Date().getDay() + 7} - ${new Date().getMonth()} -  ${new Date().getFullYear()}`, status: 'in progress', price: 40 }
    ]

    const [projects, setProjects] = useState(initialProjects);
    const [selectedProject, setSelectedProject] = React.useState<any | null>(null);

    React.useEffect(() => {
        // Api.order.findOrderPage(1, 10, {
        //     status: 'PENDING'
        // }).then((res) => {
        //     setProjects(res.items);
        //     window.scrollTo(0, 0);
        // }).catch((err) => {
        //     toast.error(`${err.response.data.message}`, { icon: "💀" });
        // });
    }, []);



    const handleProjectInfo = (order: any) => {
        setSelectedProject(order);
    };

    const handleClaimProject = (idToClaim: any) => {
        const updatedProjects = projects.filter(order => order.id !== idToClaim);
        setProjects(updatedProjects);
        toast.success(`Project with id ${idToClaim} was claimed!`, { icon: "🎉" })
    }

    return (
        <div className='projects' style={{ backgroundColor: '#7D53DE', height: '100vh' }}>
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
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Details</th>
                                            <th>Claim</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((project) => (
                                            <tr key={project.id}>
                                                <td className='centered-td'>{project.name}</td>
                                                <td className='centered-td'>{project.date}</td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleProjectInfo(project)}>Info</Button>
                                                </td>

                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleClaimProject(project.id)}>Claim</Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {selectedProject && (
                                            <OrderInfo
                                                order={selectedProject}
                                                onClose={() => setSelectedProject(null)}
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

export default Orders