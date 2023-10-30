import React from 'react'
import {Modal, Row, Col, Button} from 'react-bootstrap';
import { GrClose } from "react-icons/gr";
import {OrderInfoProps} from "../Props/OrderInfoProps";
import {User} from "../../../../model/user/user";
import EmployeeInfoModal from "../../ManageEmployees/Modals/EmployeeInfoModal";
import GameInfo from "../../../Games/GameInfo/GameInfo";
import {Game} from "../../../../model/game/game";
import {t} from "i18next";

const OrderInfoModal: React.FC<OrderInfoProps> = ({ order, onClose }) => {

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
        <Modal show={true} onHide={onClose} className='text-white' size="lg">
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
                        <div>{order.game.title} {t('Order')}: {order.id}</div>
                    </Modal.Title>
                    <Modal.Body className='fs-5'>
                        <Row className='mt-3 align-items-center pb-4'>
                            <Col xs={6}>
                                <div>
                                    <span className='fw-bold'>{t('Price')}:</span> {order.price}{order.currency}
                                </div>
                                <div>
                                    <span className='fw-bold'>{t('Submit Date')}:</span> {order.submittingDate}
                                </div>
                                <div>
                                    <span className='fw-bold'>{t('Last Update')}:</span> {order.lastUpdate}
                                </div>
                                <div>
                                    <span className='fw-bold'>{t('Status')}:</span> {order.status}
                                </div>

                            </Col>
                            <Col xs={6}>
                                <div>
                                    <span className='fw-bold'>{t('Description')}:</span> {order.description}
                                </div>
                                <div>
                                    <span className='fw-bold'>{t('User Data')}:</span>
                                </div>
                                <div>
                                    <span className='fw-bold'>{t('firstname')}:</span> {order.firstName}
                                </div>
                                <div>
                                    <span className='fw-bold'>{t('lastname')}:</span> {order.lastName}
                                </div>
                            </Col>
                        </Row>
                        <Row className='gap-2 px-2'>
                            <table className="tags-table">
                                <thead>
                                <tr>
                                    <th>{t('address')}</th>
                                    <th>{t('City')}</th>
                                    <th>{t('Email')}</th>
                                    <th>{t('Phone')}</th>
                                    <th>{t('Customer')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{order.address}</td>
                                    <td>{order.city}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone}</td>
                                    <td>
                                        <Button className='button-workspace' onClick={() => handleUserInfo(order.customer)}>{t('Info')}</Button>
                                    </td>
                                </tr>
                                {selectedUserInfo && (
                                    <EmployeeInfoModal
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
                                <span className='fw-bold'>{t('Assigned to')}:</span>
                                <Button className='button-order-info my-2 ml-2' onClick={() => handleUserInfo(order.worker)}>{order.worker ? order.worker?.username : t('None')}</Button>
                            </div>
                        </Row>
                        <Row className='gap-2'>
                            <div className="flex justify-center items-center">
                                <Button className='button-order-info' onClick={() => handleGameInfo(order.game)}>{t('Game Details')}</Button>
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

export default OrderInfoModal
