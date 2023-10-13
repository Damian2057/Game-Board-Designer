import React, {useState} from "react";
import {Api} from "../../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
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

const ProjectEditModal: React.FC<ProjectEditProps> = ({ show, onClose, onSave, editedProject }) => {

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
    }, [editedProject]);

    const fetchGames = () => {
        Api.game.getAllGames().then((res) => {
            setGames(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    const handleGameChange = (e: any) => {
        const name = e.target.value;
        const selectGame = games.find(game => game.title === name);
        if (!selectedGames.find(game => game.title === name)) {
            if (selectGame) {
                selectedGames.push(selectGame);
                setSelectedGames(selectedGames);
                fetchGames();
                // if (editedProject && selectGame.id) {
                //     // Api.game.addTagToGame(editedGame?.id, selectGame.id).then(() => {
                //     //     toast.success(`Tag added successfully`, {icon: "👏"});
                //     // }).catch((err) => {
                //     //     toast.error(`${err.response.data.message}`, {icon: "💀"});
                //     // });
                // }
            }
        }
    }

    const handleRemoveGame = (gameToRemove: any) => {
        setSelectedGames(prevGames => prevGames.filter(game => game !== gameToRemove));
        if (editedProject && gameToRemove.id) {
            // Api.game.removeTagFromGame(editedGame?.id, tagToRemove.id).then(() => {
            //     toast.success(`Tag removed successfully`, {icon: "👏"});
            // }).catch((err) => {
            //     toast.error(`${err.response.data.message}`, {icon: "💀"});
            // });
        }
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles: FileList | null = event.target.files;
        if (selectedFiles) {
            const formData = new FormData();
            for (const element of selectedFiles) {
                formData.append('file', element);
            }
            Api.image.uploadImage(formData)
                .then((images) => {
                    const newImageIds = images.map((image) => image.id);
                    setImageIds((prevIds) => [...prevIds, ...newImageIds]);
                }).catch((err) => {
                toast.error(`${err.response.data.message}`, {icon: '💀'});
            });
        }
    };

    const handleClick = () => {
        setImageEditModalShow(true);
    };

    function sendGameCreationRequest() {
        console.log("Saved");
        // if (!editedGame) {
        //     return;
        // }
        // Api.game.updateGame(editedGame.id, {
        //     title: title,
        //     description: description,
        //     price: price,
        //     publicationDate: publicationDate,
        //     currency: currency,
        //     tags: selectedTags,
        //     components: components,
        //     imageIds: imageIds
        // }).then((game) => {
        //     toast.success(`Game updated successfully`, {icon: "👏"});
        //     onSave(game);
        // }).catch((err) => {
        //     toast.error(`${err.response.data.message}`, {icon: "💀"});
        // });
    }

    function handleRemoveImage(imageId: number) {
        setImageIds((prevIds) => prevIds.filter((id) => id !== imageId));
        Api.image.deleteImage(imageId).then(() => {
            toast.success(`Image removed successfully`, {icon: "👏"});
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function fetchComponents() {
        // if (!editedGame) {
        //     return;
        // }
        // Api.game.getComponentsByGameId(editedGame.id).then((components) => {
        //     setComponents(components);
        // }).catch((err) => {
        //     toast.error(`${err.response.data.message}`, {icon: "💀"});
        // });
    }

    function editBox() {
       setShowBoxEditModal(true);
    }

    function editElemets() {
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
                        <p className='font-bold fs-2 mb-12'>Edit Project</p>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Project name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder='Project description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                                        Notes
                                                    </div>
                                                </div>
                                            </Button>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <div className='flex justify-center items-center'>
                                            <ToggleComponent label="Template: " initialValue={isTemplate}  onChange={setIsTemplate}  labels={['Yes', 'No']}/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <div className='flex justify-center items-center'>
                                            <ToggleComponent label="Completed: " initialValue={isCompleted}  onChange={setIsCompleted}  labels={['Yes', 'No']}/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <Row className='d-flex justify-content-start mt-3'>
                                            <Col lg={4}>
                                                <Form.Select className='form-select ' aria-label="Category selector" defaultValue={''} onChange={handleGameChange}>
                                                    <option disabled value={''}>Choose game</option>
                                                    {games.map(item => {
                                                        return (<option key={item.id} value={item.title}>{item.title}</option>)
                                                    })}
                                                </Form.Select>
                                            </Col>
                                            {Array.isArray(selectedGames) && selectedGames.length > 0 ? (
                                                    selectedGames.map(item => {
                                                        return <Col lg={4} className='tag ps-3' key={item.id}>{item.title}<BsXLg className='' onClick={() => handleRemoveGame(item)} /></Col>
                                                    }))
                                                : (
                                                    <div></div>
                                                )}
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={handleClick}
                                        style={{
                                            backgroundColor: '#7D53DE',
                                            borderColor: '#7D53DE',
                                            borderRadius: '20px',
                                            marginBottom: '1rem',
                                            paddingInline: '2rem',
                                            paddingBlock: '0.5rem',
                                        }}
                                    >Edit images</Button>
                                </Col>
                                <Col>
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Modal.Title className='fs-2 fw-bold' style={{ flex: 1, marginRight: '1rem' }}>Box</Modal.Title>
                                            <Button
                                                type="button"
                                                onClick={editBox}
                                                style={{
                                                    backgroundColor: '#7D53DE',
                                                    borderColor: '#7D53DE',
                                                    borderRadius: '20px',
                                                    paddingInline: '2rem',
                                                    paddingBlock: '0.5rem'
                                                }}
                                            >Edit</Button>
                                        </div>
                                    </Col>
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Modal.Title className='fs-2 fw-bold' style={{ flex: 1, marginRight: '1rem' }}>Containers</Modal.Title>
                                            <Button
                                                type="button"
                                                onClick={editContainers}
                                                style={{
                                                    backgroundColor: '#7D53DE',
                                                    borderColor: '#7D53DE',
                                                    borderRadius: '20px',
                                                    paddingInline: '2rem',
                                                    paddingBlock: '0.5rem'
                                                }}
                                            >Edit</Button>
                                        </div>
                                    </Col>
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Modal.Title className='fs-2 fw-bold' style={{ flex: 1, marginRight: '1rem' }}>Elements</Modal.Title>
                                            <Button
                                                type="button"
                                                onClick={editElemets}
                                                style={{
                                                    backgroundColor: '#7D53DE',
                                                    borderColor: '#7D53DE',
                                                    borderRadius: '20px',
                                                    paddingInline: '2rem',
                                                    paddingBlock: '0.5rem'
                                                }}
                                            >Edit</Button>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                            <Button type="button"
                                    onClick={sendGameCreationRequest}
                                    style={{
                                        backgroundColor: '#7D53DE',
                                        borderColor: '#7D53DE',
                                        borderRadius: '20px',
                                        marginBottom: '1rem',
                                        paddingInline: '2rem',
                                        paddingBlock: '0.5rem'
                                    }}
                            >Save Data</Button>
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