import React, {useState} from "react";
import {Api} from "../../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import NewGameModal from "../../../ManageGames/Modals/NewGameModal";
import GameEditModal from "../../../ManageGames/Modals/GameEditModal";
import {ElementsEditProps} from "../../Props/ElementsEditProps";
import {ElementEntity} from "../../../../../model/project/elementEntity";
import {GrClose} from "react-icons/gr";
import ElementInfoModal from "./ElementInfoModal";


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

    function handleAddNewElement() {
        toast.success(`Element added successfully`, {icon: "👏"});
        handleCloseAddElementModal();
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
                    <NewGameModal
                        show={showAddModal}
                        onClose={handleCloseAddElementModal}
                        onSave={handleAddNewElement}
                    />
                )}
                {showEditModal && (
                    <GameEditModal
                        show={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        onSave={handleSaveEditedElement}
                        editedGame={editedElement ?? null}
                    />
                )}
            </Container>
        </div>
    )
}

export default ElementListEditModal;