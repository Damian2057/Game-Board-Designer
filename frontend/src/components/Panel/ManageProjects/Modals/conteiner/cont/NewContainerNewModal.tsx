import React, {useState} from "react";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {GrClose, GrStatusUnknown} from "react-icons/gr";
import {GiNotebook} from "react-icons/gi";
import {FcHighPriority} from "react-icons/fc";
import {Property} from "../../../../../../model/project/property";
import {ElementEntity} from "../../../../../../model/project/elementEntity";
import {Api} from "../../../../../../connector/api";
import UploadModal from "../../../../../util/UploadModal";
import NewPropertyModal from "../../property/NewPropertyModal";
import NotesModal from "../../../../../util/NotesModal";
import ImageDisplayModal from "../../../../../util/ImageDisplayModal";
import ElementContainerNewListModal from "../elem/ElementContainerNewListModal";
import {Image} from "../../../../../../model/image/image";
import {ContainerEntity} from "../../../../../../model/project/containerEntity";
import {NewContainerNewProps} from "../../../Props/NewContainerNewProps";
import ChoiceElement from "../../../../../util/ChoiceElement";
import {elementIcon, imageIcon} from "../../../../../util/Icons";
import {t} from "i18next";

const NewContainerNewModal: React.FC<NewContainerNewProps> = ({onClose, onSave }) => {

    const [showAddModal, setAddShowModal] = useState(false);
    const [imageEditModalShow, setImageEditModalShow] = React.useState(false);
    const [uploadModalShow, setUploadModalShow] = useState(false);
    const [showElementsEditModal, setShowElementsEditModal] = React.useState(false);
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
    const [elements, setElements] = React.useState([] as ElementEntity[]);

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
        setImageEditModalShow(true);
    };
    function sendContainerAddRequest() {
        const container = {
            name: name,
            quantity: quantity,
            description: description,
            notes: notes,
            imageIds: imageIds,
            properties: properties,
            priority: selectedPriority,
            status: selectedStatus,
            elements: elements,
        } as ContainerEntity;
        onSave(container);
        onClose();
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
        setSelectedPriority(value);
    }

    function handleSetSelectedStatus(value: string) {
        setSelectedStatus(value);
    }

    function handleSaveImages(imageIds: number[] | null) {
        if (!imageIds) {
            return;
        }
        setImageIds(imageIds);
        setImageEditModalShow(false);
    }

    function editElemets() {
        setShowElementsEditModal(true);
    }

    function handleEditElementsSave(elements: ElementEntity[] | null) {
        setElements(elements || [])
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
                        <p className='font-bold fs-2 mb-12'>{t("Add Container")}</p>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder={t("Container name")}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder={t("Container description")}
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
                                                        {t("Priority")}
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
                                                        {t("Status")}
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
                                            onClick={sendContainerAddRequest}
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
                                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ChoiceElement name={"Images"} icon={imageIcon} onClick={handleClick}/>
                                    <ChoiceElement name={"Elements"} icon={elementIcon} onClick={editElemets}/>
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
                    {showElementsEditModal && (
                        <ElementContainerNewListModal
                            onClose={() => setShowElementsEditModal(false)}
                            onSave={handleEditElementsSave}
                            editedElements={elements}
                            id={null}
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
                    <NotesModal
                        show={showNotesModal}
                        notes={notes}
                        onClose={() => setShowNotesModal(false)}
                        onSave={handleSaveNotes}
                    />
                    <ImageDisplayModal
                        show={imageEditModalShow}
                        onClose={() => setImageEditModalShow(false)}
                        imageIds={imageIds}
                        onSave={handleSaveImages}
                    />
                </Card>
            </Container>
        </div>
    )
}

export default NewContainerNewModal;