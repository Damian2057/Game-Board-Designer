import React, {useState} from "react";
import {Api} from "../../../../../connector/api";
import toast from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {ContainerEditListProps} from "../../Props/ContainerEditListProps";
import {ContainerEntity} from "../../../../../model/project/containerEntity";
import ContainerInfoModal from "./ContainerInfoModal";
import ContainerEditModal from "./ContainerEditModal";
import NewContainerModal from "./NewContainerModal";
import {t} from "i18next";

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

    function handleContainerInfo(containerEntity: ContainerEntity) {
        setSelectedContainerInfo(containerEntity)
    }

    function handleContainerElement(containerEntity: ContainerEntity) {
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

    function handleDeleteContainer(container: ContainerEntity) {
        Api.project.deleteContainer(container.id).then((res) => {
            toast.success(t("Container deleted"), { icon: "🗑️" });
            fetchContainers();
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
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
                        <p className='font-bold fs-2'>{t("Containers")}</p>
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenAddContainerModal}>{t("Add new Container")}</Button>
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
                                    {containers.map((elem) => (
                                        <tr key={elem.id}>
                                            <td className='centered-td'>{elem.id}</td>
                                            <td className='centered-td'>{elem.name}</td>
                                            <td className='centered-td'>{elem.quantity}</td>
                                            <td className='centered-td'>{elem.status}</td>
                                            <td className='centered-td'>{elem.priority}</td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleContainerInfo(elem)}>{t("Info")}</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleContainerElement(elem)}>{t("Edit")}</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleDeleteContainer(elem)}>{t("Delete")}</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>
                    </Card.Body>
                </Card>
                {selectedContainerInfo && (
                    <ContainerInfoModal
                    container={selectedContainerInfo}
                    onClose={() => setSelectedContainerInfo(null)}
                    show={true}
                    />
                )}
                {showAddModal && (
                    <NewContainerModal
                        onClose={handleCloseAddContainerModal}
                        onSave={handleAddNewContainer}
                        id={id}
                    />
                )}
                {showEditModal && (
                    <ContainerEditModal
                        onClose={() => setShowEditModal(false)}
                        onSave={handleSaveEditedContainer}
                        editedContainer={editedContainer ?? null}
                        id={id}
                    />
                )}
            </Container>
        </div>
    )
}

export default ContainerListEditModal;