import React, {useState} from "react";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {ContainerEntity} from "../../../../../../model/project/containerEntity";
import {ContainerListAddProps} from "../../../Props/ContainerListAddProps";
import ContainerInfoNewModal from "./ContainerInfoNewModal";
import NewContainerNewModal from "./NewContainerNewModal";

const ContainerListAddModal: React.FC<ContainerListAddProps> = ({onClose, onSave, editedContainers }) => {

    const [containers, setContainers] = useState([] as ContainerEntity[]);
    const [selectedContainerInfo, setSelectedContainerInfo] = useState<ContainerEntity | null>(null);
    const [showAddModal, setAddShowModal] = useState(false);

    React.useEffect(() => {
        if (editedContainers === null) {
            return;
        }
        setContainers(editedContainers)
    }, [editedContainers]);

    function handleContainerInfo(containerEntity: ContainerEntity) {
        setSelectedContainerInfo(containerEntity)
    }

    function handleOpenAddContainerModal() {
        setAddShowModal(true);
    }

    function handleCloseAddContainerModal() {
        setAddShowModal(false);
    }

    function handleAddNewContainer(container: ContainerEntity | null) {
        if (container === null) {
            return;
        }
        setContainers(prevState => [...prevState, container])
        handleCloseAddContainerModal();
    }

    function handleDeleteContainer(container: ContainerEntity) {
        setContainers(containers.filter((elem) => elem.id !== container.id))
    }

    function handleDone() {
        onSave(containers);
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
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {containers.map((cont, index) => (
                                        <tr key={cont.id ? cont.id : index}>
                                            <td className='centered-td'>{cont.id}</td>
                                            <td className='centered-td'>{cont.name}</td>
                                            <td className='centered-td'>{cont.quantity}</td>
                                            <td className='centered-td'>{cont.status}</td>
                                            <td className='centered-td'>{cont.priority}</td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleContainerInfo(cont)}>Info</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleDeleteContainer(cont)}>Delete</Button>
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
                                >Done</Button>
                            </Col>
                        </div>
                    </Card.Body>
                </Card>
                {selectedContainerInfo && (
                    <ContainerInfoNewModal
                        container={selectedContainerInfo}
                        onClose={() => setSelectedContainerInfo(null)}
                        show={true}
                    />
                )}
                {showAddModal && (
                    <NewContainerNewModal
                        onClose={handleCloseAddContainerModal}
                        onSave={handleAddNewContainer}
                    />
                )}
            </Container>
        </div>
    )
}

export default ContainerListAddModal;