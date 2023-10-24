import React, {useState} from "react";
import {User} from "../../../model/user/user";
import {Api} from "../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import IconCircle from "../../util/IconCircle";
import EmployeeInfoModal from "../ManageEmployees/Modals/EmployeeInfoModal";
import EmployeeEditModal from "../ManageEmployees/Modals/EmployeeEditModal";
import ReactPaginate from "react-paginate";
import {t} from "i18next";

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
            toast.success(t('User changed successfully'));
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
                        <p className='font-bold fs-2'>{t('Users')}</p>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>{t('Username')}</th>
                                        <th>{t('Email')}</th>
                                        <th>{t('Role')}</th>
                                        <th>{t('Details')}</th>
                                        <th>{t('Edit')}</th>
                                        <th>{t('Activation')}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className='centered-td'>{employee.username}</td>
                                            <td className='centered-td'>{employee.email}</td>
                                            <td className='centered-td'>{employee.role}</td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleUserInfo(employee)}>{t('Info')}</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleEditUser(employee)}>{t('Edit')}</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleUserDeactivate(employee.id, employee.isActive)}>
                                                    {employee.isActive ? t('Deactivate') : t('Activate')}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {selectedUserInfo && (
                                        <EmployeeInfoModal
                                            name={t('User')}
                                            employee={selectedUserInfo}
                                            onClose={() => setSelectedUserInfo(null)}
                                        />
                                    )}
                                    </tbody>
                                </Table>
                                <EmployeeEditModal
                                    name={t('User')}
                                    show={showEditModal}
                                    onClose={() => setShowEditModal(false)}
                                    onSave={handleSaveEditedUser}
                                    editedEmployee={editedUser ?? null}
                                />
                            </Col>
                        </div>
                        <ReactPaginate
                            previousLabel={t('previous')}
                            nextLabel={t('next')}
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