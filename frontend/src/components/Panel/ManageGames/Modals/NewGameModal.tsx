import React from "react";
import {Button, Card, Carousel, Col, Container, Form, Row} from "react-bootstrap";
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
    const [components, setComponents] = React.useState([] as Component[]);

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
                                        <Form.Control type='text' placeholder='Scheme name' />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control as="textarea" rows={3} placeholder='Scheme description' />
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
                            </Row>
                            <Button type='submit' style={{
                                backgroundColor: '#7D53DE',
                                borderColor: '#7D53DE',
                                borderRadius: '20px',
                                marginBottom: '1rem',
                                paddingInline: '2rem',
                                paddingBlock: '0.5rem'
                            }}>Create</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default NewGameModal;