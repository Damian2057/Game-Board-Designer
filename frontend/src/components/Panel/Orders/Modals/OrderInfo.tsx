import React from 'react'
import {Modal, Row, Col, Button} from 'react-bootstrap';
import { GrClose } from "react-icons/gr";
import {OrderInfoProps} from "../Props/OrderInfoProps";
import {User} from "../../../../model/user/user";
import EmployeeInfo from "../../ManageEmployees/Modals/EmployeeInfo";
import GameInfo from "../../../Games/GameInfo/GameInfo";
import {Game} from "../../../../model/game/game";

const OrderInfo: React.FC<OrderInfoProps> = ({ order, onClose }) => {

    const [selectedUserInfo, setSelectedUserInfo] = React.useState<User | null>(null);
    const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);

    const handleUserInfo = (user: User | undefined) => {
        if (!user) return;
        setSelectedUserInfo(user);
    };

    function handleGameInfo(game: Game) {
        setSelectedGame(game);
    }

    return (
        <Modal show={true} onHide={onClose} className='text-white'>
            <div className='icon-position' >
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Row className='align-items-center'>
                <Col>
                    <Modal.Title className='fs-1 text-center fw-bold'>
                        <div>{order.game.title} Order: {order.id}</div>
                    </Modal.Title>
                    <Modal.Body className=' fs-5'>
                        <Row className='mt-3 align-items-center'>
                            <Col xs={8}>
                                <div>
                                    <span className='fw-bold'>Price:</span> {order.price}{order.currency}
                                </div>
                                <div>
                                    <span className='fw-bold'>Submitting Date:</span> {order.submittingDate}
                                </div>
                                <div>
                                    <span className='fw-bold'>Last update Date:</span> {order.lastUpdate}
                                </div>
                                <div>
                                    <span className='fw-bold'>Order status:</span> {order.status}
                                </div>
                                <div>
                                    <span className='fw-bold'>Description:</span> {order.description}
                                </div>
                            </Col>
                        </Row>
                        <Row className='gap-2'>
                            <div>
                                <span className='fw-bold'>User data:</span>
                            </div>
                            <table className="tags-table">
                                <thead>
                                <tr>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Customer</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{order.address}</td>
                                    <td>{order.city}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone}</td>
                                    <td>
                                        <Button className='button-workspace' onClick={() => handleUserInfo(order.customer)}>Info</Button>
                                    </td>
                                </tr>
                                {selectedUserInfo && (
                                    <EmployeeInfo
                                        name={"User"}
                                        employee={selectedUserInfo}
                                        onClose={() => setSelectedUserInfo(null)}
                                    />
                                )}
                                </tbody>
                            </table>
                        </Row>
                        <Row className='gap-2'>
                            <div>
                                <span className='fw-bold'>Assigned to:</span>
                                <Button className='button-workspace' onClick={() => handleUserInfo(order.worker)}>{order.worker ? order.worker?.username : "None"}</Button>
                            </div>
                        </Row>
                        <Row className='gap-2'>
                            <div>
                                <Button className='button-workspace' onClick={() => handleGameInfo(order.game)}>Game Details</Button>
                            </div>
                            {selectedGame && (
                                <GameInfo
                                    game={selectedGame}
                                    onClose={() => setSelectedGame(null)}
                                />
                            )}
                        </Row>
                    </Modal.Body>
                </Col>
            </Row>
        </Modal>

    )
}

export default OrderInfo