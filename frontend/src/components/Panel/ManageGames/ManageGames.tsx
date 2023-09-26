import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import IconCircle from "../../util/IconCircle";
import NewEmployeeModal from "../ManageEmployees/Modals/NewEmployeeModal";
import TableWithPaging from "./Modals/TableWithPaging";

export default function ManageGames() {

    const [showAddModal, setAddShowModal] = useState(false);

    function handleOpenAddGameModal() {

    }

    function handleCloseAddGameModal() {

    }

    function handleAddNewGame() {

    }

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
                        <p className='font-bold fs-2'>Games</p>
                        <TableWithPaging />
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenAddGameModal}>Add new game</Button>
                        </div>
                    </Card.Body>
                </Card>
                <NewEmployeeModal
                    show={showAddModal}
                    onClose={handleCloseAddGameModal}
                    onSave={handleAddNewGame}
                />
            </Container>
        </div>
    )
}