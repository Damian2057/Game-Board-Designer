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
import ToggleComponent from "../ManageEmployees/Modals/ToggleComponent";

export default function ManageProject() {

    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(0);
    const [games, setGames] = useState([] as Game[]);
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [workers, setWorkers] = useState([] as User[]);
    const [projects, setProjects] = useState([] as Project[]);
    const [isTemplate, setIsTemplate] = useState<boolean | null>(null);
    const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
    const [workerId, setWorkerId] = useState<number | null>(null);

    React.useEffect(() => {
        fetchProjectParams(isTemplate, isCompleted, workerId, selectedGame);
        fetchGames();
        fetchWorkers();
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

    function fetchProjectParams(isTemplate: boolean | null, isCompleted: boolean | null, workerId: number | null, selectedGame: string | null) {
        Api.project.findProjectPage(1, itemsPerPage, {
            isTemplate: isTemplate,
            isCompleted: isCompleted,
            workerId: workerId,
            game: selectedGame
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
        if (gameTitle == 'None') {
            fetchProjectParams(isTemplate, isCompleted, workerId, null);
            return;
        }
        setSelectedGame(gameTitle);
        fetchProjectParams(isTemplate, isCompleted, workerId, gameTitle);
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

    function handleTemplateStatusSelect(e: any) {
        const status = e.target.value;
        const flag = status == 'Yes' ? true : false;
        setIsTemplate(flag);
        fetchProjectParams(flag, isCompleted, workerId, selectedGame);
    }

    function handleCompleteStatusSelect(e: any) {
        const status = e.target.value;
        const flag = status == 'Yes' ? true : false;
        setIsCompleted(flag);
        fetchProjectParams(isTemplate, flag, workerId, selectedGame);
    }

    function handleWorkerSelect(e: any) {
        const email = e.target.value;
        if (email == 'None') {
            fetchProjectParams(isTemplate, isCompleted, null, selectedGame);
            return;
        }
        const worker = workers.find(item => item.email == email);
        if (!worker) {
            toast.error(`Worker not found`, { icon: "💀" });
            return;
        }
        setWorkerId(worker?.id);
        fetchProjectParams(isTemplate, isCompleted, worker?.id, selectedGame);
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
                        <Col lg={3} className='mb-4 d-flex justify-content-center align-items-center'>
                            <div>
                                <Form.Select className='form-select' aria-label="Category selector" defaultValue={''} onChange={handleGameSelect}>
                                    <option disabled value={''}>Choose Game</option>
                                    <option value={'None'}>None</option>
                                    {games.map(item => {
                                        return (<option key={item.id} value={item.title}>{item.title}</option>)
                                    })}
                                </Form.Select>
                                <Form.Select className='form-select' aria-label="Worker selector" defaultValue={''} onChange={handleWorkerSelect}>
                                    <option disabled value={''}>Choose Worker</option>
                                    <option value={'None'}>None</option>
                                    {workers.map(item => {
                                        return (<option key={item.id} value={item.email}>{item.email}</option>)
                                    })}
                                </Form.Select>
                                <Form.Select className='form-select' aria-label="Template" defaultValue={''} onChange={handleTemplateStatusSelect}>
                                    <option disabled value={''}>Choose Template Status</option>
                                    <option value={'Yes'}>Yes</option>
                                    <option value={'No'}>No</option>
                                </Form.Select>
                                <Form.Select className='form-select' aria-label="Complete" defaultValue={''} onChange={handleCompleteStatusSelect}>
                                    <option disabled value={''}>Choose Complete Status</option>
                                    <option value={'Yes'}>Yes</option>
                                    <option value={'No'}>No</option>
                                </Form.Select>
                            </div>
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
                                        <th>Template</th>
                                        <th>Completed</th>
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
                                    </tbody>
                                </Table>
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