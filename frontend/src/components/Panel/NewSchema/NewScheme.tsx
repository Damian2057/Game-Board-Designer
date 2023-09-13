import React from 'react'
import { Button, Card, Carousel, Col, Container, Form, Row } from 'react-bootstrap'
import './NewScheme.css'
import IconCircle from '../../util/IconCircle'
import { BsXLg } from 'react-icons/bs'

type Props = {}

function NewScheme({ }: Props) {

    const categories = ['Strategy', 'Party', 'Cooperative', 'Eurogames', 'Abstract', 'Family']
    const [category, setCategory] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [images, setImages] = React.useState([]);

    const handleChange = (e: any) => {
        const selectedValue = e.target.value;

        if (!tags.includes(selectedValue)) {
            setCategory(selectedValue);
            setTags(prevTags => [...prevTags, selectedValue]);
        }
    }

    const handleRemoveTag = (tagToRemove: any) => {
        setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };

    const handleImageSelect = (event) => {
        const selectedFiles = event.target.files;
        const imageURLs = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const imageURL = URL.createObjectURL(selectedFiles[i]);
            imageURLs.push(imageURL);
        }

        setImages((prevImages) => [...prevImages, ...imageURLs]);
    };

    return (
        <div className='newSchema'>
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%'
                }}>
                    <Card.Body>
                        <IconCircle path={'/panel/admin'} />
                        <p className='font-bold fs-2 mb-12'>Create new scheme</p>
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
                                                    {categories.map(item => {
                                                        return (<option key={item} value={item}>{item}</option>)
                                                    })}
                                                </Form.Select>
                                            </Col>
                                            {Array.isArray(tags) && tags.length > 0 ? (
                                                tags.map(tag => {
                                                    return <Col lg={4} className='tag ps-3' key={tag}>{tag}<BsXLg className='' onClick={() => handleRemoveTag(tag)} /></Col>
                                                }))
                                                : (
                                                    <div></div>
                                                )}
                                        </Row>
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <input type="file" accept="image/*" multiple onChange={handleImageSelect} style={{ display: 'none' }} ref={(input) => input && input.setAttribute('webkitdirectory', 'true')} />
                                    <Button onClick={() => document.querySelector('input[type=file]').click()} style={{
                                        backgroundColor: '#7D53DE',
                                        borderColor: '#7D53DE',
                                        borderRadius: '20px',
                                        marginBottom: '1rem',
                                        paddingInline: '2rem',
                                        paddingBlock: '0.5rem'
                                    }}>Choose images</Button>
                                    <div>
                                        <Carousel data-bs-theme="dark">
                                            {images.map((imageURL, index) => (
                                                <Carousel.Item key={index}>
                                                    <img src={imageURL} alt={`Image ${index}`} style={{ width: '100%', height: '100%' }} />
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

export default NewScheme