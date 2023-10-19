import React, {useState} from "react";
import {Api} from "../../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {BsXLg} from "react-icons/bs";
import {Game} from "../../../../model/game/game";
import {Box} from "../../../../model/project/box";
import {ContainerEntity} from "../../../../model/project/containerEntity";
import {ElementEntity} from "../../../../model/project/elementEntity";
import ToggleComponent from "../../ManageEmployees/Modals/ToggleComponent";
import NotesModal from "../../../util/NotesModal";
import {GiNotebook} from "react-icons/gi";
import ImageDisplayModal from "../../../util/ImageDisplayModal";
import {ProjectNewProps} from "../Props/ProjectNewProps";
import NewBoxModal from "./box/NewBoxModal";
import ElementContainerNewListModal from "./conteiner/elem/ElementContainerNewListModal";
import ContainerListAddModal from "./conteiner/cont/ContainerListAddModal";
import {boxIcon, containerIcon, elementIcon, imageIcon} from "../../../util/Icons";
import ChoiceElement from "../../../util/ChoiceElement";

const NewProjectModal: React.FC<ProjectNewProps> = ({ onClose, onSave }) => {

    const [showNotesModal, setShowNotesModal] = useState(false);
    const [box, setBox] = useState<Box | null>(null);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [notes, setNotes] = React.useState([] as string[]);
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
        fetchGames();
    }, []);

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
        Api.project.createProjectTemplate({
            name: name,
            description: description,
            notes: notes,
            isTemplate: false,
            isCompleted: isCompleted,
            games: selectedGames,
            box: box,
            imageIds: imageIds,
            containers: containers,
            elements: elements
        }).then((project) => {
            toast.success(`Project created successfully`, {icon: "👏"});
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

    function handleAddBoxSave(box: Box | null) {
        setBox(box);
        setShowBoxEditModal(false);
    }

    function handleSaveNotes(data: string[] | null) {
        if (!data) {
            return;
        }
        setNotes(data);
    }

    function handleEditElementsSave(elements: ElementEntity[] | null) {
        if (!elements) {
            return;
        }
        setElements(elements)
        setShowElementsEditModal(false);
    }

    function handleEditContainersSave(containers: ContainerEntity[] | null) {
        if (!containers) {
            return;
        }
        setContainers(containers)
        setShowContainersEditModal(false);
    }

    function handleSaveImages(imageIds: number[] | null) {
        if (!imageIds) {
            return;
        }
        setImageIds(imageIds)
        setImageEditModalShow(false);
    }

    return (
        <div className='NewProjectModal'>
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
                        <p className='font-bold fs-2 mb-12'>Add New Project</p>
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
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <ChoiceElement name={"Images"} icon={imageIcon} onClick={handleClick}/>
                                        </div>
                                    </Col>
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <ChoiceElement name={"Box"} icon={boxIcon} onClick={editBox}/>
                                        </div>
                                    </Col>
                                </Col>
                                <Col>
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <ChoiceElement name={"Containers"} icon={containerIcon} onClick={editContainers}/>
                                        </div>
                                    </Col>
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <ChoiceElement name={"Elements"} icon={elementIcon} onClick={editElements}/>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
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
                            >Save Data</Button>
                        </Form>
                    </Card.Body>
                    {showBoxEditModal && (
                        <NewBoxModal
                            onClose={() => setShowBoxEditModal(false)}
                            onSave={handleAddBoxSave}
                            editedBox={box}
                        />
                    )}
                    {showElementsEditModal && (
                        <ElementContainerNewListModal
                            onClose={() => setShowElementsEditModal(false)}
                            onSave={handleEditElementsSave}
                            editedElements={elements}
                            id={null}
                        />
                    )}
                    {showContainersEditModal && (
                        <ContainerListAddModal
                            onClose={() => setShowContainersEditModal(false)}
                            onSave={handleEditContainersSave}
                            editedContainers={containers}
                        />
                    )}
                    <ImageDisplayModal
                        show={imageEditModalShow}
                        onClose={() => setImageEditModalShow(false)}
                        imageIds={imageIds}
                        onSave={handleSaveImages}
                    />
                    <NotesModal
                        show={showNotesModal}
                        notes={notes}
                        onClose={() => setShowNotesModal(false)}
                        onSave={handleSaveNotes}
                    />
                </Card>
            </Container>
        </div>
    )
}

export default NewProjectModal;