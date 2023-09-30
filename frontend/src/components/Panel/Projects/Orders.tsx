import React, { useState } from 'react'
import { Button, Card, Col, Container, Table } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';
import IconCircle from '../../util/IconCircle';
import OrderInfo from '../OrderInfo/OrderInfo';

type Props = {}

const Orders = (props: Props) => {

    const initialProjects = [
        { id: 1, name: 'Catan', date: `${new Date().getDay()} - ${new Date().getMonth()} -  ${new Date().getFullYear()}`, status: 'in review', price: 30 },
        { id: 2, name: 'Monopoly', date: `${new Date().getDay() + 7} - ${new Date().getMonth()} -  ${new Date().getFullYear()}`, status: 'in progress', price: 40 }
    ]

    const [projects, setProjects] = useState(initialProjects);
    const [selectedProject, setSelectedProject] = React.useState<any | null>(null);

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