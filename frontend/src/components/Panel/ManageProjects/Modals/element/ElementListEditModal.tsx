import React, {useState} from "react";
import {Api} from "../../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import {ElementsEditProps} from "../../Props/ElementsEditProps";
import {ElementEntity} from "../../../../../model/project/elementEntity";
import {GrClose} from "react-icons/gr";
import ElementInfoModal from "./ElementInfoModal";
import NewElementModal from "./NewElementModal";
import ElementEditModal from "./ElementEditModal";


const ElementListEditModal: React.FC<ElementsEditProps> = ({onClose, onSave, editedElements, id }) => {

    const [elements, setElements] = useState([] as ElementEntity[]);
    const [selectedElementInfo, setSelectedElementInfo] = useState<ElementEntity | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedElement, setEditedElement] = useState<ElementEntity | null>(null);
    const [showAddModal, setAddShowModal] = useState(false);

    React.useEffect(() => {
        fetchElements();
    }, [editedElements]);


    const fetchElements = () => {
        Api.project.getProjectElements(id).then((res) => {
            setElements(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function handleElementInfo(element: ElementEntity) {
        setSelectedElementInfo(element)
    }

    function handleEditElement(element: ElementEntity) {
        setShowEditModal(true)
        setEditedElement(element)
    }

    function handleSaveEditedElement() {
        setShowEditModal(false)
        setEditedElement(null)
        fetchElements()
    }

    function handleOpenAddElementModal() {
        setAddShowModal(true);
    }

    function handleCloseAddElementModal() {
        setAddShowModal(false);
    }

    function handleAddNewElement(elements: ElementEntity[] | null) {
        if (elements === null) {
            return;
        }
        setElements(elements)
        handleCloseAddElementModal();
    }

    function handleDeleteElement(elem: ElementEntity) {
        Api.project.deleteElement(elem.id).then((res) => {
            toast.success(`Element ${elem.name} deleted`, {icon: "🗑️"});
            fetchElements();
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    return (
        <div className='NewGameModal'>
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <Card.Body>
                        <div className='icon-position' >
                            <a onClick={onClose} >
                                <div className='icon-circle' >
                                    <GrClose />
                                </div>
                            </a>
                        </div>
                        <p className='font-bold fs-2'>Elements</p>
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenAddElementModal}>Add new Element</Button>
                        </div>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Priority</th>
                                        <th>Info</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {elements.map((elem) => (
                                        <tr key={elem.id}>
                                            <td className='centered-td'>{elem.id}</td>
                                            <td className='centered-td'>{elem.name}</td>
                                            <td className='centered-td'>{elem.quantity}</td>
                                            <td className='centered-td'>{elem.status}</td>
                                            <td className='centered-td'>{elem.priority}</td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleElementInfo(elem)}>Info</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleEditElement(elem)}>Edit</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleDeleteElement(elem)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>
                    </Card.Body>
                </Card>
                {selectedElementInfo && (
                    <ElementInfoModal
                        element={selectedElementInfo}
                        onClose={() => setSelectedElementInfo(null)}
                        show={true}
                    />
                )}
                {showAddModal && (
                    <NewElementModal
                        onClose={handleCloseAddElementModal}
                        onSave={handleAddNewElement}
                        id={id}
                    />
                )}
                {showEditModal && (
                    <ElementEditModal
                        onClose={() => setShowEditModal(false)}
                        onSave={handleSaveEditedElement}
                        editedElement={editedElement ?? null}
                    />
                )}
            </Container>
        </div>
    )
}

export default ElementListEditModal;