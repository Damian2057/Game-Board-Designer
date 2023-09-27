import React from "react";
import {Button, Card, Carousel, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {BsXLg} from "react-icons/bs";
import {NewGameModalProps} from "../Props/NewGameModalProps";
import {GrClose} from "react-icons/gr";
import {Tag} from "../../../../model/game/tag";
import {Api} from "../../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Component} from "../../../../model/game/component";

const NewGameModal: React.FC<NewGameModalProps> = ({ show, onClose, onSave }) => {

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
        console.log(selectedTags);
    }

    const handleRemoveTag = (tagToRemove: any) => {
        setSelectedTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };

    const handleImageSelect = (event: { target: { files: any; }; }) => {
        const selectedFiles = event.target.files;
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        const imageURLs: string[] = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const imageURL = URL.createObjectURL(selectedFiles[i]);
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
        if (imageIds.length === files.length) {
            //send request
        } else {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('file', file);
            });
            console.log(formData);
            Api.image.uploadImage(formData).then((images) => {
                setImageIds((prevIds) => [...prevIds, ...images.map(image => image.id)]);
            }).catch((err) => {
                toast.error(`${err.response.data.message}`, { icon: "💀" });
            });
            // Api.game.uploadImage(formData)
            //     .then((response) => {
            //         setImageIds((prevIds) => [...prevIds, response.id]);
            //         sendGameCreationRequest();
            //     })
            //     .catch((err) => {
            //         toast.error(`${err.response.data.message}`, { icon: "💀" });
            //     });
        }


        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('description', description);
        // formData.append('price', price.toString());
        // formData.append('publicationDate', publicationDate);
        // formData.append('currency', currency);
        // formData.append('components', JSON.stringify(components));
        // formData.append('tags', JSON.stringify(selectedTags));
        // for (let i = 0; i < files.length; i++) {
        //     formData.append('files', files[i]);
        // }
        // Api.game.createGame(formData)
        //     .then((response) => {
        //         toast.success(`Game created successfully`, { icon: "👏" });
        //         onSave(response);
        //         onClose();
        //     })
        //     .catch((err) => {
        //         toast.error(`${err.response.data.message}`, { icon: "💀" });
        //     });
    }

    function addComponent() {

    }

    function handleRemoveComponent(component: Component) {

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
                                            <tr key={component.id}>
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
                </Card>
            </Container>
        </div>
    )
}

export default NewGameModal;