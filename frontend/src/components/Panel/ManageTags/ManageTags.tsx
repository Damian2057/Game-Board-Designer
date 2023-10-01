import React, {useState} from "react";
import {Api} from "../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import IconCircle from "../../util/IconCircle";
import EmployeeEditModal from "../ManageEmployees/Modals/EmployeeEditModal";
import {Tag} from "../../../model/game/tag";
import TagEditModal from "./Modals/TagEditModal";
import NewTagModal from "./Modals/NewTagModal";

export default function ManageTags() {

    const [tags, setTags] = useState([] as Tag[]);
    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTag, setEditedTag] = useState<Tag | null>(null);

    React.useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = () => {
        Api.game.getAllTags().then((res) => {
            setTags(res);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    const handleOpenNewTagModal = () => {
        setAddShowModal(true);
    };
    const handleCloseNewTagModal = () => {
        setAddShowModal(false);
    };

    const handleAddNewEmployee = (tag: Tag | null) => {
        fetchTags();
    };

    const handleEditEmployee = (tag: Tag) => {
        setEditedTag(tag);
        setShowEditModal(true);
    };

    const handleSaveEditedEmployee = (tag: Tag | null) => {
        fetchTags();
        setEditedTag(null);
        setShowEditModal(false);
    };

    return (
        <div style={{ backgroundColor: '#7D53DE', height: '100vh' }}>
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <Card.Body>
                        <IconCircle path={'/panel/admin'} />
                        <p className='font-bold fs-2'>Tags</p>
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenNewTagModal}>Add new tag</Button>
                        </div>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>id</th>
                                        <th>name</th>
                                        <th>Edit</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tags.map((tag) => (
                                        <tr key={tag.id}>
                                            <td className='centered-td'>{tag.id}</td>
                                            <td className='centered-td'>{tag.name}</td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleEditEmployee(tag)}>Edit</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <NewTagModal
                                    show={showAddModal}
                                    onClose={handleCloseNewTagModal}
                                    onSave={handleAddNewEmployee}
                                />
                                <TagEditModal
                                    show={showEditModal}
                                    onClose={() => setShowEditModal(false)}
                                    onSave={handleSaveEditedEmployee}
                                    editedTag={editedTag ?? null}
                                />
                            </Col>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}