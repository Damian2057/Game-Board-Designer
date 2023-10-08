import React, {useState} from "react";
import {Game} from "../../../../../model/game/game";
import {Api} from "../../../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Carousel, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {BoxEditProps} from "../../Props/BoxEditProps";
import {Component} from "../../../../../model/game/component";
import {Tag} from "../../../../../model/game/tag";
import {GrClose} from "react-icons/gr";
import {BsXLg} from "react-icons/bs";
import NewComponentModal from "../../../ManageGames/Modals/NewComponentModal";
import ComponentEditModal from "../../../ManageGames/Modals/ComponentEditModal";
import {Property} from "../../../../../model/project/property";


const BoxEditModal: React.FC<BoxEditProps> = ({ show, onClose, onSave, editedBox }) => {

    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const [editedComponent, setEditedComponent] = useState<Component | null>(null);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [notes, setNotes] = React.useState([] as string[]);
    const [imageIds, setImageIds] = React.useState([] as number[]);
    const [properties, setProperties] = React.useState([] as Property[]);

    React.useEffect(() => {
        if (editedBox) {
            setName(editedBox.name);
            setDescription(editedBox.description);
            setNotes(editedBox.notes);
            setImageIds(editedBox.imageIds);
            setProperties(editedBox.properties);
        }
    }, [editedBox]);

    const handleChange = (e: any) => {
        const name = e.target.value;
        const selectedTag = tags.find(tag => tag.name === name);
        if (!selectedTags.find(tag => tag.name === name)) {
            if (selectedTag) {
                selectedTags.push(selectedTag);
                setSelectedTags(selectedTags);
                fetchTags();
                if (editedGame && selectedTag.id) {
                    Api.game.addTagToGame(editedGame?.id, selectedTag.id).then(() => {
                        toast.success(`Tag added successfully`, {icon: "👏"});
                    }).catch((err) => {
                        toast.error(`${err.response.data.message}`, {icon: "💀"});
                    });
                }
            }
        }
    }

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
        const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    function sendGameCreationRequest() {
        if (!editedGame) {
            return;
        }
        Api.game.updateGame(editedGame.id, {
            title: title,
            description: description,
            price: price,
            publicationDate: publicationDate,
            currency: currency,
            tags: selectedTags,
            components: components,
            imageIds: imageIds
        }).then((game) => {
            toast.success(`Game updated successfully`, {icon: "👏"});
            onSave(game);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function addProp() {
        setAddShowModal(true);
    }

    function handleRemoveProp(prop: Property) {
        if (editedGame && components.includes(component)) {
            Api.game.deleteComponent(component.id)
                .then(() => {
                    toast.success(`Component removed successfully`, { icon: "👏" });
                    setComponents((prevComponents) =>
                        prevComponents.filter((comp) => comp !== component)
                    );
                })
                .catch((err) => {
                    toast.error(`${err.response.data.message}`, { icon: "💀" });
                });
        }
    }

    function handleCloseAddComponentModal() {
        setAddShowModal(false);
    }

    function handleAddNewComponent(component: Component) {
        if (!editedGame) {
            return;
        }
        Api.game.createComponentForGame(editedGame?.id, component).then(() => {
            toast.success(`Component added successfully`, {icon: "👏"});
            setComponents((prevComponents) => [...prevComponents, component]);
            handleCloseAddComponentModal();
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function handleRemoveImage(imageId: number) {
        setImageIds((prevIds) => prevIds.filter((id) => id !== imageId));
        Api.image.deleteImage(imageId).then(() => {
            toast.success(`Image removed successfully`, {icon: "👏"});
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function handleEditProp(prop: Property) {
        setEditedComponent(component);
        setEditShowModal(true);
    }

    function handleEditComponentSave() {
        fetchComponents();
        setEditedComponent(null);
        setEditShowModal(false);
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
                        <p className='font-bold fs-2 mb-12'>Edit Game</p>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Box name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder='Game description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageSelect}
                                        style={{ display: 'none' }}
                                    />
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
                                            <Modal.Title className='fs-2 fw-bold' style={{ flex: 1, marginRight: '1rem' }}>Components</Modal.Title>
                                            <Button
                                                type="button"
                                                onClick={addProp}
                                                style={{
                                                    backgroundColor: '#7D53DE',
                                                    borderColor: '#7D53DE',
                                                    borderRadius: '20px',
                                                    paddingInline: '2rem',
                                                    paddingBlock: '0.5rem'
                                                }}
                                            >+</Button>
                                        </div>
                                    </Col>

                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>Name:</th>
                                            <th>Value:</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {properties.map((prop, index) => (
                                            <tr key={index}>
                                                <td className="tag-cell">
                                                    <div className="tag-content">
                                                        <span>{prop.name}</span>
                                                    </div>
                                                </td>
                                                <td className="tag-cell">
                                                    <div className="tag-content">
                                                        <span>{prop.value}</span>
                                                    </div>
                                                </td>
                                                <td className="tag-cell">
                                                    <div className="tag-content">
                                                        <Button className='button-workspace' onClick={() => handleEditProp(prop)}>Edit</Button>
                                                    </div>
                                                </td>
                                                <td className="tag-cell">
                                                    <div className="tag-content">
                                                        <Button className='button-workspace' onClick={() => handleRemoveProp(prop)}>-</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
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
                    <NewComponentModal
                        show={showAddModal}
                        onClose={handleCloseAddComponentModal}
                        onSave={handleAddNewComponent}
                    />
                    <ComponentEditModal
                        show={showEditModal}
                        onClose={() => setEditShowModal(false)}
                        onSave={handleEditComponentSave}
                        editedComponent={editedComponent ?? null}
                    />
                </Card>
            </Container>
        </div>
    )
}

export default BoxEditModal;