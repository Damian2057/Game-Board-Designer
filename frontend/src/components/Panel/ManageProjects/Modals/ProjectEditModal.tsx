import React, {useState} from "react";
import {Component} from "../../../../model/game/component";
import {Api} from "../../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Carousel, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {BsXLg} from "react-icons/bs";
import {ProjectEditProps} from "../Props/ProjectEditProps";
import {Project} from "../../../../model/project/project";
import {Game} from "../../../../model/game/game";
import {Box} from "../../../../model/project/box";
import {ContainerEntity} from "../../../../model/project/containerEntity";
import {Element} from "../../../../model/project/element";
import ToggleComponent from "../../ManageEmployees/Modals/ToggleComponent";
import BoxEditModal from "./box/BoxEditModal";
import UploadModal from "../../../util/UploadModal";
import {Image} from "../../../../model/image/image";

const ProjectEditModal: React.FC<ProjectEditProps> = ({ show, onClose, onSave, editedProject }) => {

    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const [editedComponent, setEditedComponent] = useState<Component | null>(null);

    const [uploadModalShow, setUploadModalShow] = useState(false);
    const [editedProj, setEditedProj] = useState<Project>();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [notes, setNotes] = React.useState([] as string[]);
    const [isTemplate, setIsTemplate] = React.useState(false);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [games, setGames] = React.useState([] as Game[]);
    const [selectedGames, setSelectedGames] = React.useState([] as Game[]);
    const [box, setBox] = React.useState({} as Box);
    const [imageIds, setImageIds] = React.useState([] as number[]);
    const [containers, setContainers] = React.useState([] as ContainerEntity[]);
    const [elements, setElements] = React.useState([] as Element[]);

    const [showBoxEditModal, setShowBoxEditModal] = React.useState(false);


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
            setBox(res.box);
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
        setUploadModalShow(true);
    };

    function sendGameCreationRequest() {
        console.log(imageIds);
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

    function addComponent() {
        setAddShowModal(true);
    }

    function handleRemoveComponent(component: Component) {
        // if (editedGame && components.includes(component)) {
        //     Api.game.deleteComponent(component.id)
        //         .then(() => {
        //             toast.success(`Component removed successfully`, { icon: "👏" });
        //             setComponents((prevComponents) =>
        //                 prevComponents.filter((comp) => comp !== component)
        //             );
        //         })
        //         .catch((err) => {
        //             toast.error(`${err.response.data.message}`, { icon: "💀" });
        //         });
        // }
    }

    function handleCloseAddComponentModal() {
        setAddShowModal(false);
    }

    function handleAddNewComponent(component: Component) {
        // if (!editedGame) {
        //     return;
        // }
        // Api.game.createComponentForGame(editedGame?.id, component).then(() => {
        //     toast.success(`Component added successfully`, {icon: "👏"});
        //     setComponents((prevComponents) => [...prevComponents, component]);
        //     handleCloseAddComponentModal();
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

    function handleEditComponent(component: Component) {
        setEditedComponent(component);
        setEditShowModal(true);
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

    function handleEditComponentSave() {
        fetchComponents();
        setEditedComponent(null);
        setEditShowModal(false);
    }

    function editBox() {
       setShowBoxEditModal(true);
    }

    function handleEditBoxSave() {

    }

    function handleUploadImages(data: Image[] | null) {
        if (!data) {
            return;
        }
        const newImageIds = data.map((image) => image.id);
        setImageIds((prevIds) => [...prevIds, ...newImageIds]);
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
                                    {/*<input*/}
                                    {/*    type="file"*/}
                                    {/*    accept="image/*"*/}
                                    {/*    multiple*/}
                                    {/*    onChange={handleImageSelect}*/}
                                    {/*    style={{ display: 'none' }}*/}
                                    {/*/>*/}
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
                                    >Choose images</Button>
                                    <div>
                                        <Carousel data-bs-theme="dark" className="d-flex justify-content-center align-items-center">
                                            {imageIds.map((imageId, index) => (
                                                <Carousel.Item key={index}>
                                                    <img
                                                        src={Api.image.getImageUrl(imageId)}
                                                        alt={`Image ${index}`}
                                                        style={{ width: 'auto', height: 'auto', maxWidth: '200px', maxHeight: '200px' }}
                                                        className="mx-auto d-block"
                                                    />
                                                    <Button className='button-workspace' onClick={() => handleRemoveImage(imageId)}>Remove</Button>
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </div>
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
                                                onClick={addComponent}
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
                                                onClick={addComponent}
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
                    <UploadModal
                        show={uploadModalShow}
                        onClose={() => setUploadModalShow(false)}
                        onSave={handleUploadImages}
                    />
                    {/*<NewComponentModal*/}
                    {/*    show={showAddModal}*/}
                    {/*    onClose={handleCloseAddComponentModal}*/}
                    {/*    onSave={handleAddNewComponent}*/}
                    {/*/>*/}
                    {/*<ComponentEditModal*/}
                    {/*    show={showEditModal}*/}
                    {/*    onClose={() => setEditShowModal(false)}*/}
                    {/*    onSave={handleEditComponentSave}*/}
                    {/*    editedComponent={editedComponent ?? null}*/}
                    {/*/>*/}
                </Card>
            </Container>
        </div>
    )
}

export default ProjectEditModal;