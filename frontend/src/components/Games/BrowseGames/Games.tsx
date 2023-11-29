import NavBar from '../../NavBar/NavBar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { Container } from 'react-bootstrap';
import {BsSearch, BsXLg} from 'react-icons/bs'
import GameInfo from '../GameInfo/GameInfo';
import { Link } from 'react-router-dom';
import './Games.css'
import {Game} from "../../../model/game/game";
import {Tag} from "../../../model/game/tag";
import {Api} from "../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";

function Games() {

    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const itemsPerPage = 11;
    const isUserLoggedIn: boolean = !!Api.auth.getAuthToken();
    const [tags, setTags] = React.useState([] as Tag[]);
    const [games, setGames] = React.useState([] as Game[]);

    const [searchTitle, setSearchTitle] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState([] as Tag[]);
    const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);
    const [pageCount, setPageCount] = React.useState(itemsPerPage);

    React.useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
        fetchTags();
        fetchGames();
    }, []);

    const fetchTags = () => {
        Api.game.getAllTags()
            .then((tags) => {
                setTags(tags);
            })
            .catch((err) => {
                toast.error(`${err.response.data.message}`, { icon: "💀" });
            });
    };

    const fetchGames = () => {
        Api.game.getPagingGames(1, itemsPerPage).then((res) => {
            setGames(res.items);
            setPageCount(res.meta.totalPages);
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    };

    const handleChange = (e: any) => {
        const name = e.target.value;
        const selectedTag = tags.find(tag => tag.name === name);
        if (!selectedTags.find(tag => tag.name === name)) {
            if (selectedTag) {
                selectedTags.push(selectedTag);
                setSelectedTags(selectedTags);
                fetchTags();
            }
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (selectedTags.length == 0 && searchTitle.length == 0) {
            fetchGames();
            return;
        }
        const title = searchTitle.length == 0 ? "" : searchTitle;
        const tags = selectedTags.map(tag => tag.name).join(',');
        Api.game.getPagingGames(1, itemsPerPage, tags, title).then((res) => {
            setGames(res.items);
            setPageCount(res.meta.totalPages);
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    };

    const handleRemoveTag = (tagToRemove: any) => {
        setSelectedTags((prevTags: Tag[]) => prevTags.filter(tag => tag !== tagToRemove));
    };

    const handleGameClick = (game: any) => {
        setSelectedGame(game);
    };

    const handlePageClick = (data: any) => {
        Api.game.getPagingGames(data.selected + 1, itemsPerPage).then((res) => {
            setGames(res.items);
            setPageCount(res.meta.totalPages);
            window.scrollTo(0, 0);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" });
        });
    }

    return (
        <div className="Games">
            <NavBar />
            <Toaster />
            <Container>
                <Form className='filter-form mt-5' onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={4} className='mb-4'>
                            <Form.Control type='text' placeholder={t('Search')} onChange={e => setSearchTitle(e.target.value)} />
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <Form.Select className='form-select' aria-label="Category selector" defaultValue={''} onChange={handleChange}>
                                <option disabled value={''}>{t('Choose tags')}</option>
                                {tags.map(item => {
                                    return (<option key={item.id} value={item.name}>{item.name}</option>)
                                })}
                            </Form.Select>
                        </Col>
                        <Col lg={1} className='mb-4'>
                            <Button className='button-filter' type='submit'><BsSearch /></Button>
                        </Col>
                    </Row>
                </Form>
                <Row className='d-flex justify-content-start '>
                    {Array.isArray(selectedTags) && selectedTags.length > 0 ? (
                        selectedTags.map(tag => {
                            return <Col lg={2} className='tag ps-4' key={tag.id}>{tag.name}<BsXLg className='ms-3' onClick={() => handleRemoveTag(tag)} /></Col>
                        }))
                        : (
                            <div></div>
                        )}
                </Row>
                <Row className='d-flex justify-content-center text-center'>{games.map(game => {
                    return <Col lg={6} className='game-col' key={game.id}> <img src={Api.image.getImageUrl(game.imageIds[0])} alt="Game Img" style={{ width: '100%', height: '100%' }} />
                        <div className="image-card">
                            <div className='fs-3 fw-bold'>{game.title}</div>
                            <Row>
                                <Col>
                                    <Button className='button-card' onClick={() => handleGameClick(game)}>{t('Info')}</Button>
                                </Col>
                                {isUserLoggedIn && (
                                    <Col>
                                        <Link to="/order" state={{ game: game }}><Button className='button-card'>{t('Order')}</Button></Link>
                                    </Col>
                                )}
                            </Row>

                        </div></Col>
                })}
                    {selectedGame && (
                        <GameInfo
                            game={selectedGame}
                            onClose={() => setSelectedGame(null)}
                        />
                    )}
                </Row>
                <div className="pagination flex justify-center items-center">
                    {pageCount > 1 && (
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
                    )}
                </div>
                <div className='flex items-center justify-center'>
                    <img src="/src/assets/logo_GBD.png" alt="GBD Logo" style={{ maxWidth: '463px' }} />
                </div>
            </Container>
        </div >
    );
}

export default Games;