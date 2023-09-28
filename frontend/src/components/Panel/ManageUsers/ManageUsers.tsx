import React, {useState} from "react";
import {User} from "../../../model/user/user";
import {Api} from "../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import IconCircle from "../../util/IconCircle";
import EmployeeInfo from "../ManageEmployees/Modals/EmployeeInfo";
import EmployeeEdit from "../ManageEmployees/Modals/EmployeeEdit";
import ReactPaginate from "react-paginate";

export default function ManageUsers() {

    const itemsPerPage = 8;

    const [users, setUsers] = useState([] as User[]);
    const [pageCount, setPageCount] = useState(0);
    const [selectedUserInfo, setSelectedUserInfo] = React.useState<User | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(null);

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handlePageClick = (data: any) => {
        Api.user.findUserPage(data.selected + 1, itemsPerPage, {
            roles: 'user'
        }).then((res) => {
            setUsers(res.items);
            setPageCount(res.meta.totalPages);
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    };

    const fetchUsers = () => {
        Api.user.findUserPage(1, itemsPerPage, {
            roles: 'user'
        }).then((res) => {
            setUsers(res.items);
            setPageCount(res.meta.totalPages);
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    const handleUserInfo = (user: any) => {
        setSelectedUserInfo(user);
    };

    const handleEditUser = (user: User) => {
        setEditedUser(user);
        setShowEditModal(true);
    };

    const handleSaveEditedUser = (user: User | null) => {
        fetchUsers();
        setEditedUser(null);
        setShowEditModal(false);
    };

    const handleUserDeactivate = (userId: number, activate: boolean) => {
        const flag: boolean = !activate;
        Api.user.updateUser(userId, {
            isActive: flag
        }).then(res => {
            fetchUsers();
            toast.success('Employee changed', { icon: "💀" });
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
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
                        <p className='font-bold fs-2'>Users</p>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Details</th>
                                        <th>Edit</th>
                                        <th>Activation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className='centered-td'>{employee.username}</td>
                                            <td className='centered-td'>{employee.email}</td>
                                            <td className='centered-td'>{employee.role}</td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleUserInfo(employee)}>Info</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleEditUser(employee)}>Edit</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleUserDeactivate(employee.id, employee.isActive)}>
                                                    {employee.isActive ? 'Deactivate' : 'Activate'}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {selectedUserInfo && (
                                        <EmployeeInfo
                                            name={"User"}
                                            employee={selectedUserInfo}
                                            onClose={() => setSelectedUserInfo(null)}
                                        />
                                    )}
                                    </tbody>
                                </Table>
                                <EmployeeEdit
                                    name={"user"}
                                    show={showEditModal}
                                    onClose={() => setShowEditModal(false)}
                                    onSave={handleSaveEditedUser}
                                    editedEmployee={editedUser ?? null}
                                />
                            </Col>
                        </div>
                        <ReactPaginate
                            previousLabel="previous"
                            nextLabel="next"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={pageCount}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                        />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}