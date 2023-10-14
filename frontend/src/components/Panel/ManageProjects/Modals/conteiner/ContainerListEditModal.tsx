import React, {useState} from "react";
import {Api} from "../../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import ElementInfoModal from "../element/ElementInfoModal";
import NewElementModal from "../element/NewElementModal";
import ElementEditModal from "../element/ElementEditModal";
import {ContainerEditListProps} from "../../Props/ContainerEditListProps";
import {ContainerEntity} from "../../../../../model/project/containerEntity";

const ContainerListEditModal: React.FC<ContainerEditListProps> = ({onClose, onSave, editedContainers, id }) => {

    const [containers, setContainers] = useState([] as ContainerEntity[]);
    const [selectedContainerInfo, setSelectedContainerInfo] = useState<ContainerEntity | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedContainer, setEditedContainer] = useState<ContainerEntity | null>(null);
    const [showAddModal, setAddShowModal] = useState(false);

    React.useEffect(() => {
        fetchContainers();
    }, [editedContainers]);


    const fetchContainers = () => {
        Api.project.getProjectContainers(id).then((res) => {
            setContainers(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function handleElementInfo(containerEntity: ContainerEntity) {
        setSelectedContainerInfo(containerEntity)
    }

    function handleEditElement(containerEntity: ContainerEntity) {
        setShowEditModal(true)
        setEditedContainer(containerEntity)
    }

    function handleSaveEditedContainer() {
        setShowEditModal(false)
        setEditedContainer(null)
        fetchContainers()
    }

    function handleOpenAddContainerModal() {
        setAddShowModal(true);
    }

    function handleCloseAddContainerModal() {
        setAddShowModal(false);
    }

    function handleAddNewContainer(elements: ContainerEntity[] | null) {
        if (elements === null) {
            return;
        }
        setContainers(elements)
        handleCloseAddContainerModal();
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
                        <p className='font-bold fs-2'>Containers</p>
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenAddContainerModal}>Add new Container</Button>
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
                                    {containers.map((elem) => (
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
                {/*{selectedContainerInfo && (*/}
                {/*    <ElementInfoModal*/}
                {/*        element={selectedContainerInfo}*/}
                {/*        onClose={() => setSelectedContainerInfo(null)}*/}
                {/*        show={true}*/}
                {/*    />*/}
                {/*)}*/}
                {/*{showAddModal && (*/}
                {/*    <NewElementModal*/}
                {/*        onClose={handleCloseAddElementModal}*/}
                {/*        onSave={handleAddNewElement}*/}
                {/*        id={id}*/}
                {/*    />*/}
                {/*)}*/}
                {/*{showEditModal && (*/}
                {/*    <ElementEditModal*/}
                {/*        onClose={() => setShowEditModal(false)}*/}
                {/*        onSave={handleSaveEditedElement}*/}
                {/*        editedElement={editedContainer ?? null}*/}
                {/*    />*/}
                {/*)}*/}
            </Container>
        </div>
    )
}

export default ContainerListEditModal;