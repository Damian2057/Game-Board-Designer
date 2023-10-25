import React, {useState} from "react";
import {Game} from "../../../../model/game/game";
import {Project} from "../../../../model/project/project";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Form, Table} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ProjectInfoModal from "../../ManageProjects/Modals/ProjectInfoModal";
import {StartNewProjectProps} from "../Props/StartNewProjectProps";
import {GrClose} from "react-icons/gr";
import {t} from "i18next";

const ListProjectsModal: React.FC<StartNewProjectProps> = ({onClose, onSave}) => {

    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(0);
    const [games, setGames] = useState([] as Game[]);
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [projects, setProjects] = useState([] as Project[]);
    const [selectedProjectInfo, setSelectedProjectInfo] = useState<Project | null>();

    React.useEffect(() => {
        fetchGames();
    }, []);

    function fetchGames() {
        Api.game.getAllGames().then((res) => {
            setGames(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function fetchProjectParams(selectedGame: string | null) {
        Api.project.findProjectPage(1, itemsPerPage, {
            isTemplate: true,
            game: selectedGame
        }).then((res) => {
            setProjects(res.items);
            setPageCount(res.meta.totalPages)
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function handleGameSelect(e: any) {
        const gameTitle = e.target.value;
        if (gameTitle == 'None') {
            fetchProjectParams(null);
        } else {
            setSelectedGame(gameTitle);
            fetchProjectParams(gameTitle);
        }
    }

    function handlePageClick(data: any) {
        Api.project.findProjectPage(data.selected + 1, itemsPerPage, {
            game: selectedGame,
            isTemplate: true,
        }).then((res) => {
            setProjects(res.items);
            setPageCount(res.meta.totalPages)
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function handleProjectInfo(project: Project) {
        setSelectedProjectInfo(project)
    }

    function handleStartProject(project: Project) {
        const gameId = games.find(item => item.title == selectedGame)?.id;
        if (!gameId) {
            toast.error(t('Game not found'), { icon: "💀" });
            return;
        }
        Api.project.startProject(project.id, gameId).then((res) => {
            onSave(res);
            onClose();
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
                        <p className='font-bold fs-2'>{t('Projects')}</p>
                        <Col lg={3} className='mb-4 d-flex justify-content-center align-items-center'>
                            <div>
                                <Form.Select className='form-select' aria-label="Category selector" defaultValue={''} onChange={handleGameSelect}>
                                    <option disabled value={''}>{t('Choose Game')}</option>
                                    <option value={'None'}>{t('None')}</option>
                                    {games.map(item => {
                                        return (<option key={item.id} value={item.title}>{item.title}</option>)
                                    })}
                                </Form.Select>
                            </div>
                        </Col>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>ID</th>
                                        <th>{t('Name')}</th>
                                        <th>{t('box')}</th>
                                        <th>{t('Containers')}</th>
                                        <th>{t('Elements')}</th>
                                        <th>{t('Info')}</th>
                                        <th>{t('Start')}</th>
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
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => handleProjectInfo(project)}>{t('Info')}</Button>
                                            </td>
                                            <td className='centered-td'>
                                                <Button className='button-workspace' onClick={() => handleStartProject(project)}>{t('Start')}</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>
                        <ReactPaginate
                            previousLabel={t('previous')}
                            nextLabel={t('next')}
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
                {selectedProjectInfo && (
                    <ProjectInfoModal
                        project={selectedProjectInfo}
                        onClose={() => setSelectedProjectInfo(null)}
                    />
                )}
            </Container>
        </div>
    )
}

export default ListProjectsModal;