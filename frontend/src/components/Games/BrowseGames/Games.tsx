import NavBar from '../../NavBar/NavBar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { Container } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'
import { BsXLg } from 'react-icons/bs'
import GameInfo from '../GameInfo/GameInfo';
import { Link } from 'react-router-dom';
import './Games.css'

function Games() {
    const categories = ['Strategy', 'Party', 'Cooperative', 'Eurogames', 'Abstract', 'Family']
    const [category, setCategory] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [selectedGame, setSelectedGame] = React.useState<any | null>(null);

    const games = [
        { id: 1, name: 'Chess', img: '/src/assets/board_game.avif', tags: ['Strategy', 'Family'], description: 'Marvellous game', price: 50 },
        { id: 2, name: 'Checkers', img: '/src/assets/board_game.avif', tags: ['Party', 'Family'], description: 'Marvellous game', price: 80 },
        { id: 3, name: 'Monopoly', img: '/src/assets/board_game.avif', tags: ['Strategy', 'Party', 'Family'], description: 'Marvellous game', price: 45 },
        { id: 4, name: 'Scrabble', img: '/src/assets/board_game.avif', tags: ['Party', 'Family'], description: 'Marvellous game', price: 40 }
    ]

    const handleChange = (e: any) => {
        const selectedValue = e.target.value;

        if (!tags.includes(selectedValue)) {
            setCategory(selectedValue);
            setTags(prevTags => [...prevTags, selectedValue]);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = {
            searchQuery: searchQuery,
            category: tags
        };
        const json = JSON.stringify(data);
        console.log(json);
    };

    const handleRemoveTag = (tagToRemove: any) => {
        setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };

    const handleGameClick = (game: any) => {
        setSelectedGame(game);
    };

    return (
        <div className="Games">
            <NavBar />
            <Container>
                <Form className='filter-form mt-5' onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={4} className='mb-4'>
                            <Form.Control type='text' placeholder='Search' onChange={e => setSearchQuery(e.target.value)} />
                        </Col>
                        <Col lg={3} className='mb-4'>
                            <Form.Select className='form-select' aria-label="Category selector" defaultValue={''} onChange={handleChange}>
                                <option disabled value={''}>Choose tags</option>
                                {categories.map(item => {
                                    return (<option key={item} value={item}>{item}</option>)
                                })}
                            </Form.Select>
                        </Col>
                        <Col lg={1} className='mb-4'>
                            <Button className='button-filter' type='submit'><BsSearch /></Button>
                        </Col>
                    </Row>
                </Form>
                <Row className='d-flex justify-content-start '>
                    {Array.isArray(tags) && tags.length > 0 ? (
                        tags.map(tag => {
                            return <Col lg={2} className='tag ps-4' key={tag}>{tag}<BsXLg className='ms-3' onClick={() => handleRemoveTag(tag)} /></Col>
                        }))
                        : (
                            <div></div>
                        )}
                </Row>
                <Row className='d-flex justify-content-center text-center'>{games.map(game => {
                    return <Col lg={6} className='game-col' key={game.id}> <img src={game.img} alt="Game Img" style={{ width: '100%', height: '100%' }} />
                        <div className="image-card">
                            <div className='fs-3 fw-bold'>{game.name}</div>
                            <Row>
                                <Col>
                                    <Button className='button-card' onClick={() => handleGameClick(game)}>Info</Button>
                                </Col>
                                <Col>
                                    <Link to="/order" state={{ game: game }}><Button className='button-card'>Order</Button></Link>
                                </Col>
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
                <div>
                    <Button className='button-filter'>See more games</Button>
                </div>
                <div className='flex items-center justify-center'>
                    <img src="/src/assets/logo_GBD.png" alt="GBD Logo" style={{ maxWidth: '463px' }} />
                </div>
            </Container>
        </div >
    );
}

export default Games;