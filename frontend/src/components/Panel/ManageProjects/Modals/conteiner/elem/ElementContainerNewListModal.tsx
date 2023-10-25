import React, {useState} from "react";
import {ElementsEditProps} from "../../../Props/ElementsEditProps";
import {ElementEntity} from "../../../../../../model/project/elementEntity";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import ElementContainerNewNewModal from "./ElementContainerNewNewModal";
import {t} from "i18next";

const ElementContainerNewListModal: React.FC<ElementsEditProps> = ({onClose, onSave, editedElements}) => {

    const [elements, setElements] = useState([] as ElementEntity[]);
    const [showAddModal, setAddShowModal] = useState(false);

    React.useEffect(() => {
        if (editedElements === null) {
            return;
        }
        setElements(editedElements)
    }, [editedElements]);

    function handleOpenAddElementModal() {
        setAddShowModal(true);
    }

    function handleCloseAddElementModal() {
        setAddShowModal(false);
    }

    function handleAddNewElement(element: any) {
        setElements(prevState => [...prevState, element])
        handleCloseAddElementModal();
    }

    function handleDeleteElement(elem: ElementEntity) {
        setElements(elements.filter((element) => element.name !== elem.name))
    }

    function handleDone() {
        onSave(elements)
        onClose()
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
                        <p className='font-bold fs-2'>{t("Add new Element")}</p>
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
                                        <th>{t("Delete")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {elements.map((elem, index) => (
                                        <tr key={index}>
                                            <td className='centered-td'>{elem.id}</td>
                                            <td className='centered-td'>{elem.name}</td>
                                            <td className='centered-td'>{elem.quantity}</td>
                                            <td className='centered-td'>{elem.status}</td>
                                            <td className='centered-td'>{elem.priority}</td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleDeleteElement(elem)}>{t("Delete")}</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col lg={11} className="mx-auto">
                                <Button type="button"
                                        onClick={handleDone}
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
                        </div>
                    </Card.Body>
                </Card>
                {showAddModal && (
                    <ElementContainerNewNewModal
                        onClose={handleCloseAddElementModal}
                        onSave={handleAddNewElement}
                    />
                )}
            </Container>
        </div>
    )
}

export default ElementContainerNewListModal;