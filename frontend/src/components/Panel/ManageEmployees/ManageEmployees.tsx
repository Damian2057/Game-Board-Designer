import React, { useState } from 'react'
import { Button, Card, Col, Container, Table } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';
import IconCircle from '../../util/IconCircle'
import './ManageEmployees.css'
import {Api} from "../../../connector/api";
import {User} from "../../../model/user/user";
import EmployeeInfo from "./Modals/EmployeeInfo";
import EmployeeEdit from "./Modals/EmployeeEdit";
import NewEmployeeModal from "./Modals/NewEmployeeModal";

export default function ManageEmployees() {

    const [employees, setEmployees] = useState([] as User[]);
    const [selectedEmployeeInfo, setSelectedEmployeeInfo] = React.useState<User | null>(null);
    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState<User | null>(null);

    React.useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        Api.user.findUser({
            roles: 'admin,employee'
        }).then(res => {
            setEmployees(res)
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    }

    const handleOpenAddEmployeeModal = () => {
        setAddShowModal(true);
    };
    const handleCloseAddEmployeeModal = () => {
        setAddShowModal(false);
    };

    const handleAddNewEmployee = (newEmployee: User | null) => {
        // setEmployees([...employees, newEmployee]);
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
        console.log(flag);
        Api.user.updateUser(employeeId, {
            isActive: flag
        }).then(res => {
            fetchEmployees();
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
                        <p className='font-bold fs-2'>Employees</p>
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenAddEmployeeModal}>Add new employee</Button>
                        </div>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr className='uppercase'>
                                            <th>Username</th>
                                            <th>Role</th>
                                            <th>Details</th>
                                            <th>Edit</th>
                                            <th>Activation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className='centered-td'>{employee.username}</td>
                                                <td className='centered-td'>{employee.role}</td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleEmployeeInfo(employee)}>Info</Button>
                                                </td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleEditEmployee(employee)}>Edit</Button>
                                                </td>
                                                <td>
                                                    <Button className='button-workspace' onClick={() => handleEmployeeDeactivate(employee.id, employee.isActive)}>
                                                        {employee.isActive ? 'Deactivate' : 'Activate'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {selectedEmployeeInfo && (
                                            <EmployeeInfo
                                                employee={selectedEmployeeInfo}
                                                onClose={() => setSelectedEmployeeInfo(null)}
                                            />
                                        )}
                                    </tbody>
                                </Table>
                                <NewEmployeeModal show={showAddModal} onClose={handleCloseAddEmployeeModal} onSave={handleAddNewEmployee} />
                                <EmployeeEdit
                                    show={showEditModal}
                                    onClose={() => setShowEditModal(false)}
                                    onSave={handleSaveEditedEmployee}
                                    editedEmployee={editedEmployee ?? null}
                                />
                            </Col>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}