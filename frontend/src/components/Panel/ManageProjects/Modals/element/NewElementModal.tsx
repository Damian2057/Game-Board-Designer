import React, {useState} from "react";
import {Property} from "../../../../../model/project/property";
import {Api} from "../../../../../connector/api";
import toast from "react-hot-toast";
import {Image} from "../../../../../model/image/image";
import {Button, Card, Carousel, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {GrClose, GrStatusUnknown} from "react-icons/gr";
import {GiNotebook} from "react-icons/gi";
import {FcHighPriority} from "react-icons/fc";
import UploadModal from "../../../../util/UploadModal";
import NewPropertyModal from "../property/NewPropertyModal";
import NotesModal from "../../../../util/NotesModal";
import {NewElementProps} from "../../Props/NewElementProps";
import {t} from "i18next";

const NewElementModal: React.FC<NewElementProps> = ({onClose, onSave, id }) => {

    const [showAddModal, setAddShowModal] = useState(false);
    const [uploadModalShow, setUploadModalShow] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);
    const [description, setDescription] = React.useState('');
    const [notes, setNotes] = React.useState([] as string[]);
    const [imageIds, setImageIds] = React.useState([] as number[]);
    const [properties, setProperties] = React.useState([] as Property[]);
    const [selectedPriority, setSelectedPriority] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState('');
    const [priorities, setPriorities] = React.useState([] as string[]);
    const [statuses, setStatuses] = React.useState([] as string[]);

    React.useEffect(() => {
        Api.project.getAvailablePriorities().then((priorities) => {
            setPriorities(priorities);
            setSelectedPriority(priorities[0])
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
        Api.project.getAvailableStatuses().then((statuses) => {
            setStatuses(statuses);
            setSelectedStatus(statuses[0])
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }, []);

    const handleClick = () => {
        setUploadModalShow(true);
    };

    function sendAddElementRequest() {
        if (id === null) {
            toast.error(t("Project id is null"), {icon: "💀"});
            return;
        }
        Api.project.addElementToProject(id, {
            name: name,
            description: description,
            notes: notes,
            imageIds: imageIds,
            quantity: quantity,
            properties: properties,
            priority: selectedPriority,
            status: selectedStatus
        }).then((elements) => {
            toast.success(t("Element added successfully"), {icon: "👏"});
            onSave(elements);
            onClose();
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
            onSave(null);
        });
    }

    function addProp() {
        setAddShowModal(true);
    }

    function handleRemoveProp(prop: Property) {
        setProperties((prevProps) =>
            prevProps.filter((property) => property !== prop)
        );
    }

    function handleCloseAddPropertyModal() {
        setAddShowModal(false);
    }

    function handleAddNewProperty(prop: Property) {
        setProperties((prevProps) => [...prevProps, prop]);
        handleCloseAddPropertyModal();
    }

    function handleRemoveImage(imageId: number) {
        setImageIds((prevIds) => prevIds.filter((id) => id !== imageId));
        Api.image.deleteImage(imageId).then(() => {
            toast.success(t("Image removed successfully"), {icon: "👏"});
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function handleUploadImages(data: Image[] | null) {
        if (!data) {
            return;
        }
        const newImageIds = data.map((image) => image.id);
        setImageIds((prevIds) => [...prevIds, ...newImageIds]);
    }

    function handleSaveNotes(data: string[] | null) {
        if (!data) {
            return;
        }
        setNotes(data);
    }

    function handleSetSelectedPriority(value: string) {
        setSelectedPriority(value)
    }

    function handleSetSelectedStatus(value: string) {
        setSelectedStatus(value)
    }

    return (
        <div className='NewGameModal'>
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
                        <p className='font-bold fs-2 mb-12'>{t("Add Element")}</p>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder={t("Element name")}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder={t("Element description")}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="number"
                                            placeholder={t("Element Quantity")}
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
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
                                                        {t("Notes")}
                                                    </div>
                                                </div>
                                            </Button>
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <div>
                                            <Form.Label className='fw-bold'>
                                                <div className='flex flex-row gap-2 items-center'>
                                                    <div>
                                                        <FcHighPriority size={30} />
                                                    </div>
                                                    <div>
                                                        {t("Priority")}:
                                                    </div>
                                                </div>
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={selectedPriority}
                                                onChange={(e) => handleSetSelectedPriority(e.target.value)}
                                            >{priorities.map((prio) => (
                                                <option key={prio} value={prio}>
                                                    {prio}
                                                </option>
                                            ))}
                                            </Form.Control>
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <div>
                                            <Form.Label className='fw-bold'>
                                                <div className='flex flex-row gap-2 items-center'>
                                                    <div>
                                                        <GrStatusUnknown size={30} />
                                                    </div>
                                                    <div>
                                                        {t("Status")}:
                                                    </div>
                                                </div>
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={selectedStatus}
                                                onChange={(e) => handleSetSelectedStatus(e.target.value)}
                                            >{statuses.map((stat) => (
                                                <option key={stat} value={stat}>
                                                    {stat}
                                                </option>
                                            ))}
                                            </Form.Control>
                                        </div>
                                    </Form.Group>
                                    <Button type="button"
                                            onClick={sendAddElementRequest}
                                            style={{
                                                backgroundColor: '#7D53DE',
                                                borderColor: '#7D53DE',
                                                borderRadius: '20px',
                                                marginBottom: '1rem',
                                                paddingInline: '2rem',
                                                paddingBlock: '0.5rem'
                                            }}
                                    >{t("Done")}</Button>
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
                                    >{t("Choose images")}</Button>
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
                                                    <Button className='button-workspace' onClick={() => handleRemoveImage(imageId)}>{t("Remove")}</Button>
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </div>
                                </Col>
                                <Col>
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Modal.Title className='fs-2 fw-bold' style={{ flex: 1, marginRight: '1rem' }}>{t("Properties")}</Modal.Title>
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
                                            <th>{t("Name")}</th>
                                            <th>{t("Value")}</th>
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
                                                        <Button className='button-workspace' onClick={() => handleRemoveProp(prop)}>-</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                    <UploadModal
                        show={uploadModalShow}
                        onClose={() => setUploadModalShow(false)}
                        onSave={handleUploadImages}
                    />
                    <NewPropertyModal
                        show={showAddModal}
                        onClose={handleCloseAddPropertyModal}
                        onSave={handleAddNewProperty}
                    />
                    <NotesModal
                        show={showNotesModal}
                        notes={null}
                        onClose={() => setShowNotesModal(false)}
                        onSave={handleSaveNotes}
                    />
                </Card>
            </Container>
        </div>
    )
}

export default NewElementModal;