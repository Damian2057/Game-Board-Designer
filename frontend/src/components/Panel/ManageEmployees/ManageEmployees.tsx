import React, { useState } from 'react'
import { Button, Card, Col, Container, Table, Modal, Form } from 'react-bootstrap'
import { GrClose } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';
import IconCircle from '../../util/IconCircle'
import './ManageEmployees.css'
import {Api} from "../../../connector/api";
import {User} from "../../../model/user/user";
import EmployeeInfo from "./Modals/EmployeeInfo";
import EmployeeEdit from "./Modals/EmployeeEdit";

export default function ManageEmployees() {

    const [employees, setEmployees] = useState([] as User[]);
    const [selectedEmployeeInfo, setSelectedEmployeeInfo] = React.useState<User | null>(null);
    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState<User | null>(null);

    React.useEffect(() => {
        Api.user.findUser({
            roles: 'admin,employee'
        }).then(res => {
            setEmployees(res)
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    }, []);

    const handleOpenAddEmployeeModal = () => {
        setAddShowModal(true);
    };
    const handleCloseAddEmployeeModal = () => {
        setAddShowModal(false);
    };

    const handleAddNewEmployee = (newEmployee: { id: number; firstName: string; lastName: string, isAdmin: boolean }) => {
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
        // const updatedEmployees = employees.map((employee) =>
        //     employee.id === editedEmployee.id ? editedEmployee : employee
        // );
        // // setEmployees(updatedEmployees);
        // setEditedEmployee(null);
        // setShowEditModal(false);
    };

    const handleEmployeeDeactivate = (employeeIdToRemove: any) => {
        const updatedEmployees = employees.filter(employee => employee.id !== employeeIdToRemove);
        setEmployees(updatedEmployees);
        toast.success('Employee deactivated', { icon: "💀" })
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
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Details</th>
                                            <th>Edit</th>
                                            <th>Deactivate</th>
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
                                                    <Button className='button-workspace' onClick={() => handleEmployeeDeactivate(employee.id)}>Deactivate</Button>
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

interface NewEmployeeModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (employee: { id: number; firstName: string; lastName: string, isAdmin: boolean }) => void;
}

const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({ show, onClose, onSave }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSave = () => {
        onSave({ id: Date.now(), firstName, lastName, isAdmin });
        setFirstName('');
        setLastName('');
        setIsAdmin(false);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} className='text-white'>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Add employee</Modal.Title>
            <Modal.Body>
                <Form as={Col} lg={8} className='mx-auto mb-5'>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>First Name:</Form.Label>
                            <Form.Control type='text'
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <Form.Label className='fw-bold'>Last Name:</Form.Label>
                            <Form.Control type='text'
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div className='flex justify-center items-center'>
                            <ToggleComponent label="Role" initialValue={isAdmin} onChange={setIsAdmin} />
                        </div>
                    </Form.Group>
                    <div className='flex justify-center items-center mt-4'>
                        <Button type='submit' className='bg-light border-light fw-semibold' onClick={handleSave} style={{ color: '#7D53DE', borderRadius: '20px', paddingInline: '3rem' }}>
                            Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};


interface ToggleComponentProps {
    label: string;
    initialValue: boolean;
    onChange: (value: boolean) => void;
}

const ToggleComponent: React.FC<ToggleComponentProps> = ({ label, initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = () => {
        setValue(!value);
        onChange(!value);
    };

    return (
        <div className='mt-4'>
            <Form.Group controlId={`${label}Toggle`}>
                <Form.Check
                    type="switch"
                    id={`${label.toLowerCase()}Switch`}
                    label={label}
                    checked={value}
                    onChange={handleChange}
                />
                <p className='fw-bold'>{value ? 'Admin' : 'Employee'}</p>
            </Form.Group>
        </div>

    );
};
