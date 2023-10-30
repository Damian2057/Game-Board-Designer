import React, {useState} from "react";
import {Api} from "../../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {BsXLg} from "react-icons/bs";
import {ProjectEditProps} from "../Props/ProjectEditProps";
import {Project} from "../../../../model/project/project";
import {Game} from "../../../../model/game/game";
import {Box} from "../../../../model/project/box";
import {ContainerEntity} from "../../../../model/project/containerEntity";
import {ElementEntity} from "../../../../model/project/elementEntity";
import ToggleComponent from "../../ManageEmployees/Modals/ToggleComponent";
import BoxEditModal from "./box/BoxEditModal";
import NotesModal from "../../../util/NotesModal";
import {GiNotebook} from "react-icons/gi";
import ElementListEditModal from "./element/ElementListEditModal";
import ImageDisplayModal from "../../../util/ImageDisplayModal";
import ContainerListEditModal from "./conteiner/ContainerListEditModal";
import {FaUserAstronaut} from "react-icons/fa";
import CustomSelect from "../../Orders/Modals/CustomSelect";
import {User} from "../../../../model/user/user";
import {boxIcon, containerIcon, elementIcon, imageIcon} from "../../../util/Icons";
import ChoiceElement from "../../../util/ChoiceElement";
import {t} from "i18next";

const ProjectEditModal: React.FC<ProjectEditProps> = ({ onClose, onSave, editedProject }) => {

    const [showNotesModal, setShowNotesModal] = useState(false);
    const [editedProj, setEditedProj] = useState<Project>();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [notes, setNotes] = React.useState([] as string[]);
    const [isTemplate, setIsTemplate] = React.useState(false);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [games, setGames] = React.useState([] as Game[]);
    const [selectedGames, setSelectedGames] = React.useState([] as Game[]);
    const [imageIds, setImageIds] = React.useState([] as number[]);
    const [containers, setContainers] = React.useState([] as ContainerEntity[]);
    const [elements, setElements] = React.useState([] as ElementEntity[]);
    const [worker, setWorker] = React.useState<User | null>();
    const [employees, setEmployees] = React.useState([] as User[]);
    const [showBoxEditModal, setShowBoxEditModal] = React.useState(false);
    const [showElementsEditModal, setShowElementsEditModal] = React.useState(false);
    const [showContainersEditModal, setShowContainersEditModal] = React.useState(false);
    const [imageEditModalShow, setImageEditModalShow] = React.useState(false);


    React.useEffect(() => {
        if (!editedProject) {
            return;
        }
        Api.project.getProject(editedProject.id).then((res) => {
            setEditedProj(res);
            setName(res.name);
            setDescription(res.description);
            setNotes(res.notes);
            setIsTemplate(res.isTemplate);
            setIsCompleted(res.isCompleted);
            setSelectedGames(res.games);
            setImageIds(res.imageIds);
            setContainers(res.containers);
            setElements(res.elements);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
        fetchGames();
        fetchEmployees();
    }, [editedProject]);

    const fetchGames = () => {
        Api.game.getAllGames().then((res) => {
            setGames(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    const fetchEmployees = () => {
        Api.user.findUser({
            roles: 'admin,employee'
        }).then(res => {
            setEmployees(res);
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        })
    }

    const handleGameChange = (e: any) => {
        const name = e.target.value;
        const selectGame = games.find(game => game.title === name);
        if (!selectedGames.find(game => game.title === name)) {
            if (selectGame) {
                selectedGames.push(selectGame);
                setSelectedGames(selectedGames);
                fetchGames();
            }
        }
    }

    const handleRemoveGame = (gameToRemove: any) => {
        setSelectedGames(prevGames => prevGames.filter(game => game !== gameToRemove));
    }

    const handleClick = () => {
        setImageEditModalShow(true);
    };

    function sendProjectEditRequest() {
        if (!editedProject) {
            return;
        }
        Api.project.updateProject(editedProject.id, {
            name: name,
            description: description,
            notes: notes,
            isTemplate: isTemplate,
            isCompleted: isCompleted,
            games: selectedGames,
            imageIds: imageIds,
            containers: containers,
            elements: elements
        }).then((project) => {
            toast.success(t("Project updated successfully"), {icon: "👏"});
            onSave(project);
            onClose();
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function editBox() {
       setShowBoxEditModal(true);
    }

    function editElements() {
        setShowElementsEditModal(true);
    }

    function editContainers() {
        setShowContainersEditModal(true);
    }

    function handleEditBoxSave(box: Box | null) {
        if (!editedProj) {
            return;
        }

        if (box !== null) {
            editedProj.box = box;
        }

        setShowBoxEditModal(false);
    }

    function handleSaveNotes(data: string[] | null) {
        if (!data) {
            return;
        }
        setNotes(data);
    }

    function handleEditElementsSave(elements: ElementEntity[] | null) {
        if (!editedProj) {
            return;
        }
        if (elements !== null) {
            editedProj.elements = elements;
        }
        setShowElementsEditModal(false);
    }

    function handleEditContainersSave(containers: ContainerEntity[] | null) {
        if (!editedProj) {
            return;
        }
        if (containers !== null) {
            editedProj.containers = containers;
        }
        setShowContainersEditModal(false);
    }

    function handleSaveImages(imageIds: number[] | null) {
        if (!editedProj) {
            return;
        }
        if (!imageIds) {
            return;
        }
        editedProj.imageIds = imageIds;
        setImageEditModalShow(false);
    }

    function handleWorkerChange(e: React.ChangeEvent<{ value: unknown }>) {
        const name = e.target.value;
        if (name == 'None') {
            return;
        }
        const worker = employees.find(user => user.email === name);
        if (worker) {
            setWorker(worker);
            Api.project.assignProjectToUser(editedProject!.id, worker.id).then((res) => {
                toast.success(t("Project assigned successfully"), {icon: "👏"});
            }).catch((err) => {
                toast.error(`${err.response.data.message}`, {icon: "💀"});
            });
        }
    }

    return (
        <div className='NewGameModal'>
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%'
                }}>
                    <Card.Body>
                        <div className='icon-position' >
                            <a onClick={onClose} >
                                <div className='icon-circle' >
                                    <GrClose />
                                </div>
                            </a>
                        </div>
                        <p className='font-bold fs-2 mb-12'>{t("Edit Project")}</p>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-4'>
                                        <Form.Control
                                            type='text'
                                            placeholder={t("Project name")}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            rows={6}
                                            placeholder={t("Project description")}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className="flex flex-row gap-4 items-center mb-2">
                                        <Form.Group>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1em' }}>
                                                <Button
                                                    type="button"
                                                    onClick={() => setShowNotesModal(true)}
                                                    style={{
                                                        backgroundColor: '#7D53DE',
                                                        borderColor: '#7D53DE',
                                                        borderRadius: '20px',
                                                        paddingInline: '2rem',
                                                        paddingBlock: '0.5rem'
                                                    }}>
                                                    <div className='flex flex-row gap-2 items-center'>
                                                        <div>
                                                            <GiNotebook size={30} />
                                                        </div>
                                                        <div>
                                                            {t("Notes")}
                                                        </div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </Form.Group>
                                        <div className="flex gap-2 justify-center items-center">
                                            <Form.Group>
                                                <ToggleComponent label={t("Completed")} initialValue={isCompleted}  onChange={setIsCompleted}  labels={[t("Yes"), t("No")]}/>
                                            </Form.Group>
                                        </div>
                                        <div className="flex gap-2 justify-center items-center">
                                            <Form.Group>
                                                <ToggleComponent label={t("Template")} initialValue={isTemplate}  onChange={setIsTemplate}  labels={[t("Yes"), t("No")]}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <Col xs={12} className="mb-2">
                                        <div className="flex justify-end items-center">
                                            <ChoiceElement name={t("Images")} icon={imageIcon} onClick={handleClick}/>
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="flex justify-end items-center">
                                            <ChoiceElement name={t("box")} icon={boxIcon} onClick={editBox}/>
                                        </div>
                                    </Col>
                                </Col>
                                <Col>
                                    <Col xs={12} className="mb-2">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <ChoiceElement name={t("Containers")} icon={containerIcon} onClick={editContainers}/>
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <ChoiceElement name={t("Elements")} icon={elementIcon} onClick={editElements}/>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                            <Row className='d-flex justify-content-start mt-2'>
                                <Col lg={4} className="mb-4">
                                    <div>
                                        <Form.Label className='fw-bold'>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <div>
                                                    <FaUserAstronaut size={30} />
                                                </div>
                                                <div>
                                                    {t("Assigned to")}:
                                                </div>
                                            </div>
                                        </Form.Label>
                                        <CustomSelect
                                            value={worker ? worker.email : t("None")}
                                            onChange={(e) => handleWorkerChange(e)}
                                            employees={employees}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Form.Group className='mt-2'>
                                <Row className='d-flex justify-content-start mt-2'>
                                    <Col lg={4} className="mb-4">
                                        <Form.Select className='form-select ' aria-label="Category selector" defaultValue={''} onChange={handleGameChange}>
                                            <option disabled value={''}>{t("Choose Game")}</option>
                                            {games.map(item => {
                                                return (<option key={item.id} value={item.title}>{item.title}</option>)
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Row lg={12}>
                                        {Array.isArray(selectedGames) && selectedGames.length > 0 ? (
                                                selectedGames.map(item => {
                                                    return <Col lg={3} className='tag ml-2 ps-3' key={item.id}>{item.title}<BsXLg className='' onClick={() => handleRemoveGame(item)} /></Col>
                                                }))
                                            : (
                                                <div></div>
                                            )}
                                    </Row>
                                </Row>
                            </Form.Group>
                            <Button type="button"
                                    onClick={sendProjectEditRequest}
                                    style={{
                                        backgroundColor: '#7D53DE',
                                        borderColor: '#7D53DE',
                                        borderRadius: '20px',
                                        marginBottom: '1rem',
                                        paddingInline: '2rem',
                                        paddingBlock: '0.5rem'
                                    }}
                            >{t("Save Data")}</Button>
                        </Form>
                    </Card.Body>
                    {showBoxEditModal && (
                        <BoxEditModal
                            onClose={() => setShowBoxEditModal(false)}
                            onSave={handleEditBoxSave}
                            editedBox={editedProj?.box ?? null}
                        />
                    )}
                    {showElementsEditModal && (
                        <ElementListEditModal
                            onClose={() => setShowElementsEditModal(false)}
                            onSave={handleEditElementsSave}
                            editedElements={editedProj?.elements ?? null}
                            id={editedProj?.id ?? null}
                        />
                    )}
                    {showContainersEditModal && (
                        <ContainerListEditModal
                            onClose={() => setShowContainersEditModal(false)}
                            onSave={handleEditContainersSave}
                            editedContainers={editedProj?.containers ?? null}
                            id={editedProj?.id ?? null}
                        />
                    )}
                    <ImageDisplayModal
                        show={imageEditModalShow}
                        onClose={() => setImageEditModalShow(false)}
                        imageIds={editedProj?.imageIds ?? null}
                        onSave={handleSaveImages}
                    />
                    <NotesModal
                        show={showNotesModal}
                        notes={editedProj?.notes ?? null}
                        onClose={() => setShowNotesModal(false)}
                        onSave={handleSaveNotes}
                    />
                </Card>
            </Container>
        </div>
    )
}

export default ProjectEditModal;