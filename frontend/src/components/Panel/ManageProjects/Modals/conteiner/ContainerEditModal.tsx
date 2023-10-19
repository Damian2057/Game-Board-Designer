import React, {useState} from "react";
import {Property} from "../../../../../model/project/property";
import {Api} from "../../../../../connector/api";
import toast from "react-hot-toast";
import {Image} from "../../../../../model/image/image";
import {Button, Card, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {GrClose, GrStatusUnknown} from "react-icons/gr";
import {GiNotebook} from "react-icons/gi";
import {FcHighPriority} from "react-icons/fc";
import UploadModal from "../../../../util/UploadModal";
import NewPropertyModal from "../property/NewPropertyModal";
import PropertyEditModal from "../property/PropertyEditModal";
import NotesModal from "../../../../util/NotesModal";
import {ContainerEditProps} from "../../Props/ContainerEditProps";
import ImageDisplayModal from "../../../../util/ImageDisplayModal";
import {ElementEntity} from "../../../../../model/project/elementEntity";
import ElementContainerEditListModal from "./elem/ElementContainerEditListModal";
import {elementIcon, imageIcon} from "../../../../util/Icons";
import ChoiceElement from "../../../../util/ChoiceElement";

const ContainerEditModal: React.FC<ContainerEditProps> = ({onClose, onSave, editedContainer, id }) => {

    const [showAddModal, setAddShowModal] = useState(false);
    const [imageEditModalShow, setImageEditModalShow] = React.useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const [uploadModalShow, setUploadModalShow] = useState(false);
    const [showElementsEditModal, setShowElementsEditModal] = React.useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);
    const [description, setDescription] = React.useState('');
    const [notes, setNotes] = React.useState([] as string[]);
    const [imageIds, setImageIds] = React.useState([] as number[]);
    const [properties, setProperties] = React.useState([] as Property[]);
    const [editedProperty, setEditedProperty] = React.useState<Property | null>(null);
    const [selectedPriority, setSelectedPriority] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState('');
    const [priorities, setPriorities] = React.useState([] as string[]);
    const [statuses, setStatuses] = React.useState([] as string[]);

    React.useEffect(() => {
        if (editedContainer) {
            setName(editedContainer.name);
            setDescription(editedContainer.description);
            setNotes(editedContainer.notes);
            setQuantity(editedContainer.quantity)
            setImageIds(editedContainer.imageIds);
            setProperties(editedContainer.properties);
            setSelectedPriority(editedContainer.priority);
            setSelectedStatus(editedContainer.status);
        }
        Api.project.getAvailablePriorities().then((priorities) => {
            setPriorities(priorities);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
        Api.project.getAvailableStatuses().then((statuses) => {
            setStatuses(statuses);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }, [editedContainer]);

    const handleClick = () => {
        setImageEditModalShow(true);
    };
    function sendContainerUpdateRequest() {
        if  (!editedContainer) {
            return;
        }
        Api.project.updateContainer(editedContainer.id, {
            name: name,
            description: description,
            notes: notes,
            imageIds: imageIds,
            quantity: quantity,
        }).then((container) => {
            toast.success(`Container updated successfully!`, {icon: "👏"});
            onSave(container);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function addProp() {
        setAddShowModal(true);
    }

    function handleRemoveProp(prop: Property) {
        if (editedContainer) {
            Api.property.deleteProperty(prop.id)
                .then(() => {
                    setProperties((prevProps) =>
                        prevProps.filter((property) => property !== prop)
                    );
                })
                .catch((err) => {
                    toast.error(`${err.response.data.message}`, { icon: "💀" });
                });
        }
    }

    function handleCloseAddPropertyModal() {
        setAddShowModal(false);
    }

    function handleAddNewProperty(prop: Property) {
        if (!editedContainer) {
            return;
        }
        Api.project.addPropertyToContainer(editedContainer.id, prop).then((box) => {
            setProperties(box.properties);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
        handleCloseAddPropertyModal();
    }

    function handleEditProp(prop: Property) {
        setEditedProperty(prop);
        setEditShowModal(true);
    }

    function handleEditPropSave() {
        Api.project.getContainer(editedContainer?.id as number).then((box) => {
            setProperties(box.properties);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
        setEditedProperty(null);
        setEditShowModal(false);
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
        Api.project.updatePriority(editedContainer?.id as number, value, "container").then((box) => {
            setSelectedPriority(box.priority);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function handlesetSelectedStatus(value: string) {
        Api.project.updateStatus(editedContainer?.id as number, value, "container").then((box) => {
            setSelectedStatus(box.status);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function handleSaveImages(imageIds: number[] | null) {
        if (!editedContainer) {
            return;
        }
        if (!imageIds) {
            return;
        }
        editedContainer.imageIds = imageIds;
        setImageIds(imageIds);
        setImageEditModalShow(false);
    }

    function editElements() {
        setShowElementsEditModal(true);
    }

    function handleEditElementsSave(elements: ElementEntity[] | null) {
        if (!editedContainer) {
            return;
        }
        if (elements !== null) {
            editedContainer.elements = elements;
        }
        setShowElementsEditModal(false);
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
                        <p className='font-bold fs-2 mb-12'>Edit Container</p>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Container name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder='Container description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="number"
                                            placeholder='Element Quantity'
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
                                                        Notes
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
                                                        Priority:
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
                                                        Status:
                                                    </div>
                                                </div>
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={selectedStatus}
                                                onChange={(e) => handlesetSelectedStatus(e.target.value)}
                                            >{statuses.map((stat) => (
                                                <option key={stat} value={stat}>
                                                    {stat}
                                                </option>
                                            ))}
                                            </Form.Control>
                                        </div>
                                    </Form.Group>
                                    <Button type="button"
                                            onClick={sendContainerUpdateRequest}
                                            style={{
                                                backgroundColor: '#7D53DE',
                                                borderColor: '#7D53DE',
                                                borderRadius: '20px',
                                                marginBottom: '1rem',
                                                paddingInline: '2rem',
                                                paddingBlock: '0.5rem'
                                            }}
                                    >Done</Button>
                                </Col>
                                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ChoiceElement name={"Images"} icon={imageIcon} onClick={handleClick}/>
                                    <ChoiceElement name={"Elements"} icon={elementIcon} onClick={editElements}/>
                                </Col>
                                <Col>
                                    <Col xs={8}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Modal.Title className='fs-2 fw-bold' style={{ flex: 1, marginRight: '1rem' }}>Properties</Modal.Title>
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
                        </Form>
                    </Card.Body>
                    {showElementsEditModal && (
                        <ElementContainerEditListModal
                            onClose={() => setShowElementsEditModal(false)}
                            onSave={handleEditElementsSave}
                            editedElements={editedContainer?.elements ?? null}
                            id={id ?? null}
                        />
                    )}
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
                    <PropertyEditModal
                        show={showEditModal}
                        onClose={() => setEditShowModal(false)}
                        onSave={handleEditPropSave}
                        editedProp={editedProperty ?? null} />
                    <NotesModal
                        show={showNotesModal}
                        notes={editedContainer?.notes ?? null}
                        onClose={() => setShowNotesModal(false)}
                        onSave={handleSaveNotes}
                    />
                    <ImageDisplayModal
                        show={imageEditModalShow}
                        onClose={() => setImageEditModalShow(false)}
                        imageIds={editedContainer?.imageIds ?? null}
                        onSave={handleSaveImages}
                    />
                </Card>
            </Container>
        </div>
    )
}

export default ContainerEditModal;