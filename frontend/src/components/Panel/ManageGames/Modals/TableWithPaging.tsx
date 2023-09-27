import React, { useState } from 'react';
import {Button, Col, Table} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import {Api} from "../../../../connector/api";
import toast from "react-hot-toast";
import {Game} from "../../../../model/game/game";
import GameEditModal from "./GameEditModal";
import GameInfoModal from "./GameInfoModal";

const TableWithPaging = () => {

    const itemsPerPage = 8;

    const [games, setGames] = useState([] as Game[]);
    const [pageCount, setPageCount] = useState(0);
    const [selectedGameInfo, setSelectedGameInfo] = useState<Game | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedGame, setEditedGame] = useState<Game | null>(null);

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

    return (
        <div>
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
                                <td className='centered-td'>{game.price}</td>
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
        </div>
    );
};

export default TableWithPaging;
