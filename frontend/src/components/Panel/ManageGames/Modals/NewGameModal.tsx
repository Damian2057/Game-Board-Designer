import React, {useState} from "react";
import {Button, Card, Carousel, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {BsXLg} from "react-icons/bs";
import {NewGameModalProps} from "../Props/NewGameModalProps";
import {GrClose} from "react-icons/gr";
import {Tag} from "../../../../model/game/tag";
import {Api} from "../../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Component} from "../../../../model/game/component";
import NewComponentModal from "./NewComponentModal";

const NewGameModal: React.FC<NewGameModalProps> = ({ show, onClose, onSave }) => {

    const [showAddModal, setAddShowModal] = useState(false);

    const [tags, setTags] = React.useState([] as Tag[]);
    const [selectedTags, setSelectedTags] = React.useState([] as Tag[]);
    const [imagesUrls, setImagesUrls] = React.useState([] as any[]);
    const [files, setFiles] = React.useState([] as any[]);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [publicationDate, setPublicationDate] = React.useState('');
    const [currency, setCurrency] = React.useState('PLN');
    const [components, setComponents] = React.useState([] as Component[]);
    const [imageIds, setImageIds] = React.useState([] as number[]);

    React.useEffect(() => {
        fetchTags();
    })

    const fetchTags = () => {
        Api.game.getAllTags()
            .then((tags) => {
                setTags(tags);
            })
            .catch((err) => {
                toast.error(`${err.response.data.message}`, { icon: "💀" });
            });
    };

    const handleChange = (e: any) => {
        const name = e.target.value;
        const selectedTag = tags.find(tag => tag.name === name);
        if (!selectedTags.find(tag => tag.name === name)) {
            if (selectedTag) {
                selectedTags.push(selectedTag);
                setSelectedTags(selectedTags);
                fetchTags();
            }
        }
    }

    const handleRemoveTag = (tagToRemove: any) => {
        setSelectedTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };

    const handleImageSelect = (event: { target: { files: any; }; }) => {
        const selectedFiles = event.target.files;
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        const imageURLs: string[] = [];

        for (const element of selectedFiles) {
            const imageURL = URL.createObjectURL(element);
            imageURLs.push(imageURL);
        }

        setImagesUrls((prevImages) => [...prevImages, ...imageURLs]);
    };

    const handleClick = () => {
        const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    function sendGameCreationRequest() {
        if (files.length != 0) {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('file', file);
            });
            Api.image.uploadImage(formData)
                .then((images) => {
                    const newImageIds = images.map((image) => image.id);
                    setImageIds((prevIds) => [...prevIds, ...newImageIds]);
                    setFiles([]);
                    sendGameCreation();
                }).catch((err) => {
                toast.error(`${err.response.data.message}`, { icon: '💀' });
            });
        } else {
            sendGameCreation();
        }
    }

    function sendGameCreation() {
        Api.game.createGame({
            title: title,
            description: description,
            price: price,
            publicationDate: publicationDate,
            currency: currency,
            tags: selectedTags,
            components: components,
            imageIds: imageIds
        }).then((game) => {
            toast.success(`Game created successfully`, { icon: '👏' });
            onSave(game);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: '💀' });
        });
    }

    function addComponent() {
        setAddShowModal(true);
    }

    function handleRemoveComponent(component: Component) {
        setComponents(prevComponent => prevComponent.filter(comp => comp !== component));
    }

    function handleCloseAddComponentModal() {
        setAddShowModal(false);
    }

    function handleAddNewComponent(component: Component) {
        toast.success(`Component added successfully`, {icon: "👏"});
        setComponents((prevComponents) => [...prevComponents, component]);
        handleCloseAddComponentModal();
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
                        <p className='font-bold fs-2 mb-12'>Create new Game</p>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Game title'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
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
                                    <Form.Group className='mt-3'>
                                        <Form.Control
                                            type='number'
                                            placeholder='Game price'
                                            value={isNaN(price) ? '' : price.toString()}
                                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                                            step="any"
                                        />
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <Form.Control
                                            type='date'
                                            placeholder='Publication date'
                                            value={publicationDate}
                                            onChange={(e) => setPublicationDate(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <Form.Select className='form-select ' aria-label="Currency selector" defaultValue={''} onChange={(e) => setCurrency(e.target.value)}>
                                            <option disabled value={''}>Choose currency</option>
                                            <option value={'PLN'}>PLN</option>
                                            <option value={'EUR'}>EUR</option>
                                            <option value={'USD'}>USD</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className='mt-3'>
                                        <Row className='d-flex justify-content-start mt-3'>
                                            <Col lg={4}>
                                                <Form.Select className='form-select ' aria-label="Category selector" defaultValue={''} onChange={handleChange}>
                                                    <option disabled value={''}>Choose tags</option>
                                                    {tags.map(item => {
                                                        return (<option key={item.id} value={item.name}>{item.name}</option>)
                                                    })}
                                                </Form.Select>
                                            </Col>
                                            {Array.isArray(selectedTags) && selectedTags.length > 0 ? (
                                                    selectedTags.map(tag => {
                                                        return <Col lg={4} className='tag ps-3' key={tag.id}>{tag.name}<BsXLg className='' onClick={() => handleRemoveTag(tag)} /></Col>
                                                    }))
                                                : (
                                                    <div></div>
                                                )}
                                        </Row>
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
                                            {imagesUrls.map((imageURL, index) => (
                                                <Carousel.Item key={index}>
                                                    <img src={imageURL} alt={`Image ${index}`} style={{ width: 'auto', height: 'auto', maxWidth: '200px', maxHeight: '200px' }} className="mx-auto d-block" />
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
                                                onClick={addComponent}
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
                                            <th>Quantity:</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {components.map((component, index) => (
                                            <tr key={index}>
                                                <td className="tag-cell">
                                                    <div className="tag-content">
                                                        <span>{component.name}</span>
                                                    </div>
                                                </td>
                                                <td className="tag-cell">
                                                    <div className="tag-content">
                                                        <span>{component.quantity}</span>
                                                    </div>
                                                </td>
                                                <td className="tag-cell">
                                                    <div className="tag-content">
                                                        <Button className='button-workspace' onClick={() => handleRemoveComponent(component)}>-</Button>
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
                            >Create</Button>
                        </Form>
                    </Card.Body>
                    <NewComponentModal
                        game={null}
                        show={showAddModal}
                        onClose={handleCloseAddComponentModal}
                        onSave={handleAddNewComponent}
                    />
                </Card>
            </Container>
        </div>
    )
}

export default NewGameModal;