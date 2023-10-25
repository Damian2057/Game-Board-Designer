import React, {useState} from "react";
import {ElementsEditProps} from "../../../Props/ElementsEditProps";
import {ElementEntity} from "../../../../../../model/project/elementEntity";
import {Api} from "../../../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import ElementInfoModal from "../../element/ElementInfoModal";
import ElementEditModal from "../../element/ElementEditModal";
import ElementContainerAddNewModal from "./ElementContainerAddNewModal";
import {t} from "i18next";

const ElementContainerEditListModal: React.FC<ElementsEditProps> = ({onClose, onSave, editedElements, id }) => {

    const [elements, setElements] = useState([] as ElementEntity[]);
    const [selectedElementInfo, setSelectedElementInfo] = useState<ElementEntity | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedElement, setEditedElement] = useState<ElementEntity | null>(null);
    const [showAddModal, setAddShowModal] = useState(false);

    React.useEffect(() => {
        fetchElements();
    }, [editedElements]);


    const fetchElements = () => {
        Api.project.getContainerElements(id).then((res) => {
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
            toast.success(t("Element deleted successfully"), {icon: "🗑️"});
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
                        <p className='font-bold fs-2'>{t("Elements")}</p>
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenAddElementModal}>{t("Add new Element")}</Button>
                        </div>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>ID</th>
                                        <th>{t("Name")}</th>
                                        <th>{t("Quantity")}</th>
                                        <th>{t("Status")}</th>
                                        <th>{t("Priority")}</th>
                                        <th>{t("Info")}</th>
                                        <th>{t("Edit")}</th>
                                        <th>{t("Delete")}</th>
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
                                                <Button className='button-workspace' onClick={() => handleElementInfo(elem)}>{t("Info")}</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleEditElement(elem)}>{t("Edit")}</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleDeleteElement(elem)}>{t("Delete")}</Button>
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
                    <ElementContainerAddNewModal
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

export default ElementContainerEditListModal;