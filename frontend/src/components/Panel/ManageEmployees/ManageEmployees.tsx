import React, { useState } from 'react'
import { Button, Card, Col, Container, Table } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';
import IconCircle from '../../util/IconCircle'
import './ManageEmployees.css'
import {Api} from "../../../connector/api";
import {User} from "../../../model/user/user";
import EmployeeInfoModal from "./Modals/EmployeeInfoModal";
import EmployeeEditModal from "./Modals/EmployeeEditModal";
import NewEmployeeModal from "./Modals/NewEmployeeModal";
import ReactPaginate from "react-paginate";
import {t} from "i18next";

export default function ManageEmployees() {

    const itemsPerPage = 8;

    const [employees, setEmployees] = useState([] as User[]);
    const [pageCount, setPageCount] = useState(0);
    const [selectedEmployeeInfo, setSelectedEmployeeInfo] = React.useState<User | null>(null);
    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState<User | null>(null);

    React.useEffect(() => {
        fetchEmployees();
    }, []);

    const handlePageClick = (data: any) => {
        Api.user.findUserPage(data.selected + 1, itemsPerPage, {
            roles: 'admin,employee'
        }).then((res) => {
            setEmployees(res.items);
            setPageCount(res.meta.totalPages);
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    };

    const fetchEmployees = () => {
        Api.user.findUserPage(1, itemsPerPage, {
            roles: 'admin,employee'
        }).then((res) => {
            setEmployees(res.items);
            setPageCount(res.meta.totalPages);
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    const handleOpenAddEmployeeModal = () => {
        setAddShowModal(true);
    };
    const handleCloseAddEmployeeModal = () => {
        setAddShowModal(false);
    };

    const handleAddNewEmployee = (newEmployee: User | null) => {
        fetchEmployees();
    };

    const handleEmployeeInfo = (employee: any) => {
        setSelectedEmployeeInfo(employee);
    };

    const handleEditEmployee = (employee: User) => {
        setEditedEmployee(employee);
        setShowEditModal(true);
    };

    const handleSaveEditedEmployee = (editedEmployee: User | null) => {
        fetchEmployees();
        setEditedEmployee(null);
        setShowEditModal(false);
    };

    const handleEmployeeDeactivate = (employeeId: number, activate: boolean) => {
        const flag: boolean = !activate;
        Api.user.updateUser(employeeId, {
            isActive: flag
        }).then(res => {
            fetchEmployees();
            toast.success(t('Employee changed successfully'), { icon: "💀" });
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
                        <p className='font-bold fs-2'>{t('Employees')}</p>
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenAddEmployeeModal}>{t('Add new employee')}</Button>
                        </div>
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
                                        {employees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className='centered-td'>{employee.username}</td>
                                                <td className='centered-td'>{employee.email}</td>
                                                <td className='centered-td'>{employee.role}</td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleEmployeeInfo(employee)}>{t('Info')}</Button>
                                                </td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleEditEmployee(employee)}>{t('Edit')}</Button>
                                                </td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleEmployeeDeactivate(employee.id, employee.isActive)}>
                                                        {employee.isActive ? t('Deactivate') : t('Activate')}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {selectedEmployeeInfo && (
                                            <EmployeeInfoModal
                                                name={t('Employee')}
                                                employee={selectedEmployeeInfo}
                                                onClose={() => setSelectedEmployeeInfo(null)}
                                            />
                                        )}
                                    </tbody>
                                </Table>
                                <NewEmployeeModal
                                    show={showAddModal}
                                    onClose={handleCloseAddEmployeeModal}
                                    onSave={handleAddNewEmployee}
                                />
                                <EmployeeEditModal
                                    name={t('Employee')}
                                    show={showEditModal}
                                    onClose={() => setShowEditModal(false)}
                                    onSave={handleSaveEditedEmployee}
                                    editedEmployee={editedEmployee ?? null}
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