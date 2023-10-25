import React, {useState} from "react";
import {Project} from "../../../../model/project/project";
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import ReactPaginate from "react-paginate";
import ProjectInfoModal from "../../ManageProjects/Modals/ProjectInfoModal";
import {SelectProjectProps} from "../Props/SelectProjectProps";
import {t} from "i18next";

const SelectProjectForOpenModal: React.FC<SelectProjectProps> = ({onClose, game, onSave}) => {

    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(0);
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [projects, setProjects] = useState([] as Project[]);
    const [selectedProjectInfo, setSelectedProjectInfo] = useState<Project | null>();

    React.useEffect(() => {
        setSelectedGame(game.title);
        fetchProjectParams(game.title);
    }, []);


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
        onSave(project);
        onClose();
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
                        <p className='font-bold fs-2'>{t('Select Project')}</p>
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

export default SelectProjectForOpenModal;