import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {Button, Card, Col, Container, Table} from "react-bootstrap";
import IconCircle from "../../util/IconCircle";
import {Game} from "../../../model/game/game";
import {Api} from "../../../connector/api";
import GameInfoModal from "./Modals/GameInfoModal";
import GameEditModal from "./Modals/GameEditModal";
import ReactPaginate from "react-paginate";
import NewGameModal from "./Modals/NewGameModal";

export default function ManageGames() {

    const itemsPerPage = 14;

    const [games, setGames] = useState([] as Game[]);
    const [pageCount, setPageCount] = useState(0);
    const [selectedGameInfo, setSelectedGameInfo] = useState<Game | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedGame, setEditedGame] = useState<Game | null>(null);
    const [showAddModal, setAddShowModal] = useState(false);

    React.useEffect(() => {
        fetchGames();
    }, []);

    const handlePageClick = (data: any) => {
        Api.game.getPagingGames(data.selected + 1, itemsPerPage).then((res) => {
            setGames(res.items);
            setPageCount(res.meta.totalPages);
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    };

    const fetchGames = () => {
        Api.game.getPagingGames(1, itemsPerPage).then((res) => {
            setGames(res.items);
            setPageCount(res.meta.totalPages);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    function handleGameInfo(game: Game) {
        setSelectedGameInfo(game)
    }

    function handleEditGame(game: Game) {
        setShowEditModal(true)
        setEditedGame(game)
    }

    function handleSaveEditedGame() {
        setShowEditModal(false)
        setEditedGame(null)
        fetchGames()
    }

    function handleOpenAddGameModal() {
        setAddShowModal(true);
    }

    function handleCloseAddGameModal() {
        setAddShowModal(false);
    }

    function handleAddNewGame() {
        toast.success(`Game added successfully`, {icon: "👏"});
        handleCloseAddGameModal();
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
                        <div>
                            <Button className='button-workspace my-4' onClick={handleOpenAddGameModal}>Add new game</Button>
                        </div>
                        <div className="table-responsive">
                            <Col lg={11} className="mx-auto">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr className='uppercase'>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Details</th>
                                        <th>Edit</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {games.map((game) => (
                                        <tr key={game.id}>
                                            <td className='centered-td'>{game.id}</td>
                                            <td className='centered-td'>{game.title}</td>
                                            <td className='centered-td'>{game.price} {game.currency}</td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleGameInfo(game)}>Info</Button>
                                            </td>
                                            <td>
                                                <Button className='button-workspace' onClick={() => handleEditGame(game)}>Edit</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {selectedGameInfo && (
                                        <GameInfoModal
                                            game={selectedGameInfo}
                                            onClose={() => setSelectedGameInfo(null)}
                                        />
                                    )}
                                    </tbody>
                                </Table>
                                <GameEditModal
                                    show={showEditModal}
                                    onClose={() => setShowEditModal(false)}
                                    onSave={handleSaveEditedGame}
                                    editedGame={editedGame ?? null}
                                />
                            </Col>
                        </div>
                    </Card.Body>
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
                </Card>
                {showAddModal && (
                    <NewGameModal
                        show={showAddModal}
                        onClose={handleCloseAddGameModal}
                        onSave={handleAddNewGame}
                    />
                )}
            </Container>
        </div>
    )
}