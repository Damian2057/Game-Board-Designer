import React, {useState} from 'react'
import {Button, Card, Col, Container, Form, Table} from 'react-bootstrap'
import './ManageProjec.css'
import IconCircle from '../../util/IconCircle'
import toast, {Toaster} from "react-hot-toast";
import ReactPaginate from "react-paginate";
import {Game} from "../../../model/game/game";
import {User} from "../../../model/user/user";
import {Project} from "../../../model/project/project";
import {Api} from "../../../connector/api";

export default function ManageProject() {

    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(0);
    const [games, setGames] = useState([] as Game[]);
    const [workers, setWorkers] = useState([] as User[]);
    const [projects, setProjects] = useState([] as Project[]);
    const [isTemplate, setIsTemplate] = useState<boolean | null>(null);
    const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
    const [workerId, setWorkerId] = useState<number | null>(null);

    React.useEffect(() => {
        fetchGames();
        fetchWorkers();
        fetchProjects();
    }, []);

    function fetchGames() {
        Api.game.getAllGames().then((res) => {
            setGames(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function fetchWorkers() {
        Api.user.findUser({
            roles: 'admin,employee'
        }).then((res) => {
            setWorkers(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function fetchProjects() {
        Api.project.findProjectPage(1, itemsPerPage, {
            isTemplate: isTemplate,
            isCompleted: isCompleted,
            workerId: workerId
        }).then((res) => {
            setProjects(res.items);
            setPageCount(res.meta.totalPages)
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }


    function handleGameSelect(e: any) {
        const gameTitle = e.target.value;
        console.log(gameTitle);
    }

    function handlePageClick(data: any) {
        Api.project.findProjectPage(data.selected + 1, itemsPerPage, {
            isTemplate: isTemplate,
            isCompleted: isCompleted,
            workerId: workerId
        }).then((res) => {
            setProjects(res.items);
            setPageCount(res.meta.totalPages)
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

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
                        <p className='font-bold fs-2'>Projects</p>
                        <Col lg={3} className='mb-4'>
                            <Form.Select className='form-select' aria-label="Category selector" defaultValue={''} onChange={handleGameSelect}>
                                <option disabled value={''}>Choose Game</option>
                                <option value={'None'}>None</option>
                                {games.map(item => {
                                    return (<option key={item.id} value={item.title}>{item.title}</option>)
                                })}
                            </Form.Select>
                        </Col>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>ID</th>
                                        <th>name</th>
                                        <th>box</th>
                                        <th>containers</th>
                                        <th>elements</th>
                                        <th>isTemplate</th>
                                        <th>isCompleted</th>
                                        <th>Info</th>
                                        <th>Edit</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id}>
                                            <td className='centered-td'>{project.id}</td>
                                            <td className='centered-td'>{project.name}</td>
                                            <td className='centered-td'>{project.box.name}</td>
                                            <td className='centered-td'>{project.containers.length}</td>
                                            <td className='centered-td'>{project.elements.length}</td>
                                            <td className='centered-td'>{project.isTemplate ? 'Yes' : 'No'}</td>
                                            <td className='centered-td'>{project.isCompleted ? 'Yes' : 'No'}</td>
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => {}}>Info</Button>
                                            </td>
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => {}}>Edit</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/*{orders.map((order) => (*/}
                                    {/*    <tr key={order.id}>*/}
                                    {/*        <td className='centered-td'>{order.id}</td>*/}
                                    {/*        <td className='centered-td'>{order.game.title}</td>*/}
                                    {/*        <td className='centered-td'>{order.submittingDate}</td>*/}
                                    {/*        <td className='centered-td'>{order.lastUpdate}</td>*/}
                                    {/*        <td className='centered-td'>{order.status}</td>*/}
                                    {/*        <td className='centered-td'>{order.worker ? order.worker.username : 'Not claimed'}</td>*/}
                                    {/*        <td className='centered-td'>*/}
                                    {/*            <Button className='button-workspace' onClick={() => handleOrderEdit(order)}>Edit</Button>*/}
                                    {/*        </td>*/}
                                    {/*        <td className='centered-td'>*/}
                                    {/*            <Button className='button-workspace' onClick={() => handleOrderInfo(order)}>Info</Button>*/}
                                    {/*        </td>*/}
                                    {/*        <td className='centered-td'>*/}
                                    {/*            <Button className='button-workspace' onClick={() => handleOrderClaim(order)}>Claim</Button>*/}
                                    {/*        </td>*/}
                                    {/*    </tr>*/}
                                    {/*))}*/}
                                    {/*{selectedOrderInfo && (*/}
                                    {/*    <OrderInfoModal*/}
                                    {/*        order={selectedOrderInfo}*/}
                                    {/*        onClose={() => setSelectedOrderInfo(null)}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    </tbody>
                                </Table>
                                {/*<OrderEditModal*/}
                                {/*    name={"order"}*/}
                                {/*    show={showEditModal}*/}
                                {/*    onClose={() => setShowEditModal(false)}*/}
                                {/*    onSave={handleSaveEditedOrder}*/}
                                {/*    editedOrder={editedOrder}*/}
                                {/*/>*/}
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